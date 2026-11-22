# Content Completeness — English Learning Studio
Date: 2026-11-21
Method: computed directly from the shipped curriculum data (`client/src/curriculum.ts`) by importing it and counting fields — not estimated.

## Totals (verified by script)
- Lessons: **125** (numbers 1–125, no gaps, no duplicates)
- Vocabulary entries: **1,254** (10–12 per lesson)
- Entries with a Bengali meaning: **1,254 / 1,254**
- Entries with an English example + Bengali translation: **1,254 / 1,254**
- Entries with a micro-story/dialogue of ≥3 sentence-aligned EN/BN lines: **1,254 / 1,254**
- Lessons with a bilingual story whose every line has both English and Bengali: **125 / 125**
- Story comprehension questions across the curriculum: **375** (3 per lesson)
- Entries with at least one sense-matched synonym: 69 (only where a true synonym exists)
- Entries with at least one true antonym: 68; all other entries display an explicit "No natural antonym…" note or alternative expressions instead of a forced opposite
- Entries with a grammar/pattern note: 12 (sentence-pattern entries in Lessons 1, 2 and 125)

## Publication status by lesson group
| Lessons | Status | What that means |
|---|---|---|
| 1, 2, 5, 30, 85, 125 | **Hand-written, complete** | Every entry (10/10 per lesson) has an original hand-written definition (EN+BN), example (EN+BN), unique micro-story/dialogue, and grammar notes where relevant. Verified per entry by script (micro-story titles checked against the generator's frames). |
| All other 119 lessons | **Generated-system, functional** | Topic-specific word bank per lesson (real words + Bengali meanings for that topic only), definitions/examples from the app's content system, micro-stories from four rotating original narrative frames, a bilingual lesson story from category scenes, flashcards, 10 games and a final quiz all derived from the lesson's own entries. Not hand-reviewed entry by entry. |

## Representative lessons from the repair brief
| Lesson | Topic | Entries | Story lines | Status |
|---|---|---|---|---|
| 1 | Meeting New People | 10 | 8 | Hand-written 10/10 |
| 2 | Polite Expressions and Thanking People | 10 | 8 | Hand-written 10/10 |
| 16 | School Subjects | 10 | 8 | Generated-system |
| 30 | Wild Animals | 10 | 8 | Hand-written 10/10 |
| 60 | Grocery Shopping List | 10 | 8 | Generated-system |
| 85 | Body Parts | 10 | 8 | Hand-written 10/10 |
| 100 | Emergency Expressions | 10 | 8 | Generated-system (synonyms added for emergency/danger) |
| 118 | Question Words | 10 | 8 | Generated-system |
| 125 | Things I Need and Do Not Need | 10 | 8 | Hand-written 10/10, with need/must grammar patterns |

## Known quality limits
- Generated lessons' definitions are explanatory rather than dictionary-grade, and their stories are scene-based narratives that weave the lesson's words in, rather than fully original prose per lesson.
- Synonym/antonym coverage is deliberately conservative: a relation is shown only when it is linguistically sound for the entry's sense. Most concrete nouns (e.g. "tiger", "nose") correctly have no antonym.
- IPA is provided only for the ~50 headwords where it was verified in the data table; other entries show no IPA rather than a guessed one.
