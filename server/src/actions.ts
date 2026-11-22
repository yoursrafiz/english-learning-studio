import { defineAction, z, type ActionsModule } from "@hatch/space-sdk";
import { and, asc, desc, eq } from "drizzle-orm";
import * as schema from "./schema";

const wordStateOut = z.object({
  entryKey: z.string(),
  lessonNumber: z.number(),
  english: z.string(),
  bengali: z.string(),
  saved: z.boolean(),
  known: z.boolean(),
  difficult: z.boolean(),
  mastery: z.string(),
  ease: z.number(),
  intervalDays: z.number(),
  repetitions: z.number(),
  lapses: z.number(),
  nextReviewAt: z.string().nullable(),
  lastReviewedAt: z.string().nullable(),
  createdAt: z.string().nullable(),
  note: z.string(),
});

const oxfordWordOut = z.object({
  entryKey: z.string(),
  level: z.string(),
  english: z.string(),
  bengali: z.string(),
  saved: z.boolean(),
  known: z.boolean(),
  difficult: z.boolean(),
  mastery: z.string(),
  ease: z.number(),
  intervalDays: z.number(),
  repetitions: z.number(),
  lapses: z.number(),
  nextReviewAt: z.string().nullable(),
  lastReviewedAt: z.string().nullable(),
  createdAt: z.string().nullable(),
  note: z.string(),
});

const settingsOut = z.object({
  uiLanguage: z.string(),
  accent: z.string(),
  speechRate: z.number(),
  dailyGoalMinutes: z.number(),
  dailyGoalWords: z.number(),
  showBengali: z.boolean(),
  autoPlay: z.boolean(),
  fontSize: z.string(),
  theme: z.string(),
});

