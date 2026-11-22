# Project Repair Audit — English Learning Studio
Date: 2026-11-21 (repair pass completed same day)
Artifact: `english-learning-studio` (Muse web artifact, React + server actions + artifact DB)

## Stack — verified
- Muse artifact stack: React client (`client/src/App.tsx`, `client/src/curriculum.ts`), typed server actions (`server/src/actions.ts`, 10 actions), Drizzle/SQLite schema (`server/src/schema.ts`), migrations in `drizzle/`. NOT Next.js / Prisma / PostgreSQL — the original brief's stack was substituted by the platform stack in the first build and remains so.
- No login/accounts: single-learner app; progress persists per user in the artifact DB (lesson_progress, word_states, review_history, attempts, study_days, settings, custom_words). Existing user data was preserved — this repair is an edit on the same slug, no reset.

## What was broken (found in this repair pass)
1. **Theme preference did nothing.** `settings.theme` (system/light/dark) was stored but never applied — the CSS only followed `prefers-color-scheme`, and the Settings label admitted it ("the app follows your device setting"). No theme switcher existed in any header.
2. **Lessons page was a wall.** All 125 lesson cards rendered at once with no pagination or grouping — a very long scroll on phone and desktop.
3. **Dashboard was a stat-card grid.** Eight near-identical stat tiles, no daily-goal progress against the learner's own goal setting, no quick-practice entry points, and a grid of lesson cards duplicating the catalog.
4. **Story reader gaps.** No text-size control and no reading/listening progress, both required by the brief.
5. **Content depth was uneven and templated.** Only Lessons 1 and 5 had any hand-written entries (5/10 and 6/10 of their entries). Every other entry's micro-story used one identical 5-line template ("X was at home one day, learning about…"), and fallback definitions/examples were meta text about the word rather than teaching content.
6. **REA not connected.** REA skill files are installed, but `rea-agents doctor` reported `healthy: false` (no Codex registration, no engines, no `~/.codex/`). The user explicitly said on 2026-11-21 to skip Codex setup, so no REA MCP inspection was performed and none is claimed. LingoHut was investigated with Muse's browser tools instead — see `reference-site-analysis.md`.
7. **Frontend-design skill.** The installed `frontend-design` skill (`~/workspace/skills/frontend-design/SKILL.md`) was read and applied via `docs/design-system.md`: typography-first editorial layout, restrained teal accent, no SaaS card wall, no gradients/glassmorphism.

## What was repaired in this pass
- **Real theme system:** `data-theme` tokens in `theme.css` (explicit Light/Dark override the OS; System = no attribute + media query), applied from the persisted setting on load, plus a ☀️/🌙/🖥️ switcher in the desktop sidebar and a new mobile top bar. The switcher saves through the existing `saveSettings` action, so the choice persists.
- **Dashboard redesigned:** Continue Learning panel, a "Today" panel with daily-goal progress bar (real minutes vs the learner's saved goal), streak/week/difficult/studied facts, Quick Practice tiles (Review, Flashcards, Story, Dictionary), a Learning Progress section (lessons completed bar + vocabulary mastered bar), Recently Studied, Saved Words, and one clear "Browse all 125 lessons" panel. The 8-tile stat grid and the dashboard lesson-card grid are gone.
- **Lessons page pagination:** 24 lessons per page with Prev/Next and "Page x of y", search + status + category filters (filters reset to page 1), grid/list toggle kept.
- **Story reader:** text-size control (3 sizes), listening progress (sentences heard / total, driven by real playback events), comfortable 68ch reading measure, existing modes/toggles/word lookup kept.
- **Content:** Lessons 1, 2, 5, 30, 85 and 125 are now fully hand-written — every entry (10/10 per lesson, 60 entries) has an original definition (EN + BN), example (EN + BN), a unique 4-line bilingual micro-story or dialogue, and grammar notes where the item is a sentence pattern (Lessons 2 and 125 especially). Sense-matched synonyms/antonyms were added for the new vocabulary (grateful, polite, necessary, emergency, danger). The generated micro-story engine for the remaining lessons now rotates four distinct narrative frames instead of one repeated template.
- **Coverage view** in the app now marks hand-written lessons (✍️) from the real `HANDWRITTEN_LESSONS` data.

## What remains incomplete — stated plainly
- Lessons 3, 4, 6–29, 31–84, 86–124 (119 lessons) still use the app's generated content system: topic-specific word banks with real Bengali meanings, rotating-frame micro-stories, category story scenes, and derived quizzes/games. They are functional and topic-correct, but they are NOT hand-written, linguistically reviewed lessons. See `content-completeness.md`.
- The representative lessons 16, 60, 100 and 118 named in the brief were not hand-written in this pass (100 and 118 are generated; 16 and 60 likewise). Lessons 1, 2, 30, 85, 125 from the brief's list were completed.
- No relational content tables were added to the DB: curriculum content ships as typed data in the client bundle (the platform's content model for this artifact), while all *learner* state is in the DB. The brief's Prisma-style content schema remains a documented model in `content-schema.md`, not implemented tables.
- Speech is the browser's built-in voices; speaking practice uses browser speech recognition where available, with a manual read-aloud fallback. Neither was live-verified with real audio in the sandbox.

## Safety of the repair
- No migration, no schema change, no data reset. Server actions unchanged. All changes are in `client/src/App.tsx`, `client/src/curriculum.ts`, `client/src/theme.css`, and these docs.
