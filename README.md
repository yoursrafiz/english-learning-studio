# English Learning Studio — run it on your own computer

A bilingual Bengali–English learning app for a Bengali-speaking beginner:
vocabulary, pronunciation, reading, listening, speaking, sentence
construction and practical communication.

## What's inside

- **125 lessons** (Basic English, Lesson 1 "Meeting New People" through
  Lesson 125 "Things I Need and Do Not Need") — vocabulary with Bengali
  meanings, phrases/sentences, synonyms and antonyms, examples,
  micro-stories, a full bilingual lesson story, flashcards, 14 games,
  quizzes, saved vocabulary, progress tracking, spaced-repetition
  review and analytics.
- **Oxford 3000** — 3,003 words in 302 book-style stories (31 modules),
  Everyday Life first, then A1, A2, B1, B2.
- **Phrasal Verbs** — 3,524 entries in 726 stories across 88 modules:
  Most common, More common, Business English and the Complete A–Z list.
- **Idioms and Phrases** — 310 idioms in 63 connected real-life stories,
  each with a Practice Worksheet (MCQ, fill in the blanks, sentence making).
- **Exams** — 25 checkpoint exams (one after every 5 lessons) plus a final
  IELTS-style speaking practice exam.
- Focus timer, daily goal, Dictionary, My Words, Review queue, Stats and
  Settings (Light / Dark / System theme, speech speed, language).

## How to run it (Windows, VS Code)

1. **Install Node.js** — download the LTS version from
   <https://nodejs.org> and install it. (Node 20 or newer.)
   To check it worked, open a terminal and run `node --version`.
2. **Download this repository** — on GitHub, click the green **Code**
   button, then **Download ZIP**, and unzip it. Or, if you have Git:
   `git clone https://github.com/yoursrafiz/english-learning-studio.git`
3. **Open the folder in VS Code** — File → Open Folder, choose the
   unzipped folder.
4. **Open a terminal in VS Code** — Terminal → New Terminal.
5. **Install the libraries** (only needed once):
   ```sh
   npm install
   ```
6. **Start the app**:
   ```sh
   npm run dev
   ```
7. **Open it in your browser** — go to <http://localhost:5173>.
   The app opens on the sign-in screen. Click **Sign in with Google**
   under **Testing Project** to enter (see "Google sign-in" below).
   To stop the app, press `Ctrl+C` in the terminal.

Other useful commands:

```sh
npm run build    # make a production build (output in dist/)
npm run preview  # serve the production build locally
```

## Where your progress is saved

Your progress (lesson progress, saved/known words, quiz scores, study
minutes, settings) is saved **in your browser** on your own computer
(localStorage, key `els-standalone-v1`). It is not sent anywhere.
Clearing the browser's site data, or switching to a different browser,
starts you fresh. The Settings page also has a "Reset progress" button.

## Google sign-in

The sign-in screen is the same as in the Muse-hosted version. Real
Google sign-in needs a Google OAuth Client ID, which is not included
here — put yours in `src/google-config.ts` (`GOOGLE_CLIENT_ID`) if you
have one. Without it, use the **Testing Project** entry on the
sign-in screen: it opens the app directly with no account, no name
and no photo.

## What is different from the Muse-hosted version

- No server and no database: the Bun server actions and SQLite
  database were replaced with the localStorage data layer in
  `src/api.ts`. All screens, lessons, stories, games and exams work
  the same.
- **Phrasal-verb Bengali translations:** 413 entries already had
  Bengali translations, and those are included
  (`src/phrasal-translations-cache.ts`). The hosted version translated
  new entries on demand with an AI service; this version has no such
  service, so entries without a translation honestly say
  "বাংলা অনুবাদ এখনো নেই" (no Bengali translation yet) instead of
  inventing one.
- **Listen buttons** use your browser's built-in voices (Web Speech
  API), and the speaking exam uses your browser's speech recognition.
  Both depend on your browser and device — Chrome on Windows works
  best. The microphone cannot be tested by us; try it on your own
  computer.

## Tech

Vite + React 19 + TypeScript + Tailwind CSS v4 + React Query + Recharts.
