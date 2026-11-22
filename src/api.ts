// Standalone data layer — replaces the Muse-hosted server actions
// (server/src/actions.ts + SQLite/Drizzle) with a localStorage store.
//
// Everything the learner does in the app — lesson progress, word review
// states, attempts, study days, settings, custom words and the cached
// phrasal-verb translations — is saved in the browser under the single
// key "els-standalone-v1". Nothing leaves the device. Clearing the
// browser's site data starts the learner fresh, exactly like the
// "Reset progress" button in Settings.
//
// The method names and the shapes they return are the same as the
// server actions used to return, so the UI code (App.tsx, exams.tsx)
// works unchanged. The one exception is translatePhrasalBatch: the
// hosted version translated new entries with an AI service. There is
// no translation service in this standalone app, so it only returns
// translations that are already in the shipped cache
// (phrasal-translations-cache.ts); entries without one honestly show
// "no Bengali translation yet" instead of inventing one.

import { PHRASAL_TRANSLATIONS_CACHE } from "./phrasal-translations-cache";

export interface WordState {
  entryKey: string;
  lessonNumber: number;
  english: string;
  bengali: string;
  saved: boolean;
  known: boolean;
  difficult: boolean;
  mastery: string;
  ease: number;
  intervalDays: number;
  repetitions: number;
  lapses: number;
  nextReviewAt: string | null;
  lastReviewedAt: string | null;
  createdAt: string | null;
  note: string;
}

export interface OxfordWordState extends Omit<WordState, "lessonNumber"> {
  level: string;
}

export interface Settings {
  uiLanguage: string;
  accent: string;
  speechRate: number;
  dailyGoalMinutes: number;
  dailyGoalWords: number;
  showBengali: boolean;
  autoPlay: boolean;
  fontSize: string;
  theme: string;
}

export interface ProgressRow {
  lessonNumber: number;
  status: string;
  completion: number;
  bestQuiz: number | null;
  lastStudiedAt: string | null;
}

export interface AttemptRow {
  id: number;
  lessonNumber: number | null;
  kind: string;
  total: number;
  correct: number;
  createdAt: string;
}

export interface StudyDayRow {
  day: string;
  minutes: number;
  sessions: number;
}

export interface LessonMinuteRow {
  lessonNumber: number;
  day: string;
  minutes: number;
}

export interface ReviewRow {
  entryKey: string;
  grade: string;
  reviewedAt: string;
}

export interface CustomWordRow {
  id: number;
  english: string;
  bengali: string;
  note: string;
  createdAt: string;
}

export interface PhrasalTranslation {
  key: string;
  meaningBn: string;
  exampleBn: string;
}

export interface State {
  progress: ProgressRow[];
  words: WordState[];
  oxfordWords: OxfordWordState[];
  attempts: AttemptRow[];
  studyDays: StudyDayRow[];
  lessonMinutes: LessonMinuteRow[];
  reviewCount: number;
  reviews: ReviewRow[];
  settings: Settings;
  customWords: CustomWordRow[];
}

const STORAGE_KEY = "els-standalone-v1";

const defaultSettings: Settings = {
  uiLanguage: "bn",
  accent: "en-US",
  speechRate: 0.95,
  dailyGoalMinutes: 20,
  dailyGoalWords: 10,
  showBengali: true,
  autoPlay: false,
  fontSize: "normal",
  theme: "system",
};

interface Store {
  progress: Record<number, ProgressRow>;
  words: Record<string, WordState>;
  oxfordWords: Record<string, OxfordWordState>;
  attempts: AttemptRow[];
  studyDays: Record<string, StudyDayRow>;
  lessonMinutes: Record<string, LessonMinuteRow>;
  reviews: ReviewRow[];
  settings: Settings;
  customWords: CustomWordRow[];
  nextAttemptId: number;
  nextCustomId: number;
  phrasalTranslations: Record<string, { meaningBn: string; exampleBn: string }>;
}

function emptyStore(): Store {
  return {
    progress: {},
    words: {},
    oxfordWords: {},
    attempts: [],
    studyDays: {},
    lessonMinutes: {},
    reviews: [],
    settings: { ...defaultSettings },
    customWords: [],
    nextAttemptId: 1,
    nextCustomId: 1,
    phrasalTranslations: { ...PHRASAL_TRANSLATIONS_CACHE },
  };
}

function loadStore(): Store {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<Store>;
    const base = emptyStore();
    return {
      ...base,
      ...parsed,
      settings: { ...defaultSettings, ...(parsed.settings ?? {}) },
      phrasalTranslations: {
        ...PHRASAL_TRANSLATIONS_CACHE,
        ...(parsed.phrasalTranslations ?? {}),
      },
    };
  } catch {
    return emptyStore();
  }
}

