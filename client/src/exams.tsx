// Exams & rewards for English Learning Studio.
//
// - Checkpoint exams: one exam per block of 5 lessons (after lessons
//   5, 10, 15 … 125), built only from the vocabulary, synonyms, antonyms,
//   examples and stories of those 5 lessons. An exam unlocks when all 5
//   lessons in its block are completed. Scores are stored as practice
//   attempts with kind "checkpoint-<last lesson>".
// - Final exam: an IELTS-style speaking test (Part 1 interview, Part 2
//   cue card, Part 3 discussion) unlocked after Lesson 125. The learner
//   answers by voice (browser speech recognition) or by typing. The band
//   estimate is computed transparently from the transcript only — words
//   spoken, vocabulary range, sentence length, connectors, speaking
//   speed — and is labelled everywhere as a practice estimate, never an
//   official IELTS score (the app cannot hear pronunciation). Attempts
//   are stored with kind "final-speaking" (total 90, correct = band × 10)
//   so the learner can see speaking improvement across attempts.
// - Celebration: the feedback overlay shown after every finished lesson
//   assessment — full confetti celebration on completion (70%+), warm
//   encouragement with a retry path below that; Pip, Bengali praise and
//   the learner's real stats either way.

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiResponse } from "./api";
import { Btn, Fi, SpeakBtn, optionsFor, shuffle, speak, type MCQ } from "./App";
import { getLesson, type VocabEntry } from "./curriculum";
import pupMascot from "./assets/pup-mascot.webp";

type State = ApiResponse<typeof api, "getState">;
type Settings = State["settings"];

export type ExamGo = (
  v:
    | { name: "home" }
    | { name: "lessons" }
    | { name: "lesson"; n: number; tab?: string }
    | { name: "exams" }
    | { name: "checkpoint"; end: number }
    | { name: "final" },
) => void;

// ---------- Bengali motivation lines ----------
// Original one-line encouragements, rotated daily. Shown on Home, in the
// sidebar and on the exams page so the learner always meets one.
export const MOTIVATIONS: { bn: string; en: string }[] = [
  { bn: "প্রতিদিন একটু একটু পড়লেই একদিন বড় সাফল্য আসবে।", en: "A little study every day becomes a big success one day." },
  { bn: "ভুল করা মানেই শেখা — ভুল করতে ভয় পাবেন না।", en: "Making mistakes means learning — do not be afraid of them." },
  { bn: "আজকের একটি নতুন শব্দ, আগামীকালের আত্মবিশ্বাস।", en: "One new word today is tomorrow's confidence." },
  { bn: "ধীরে ধীরে হলেও থামবেন না; থেমে যাওয়াই একমাত্র ব্যর্থতা।", en: "Slow is fine — stopping is the only failure." },
  { bn: "ইংরেজি একটি দক্ষতা — প্রতিদিনের অনুশীলনেই তা গড়ে ওঠে।", en: "English is a skill, and skills grow with daily practice." },
  { bn: "অন্যের সঙ্গে তুলনা নয়; নিজের গতকালের সঙ্গে প্রতিযোগিতা করুন।", en: "Do not compare with others — compete with yesterday's you." },
  { bn: "পাঁচ মিনিটের পড়াও, না পড়ার চেয়ে অনেক ভালো।", en: "Five minutes of study beats no study at all." },
  { bn: "শব্দ শিখুন, বাক্য বানান, গল্প বলুন — এভাবেই ভাষা নিজের হয়ে যায়।", en: "Learn words, build sentences, tell stories — that is how a language becomes yours." },
  { bn: "আপনার লক্ষ্য ব্যান্ড ৭.৫ — প্রতিটি পাঠ আপনাকে এক ধাপ এগিয়ে নিচ্ছে।", en: "Your target is Band 7.5 — every lesson takes you one step closer." },
  { bn: "কঠিন শব্দ মানেই হাল ছাড়ার কারণ নয়, আরেকবার চেষ্টা করার সুযোগ।", en: "A hard word is not a reason to quit — it is a chance to try once more." },
  { bn: "শুনুন, বলুন, পড়ুন, লিখুন — চারদিক থেকে ভাষাকে আপন করুন।", en: "Listen, speak, read, write — meet the language from every side." },
  { bn: "ছোট ছোট জয়ের ধারাই বড় জয়ের ভিত্তি।", en: "A chain of small wins is the foundation of a big win." },
];

export function motivationOfDay(): { bn: string; en: string } {
  const day = Math.floor(Date.now() / 86400000);
  return MOTIVATIONS[day % MOTIVATIONS.length] ?? MOTIVATIONS[0] ?? { bn: "", en: "" };
}

