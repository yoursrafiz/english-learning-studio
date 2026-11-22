# Reference Site Analysis — LingoHut (Bengali / English)
Date: 2026-11-21
Reference: https://www.lingohut.com/bn/l1/ইংরাজি-শিখুন
Method: Muse browser text fetch (`browser.open`) + search. NOT REA MCP — see "REA status" below.
Rule followed: use LingoHut only for curriculum organisation and learning interactions. Do not copy its proprietary lesson text, audio, code, or visual assets. All lesson content in English Learning Studio must be original.

## REA status — honest, do not overclaim
- REA skill files ARE installed in this workspace: `~/workspace/skills/reverse-engineer-anything/SKILL.md` (v63), wrapper at `~/workspace/custom-skills/local-reverse-engineer-anything/`, installed 2026-11-21 via `npx -y skills@1.7.0 add morluto/rea -y --json`.
- REA MCP is NOT connected in this Muse session. There are no REA tools in the active session.
- `npx -y rea-agents@latest doctor --client codex --json` returned `healthy: false`: Node 24.22.1 OK, host Ubuntu 24.04 OK, registration `codex` missing, skill identity missing at `/home/hatch/.agents/skills/reverse-engineer-anything` (our copy lives under `~/workspace/.agents/skills/`), no Hopper/Ghidra/IDA/JADX/Kuna engines, and `~/.codex/` does not exist here.
- Per the REA skill's connection-and-recovery guide, a skill install alone does not register MCP. The documented repair would be `rea setup --client codex` (with backups, then restart the client). That writes Codex configuration, not Muse configuration, and Codex is not the client in this chat — running it here would not give this Muse session REA browser tools. I have NOT run `rea setup`. Approval is required before changing tool configuration, and the user should decide whether Codex setup is wanted at all, given this work is in Muse.
- Browser investigation therefore used Muse's own browser tools (`browser.open` text fetch, plus a live `browser.browse` task running separately). Observations from those tools are labelled as such. They are NOT REA Evidence, have no REA Evidence IDs, and must not be presented as REA inspection results.
- REA's browser workflow in its skill (`list_browser_targets`, `capture_browser_scenario` with a CDP endpoint) could not be used, because no REA MCP server is connected to supply those tools.

## Verified observations — homepage (text fetch, 2026-11-21 15:00 UTC)
- URL visited: https://www.lingohut.com/bn/l1/%E0%A6%87%E0%A6%82%E0%A6%B0%E0%A6%BE%E0%A6%9C%E0%A6%BF-%E0%A6%B6%E0%A6%BF%E0%A6%96%E0%A7%81%E0%A6%A8
- Heading: "ইংরাজি শিখুন" — "নিজে নিজে ইংরাজি শিখুন. বিনামূল্যে ১২৫ টি পাঠ শিখুন। কোনরকম চুক্তি ছাড়াই, ফলে কোন ঝুঁকি নেই। ইংরাজি বলতে শিখুন. সম্পূর্ণ বিনামূল্যে!"
- The page lists 125 lessons, grouped under headings "বিনামূল্যে ইংরাজি পাঠ", "ইংরাজি বলতে শিখুন", "আরও ইংরাজি পাঠ".
- Description in the page footer: "ইংরাজি শিখুন. বিনামূল্যে ১২৫টি পাঠ সহ দ্রুত একটি নতুন ভাষা শিখুন। আমাদের সম্পূর্ণ শব্দভাণ্ডার সেই ভাষার স্থানীয়দের দ্বারা রেকর্ড করা হয়েছে।" Rating shown: 9.2/10 (18 ratings).
- Lesson numbering 1–125 is confirmed in the Bengali list. Titles match the user's manifest in broad terms, with Bengali wording differences noted below — do not blindly trust the English manifest against the Bengali titles.

