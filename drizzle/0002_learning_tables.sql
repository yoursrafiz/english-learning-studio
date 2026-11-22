DROP TABLE entries;
--> statement-breakpoint
CREATE TABLE lesson_progress (
  lesson_number INTEGER PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'not_started',
  completion INTEGER NOT NULL DEFAULT 0,
  best_quiz INTEGER,
  last_studied_at INTEGER,
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE word_states (
  entry_key TEXT PRIMARY KEY,
  lesson_number INTEGER NOT NULL,
  english TEXT NOT NULL,
  bengali TEXT NOT NULL,
  saved INTEGER NOT NULL DEFAULT 0,
  known INTEGER NOT NULL DEFAULT 0,
  difficult INTEGER NOT NULL DEFAULT 0,
  mastery TEXT NOT NULL DEFAULT 'new',
  ease REAL NOT NULL DEFAULT 2.5,
  interval_days REAL NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  next_review_at INTEGER,
  last_reviewed_at INTEGER,
  note TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE review_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entry_key TEXT NOT NULL,
  grade TEXT NOT NULL,
  reviewed_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_number INTEGER,
  kind TEXT NOT NULL,
  total INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE study_days (
  day TEXT PRIMARY KEY,
  minutes INTEGER NOT NULL DEFAULT 0,
  sessions INTEGER NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  ui_language TEXT NOT NULL DEFAULT 'bn',
  accent TEXT NOT NULL DEFAULT 'en-US',
  speech_rate REAL NOT NULL DEFAULT 0.95,
  daily_goal_minutes INTEGER NOT NULL DEFAULT 20,
  daily_goal_words INTEGER NOT NULL DEFAULT 10,
  show_bengali INTEGER NOT NULL DEFAULT 1,
  auto_play INTEGER NOT NULL DEFAULT 0,
  font_size TEXT NOT NULL DEFAULT 'normal',
  theme TEXT NOT NULL DEFAULT 'system'
);
--> statement-breakpoint
CREATE TABLE custom_words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  english TEXT NOT NULL,
  bengali TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