// ---------- small shared helpers ----------
function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function streakOf(state: State): number {
  const daySet = new Set(state.studyDays.filter((d) => d.minutes > 0).map((d) => d.day));
  let streak = 0;
  const cursor = new Date();
  if (!daySet.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (daySet.has(dayKey(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

function lessonStatus(state: State, n: number): string {
  return state.progress.find((p) => p.lessonNumber === n)?.status ?? "not_started";
}

export const CHECKPOINT_ENDS: number[] = Array.from({ length: 25 }, (_, i) => (i + 1) * 5);
export const CHECKPOINT_PASS = 60;

export function checkpointBest(state: State, end: number): number | null {
  const rows = state.attempts.filter((a) => a.kind === `checkpoint-${end}` && a.total > 0);
  if (rows.length === 0) return null;
  return Math.max(...rows.map((a) => Math.round((a.correct / a.total) * 100)));
}

export function blockCompleted(state: State, end: number): number {
  let c = 0;
  for (let n = end - 4; n <= end; n++) if (lessonStatus(state, n) === "completed") c++;
  return c;
}

const CONFETTI_COLORS = ["#ffc81a", "#e8930c", "#d63a2a", "#2f9e44", "#1971c2", "#ffffff"];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: (i * 37.7) % 100,
        delay: (i % 9) * 0.28,
        duration: 2.6 + ((i * 13) % 10) / 6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length] ?? "#ffc81a",
        width: 7 + (i % 3) * 3,
        height: 11 + (i % 4) * 3,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// ---------- lesson-complete celebration (the dopamine moment) ----------
const PRAISES: { bn: string; en: string }[] = [
  { bn: "অসাধারণ! আরেকটি পাঠ জয় করে ফেললেন!", en: "Amazing — you conquered another lesson!" },
  { bn: "দারুণ কাজ! আপনার মস্তিষ্ক আজ আরও শক্তিশালী হলো।", en: "Great work — your brain is stronger today." },
  { bn: "অভিনন্দন! এই জয়টা পুরোপুরি আপনার প্রাপ্য।", en: "Congratulations — you earned this win." },
  { bn: "চমৎকার! ধারাবাহিকতাই সাফল্যের চাবিকাঠি, আর আপনি তা ধরে রেখেছেন।", en: "Wonderful — consistency is the key, and you are keeping it." },
];

export function Celebration({ n, pct, state, go, onClose }: {
  n: number;
  pct: number;
  state: State;
  go: ExamGo;
  onClose: () => void;
}) {
  // Feedback fires after EVERY finished lesson assessment: a full
  // confetti celebration when the lesson is completed (70%+, the app's
  // completion rule), and a warm encouragement card with a clear retry
  // path when it is not — the learner always gets a feedback moment.
  const passed = pct >= 70;
  const praise = passed
    ? PRAISES[n % PRAISES.length] ?? PRAISES[0] ?? { bn: "", en: "" }
    : { bn: "ভালো চেষ্টা! আরেকটু পড়লেই এই পাঠ আপনার হয়ে যাবে।", en: "Good effort — a little more study and this lesson is yours." };
  const alreadyDone = lessonStatus(state, n) === "completed";
  const completedCount = state.progress.filter((p) => p.status === "completed").length + (!alreadyDone && passed ? 1 : 0);
  const streak = streakOf(state);
  const mastered = state.words.filter((w) => w.mastery === "mastered" || w.known).length;
  const lesson = getLesson(n);
  const isCheckpointEnd = n % 5 === 0;
  const motivation = MOTIVATIONS[n % MOTIVATIONS.length] ?? praise;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Lesson ${n} assessment feedback`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {passed && <Confetti />}
      <div className="pop-in relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-[2rem] bg-[var(--sheet)] p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <img src={pupMascot} alt="Pip the puppy, celebrating with you" className="pup-bob mx-auto h-24 w-24 rounded-full border-4 border-white object-cover shadow-[0_10px_24px_rgba(34,26,5,0.25)]" width={400} height={400} />
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-extrabold text-[var(--text)]">
          <Fi n="trophy" /> {passed ? `Lesson ${n} complete · ${pct}%` : `Lesson ${n} assessment · ${pct}% — ${70 - pct}% more to complete it`}
        </p>
        <h2 className="bn font-display mt-2 text-2xl leading-snug font-semibold text-[var(--text)]">{praise.bn}</h2>
        <p className="mt-1 text-sm text-[var(--dim)]">{praise.en}</p>
        <p className="mt-1 text-sm font-semibold text-[var(--text)]">
          "{lesson.en}" — <span className="bn">{lesson.bn}</span>
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-[var(--surface2)] p-2.5">
            <p className="text-lg font-extrabold text-[var(--text)]">{completedCount}/125</p>
            <p className="bn text-xs text-[var(--dim)]">পাঠ সম্পন্ন</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface2)] p-2.5">
            <p className="inline-flex items-center gap-1 text-lg font-extrabold text-[var(--text)]"><Fi n="flame" solid /> {streak}</p>
            <p className="bn text-xs text-[var(--dim)]">দিনের ধারাবাহিকতা</p>
          </div>
          <div className="rounded-2xl bg-[var(--surface2)] p-2.5">
            <p className="inline-flex items-center gap-1 text-lg font-extrabold text-[var(--text)]"><Fi n="star" solid /> {mastered}</p>
            <p className="bn text-xs text-[var(--dim)]">শব্দ আয়ত্তে</p>
          </div>
        </div>
        <p className="bn mt-4 rounded-2xl border-2 border-dashed border-[var(--border)] p-3 text-sm leading-relaxed text-[var(--text)]">
          <Fi n="sparkles" /> {motivation.bn}
        </p>
        <div className="mt-4 grid gap-2">
          {!passed && (
            <>
              <Btn variant="primary" ariaLabel={`Review the vocabulary of lesson ${n} and try again`} onClick={() => { onClose(); go({ name: "lesson", n, tab: "vocab" }); }}>
                <Fi n="book-open-cover" /> Review the words, then retry
              </Btn>
              <Btn ariaLabel={`Retake the assessment of lesson ${n}`} onClick={() => { onClose(); go({ name: "lesson", n, tab: "assess" }); }}>
                <Fi n="rotate-right" /> Try the assessment again
              </Btn>
            </>
          )}
          {passed && isCheckpointEnd && n < 125 && (
            <Btn variant="primary" ariaLabel={`Take the checkpoint exam for lessons ${n - 4} to ${n}`} onClick={() => { onClose(); go({ name: "checkpoint", end: n }); }}>
              <Fi n="trophy" /> Checkpoint exam: Lessons {n - 4}–{n} →
            </Btn>
          )}
          {passed && n === 125 && (
            <Btn variant="primary" ariaLabel="Take the final IELTS speaking exam" onClick={() => { onClose(); go({ name: "final" }); }}>
              <Fi n="microphone" /> Final exam: IELTS speaking test →
            </Btn>
          )}
          {passed && n < 125 && (
            <Btn variant={isCheckpointEnd ? "soft" : "primary"} ariaLabel={`Go to lesson ${n + 1}`} onClick={() => { onClose(); go({ name: "lesson", n: n + 1 }); }}>
              <Fi n="play" /> Next: Lesson {n + 1} — {getLesson(n + 1).en}
            </Btn>
          )}
          <Btn variant="ghost" ariaLabel="Close celebration and keep studying this lesson" onClick={onClose}>
            Keep studying this lesson
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ---------- exams hub ----------
export function ExamsHome({ state, go }: { state: State; go: ExamGo }) {
  const motivation = motivationOfDay();
  const passedCount = CHECKPOINT_ENDS.filter((end) => (checkpointBest(state, end) ?? 0) >= CHECKPOINT_PASS).length;
  const finals = state.attempts.filter((a) => a.kind === "final-speaking" && a.total > 0);
  const finalBest = finals.length ? Math.max(...finals.map((a) => a.correct / 10)) : null;
  const finalUnlocked = lessonStatus(state, 125) === "completed";
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-[var(--text)]">Exams · পরীক্ষা</h1>
      <p className="bn mt-1 text-sm leading-relaxed text-[var(--dim)]">
        প্রতি ৫টি পাঠ শেষ হলেই সেই ৫ পাঠের ওপর একটি চেকপয়েন্ট পরীক্ষা খুলবে। সব পাঠ শেষে আছে IELTS-ধাঁচের ফাইনাল স্পিকিং পরীক্ষা — যেখানে আপনি নিজের কণ্ঠে উত্তর দেবেন।
      </p>
      <p className="bn mt-3 rounded-2xl bg-[var(--accent-soft)] p-3.5 text-base leading-relaxed font-semibold text-[var(--text)]">
        <Fi n="sparkles" /> {motivation.bn}
        <span className="mt-0.5 block text-sm font-normal text-[var(--dim)]">{motivation.en}</span>
      </p>

      <div className="mt-4 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[0.14em] text-[var(--dim)] uppercase"><Fi n="microphone" /> Final exam · ফাইনাল পরীক্ষা</p>
            <h2 className="font-display mt-1 text-xl font-semibold text-[var(--text)]">IELTS Speaking Test</h2>
            <p className="bn mt-1 text-sm leading-relaxed text-[var(--dim)]">
              তিনটি অংশ: সাক্ষাৎকার (Part 1), কিউ কার্ড (Part 2) ও আলোচনা (Part 3)। মাইকে উত্তর দিন — আপনার বলা লেখা থেকে ফ্লুয়েন্সি, শব্দভাণ্ডার ও বাক্যের গঠন মেপে একটি অনুশীলন-ব্যান্ড দেওয়া হবে, আর আগের চেষ্টার সঙ্গে তুলনা করে দেখা যাবে কতটা উন্নতি হয়েছে।
            </p>
            {finalBest != null && (
              <p className="mt-2 text-sm font-bold text-[var(--text)]">
                Best practice band so far: {finalBest.toFixed(1)} · {finals.length} attempt{finals.length === 1 ? "" : "s"}
              </p>
            )}
            {!finalUnlocked && (
              <p className="bn mt-2 text-sm font-semibold text-[var(--rose)]">
                <Fi n="key" /> এই পরীক্ষাটি খুলবে Lesson 125 সম্পন্ন করার পর।
              </p>
            )}
          </div>
          <Btn
            variant="primary"
            ariaLabel={finalUnlocked ? "Open the final IELTS speaking exam" : "Open lesson 125 to unlock the final exam"}
            onClick={() => go(finalUnlocked ? { name: "final" } : { name: "lesson", n: 125 })}
          >
            {finalUnlocked ? <><Fi n="microphone" /> Take the final exam</> : <><Fi n="key" /> Go to Lesson 125</>}
          </Btn>
        </div>
      </div>

      <h2 className="font-display mt-7 mb-2.5 text-xl font-semibold text-[var(--text)]">
        Checkpoint exams · চেকপয়েন্ট পরীক্ষা <span className="text-base font-bold text-[var(--dim)]">({passedCount}/25 passed)</span>
      </h2>
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {CHECKPOINT_ENDS.map((end) => {
          const done = blockCompleted(state, end);
          const unlocked = done === 5;
          const best = checkpointBest(state, end);
          const passed = best != null && best >= CHECKPOINT_PASS;
          const first = getLesson(end - 4);
          const last = getLesson(end);
          return (
            <div key={end} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_6px_20px_rgba(34,26,5,0.07)]">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-lg font-semibold text-[var(--text)]">Lessons {end - 4}–{end}</p>
                {passed ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-extrabold text-[var(--text)]"><Fi n="badge-check" /> Passed · {best}%</span>
                ) : best != null ? (
                  <span className="rounded-full bg-[var(--surface2)] px-2.5 py-1 text-xs font-extrabold text-[var(--text)]">Best {best}% · pass is {CHECKPOINT_PASS}%</span>
                ) : unlocked ? (
                  <span className="rounded-full bg-[var(--surface2)] px-2.5 py-1 text-xs font-extrabold text-[var(--text)]">Ready · প্রস্তুত</span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface2)] px-2.5 py-1 text-xs font-extrabold text-[var(--dim)]"><Fi n="key" /> Locked</span>
                )}
              </div>
              <p className="mt-0.5 truncate text-sm text-[var(--dim)]">{first.en} → {last.en}</p>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-label={`Lessons completed in block ${end - 4} to ${end}`} aria-valuenow={done} aria-valuemin={0} aria-valuemax={5}>
                <div className="h-full rounded-full bg-[var(--hero)] transition-all" style={{ width: `${done * 20}%` }} />
              </div>
              <p className="bn mt-1.5 text-sm text-[var(--dim)]">{done}/৫টি পাঠ সম্পন্ন {unlocked ? "— পরীক্ষা দেওয়ার জন্য প্রস্তুত!" : "হলেই পরীক্ষা খুলবে।"}</p>
              {unlocked ? (
                <Btn className="mt-2.5" variant="primary" ariaLabel={`Start checkpoint exam for lessons ${end - 4} to ${end}`} onClick={() => go({ name: "checkpoint", end })}>
                  <Fi n="pencil" /> {best != null ? "Retake exam" : "Start exam"}
                </Btn>
              ) : (
                <Btn className="mt-2.5" ariaLabel={`Open the next unfinished lesson in block ${end - 4} to ${end}`} onClick={() => {
                  let target = end;
                  for (let n = end - 4; n <= end; n++) if (lessonStatus(state, n) !== "completed") { target = n; break; }
                  go({ name: "lesson", n: target });
                }}>
                  <Fi n="book-open-cover" /> Study Lesson {(() => { for (let n = end - 4; n <= end; n++) if (lessonStatus(state, n) !== "completed") return n; return end; })()} next
                </Btn>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- checkpoint exam ----------
function buildCheckpointQuestions(end: number, seed: number): MCQ[] {
  const lessons = [end - 4, end - 3, end - 2, end - 1, end].map((n) => getLesson(n));
  const pool: VocabEntry[] = lessons.flatMap((l) => l.entries);
  const picked = shuffle(pool, seed + 1);
  const qs: MCQ[] = [];
  picked.slice(0, 4).forEach((e, i) => {
    const o = optionsFor(pool, e, (x) => x.bn, seed + 11 + i);
    qs.push({ prompt: <span>What does "{e.en}" mean?</span>, options: o.options, answer: o.answer, explain: `"${e.en}" = ${e.bn} (Lesson ${e.lesson}). Example: ${e.exEn}` });
  });
  picked.slice(4, 7).forEach((e, i) => {
    const o = optionsFor(pool, e, (x) => x.en, seed + 21 + i);
    qs.push({ prompt: <span className="bn">"{e.bn}" — এর ইংরেজি কী?</span>, options: o.options, answer: o.answer, explain: `${e.bn} = "${e.en}" (Lesson ${e.lesson}).` });
  });
  picked.slice(7, 9).forEach((e, i) => {
    const o = optionsFor(pool, e, (x) => x.bn, seed + 31 + i);
    qs.push({ prompt: <span className="inline-flex items-center gap-1.5"><Fi n="headphones" /> Listen and choose the meaning</span>, speakText: e.en, options: o.options, answer: o.answer, explain: `You heard "${e.en}" = ${e.bn} (Lesson ${e.lesson}).` });
  });
  pool.filter((e) => e.type === "word" && e.exEn.toLowerCase().includes(e.en.toLowerCase())).slice(0, 2).forEach((e, i) => {
    const blanked = e.exEn.replace(new RegExp(e.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____");
    const o = optionsFor(pool, e, (x) => x.en, seed + 41 + i);
    qs.push({ prompt: <span>Fill the blank: {blanked}</span>, options: o.options, answer: o.answer, explain: `Full sentence: ${e.exEn} (${e.exBn})` });
  });
  pool.filter((e) => e.synonyms.length > 0).slice(0, 2).forEach((e, i) => {
    const target = e.synonyms[0];
    if (!target) return;
    const wrongs = shuffle(pool.filter((x) => x.key !== e.key).flatMap((x) => (x.synonyms[0] ? [x.synonyms[0].en] : [])), seed + 51 + i).slice(0, 3);
    const opts = shuffle([target.en, ...wrongs], seed + 53 + i);
    qs.push({ prompt: <span>Best synonym of "{e.en}"?</span>, options: opts, answer: opts.indexOf(target.en), explain: `"${target.en}" (${target.bn}) is a synonym of "${e.en}" (${e.bn}).` });
  });
  pool.filter((e) => e.antonyms.length > 0).slice(0, 2).forEach((e, i) => {
    const target = e.antonyms[0];
    if (!target) return;
    const wrongs = shuffle(pool.filter((x) => x.key !== e.key).flatMap((x) => (x.antonyms[0] ? [x.antonyms[0].en] : [])), seed + 61 + i).slice(0, 3);
    const opts = shuffle([target.en, ...wrongs], seed + 63 + i);
    qs.push({ prompt: <span>Antonym of "{e.en}"?</span>, options: opts, answer: opts.indexOf(target.en), explain: `"${target.en}" (${target.bn}) is the opposite of "${e.en}" (${e.bn}).` });
  });
  lessons.flatMap((l) => l.story.questions.map((q) => ({ q, lessonN: l.n }))).slice(0, 2).forEach(({ q, lessonN }) => {
    qs.push({ prompt: <span>{q.qEn}</span>, options: q.options, answer: q.answer, explain: `${q.qBn} (Story of Lesson ${lessonN})` });
  });
  return shuffle(qs, seed + 99);
}

export function CheckpointExam({ end, state, settings, go }: { end: number; state: State; settings: Settings; go: ExamGo }) {
  const qc = useQueryClient();
  const [seed, setSeed] = useState(1);
  const questions = useMemo(() => buildCheckpointQuestions(end, seed), [end, seed]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [review, setReview] = useState<{ q: MCQ; pickedIdx: number }[]>([]);
  const [finished, setFinished] = useState(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: end, kind: `checkpoint-${end}`, total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const done = blockCompleted(state, end);

  if (done < 5) {
    return (
      <div>
        <Btn ariaLabel="Back to all exams" onClick={() => go({ name: "exams" })}>← All exams</Btn>
        <div className="mt-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
          <h1 className="font-display text-xl font-semibold text-[var(--text)]"><Fi n="key" /> Checkpoint exam: Lessons {end - 4}–{end}</h1>
          <p className="bn mt-1 text-sm leading-relaxed text-[var(--dim)]">এই পরীক্ষাটি খুলতে হলে প্রথমে এই ৫টি পাঠের প্রতিটির মূল্যায়নে কমপক্ষে ৭০% পেয়ে পাঠ সম্পন্ন করতে হবে। এখন পর্যন্ত {done}/৫টি সম্পন্ন হয়েছে।</p>
          <div className="mt-3 grid gap-2">
            {[end - 4, end - 3, end - 2, end - 1, end].map((n) => {
              const l = getLesson(n);
              const st = lessonStatus(state, n);
              return (
                <button key={n} type="button" aria-label={`Open lesson ${n}: ${l.en}`} onClick={() => go({ name: "lesson", n })} className="flex items-center gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-3 text-left">
                  <Fi n={l.icon} className="text-xl" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[var(--text)]">Lesson {n}: {l.en}</span>
                    <span className="bn block truncate text-sm text-[var(--dim)]">{l.bn}</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 text-sm font-bold ${st === "completed" ? "text-[var(--accent)]" : "text-[var(--dim)]"}`}>
                    {st === "completed" ? <><Fi n="badge-check" /> Done</> : "Open →"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[qi];
  if (finished || !q) {
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
    const passed = pct >= CHECKPOINT_PASS;
    return (
      <div className="relative">
        {passed && <Confetti />}
        <div className="pop-in relative rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-center shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
          <img src={pupMascot} alt="" className="mx-auto h-20 w-20 rounded-full border-4 border-white object-cover shadow" width={320} height={320} />
          <p className="font-display mt-2 text-4xl font-semibold text-[var(--text)]">{pct}%</p>
          <p className="text-sm text-[var(--dim)]">{score} / {questions.length} correct · pass mark {CHECKPOINT_PASS}%</p>
          <h2 className="bn font-display mt-2 text-xl font-semibold text-[var(--text)]">
            {passed ? "অভিনন্দন! আপনি এই ধাপের পরীক্ষায় পাস করেছেন!" : "আরেকটু হলেই পাস! পাঠগুলো আবার দেখে আবার চেষ্টা করুন।"}
          </h2>
          <p className="mt-1 text-sm text-[var(--dim)]">
            {passed
              ? `Checkpoint ${end / 5} of 25 cleared — Lessons ${end - 4}–${end} are truly yours now.`
              : `You need ${CHECKPOINT_PASS}% to pass. Review the answers below, revisit the lessons, and retake the exam.`}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Btn variant="primary" ariaLabel="Retake this checkpoint exam" onClick={() => { setSeed((s) => s + 1); setQi(0); setScore(0); setPicked(null); setReview([]); setFinished(false); }}>
              <Fi n="rotate-right" /> Retake exam
            </Btn>
            {passed && end < 125 && (
              <Btn ariaLabel={`Start lesson ${end + 1}`} onClick={() => go({ name: "lesson", n: end + 1 })}><Fi n="play" /> Start Lesson {end + 1}</Btn>
            )}
            {passed && end === 125 && (
              <Btn ariaLabel="Open the final IELTS speaking exam" onClick={() => go({ name: "final" })}><Fi n="microphone" /> Final speaking exam</Btn>
            )}
            <Btn ariaLabel="Back to all exams" onClick={() => go({ name: "exams" })}>All exams</Btn>
          </div>
        </div>
        <h3 className="font-display mt-5 mb-2 text-lg font-semibold text-[var(--text)]">Review your answers · উত্তরগুলো দেখুন</h3>
        <div className="grid gap-2">
          {review.map((r, i) => (
            <div key={i} className="rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="font-semibold text-[var(--text)]">{r.q.prompt}</div>
              <p className={`mt-1 text-sm font-semibold ${r.pickedIdx === r.q.answer ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
                {r.pickedIdx === r.q.answer ? <><Fi n="check" /> Your answer: {r.q.options[r.pickedIdx]}</> : <><Fi n="cross" /> Your answer: {r.q.options[r.pickedIdx] ?? "—"} · Correct: {r.q.options[r.q.answer]}</>}
              </p>
              <p className="mt-0.5 text-sm text-[var(--dim)]">{r.q.explain}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Btn ariaLabel="Back to all exams" onClick={() => go({ name: "exams" })}>← All exams</Btn>
      <div className="mt-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
        <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--dim)] uppercase">Checkpoint exam · চেকপয়েন্ট পরীক্ষা</p>
        <h1 className="font-display mt-1 text-xl font-semibold text-[var(--text)]">Lessons {end - 4}–{end}</h1>
        <p className="bn mt-0.5 text-sm text-[var(--dim)]">এই পরীক্ষার সব প্রশ্ন এসেছে পাঠ {end - 4}–{end} থেকে। পাস নম্বর {CHECKPOINT_PASS}%।</p>
        <p className="mt-3 text-xs text-[var(--dim)]">Question {qi + 1} / {questions.length} · Score {score}</p>
        <div className="mt-2 flex items-center gap-2 text-lg font-semibold text-[var(--text)]">
          {q.prompt}
          {q.speakText && <SpeakBtn text={q.speakText} settings={settings} label={`Listen: ${q.speakText}`} />}
        </div>
        <div className="mt-3 grid gap-2">
          {q.options.map((opt, i) => {
            const isRight = picked != null && i === q.answer;
            const isWrong = picked === i && i !== q.answer;
            return (
              <button
                key={`${opt}-${i}`}
                type="button"
                aria-label={`Exam answer option: ${opt}`}
                disabled={picked != null}
                onClick={() => { setPicked(i); if (i === q.answer) setScore((s) => s + 1); setReview((r) => [...r, { q, pickedIdx: i }]); }}
                className={`rounded-xl border px-4 py-3 text-left text-base ${isRight ? "border-[var(--accent)] bg-[var(--accent-soft)]" : isWrong ? "border-[var(--rose)] bg-red-50 dark:bg-red-950" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"}`}
              >
                <span className="bn">{opt}</span>
              </button>
            );
          })}
        </div>
        {picked != null && (
          <div className="mt-3">
            <p className={`text-sm font-medium ${picked === q.answer ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
              {picked === q.answer ? <><Fi n="check" /> সঠিক!</> : <><Fi n="cross" /> ভুল হয়েছে।</>} <span className="text-[var(--text)]">{q.explain}</span>
            </p>
            <Btn
              className="mt-2"
              variant="primary"
              ariaLabel={qi + 1 >= questions.length ? "Finish the checkpoint exam" : "Next exam question"}
              onClick={() => {
                if (qi + 1 >= questions.length) { setFinished(true); record.mutate({ total: questions.length, correct: score }); }
                else { setQi(qi + 1); setPicked(null); }
              }}
            >
              {qi + 1 >= questions.length ? "See result" : "Next →"}
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- final exam: IELTS-style speaking test ----------
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((ev: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

interface SpeakTask { part: number; label: string; prompt: string; promptBn: string; bullets?: string[]; tipBn: string }
interface SpeakAnswer { part: number; prompt: string; text: string; seconds: number }
interface SpeakScore {
  overall: number; fluency: number; lexical: number; grammar: number; task: number;
  words: number; unique: number; sentences: number; avgLen: number; connectors: number;
  seconds: number; wpm: number | null;
}

const SPEAK_TASKS: SpeakTask[] = [
  { part: 1, label: "Part 1 · Interview", prompt: "Let's talk about you. What is your name, and where do you come from?", promptBn: "আপনার নাম কী, আর আপনি কোথা থেকে এসেছেন?", tipBn: "২–৩টি বাক্যে উত্তর দিন।" },
  { part: 1, label: "Part 1 · Interview", prompt: "Do you work, or are you a student? Tell me a little about it.", promptBn: "আপনি কি চাকরি করেন, নাকি পড়াশোনা করেন? সে সম্পর্কে কিছু বলুন।", tipBn: "কী করেন, কতদিন ধরে করেন — এমন কিছু যোগ করুন।" },
  { part: 1, label: "Part 1 · Interview", prompt: "What do you like to do in your free time?", promptBn: "অবসর সময়ে আপনি কী করতে পছন্দ করেন?", tipBn: "একটি শখের নাম বলুন এবং কেন পছন্দ করেন তা বলুন (because …)।" },
  { part: 1, label: "Part 1 · Interview", prompt: "Tell me about your family. Who do you live with?", promptBn: "আপনার পরিবার সম্পর্কে বলুন। আপনি কাদের সঙ্গে থাকেন?", tipBn: "পরিবারের সদস্যদের নাম ও সম্পর্ক বলুন।" },
  {
    part: 2, label: "Part 2 · Cue card", prompt: "Describe a place you would like to visit.",
    promptBn: "এমন একটি জায়গার বর্ণনা দিন যেখানে আপনি যেতে চান।",
    bullets: ["where the place is", "what you can see and do there", "who you would like to go with", "and explain why you want to visit this place"],
    tipBn: "এই অংশে ১–২ মিনিট ধরে একটানা বলার চেষ্টা করুন। চারটি পয়েন্টই ছুঁয়ে যান।",
  },
  { part: 3, label: "Part 3 · Discussion", prompt: "Why do people like to travel to other countries?", promptBn: "মানুষ কেন অন্য দেশে ভ্রমণ করতে পছন্দ করে?", tipBn: "দুই-তিনটি কারণ বলুন: I think … because … Also …" },
  { part: 3, label: "Part 3 · Discussion", prompt: "How has technology changed the way people learn languages?", promptBn: "প্রযুক্তি কীভাবে মানুষের ভাষা শেখার ধরন বদলে দিয়েছে?", tipBn: "আগে ও এখনকার তুলনা করুন: In the past …, but now …" },
  { part: 3, label: "Part 3 · Discussion", prompt: "Do you think English will become more important in the future? Why or why not?", promptBn: "আপনি কি মনে করেন ভবিষ্যতে ইংরেজি আরও গুরুত্বপূর্ণ হবে? কেন বা কেন নয়?", tipBn: "নিজের মত দিন এবং একটি উদাহরণ দিন: For example …" },
];

const CONNECTORS = ["because", "but", "so", "however", "also", "then", "first", "finally", "actually", "for example", "in my opinion", "i think", "moreover", "as a result", "in addition", "on the other hand", "in the past", "nowadays"];

function scoreSpeaking(answers: SpeakAnswer[]): SpeakScore {
  const r5 = (x: number) => Math.round(x * 2) / 2;
  const all = answers.map((a) => a.text).join(" ");
  const words = all.toLowerCase().replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean);
  const W = words.length;
  const unique = new Set(words).size;
  const sentenceList = answers.flatMap((a) => a.text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0));
  const S = sentenceList.length;
  const avgLen = S ? W / S : 0;
  const lower = all.toLowerCase();
  const connectors = CONNECTORS.filter((c) => new RegExp(`\\b${c}\\b`).test(lower)).length;
  const seconds = answers.reduce((s, a) => s + a.seconds, 0);
  const wpm = seconds >= 15 && W > 0 ? Math.round(W / (seconds / 60)) : null;

  let fluency: number;
  if (W === 0) fluency = 1;
  else if (wpm != null) {
    fluency = wpm < 40 ? 3.5 : wpm < 70 ? 4.5 : wpm < 100 ? 5.5 : wpm < 130 ? 6.5 : wpm <= 165 ? 7.5 : 6.5;
    if (W < 60) fluency = Math.min(fluency, 4);
    else if (W < 120) fluency = Math.min(fluency, 5.5);
  } else {
    fluency = W < 40 ? 3 : W < 80 ? 4.5 : W < 140 ? 5.5 : W < 220 ? 6.5 : 7.5;
  }
  if (connectors >= 4) fluency = Math.min(9, fluency + 0.5);

  let lexical = unique < 20 ? 3 : unique < 40 ? 4 : unique < 60 ? 5 : unique < 85 ? 6 : unique < 115 ? 7 : unique < 150 ? 8 : 9;
  const ratio = W ? unique / W : 0;
  if (ratio >= 0.75 && W >= 60) lexical = Math.min(9, lexical + 0.5);
  if (ratio < 0.4 && W >= 60) lexical = Math.max(1, lexical - 0.5);

  let grammar = avgLen < 4 ? 3 : avgLen < 6 ? 4 : avgLen < 9 ? 5 : avgLen < 13 ? 6 : avgLen < 17 ? 7 : 6.5;
  if (connectors >= 4) grammar = Math.min(9, grammar + 0.5);
  if (S >= 10) grammar = Math.min(9, grammar + 0.5);

  const doneCount = answers.filter((a) => a.text.split(/\s+/).filter(Boolean).length >= (a.part === 2 ? 40 : 8)).length;
  const frac = answers.length ? doneCount / answers.length : 0;
  const task = frac >= 1 ? 8 : frac >= 0.75 ? 6.5 : frac >= 0.5 ? 5 : frac >= 0.25 ? 3.5 : W > 0 ? 2 : 1;

  const overall = W < 10 ? Math.min(3, r5((fluency + lexical + grammar + task) / 4)) : r5((fluency + lexical + grammar + task) / 4);
  return {
    overall, fluency: r5(fluency), lexical: r5(lexical), grammar: r5(grammar), task: r5(task),
    words: W, unique, sentences: S, avgLen: Math.round(avgLen * 10) / 10, connectors, seconds, wpm,
  };
}

export function FinalExam({ state, settings, go }: { state: State; settings: Settings; go: ExamGo }) {
  const qc = useQueryClient();
  const unlocked = lessonStatus(state, 125) === "completed";
  const [phase, setPhase] = useState<"intro" | "test" | "result">("intro");
  const [taskIdx, setTaskIdx] = useState(0);
  const [answers, setAnswers] = useState<SpeakAnswer[]>([]);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [spokeSeconds, setSpokeSeconds] = useState(0);
  const [micError, setMicError] = useState("");
  const [result, setResult] = useState<SpeakScore | null>(null);
  const startRef = useRef(0);
  const baselineRef = useRef<number[]>([]);
  const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const record = useMutation({
    mutationFn: async (band: number) => await api.recordAttempt({ lessonNumber: 125, kind: "final-speaking", total: 90, correct: Math.round(band * 10) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const history = state.attempts
    .filter((a) => a.kind === "final-speaking" && a.total > 0)
    .map((a) => ({ band: a.correct / 10, at: a.createdAt }))
    .reverse();
  const task = SPEAK_TASKS[taskIdx];

  useEffect(() => {
    if (!listening) return;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 500);
    return () => clearInterval(id);
  }, [listening]);

  if (!unlocked) {
    return (
      <div>
        <Btn ariaLabel="Back to all exams" onClick={() => go({ name: "exams" })}>← All exams</Btn>
        <div className="mt-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
          <h1 className="font-display text-xl font-semibold text-[var(--text)]"><Fi n="key" /> Final exam: IELTS Speaking Test</h1>
          <p className="bn mt-1 text-sm leading-relaxed text-[var(--dim)]">
            ফাইনাল পরীক্ষাটি খুলবে সব পাঠ শেষে — Lesson 125 (Things I Need and Do Not Need) এর মূল্যায়নে কমপক্ষে ৭০% পেয়ে পাঠটি সম্পন্ন করলেই। তারপর এখানে এসে নিজের কণ্ঠে পূর্ণ IELTS-ধাঁচের স্পিকিং পরীক্ষা দিতে পারবেন।
          </p>
          <Btn className="mt-3" variant="primary" ariaLabel="Open lesson 125" onClick={() => go({ name: "lesson", n: 125 })}>
            <Fi n="book-open-cover" /> Go to Lesson 125
          </Btn>
        </div>
      </div>
    );
  }

  const startTest = () => {
    baselineRef.current = history.map((h) => h.band);
    setAnswers([]);
    setTaskIdx(0);
    setText("");
    setSpokeSeconds(0);
    setResult(null);
    setPhase("test");
  };

  const startListening = () => {
    const Ctor = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition
      ?? (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;
    if (!Ctor || !task) return;
    const rec = new Ctor();
    rec.lang = settings.accent;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setMicError("");
    startRef.current = Date.now();
    setElapsed(0);
    setListening(true);
    rec.onresult = (ev) => {
      const spoken = ev.results[0][0].transcript;
      setText((t) => (t.trim() ? `${t.trim()} ${spoken}` : spoken));
      setSpokeSeconds((s) => s + Math.max(1, Math.round((Date.now() - startRef.current) / 1000)));
    };
    rec.onerror = () => { setMicError("Microphone could not be used. Check permission, or type your answer instead."); setListening(false); };
    rec.onend = () => setListening(false);
    rec.start();
  };

  const nextTask = () => {
    if (!task) return;
    const next = [...answers, { part: task.part, prompt: task.prompt, text: text.trim(), seconds: spokeSeconds }];
    setAnswers(next);
    setText("");
    setSpokeSeconds(0);
    setElapsed(0);
    if (taskIdx + 1 >= SPEAK_TASKS.length) {
      const sc = scoreSpeaking(next);
      setResult(sc);
      setPhase("result");
      if (sc.words >= 10) record.mutate(sc.overall);
    } else {
      setTaskIdx(taskIdx + 1);
    }
  };

  if (phase === "intro") {
    const first = history[0];
    const lastH = history[history.length - 1];
    return (
      <div>
        <Btn ariaLabel="Back to all exams" onClick={() => go({ name: "exams" })}>← All exams</Btn>
        <div className="mt-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
          <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--dim)] uppercase">Final exam · ফাইনাল পরীক্ষা</p>
          <h1 className="font-display mt-1 text-2xl font-semibold text-[var(--text)]">IELTS Speaking Test</h1>
          <p className="bn mt-1 text-sm leading-relaxed text-[var(--dim)]">
            আসল IELTS স্পিকিংয়ের মতোই তিনটি অংশ: Part 1-এ নিজের সম্পর্কে ৪টি প্রশ্ন, Part 2-এ একটি কিউ কার্ড নিয়ে ১–২ মিনিট বলা, Part 3-এ ৩টি আলোচনামূলক প্রশ্ন। প্রতিটি প্রশ্নে মাইক বোতাম চেপে কণ্ঠে উত্তর দিন — অথবা টাইপ করেও উত্তর দিতে পারবেন।
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {([["Part 1", "Interview · সাক্ষাৎকার", "4 questions about you"], ["Part 2", "Cue card · কিউ কার্ড", "Speak 1–2 minutes on a topic"], ["Part 3", "Discussion · আলোচনা", "3 deeper questions"]] as const).map(([p, t, d]) => (
              <div key={p} className="rounded-2xl bg-[var(--surface2)] p-3">
                <p className="font-extrabold text-[var(--text)]">{p}</p>
                <p className="bn text-sm font-semibold text-[var(--text)]">{t}</p>
                <p className="text-sm text-[var(--dim)]">{d}</p>
              </div>
            ))}
          </div>
          <div className="bn mt-3 rounded-2xl border-2 border-dashed border-[var(--border)] p-3 text-sm leading-relaxed text-[var(--text)]">
            <Fi n="sparkles" /> স্কোর কীভাবে দেওয়া হয়: আপনার বলা লেখা (ট্রান্সক্রিপ্ট) থেকে মাপা হয় — মোট কত শব্দ বললেন, কতগুলো আলাদা শব্দ ব্যবহার করলেন, বাক্যের গড় দৈর্ঘ্য, because/however-এর মতো সংযোগী শব্দের ব্যবহার, এবং বলার গতি। এটি একটি <strong>অনুশীলন-ভিত্তিক আনুমানিক ব্যান্ড</strong> — অ্যাপটি আপনার উচ্চারণ শুনতে পায় না, তাই এটি সরকারি IELTS স্কোর নয়। তবু প্রতিবার একই নিয়মে মাপা হয় বলে, আগের চেষ্টার সঙ্গে তুলনা করে আপনার উন্নতি সত্যিই বোঝা যায়।
          </div>
          {!supported && (
            <p className="bn mt-2 rounded-2xl bg-[var(--surface2)] p-3 text-sm text-[var(--text)]">
              <Fi n="triangle-warning" /> এই ব্রাউজারে ভয়েস রিকগনিশন নেই, তাই উত্তর টাইপ করে দিতে হবে। কণ্ঠে দিতে চাইলে Chrome ব্রাউজারে খুলুন।
            </p>
          )}
          {history.length > 0 && first && lastH && (
            <div className="mt-3 rounded-2xl bg-[var(--surface2)] p-3.5">
              <p className="font-bold text-[var(--text)]"><Fi n="chart-histogram" /> Your speaking journey · আপনার অগ্রগতি</p>
              <div className="mt-1.5 grid gap-1">
                {history.map((h, i) => (
                  <p key={i} className="flex items-center justify-between text-sm text-[var(--text)]">
                    <span>Attempt {i + 1} · {new Date(h.at).toLocaleDateString()}</span>
                    <span className="font-extrabold">Band {h.band.toFixed(1)}</span>
                  </p>
                ))}
              </div>
              {history.length > 1 && (
                <p className="bn mt-1.5 text-sm font-semibold text-[var(--text)]">
                  প্রথম চেষ্টা Band {first.band.toFixed(1)} → সর্বশেষ Band {lastH.band.toFixed(1)}
                  {lastH.band > first.band ? ` — মোট উন্নতি +${(lastH.band - first.band).toFixed(1)} ব্যান্ড!` : lastH.band === first.band ? " — একই জায়গায় আছেন, এবার আরও লম্বা উত্তর দিয়ে দেখুন।" : " — এবার আগের চেয়ে ভালো করার চেষ্টা করুন!"}
                </p>
              )}
            </div>
          )}
          <Btn className="mt-4 px-6 py-3 text-base" variant="primary" ariaLabel="Start the final IELTS speaking exam" onClick={startTest}>
            <Fi n="microphone" /> Start the speaking test
          </Btn>
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    const baseline = baselineRef.current;
    const prevLast = baseline[baseline.length - 1];
    const prevFirst = baseline[0];
    const improved = prevLast != null && result.overall > prevLast;
    const criteria: [string, string, number, string][] = [
      ["Fluency & coherence", "সাবলীলতা", result.fluency, result.wpm != null ? `${result.words} words in about ${Math.max(1, Math.round(result.seconds / 60))} min of speaking · ~${result.wpm} words/min · ${result.connectors} linking words` : `${result.words} words written · ${result.connectors} linking words (speak with the mic to measure speed)`],
      ["Lexical resource", "শব্দভাণ্ডার", result.lexical, `${result.unique} different words used out of ${result.words}`],
      ["Grammatical range", "ব্যাকরণের বৈচিত্র্য", result.grammar, `${result.sentences} sentences · average ${result.avgLen} words per sentence`],
      ["Task completion", "প্রশ্নের উত্তর সম্পূর্ণতা", result.task, "Long, complete answers score higher — Part 2 needs about 40+ words"],
    ];
    return (
      <div className="relative">
        {(improved || result.overall >= 6) && <Confetti />}
        <div className="pop-in relative rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
          <div className="text-center">
            <img src={pupMascot} alt="" className="mx-auto h-20 w-20 rounded-full border-4 border-white object-cover shadow" width={320} height={320} />
            <p className="mt-2 text-xs font-extrabold tracking-[0.16em] text-[var(--dim)] uppercase">Practice band estimate · আনুমানিক ব্যান্ড</p>
            <p className="font-display text-6xl leading-none font-semibold text-[var(--text)]">{result.overall.toFixed(1)}</p>
            <p className="bn mt-2 text-base font-semibold text-[var(--text)]">
              {prevLast == null
                ? "অভিনন্দন! এটাই আপনার প্রথম ফাইনাল স্পিকিং পরীক্ষা — এই স্কোরটাই আপনার যাত্রার শুরু।"
                : improved
                  ? `দারুণ! আগের চেষ্টা (Band ${prevLast.toFixed(1)}) থেকে এবার +${(result.overall - prevLast).toFixed(1)} ব্যান্ড এগিয়েছেন!`
                  : result.overall === prevLast
                    ? `আগের চেষ্টার মতোই Band ${prevLast.toFixed(1)} — আরও লম্বা বাক্য আর নতুন শব্দ ব্যবহার করে আবার চেষ্টা করুন।`
                    : `এবার আগের চেষ্টা (Band ${prevLast.toFixed(1)}) থেকে কিছুটা কম হয়েছে — হতাশ হবেন না, অনুশীলনই উন্নতির পথ।`}
            </p>
            {prevFirst != null && baseline.length > 1 && (
              <p className="bn mt-1 text-sm text-[var(--dim)]">প্রথম চেষ্টা ছিল Band {prevFirst.toFixed(1)} — সেখান থেকে মোট পরিবর্তন {(result.overall - prevFirst) >= 0 ? "+" : ""}{(result.overall - prevFirst).toFixed(1)} ব্যান্ড।</p>
            )}
          </div>
          <div className="mt-4 grid gap-2.5">
            {criteria.map(([label, bn, band, detail]) => (
              <div key={label} className="rounded-2xl bg-[var(--surface2)] p-3">
                <p className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-bold text-[var(--text)]">{label} · <span className="bn">{bn}</span></span>
                  <span className="font-display text-lg font-semibold text-[var(--text)]">{band.toFixed(1)}</span>
                </p>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[var(--surface)]">
                  <div className="h-full rounded-full bg-[var(--hero)] transition-all" style={{ width: `${Math.round((band / 9) * 100)}%` }} />
                </div>
                <p className="mt-1 text-xs text-[var(--dim)]">{detail}</p>
              </div>
            ))}
          </div>
          {result.words < 10 && (
            <p className="bn mt-3 rounded-2xl bg-[var(--surface2)] p-3 text-sm text-[var(--text)]">আপনি খুব কম বলেছেন, তাই এই স্কোরটি সংরক্ষণ করা হয়নি। প্রতিটি প্রশ্নে অন্তত কয়েকটি বাক্য বলে আবার চেষ্টা করুন।</p>
          )}
          <p className="bn mt-3 text-xs leading-relaxed text-[var(--dim)]">
            মনে রাখুন: এই ব্যান্ডটি শুধু আপনার উত্তরের লেখা থেকে অনুমান করা — উচ্চারণ (pronunciation) এতে মাপা হয়নি, এবং এটি কোনো সরকারি IELTS ফলাফল নয়। উন্নতির তুলনার জন্য প্রতিবার একই নিয়ম ব্যবহার করা হয়।
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Btn variant="primary" ariaLabel="Retake the final speaking exam" onClick={startTest}><Fi n="rotate-right" /> Retake the test</Btn>
            <Btn ariaLabel="Back to all exams" onClick={() => go({ name: "exams" })}>All exams</Btn>
            <Btn ariaLabel="Go back home" onClick={() => go({ name: "home" })}><Fi n="home" /> Home</Btn>
          </div>
        </div>
        <h3 className="font-display mt-5 mb-2 text-lg font-semibold text-[var(--text)]">What you said · আপনি যা বললেন</h3>
        <div className="grid gap-2">
          {answers.map((a, i) => (
            <div key={i} className="rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-3.5">
              <p className="text-sm font-semibold text-[var(--text)]">{a.prompt}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--dim)]">{a.text || <span className="bn">(কোনো উত্তর দেওয়া হয়নি)</span>}</p>
              {a.text && <Btn className="mt-1.5" ariaLabel={`Listen back to your answer ${i + 1}`} onClick={() => speak(a.text, settings)}><Fi n="volume" /> Listen back</Btn>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!task) return null;
  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  return (
    <div>
      <Btn ariaLabel="Leave the final exam and go back to all exams" onClick={() => go({ name: "exams" })}>← All exams</Btn>
      <div className="mt-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(34,26,5,0.08)]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--dim)] uppercase">{task.label}</p>
          <p className="text-xs font-bold text-[var(--dim)]">Question {taskIdx + 1} / {SPEAK_TASKS.length}</p>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-label="Final exam progress" aria-valuenow={taskIdx} aria-valuemin={0} aria-valuemax={SPEAK_TASKS.length}>
          <div className="h-full rounded-full bg-[var(--hero)] transition-all" style={{ width: `${Math.round((taskIdx / SPEAK_TASKS.length) * 100)}%` }} />
        </div>
        <div className="mt-3 flex items-start gap-2">
          <h2 className="min-w-0 flex-1 text-xl leading-snug font-bold text-[var(--text)]">{task.prompt}</h2>
          <SpeakBtn text={task.prompt} settings={settings} label={`Listen to the question: ${task.prompt}`} />
        </div>
        <p className="bn mt-0.5 text-sm text-[var(--dim)]">{task.promptBn}</p>
        {task.bullets && (
          <div className="mt-2 rounded-2xl bg-[var(--surface2)] p-3">
            <p className="text-sm font-bold text-[var(--text)]">You should say:</p>
            <ul className="mt-1 list-inside list-disc text-sm text-[var(--text)]">
              {task.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        )}
        <p className="bn mt-2 text-sm font-semibold text-[var(--text)]"><Fi n="sparkles" /> পরামর্শ: {task.tipBn}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {supported ? (
            <Btn variant="primary" ariaLabel={listening ? "Listening — speak now" : "Start voice answer"} disabled={listening} onClick={startListening}>
              <Fi n="microphone" /> {listening ? `Listening… ${elapsed}s` : "Tap and speak"}
            </Btn>
          ) : (
            <p className="bn text-sm text-[var(--dim)]"><Fi n="triangle-warning" /> এই ব্রাউজারে ভয়েস ইনপুট নেই — নিচে টাইপ করে উত্তর দিন।</p>
          )}
          {spokeSeconds > 0 && <span className="text-sm font-semibold text-[var(--dim)]"><Fi n="clock" /> You have spoken {spokeSeconds}s for this question</span>}
        </div>
        {micError && <p className="mt-2 text-sm text-[var(--rose)]">{micError}</p>}
        <label className="mt-3 block">
          <span className="bn text-sm font-semibold text-[var(--text)]">আপনার উত্তর {supported ? "(মাইকে বললে এখানে লেখা হয়ে আসবে — চাইলে ঠিক করে নিতে পারবেন)" : ""}</span>
          <textarea
            aria-label={`Your answer to: ${task.prompt}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={task.part === 2 ? 6 : 4}
            placeholder={supported ? "Tap the mic and speak, or type here…" : "Type your answer here…"}
            className="mt-1 w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 leading-relaxed text-[var(--text)]"
          />
        </label>
        <p className="mt-1 text-xs text-[var(--dim)]">{wordCount} word{wordCount === 1 ? "" : "s"}{task.part === 2 ? " · aim for 100+ words in Part 2" : " · aim for 20+ words"}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Btn variant="primary" ariaLabel={taskIdx + 1 >= SPEAK_TASKS.length ? "Finish the speaking test and see my score" : "Save answer and go to the next question"} onClick={nextTask}>
            {taskIdx + 1 >= SPEAK_TASKS.length ? <><Fi n="trophy" /> Finish & see my score</> : <>Next question →</>}
          </Btn>
          {text && <Btn ariaLabel="Listen back to my answer" onClick={() => speak(text, settings)}><Fi n="volume" /> Listen back</Btn>}
        </div>
      </div>
    </div>
  );
}