function saveStore(store: Store): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Storage full / private mode: the app keeps working in memory for
    // this visit; progress just will not survive a reload.
  }
}

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function iso(d: Date): string {
  return d.toISOString();
}

function newWordState(
  entryKey: string,
  lessonNumber: number,
  english: string,
  bengali: string,
  now: Date,
): WordState {
  return {
    entryKey,
    lessonNumber,
    english,
    bengali,
    saved: false,
    known: false,
    difficult: false,
    mastery: "new",
    ease: 2.5,
    intervalDays: 0,
    repetitions: 0,
    lapses: 0,
    nextReviewAt: null,
    lastReviewedAt: null,
    createdAt: iso(now),
    note: "",
  };
}

// Simplified SM-2, copied from the hosted server's gradeWord logic.
function gradeSm2(
  row: { ease: number; intervalDays: number; repetitions: number; lapses: number },
  grade: "again" | "hard" | "good" | "easy",
  now: Date,
): { ease: number; intervalDays: number; repetitions: number; lapses: number; mastery: string; next: Date } {
  let ease = row.ease;
  let interval = row.intervalDays;
  let reps = row.repetitions;
  let lapses = row.lapses;
  if (grade === "again") {
    interval = 0;
    reps = 0;
    lapses += 1;
    ease = Math.max(1.3, ease - 0.2);
  } else if (grade === "hard") {
    interval = Math.max(1, interval * 1.2 || 1);
    reps += 1;
    ease = Math.max(1.3, ease - 0.15);
  } else if (grade === "good") {
    interval = reps === 0 ? 1 : reps === 1 ? 3 : interval * ease;
    reps += 1;
  } else {
    interval = reps === 0 ? 2 : reps === 1 ? 5 : interval * ease * 1.3;
    reps += 1;
    ease = Math.min(2.8, ease + 0.15);
  }
  interval = Math.round(interval * 10) / 10;
  const mastery =
    grade === "again" ? "learning" : reps >= 4 && interval >= 14 ? "mastered" : reps >= 1 ? "review" : "learning";
  const next =
    grade === "again" ? new Date(now.getTime() + 10 * 60000) : new Date(now.getTime() + interval * 86400000);
  return { ease, intervalDays: interval, repetitions: reps, lapses, mastery, next };
}

