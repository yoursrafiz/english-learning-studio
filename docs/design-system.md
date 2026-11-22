# Design System — English Learning Studio (Repair)
Source: repair brief Part 3 + installed `frontend-design` skill (`~/workspace/skills/frontend-design/SKILL.md`).
The brief's own direction wins where it pins a choice. The skill is used to avoid the generic SaaS-card default.

## Identity
A typography-first, editorial language reader — not a dashboard. One memorable element per screen (the lesson text / the story), everything else quiet and disciplined. Bengali is first-class, not a translation afterthought.

## Type
- Bengali: Hind Siliguri (fallback Noto Sans Bengali). English: Inter.
- Body 16–18px for lesson/story text, line-height 1.7–1.8 for Bengali, 1.6 for English. Story reading width max ~68ch, never full-width wall of text.
- Headings are sentence case, not ALL-CAPS eyebrows. No tracked-out eyebrow above every heading, no "WORD — fragment" labels, no single-word accent colour in headlines.
- Numbers that are data (lesson number, streak, %) use tabular figures, not a monospace face for decoration.

## Colour — restrained, theme-aware tokens
Light:
- Background: softly warm neutral #FAF8F4, surfaces white / #FFFFFF and #F3F0EA, text charcoal #1F2937 / #222222, muted text #6B7280.
- Accent: restrained teal/forest #0F766E (primary actions, active tab, progress), used sparingly. Semantic: success #15803D, warning #B45309, error #B91C1C, all at accessible contrast.
- No purple/pink gradients, no glassmorphism, no neon shadows, no glowing elements.
Dark:
- Background deep charcoal/navy #111827 / #0F172A, surfaces #1F2937 / #1E293B elevated, text soft off-white #F3F4F6, muted #9CA3AF.
- Accent muted teal #2DD4BF at reduced saturation for text/links, #0F766E for filled controls with white text.
- Same tokens, inverted. A theme toggle that only changes body background is a failure.

## Layout
- Dashboard: Continue Learning (large, one primary action), Current Lesson, Daily Goal, Due for Review, Recently Studied, Quick Practice, Progress — then a link to Browse All 125 Lessons. Do NOT show all 125 cards on the dashboard.
- /lessons: search + category + status filters, grouped sections (1–25, 26–50, 51–75, 76–100, 101–125) or pagination, list/grid toggle. Word count and completion come from real data.
- Lesson detail: compact header (number, EN + BN title, objectives, progress, Prev/Next), sticky section nav, then Vocabulary / Phrases / Synonyms & Antonyms / Word Stories / Lesson Story / Flashcards / Listening / Speaking / Games / Assessment in tabs or sections. Content first, decoration last.
- Story reader: comfortable width, sentence-level Bengali, EN-only toggle, highlighted vocabulary with word popover, audio controls, adjustable text size, reading progress.

## Components / states
- Cards differ by purpose: vocabulary cards are reading cards, story is a reader, games are play surfaces — not identical rounded cards everywhere.
- Visible keyboard focus, reduced-motion support, screen-reader labels, loading and error states, empty states that invite action ("Save your first word" / "No words due — great").
- Theme switcher in header: Light / Dark / System, persisted, system detection, no flash on load where possible.

## What the frontend-design skill forbids here
- The SaaS-card kit: identical rounded cards, same soft shadow, gradient washes.
- Warm cream #F4F1EA + terracotta #D97757 as a default — our warm neutral is close in hue, so the teal accent, Hind Siliguri/Inter pairing, and editorial reader layout must carry the distinctiveness, not a cream+terracotta hero.
- Fade-and-slide-up on every section, hover transitions on every card. Motion only answers an action (flip, save, correct/incorrect, tab change).
