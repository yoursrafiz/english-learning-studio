// ============================================================================
//  GOOGLE SIGN-IN — THE ONE CONFIGURATION SETTING
// ============================================================================
//  This is the ONLY place the Google Client ID lives. Nothing else in the
//  app hard-codes it — the sign-in gate, the top bar and Settings all read
//  this single value.
//
//  TO ENABLE REAL GOOGLE SIGN-IN:
//  Paste the Web OAuth Client ID (the long string ending in
//  ".apps.googleusercontent.com", from Google Cloud Console →
//  APIs & Services → Credentials) between the quotes below, then rebuild.
//
//  Until a real Client ID is pasted here, GOOGLE_CONFIGURED is false and
//  the sign-in screen honestly says Google sign-in is not configured yet.
//  It does NOT fake a Google login and never invents a Google account.
// ============================================================================

export const GOOGLE_CLIENT_ID = "";

/** True only when a real-looking Client ID has been pasted above. */
export const GOOGLE_CONFIGURED =
  GOOGLE_CLIENT_ID.trim().length > 10 &&
  GOOGLE_CLIENT_ID.trim().endsWith(".apps.googleusercontent.com");
