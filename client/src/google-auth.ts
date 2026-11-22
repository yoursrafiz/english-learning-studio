// Google sign-in session handling (client side).
//
// The sign-in itself is done by Google Identity Services (GIS): Google
// shows its own account picker, verifies the person, and hands this app
// a signed ID token (a JWT). This module only:
//   1. decodes that token to read the account's name / photo / email
//      (the token comes straight from Google — the name is never typed
//      in or invented by the app),
//   2. keeps the session in localStorage so the learner stays signed in
//      across visits until they choose Sign out.
//
// Honest limit: this is a client-side gate for a single-learner app.
// There is no server-side token verification (that would need a backend
// secret), so the gate personalises the app and keeps casual visitors
// out; it is not a bank-grade security boundary.

import { GOOGLE_CLIENT_ID, GOOGLE_CONFIGURED } from "./google-config";

export { GOOGLE_CONFIGURED };

export interface GoogleUser {
  /** Full name from the Google account, e.g. "Sifat Rahman". */
  name: string;
  /** First name from the Google account, e.g. "Sifat" — used in greetings. */
  firstName: string;
  email: string;
  /** Google profile photo URL, or "" when the account has none. */
  picture: string;
  /** Google account id (the token's "sub" claim). */
  sub: string;
}

const STORAGE_KEY = "els-google-user-v1";

function firstNameOf(fullName: string, givenName?: string): string {
  const g = (givenName ?? "").trim();
  if (g) return g;
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

/** Decode the payload of a Google ID token (JWT) without any library. */
export function userFromCredential(credential: string): GoogleUser | null {
  try {
    const part = credential.split(".")[1];
    if (!part) return null;
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );
    const payload = JSON.parse(json) as Record<string, unknown>;
    const name = typeof payload.name === "string" ? payload.name : "";
    const email = typeof payload.email === "string" ? payload.email : "";
    const sub = typeof payload.sub === "string" ? payload.sub : "";
    if (!name || !sub) return null;
    return {
      name,
      firstName: firstNameOf(name, typeof payload.given_name === "string" ? payload.given_name : undefined),
      email,
      picture: typeof payload.picture === "string" ? payload.picture : "",
      sub,
    };
  } catch {
    return null;
  }
}

export function loadStoredUser(): GoogleUser | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GoogleUser>;
    if (
      typeof parsed.name === "string" && parsed.name &&
      typeof parsed.sub === "string" && parsed.sub
    ) {
      return {
        name: parsed.name,
        firstName:
          typeof parsed.firstName === "string" && parsed.firstName
            ? parsed.firstName
            : firstNameOf(parsed.name),
        email: typeof parsed.email === "string" ? parsed.email : "",
        picture: typeof parsed.picture === "string" ? parsed.picture : "",
        sub: parsed.sub,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function storeUser(user: GoogleUser) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Storage unavailable (private mode) — the session just won't persist.
  }
}

export function clearStoredUser() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
}

// ---------- Testing-mode entry (no Google account) ----------
//
// While no real Client ID is configured, the sign-in gate offers a
// testing entry: tapping the Google option lets the learner straight
// into the app so the project can be tried and improved. This is NOT a
// Google sign-in — no account is created, and no name, email or photo
// is invented or stored. Only a plain "entered in testing mode" flag is
// kept in localStorage so the learner stays inside across visits until
// they choose Sign out, which returns them to the gate screen. Once a
// real Client ID is added (google-config.ts), the gate uses Google's
// own button instead and this path is not offered.

const TESTING_KEY = "els-testing-session-v1";

export function loadTestingSession(): boolean {
  try {
    return window.localStorage.getItem(TESTING_KEY) === "1";
  } catch {
    return false;
  }
}

export function storeTestingSession() {
  try {
    window.localStorage.setItem(TESTING_KEY, "1");
  } catch {
    // Storage unavailable — the testing session just won't persist.
  }
}

export function clearTestingSession() {
  try {
    window.localStorage.removeItem(TESTING_KEY);
  } catch {
    // Nothing to clear.
  }
}

// ---------- Google Identity Services (GIS) plumbing ----------

interface GisCredentialResponse {
  credential?: string;
}

interface GoogleIdApi {
  initialize: (config: {
    client_id: string;
    callback: (response: GisCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type?: string;
      theme?: string;
      size?: string;
      shape?: string;
      text?: string;
      logo_alignment?: string;
      width?: number;
    },
  ) => void;
  disableAutoSelect: () => void;
  prompt: () => void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdApi } };
  }
}

const GIS_SRC = "https://accounts.google.com/gsi/client";
let gisPromise: Promise<GoogleIdApi | null> | null = null;

/** Loads the official GIS script once; resolves null if it cannot load. */
export function loadGis(): Promise<GoogleIdApi | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.google?.accounts?.id) return Promise.resolve(window.google.accounts.id);
  if (!gisPromise) {
    gisPromise = new Promise((resolve) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${GIS_SRC}"]`);
      const script = existing ?? document.createElement("script");
      const done = () => resolve(window.google?.accounts?.id ?? null);
      script.addEventListener("load", done);
      script.addEventListener("error", () => resolve(null));
      if (!existing) {
        script.src = GIS_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    });
  }
  return gisPromise;
}

/**
 * Initialises GIS with the one configured Client ID and renders Google's
 * own "Sign in with Google" button into `container`. Returns false when
 * sign-in is not configured or the GIS script failed to load, so the
 * caller can show an honest message instead of a dead button.
 */
export async function mountGoogleButton(
  container: HTMLElement,
  onUser: (user: GoogleUser) => void,
  onError: () => void,
): Promise<boolean> {
  if (!GOOGLE_CONFIGURED) return false;
  const id = await loadGis();
  if (!id) return false;
  try {
    id.initialize({
      client_id: GOOGLE_CLIENT_ID.trim(),
      auto_select: false,
      cancel_on_tap_outside: true,
      callback: (response) => {
        const user = response.credential ? userFromCredential(response.credential) : null;
        if (user) onUser(user);
        else onError();
      },
    });
    container.innerHTML = "";
    id.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signin_with",
      logo_alignment: "left",
      width: 280,
    });
    return true;
  } catch {
    return false;
  }
}

/** Tells Google not to auto-select the account on the next visit. */
export function googleDisableAutoSelect() {
  try {
    window.google?.accounts?.id.disableAutoSelect();
  } catch {
    // GIS not loaded — nothing to disable.
  }
}