export const api = {
  async getState(_args: Record<string, never>): Promise<State> {
    const s = loadStore();
    return {
      progress: Object.values(s.progress).sort((a, b) => a.lessonNumber - b.lessonNumber),
      words: Object.values(s.words),
      oxfordWords: Object.values(s.oxfordWords),
      attempts: [...s.attempts].sort((a, b) => b.id - a.id).slice(0, 300),
      studyDays: Object.values(s.studyDays).sort((a, b) => a.day.localeCompare(b.day)),
      lessonMinutes: Object.values(s.lessonMinutes),
      reviewCount: s.reviews.length,
      reviews: [...s.reviews].slice(-5000).reverse(),
      settings: s.settings,
      customWords: [...s.customWords].sort((a, b) => b.id - a.id),
    };
  },

  async touchLesson(args: { lessonNumber: number; minutes?: number }): Promise<{ ok: true }> {
    const s = loadStore();
    const now = new Date();
    const row = s.progress[args.lessonNumber];
    if (row) {
      row.status = row.status === "not_started" ? "in_progress" : row.status;
      row.completion = Math.max(row.completion, 10);
      row.lastStudiedAt = iso(now);
    } else {
      s.progress[args.lessonNumber] = {
        lessonNumber: args.lessonNumber,
        status: "in_progress",
        completion: 10,
        bestQuiz: null,
        lastStudiedAt: iso(now),
      };
    }
    const minutes = args.minutes ?? 2;
    if (minutes > 0) {
      const key = dayKey(now);
      const d = s.studyDays[key];
      if (d) {
        d.minutes += minutes;
        d.sessions += 1;
      } else {
        s.studyDays[key] = { day: key, minutes, sessions: 1 };
      }
      const lmKey = `${args.lessonNumber}:${key}`;
      const lm = s.lessonMinutes[lmKey];
      if (lm) lm.minutes += minutes;
      else s.lessonMinutes[lmKey] = { lessonNumber: args.lessonNumber, day: key, minutes };
    }
    saveStore(s);
    return { ok: true as const };
  },

  async setLessonCompletion(args: {
    lessonNumber: number;
    completion: number;
    status?: "not_started" | "in_progress" | "completed" | "revision_needed";
    bestQuiz?: number;
  }): Promise<{ ok: true }> {
    const s = loadStore();
    const now = new Date();
    const status =
      args.status ?? (args.completion >= 100 ? "completed" : args.completion > 0 ? "in_progress" : "not_started");
    const row = s.progress[args.lessonNumber];
    if (row) {
      row.completion = Math.max(row.completion, args.completion);
      row.status = status;
      if (args.bestQuiz != null) row.bestQuiz = Math.max(row.bestQuiz ?? 0, args.bestQuiz);
      row.lastStudiedAt = iso(now);
    } else {
      s.progress[args.lessonNumber] = {
        lessonNumber: args.lessonNumber,
        completion: args.completion,
        status,
        bestQuiz: args.bestQuiz ?? null,
        lastStudiedAt: iso(now),
      };
    }
    saveStore(s);
    return { ok: true as const };
  },

  async markLessonProgress(args: {
    lessonNumber: number;
    completion: number;
    status: "not_started" | "in_progress" | "completed" | "revision_needed";
  }): Promise<{ ok: true }> {
    const s = loadStore();
    const now = new Date();
    const row = s.progress[args.lessonNumber];
    if (row) {
      row.completion = args.completion;
      row.status = args.status;
      if (args.status !== "not_started") row.lastStudiedAt = iso(now);
    } else {
      s.progress[args.lessonNumber] = {
        lessonNumber: args.lessonNumber,
        completion: args.completion,
        status: args.status,
        bestQuiz: null,
        lastStudiedAt: args.status === "not_started" ? null : iso(now),
      };
    }
    saveStore(s);
    return { ok: true as const };
  },

  async setWordFlags(args: {
    entryKey: string;
    lessonNumber: number;
    english: string;
    bengali: string;
    saved?: boolean;
    known?: boolean;
    difficult?: boolean;
    note?: string;
  }): Promise<{ ok: true }> {
    const s = loadStore();
    const now = new Date();
    const row = s.words[args.entryKey];
    if (row) {
      if (args.saved != null) row.saved = args.saved;
      if (args.known != null) row.known = args.known;
      if (args.difficult != null) row.difficult = args.difficult;
      if (args.note != null) row.note = args.note;
      row.mastery = args.known === true ? "mastered" : args.difficult === true ? "learning" : row.mastery;
      if (args.known === true) row.nextReviewAt = iso(new Date(now.getTime() + 4 * 86400000));
    } else {
      const w = newWordState(args.entryKey, args.lessonNumber, args.english, args.bengali, now);
      w.saved = args.saved ?? false;
      w.known = args.known ?? false;
      w.difficult = args.difficult ?? false;
      w.mastery = args.known ? "mastered" : "learning";
      w.note = args.note ?? "";
      w.nextReviewAt = iso(new Date(now.getTime() + 86400000));
      s.words[args.entryKey] = w;
    }
    saveStore(s);
    return { ok: true as const };
  },

  async gradeWord(args: {
    entryKey: string;
    lessonNumber: number;
    english: string;
    bengali: string;
    grade: "again" | "hard" | "good" | "easy";
  }): Promise<{ ok: true; nextReviewAt: string; intervalDays: number; mastery: string }> {
    const s = loadStore();
    const now = new Date();
    let row = s.words[args.entryKey];
    if (!row) {
      row = newWordState(args.entryKey, args.lessonNumber, args.english, args.bengali, now);
      s.words[args.entryKey] = row;
    }
    const r = gradeSm2(row, args.grade, now);
    row.ease = r.ease;
    row.intervalDays = r.intervalDays;
    row.repetitions = r.repetitions;
    row.lapses = r.lapses;
    row.mastery = r.mastery;
    if (r.mastery === "mastered") row.known = true;
    if (args.grade === "again") row.difficult = true;
    row.nextReviewAt = iso(r.next);
    row.lastReviewedAt = iso(now);
    s.reviews.push({ entryKey: args.entryKey, grade: args.grade, reviewedAt: iso(now) });
    saveStore(s);
    return { ok: true as const, nextReviewAt: iso(r.next), intervalDays: r.intervalDays, mastery: r.mastery };
  },

  async recordAttempt(args: {
    lessonNumber: number | null;
    kind: string;
    total: number;
    correct: number;
  }): Promise<{ ok: true }> {
    const s = loadStore();
    s.attempts.push({
      id: s.nextAttemptId++,
      lessonNumber: args.lessonNumber,
      kind: args.kind,
      total: args.total,
      correct: Math.min(args.correct, args.total),
      createdAt: iso(new Date()),
    });
    saveStore(s);
    return { ok: true as const };
  },

  async saveSettings(args: Settings): Promise<{ ok: true }> {
    const s = loadStore();
    s.settings = { ...args };
    saveStore(s);
    return { ok: true as const };
  },

  async addCustomWord(args: { english: string; bengali: string; note?: string }): Promise<{ id: number }> {
    const s = loadStore();
    const id = s.nextCustomId++;
    s.customWords.push({
      id,
      english: args.english.trim(),
      bengali: args.bengali.trim(),
      note: args.note ?? "",
      createdAt: iso(new Date()),
    });
    saveStore(s);
    return { id };
  },

  async deleteCustomWord(args: { id: number }): Promise<{ ok: true }> {
    const s = loadStore();
    s.customWords = s.customWords.filter((c) => c.id !== args.id);
    saveStore(s);
    return { ok: true as const };
  },

  async setOxfordFlags(args: {
    entryKey: string;
    level: string;
    english: string;
    bengali: string;
    saved?: boolean;
    known?: boolean;
    difficult?: boolean;
    note?: string;
  }): Promise<{ ok: true }> {
    const s = loadStore();
    const now = new Date();
    const row = s.oxfordWords[args.entryKey];
    if (row) {
      if (args.saved != null) row.saved = args.saved;
      if (args.known != null) row.known = args.known;
      if (args.difficult != null) row.difficult = args.difficult;
      if (args.note != null) row.note = args.note;
      row.mastery = args.known === true ? "mastered" : args.difficult === true ? "learning" : row.mastery;
      if (args.known === true) row.nextReviewAt = iso(new Date(now.getTime() + 4 * 86400000));
    } else {
      const w: OxfordWordState = {
        ...newWordState(args.entryKey, 0, args.english, args.bengali, now),
        level: args.level,
      };
      delete (w as Partial<WordState>).lessonNumber;
      w.saved = args.saved ?? false;
      w.known = args.known ?? false;
      w.difficult = args.difficult ?? false;
      w.mastery = args.known ? "mastered" : "learning";
      w.note = args.note ?? "";
      w.nextReviewAt = iso(new Date(now.getTime() + 86400000));
      s.oxfordWords[args.entryKey] = w;
    }
    saveStore(s);
    return { ok: true as const };
  },

  async gradeOxfordWord(args: {
    entryKey: string;
    level: string;
    english: string;
    bengali: string;
    grade: "again" | "hard" | "good" | "easy";
  }): Promise<{ ok: true; nextReviewAt: string; intervalDays: number; mastery: string }> {
    const s = loadStore();
    const now = new Date();
    let row = s.oxfordWords[args.entryKey];
    if (!row) {
      const w: OxfordWordState = {
        ...newWordState(args.entryKey, 0, args.english, args.bengali, now),
        level: args.level,
      };
      delete (w as Partial<WordState>).lessonNumber;
      row = w;
      s.oxfordWords[args.entryKey] = row;
    }
    const r = gradeSm2(row, args.grade, now);
    row.ease = r.ease;
    row.intervalDays = r.intervalDays;
    row.repetitions = r.repetitions;
    row.lapses = r.lapses;
    row.mastery = r.mastery;
    if (r.mastery === "mastered") row.known = true;
    if (args.grade === "again") row.difficult = true;
    row.nextReviewAt = iso(r.next);
    row.lastReviewedAt = iso(now);
    s.reviews.push({ entryKey: args.entryKey, grade: args.grade, reviewedAt: iso(now) });
    saveStore(s);
    return { ok: true as const, nextReviewAt: iso(r.next), intervalDays: r.intervalDays, mastery: r.mastery };
  },

  async getPhrasalTranslations(args: { keys: string[] }): Promise<{ translations: PhrasalTranslation[] }> {
    const s = loadStore();
    const translations: PhrasalTranslation[] = [];
    for (const k of args.keys) {
      const t = s.phrasalTranslations[k];
      if (t) translations.push({ key: k, meaningBn: t.meaningBn, exampleBn: t.exampleBn });
    }
    return { translations };
  },

  async translatePhrasalBatch(args: {
    items: { key: string; meaning: string; example: string }[];
  }): Promise<{ translations: PhrasalTranslation[] }> {
    // No translation service in the standalone app: return only the
    // translations already in the shipped cache. The UI shows
    // "no Bengali translation yet" for the rest.
    const s = loadStore();
    const translations: PhrasalTranslation[] = [];
    for (const item of args.items) {
      const t = s.phrasalTranslations[item.key];
      if (t) translations.push({ key: item.key, meaningBn: t.meaningBn, exampleBn: t.exampleBn });
    }
    return { translations };
  },

  async resetProgress(_args: { confirm: true }): Promise<{ ok: true }> {
    const s = loadStore();
    s.progress = {};
    s.lessonMinutes = {};
    s.words = {};
    s.oxfordWords = {};
    s.reviews = [];
    s.attempts = [];
    s.studyDays = {};
    saveStore(s);
    return { ok: true as const };
  },
};

// Types used by App.tsx / exams.tsx:
//   type State = ApiResponse<typeof api, "getState">
export type ApiResponse<T, K extends keyof T> = T[K] extends (...args: never[]) => Promise<infer R> ? R : never;
export type ApiRequest<T, K extends keyof T> = T[K] extends (args: infer A) => unknown ? A : never;
