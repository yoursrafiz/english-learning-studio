import { integer, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const lessonProgress = sqliteTable("lesson_progress", {
  lessonNumber: integer("lesson_number").primaryKey(),
  status: text("status", {
    enum: ["not_started", "in_progress", "completed", "revision_needed"],
  })
    .notNull()
    .default("not_started"),
  completion: integer("completion").notNull().default(0),
  bestQuiz: integer("best_quiz"),
  lastStudiedAt: integer("last_studied_at", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const wordStates = sqliteTable("word_states", {
  entryKey: text("entry_key").primaryKey(),
  lessonNumber: integer("lesson_number").notNull(),
  english: text("english").notNull(),
  bengali: text("bengali").notNull(),
  saved: integer("saved").notNull().default(0),
  known: integer("known").notNull().default(0),
  difficult: integer("difficult").notNull().default(0),
  mastery: text("mastery", {
    enum: ["new", "learning", "review", "mastered"],
  })
    .notNull()
    .default("new"),
  ease: real("ease").notNull().default(2.5),
  intervalDays: real("interval_days").notNull().default(0),
  repetitions: integer("repetitions").notNull().default(0),
  lapses: integer("lapses").notNull().default(0),
  nextReviewAt: integer("next_review_at", { mode: "timestamp_ms" }),
  lastReviewedAt: integer("last_reviewed_at", { mode: "timestamp_ms" }),
  note: text("note").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Study minutes attributed to a specific lesson and local calendar day.
// study_days keeps the all-lessons daily total (including minutes logged
// before per-lesson tracking existed); this table lets the Stats report
// split minutes by lesson status without inventing a split for old days.
export const lessonMinutes = sqliteTable(
  "lesson_minutes",
  {
    lessonNumber: integer("lesson_number").notNull(),
    day: text("day").notNull(),
    minutes: integer("minutes").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.lessonNumber, t.day] })],
);

export const reviewHistory = sqliteTable("review_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  entryKey: text("entry_key").notNull(),
  grade: text("grade").notNull(),
  reviewedAt: integer("reviewed_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const attempts = sqliteTable("attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonNumber: integer("lesson_number"),
  kind: text("kind").notNull(),
  total: integer("total").notNull(),
  correct: integer("correct").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const studyDays = sqliteTable("study_days", {
  day: text("day").primaryKey(),
  minutes: integer("minutes").notNull().default(0),
  sessions: integer("sessions").notNull().default(0),
});

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey(),
  uiLanguage: text("ui_language").notNull().default("bn"),
  accent: text("accent").notNull().default("en-US"),
  speechRate: real("speech_rate").notNull().default(0.95),
  dailyGoalMinutes: integer("daily_goal_minutes").notNull().default(20),
  dailyGoalWords: integer("daily_goal_words").notNull().default(10),
  showBengali: integer("show_bengali").notNull().default(1),
  autoPlay: integer("auto_play").notNull().default(0),
  fontSize: text("font_size").notNull().default("normal"),
  theme: text("theme").notNull().default("system"),
});

export const customWords = sqliteTable("custom_words", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  english: text("english").notNull(),
  bengali: text("bengali").notNull(),
  note: text("note").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Bengali translations for the Complete Phrasal Verbs List (from the
// learner's uploaded PDF). The PDF entries themselves (verb, English
// meaning, example) ship as static client data; their Bengali translations
// are produced once by the translatePhrasalBatch action and cached here,
// keyed by the entry's stable key (e.g. "PVL-0001").
export const phrasalTranslations = sqliteTable("phrasal_translations", {
  entryKey: text("entry_key").primaryKey(),
  meaningBn: text("meaning_bn").notNull().default(""),
  exampleBn: text("example_bn").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Review state for the Oxford 3000 section. Kept separate from word_states
// because Oxford entries are not part of lessons 1–125 (word_states rows are
// keyed to a lesson number); entry_key here is the Oxford key, e.g. "OX-apple".
export const oxfordWordStates = sqliteTable("oxford_word_states", {
  entryKey: text("entry_key").primaryKey(),
  level: text("level").notNull(),
  english: text("english").notNull(),
  bengali: text("bengali").notNull(),
  saved: integer("saved").notNull().default(0),
  known: integer("known").notNull().default(0),
  difficult: integer("difficult").notNull().default(0),
  mastery: text("mastery", {
    enum: ["new", "learning", "review", "mastered"],
  })
    .notNull()
    .default("new"),
  ease: real("ease").notNull().default(2.5),
  intervalDays: real("interval_days").notNull().default(0),
  repetitions: integer("repetitions").notNull().default(0),
  lapses: integer("lapses").notNull().default(0),
  nextReviewAt: integer("next_review_at", { mode: "timestamp_ms" }),
  lastReviewedAt: integer("last_reviewed_at", { mode: "timestamp_ms" }),
  note: text("note").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