const defaultSettings = {
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

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export const Actions = {
  getState: defineAction({
    description:
      "Returns all persisted learning state: lesson progress, word review states, attempts, study days, settings and custom words.",
    request: z.object({}),
    response: z.object({
      progress: z.array(
        z.object({
          lessonNumber: z.number(),
          status: z.string(),
          completion: z.number(),
          bestQuiz: z.number().nullable(),
          lastStudiedAt: z.string().nullable(),
        }),
      ),
      words: z.array(wordStateOut),
      oxfordWords: z.array(oxfordWordOut),
      attempts: z.array(
        z.object({
          id: z.number(),
          lessonNumber: z.number().nullable(),
          kind: z.string(),
          total: z.number(),
          correct: z.number(),
          createdAt: z.string(),
        }),
      ),
      studyDays: z.array(
        z.object({ day: z.string(), minutes: z.number(), sessions: z.number() }),
      ),
      lessonMinutes: z.array(
        z.object({
          lessonNumber: z.number(),
          day: z.string(),
          minutes: z.number(),
        }),
      ),
      reviewCount: z.number(),
      reviews: z.array(
        z.object({
          entryKey: z.string(),
          grade: z.string(),
          reviewedAt: z.string(),
        }),
      ),
      settings: settingsOut,
      customWords: z.array(
        z.object({
          id: z.number(),
          english: z.string(),
          bengali: z.string(),
          note: z.string(),
          createdAt: z.string(),
        }),
      ),
    }),
    async handler(ctx) {
      const db = ctx.db<typeof schema>();
      const [progress, words, oxfordWords, attempts, days, lessonMins, history, settingsRows, customs] =
        await Promise.all([
          db.select().from(schema.lessonProgress),
          db.select().from(schema.wordStates),
          db.select().from(schema.oxfordWordStates),
          db
            .select()
            .from(schema.attempts)
            .orderBy(desc(schema.attempts.id))
            .limit(300),
          db.select().from(schema.studyDays).orderBy(asc(schema.studyDays.day)),
          db.select().from(schema.lessonMinutes),
          db
            .select()
            .from(schema.reviewHistory)
            .orderBy(desc(schema.reviewHistory.id))
            .limit(5000),
          db.select().from(schema.settings),
          db
            .select()
            .from(schema.customWords)
            .orderBy(desc(schema.customWords.id)),
        ]);
      const s = settingsRows[0];
      return {
        progress: progress.map((p) => ({
          lessonNumber: p.lessonNumber,
          status: p.status,
          completion: p.completion,
          bestQuiz: p.bestQuiz ?? null,
          lastStudiedAt: p.lastStudiedAt?.toISOString() ?? null,
        })),
        words: words.map((w) => ({
          entryKey: w.entryKey,
          lessonNumber: w.lessonNumber,
          english: w.english,
          bengali: w.bengali,
          saved: w.saved === 1,
          known: w.known === 1,
          difficult: w.difficult === 1,
          mastery: w.mastery,
          ease: w.ease,
          intervalDays: w.intervalDays,
          repetitions: w.repetitions,
          lapses: w.lapses,
          nextReviewAt: w.nextReviewAt?.toISOString() ?? null,
          lastReviewedAt: w.lastReviewedAt?.toISOString() ?? null,
          createdAt: (w.createdAt ?? w.lastReviewedAt ?? w.updatedAt).toISOString(),
          note: w.note,
        })),
        oxfordWords: oxfordWords.map((w) => ({
          entryKey: w.entryKey,
          level: w.level,
          english: w.english,
          bengali: w.bengali,
          saved: w.saved === 1,
          known: w.known === 1,
          difficult: w.difficult === 1,
          mastery: w.mastery,
          ease: w.ease,
          intervalDays: w.intervalDays,
          repetitions: w.repetitions,
          lapses: w.lapses,
          nextReviewAt: w.nextReviewAt?.toISOString() ?? null,
          lastReviewedAt: w.lastReviewedAt?.toISOString() ?? null,
          createdAt: (w.createdAt ?? w.lastReviewedAt ?? w.updatedAt).toISOString(),
          note: w.note,
        })),
        attempts: attempts.map((a) => ({
          id: a.id,
          lessonNumber: a.lessonNumber ?? null,
          kind: a.kind,
          total: a.total,
          correct: a.correct,
          createdAt: a.createdAt.toISOString(),
        })),
        studyDays: days.map((d) => ({
          day: d.day,
          minutes: d.minutes,
          sessions: d.sessions,
        })),
        lessonMinutes: lessonMins.map((m) => ({
          lessonNumber: m.lessonNumber,
          day: m.day,
          minutes: m.minutes,
        })),
        reviewCount: history.length,
        reviews: history.map((h) => ({
          entryKey: h.entryKey,
          grade: h.grade,
          reviewedAt: h.reviewedAt.toISOString(),
        })),
        settings: s
          ? {
              uiLanguage: s.uiLanguage,
              accent: s.accent,
              speechRate: s.speechRate,
              dailyGoalMinutes: s.dailyGoalMinutes,
              dailyGoalWords: s.dailyGoalWords,
              showBengali: s.showBengali === 1,
              autoPlay: s.autoPlay === 1,
              fontSize: s.fontSize,
              theme: s.theme,
            }
          : defaultSettings,
        customWords: customs.map((c) => ({
          id: c.id,
          english: c.english,
          bengali: c.bengali,
          note: c.note,
          createdAt: c.createdAt.toISOString(),
        })),
      };
    },
  }),

  touchLesson: defineAction({
    description:
      "Marks a lesson as studied now, moving it to in-progress if untouched and logging study minutes for today.",
    request: z.object({
      lessonNumber: z.number().int().min(1).max(125),
      minutes: z.number().int().min(0).max(120).default(2),
    }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const now = new Date();
      const existing = await db
        .select()
        .from(schema.lessonProgress)
        .where(eq(schema.lessonProgress.lessonNumber, args.lessonNumber));
      const row = existing[0];
      if (row) {
        await db
          .update(schema.lessonProgress)
          .set({
            status: row.status === "not_started" ? "in_progress" : row.status,
            completion: Math.max(row.completion, 10),
            lastStudiedAt: now,
            updatedAt: now,
          })
          .where(eq(schema.lessonProgress.lessonNumber, args.lessonNumber));
      } else {
        await db.insert(schema.lessonProgress).values({
          lessonNumber: args.lessonNumber,
          status: "in_progress",
          completion: 10,
          lastStudiedAt: now,
          updatedAt: now,
        });
      }
      if (args.minutes > 0) {
        const key = dayKey(now);
        const days = await db
          .select()
          .from(schema.studyDays)
          .where(eq(schema.studyDays.day, key));
        const d = days[0];
        if (d) {
          await db
            .update(schema.studyDays)
            .set({ minutes: d.minutes + args.minutes, sessions: d.sessions + 1 })
            .where(eq(schema.studyDays.day, key));
        } else {
          await db
            .insert(schema.studyDays)
            .values({ day: key, minutes: args.minutes, sessions: 1 });
        }
        // Attribute the same minutes to this lesson + day so the Stats
        // report can split study time by lesson status.
        const lmWhere = and(
          eq(schema.lessonMinutes.lessonNumber, args.lessonNumber),
          eq(schema.lessonMinutes.day, key),
        );
        const lm = await db.select().from(schema.lessonMinutes).where(lmWhere);
        const lmRow = lm[0];
        if (lmRow) {
          await db
            .update(schema.lessonMinutes)
            .set({ minutes: lmRow.minutes + args.minutes })
            .where(lmWhere);
        } else {
          await db.insert(schema.lessonMinutes).values({
            lessonNumber: args.lessonNumber,
            day: key,
            minutes: args.minutes,
          });
        }
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setLessonCompletion: defineAction({
    description:
      "Sets a lesson's completion percentage and status, optionally recording a best quiz score.",
    request: z.object({
      lessonNumber: z.number().int().min(1).max(125),
      completion: z.number().int().min(0).max(100),
      status: z
        .enum(["not_started", "in_progress", "completed", "revision_needed"])
        .optional(),
      bestQuiz: z.number().int().min(0).max(100).optional(),
    }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const now = new Date();
      const status =
        args.status ??
        (args.completion >= 100
          ? "completed"
          : args.completion > 0
            ? "in_progress"
            : "not_started");
      const existing = await db
        .select()
        .from(schema.lessonProgress)
        .where(eq(schema.lessonProgress.lessonNumber, args.lessonNumber));
      const row = existing[0];
      if (row) {
        await db
          .update(schema.lessonProgress)
          .set({
            completion: Math.max(row.completion, args.completion),
            status,
            bestQuiz:
              args.bestQuiz != null
                ? Math.max(row.bestQuiz ?? 0, args.bestQuiz)
                : row.bestQuiz,
            lastStudiedAt: now,
            updatedAt: now,
          })
          .where(eq(schema.lessonProgress.lessonNumber, args.lessonNumber));
      } else {
        await db.insert(schema.lessonProgress).values({
          lessonNumber: args.lessonNumber,
          completion: args.completion,
          status,
          bestQuiz: args.bestQuiz ?? null,
          lastStudiedAt: now,
          updatedAt: now,
        });
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  markLessonProgress: defineAction({
    description:
      "Saves the learner's own reading mark for a lesson exactly as set (percentage read and status), so the mark can be raised or lowered; unlike setLessonCompletion it never merges with quiz-earned progress.",
    request: z.object({
      lessonNumber: z.number().int().min(1).max(125),
      completion: z.number().int().min(0).max(100),
      status: z.enum([
        "not_started",
        "in_progress",
        "completed",
        "revision_needed",
      ]),
    }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const now = new Date();
      const existing = await db
        .select()
        .from(schema.lessonProgress)
        .where(eq(schema.lessonProgress.lessonNumber, args.lessonNumber));
      const row = existing[0];
      if (row) {
        await db
          .update(schema.lessonProgress)
          .set({
            completion: args.completion,
            status: args.status,
            lastStudiedAt:
              args.status === "not_started" ? row.lastStudiedAt : now,
            updatedAt: now,
          })
          .where(eq(schema.lessonProgress.lessonNumber, args.lessonNumber));
      } else {
        await db.insert(schema.lessonProgress).values({
          lessonNumber: args.lessonNumber,
          completion: args.completion,
          status: args.status,
          lastStudiedAt: args.status === "not_started" ? null : now,
          updatedAt: now,
        });
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setWordFlags: defineAction({
    description:
      "Saves, unsaves, marks known or marks difficult a vocabulary entry, creating its review state if needed.",
    request: z.object({
      entryKey: z.string().min(1).max(120),
      lessonNumber: z.number().int().min(1).max(125),
      english: z.string().min(1).max(200),
      bengali: z.string().min(1).max(200),
      saved: z.boolean().optional(),
      known: z.boolean().optional(),
      difficult: z.boolean().optional(),
      note: z.string().max(1000).optional(),
    }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const now = new Date();
      const existing = await db
        .select()
        .from(schema.wordStates)
        .where(eq(schema.wordStates.entryKey, args.entryKey));
      const row = existing[0];
      if (row) {
        await db
          .update(schema.wordStates)
          .set({
            saved: args.saved != null ? (args.saved ? 1 : 0) : row.saved,
            known: args.known != null ? (args.known ? 1 : 0) : row.known,
            difficult:
              args.difficult != null ? (args.difficult ? 1 : 0) : row.difficult,
            note: args.note != null ? args.note : row.note,
            mastery:
              args.known === true
                ? "mastered"
                : args.difficult === true
                  ? "learning"
                  : row.mastery,
            nextReviewAt:
              args.known === true
                ? new Date(now.getTime() + 4 * 86400000)
                : row.nextReviewAt,
            updatedAt: now,
          })
          .where(eq(schema.wordStates.entryKey, args.entryKey));
      } else {
        await db.insert(schema.wordStates).values({
          entryKey: args.entryKey,
          lessonNumber: args.lessonNumber,
          english: args.english,
          bengali: args.bengali,
          saved: args.saved ? 1 : 0,
          known: args.known ? 1 : 0,
          difficult: args.difficult ? 1 : 0,
          mastery: args.known ? "mastered" : "learning",
          note: args.note ?? "",
          nextReviewAt: new Date(now.getTime() + 86400000),
          createdAt: now,
          updatedAt: now,
        });
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  gradeWord: defineAction({
    description:
      "Grades a word in review (again/hard/good/easy) and reschedules it with a simplified SM-2 spaced repetition algorithm, storing the review in history.",
    request: z.object({
      entryKey: z.string().min(1).max(120),
      lessonNumber: z.number().int().min(1).max(125),
      english: z.string().min(1).max(200),
      bengali: z.string().min(1).max(200),
      grade: z.enum(["again", "hard", "good", "easy"]),
    }),
    response: z.object({
      ok: z.literal(true),
      nextReviewAt: z.string(),
      intervalDays: z.number(),
      mastery: z.string(),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const now = new Date();
      const existing = await db
        .select()
        .from(schema.wordStates)
        .where(eq(schema.wordStates.entryKey, args.entryKey));
      const row = existing[0];
      let ease = row?.ease ?? 2.5;
      let interval = row?.intervalDays ?? 0;
      let reps = row?.repetitions ?? 0;
      let lapses = row?.lapses ?? 0;
      if (args.grade === "again") {
        interval = 0;
        reps = 0;
        lapses += 1;
        ease = Math.max(1.3, ease - 0.2);
      } else if (args.grade === "hard") {
        interval = Math.max(1, interval * 1.2 || 1);
        reps += 1;
        ease = Math.max(1.3, ease - 0.15);
      } else if (args.grade === "good") {
        interval = reps === 0 ? 1 : reps === 1 ? 3 : interval * ease;
        reps += 1;
      } else {
        interval = reps === 0 ? 2 : reps === 1 ? 5 : interval * ease * 1.3;
        reps += 1;
        ease = Math.min(2.8, ease + 0.15);
      }
      interval = Math.round(interval * 10) / 10;
      const mastery =
        args.grade === "again"
          ? "learning"
          : reps >= 4 && interval >= 14
            ? "mastered"
            : reps >= 1
              ? "review"
              : "learning";
      const next =
        args.grade === "again"
          ? new Date(now.getTime() + 10 * 60000)
          : new Date(now.getTime() + interval * 86400000);
      if (row) {
        await db
          .update(schema.wordStates)
          .set({
            ease,
            intervalDays: interval,
            repetitions: reps,
            lapses,
            mastery,
            known: mastery === "mastered" ? 1 : row.known,
            difficult: args.grade === "again" ? 1 : row.difficult,
            nextReviewAt: next,
            lastReviewedAt: now,
            updatedAt: now,
          })
          .where(eq(schema.wordStates.entryKey, args.entryKey));
      } else {
        await db.insert(schema.wordStates).values({
          entryKey: args.entryKey,
          lessonNumber: args.lessonNumber,
          english: args.english,
          bengali: args.bengali,
          ease,
          intervalDays: interval,
          repetitions: reps,
          lapses,
          mastery,
          difficult: args.grade === "again" ? 1 : 0,
          nextReviewAt: next,
          lastReviewedAt: now,
          createdAt: now,
          updatedAt: now,
        });
      }
      await db.insert(schema.reviewHistory).values({
        entryKey: args.entryKey,
        grade: args.grade,
        reviewedAt: now,
      });
      ctx.invalidateQueries();
      return {
        ok: true as const,
        nextReviewAt: next.toISOString(),
        intervalDays: interval,
        mastery,
      };
    },
  }),

  recordAttempt: defineAction({
    description:
      "Records the score of a quiz, game, listening, speaking or flashcard session for analytics.",
    request: z.object({
      lessonNumber: z.number().int().min(1).max(125).nullable(),
      kind: z.string().min(1).max(40),
      total: z.number().int().min(0).max(500),
      correct: z.number().int().min(0).max(500),
    }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      await db.insert(schema.attempts).values({
        lessonNumber: args.lessonNumber,
        kind: args.kind,
        total: args.total,
        correct: Math.min(args.correct, args.total),
        createdAt: new Date(),
      });
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  saveSettings: defineAction({
    description: "Saves the learner's study and speech preferences.",
    request: z.object({
      uiLanguage: z.string().max(10),
      accent: z.string().max(10),
      speechRate: z.number().min(0.5).max(1.5),
      dailyGoalMinutes: z.number().int().min(1).max(300),
      dailyGoalWords: z.number().int().min(1).max(200),
      showBengali: z.boolean(),
      autoPlay: z.boolean(),
      fontSize: z.string().max(20),
      theme: z.string().max(20),
    }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const values = {
        id: 1,
        uiLanguage: args.uiLanguage,
        accent: args.accent,
        speechRate: args.speechRate,
        dailyGoalMinutes: args.dailyGoalMinutes,
        dailyGoalWords: args.dailyGoalWords,
        showBengali: args.showBengali ? 1 : 0,
        autoPlay: args.autoPlay ? 1 : 0,
        fontSize: args.fontSize,
        theme: args.theme,
      };
      const existing = await db.select().from(schema.settings);
      if (existing[0]) {
        await db
          .update(schema.settings)
          .set(values)
          .where(eq(schema.settings.id, 1));
      } else {
        await db.insert(schema.settings).values(values);
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  addCustomWord: defineAction({
    description: "Adds a learner's own word to the personal vocabulary notebook.",
    request: z.object({
      english: z.string().trim().min(1).max(200),
      bengali: z.string().trim().min(1).max(200),
      note: z.string().max(500).default(""),
    }),
    response: z.object({ id: z.number() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const res = await db
        .insert(schema.customWords)
        .values({
          english: args.english,
          bengali: args.bengali,
          note: args.note,
          createdAt: new Date(),
        })
        .returning({ id: schema.customWords.id });
      const row = res[0];
      if (!row) throw new Error("addCustomWord failed");
      ctx.invalidateQueries();
      return { id: row.id };
    },
  }),

  deleteCustomWord: defineAction({
    description: "Deletes a custom word from the personal notebook.",
    request: z.object({ id: z.number().int().positive() }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      await db
        .delete(schema.customWords)
        .where(eq(schema.customWords.id, args.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setOxfordFlags: defineAction({
    description:
      "Saves, unsaves, marks known or marks difficult an Oxford 3000 word, creating its review state if needed.",
    request: z.object({
      entryKey: z.string().min(1).max(120),
      level: z.string().min(1).max(10),
      english: z.string().min(1).max(200),
      bengali: z.string().min(1).max(200),
      saved: z.boolean().optional(),
      known: z.boolean().optional(),
      difficult: z.boolean().optional(),
      note: z.string().max(1000).optional(),
    }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx, args): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      const now = new Date();
      const existing = await db
        .select()
        .from(schema.oxfordWordStates)
        .where(eq(schema.oxfordWordStates.entryKey, args.entryKey));
      const row = existing[0];
      if (row) {
        await db
          .update(schema.oxfordWordStates)
          .set({
            saved: args.saved != null ? (args.saved ? 1 : 0) : row.saved,
            known: args.known != null ? (args.known ? 1 : 0) : row.known,
            difficult:
              args.difficult != null ? (args.difficult ? 1 : 0) : row.difficult,
            note: args.note != null ? args.note : row.note,
            mastery:
              args.known === true
                ? "mastered"
                : args.difficult === true
                  ? "learning"
                  : row.mastery,
            nextReviewAt:
              args.known === true
                ? new Date(now.getTime() + 4 * 86400000)
                : row.nextReviewAt,
            updatedAt: now,
          })
          .where(eq(schema.oxfordWordStates.entryKey, args.entryKey));
      } else {
        await db.insert(schema.oxfordWordStates).values({
          entryKey: args.entryKey,
          level: args.level,
          english: args.english,
          bengali: args.bengali,
          saved: args.saved ? 1 : 0,
          known: args.known ? 1 : 0,
          difficult: args.difficult ? 1 : 0,
          mastery: args.known ? "mastered" : "learning",
          note: args.note ?? "",
          nextReviewAt: new Date(now.getTime() + 86400000),
          createdAt: now,
          updatedAt: now,
        });
      }
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  gradeOxfordWord: defineAction({
    description:
      "Grades an Oxford 3000 word in review (again/hard/good/easy) and reschedules it with the same simplified SM-2 spaced repetition as lesson words, storing the review in history.",
    request: z.object({
      entryKey: z.string().min(1).max(120),
      level: z.string().min(1).max(10),
      english: z.string().min(1).max(200),
      bengali: z.string().min(1).max(200),
      grade: z.enum(["again", "hard", "good", "easy"]),
    }),
    response: z.object({
      ok: z.literal(true),
      nextReviewAt: z.string(),
      intervalDays: z.number(),
      mastery: z.string(),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const now = new Date();
      const existing = await db
        .select()
        .from(schema.oxfordWordStates)
        .where(eq(schema.oxfordWordStates.entryKey, args.entryKey));
      const row = existing[0];
      let ease = row?.ease ?? 2.5;
      let interval = row?.intervalDays ?? 0;
      let reps = row?.repetitions ?? 0;
      let lapses = row?.lapses ?? 0;
      if (args.grade === "again") {
        interval = 0;
        reps = 0;
        lapses += 1;
        ease = Math.max(1.3, ease - 0.2);
      } else if (args.grade === "hard") {
        interval = Math.max(1, interval * 1.2 || 1);
        reps += 1;
        ease = Math.max(1.3, ease - 0.15);
      } else if (args.grade === "good") {
        interval = reps === 0 ? 1 : reps === 1 ? 3 : interval * ease;
        reps += 1;
      } else {
        interval = reps === 0 ? 2 : reps === 1 ? 5 : interval * ease * 1.3;
        reps += 1;
        ease = Math.min(2.8, ease + 0.15);
      }
      interval = Math.round(interval * 10) / 10;
      const mastery =
        args.grade === "again"
          ? "learning"
          : reps >= 4 && interval >= 14
            ? "mastered"
            : reps >= 1
              ? "review"
              : "learning";
      const next =
        args.grade === "again"
          ? new Date(now.getTime() + 10 * 60000)
          : new Date(now.getTime() + interval * 86400000);
      if (row) {
        await db
          .update(schema.oxfordWordStates)
          .set({
            ease,
            intervalDays: interval,
            repetitions: reps,
            lapses,
            mastery,
            known: mastery === "mastered" ? 1 : row.known,
            difficult: args.grade === "again" ? 1 : row.difficult,
            nextReviewAt: next,
            lastReviewedAt: now,
            updatedAt: now,
          })
          .where(eq(schema.oxfordWordStates.entryKey, args.entryKey));
      } else {
        await db.insert(schema.oxfordWordStates).values({
          entryKey: args.entryKey,
          level: args.level,
          english: args.english,
          bengali: args.bengali,
          ease,
          intervalDays: interval,
          repetitions: reps,
          lapses,
          mastery,
          difficult: args.grade === "again" ? 1 : 0,
          nextReviewAt: next,
          lastReviewedAt: now,
          createdAt: now,
          updatedAt: now,
        });
      }
      await db.insert(schema.reviewHistory).values({
        entryKey: args.entryKey,
        grade: args.grade,
        reviewedAt: now,
      });
      ctx.invalidateQueries();
      return {
        ok: true as const,
        nextReviewAt: next.toISOString(),
        intervalDays: interval,
        mastery,
      };
    },
  }),

  getPhrasalTranslations: defineAction({
    description:
      "Returns the cached Bengali translations for Complete Phrasal Verbs List entries (from the uploaded PDF), for the entry keys requested.",
    request: z.object({
      keys: z.array(z.string().min(1).max(20)).min(1).max(400),
    }),
    response: z.object({
      translations: z.array(
        z.object({
          key: z.string(),
          meaningBn: z.string(),
          exampleBn: z.string(),
        }),
      ),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.phrasalTranslations);
      const byKey = new Map(rows.map((r) => [r.entryKey, r]));
      const translations = args.keys
        .map((k) => byKey.get(k))
        .filter((r): r is NonNullable<typeof r> => r != null)
        .map((r) => ({ key: r.entryKey, meaningBn: r.meaningBn, exampleBn: r.exampleBn }));
      return { translations };
    },
  }),

  translatePhrasalBatch: defineAction({
    description:
      "Translates a small batch of Complete Phrasal Verbs List entries (the PDF's English meaning and example sentence) into Bengali, caching the result so each entry is only translated once.",
    request: z.object({
      items: z
        .array(
          z.object({
            key: z.string().min(1).max(20),
            meaning: z.string().min(1).max(300),
            example: z.string().min(1).max(400),
          }),
        )
        .min(1)
        .max(10),
    }),
    response: z.object({
      translations: z.array(
        z.object({
          key: z.string(),
          meaningBn: z.string(),
          exampleBn: z.string(),
        }),
      ),
    }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const existing = await db.select().from(schema.phrasalTranslations);
      const byKey = new Map(existing.map((r) => [r.entryKey, r]));
      const missing = args.items.filter((i) => !byKey.has(i.key));
      if (missing.length > 0) {
        const list = missing
          .map((i) => `KEY: ${i.key}\nMEANING: ${i.meaning}\nEXAMPLE: ${i.example}`)
          .join("\n\n");
        const result = await ctx.inference.complete(
          `You are translating English phrasal-verb study material into simple, natural Bengali for a beginner English learner from Bangladesh. For each item, translate the MEANING (a short dictionary-style meaning of the phrasal verb) into a short Bengali meaning, and translate the EXAMPLE sentence fully into Bengali. Keep the Bengali easy to understand. Items:\n\n${list}`,
          {
            schema: z.object({
              translations: z.array(
                z.object({
                  key: z.string(),
                  meaningBn: z.string(),
                  exampleBn: z.string(),
                }),
              ),
            }),
          },
        );
        const now = new Date();
        for (const t of result.translations) {
          if (!missing.some((m) => m.key === t.key)) continue;
          if (!t.meaningBn.trim() || !t.exampleBn.trim()) continue;
          await db
            .insert(schema.phrasalTranslations)
            .values({ entryKey: t.key, meaningBn: t.meaningBn, exampleBn: t.exampleBn, createdAt: now })
            .onConflictDoNothing();
          byKey.set(t.key, { entryKey: t.key, meaningBn: t.meaningBn, exampleBn: t.exampleBn, createdAt: now });
        }
      }
      const translations = args.items
        .map((i) => byKey.get(i.key))
        .filter((r): r is NonNullable<typeof r> => r != null)
        .map((r) => ({ key: r.entryKey, meaningBn: r.meaningBn, exampleBn: r.exampleBn }));
      return { translations };
    },
  }),

  resetProgress: defineAction({
    description:
      "Clears all learning progress, word states, attempts and study days so the learner can start fresh.",
    request: z.object({ confirm: z.literal(true) }),
    response: z.object({ ok: z.literal(true) }),
    handler: async (ctx): Promise<{ ok: true }> => {
      const db = ctx.db<typeof schema>();
      await db.delete(schema.lessonProgress);
      await db.delete(schema.lessonMinutes);
      await db.delete(schema.wordStates);
      await db.delete(schema.oxfordWordStates);
      await db.delete(schema.reviewHistory);
      await db.delete(schema.attempts);
      await db.delete(schema.studyDays);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),
} satisfies ActionsModule;