## Title differences to note (Bengali homepage vs user's English manifest)
- Lesson 4: Bengali "পৃথিবীতে শান্তি" (Peace on Earth / Peace in the World) vs manifest "Peace, Love, and Kindness".
- Lesson 25: Bengali "পুকুরের মধ্যে" (In the Pond / In the Pool) vs manifest "At the Swimming Pool".
- Lesson 60: Bengali "মুদি কেনাকাটার তালিকা" vs manifest "Grocery Shopping List" — same meaning.
- Lesson 98: Bengali "ঘর বা এয়ার বিএনবি ভাড়া নেওয়া" (Renting a room or Airbnb) vs manifest "Hotel Rooms and Rental Accommodation".
- Lesson 115: Bengali "বিপরীত শব্দ" (Opposite Words) vs manifest "Opposites".
- Lesson 118: Bengali "প্রশ্নাবলী" (Questions) vs manifest "Question Words".
- Lesson 120: Bengali "অব্যয়" vs manifest "Prepositions"; Lesson 121 "সাধারণ অব্যয়" vs "Common Prepositions".
- All other Bengali titles observed align closely with the manifest topics in sequence. The English manifest supplied by the user is kept as the stable lesson identity (1–125); Bengali titles in our app should use natural Bangladeshi Bengali, not a literal copy of LingoHut's Bengali wording where it is awkward.

## Lesson 1 — text fetch (2026-11-21 15:00 UTC)
- URL: https://www.lingohut.com/bn/v789911/%E0%A6%87%E0%A6%82%E0%A6%B0%E0%A6%BE%E0%A6%9C%E0%A6%BF-%E0%A6%AA%E0%A6%BE%E0%A6%A0-%E0%A6%95%E0%A6%BE%E0%A6%B0%E0%A7%8B-%E0%A6%B8%E0%A6%BE%E0%A6%A5%E0%A7%87-%E0%A6%A6%E0%A7%87%E0%A6%96%E0%A6%BE-%E0%A6%95%E0%A6%B0%E0%A6%BE
- Heading: "ইংরাজি শিখুন :: পাঠ 1 কারো সাথে দেখা করা"
- Section: "ইংরাজি শব্দভান্ডার" — the static text lists Bengali phrases only, e.g. "নমস্কার; সুপ্রভাত; শুভ অপরাহ্ন; শুভ সন্ধ্যা; শুভ রাত্রি; আপনার নাম কি?; আমার নাম ____; দুঃখিত, আমি আপনার কথা শুনতে পাইনি; আপনি কোথায় থাকেন?; আপনি কোথা থেকে এসেছেন?; আপনি কেমন আছেন?; ভালো, ধন্যবাদ; আর আপনি?; আপনার সাথে দেখা করে ভালো লাগলো; আপনাকে দেখে ভালো লাগলো; আপনার দিনটি শুভ হোক; পরে দেখা হবে; আগামিকাল দেখা হবে; বিদায়;"
- No English words, audio controls, flashcards, matching/memory games, or quiz UI were visible in the static text extraction. Those are almost certainly JavaScript-driven. This is a limitation of text fetch, not proof they do not exist.
- Navigation links to Lessons 2–21 were present on the page.

## Live browser investigation — completed 2026-11-21 15:00–15:02 UTC (Muse browser, NOT REA)
No login, paywall, bot check, or error was encountered. No audio or bulk lesson text was downloaded or reproduced.
- Homepage: dark theme, centred single-column, ~1020px content column at 1910px viewport. Header: LingoHut logo, Home, Donate, YouTube/Facebook, "ইংরাজি শিখুন" dropdown, Blog, language dropdown, Bangladesh flag. 125 lessons as plain text links in a 4-column grid, each "ইংরাজি শিখুন পাঠ N" + Bengali title + right-arrow. Grouped: "বিনামূল্যে ইংরাজি পাঠ" Lessons 1–35, "ইংরাজি বলতে শিখুন" 36–70, "আরও ইংরাজি পাঠ" 71–125. A "report a mistake" button follows each group. Purple footer, copyright 2012–2025 (2012–2026 on flashcard page). No search box, progress tracker, or sign-in control visible.
- Lesson 1 (https://www.lingohut.com/bn/v789911/…): intro paragraph of Bengali phrases, central audio player, five round game buttons, vocabulary list, then "নিজে নিজে ইংরাজি শিখুন" links + embedded YouTube video. Vocabulary: 19 items, counter "1/19". Each row: Bengali phrase on top (white) and English below (purple), circular ▶ at right. Player: current item Bengali above English, "1/19", large purple ▶, microphone icon bottom-left, pause bottom-right, "এখানে ক্লিক করুন" button. Games present as labelled buttons: Flashcards, Matching, Tic-Tac-Toe, Concentration/memory, Listening. Flashcards opened separately (…/v789911F/…/ফ্ল্যাশ-কার্ড): one card at a time, English side shown, "1/19", teal Flip ("উল্টানো") button, shuffle/repeat, speaker, Next arrow, full list below. No dedicated Previous/Next lesson control — next lesson via the "more lessons" list, starting Lesson 2.
- Lesson 30 Wild Animals (https://www.lingohut.com/bn/v791361/…): same template, 18 single-word items. Possible data anomaly as rendered: "শেয়াল" paired with "Wolf" and "নেকড়ে" with "Alligator" — do NOT copy this; correct Bengali is শেয়াল = fox/jackal, নেকড়ে = wolf, কুমির = alligator/crocodile.
- Lesson 85 Body Parts (https://www.lingohut.com/bn/v794111/…): same template, 19 single-word items, counter "1/19" matches. Small "© Copyright … 794111" watermark over the player.
- Lesson 125 (https://www.lingohut.com/bn/v796111/…): same template, 12 items, all full sentences ("I need to…" / "I don't need to…"), not single words. Its "more lessons" list wraps back to Lesson 1.
- Loading: audio player is JavaScript-loaded — on Lessons 30 and 125 the first screenshot showed only a purple/cyan loading spinner in the player area while the list below was rendered; on Lessons 1 and 85 the player had rendered.
- NOT verified: actual audio playback (no play button pressed), flashcard flip (one Flip click did not visibly change the card), Matching / Tic-Tac-Toe / Concentration / Listening games beyond their labelled buttons, in-game boards, scoring, or audio. Mobile/narrow viewport not tested.
- Lessons 2, 16, 60, 100, 118 were not opened in the live browser — only their titles/numbering were verified from the homepage list. Do not claim they were inspected in detail.

## Confirmed data patterns (from homepage + Lesson 1 text)
- 125 sequential lessons, one topic per lesson, Bengali-first presentation for Bengali learners.
- Lesson = a set of phrases / vocabulary for one situation, not a grammar chapter.
- Free, no sign-up stated on the homepage ("কোনরকম চুক্তি ছাড়াই").

## Unverified assumptions
- That LingoHut lessons contain flashcards / matching / memory / Tic-Tac-Toe as separate games — the user brief asserts this, the static text fetch did not show it. Treat as unverified until live browser confirms.
- That every LingoHut lesson has the same number of vocabulary items — not established.
- English titles in the user's manifest are translations of the Bengali topics, not LingoHut's own English titles — do not present them as LingoHut's verified English titles.

## Recommended improvements for our app (from this analysis)
- Keep the 125-lesson sequential structure, but do not copy LingoHut's phrase-list-only lesson shape. Our app must add what LingoHut's static page does not show: definitions, synonyms/antonyms with Bengali, examples, micro-stories, a full bilingual story, flashcards, games, quizzes, and spaced review — all original.
- Bengali-first, but with English words always visible alongside Bengali, not Bengali-only lists.
- Lesson 1 must teach greetings as dialogues ("Hello, my name is Rafi." / "Nice to meet you."), not as an isolated word list, with no forced antonym for greetings.
