import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api, type ApiResponse } from "./api";
import { actionFields } from "@hatch/space-sdk/fields" with { type: "macro" };
import type { Actions } from "../../server/src/actions";
import {
CATEGORIES,
LESSONS,
TOTAL_ENTRIES,
getLesson,
searchEntries,
type Lesson,
type Rel,
type VocabEntry,
} from "./curriculum";
import pupMascot from "./assets/pup-mascot.webp";
import {
EVERYDAY_CATS,
OX_LEVELS,
OX_WORDS,
oxEverydayWords,
oxLevelCount,
oxWordsOfLevel,
searchOxford,
type OxLevel,
type OxWord,
} from "./oxford";
import { Celebration, CheckpointExam, ExamsHome, FinalExam, MOTIVATIONS, blockCompleted, checkpointBest, CHECKPOINT_ENDS, CHECKPOINT_PASS } from "./exams";
import { PV_BUSINESS_GROUPS, PV_COMMON, PV_MORE, type PhrasalVerb } from "./phrasal-verbs";
import { PV_PDF, type PdfPhrasalVerb } from "./phrasal-pdf";
import { IDIOMS, type IdiomEntry } from "./idioms";
import { IDIOM_STORIES } from "./idiom-stories";
import { IDIOM_STORY_GROUPS, type IdiomStoryGroup } from "./idiom-story-groups";
import type { PvStoryGroup } from "./phrasal-story-groups";
import { PV_MODULES, PV_LIST_TITLES, buildAzStories, azStoryEntries, type PvModule } from "./phrasal-stories-all";
import { OX_MODULES, OX_SECTION_ORDER, OX_SECTION_TITLES, OX_TOTAL_STORIES, oxBnPad, oxRelStory, type OxModule, type OxStory, type OxStoryWord } from "./oxford-stories";

const FIELDS = actionFields<typeof Actions>();

type State = ApiResponse<typeof api, "getState">;
type WordState = State["words"][number];
type Settings = State["settings"];
type View =
  | { name: "home" }
  | { name: "lessons" }
  | { name: "lesson"; n: number; tab?: string }
  | { name: "dictionary" }
  | { name: "mywords" }
  | { name: "review" }
  | { name: "analytics" }
  | { name: "settings" }
  | { name: "exams" }
  | { name: "checkpoint"; end: number }
  | { name: "final" }
  | { name: "oxford" }
  | { name: "oxfordLevel"; level: string; cat?: string }
  | { name: "phrasal" }
  | { name: "idioms" };

const STATUS_LABEL: Record<string, string> = {
  not_started: "Not started · শুরু হয়নি",
  in_progress: "In progress · চলমান",
  completed: "Completed · সম্পন্ন",
  revision_needed: "Revision needed · পুনরায় পড়া দরকার",
};

// ---------- speech ----------
let cachedVoices: SpeechSynthesisVoice[] = [];
function loadVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  cachedVoices = window.speechSynthesis.getVoices();
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export function speak(text: string, settings: Settings, opts?: { lang?: string; rate?: number; onEnd?: () => void }) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const lang = opts?.lang ?? settings.accent;
  u.lang = lang;
  u.rate = opts?.rate ?? settings.speechRate;
  const voice =
    cachedVoices.find((v) => v.lang === lang) ??
    cachedVoices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
  if (voice) u.voice = voice;
  if (opts?.onEnd) {
    u.onend = opts.onEnd;
    u.onerror = opts.onEnd;
  }
  window.speechSynthesis.speak(u);
}

// Speaks several lines one after another. Unlike speak(), it cancels only
// once at the start — calling speak() in a loop cancels each previous line,
// which is why "play the whole story" used to say only the last sentence.
function speakAll(lines: string[], settings: Settings, onLine?: (i: number) => void) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  lines.forEach((text, i) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = settings.accent;
    u.rate = settings.speechRate;
    const voice =
      cachedVoices.find((v) => v.lang === settings.accent) ??
      cachedVoices.find((v) => v.lang.startsWith(settings.accent.slice(0, 2)));
    if (voice) u.voice = voice;
    if (onLine) u.onstart = () => onLine(i);
    window.speechSynthesis.speak(u);
  });
}

export function shuffle<T>(arr: T[], seed = Math.random()): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function highlight(text: string, target: string): ReactNode {
  const idx = text.toLowerCase().indexOf(target.toLowerCase());
  if (idx < 0 || target.length < 2) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="hl-word">{text.slice(idx, idx + target.length)}</span>
      {text.slice(idx + target.length)}
    </>
  );
}

// ---------- Flaticon UIcons ----------
// Every icon in the app is a Flaticon UIcon (https://www.flaticon.com/uicons),
// Flaticon's own free icon library, loaded from the vendored webfont in
// client/src/assets/flaticon (theme.css imports it). `n` is the UIcon name;
// `solid` picks the filled Solid Rounded style instead of Regular Rounded.
export function Fi({ n, solid, className }: { n: string; solid?: boolean; className?: string }) {
  return <i aria-hidden className={`fi ${solid ? "fi-sr" : "fi-rr"}-${n} shrink-0 ${className ?? ""}`} />;
}

// ---------- shared UI ----------
export function Btn(props: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "soft" | "ghost" | "danger";
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}) {
  const styles: Record<string, string> = {
    primary: "bg-[var(--accent)] text-[var(--on-accent)] font-bold shadow-[0_4px_0_rgba(0,0,0,0.28)]",
    soft: "bg-[var(--surface2)] text-[var(--text)] font-bold border-2 border-[var(--border)]",
    ghost: "text-[var(--text)] font-bold underline decoration-[var(--hero)] decoration-4 underline-offset-4",
    danger: "bg-[var(--rose)] text-white font-bold shadow-[0_4px_0_rgba(0,0,0,0.22)]",
  };
  return (
    <button
      type="button"
      aria-label={props.ariaLabel ?? (typeof props.children === "string" ? props.children : undefined)}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm disabled:opacity-40 active:scale-[0.97] active:shadow-none transition ${styles[props.variant ?? "soft"]} ${props.className ?? ""}`}
    >
      {props.children}
    </button>
  );
}

// ---------- themed dropdown (replaces the native <select>) ----------
// The browser's own <select> popup renders in grey/blue OS colours and can
// never match the app, so filters and settings use this custom dropdown
// instead: a white-sheet pill with a dark chevron chip in light mode, and a
// lifted warm-charcoal pill with a sunny-yellow chevron chip in dark mode
// (both fall out of the --surface / --accent tokens automatically). The
// open panel is a rounded sheet card; the chosen option is the app's dark
// pill in light mode and the yellow pill in dark mode, exactly like the
// primary buttons and the selected lesson tabs.
export function ThemedSelect(props: {
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = props.options.find((o) => o.value === props.value) ?? props.options[0];
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);
  return (
    <div ref={wrapRef} className={`relative ${props.fullWidth ? "w-full" : "inline-block"} ${props.className ?? ""}`}>
      <button
        type="button"
        aria-label={props.ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`inline-flex min-h-[2.75rem] items-center justify-between gap-2.5 rounded-full border-2 py-2 pl-4 pr-2 text-sm font-bold shadow-[0_4px_0_rgba(34,26,5,0.10)] transition active:scale-[0.98] active:shadow-none ${props.fullWidth ? "w-full" : ""} ${open ? "border-[var(--text)] bg-[var(--surface)] text-[var(--text)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"}`}
      >
        <span className="bn min-w-0 truncate text-left">{selected?.label ?? ""}</span>
        <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false"><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      {open && (
        <div
          role="listbox"
          aria-label={props.ariaLabel}
          className="themed-select-panel absolute left-0 top-full z-50 mt-2 max-h-72 min-w-full overflow-y-auto rounded-[1.5rem] border-2 border-[var(--border)] bg-[var(--sheet)] p-2.5 shadow-[0_18px_44px_rgba(34,26,5,0.28)]"
          style={{ width: "max-content", maxWidth: "min(85vw, 22rem)" }}
        >
          {props.options.map((o) => {
            const isSel = o.value === props.value;
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={isSel}
                aria-label={o.label}
                onClick={() => { props.onChange(o.value); setOpen(false); }}
                className={`bn flex w-full items-center justify-between gap-3 rounded-full px-3.5 py-2.5 text-left text-sm transition active:scale-[0.99] ${isSel ? "bg-[var(--accent)] font-extrabold text-[var(--on-accent)] shadow-[0_3px_0_rgba(0,0,0,0.22)]" : "font-semibold text-[var(--text)] hover:bg-[var(--accent-soft)]"}`}
              >
                <span className="min-w-0 truncate">{o.label}</span>
                {isSel && <Fi n="check" className="text-xs" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- study-section dropdown (Basic English / Oxford 3000 / Phrasal Verbs / Idioms and Phrases) ----------
// The 125 lessons together are named "Basic English". This dropdown groups
// the four study sections in one themed menu, in the same rounded style as
// ThemedSelect: a surface pill trigger with a round accent chevron chip, and
// a rounded sheet panel whose current item is the accent pill. It is used at
// the top of the Lessons page and from the "Lessons" item in the top nav.
export type SectionName = "lessons" | "oxford" | "phrasal" | "idioms";

export const SECTION_ITEMS: { name: SectionName; icon: string; en: string; bn: string; desc: string }[] = [
  { name: "lessons", icon: "book-open-reader", en: "Basic English", bn: "বেসিক ইংরেজি", desc: "125 lessons · Lesson 1–125" },
  { name: "oxford", icon: "book", en: "Oxford 3000", bn: "অক্সফোর্ড ৩০০০", desc: "Core word list · A1–B2" },
  { name: "phrasal", icon: "comment-question", en: "Phrasal Verbs", bn: "ফ্রেজাল ভার্ব", desc: "Phrasal verbs with examples" },
  { name: "idioms", icon: "sparkles", en: "Idioms and Phrases", bn: "ইডিয়ম ও ফ্রেজ", desc: "Idioms with Bengali meanings" },
];

export function SectionMenuItems({ current, onPick }: { current: SectionName | null; onPick: (name: SectionName) => void }) {
  return (
    <>
      {SECTION_ITEMS.map((item) => {
        const isSel = item.name === current;
        return (
          <button
            key={item.name}
            type="button"
            role="menuitem"
            aria-current={isSel ? "page" : undefined}
            aria-label={`Open ${item.en} — ${item.desc}`}
            onClick={() => onPick(item.name)}
            className={`flex w-full items-center gap-3 rounded-[1.1rem] px-3.5 py-2.5 text-left transition active:scale-[0.99] ${isSel ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_3px_0_rgba(0,0,0,0.22)]" : "text-[var(--text)] hover:bg-[var(--accent-soft)]"}`}
          >
            <Fi n={item.icon} className="text-lg" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-extrabold">{item.en} · <span className="bn font-bold">{item.bn}</span></span>
              <span className={`block truncate text-xs ${isSel ? "opacity-85" : "text-[var(--dim)]"}`}>{item.desc}</span>
            </span>
            {isSel && <Fi n="check" className="text-xs" />}
          </button>
        );
      })}
    </>
  );
}

export function SectionDropdown({ current, go, className }: { current: SectionName; go: (v: View) => void; className?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = SECTION_ITEMS.find((i) => i.name === current) ?? SECTION_ITEMS[0];
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);
  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        aria-label="Choose a study section: Basic English, Oxford 3000, Phrasal Verbs or Idioms and Phrases"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`inline-flex min-h-[2.75rem] w-full items-center justify-between gap-2.5 rounded-full border-2 py-2 pl-4 pr-2 text-sm font-bold shadow-[0_4px_0_rgba(34,26,5,0.10)] transition active:scale-[0.98] active:shadow-none ${open ? "border-[var(--text)]" : "border-[var(--border)]"} bg-[var(--surface)] text-[var(--text)]`}
      >
        <span className="flex min-w-0 items-center gap-2 text-left">
          <Fi n={selected?.icon ?? "book-open-reader"} className="text-base" />
          <span className="min-w-0 truncate">{selected?.en} · <span className="bn">{selected?.bn}</span></span>
        </span>
        <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false"><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Study sections"
          className="absolute left-0 top-full z-50 mt-2 w-full min-w-[16rem] max-w-[min(85vw,22rem)] rounded-[1.5rem] border-2 border-[var(--border)] bg-[var(--sheet)] p-1.5 shadow-[0_18px_44px_rgba(34,26,5,0.28)]"
        >
          <SectionMenuItems
            current={current}
            onPick={(name) => { setOpen(false); go({ name } as View); }}
          />
        </div>
      )}
    </div>
  );
}

export function SpeakBtn({ text, settings, slow, label }: { text: string; settings: Settings; slow?: boolean; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label ?? `Listen: ${text}`}
      onClick={() => speak(text, settings, slow ? { rate: 0.6 } : undefined)}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] text-base shadow-sm active:scale-95 transition"
    >
      <Fi n="volume" className="text-lg" />
    </button>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-display mt-7 mb-2.5 text-xl font-semibold text-[var(--text)]">{children}</h2>;
}

// ---------- themed tooltip for the study-time bar charts ----------
// Replaces Recharts' default white square tooltip (light-grey day label,
// yellow-on-white value) with a rounded FocusPup card: warm sheet
// background, dark readable text and a sunny-yellow dot in light mode;
// soft warm charcoal with warm off-white text and the yellow accent in
// dark mode. All colours come from the theme tokens, so both modes follow.
function ChartTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value?: number | string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const minutes = Number(payload[0]?.value ?? 0);
  return (
    <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--sheet)] px-3.5 py-2.5 shadow-[0_10px_24px_rgba(34,26,5,0.22)]">
      <p className="font-display text-sm font-semibold text-[var(--text)]">{label}</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-[var(--text)]">
        <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--hero)] ring-1 ring-black/15" aria-hidden="true" />
        Study time: <strong className="font-extrabold">{minutes} min</strong>
      </p>
    </div>
  );
}

// ---------- synonym / antonym group with its own little story ----------
function RelGroup({ title, rels, settings, showBn }: { title: string; rels: Rel[]; settings: Settings; showBn: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  if (rels.length === 0) return null;
  const active = rels.find((r) => r.en === open);
  return (
    <div className="mt-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--dim)]">{title}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {rels.map((s) => (
          <span key={s.en} className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] py-1 pr-1.5 pl-2.5 text-sm text-[var(--text)]">
            {s.en} <span className="bn text-[var(--dim)]">— {s.bn}</span>
            <button type="button" aria-label={`Listen: ${s.en}`} onClick={() => speak(s.en, settings)} className="rounded-full px-1"><Fi n="volume" /></button>
            {s.story && (
              <button
                type="button"
                aria-label={`Read the little story for ${s.en}`}
                aria-expanded={open === s.en}
                onClick={() => setOpen(open === s.en ? null : s.en)}
                className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${open === s.en ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface)] text-[var(--accent)]"}`}
              >
                <Fi n="book-open-cover" /> Story
              </button>
            )}
          </span>
        ))}
      </div>
      {active?.story && (
        <div className="mt-2 rounded-xl bg-[var(--surface2)] p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-[var(--text)]">
              {active.story.titleEn}
              {showBn && <span className="bn text-sm font-normal text-[var(--dim)]"> · {active.story.titleBn}</span>}
            </p>
            <Btn ariaLabel={`Listen to the little story for ${active.en}`} onClick={() => speakAll(active.story?.lines.map((l) => l.en) ?? [], settings)}>
              <Fi n="play" /> Listen to story
            </Btn>
          </div>
          <div className="mt-2 space-y-1.5">
            {active.story.lines.map((line, i) => (
              <div key={i}>
                <p className="flex items-start gap-2 text-sm text-[var(--text)]">
                  <button type="button" aria-label={`Listen to story sentence ${i + 1} for ${active.en}`} onClick={() => speak(line.en, settings)}><Fi n="volume" /></button>
                  <span>{highlight(line.en, active.en)}</span>
                </p>
                {showBn && <p className="bn mt-0.5 pl-7 text-sm text-[var(--dim)]">{line.bn}</p>}
              </div>
            ))}
          </div>
          <p className="bn mt-2 text-xs text-[var(--dim)]">মনে রাখুন: "{active.en}" মানে {active.bn}।</p>
        </div>
      )}
    </div>
  );
}

// ---------- vocabulary entry card ----------
function EntryCard({
  entry,
  lesson,
  state,
  settings,
  showBn,
  onOpenStory,
}: {
  entry: VocabEntry;
  lesson: Lesson;
  state: State;
  settings: Settings;
  showBn: boolean;
  onOpenStory?: (e: VocabEntry) => void;
}) {
  const qc = useQueryClient();
  const ws = state.words.find((w) => w.entryKey === entry.key);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState(ws?.note ?? "");
  const flags = useMutation({
    mutationFn: async (patch: { saved?: boolean; known?: boolean; difficult?: boolean; note?: string }) =>
      await api.setWordFlags({
        entryKey: entry.key,
        lessonNumber: lesson.n,
        english: entry.en,
        bengali: entry.bn,
        ...patch,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const spelling = useMutation({
    mutationFn: async () => await api.recordAttempt({ lessonNumber: lesson.n, kind: "spelling", total: 1, correct: spellOk ? 1 : 0 }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const [spell, setSpell] = useState("");
  const [spellChecked, setSpellChecked] = useState(false);
  const spellOk = spell.trim().toLowerCase() === entry.en.toLowerCase();
  const canSpell = entry.type === "word" && !entry.en.includes(" ");

  return (
    <article className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-[var(--text)]">{entry.en}</h3>
          {entry.ipa && <p className="text-sm text-[var(--dim)]">{entry.ipa}</p>}
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--accent)]">
            {entry.pos} · {entry.type}
          </p>
        </div>
        <div className="flex gap-1.5">
          <SpeakBtn text={entry.en} settings={settings} />
          <SpeakBtn text={entry.en} settings={settings} slow label={`Listen slowly: ${entry.en}`} />
        </div>
      </div>

      {showBn && <p className="bn mt-2 text-lg font-semibold text-[var(--text)]">{entry.bn}</p>}
      <p className="mt-2 text-sm text-[var(--text)]">{entry.defEn}</p>
      {showBn && <p className="bn mt-1 text-sm text-[var(--dim)]">{entry.defBn}</p>}

      <div className="mt-3 rounded-xl bg-[var(--surface2)] p-3">
        <p className="text-sm text-[var(--text)]">
          <span className="font-semibold">Example: </span>
          {entry.exEn}
          <button type="button" aria-label={`Listen to example: ${entry.exEn}`} className="ml-2" onClick={() => speak(entry.exEn, settings)}><Fi n="volume" /></button>
        </p>
        {showBn && <p className="bn mt-1 text-sm text-[var(--dim)]">{entry.exBn}</p>}
      </div>

      {(entry.synonyms.length > 0 || entry.alternatives.length > 0) && (
        <RelGroup
          title={entry.alternatives.length > 0 && entry.synonyms.length === 0 ? "Alternative expressions · বিকল্পভাবে বলা" : "Synonyms · সমার্থক শব্দ"}
          rels={[...entry.synonyms, ...entry.alternatives]}
          settings={settings}
          showBn={showBn}
        />
      )}
      {entry.antonyms.length > 0 ? (
        <RelGroup title="Antonyms · বিপরীত শব্দ" rels={entry.antonyms} settings={settings} showBn={showBn} />
      ) : (
        <div className="mt-2">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--dim)]">Antonyms · বিপরীত শব্দ</p>
          <p className="mt-1 text-sm italic text-[var(--dim)]">{entry.noAntonymNote ?? "No natural antonym for this meaning."}</p>
        </div>
      )}

      {entry.grammar && (
        <div className="mt-3 rounded-xl border border-dashed border-[var(--accent)] p-3">
          <p className="text-sm font-semibold text-[var(--text)]">Pattern: {entry.grammar.pattern}</p>
          <p className="bn mt-1 text-sm text-[var(--dim)]">{entry.grammar.explainBn}</p>
          {entry.grammar.more.map((m) => (
            <p key={m.en} className="mt-1 text-sm text-[var(--text)]">
              • {m.en} <span className="bn text-[var(--dim)]">— {m.bn}</span>
            </p>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Btn variant={ws?.saved ? "primary" : "soft"} ariaLabel={`${ws?.saved ? "Unsave" : "Save"} word ${entry.en}`} onClick={() => flags.mutate({ saved: !ws?.saved })}>
          {ws?.saved ? <><Fi n="star" solid /> Saved</> : <><Fi n="star" /> Save</>}
        </Btn>
        <Btn variant={ws?.known ? "primary" : "soft"} ariaLabel={`Mark ${entry.en} as known`} onClick={() => flags.mutate({ known: !ws?.known })}>
          <Fi n="check" /> Known
        </Btn>
        <Btn variant={ws?.difficult ? "danger" : "soft"} ariaLabel={`Mark ${entry.en} as difficult`} onClick={() => flags.mutate({ difficult: !ws?.difficult })}>
          <Fi n="flag" /> Difficult
        </Btn>
        {onOpenStory && (
          <Btn variant="ghost" ariaLabel={`View story for ${entry.en}`} onClick={() => onOpenStory(entry)}>
            <Fi n="book-open-cover" /> Story
          </Btn>
        )}
        <Btn variant="ghost" ariaLabel={`Add a note for ${entry.en}`} onClick={() => setNoteOpen(!noteOpen)}>
          <Fi n="memo" /> Note
        </Btn>
      </div>

      {noteOpen && (
        <div className="mt-2 flex gap-2">
          <input
            {...FIELDS.setWordFlags.note}
            aria-label={`Personal note for ${entry.en}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="আপনার নোট লিখুন…"
            className="bn min-w-0 flex-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-base text-[var(--text)]"
          />
          <Btn variant="primary" ariaLabel="Save note" onClick={() => flags.mutate({ note })}>Save</Btn>
        </div>
      )}

      {canSpell && (
        <div className="mt-3">
          <p className="bn text-sm text-[var(--dim)]">বানান অনুশীলন: শব্দটি শুনে টাইপ করুন</p>
          <div className="mt-1 flex gap-2">
            <button type="button" aria-label="Play word for spelling practice" onClick={() => speak(entry.en, settings)} className="h-10 w-10 rounded-full bg-[var(--accent-soft)]"><Fi n="volume" /></button>
            <input
              aria-label={`Type the spelling of the word that means ${entry.bn}`}
              value={spell}
              onChange={(e) => { setSpell(e.target.value); setSpellChecked(false); }}
              placeholder="Type the word…"
              className="min-w-0 flex-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-base text-[var(--text)]"
            />
            <Btn
              variant="primary"
              ariaLabel="Check spelling"
              onClick={() => { setSpellChecked(true); spelling.mutate(); }}
            >
              Check
            </Btn>
          </div>
          {spellChecked && (
            <p className={`mt-1 text-sm font-medium ${spellOk ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
              {spellOk ? `Correct! "${entry.en}"` : `Not quite — the word is "${entry.en}". Try again.`}
            </p>
          )}
        </div>
      )}
      {ws?.nextReviewAt && (
        <p className="mt-2 text-xs text-[var(--dim)]">
          Mastery: {ws.mastery} · Next review: {new Date(ws.nextReviewAt).toLocaleDateString()}
        </p>
      )}
    </article>
  );
}

// ---------- flashcards ----------
type CardMode = "en-bn" | "bn-en" | "audio" | "sentence" | "rel";

function Flashcards({ lesson, settings, state }: { lesson: Lesson; settings: Settings; state: State }) {
  const qc = useQueryClient();
  const [mode, setMode] = useState<CardMode>("en-bn");
  const [order, setOrder] = useState<VocabEntry[]>(lesson.entries);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const grade = useMutation({
    mutationFn: async (a: { e: VocabEntry; g: "again" | "hard" | "good" | "easy" }) =>
      await api.gradeWord({ entryKey: a.e.key, lessonNumber: lesson.n, english: a.e.en, bengali: a.e.bn, grade: a.g }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "flashcards", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });

  const entry = order[idx];
  const front = (e: VocabEntry): ReactNode => {
    if (mode === "en-bn") return <span className="text-2xl font-bold">{e.en}</span>;
    if (mode === "bn-en") return <span className="bn text-2xl font-bold">{e.bn}</span>;
    if (mode === "audio")
      return (
        <span className="flex flex-col items-center gap-2">
          <Fi n="headphones" className="text-4xl" />
          <span className="bn text-sm text-[var(--dim)]">শুনুন এবং অর্থ মনে করুন</span>
        </span>
      );
    if (mode === "sentence")
      return (
        <span className="text-lg">
          {e.exEn} <button type="button" aria-label="Listen to the sentence" onClick={(ev) => { ev.stopPropagation(); speak(e.exEn, settings); }}><Fi n="volume" /></button>
        </span>
      );
    const rel = e.synonyms[0] ?? e.antonyms[0];
    return (
      <span className="text-center">
        <span className="text-2xl font-bold">{e.en}</span>
        <span className="bn mt-2 block text-sm text-[var(--dim)]">
          {e.synonyms[0] ? `"${rel?.en}" শব্দের সমার্থক শব্দটি মনে করুন` : `"${rel?.en}" শব্দের বিপরীত শব্দটি মনে করুন`}
        </span>
      </span>
    );
  };
  const back = (e: VocabEntry): ReactNode => {
    if (mode === "en-bn" || mode === "audio") return <span className="bn text-2xl font-bold">{e.bn}</span>;
    if (mode === "bn-en") return <span className="text-2xl font-bold">{e.en}</span>;
    if (mode === "sentence") return <span className="bn text-xl font-semibold">{e.exBn}</span>;
    const rel = e.synonyms[0] ?? e.antonyms[0];
    return (
      <span className="text-center">
        <span className="text-xl font-bold">{rel ? rel.en : "—"}</span>
        <span className="bn mt-1 block text-base text-[var(--dim)]">{rel ? rel.bn : ""}</span>
      </span>
    );
  };

  const mark = (g: "again" | "hard" | "good" | "easy") => {
    if (!entry) return;
    grade.mutate({ e: entry, g });
    const next = { ...done, [entry.key]: g };
    setDone(next);
    setFlipped(false);
    if (idx + 1 >= order.length) {
      setFinished(true);
      const correct = Object.values(next).filter((x) => x === "good" || x === "easy").length;
      record.mutate({ total: order.length, correct });
    } else {
      setIdx(idx + 1);
    }
  };

  useEffect(() => {
    const h = (ev: KeyboardEvent) => {
      if (ev.key === " " || ev.key === "Enter") { ev.preventDefault(); setFlipped((f) => !f); }
      if (ev.key === "ArrowRight") { setFlipped(false); setIdx((i) => Math.min(i + 1, order.length - 1)); }
      if (ev.key === "ArrowLeft") { setFlipped(false); setIdx((i) => Math.max(i - 1, 0)); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [order.length]);

  const modes: [CardMode, string][] = [
    ["en-bn", "English → বাংলা"],
    ["bn-en", "বাংলা → English"],
    ["audio", "Audio → Meaning"],
    ["sentence", "Sentence → Translation"],
    ["rel", "Synonym / Antonym"],
  ];

  if (finished) {
    const good = Object.values(done).filter((x) => x === "good" || x === "easy").length;
    const hard: string[] = Object.values(done).filter((x): x is string => x === "again" || x === "hard");
    return (
      <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-5 text-center">
        <p className="text-3xl text-[var(--amber)]"><Fi n="confetti" /></p>
        <h3 className="bn mt-2 text-lg font-bold text-[var(--text)]">ফ্ল্যাশকার্ড শেষ!</h3>
        <p className="mt-1 text-sm text-[var(--dim)]">
          {good} / {order.length} cards marked Good or Easy. Grades were saved to your review schedule.
        </p>
        {hard.length > 0 && (
          <Btn
            className="mt-3"
            variant="primary"
            ariaLabel="Retry difficult flashcards"
            onClick={() => {
              setOrder(order.filter((e) => hard.includes(e.key)));
              setIdx(0); setDone({}); setFinished(false); setFlipped(false);
            }}
          >
            <Fi n="rotate-right" /> Retry difficult cards ({hard.length})
          </Btn>
        )}
        <Btn
          className="mt-3 ml-2"
          ariaLabel="Restart all flashcards"
          onClick={() => { setOrder(lesson.entries); setIdx(0); setDone({}); setFinished(false); setFlipped(false); }}
        >
          Restart all
        </Btn>
      </div>
    );
  }
  if (!entry) return null;
  const ws = state.words.find((w) => w.entryKey === entry.key);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Flashcard modes">
        {modes.map(([m, label]) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            aria-label={`Flashcard mode ${label}`}
            onClick={() => { setMode(m); setFlipped(false); }}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${mode === m ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-[var(--dim)]">
        Card {idx + 1} of {order.length} · tap the card or press Space to flip
      </p>
      <div className="flashcard-scene mt-2 h-56">
        <div
          className={`flashcard-inner h-full cursor-pointer ${flipped ? "flipped" : ""}`}
          role="button"
          aria-label={`Flashcard for ${entry.en}. Activate to flip.`}
          tabIndex={0}
          onClick={() => {
            if (!flipped && mode === "audio") speak(entry.en, settings);
            setFlipped(!flipped);
          }}
        >
          <div className="flashcard-face flex items-center justify-center rounded-3xl border-2 border-[var(--accent)] bg-[var(--surface)] p-6 text-center text-[var(--text)] shadow">
            {front(entry)}
          </div>
          <div className="flashcard-face flashcard-back flex items-center justify-center rounded-3xl border-2 border-[var(--amber)] bg-[var(--surface)] p-6 text-center text-[var(--text)] shadow">
            {back(entry)}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Btn ariaLabel="Previous flashcard" onClick={() => { setFlipped(false); setIdx(Math.max(0, idx - 1)); }}>← Prev</Btn>
        <Btn ariaLabel="Play audio for this flashcard" onClick={() => speak(entry.en, settings)}><Fi n="volume" /> Listen</Btn>
        <Btn ariaLabel="Shuffle flashcards" onClick={() => { setOrder(shuffle(order)); setIdx(0); setFlipped(false); }}><Fi n="shuffle" /> Shuffle</Btn>
        <Btn ariaLabel="Next flashcard" onClick={() => { setFlipped(false); setIdx(Math.min(order.length - 1, idx + 1)); }}>Next →</Btn>
        {ws?.difficult && <span className="inline-flex items-center gap-1 text-sm text-[var(--rose)]"><Fi n="flag" /> in your difficult list</span>}
      </div>
      {flipped && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          <Btn variant="danger" ariaLabel="Grade again" onClick={() => mark("again")}>Again</Btn>
          <Btn ariaLabel="Grade hard" onClick={() => mark("hard")}>Hard</Btn>
          <Btn variant="primary" ariaLabel="Grade good" onClick={() => mark("good")}>Good</Btn>
          <Btn variant="primary" ariaLabel="Grade easy" onClick={() => mark("easy")}>Easy</Btn>
        </div>
      )}
    </div>
  );
}

// ---------- generic multiple-choice round ----------
export interface MCQ { prompt: ReactNode; speakText?: string; options: string[]; answer: number; explain: string; }

function MCQGame({ title, instructionsBn, questions, kind, lessonN, settings }: {
  title: string; instructionsBn: string; questions: MCQ[]; kind: string; lessonN: number; settings: Settings;
}) {
  const qc = useQueryClient();
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lessonN, kind, total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const q = questions[qi];
  if (questions.length === 0)
    return <p className="bn text-sm text-[var(--dim)]">এই পাঠে এই খেলার জন্য যথেষ্ট উপাদান নেই। অন্য খেলা চেষ্টা করুন।</p>;
  if (finished || !q)
    return (
      <div className="rounded-2xl bg-[var(--surface2)] p-4 text-center">
        <p className="text-2xl font-bold text-[var(--text)]">{score} / {questions.length}</p>
        <p className="bn mt-1 text-sm text-[var(--dim)]">{title} শেষ হয়েছে। আবার খেলতে নিচের বোতাম চাপুন।</p>
        <Btn className="mt-3" variant="primary" ariaLabel={`Retry ${title}`} onClick={() => { setQi(0); setScore(0); setPicked(null); setFinished(false); }}><Fi n="rotate-right" /> Retry</Btn>
      </div>
    );
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">{title}</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">{instructionsBn}</p>
      <p className="mt-2 text-xs text-[var(--dim)]">Question {qi + 1} / {questions.length} · Score {score}</p>
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
              aria-label={`Answer option: ${opt}`}
              disabled={picked != null}
              onClick={() => {
                setPicked(i);
                if (i === q.answer) setScore((s) => s + 1);
              }}
              className={`rounded-xl border px-4 py-3 text-left text-base ${isRight ? "border-[var(--accent)] bg-[var(--accent-soft)]" : isWrong ? "border-[var(--rose)] bg-red-50 dark:bg-red-950" : "border-[var(--border)] bg-[var(--surface)]"}`}
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
            ariaLabel="Next question"
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
  );
}

export function optionsFor(entries: VocabEntry[], correct: VocabEntry, pick: (e: VocabEntry) => string, seed: number): { options: string[]; answer: number } {
  const wrongs = shuffle(entries.filter((e) => e.key !== correct.key), seed + 7).slice(0, 3).map(pick);
  const opts = shuffle([pick(correct), ...wrongs], seed + 13);
  return { options: opts, answer: opts.indexOf(pick(correct)) };
}

// ---------- matching game ----------
function MatchingGame({ lesson }: { lesson: Lesson }) {
  const qc = useQueryClient();
  const pairs = useMemo(() => lesson.entries.slice(0, 6), [lesson]);
  const [rights, setRights] = useState(() => shuffle(pairs.map((p) => p.bn), 3));
  const [selEn, setSelEn] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [moves, setMoves] = useState(0);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "matching", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const doneCount = Object.keys(matched).length;
  const pick = (bn: string) => {
    if (!selEn) return;
    setMoves((m) => m + 1);
    const entry = pairs.find((p) => p.en === selEn);
    if (entry && entry.bn === bn) {
      const next = { ...matched, [selEn]: true };
      setMatched(next);
      setSelEn(null);
      if (Object.keys(next).length === pairs.length) {
        record.mutate({ total: pairs.length + moves, correct: pairs.length });
      }
    } else {
      setWrong(bn);
      setTimeout(() => setWrong(null), 600);
    }
  };
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Matching Game</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">ইংরেজি শব্দে চাপ দিন, তারপর সঠিক বাংলা অর্থ বেছে নিন।</p>
      <p className="mt-1 text-xs text-[var(--dim)]">Matched {doneCount} / {pairs.length} · Attempts {moves}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="grid gap-2">
          {pairs.map((p) => (
            <button
              key={p.key}
              type="button"
              aria-label={`English word: ${p.en}`}
              disabled={!!matched[p.en]}
              onClick={() => setSelEn(p.en)}
              className={`rounded-xl border px-3 py-2.5 text-left font-semibold ${matched[p.en] ? "border-[var(--accent)] bg-[var(--accent-soft)] opacity-60" : selEn === p.en ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"}`}
            >
              {p.en}
            </button>
          ))}
        </div>
        <div className="grid gap-2">
          {rights.map((bn) => {
            const used = pairs.some((p) => p.bn === bn && matched[p.en]);
            return (
              <button
                key={bn}
                type="button"
                aria-label={`Bengali meaning: ${bn}`}
                disabled={used}
                onClick={() => pick(bn)}
                className={`bn rounded-xl border px-3 py-2.5 text-left ${used ? "border-[var(--accent)] bg-[var(--accent-soft)] opacity-60" : wrong === bn ? "border-[var(--rose)] bg-red-50 dark:bg-red-950" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"}`}
              >
                {bn}
              </button>
            );
          })}
        </div>
      </div>
      {doneCount === pairs.length && (
        <div className="mt-3 text-center">
          <p className="flex items-center justify-center gap-1.5 font-semibold text-[var(--accent)]"><Fi n="confetti" /> All matched in {moves} attempts!</p>
          <Btn className="mt-2" variant="primary" ariaLabel="Play matching again" onClick={() => { setMatched({}); setMoves(0); setRights(shuffle(pairs.map((p) => p.bn))); }}><Fi n="rotate-right" /> Play again</Btn>
        </div>
      )}
    </div>
  );
}

// ---------- memory game ----------
function MemoryGame({ lesson }: { lesson: Lesson }) {
  const qc = useQueryClient();
  const base = useMemo(() => lesson.entries.slice(0, 6), [lesson]);
  const cards = useMemo(
    () => shuffle(base.flatMap((e) => [
      { id: `${e.key}-en`, pair: e.key, label: e.en, bn: false },
      { id: `${e.key}-bn`, pair: e.key, label: e.bn, bn: true },
    ]), 11),
    [base],
  );
  const [open, setOpen] = useState<string[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [tries, setTries] = useState(0);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "memory", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const flip = (id: string, pair: string) => {
    if (open.includes(id) || found.includes(pair) || open.length >= 2) return;
    const next = [...open, id];
    setOpen(next);
    if (next.length === 2) {
      setTries((t) => t + 1);
      const [a, b] = next.map((x) => cards.find((c) => c.id === x));
      if (a && b && a.pair === b.pair) {
        const nf = [...found, pair];
        setFound(nf);
        setOpen([]);
        if (nf.length === base.length) record.mutate({ total: tries + 1, correct: base.length });
      } else {
        setTimeout(() => setOpen([]), 800);
      }
    }
  };
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Memory Game</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">কার্ড উল্টে ইংরেজি শব্দের সঙ্গে বাংলা অর্থ মেলান।</p>
      <p className="mt-1 text-xs text-[var(--dim)]">Pairs found {found.length} / {base.length} · Attempts {tries}{tries > 0 ? ` · Accuracy ${Math.round((found.length / tries) * 100)}%` : ""}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {cards.map((c) => {
          const visible = open.includes(c.id) || found.includes(c.pair);
          return (
            <button
              key={c.id}
              type="button"
              aria-label={visible ? `Card: ${c.label}` : "Face-down memory card"}
              onClick={() => flip(c.id, c.pair)}
              className={`flex min-h-16 items-center justify-center rounded-xl border p-2 text-center text-sm font-semibold ${visible ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]" : "border-[var(--border)] bg-[var(--surface2)] text-[var(--dim)]"}`}
            >
              {visible ? <span className={c.bn ? "bn" : ""}>{c.label}</span> : "?"}
            </button>
          );
        })}
      </div>
      {found.length === base.length && <p className="mt-3 text-center font-semibold text-[var(--accent)]"><Fi n="confetti" /> Complete! All {base.length} pairs in {tries} attempts.</p>}
    </div>
  );
}

// ---------- tic-tac-toe ----------
function TicTacToe({ lesson, settings }: { lesson: Lesson; settings: Settings }) {
  const qc = useQueryClient();
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [pending, setPending] = useState<number | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "tictactoe", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const entry = lesson.entries[qIdx % lesson.entries.length] ?? lesson.entries[0];
  const opts = entry ? optionsFor(lesson.entries, entry, (e) => e.bn, qIdx + 3) : { options: [], answer: 0 };
  const winner = (() => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const line of lines) {
      const [a = -1, b = -1, c = -1] = line;
      const va = a >= 0 ? board[a] : null;
      const vb = b >= 0 ? board[b] : null;
      const vc = c >= 0 ? board[c] : null;
      if (va && va === vb && va === vc) return va;
    }
    return board.every(Boolean) ? "draw" : null;
  })();
  const answer = (i: number) => {
    if (pending == null || !entry) return;
    setPicked(i);
    if (i === opts.answer) {
      const nb = [...board];
      nb[pending] = "X";
      // computer (O) takes first free square
      const free = nb.map((v, ix) => (v ? -1 : ix)).filter((x) => x >= 0 && x !== pending);
      if (free.length > 0 && !winner) {
        const pick = free[Math.floor(Math.random() * free.length)] ?? -1;
        if (pick >= 0) nb[pick] = "O";
      }
      setBoard(nb);
      setMsg("Correct — square claimed!");
      record.mutate({ total: 1, correct: 1 });
    } else {
      setMsg(`Wrong — the answer was "${entry.bn}". The square stays empty.`);
      record.mutate({ total: 1, correct: 0 });
    }
    setPending(null);
    setQIdx((q) => q + 1);
  };
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Tic-Tac-Toe Vocabulary</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">ঘর দখল করতে হলে প্রথমে শব্দের সঠিক অর্থ বলতে হবে। আপনি X, কম্পিউটার O।</p>
      {winner ? (
        <p className="mt-3 text-center text-lg font-bold text-[var(--text)]">
          {winner === "draw" ? <span className="inline-flex items-center gap-2"><Fi n="handshake" /> It's a draw!</span> : winner === "X" ? <span className="inline-flex items-center gap-2"><Fi n="confetti" /> You win!</span> : <span className="inline-flex items-center gap-2"><Fi n="screen" /> Computer wins — try again!</span>}
        </p>
      ) : pending == null ? (
        <p className="mt-2 text-sm text-[var(--dim)]">Tap an empty square to get a question.</p>
      ) : entry ? (
        <div className="mt-3 rounded-xl bg-[var(--surface2)] p-3">
          <p className="font-semibold text-[var(--text)]">
            What does "{entry.en}" mean? <SpeakBtn text={entry.en} settings={settings} label={`Listen: ${entry.en}`} />
          </p>
          <div className="mt-2 grid gap-2">
            {opts.options.map((o, i) => (
              <button key={`${o}-${i}`} type="button" aria-label={`Answer: ${o}`} onClick={() => answer(i)} className="bn rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-[var(--text)]">
                {o}
              </button>
            ))}
          </div>
          {picked != null && <p className="mt-1 text-xs text-[var(--dim)]">{picked}</p>}
        </div>
      ) : null}
      {msg && <p className="mt-2 text-sm font-medium text-[var(--text)]">{msg}</p>}
      <div className="mx-auto mt-3 grid max-w-60 grid-cols-3 gap-1.5">
        {board.map((v, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Tic-tac-toe square ${i + 1}${v ? `, taken by ${v}` : ""}`}
            disabled={!!v || !!winner || pending != null}
            onClick={() => setPending(i)}
            className="flex h-16 items-center justify-center rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] text-2xl font-bold text-[var(--text)] disabled:opacity-70"
          >
            {v ?? ""}
          </button>
        ))}
      </div>
      <div className="mt-3 text-center">
        <Btn ariaLabel="Restart tic-tac-toe" onClick={() => { setBoard(Array(9).fill(null)); setPending(null); setMsg(""); }}><Fi n="rotate-right" /> New game</Btn>
      </div>
    </div>
  );
}

// ---------- sentence builder & fill blank & spelling ----------
function SentenceBuilder({ lesson }: { lesson: Lesson }) {
  const qc = useQueryClient();
  const sentences = useMemo(() => lesson.entries.filter((e) => e.exEn.split(" ").length >= 4).slice(0, 5), [lesson]);
  const [si, setSi] = useState(0);
  const entry = sentences[si];
  const words = useMemo(() => (entry ? shuffle(entry.exEn.replace(/[.!?]$/, "").split(" "), si + 5) : []), [entry, si]);
  const [built, setBuilt] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const record = useMutation({
    mutationFn: async (ok: boolean) => await api.recordAttempt({ lessonNumber: lesson.n, kind: "sentence-builder", total: 1, correct: ok ? 1 : 0 }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  if (!entry) return <p className="bn text-sm text-[var(--dim)]">এই পাঠে বাক্য সাজানোর মতো যথেষ্ট বড় বাক্য নেই।</p>;
  const target = entry.exEn.replace(/[.!?]$/, "");
  const correct = built.join(" ") === target;
  const usedCount = (w: string) => built.filter((b) => b === w).length;
  const availCount = (w: string) => words.filter((x) => x === w).length;
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Sentence Builder</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">এলোমেলো শব্দগুলো সঠিক ক্রমে সাজিয়ে বাক্য তৈরি করুন।</p>
      <p className="bn mt-2 text-sm text-[var(--dim)]">বাংলা অর্থ: {entry.exBn}</p>
      <div className="mt-2 flex min-h-12 flex-wrap items-center gap-1.5 rounded-xl border border-dashed border-[var(--border)] p-2">
        {built.length === 0 ? <span className="text-sm text-[var(--dim)]">Tap words below…</span> : built.map((w, i) => (
          <button key={i} type="button" aria-label={`Remove word ${w}`} onClick={() => setBuilt(built.filter((_, ix) => ix !== i))} className="rounded-lg bg-[var(--accent-soft)] px-2.5 py-1.5 font-medium text-[var(--text)]">{w}</button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {words.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            aria-label={`Add word ${w}`}
            disabled={usedCount(w) >= availCount(w)}
            onClick={() => { setBuilt([...built, w]); setChecked(false); }}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-medium text-[var(--text)] disabled:opacity-30"
          >
            {w}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Btn variant="primary" ariaLabel="Check the built sentence" onClick={() => { setChecked(true); record.mutate(correct); }}>Check</Btn>
        <Btn ariaLabel="Clear built sentence" onClick={() => { setBuilt([]); setChecked(false); }}>Clear</Btn>
        <Btn ariaLabel="Next sentence to build" onClick={() => { setSi((si + 1) % sentences.length); setBuilt([]); setChecked(false); }}>Next sentence →</Btn>
      </div>
      {checked && (
        <p className={`mt-2 text-sm font-medium ${correct ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
          {correct ? <><Fi n="check" /> Perfect! </> : <><Fi n="cross" /> Not yet. </>}Correct sentence: <span className="text-[var(--text)]">{entry.exEn}</span>
        </p>
      )}
    </div>
  );
}

function FillBlank({ lesson }: { lesson: Lesson }) {
  const qc = useQueryClient();
  const items = useMemo(
    () => lesson.entries.filter((e) => e.type === "word" && e.exEn.toLowerCase().includes(e.en.toLowerCase())).slice(0, 5),
    [lesson],
  );
  const [ii, setIi] = useState(0);
  const entry = items[ii];
  const [picked, setPicked] = useState<string | null>(null);
  const record = useMutation({
    mutationFn: async (ok: boolean) => await api.recordAttempt({ lessonNumber: lesson.n, kind: "fill-blank", total: 1, correct: ok ? 1 : 0 }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  if (!entry) return <p className="bn text-sm text-[var(--dim)]">এই পাঠে শূন্যস্থান পূরণের উপযোগী বাক্য নেই।</p>;
  const blanked = entry.exEn.replace(new RegExp(entry.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____");
  const opts = shuffle([entry.en, ...lesson.entries.filter((e) => e.key !== entry.key).slice(0, 3).map((e) => e.en)], ii + 2);
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Fill in the Blanks</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">শূন্যস্থানে সঠিক শব্দটি বসান।</p>
      <p className="mt-3 text-lg text-[var(--text)]">{blanked}</p>
      <p className="bn text-sm text-[var(--dim)]">{entry.exBn}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            aria-label={`Fill the blank with ${o}`}
            disabled={picked != null}
            onClick={() => { setPicked(o); record.mutate(o === entry.en); }}
            className={`rounded-xl border px-4 py-2.5 font-semibold ${picked === o ? (o === entry.en ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--rose)]") : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"}`}
          >
            {o}
          </button>
        ))}
      </div>
      {picked != null && (
        <div className="mt-2">
          <p className={`text-sm font-medium ${picked === entry.en ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
            {picked === entry.en ? <><Fi n="check" /> Correct!</> : <>The correct word is "{entry.en}" ({entry.bn}).</>}
          </p>
          <Btn className="mt-2" variant="primary" ariaLabel="Next fill in the blank" onClick={() => { setIi((ii + 1) % items.length); setPicked(null); }}>Next →</Btn>
        </div>
      )}
    </div>
  );
}

function SpellingGame({ lesson, settings }: { lesson: Lesson; settings: Settings }) {
  const qc = useQueryClient();
  const words = useMemo(() => lesson.entries.filter((e) => e.type === "word" && !e.en.includes(" ")), [lesson]);
  const [wi, setWi] = useState(0);
  const entry = words[wi];
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const record = useMutation({
    mutationFn: async (ok: boolean) => await api.recordAttempt({ lessonNumber: lesson.n, kind: "spelling", total: 1, correct: ok ? 1 : 0 }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  if (!entry) return <p className="bn text-sm text-[var(--dim)]">এই পাঠে বানান খেলার মতো একক শব্দ নেই।</p>;
  const ok = text.trim().toLowerCase() === entry.en.toLowerCase();
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Spelling Challenge</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">উচ্চারণ শুনে শব্দটির সঠিক বানান টাইপ করুন।</p>
      <p className="mt-1 text-xs text-[var(--dim)]">Word {wi + 1} / {words.length} · Score {score} · Meaning hint: <span className="bn">{entry.bn}</span></p>
      <div className="mt-3 flex gap-2">
        <button type="button" aria-label="Play the word to spell" onClick={() => speak(entry.en, settings)} className="h-11 w-11 shrink-0 rounded-full bg-[var(--accent-soft)] text-lg"><Fi n="volume" /></button>
        <input
          aria-label="Type the spelling you hear"
          value={text}
          onChange={(e) => { setText(e.target.value); setChecked(false); }}
          placeholder="Type the word…"
          className="min-w-0 flex-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)]"
        />
        <Btn variant="primary" ariaLabel="Check spelling answer" onClick={() => { setChecked(true); if (ok) setScore((s) => s + 1); record.mutate(ok); }}>Check</Btn>
      </div>
      {checked && (
        <div className="mt-2">
          <p className={`text-sm font-medium ${ok ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
            {ok ? <><Fi n="check" /> Correct spelling!</> : <>Correct spelling: "{entry.en}"</>}
          </p>
          <Btn className="mt-2" variant="primary" ariaLabel="Next spelling word" onClick={() => { setWi((wi + 1) % words.length); setText(""); setChecked(false); }}>Next word →</Btn>
        </div>
      )}
    </div>
  );
}

// ---------- sentence scramble (scored rounds) ----------
// Like Sentence Builder, but a scored game: five sentences drawn from this
// lesson's own examples and story lines, one after another, with a final
// score, a result screen and a retry. Results save as "sentence-scramble".
function SentenceScramble({ lesson, settings }: { lesson: Lesson; settings: Settings }) {
  const qc = useQueryClient();
  const [session, setSession] = useState(0);
  const pool = useMemo(() => {
    const seen = new Set<string>();
    const all: { text: string; bn: string }[] = [];
    const push = (text: string, bn: string) => {
      const clean = text.replace(/[.!?]+$/, "").trim();
      if (clean.split(" ").length >= 4 && !seen.has(clean)) {
        seen.add(clean);
        all.push({ text: clean, bn });
      }
    };
    lesson.entries.forEach((e) => push(e.exEn, e.exBn));
    lesson.story.lines.forEach((l) => push(l.en, l.bn));
    return shuffle(all, 100 + session * 17 + lesson.n).slice(0, 5);
  }, [lesson, session]);
  const [ri, setRi] = useState(0);
  const [built, setBuilt] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [lastRight, setLastRight] = useState(false);
  const [finished, setFinished] = useState(false);
  const recordedRef = useRef(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "sentence-scramble", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const item = pool[ri];
  const targetWords = useMemo(() => (item ? item.text.split(" ") : []), [item]);
  const chips = useMemo(() => {
    if (!item) return [];
    const s = shuffle(targetWords, ri * 31 + session * 7 + 5);
    if (s.join(" ") === item.text && s.length > 1) {
      const first = s[0] as string;
      return [...s.slice(1), first];
    }
    return s;
  }, [item, targetWords, ri, session]);
  if (pool.length === 0 || !item)
    return <p className="bn text-sm text-[var(--dim)]">এই পাঠে স্ক্র্যাম্বল খেলার মতো যথেষ্ট বড় বাক্য নেই।</p>;
  if (finished)
    return (
      <div className="rounded-2xl bg-[var(--surface2)] p-4 text-center">
        <p className="text-2xl font-bold text-[var(--text)]">{score} / {pool.length}</p>
        <p className="bn mt-1 text-sm text-[var(--dim)]">Sentence Scramble শেষ! আবার খেললে নতুন বাক্য আসবে।</p>
        <Btn
          className="mt-3"
          variant="primary"
          ariaLabel="Retry sentence scramble"
          onClick={() => { setSession((s) => s + 1); setRi(0); setBuilt([]); setScore(0); setRevealed(false); setFinished(false); recordedRef.current = false; }}
        >
          <Fi n="rotate-right" /> Retry
        </Btn>
      </div>
    );
  const usedCount = (w: string) => built.filter((b) => b === w).length;
  const availCount = (w: string) => chips.filter((x) => x === w).length;
  const addWord = (w: string) => {
    if (revealed) return;
    const next = [...built, w];
    setBuilt(next);
    if (next.length === targetWords.length) {
      const right = next.join(" ") === item.text;
      setLastRight(right);
      if (right) setScore((s) => s + 1);
      setRevealed(true);
    }
  };
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Sentence Scramble</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">এই পাঠের বাক্যের এলোমেলো শব্দগুলো সঠিক ক্রমে সাজান। সব শব্দ বসালেই ফলাফল দেখা যাবে।</p>
      <p className="mt-2 text-xs text-[var(--dim)]">Sentence {ri + 1} / {pool.length} · Score {score}</p>
      <p className="bn mt-2 text-sm text-[var(--dim)]">বাংলা অর্থ: {item.bn}</p>
      <div className="mt-1">
        <SpeakBtn text={item.text} settings={settings} label="Listen to the scrambled sentence" />
        <span className="ml-1 text-xs text-[var(--dim)]">Listen</span>
      </div>
      <div className="mt-2 flex min-h-12 flex-wrap items-center gap-1.5 rounded-xl border border-dashed border-[var(--border)] p-2" aria-live="polite">
        {built.length === 0 ? <span className="text-sm text-[var(--dim)]">Tap words below…</span> : built.map((w, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Remove word ${w}`}
            disabled={revealed}
            onClick={() => setBuilt(built.filter((_, ix) => ix !== i))}
            className="rounded-lg bg-[var(--accent-soft)] px-2.5 py-1.5 font-medium text-[var(--text)] disabled:opacity-70"
          >
            {w}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {chips.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            aria-label={`Add word ${w}`}
            disabled={revealed || usedCount(w) >= availCount(w)}
            onClick={() => addWord(w)}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-medium text-[var(--text)] disabled:opacity-30"
          >
            {w}
          </button>
        ))}
      </div>
      {revealed && (
        <div className="mt-3">
          <p className={`text-sm font-medium ${lastRight ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
            {lastRight ? <><Fi n="check" /> সঠিক ক্রম!</> : <><Fi n="cross" /> ক্রমটি ঠিক হয়নি।</>} <span className="text-[var(--text)]">Correct sentence: {item.text}.</span>
          </p>
          <Btn
            className="mt-2"
            variant="primary"
            ariaLabel={ri + 1 >= pool.length ? "Finish sentence scramble" : "Next scrambled sentence"}
            onClick={() => {
              if (ri + 1 >= pool.length) {
                setFinished(true);
                if (!recordedRef.current) {
                  recordedRef.current = true;
                  record.mutate({ total: pool.length, correct: score });
                }
              } else {
                setRi(ri + 1);
                setBuilt([]);
                setRevealed(false);
              }
            }}
          >
            {ri + 1 >= pool.length ? "See result" : "Next sentence →"}
          </Btn>
        </div>
      )}
    </div>
  );
}

// ---------- odd one out ----------
// Four words appear; three belong together (a word and two of its synonyms
// from this lesson, or three words of the same kind) and one does not.
// Built only from this lesson's own entries and their real relations.
interface OddRound { words: { en: string; bn: string }[]; odd: number; explain: string; }

function buildOddRounds(lesson: Lesson): OddRound[] {
  const rounds: OddRound[] = [];
  const usedOddKeys = new Set<string>();
  const findOdd = (notEn: string[], notKeys: string[]) =>
    lesson.entries.find(
      (x) => !notKeys.includes(x.key) && !notEn.includes(x.en) && !usedOddKeys.has(x.key),
    );
  // Family rounds: a word plus two of its synonyms are the group of three.
  for (const e of lesson.entries) {
    if (rounds.length >= 6) break;
    const s0 = e.synonyms[0];
    const s1 = e.synonyms[1];
    if (!s0 || !s1) continue;
    const famEn = [e.en, s0.en, s1.en];
    const oddEntry = findOdd(
      [...famEn, ...e.antonyms.map((a) => a.en)],
      [e.key],
    );
    if (!oddEntry) continue;
    usedOddKeys.add(oddEntry.key);
    const words = shuffle(
      [
        { en: e.en, bn: e.bn },
        { en: s0.en, bn: s0.bn },
        { en: s1.en, bn: s1.bn },
        { en: oddEntry.en, bn: oddEntry.bn },
      ],
      rounds.length * 13 + lesson.n + 3,
    );
    rounds.push({
      words,
      odd: words.findIndex((w) => w.en === oddEntry.en),
      explain: `"${famEn.join('", "')}" all mean almost the same as "${e.en}" (${e.bn}). "${oddEntry.en}" means ${oddEntry.bn} — it does not belong.`,
    });
  }
  // Same-kind rounds: three words of one kind (noun / verb / …) plus one
  // word of a different kind, all from this lesson.
  if (rounds.length < 6) {
    const byPos = new Map<string, VocabEntry[]>();
    lesson.entries.forEach((e) => {
      const g = byPos.get(e.pos) ?? [];
      g.push(e);
      byPos.set(e.pos, g);
    });
    for (const [pos, group] of byPos) {
      if (rounds.length >= 6) break;
      if (group.length < 3) continue;
      const trio = group.slice(0, 3);
      const oddEntry = lesson.entries.find(
        (x) => x.pos !== pos && !usedOddKeys.has(x.key) && !trio.some((t) => t.key === x.key),
      );
      if (!oddEntry) continue;
      usedOddKeys.add(oddEntry.key);
      const words = shuffle(
        [...trio.map((t) => ({ en: t.en, bn: t.bn })), { en: oddEntry.en, bn: oddEntry.bn }],
        rounds.length * 17 + lesson.n + 23,
      );
      rounds.push({
        words,
        odd: words.findIndex((w) => w.en === oddEntry.en),
        explain: `"${trio.map((t) => t.en).join('", "')}" are all ${pos} words in this lesson. "${oddEntry.en}" (${oddEntry.bn}) is a ${oddEntry.pos} — it does not belong.`,
      });
    }
  }
  return rounds;
}

function OddOneOut({ lesson }: { lesson: Lesson }) {
  const qc = useQueryClient();
  const rounds = useMemo(() => buildOddRounds(lesson), [lesson]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const recordedRef = useRef(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "odd-one-out", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const round = rounds[qi];
  if (rounds.length === 0 || !round)
    return <p className="bn text-sm text-[var(--dim)]">এই পাঠে এই খেলার জন্য যথেষ্ট সম্পর্কযুক্ত শব্দ নেই। অন্য খেলা চেষ্টা করুন।</p>;
  if (finished)
    return (
      <div className="rounded-2xl bg-[var(--surface2)] p-4 text-center">
        <p className="text-2xl font-bold text-[var(--text)]">{score} / {rounds.length}</p>
        <p className="bn mt-1 text-sm text-[var(--dim)]">Odd One Out শেষ হয়েছে। আবার খেলতে নিচের বোতাম চাপুন।</p>
        <Btn className="mt-3" variant="primary" ariaLabel="Retry odd one out" onClick={() => { setQi(0); setScore(0); setPicked(null); setFinished(false); recordedRef.current = false; }}><Fi n="rotate-right" /> Retry</Btn>
      </div>
    );
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Odd One Out</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">চারটি শব্দের মধ্যে তিনটি একই দলের — যেটি মেলে না, সেটি বেছে নিন।</p>
      <p className="mt-2 text-xs text-[var(--dim)]">Round {qi + 1} / {rounds.length} · Score {score}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {round.words.map((w, i) => {
          const isOdd = i === round.odd;
          const isPicked = picked === i;
          return (
            <button
              key={`${w.en}-${i}`}
              type="button"
              aria-label={`Word option: ${w.en}`}
              disabled={picked != null}
              onClick={() => {
                setPicked(i);
                if (isOdd) setScore((s) => s + 1);
              }}
              className={`rounded-xl border px-3 py-3 text-left ${picked != null && isOdd ? "border-[var(--accent)] bg-[var(--accent-soft)]" : isPicked ? "border-[var(--rose)] bg-red-50 dark:bg-red-950" : "border-[var(--border)] bg-[var(--surface)]"}`}
            >
              <span className="block font-semibold text-[var(--text)]">{w.en}</span>
              {picked != null && <span className="bn block text-sm text-[var(--dim)]">{w.bn}</span>}
            </button>
          );
        })}
      </div>
      {picked != null && (
        <div className="mt-3">
          <p className={`text-sm font-medium ${picked === round.odd ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
            {picked === round.odd ? <><Fi n="check" /> সঠিক!</> : <><Fi n="cross" /> ভুল হয়েছে।</>} <span className="text-[var(--text)]">{round.explain}</span>
          </p>
          <Btn
            className="mt-2"
            variant="primary"
            ariaLabel={qi + 1 >= rounds.length ? "Finish odd one out" : "Next odd one out round"}
            onClick={() => {
              if (qi + 1 >= rounds.length) {
                setFinished(true);
                if (!recordedRef.current) {
                  recordedRef.current = true;
                  record.mutate({ total: rounds.length, correct: score });
                }
              } else {
                setQi(qi + 1);
                setPicked(null);
              }
            }}
          >
            {qi + 1 >= rounds.length ? "See result" : "Next →"}
          </Btn>
        </div>
      )}
    </div>
  );
}

// ---------- listen and type (dictation) ----------
// A lesson word or a full example sentence is spoken; the learner types
// exactly what they hear. Words and sentences alternate. Results save as
// "listen-type".
function ListenAndType({ lesson, settings }: { lesson: Lesson; settings: Settings }) {
  const qc = useQueryClient();
  const items = useMemo(() => {
    const words = lesson.entries
      .filter((e) => e.type === "word")
      .slice(0, 3)
      .map((e) => ({ say: e.en, bn: e.bn, kind: "Word · শব্দ" }));
    const sents = lesson.entries
      .filter((e) => e.exEn.replace(/[.!?]+$/, "").split(" ").length >= 3)
      .slice(0, 3)
      .map((e) => ({ say: e.exEn, bn: e.exBn, kind: "Sentence · বাক্য" }));
    const out: { say: string; bn: string; kind: string }[] = [];
    for (let i = 0; i < 3; i++) {
      const w = words[i];
      const s = sents[i];
      if (w) out.push(w);
      if (s) out.push(s);
    }
    return out;
  }, [lesson]);
  const [ii, setIi] = useState(0);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const recordedRef = useRef(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "listen-type", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const item = items[ii];
  useEffect(() => {
    if (!item || finished) return;
    const t = window.setTimeout(() => speak(item.say, settings), 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ii, finished]);
  if (items.length === 0 || !item)
    return <p className="bn text-sm text-[var(--dim)]">এই পাঠে শুনে লেখার মতো শব্দ বা বাক্য নেই।</p>;
  if (finished)
    return (
      <div className="rounded-2xl bg-[var(--surface2)] p-4 text-center">
        <p className="text-2xl font-bold text-[var(--text)]">{score} / {items.length}</p>
        <p className="bn mt-1 text-sm text-[var(--dim)]">Listen &amp; Type শেষ হয়েছে। আবার অনুশীলন করতে নিচের বোতাম চাপুন।</p>
        <Btn className="mt-3" variant="primary" ariaLabel="Retry listen and type" onClick={() => { setIi(0); setText(""); setChecked(false); setScore(0); setFinished(false); recordedRef.current = false; }}><Fi n="rotate-right" /> Retry</Btn>
      </div>
    );
  const norm = (s: string) => s.toLowerCase().replace(/[.!?,;:"'’]/g, "").replace(/\s+/g, " ").trim();
  const ok = norm(text) === norm(item.say);
  return (
    <div>
      <h4 className="font-bold text-[var(--text)]">Listen &amp; Type</h4>
      <p className="bn mt-0.5 text-sm text-[var(--dim)]">শব্দ বা বাক্যটি মন দিয়ে শুনুন এবং ঠিক যা শুনলেন তা টাইপ করুন।</p>
      <p className="mt-2 text-xs text-[var(--dim)]">Item {ii + 1} / {items.length} · Score {score} · <span className="bn">{item.kind}</span></p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-label="Play what you must type"
          onClick={() => speak(item.say, settings)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xl text-[var(--on-accent)]"
        >
          <Fi n="volume" />
        </button>
        <Btn ariaLabel="Play it slowly" onClick={() => speak(item.say, settings, { rate: 0.6 })}>Slow · ধীরে</Btn>
        <span className="bn text-sm text-[var(--dim)]">শুনুন, তারপর নিচে লিখুন।</span>
      </div>
      <div className="mt-3 flex gap-2">
        <input
          aria-label="Type exactly what you hear"
          value={text}
          onChange={(e) => { setText(e.target.value); setChecked(false); }}
          placeholder="Type what you hear…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-base text-[var(--text)]"
        />
        <Btn
          variant="primary"
          ariaLabel="Check what you typed"
          onClick={() => {
            if (checked || !text.trim()) return;
            setChecked(true);
            if (ok) setScore((s) => s + 1);
          }}
        >
          Check
        </Btn>
      </div>
      {checked && (
        <div className="mt-2">
          <p className={`text-sm font-medium ${ok ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
            {ok ? <><Fi n="check" /> একদম ঠিক শুনেছেন!</> : <><Fi n="cross" /> মেলেনি।</>}
          </p>
          <p className="mt-1 text-sm text-[var(--text)]">Correct: <span className="font-semibold">{item.say}</span></p>
          <p className="bn text-sm text-[var(--dim)]">অর্থ: {item.bn}</p>
          <Btn
            className="mt-2"
            variant="primary"
            ariaLabel={ii + 1 >= items.length ? "Finish listen and type" : "Next listen and type item"}
            onClick={() => {
              if (ii + 1 >= items.length) {
                setFinished(true);
                if (!recordedRef.current) {
                  recordedRef.current = true;
                  record.mutate({ total: items.length, correct: score });
                }
              } else {
                setIi(ii + 1);
                setText("");
                setChecked(false);
              }
            }}
          >
            {ii + 1 >= items.length ? "See result" : "Next →"}
          </Btn>
        </div>
      )}
    </div>
  );
}

// ---------- speed round (60 seconds) ----------
// Quick-fire meaning questions against the clock: answer as many as you
// can in 60 seconds. Every answer moves straight to the next question.
// Results save as "speed-round".
function SpeedRound({ lesson, settings, best }: { lesson: Lesson; settings: Settings; best: number | null }) {
  const qc = useQueryClient();
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [timeLeft, setTimeLeft] = useState(60);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [flash, setFlash] = useState<"right" | "wrong" | null>(null);
  const recordedRef = useRef(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: lesson.n, kind: "speed-round", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const queue = useMemo(() => shuffle(lesson.entries, lesson.n * 3 + 1), [lesson]);
  const entry = queue[qi % Math.max(1, queue.length)] ?? lesson.entries[0];
  const opts = entry ? optionsFor(lesson.entries, entry, (e) => e.bn, qi * 7 + 3) : { options: [], answer: 0 };
  useEffect(() => {
    if (phase !== "playing") return;
    const id = window.setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => window.clearInterval(id);
  }, [phase]);
  useEffect(() => {
    if (phase === "playing" && timeLeft === 0) {
      setPhase("done");
      if (!recordedRef.current && answered > 0) {
        recordedRef.current = true;
        record.mutate({ total: answered, correct: score });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);
  const start = () => {
    setPhase("playing");
    setTimeLeft(60);
    setQi(0);
    setScore(0);
    setAnswered(0);
    setFlash(null);
    recordedRef.current = false;
  };
  const answer = (i: number) => {
    if (phase !== "playing" || !entry) return;
    const right = i === opts.answer;
    if (right) setScore((s) => s + 1);
    setAnswered((a) => a + 1);
    setFlash(right ? "right" : "wrong");
    setQi((q) => q + 1);
    window.setTimeout(() => setFlash(null), 250);
  };
  if (phase === "ready")
    return (
      <div className="text-center">
        <h4 className="font-bold text-[var(--text)]">Speed Round · <span className="bn">গতি রাউন্ড</span></h4>
        <p className="bn mx-auto mt-1 max-w-md text-sm text-[var(--dim)]">৬০ সেকেন্ডে যত বেশি সম্ভব অর্থের প্রশ্নের উত্তর দিন। ভুল হলেও থামবেন না — পরের প্রশ্ন সঙ্গে সঙ্গে আসবে!</p>
        {best != null && <p className="mt-2 text-sm font-semibold text-[var(--text)]"><Fi n="trophy" /> Your best so far: {best} correct</p>}
        <Btn className="mt-3" variant="primary" ariaLabel="Start the 60 second speed round" onClick={start}><Fi n="play" /> Start · 60 seconds</Btn>
      </div>
    );
  if (phase === "done")
    return (
      <div className="rounded-2xl bg-[var(--surface2)] p-4 text-center">
        <p className="text-2xl font-bold text-[var(--text)]">{score} correct</p>
        <p className="mt-1 text-sm text-[var(--dim)]">You answered {answered} question{answered === 1 ? "" : "s"} in 60 seconds{answered > 0 ? ` · ${Math.round((score / answered) * 100)}% accuracy` : ""}.</p>
        <p className="bn mt-1 text-sm text-[var(--dim)]">সময় শেষ! আবার চেষ্টা করে নিজের রেকর্ড ভাঙুন।</p>
        {best != null && <p className="mt-1 text-sm font-semibold text-[var(--text)]"><Fi n="trophy" /> Best: {Math.max(best, score)} correct</p>}
        <Btn className="mt-3" variant="primary" ariaLabel="Play the speed round again" onClick={start}><Fi n="rotate-right" /> Play again</Btn>
      </div>
    );
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-bold text-[var(--text)]">Speed Round</h4>
        <span className={`rounded-full px-3 py-1 text-sm font-extrabold ${timeLeft <= 10 ? "bg-[var(--rose)] text-white" : "bg-[var(--surface2)] text-[var(--text)]"}`} aria-label={`${timeLeft} seconds left`}>
          <Fi n="clock" /> {timeLeft}s
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-valuenow={timeLeft} aria-valuemin={0} aria-valuemax={60} aria-label="Time left in speed round">
        <div className="h-full rounded-full bg-[var(--hero)] transition-all duration-1000" style={{ width: `${(timeLeft / 60) * 100}%` }} />
      </div>
      <p className="mt-2 text-xs text-[var(--dim)]">Score {score} · Answered {answered}</p>
      {entry && (
        <div className={`mt-2 rounded-2xl border-2 p-3 transition-colors ${flash === "right" ? "border-[var(--accent)]" : flash === "wrong" ? "border-[var(--rose)]" : "border-transparent"}`}>
          <p className="flex items-center gap-2 text-lg font-semibold text-[var(--text)]">
            What does "{entry.en}" mean?
            <SpeakBtn text={entry.en} settings={settings} label={`Listen: ${entry.en}`} />
          </p>
          <div className="mt-3 grid gap-2">
            {opts.options.map((opt, i) => (
              <button
                key={`${opt}-${i}`}
                type="button"
                aria-label={`Speed answer: ${opt}`}
                onClick={() => answer(i)}
                className="bn rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left text-base text-[var(--text)]"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- quick practice (mixed 10 questions) ----------
// One mixed round of exactly 10 questions built only from this lesson:
// meanings both ways, listening, a synonym and an antonym where the
// lesson truly has them, a fill-in-the-blank from an example, and a story
// question — topped up with more meaning questions. The score saves as a
// "quick-practice" attempt, so the best score per lesson is remembered.
function QuickPractice({ lesson, settings, best }: { lesson: Lesson; settings: Settings; best: number | null }) {
  const questions = useMemo<MCQ[]>(() => {
    const es = lesson.entries;
    const out: MCQ[] = [];
    const usedKeys = new Set<string>();
    const meaningQ = (e: VocabEntry, seed: number): MCQ => {
      const o = optionsFor(es, e, (x) => x.bn, seed);
      return { prompt: <span>What does "{e.en}" mean?</span>, options: o.options, answer: o.answer, explain: `"${e.en}" means ${e.bn}.` };
    };
    const pool = shuffle(es, lesson.n * 13 + 7);
    let pi = 0;
    const nextEntry = (): VocabEntry | undefined => {
      while (pi < pool.length) {
        const e = pool[pi] as VocabEntry;
        pi++;
        if (!usedKeys.has(e.key)) {
          usedKeys.add(e.key);
          return e;
        }
      }
      return undefined;
    };
    // 3 × meaning (English → Bengali)
    for (let k = 0; k < 3; k++) {
      const e = nextEntry();
      if (e) out.push(meaningQ(e, k + 3));
    }
    // 2 × meaning (Bengali → English)
    for (let k = 0; k < 2; k++) {
      const e = nextEntry();
      if (!e) break;
      const o = optionsFor(es, e, (x) => x.en, k + 53);
      out.push({
        prompt: <span className="bn">"{e.bn}" — এটি কোন ইংরেজি শব্দের অর্থ?</span>,
        options: o.options,
        answer: o.answer,
        explain: `"${e.bn}" is the meaning of "${e.en}".`,
      });
    }
    // 1 × listening
    {
      const e = nextEntry();
      if (e) {
        const o = optionsFor(es, e, (x) => x.bn, 61);
        out.push({
          prompt: <span className="inline-flex items-center gap-1.5"><Fi n="headphones" /> Listen and choose the meaning</span>,
          speakText: e.en,
          options: o.options,
          answer: o.answer,
          explain: `"${e.en}" means ${e.bn}.`,
        });
      }
    }
    // 1 × synonym (only where a true synonym exists)
    {
      const e = es.find((x) => x.synonyms.length > 0 && !usedKeys.has(x.key));
      const t = e?.synonyms[0];
      if (e && t) {
        usedKeys.add(e.key);
        const wrongs = shuffle(es.filter((x) => x.key !== e.key), 67).slice(0, 3).map((x) => x.en);
        const opts = shuffle([t.en, ...wrongs], 71);
        out.push({ prompt: <span>Best synonym of "{e.en}"?</span>, options: opts, answer: opts.indexOf(t.en), explain: `"${t.en}" (${t.bn}) is a synonym of "${e.en}".` });
      }
    }
    // 1 × antonym (only where a true antonym exists)
    {
      const e = es.find((x) => x.antonyms.length > 0 && !usedKeys.has(x.key));
      const t = e?.antonyms[0];
      if (e && t) {
        usedKeys.add(e.key);
        const wrongs = shuffle(es.filter((x) => x.key !== e.key), 73).slice(0, 3).map((x) => x.en);
        const opts = shuffle([t.en, ...wrongs], 79);
        out.push({ prompt: <span>Antonym of "{e.en}"?</span>, options: opts, answer: opts.indexOf(t.en), explain: `"${t.en}" (${t.bn}) is the opposite of "${e.en}".` });
      }
    }
    // 1 × fill in the blank from an example sentence
    {
      const e = es.find((x) => x.type === "word" && x.exEn.toLowerCase().includes(x.en.toLowerCase()) && !usedKeys.has(x.key));
      if (e) {
        usedKeys.add(e.key);
        const blanked = e.exEn.replace(new RegExp(e.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____");
        const wrongs = shuffle(es.filter((x) => x.key !== e.key), 83).slice(0, 3).map((x) => x.en);
        const opts = shuffle([e.en, ...wrongs], 89);
        out.push({ prompt: <span>{blanked}</span>, options: opts, answer: opts.indexOf(e.en), explain: `"${e.en}" (${e.bn}) — full sentence: ${e.exEn}` });
      }
    }
    // 1 × story comprehension
    {
      const q = lesson.story.questions[0];
      if (q) out.push({ prompt: <span>{q.qEn}</span>, options: q.options, answer: q.answer, explain: q.qBn });
    }
    // Top up with fresh meaning questions until there are 10.
    let seed = 97;
    while (out.length < 10) {
      const e = nextEntry();
      if (!e) break;
      out.push(meaningQ(e, seed));
      seed += 4;
    }
    return shuffle(out, lesson.n * 19 + 11).slice(0, 10);
  }, [lesson]);
  return (
    <div>
      <p className="mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--text)]">
        <Fi n="trophy" />
        {best != null ? (
          <span>Your best Quick Practice score in this lesson: {best} / {questions.length} · <span className="bn">সেরা স্কোর</span></span>
        ) : (
          <span className="bn">এটাই আপনার প্রথম Quick Practice — শেষ করলেই স্কোর সংরক্ষিত হবে।</span>
        )}
      </p>
      <MCQGame
        title="Quick Practice"
        instructionsBn="এই পাঠের নিজের শব্দ, বাক্য আর গল্প থেকে তৈরি ১০টি মিশ্র প্রশ্ন। শেষে স্কোর দেখুন, চাইলে আবার চেষ্টা করুন।"
        questions={questions}
        kind="quick-practice"
        lessonN={lesson.n}
        settings={settings}
      />
    </div>
  );
}

// ---------- games hub ----------
function Games({ lesson, settings, state, startGame }: { lesson: Lesson; settings: Settings; state: State; startGame?: string }) {
  const [game, setGame] = useState(startGame ?? "matching");
  const lessonAttempts = state.attempts.filter((a) => a.lessonNumber === lesson.n);
  const bestFor = (kind: string): number | null => {
    const list = lessonAttempts.filter((a) => a.kind === kind);
    return list.length > 0 ? Math.max(...list.map((a) => a.correct)) : null;
  };
  const quickBest = bestFor("quick-practice");
  const entries = lesson.entries;
  const listeningQs: MCQ[] = entries.slice(0, 5).map((e, i) => {
    const o = optionsFor(entries, e, (x) => x.bn, i + 21);
    return { prompt: <span className="inline-flex items-center gap-1.5"><Fi n="headphones" /> Listen and choose the meaning</span>, speakText: e.en, options: o.options, answer: o.answer, explain: `"${e.en}" means ${e.bn}.` };
  });
  const synEntries = entries.filter((e) => e.synonyms.length > 0);
  const synQs: MCQ[] = synEntries.slice(0, 5).map((e, i) => {
    const target = e.synonyms[0] as { en: string; bn: string };
    const wrongs = shuffle(entries.filter((x) => x.key !== e.key), i + 31).slice(0, 3).map((x) => x.en);
    const opts = shuffle([target.en, ...wrongs], i + 37);
    return { prompt: <span>Best synonym of "{e.en}"?</span>, options: opts, answer: opts.indexOf(target.en), explain: `"${target.en}" (${target.bn}) is a synonym of "${e.en}".` };
  });
  const antEntries = entries.filter((e) => e.antonyms.length > 0);
  const antQs: MCQ[] = antEntries.slice(0, 5).map((e, i) => {
    const target = e.antonyms[0] as { en: string; bn: string };
    const wrongs = shuffle(entries.filter((x) => x.key !== e.key), i + 41).slice(0, 3).map((x) => x.en);
    const opts = shuffle([target.en, ...wrongs], i + 43);
    return { prompt: <span>Antonym of "{e.en}"?</span>, options: opts, answer: opts.indexOf(target.en), explain: `"${target.en}" (${target.bn}) is the opposite of "${e.en}".` };
  });
  const storyQs: MCQ[] = lesson.story.questions.map((q) => ({
    prompt: <span>{q.qEn}</span>, options: q.options, answer: q.answer,
    explain: q.qBn,
  }));
  const games: [string, string, string][] = [
    ["matching", "puzzle", "Matching"],
    ["memory", "brain", "Memory"],
    ["tictactoe", "apps", "Tic-Tac-Toe"],
    ["listening", "headphones", "Listening"],
    ["synonym", "arrows-repeat", "Synonym"],
    ["antonym", "arrows-h", "Antonym"],
    ["builder", "block-brick", "Sentence Builder"],
    ["scramble", "shuffle", "Scramble"],
    ["blank", "pencil", "Fill Blank"],
    ["spelling", "letter-case", "Spelling"],
    ["listentype", "keyboard", "Listen & Type"],
    ["oddoneout", "comment-question", "Odd One Out"],
    ["speed", "target", "Speed Round"],
    ["storyq", "book-open-cover", "Story Quiz"],
  ];
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-[1.75rem] border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-4">
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold text-[var(--text)]"><Fi n="list-check" /> Quick Practice · <span className="bn">দ্রুত অনুশীলন</span></p>
          <p className="bn mt-0.5 text-sm text-[var(--dim)]">
            এই পাঠের নিজের শব্দ, বাক্য আর গল্প থেকে ১০টি মিশ্র প্রশ্ন — অর্থ, শোনা, সমার্থক, বিপরীত আর শূন্যস্থান।
            {quickBest != null ? ` আপনার সেরা স্কোর: ${quickBest}/10।` : " শেষ করলেই স্কোর সংরক্ষিত হবে।"}
          </p>
        </div>
        <Btn variant="primary" ariaLabel="Start quick practice for this lesson" onClick={() => setGame("quick")}><Fi n="play" /> Start Quick Practice</Btn>
      </div>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Practice games">
        {games.map(([g, icon, label]) => (
          <button
            key={g}
            type="button"
            role="tab"
            aria-selected={game === g}
            aria-label={`Game: ${label}`}
            onClick={() => setGame(g)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${game === g ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
          >
            <Fi n={icon} /> {label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
        {game === "matching" && <MatchingGame key={`m-${lesson.n}`} lesson={lesson} />}
        {game === "memory" && <MemoryGame key={`mem-${lesson.n}`} lesson={lesson} />}
        {game === "tictactoe" && <TicTacToe key={`ttt-${lesson.n}`} lesson={lesson} settings={settings} />}
        {game === "listening" && <MCQGame key={`l-${lesson.n}`} title="Listening Challenge" instructionsBn="ইংরেজি শব্দটি শুনুন এবং সঠিক বাংলা অর্থ বেছে নিন।" questions={listeningQs} kind="listening" lessonN={lesson.n} settings={settings} />}
        {game === "synonym" && (synQs.length > 0 ? <MCQGame key={`s-${lesson.n}`} title="Synonym Challenge" instructionsBn="শব্দটির সবচেয়ে উপযুক্ত সমার্থক শব্দ বেছে নিন।" questions={synQs} kind="synonym" lessonN={lesson.n} settings={settings} /> : <p className="bn text-sm text-[var(--dim)]">এই পাঠের কোনো শব্দের যাচাইকৃত সমার্থক শব্দ নেই, তাই এই খেলাটি এই পাঠে নেই।</p>)}
        {game === "antonym" && (antQs.length > 0 ? <MCQGame key={`a-${lesson.n}`} title="Antonym Challenge" instructionsBn="শব্দটির সঠিক বিপরীত শব্দ বেছে নিন। শুধু যেসব শব্দের সত্যিকারের বিপরীত শব্দ আছে সেগুলোই এখানে আছে।" questions={antQs} kind="antonym" lessonN={lesson.n} settings={settings} /> : <p className="bn text-sm text-[var(--dim)]">এই পাঠের কোনো শব্দের স্বাভাবিক বিপরীত শব্দ নেই, তাই এই খেলাটি এই পাঠে নেই।</p>)}
        {game === "builder" && <SentenceBuilder key={`b-${lesson.n}`} lesson={lesson} />}
        {game === "scramble" && <SentenceScramble key={`sc-${lesson.n}`} lesson={lesson} settings={settings} />}
        {game === "blank" && <FillBlank key={`f-${lesson.n}`} lesson={lesson} />}
        {game === "spelling" && <SpellingGame key={`sp-${lesson.n}`} lesson={lesson} settings={settings} />}
        {game === "listentype" && <ListenAndType key={`lt-${lesson.n}`} lesson={lesson} settings={settings} />}
        {game === "oddoneout" && <OddOneOut key={`oo-${lesson.n}`} lesson={lesson} />}
        {game === "speed" && <SpeedRound key={`sr-${lesson.n}`} lesson={lesson} settings={settings} best={bestFor("speed-round")} />}
        {game === "quick" && <QuickPractice key={`qp-${lesson.n}`} lesson={lesson} settings={settings} best={quickBest} />}
        {game === "storyq" && <MCQGame key={`sq-${lesson.n}`} title="Story Comprehension" instructionsBn="পাঠের গল্পটি পড়ে বা শুনে প্রশ্নের উত্তর দিন।" questions={storyQs} kind="story-quiz" lessonN={lesson.n} settings={settings} />}
      </div>
    </div>
  );
}

// ---------- story reader ----------
function StoryReader({ lesson, settings, showBnDefault }: { lesson: Lesson; settings: Settings; showBnDefault: boolean }) {
  const [mode, setMode] = useState<"both" | "en" | "lines" | "listen" | "blank">("both");
  const [showBn, setShowBn] = useState(showBnDefault);
  const [activeLine, setActiveLine] = useState(-1);
  const [lookup, setLookup] = useState<VocabEntry | null>(null);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xl">("normal");
  const [heard, setHeard] = useState<ReadonlySet<number>>(new Set());
  const story = lesson.story;
  const enSizeCls = textSize === "normal" ? "text-base" : textSize === "large" ? "text-lg" : "text-xl";
  const bnSizeCls = textSize === "normal" ? "text-sm" : textSize === "large" ? "text-base" : "text-lg";
  const markHeard = (i: number) => setHeard((h) => (h.has(i) ? h : new Set(h).add(i)));
  const playAll = () => {
    speakAll(
      story.lines.map((l) => l.en),
      settings,
      (i) => { setActiveLine(i); markHeard(i); },
    );
  };
  const blankTarget = lesson.entries[0];
  const tapWord = (word: string) => {
    const clean = word.replace(/[^A-Za-z'-]/g, "").toLowerCase();
    const found = lesson.entries.find((e) => e.en.toLowerCase() === clean || e.en.toLowerCase().includes(clean) && clean.length > 2);
    if (found) setLookup(found);
  };
  const renderLine = (line: { en: string; bn: string }, i: number) => {
    if (mode === "blank" && blankTarget && i < 3) {
      const re = new RegExp(blankTarget.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      if (re.test(line.en)) {
        const parts = line.en.split(re);
        return (
          <span>
            {parts[0]}
            <span className="mx-1 inline-block min-w-16 border-b-2 border-[var(--amber)] text-center font-bold text-[var(--amber)]">?</span>
            {parts[1]}
          </span>
        );
      }
    }
    return (
      <span>
        {line.en.split(" ").map((w, wi) => {
          const isTarget = lesson.entries.some((e) => e.en.toLowerCase() === w.replace(/[^A-Za-z'-]/g, "").toLowerCase());
          return (
            <span key={wi}>
              <button
                type="button"
                aria-label={`Word: ${w}. Show meaning.`}
                onClick={() => tapWord(w)}
                className={isTarget ? "hl-word" : "text-[var(--text)]"}
              >
                {w}
              </button>{" "}
            </span>
          );
        })}
      </span>
    );
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Story reading modes">
        {([["both", "EN + বাংলা"], ["en", "English only"], ["lines", "Sentence by sentence"], ["listen", "Listening"], ["blank", "Fill blanks"]] as const).map(([m, label]) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} aria-label={`Reading mode: ${label}`} onClick={() => setMode(m)} className={`rounded-full px-3 py-1.5 text-sm font-medium ${mode === m ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}>
            {label}
          </button>
        ))}
        <Btn ariaLabel="Play the whole story aloud" onClick={playAll}><Fi n="play" /> Play story</Btn>
        <Btn ariaLabel="Stop story playback" onClick={() => { window.speechSynthesis?.cancel(); setActiveLine(-1); }}><Fi n="stop" /> Stop</Btn>
        <label className="flex items-center gap-1.5 text-sm text-[var(--text)]">
          <input type="checkbox" aria-label="Show Bengali translation in story" checked={showBn} onChange={(e) => setShowBn(e.target.checked)} className="h-5 w-5" />
          <span className="bn">বাংলা দেখান</span>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="flex rounded-full border border-[var(--border)] bg-[var(--surface2)] p-0.5" role="group" aria-label="Story text size">
          {(["normal", "large", "xl"] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`Story text size: ${s}`}
              aria-pressed={textSize === s}
              onClick={() => setTextSize(s)}
              className={`rounded-full px-2.5 py-1 font-semibold ${textSize === s ? "bg-[var(--surface)] text-[var(--text)] shadow-sm" : "text-[var(--dim)]"} ${s === "normal" ? "text-xs" : s === "large" ? "text-sm" : "text-base"}`}
            >
              A
            </button>
          ))}
        </div>
        <div className="flex min-w-44 flex-1 items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-label="Story listening progress" aria-valuenow={heard.size} aria-valuemin={0} aria-valuemax={story.lines.length}>
            <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${story.lines.length ? Math.round((heard.size / story.lines.length) * 100) : 0}%` }} />
          </div>
          <span className="text-xs whitespace-nowrap text-[var(--dim)]">{heard.size}/{story.lines.length} sentences heard</span>
        </div>
      </div>

      <h3 className="mt-4 text-xl font-bold text-[var(--text)]">{story.titleEn}</h3>
      <p className="bn text-base text-[var(--dim)]">{story.titleBn}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-3">
        <button
          type="button"
          aria-label="Listen to the whole lesson story"
          onClick={playAll}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-base font-bold text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)] active:scale-[0.98]"
        >
          <Fi n="volume" /> Listen to the story
        </button>
        <button
          type="button"
          aria-label="Stop story playback"
          onClick={() => { window.speechSynthesis?.cancel(); setActiveLine(-1); }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--surface)] px-3.5 py-2.5 text-sm font-semibold text-[var(--text)]"
        >
          <Fi n="stop" /> Stop
        </button>
        <span className="bn text-sm text-[var(--text)]">পুরো গল্পটি শুনতে বোতামটি চাপুন — যে বাক্যটি পড়া হচ্ছে তা হাইলাইট হবে। প্রতিটি বাক্যের পাশের স্পিকার বোতাম দিয়েও আলাদা করে শুনতে পারবেন।</span>
      </div>

      {mode === "listen" ? (
        <div className="mt-3 rounded-2xl bg-[var(--surface2)] p-4 text-center">
          <p className="text-4xl"><Fi n="headphones" /></p>
          <p className="bn mt-2 text-sm text-[var(--dim)]">চোখ বন্ধ করে গল্পটি শুনুন। যে লাইনটি পড়া হচ্ছে সেটি নিচে হাইলাইট হবে। (বাক্যভিত্তিক প্লেব্যাক — শব্দভিত্তিক সিঙ্ক নয়।)</p>
          <div className="mt-3 space-y-1 text-left">
            {story.lines.map((line, i) => (
              <p key={i} className={`rounded-lg px-2 py-1 text-sm ${activeLine === i ? "bg-[var(--accent-soft)] font-semibold" : "text-[var(--dim)]"}`}>{line.en}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-3 max-w-[68ch] space-y-2">
          {story.lines.map((line, i) => (
            <div key={i} className={`rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-3 ${activeLine === i ? "ring-2 ring-[var(--accent)]" : ""}`}>
              <p className={`flex items-start gap-2 leading-relaxed text-[var(--text)] ${enSizeCls}`}>
                <button type="button" aria-label={`Listen to story sentence ${i + 1}`} onClick={() => { setActiveLine(i); markHeard(i); speak(line.en, settings); }} className="mt-0.5 shrink-0"><Fi n="volume" /></button>
                <span>{renderLine(line, i)}</span>
              </p>
              {mode !== "en" && showBn && <p className={`bn mt-1 pl-8 leading-relaxed text-[var(--dim)] ${bnSizeCls}`}>{line.bn}</p>}
              {mode === "lines" && (
                <button type="button" aria-label={`Listen to Bengali of sentence ${i + 1}`} onClick={() => speak(line.bn, settings, { lang: "bn-BD" })} className="bn ml-8 mt-1 inline-flex items-center gap-1 text-xs text-[var(--accent)]"><Fi n="volume" /> বাংলা শুনুন</button>
              )}
            </div>
          ))}
        </div>
      )}

      {mode === "blank" && blankTarget && (
        <p className="bn mt-3 rounded-xl bg-[var(--surface2)] p-3 text-sm text-[var(--text)]">
          শূন্যস্থানের উত্তর: প্রথম তিনটি বাক্যে লুকানো শব্দটি হলো "{blankTarget.en}" — অর্থ {blankTarget.bn}।
        </p>
      )}

      {lookup && (
        <div className="mt-3 rounded-2xl border-2 border-[var(--accent)] bg-[var(--surface)] p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-lg font-bold text-[var(--text)]">{lookup.en} {lookup.ipa && <span className="text-sm font-normal text-[var(--dim)]">{lookup.ipa}</span>}</p>
              <p className="text-xs uppercase tracking-wide text-[var(--accent)]">{lookup.pos}</p>
              <p className="bn mt-1 font-semibold text-[var(--text)]">{lookup.bn}</p>
              <p className="mt-1 text-sm text-[var(--dim)]">{lookup.exEn}</p>
              {lookup.synonyms.length > 0 && <p className="mt-1 text-sm text-[var(--text)]">Synonyms: {lookup.synonyms.map((s) => `${s.en} (${s.bn})`).join(", ")}</p>}
              {lookup.antonyms.length > 0 ? (
                <p className="text-sm text-[var(--text)]">Antonyms: {lookup.antonyms.map((s) => `${s.en} (${s.bn})`).join(", ")}</p>
              ) : (
                <p className="text-sm italic text-[var(--dim)]">No natural antonym for this meaning.</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <SpeakBtn text={lookup.en} settings={settings} />
              <Btn variant="ghost" ariaLabel="Close word details" onClick={() => setLookup(null)}><Fi n="cross" /></Btn>
            </div>
          </div>
        </div>
      )}

      <SectionTitle>Story vocabulary · গল্পের শব্দ</SectionTitle>
      <div className="flex flex-wrap gap-1.5">
        {lesson.entries.map((e) => (
          <button key={e.key} type="button" aria-label={`Story vocabulary: ${e.en}`} onClick={() => setLookup(e)} className="rounded-full bg-[var(--surface2)] px-2.5 py-1 text-sm text-[var(--text)]">
            {e.en} <span className="bn text-[var(--dim)]">· {e.bn}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- listening & speaking tabs ----------
function ListeningTab({ lesson, settings }: { lesson: Lesson; settings: Settings }) {
  const qs: MCQ[] = lesson.entries.slice(0, 6).map((e, i) => {
    const o = optionsFor(lesson.entries, e, (x) => x.bn, i + 51);
    return { prompt: <span className="inline-flex items-center gap-1.5"><Fi n="headphones" /> Listen, then choose</span>, speakText: e.exEn, options: o.options, answer: o.answer, explain: `The sentence was: "${e.exEn}" — ${e.exBn}` };
  });
  const [rate, setRate] = useState(settings.speechRate);
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-[var(--text)]">Speed:</span>
        {([["Slow", 0.65], ["Normal", 0.95], ["Fast", 1.25]] as const).map(([label, r]) => (
          <button key={label} type="button" aria-label={`Listening speed ${label}`} onClick={() => setRate(r)} className={`rounded-full px-3 py-1.5 text-sm font-medium ${rate === r ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}>
            {label}
          </button>
        ))}
        <span className="bn text-sm text-[var(--dim)]">গতি বেছে নিয়ে বাক্য শুনুন</span>
      </div>
      <MCQGame
        title="Listening Practice"
        instructionsBn="বাক্যটি মন দিয়ে শুনুন, তারপর সঠিক বাংলা অনুবাদ বেছে নিন। স্পিকার বোতামে চাপ দিয়ে আবার শুনতে পারেন। এটি আপনার ডিভাইসের ব্রাউজার-তৈরি কণ্ঠ — পেশাদার রেকর্ডিং নয়।"
        questions={qs.map((q) => ({ ...q, speakText: q.speakText }))}
        kind="listening"
        lessonN={lesson.n}
        settings={{ ...settings, speechRate: rate }}
      />
    </div>
  );
}

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

function SpeakingTab({ lesson, settings }: { lesson: Lesson; settings: Settings }) {
  const qc = useQueryClient();
  const targets = useMemo(() => lesson.entries.flatMap((e) => [e.en, e.exEn]).slice(0, 8), [lesson]);
  const [ti, setTi] = useState(0);
  const target = targets[ti] ?? "";
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const record = useMutation({
    mutationFn: async (ok: boolean) => await api.recordAttempt({ lessonNumber: lesson.n, kind: "speaking", total: 1, correct: ok ? 1 : 0 }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
  const tWords = norm(target);
  const hWords = norm(heard);
  const similarity = tWords.length ? Math.round((tWords.filter((w) => hWords.includes(w)).length / tWords.length) * 100) : 0;
  const startListening = () => {
    const Ctor = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition
      ?? (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = settings.accent;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setError("");
    setListening(true);
    rec.onresult = (ev) => {
      const text = ev.results[0][0].transcript;
      setHeard(text);
      const tw = norm(target);
      const hw = norm(text);
      const sim = tw.length ? tw.filter((w) => hw.includes(w)).length / tw.length : 0;
      record.mutate(sim >= 0.7);
    };
    rec.onerror = () => { setError("Microphone could not be used. Check permission and try again."); setListening(false); };
    rec.onend = () => setListening(false);
    rec.start();
  };
  return (
    <div>
      <p className="bn text-sm text-[var(--dim)]">মডেল বাক্যটি শুনুন, তারপর নিজে বলুন। নিচে আপনার বলা লেখা ও মিলের হার দেখানো হবে — এটি শুধু লেখার মিল, উচ্চারণের আনুষ্ঠানিক স্কোর নয়।</p>
      <div className="mt-3 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
        <p className="text-sm text-[var(--dim)]">Sentence {ti + 1} / {targets.length}</p>
        <p className="mt-1 flex items-center gap-2 text-xl font-bold text-[var(--text)]">
          {target} <SpeakBtn text={target} settings={settings} label={`Listen to model sentence: ${target}`} />
        </p>
        {supported ? (
          <div className="mt-3">
            <Btn variant="primary" ariaLabel={listening ? "Listening, speak now" : "Start speaking practice"} disabled={listening} onClick={startListening}>
              <Fi n="microphone" /> {listening ? "Listening… speak now" : "Tap and speak"}
            </Btn>
            {error && <p className="mt-2 text-sm text-[var(--rose)]">{error}</p>}
            {heard && (
              <div className="mt-3 rounded-xl bg-[var(--surface2)] p-3">
                <p className="text-sm text-[var(--text)]">You said: <span className="font-semibold">"{heard}"</span></p>
                <p className="mt-1 text-sm text-[var(--text)]">
                  Word match: <span className="font-bold">{similarity}%</span>{" "}
                  {tWords.map((w, i) => (
                    <span key={i} className={hWords.includes(w) ? "text-[var(--accent)] font-semibold" : "text-[var(--rose)] font-semibold"}>{w} </span>
                  ))}
                </p>
                <p className="bn mt-1 text-xs text-[var(--dim)]">সবুজ = মিলেছে, লাল = মেলেনি বা বাদ গেছে। আবার চেষ্টা করতে মাইক বোতাম চাপুন।</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-3 rounded-xl bg-[var(--surface2)] p-3">
            <p className="bn text-sm text-[var(--text)]"><Fi n="triangle-warning" /> এই ব্রাউজারে স্পিচ রিকগনিশন সমর্থিত নয়। ম্যানুয়াল অনুশীলন করুন: মডেল বাক্যটি শুনে জোরে জোরে নিজে বলুন, তারপর নিজে মিলিয়ে দেখুন।</p>
            <Btn className="mt-2" ariaLabel="Mark read-aloud practice done" onClick={() => record.mutate(true)}><Fi n="check" /> I practised aloud</Btn>
          </div>
        )}
        <div className="mt-3 flex gap-2">
          <Btn ariaLabel="Previous speaking sentence" onClick={() => { setTi(Math.max(0, ti - 1)); setHeard(""); }}>← Prev</Btn>
          <Btn ariaLabel="Next speaking sentence" onClick={() => { setTi(Math.min(targets.length - 1, ti + 1)); setHeard(""); }}>Next →</Btn>
        </div>
      </div>
    </div>
  );
}

// ---------- final assessment ----------
function QuizTab({ lesson, onComplete }: { lesson: Lesson; onComplete: (pct: number) => void }) {
  const qc = useQueryClient();
  const questions = useMemo<MCQ[]>(() => {
    const qs: MCQ[] = [];
    lesson.entries.slice(0, 4).forEach((e, i) => {
      const o = optionsFor(lesson.entries, e, (x) => x.bn, i + 61);
      qs.push({ prompt: <span>What does "{e.en}" mean?</span>, options: o.options, answer: o.answer, explain: `"${e.en}" = ${e.bn}. Example: ${e.exEn}` });
    });
    lesson.entries.slice(4, 6).forEach((e, i) => {
      const o = optionsFor(lesson.entries, e, (x) => x.en, i + 71);
      qs.push({ prompt: <span className="bn">"{e.bn}" — এর ইংরেজি কী?</span>, options: o.options, answer: o.answer, explain: `${e.bn} = "${e.en}".` });
    });
    lesson.entries.filter((e) => e.type === "word" && e.exEn.toLowerCase().includes(e.en.toLowerCase())).slice(0, 2).forEach((e, i) => {
      const blanked = e.exEn.replace(new RegExp(e.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____");
      const o = optionsFor(lesson.entries, e, (x) => x.en, i + 81);
      qs.push({ prompt: <span>Fill the blank: {blanked}</span>, options: o.options, answer: o.answer, explain: `Full sentence: ${e.exEn} (${e.exBn})` });
    });
    lesson.story.questions.slice(0, 2).forEach((q) => {
      qs.push({ prompt: <span>{q.qEn}</span>, options: q.options, answer: q.answer, explain: q.qBn });
    });
    return qs;
  }, [lesson]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) => await api.recordAttempt({ lessonNumber: lesson.n, kind: "quiz", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const q = questions[qi];
  if (finished || !q) {
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-5 text-center">
        <p className="text-4xl">{pct >= 70 ? <Fi n="trophy" /> : <Fi n="book-open-reader" />}</p>
        <h3 className="mt-2 text-xl font-bold text-[var(--text)]">Assessment result: {pct}%</h3>
        <p className="bn mt-1 text-sm text-[var(--dim)]">
          {pct >= 70 ? "অভিনন্দন! আপনি এই পাঠ সম্পন্ন করেছেন।" : "৭০% পেলে পাঠ সম্পন্ন হবে। শব্দগুলো আবার পড়ে চেষ্টা করুন।"} ({score}/{questions.length} correct)
        </p>
        <Btn className="mt-3" variant="primary" ariaLabel="Retry the lesson assessment" onClick={() => { setQi(0); setScore(0); setPicked(null); setFinished(false); }}><Fi n="rotate-right" /> Retry assessment</Btn>
      </div>
    );
  }
  return (
    <div>
      <p className="bn text-sm text-[var(--dim)]">চূড়ান্ত মূল্যায়ন: {questions.length}টি প্রশ্ন। ৭০% বা তার বেশি পেলে পাঠটি "সম্পন্ন" হবে।</p>
      <p className="mt-2 text-xs text-[var(--dim)]">Question {qi + 1} / {questions.length} · Score {score}</p>
      <div className="mt-2 text-lg font-semibold text-[var(--text)]">{q.prompt}</div>
      <div className="mt-3 grid gap-2">
        {q.options.map((opt, i) => (
          <button
            key={`${opt}-${i}`}
            type="button"
            aria-label={`Assessment answer: ${opt}`}
            disabled={picked != null}
            onClick={() => { setPicked(i); if (i === q.answer) setScore((s) => s + 1); }}
            className={`rounded-xl border px-4 py-3 text-left ${picked != null && i === q.answer ? "border-[var(--accent)] bg-[var(--accent-soft)]" : picked === i ? "border-[var(--rose)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"}`}
          >
            <span className="bn">{opt}</span>
          </button>
        ))}
      </div>
      {picked != null && (
        <div className="mt-3">
          <p className={`text-sm font-medium ${picked === q.answer ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
            {picked === q.answer ? <><Fi n="check" /> Correct!</> : <><Fi n="cross" /> Incorrect.</>} <span className="text-[var(--text)]">{q.explain}</span>
          </p>
          <Btn
            className="mt-2"
            variant="primary"
            ariaLabel="Next assessment question"
            onClick={() => {
              if (qi + 1 >= questions.length) {
                setFinished(true);
                record.mutate({ total: questions.length, correct: score });
                onComplete(Math.round((score / questions.length) * 100));
              } else { setQi(qi + 1); setPicked(null); }
            }}
          >
            {qi + 1 >= questions.length ? "Finish" : "Next →"}
          </Btn>
        </div>
      )}
    </div>
  );
}

// ---------- lesson view ----------
const TABS: [string, string][] = [
  ["overview", "Overview"],
  ["vocab", "Vocabulary"],
  ["phrases", "Phrases & Sentences"],
  ["relations", "Synonyms & Antonyms"],
  ["wordstories", "Word Stories"],
  ["story", "Lesson Story"],
  ["flashcards", "Flashcards"],
  ["listening", "Listening"],
  ["speaking", "Speaking"],
  ["games", "Games & Quizzes"],
  ["assess", "Review & Assessment"],
];

// ---------- lesson progress marking ----------
// The learner's own "how far have I read this lesson" mark: one of the
// same four statuses as the Lessons filter, plus a percentage. Saved
// exactly as marked through markLessonProgress (setLessonCompletion is
// kept for quiz results, where a lower retake must not erase progress).
const MARK_STATUSES = ["not_started", "in_progress", "completed", "revision_needed"] as const;
type LessonStatus = (typeof MARK_STATUSES)[number];

function completionForStatus(status: LessonStatus, current: number): number {
  if (status === "not_started") return 0;
  if (status === "completed") return 100;
  // In progress / revision keep the marked percentage when it is a real
  // partial value; otherwise land on a sensible middle value.
  return current > 0 && current < 100 ? current : status === "in_progress" ? 50 : 60;
}

function statusForCompletion(pct: number, current: LessonStatus): LessonStatus {
  if (pct <= 0) return "not_started";
  if (pct >= 100) return "completed";
  return current === "revision_needed" ? "revision_needed" : "in_progress";
}

function LessonProgressMark({ lessonNumber, completion, status, compact = false }: {
  lessonNumber: number;
  completion: number;
  status: string;
  compact?: boolean;
}) {
  const qc = useQueryClient();
  const savedStatus: LessonStatus = (MARK_STATUSES as readonly string[]).includes(status)
    ? (status as LessonStatus)
    : "not_started";
  const [pct, setPct] = useState(completion);
  const [st, setSt] = useState<LessonStatus>(savedStatus);
  const [saveError, setSaveError] = useState(false);
  const slidingRef = useRef(false);
  const commitTimer = useRef<number | null>(null);

  // Follow the saved values when they change (after a save round-trip or
  // a quiz result), unless the learner is in the middle of a drag.
  useEffect(() => {
    if (!slidingRef.current) {
      setPct(completion);
      setSt(savedStatus);
    }
  }, [completion, savedStatus]);
  useEffect(() => () => {
    if (commitTimer.current) window.clearTimeout(commitTimer.current);
  }, []);

  const mark = useMutation({
    mutationFn: async (v: { completion: number; status: LessonStatus }) =>
      await api.markLessonProgress({ lessonNumber, completion: v.completion, status: v.status }),
    onSuccess: () => {
      setSaveError(false);
      qc.invalidateQueries({ queryKey: ["state"] });
    },
    onError: () => setSaveError(true),
  });

  const commitSoon = (nextPct: number, nextStatus: LessonStatus) => {
    if (commitTimer.current) window.clearTimeout(commitTimer.current);
    commitTimer.current = window.setTimeout(() => {
      mark.mutate({ completion: nextPct, status: nextStatus });
    }, 350);
  };
  const commitNow = (nextPct: number, nextStatus: LessonStatus) => {
    if (commitTimer.current) window.clearTimeout(commitTimer.current);
    mark.mutate({ completion: nextPct, status: nextStatus });
  };
  const pickStatus = (s: LessonStatus) => {
    const nextPct = completionForStatus(s, pct);
    setSt(s);
    setPct(nextPct);
    commitNow(nextPct, s);
  };
  const slide = (v: number) => {
    slidingRef.current = true;
    const nextStatus = statusForCompletion(v, st);
    setPct(v);
    setSt(nextStatus);
    commitSoon(v, nextStatus);
  };
  const endSlide = () => {
    if (!slidingRef.current) return;
    slidingRef.current = false;
    commitNow(pct, st);
  };

  const fillColor = st === "revision_needed" ? "var(--rose)" : st === "completed" ? "var(--amber)" : "var(--hero)";
  const [statusEn, statusBn] = (STATUS_LABEL[st] ?? "").split(" · ");

  return (
    <div
      className={
        compact
          ? "border-b-2 border-[var(--border)] pb-2.5"
          : "w-full shrink-0 rounded-[1.5rem] border-2 border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-[0_6px_20px_rgba(34,26,5,0.07)] sm:w-[19.5rem]"
      }
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className={`font-extrabold text-[var(--text)] ${compact ? "text-xs" : "text-sm"}`}>
          {compact ? statusEn : "Mark my progress"}
          <span className="bn font-semibold text-[var(--dim)]"> · {compact ? statusBn : "কতটা পড়েছি, চিহ্নিত করুন"}</span>
        </span>
        <span className={`font-display shrink-0 font-semibold text-[var(--text)] ${compact ? "text-base" : "text-2xl"}`} aria-hidden>{pct}%</span>
      </div>
      <div
        className={`overflow-hidden rounded-full bg-[var(--surface2)] ${compact ? "mt-1 h-2" : "mt-2 h-3"}`}
        role="img"
        aria-label={`Lesson ${lessonNumber} reading progress: ${pct} percent, ${statusEn}`}
      >
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: fillColor }} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={pct}
        aria-label={`How much of lesson ${lessonNumber} you have read, in percent`}
        className="themed-range mt-2 w-full"
        style={{ "--fill": `${pct}%` } as CSSProperties}
        onChange={(e) => slide(Number(e.target.value))}
        onPointerUp={endSlide}
        onBlur={endSlide}
      />
      <div className={`grid grid-cols-2 ${compact ? "mt-1.5 gap-1" : "mt-2 gap-1.5"}`} role="group" aria-label={`Mark lesson ${lessonNumber} status`}>
        {MARK_STATUSES.map((s) => {
          const [en, bn] = (STATUS_LABEL[s] ?? "").split(" · ");
          const selected = st === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={selected}
              aria-label={`Mark lesson ${lessonNumber} as ${en}`}
              onClick={() => pickStatus(s)}
              className={`rounded-full font-bold leading-tight ${compact ? "px-2 py-1 text-[11px]" : "px-2.5 py-1.5 text-xs"} ${selected ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
            >
              {en}
              <span className="bn block font-semibold opacity-80">{bn}</span>
            </button>
          );
        })}
      </div>
      {!compact && (
        <div className="mt-2 flex gap-1" role="group" aria-label={`Set lesson ${lessonNumber} percent read`}>
          {[0, 25, 50, 75, 100].map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={pct === v}
              aria-label={`Mark lesson ${lessonNumber} as ${v} percent read`}
              onClick={() => {
                const nextStatus = statusForCompletion(v, st);
                setPct(v);
                setSt(nextStatus);
                commitNow(v, nextStatus);
              }}
              className={`flex-1 rounded-full px-1 py-1 text-[11px] font-extrabold ${pct === v ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
            >
              {v}%
            </button>
          ))}
        </div>
      )}
      {mark.isPending && <p className="mt-1.5 text-[11px] font-semibold text-[var(--dim)]">Saving… · সংরক্ষণ হচ্ছে</p>}
      {saveError && (
        <p className="bn mt-1.5 text-xs font-semibold text-[var(--rose)]">সংরক্ষণ করা যায়নি — আবার চেষ্টা করুন। Could not save your mark — please try again.</p>
      )}
    </div>
  );
}

function LessonView({ n, initialTab, state, settings, go }: {
  n: number; initialTab?: string; state: State; settings: Settings;
  go: (v: View) => void;
}) {
  const lesson = getLesson(n);
  const qc = useQueryClient();
  const [tab, setTab] = useState(initialTab ?? "overview");
  // Bengali visibility follows the saved Settings preference (the old
  // per-lesson বাংলা checkbox above the section tabs was removed).
  const [showBn] = useState(settings.showBengali);
  const [storyEntry, setStoryEntry] = useState<VocabEntry | null>(null);
  const [celebratePct, setCelebratePct] = useState<number | null>(null);
  // Which game the Games tab should open on (e.g. "quick" when the learner
  // taps a Quick Practice button elsewhere in the lesson).
  const [gamesStart, setGamesStart] = useState<string | undefined>(undefined);
  const progress = state.progress.find((p) => p.lessonNumber === n);
  const touchedRef = useRef(false);
  // Lesson-section strip: no visible scrollbar — the learner moves it with
  // the Backward / Forward arrow buttons instead.
  const tabStripRef = useRef<HTMLDivElement>(null);
  const [tabCanBack, setTabCanBack] = useState(false);
  const [tabCanFwd, setTabCanFwd] = useState(false);
  const syncTabArrows = () => {
    const el = tabStripRef.current;
    if (!el) return;
    setTabCanBack(el.scrollLeft > 4);
    setTabCanFwd(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  const scrollTabs = (dir: 1 | -1) => {
    tabStripRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };
  useEffect(() => {
    syncTabArrows();
    window.addEventListener("resize", syncTabArrows);
    return () => window.removeEventListener("resize", syncTabArrows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);
  const touch = useMutation({
    mutationFn: async () => await api.touchLesson({ lessonNumber: n, minutes: 2 }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const complete = useMutation({
    mutationFn: async (pct: number) =>
      await api.setLessonCompletion({
        lessonNumber: n,
        completion: pct >= 70 ? 100 : 60,
        status: pct >= 70 ? "completed" : "revision_needed",
        bestQuiz: pct,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  useEffect(() => {
    if (!touchedRef.current) { touchedRef.current = true; touch.mutate(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);
  useEffect(() => { setTab(initialTab ?? "overview"); }, [n, initialTab]);

  const words = lesson.entries.filter((e) => e.type === "word");
  const phrases = lesson.entries.filter((e) => e.type !== "word");
  const lessonWordStates = state.words.filter((w) => w.lessonNumber === n);
  const mastered = lessonWordStates.filter((w) => w.mastery === "mastered" || w.known).length;
  const masteryPct = lesson.entries.length ? Math.round((mastered / lesson.entries.length) * 100) : 0;

  return (
    <div>
      <button type="button" aria-label="Back to all lessons" onClick={() => go({ name: "lessons" })} className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#221a05] shadow-[0_3px_10px_rgba(34,26,5,0.15)]">← All lessons · সব পাঠ</button>
      <div className="mt-3 rounded-[2rem] bg-[var(--sheet)] p-5 shadow-[0_14px_34px_rgba(34,26,5,0.14)]">
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-[var(--surface2)] text-4xl" aria-hidden><Fi n={lesson.icon} /></span>
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--dim)]">Lesson {lesson.n} of 125 · {lesson.cat}</p>
              <h1 className="font-display mt-0.5 text-[26px] leading-tight font-semibold text-[var(--text)]">{lesson.en}</h1>
              <p className="bn text-lg font-medium text-[var(--dim)]">{lesson.bn}</p>
            </div>
            <img src={pupMascot} alt="" className="ml-auto hidden h-16 w-16 shrink-0 rounded-full border-[3px] border-white object-cover shadow lg:block" width={200} height={200} />
          </div>
          <LessonProgressMark lessonNumber={n} completion={progress?.completion ?? 0} status={progress?.status ?? "not_started"} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 text-sm font-bold text-[var(--text)]">
          <span className="rounded-full bg-[var(--surface2)] px-3 py-1"><Fi n="book" /> {lesson.entries.length} entries</span>
          <span className="rounded-full bg-[var(--surface2)] px-3 py-1"><Fi n="clock" /> ~{lesson.minutes} min</span>
          <span className="rounded-full bg-[var(--surface2)] px-3 py-1"><Fi n="target" /> Mastery {masteryPct}%</span>
          {progress?.bestQuiz != null && <span className="rounded-full bg-[var(--surface2)] px-3 py-1"><Fi n="trophy" /> Best quiz {progress.bestQuiz}%</span>}
        </div>
      </div>
      <p className="bn mt-3 rounded-2xl bg-[var(--sheet)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] shadow-[0_4px_14px_rgba(34,26,5,0.08)]">
        <Fi n="sparkles" /> {(MOTIVATIONS[n % MOTIVATIONS.length] ?? MOTIVATIONS[0])?.bn}
      </p>
      <div className="mt-3 flex gap-2">
        {n > 1 && <Btn ariaLabel={`Previous lesson ${n - 1}`} onClick={() => go({ name: "lesson", n: n - 1 })}>← Lesson {n - 1}</Btn>}
        {n < 125 && <Btn variant="primary" ariaLabel={`Next lesson ${n + 1}`} onClick={() => go({ name: "lesson", n: n + 1 })}>Lesson {n + 1} →</Btn>}
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Backward — scroll lesson sections back"
          disabled={!tabCanBack}
          onClick={() => scrollTabs(-1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface2)] text-lg font-extrabold text-[var(--text)] transition disabled:opacity-35"
        >
          ‹
        </button>
        <div ref={tabStripRef} onScroll={syncTabArrows} className="no-scrollbar -my-2.5 flex min-w-0 flex-1 gap-1.5 overflow-x-auto py-2.5" role="tablist" aria-label="Lesson sections">
          {TABS.map(([t, label]) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              aria-label={`Lesson section: ${label}`}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${tab === t ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Forward — scroll lesson sections forward"
          disabled={!tabCanFwd}
          onClick={() => scrollTabs(1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface2)] text-lg font-extrabold text-[var(--text)] transition disabled:opacity-35"
        >
          ›
        </button>
      </div>

      <div className="mt-4">
        {tab === "overview" && (
          <div>
            <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
              <h2 className="font-bold text-[var(--text)]">About this lesson · এই পাঠ সম্পর্কে</h2>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">
                In this lesson you will learn {lesson.entries.length} English words, phrases and sentences about "{lesson.en}" ({lesson.bn}), each with a Bengali meaning, an example, and its own mini-story. You will then read a full bilingual story, practise with flashcards and games, and finish with an assessment.
              </p>
              <h3 className="mt-3 font-semibold text-[var(--text)]">Learning objectives · শেখার লক্ষ্য</h3>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-[var(--text)]">
                {lesson.objectives.map((o) => <li key={o}>{o}</li>)}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn variant="primary" ariaLabel="Start learning vocabulary" onClick={() => setTab("vocab")}><Fi n="play" /> {progress ? "Resume" : "Start"} lesson</Btn>
                <Btn ariaLabel="Open lesson story" onClick={() => setTab("story")}><Fi n="book-open-cover" /> Read the story</Btn>
                <Btn ariaLabel="Open flashcards" onClick={() => setTab("flashcards")}><Fi n="copy" /> Flashcards</Btn>
                <Btn ariaLabel="Start quick practice for this lesson" onClick={() => { setGamesStart("quick"); setTab("games"); }}><Fi n="list-check" /> Quick Practice</Btn>
                <Btn ariaLabel="Open all lesson games" onClick={() => { setGamesStart(undefined); setTab("games"); }}><Fi n="puzzle" /> All games</Btn>
              </div>
            </div>
            <SectionTitle>Words in this lesson · এই পাঠের শব্দ</SectionTitle>
            <div className="grid gap-2">
              {lesson.entries.map((e) => (
                <button key={e.key} type="button" aria-label={`Preview word ${e.en}`} onClick={() => setTab("vocab")} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left">
                  <span className="min-w-0 flex-1 font-semibold break-words text-[var(--text)]">{e.en}</span>
                  <span className="bn shrink-0 text-sm text-[var(--dim)]">{e.bn}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {(tab === "vocab" || tab === "phrases") && (
          <div className="grid items-start gap-3 xl:grid-cols-2">
            {(tab === "vocab" ? words : phrases).length === 0 && (
              <p className="bn text-sm text-[var(--dim)]">{tab === "vocab" ? "এই পাঠে সব আইটেম বাক্য/বাক্যাংশ — Phrases ট্যাবে দেখুন।" : "এই পাঠে আলাদা বাক্যাংশ নেই — Vocabulary ট্যাবে শব্দগুলো দেখুন।"}</p>
            )}
            {(tab === "vocab" ? words : phrases).map((e) => (
              <EntryCard key={e.key} entry={e} lesson={lesson} state={state} settings={settings} showBn={showBn} onOpenStory={(en) => { setStoryEntry(en); setTab("wordstories"); }} />
            ))}
          </div>
        )}

        {tab === "relations" && (
          <div className="grid items-start gap-3 xl:grid-cols-2">
            <p className="bn text-sm text-[var(--dim)]">প্রতিটি সমার্থক ও বিপরীত শব্দের নিজস্ব বাংলা অর্থ দেওয়া আছে। প্রতিটি শব্দের পাশে Story বোতাম চাপ দিলে সেই শব্দের ছোট্ট গল্প খুলবে — ইংরেজি গল্পের প্রতিটি লাইনের বাংলা অর্থসহ, এবং ▶ Listen চাপ দিলে গল্পটি শুনতে পারবেন। যেসব শব্দের স্বাভাবিক বিপরীত শব্দ নেই, সেখানে তা স্পষ্টভাবে বলা হয়েছে — জোর করে বিপরীত শব্দ বানানো হয়নি।</p>
            {lesson.entries.map((e) => (
              <div key={e.key} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
                <p className="flex items-center gap-2 font-bold text-[var(--text)]">{e.en} <SpeakBtn text={e.en} settings={settings} label={`Listen: ${e.en}`} /></p>
                <p className="bn text-sm text-[var(--dim)]">{e.bn}</p>
                <div className="mt-1">
                  {[...e.synonyms, ...e.alternatives].length > 0 ? (
                    <RelGroup
                      title={e.alternatives.length > 0 && e.synonyms.length === 0 ? "Alternative expressions · বিকল্পভাবে বলা" : "Synonyms · সমার্থক শব্দ"}
                      rels={[...e.synonyms, ...e.alternatives]}
                      settings={settings}
                      showBn={showBn}
                    />
                  ) : (
                    <p className="mt-2 text-sm italic text-[var(--dim)]">No close synonym listed for this entry.</p>
                  )}
                  {e.antonyms.length > 0 ? (
                    <RelGroup title="Antonyms · বিপরীত শব্দ" rels={e.antonyms} settings={settings} showBn={showBn} />
                  ) : (
                    <div className="mt-2">
                      <p className="text-xs font-bold uppercase text-[var(--dim)]">Antonyms · বিপরীত শব্দ</p>
                      <p className="mt-1 text-sm italic text-[var(--dim)]">{e.noAntonymNote ?? "No natural antonym for this meaning."}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "wordstories" && (
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-1.5">
              {lesson.entries.map((e) => (
                <button key={e.key} type="button" aria-label={`Micro-story for ${e.en}`} onClick={() => setStoryEntry(e)} className={`rounded-full px-3 py-1.5 text-sm font-medium ${(storyEntry ?? lesson.entries[0])?.key === e.key ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}>
                  {e.en}
                </button>
              ))}
            </div>
            {(() => {
              const e = storyEntry ?? lesson.entries[0];
              if (!e) return null;
              return (
                <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-[var(--text)]">{e.micro.titleEn}</h3>
                      <p className="bn text-sm text-[var(--dim)]">{e.micro.titleBn} · শব্দ: {e.en} ({e.bn})</p>
                    </div>
                    <Btn ariaLabel="Play the whole micro-story" onClick={() => speakAll(e.micro.lines.map((l) => l.en), settings)}><Fi n="play" /> Listen to story</Btn>
                  </div>
                  <div className="mt-3 space-y-2">
                    {e.micro.lines.map((line, i) => (
                      <div key={i} className="rounded-xl bg-[var(--surface2)] p-3">
                        <p className="flex items-start gap-2 text-[var(--text)]">
                          <button type="button" aria-label={`Listen to micro-story sentence ${i + 1}`} onClick={() => speak(line.en, settings)}><Fi n="volume" /></button>
                          <span>{highlight(line.en, e.en)}</span>
                        </p>
                        {showBn && <p className="bn mt-1 pl-7 text-sm text-[var(--dim)]">{line.bn}</p>}
                      </div>
                    ))}
                  </div>
                  <p className="bn mt-3 text-sm text-[var(--dim)]">বোঝার প্রশ্ন: গল্পে "{e.en}" শব্দটি কোন অর্থে ব্যবহৃত হয়েছে? উত্তর: {e.bn}।</p>
                </div>
              );
            })()}
          </div>
        )}

        {tab === "story" && <StoryReader lesson={lesson} settings={settings} showBnDefault={showBn} />}
        {tab === "flashcards" && <Flashcards key={`fc-${lesson.n}`} lesson={lesson} settings={settings} state={state} />}
        {tab === "listening" && <ListeningTab lesson={lesson} settings={settings} />}
        {tab === "speaking" && <SpeakingTab lesson={lesson} settings={settings} />}
        {tab === "games" && <Games lesson={lesson} settings={settings} state={state} startGame={gamesStart} />}
        {tab === "assess" && (
          <div className="grid gap-4">
            <QuizTab key={`q-${lesson.n}`} lesson={lesson} onComplete={(pct) => { complete.mutate(pct); setCelebratePct(pct); }} />
            <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
              <h3 className="font-bold text-[var(--text)]">Review status · পুনরালোচনা</h3>
              <p className="mt-1 text-sm text-[var(--dim)]">
                Words touched in this lesson: {lessonWordStates.length} · Mastered: {mastered} · Difficult: {lessonWordStates.filter((w) => w.difficult).length}
              </p>
              <p className="bn mt-1 text-sm text-[var(--dim)]">ফ্ল্যাশকার্ডে গ্রেড দিলে প্রতিটি শব্দের পরবর্তী রিভিউ তারিখ স্বয়ংক্রিয়ভাবে ঠিক হয়ে যায় (সরলীকৃত SM-2 পদ্ধতি)।</p>
              <Btn className="mt-2" ariaLabel="Open the review queue" onClick={() => go({ name: "review" })}>Go to Review →</Btn>
            </div>
          </div>
        )}
      </div>
      {celebratePct != null && (
        <Celebration n={n} pct={celebratePct} state={state} go={go} onClose={() => setCelebratePct(null)} />
      )}
    </div>
  );
}

// ---------- focus timer ----------
// A real countdown behind the Home daily-goal clock. The state lives in
// App (not in Home) so once started it keeps counting while the learner
// moves around the rest of the app; the floating dock at the top right
// shows it on every screen. When the countdown finishes, the studied
// minutes are logged for today through the finish callback.
type FocusTimerState = {
  status: "idle" | "running" | "paused" | "done";
  totalSec: number;
  remainingSec: number;
};

function fmtClock(totalSec: number): string {
  const s = Math.max(0, Math.ceil(totalSec));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function useFocusTimer(onFinish: (minutes: number) => void) {
  const [timer, setTimer] = useState<FocusTimerState>({ status: "idle", totalSec: 0, remainingSec: 0 });
  const endAtRef = useRef(0);
  const finishRef = useRef(onFinish);
  const loggedRef = useRef(false);
  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    if (timer.status !== "running") return;
    const tick = () => {
      const left = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000));
      if (left <= 0) {
        setTimer((t) => (t.status === "running" ? { ...t, status: "done", remainingSec: 0 } : t));
        if (!loggedRef.current) {
          loggedRef.current = true;
          finishRef.current(Math.max(1, Math.round(timer.totalSec / 60)));
        }
      } else {
        setTimer((t) => (t.status === "running" ? { ...t, remainingSec: left } : t));
      }
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [timer.status, timer.totalSec]);

  const start = (minutes: number) => {
    const total = Math.max(1, Math.round(minutes)) * 60;
    loggedRef.current = false;
    endAtRef.current = Date.now() + total * 1000;
    setTimer({ status: "running", totalSec: total, remainingSec: total });
  };
  const pause = () => setTimer((t) => (t.status === "running" ? { ...t, status: "paused" } : t));
  const resume = () => {
    endAtRef.current = Date.now() + timer.remainingSec * 1000;
    setTimer((t) => (t.status === "paused" ? { ...t, status: "running" } : t));
  };
  const stop = () => setTimer({ status: "idle", totalSec: 0, remainingSec: 0 });
  return { timer, start, pause, resume, stop };
}

// The portable mini-timer: docks at the top right of the screen and
// floats above the page while the rest of the app stays normal and
// usable underneath. Pip the puppy wiggles like a little GIF while the
// timer runs (and happy-dances when it finishes), with a speech bubble
// cheering the learner on.
function FloatingTimer({ timer, onPause, onResume, onStop }: { timer: FocusTimerState; onPause: () => void; onResume: () => void; onStop: () => void }) {
  if (timer.status === "idle") return null;
  const done = timer.status === "done";
  const paused = timer.status === "paused";
  const elapsed = timer.totalSec - timer.remainingSec;
  const pct = timer.totalSec > 0 ? Math.min(100, Math.round((elapsed / timer.totalSec) * 100)) : 0;
  const minsLeft = Math.floor(timer.remainingSec / 60);
  const secsLeft = timer.remainingSec % 60;
  const bubbleText = done ? "You did it!" : paused ? "I'm waiting…" : pct >= 75 ? "Almost there!" : pct >= 40 ? "Great focus!" : "Keep going!";
  const bubbleBn = done ? "লক্ষ্য পূরণ হয়েছে!" : paused ? "বিরতি চলছে" : "তুমি পারবে!";
  return (
    <div
      className="dock-in fixed top-[4.25rem] right-3 z-40 w-[228px] max-w-[calc(100vw-1.5rem)] rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--sheet)] p-3 shadow-[0_18px_44px_rgba(34,26,5,0.30)] md:top-5 md:right-5"
      role="timer"
      aria-label={done ? "Focus timer finished — well done" : `Focus timer: ${minsLeft} minutes ${secsLeft} seconds remaining${paused ? ", paused" : ""}`}
    >
      <div className="flex items-start gap-2.5">
        <div className={`h-14 w-14 shrink-0 overflow-hidden rounded-full border-[3px] border-[var(--hero)] shadow ${done ? "pip-celebrate" : paused ? "" : "pip-wiggle"}`}>
          <img src={pupMascot} alt="Pip the puppy, smiling" className="h-full w-full object-cover" width={800} height={800} />
        </div>
        <div className="min-w-0 flex-1">
          <div key={bubbleText} className="bubble-pop rounded-2xl bg-[var(--surface2)] px-2.5 py-1.5">
            <p className="font-display text-[13px] leading-tight font-semibold text-[var(--text)]">{bubbleText}</p>
            <p className="bn text-[11px] leading-tight font-medium text-[var(--dim)]">{bubbleBn}</p>
          </div>
          <p className="font-display mt-1.5 text-[26px] leading-none font-semibold tracking-tight text-[var(--text)]">{done ? "00:00" : fmtClock(timer.remainingSec)}</p>
        </div>
      </div>
      <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-label="Focus timer progress" aria-valuenow={done ? 100 : pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-[var(--hero)] transition-all duration-500" style={{ width: `${done ? 100 : pct}%` }} />
      </div>
      <p className="bn mt-1.5 text-center text-[11px] font-semibold text-[var(--dim)]">{done ? "আজকের ফোকাস শেষ — দারুণ কাজ!" : paused ? "টাইমার থেমে আছে" : "ফোকাস চলছে · পড়ায় মন দিন"}</p>
      <div className="mt-2 flex justify-center gap-2">
        {done ? (
          <Btn variant="primary" ariaLabel="Close the finished focus timer" onClick={onStop} className="px-5"><Fi n="check" /> Done</Btn>
        ) : (
          <>
            {paused ? (
              <Btn variant="primary" ariaLabel="Resume focus timer" onClick={onResume}><Fi n="play" /> Resume</Btn>
            ) : (
              <Btn variant="primary" ariaLabel="Pause focus timer" onClick={onPause}>
                <span aria-hidden className="flex gap-[3px]"><span className="block h-3.5 w-[4px] rounded-full bg-current" /><span className="block h-3.5 w-[4px] rounded-full bg-current" /></span>
                Pause
              </Btn>
            )}
            <Btn ariaLabel="Stop focus timer" onClick={onStop}><Fi n="stop" /> Stop</Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- home / dashboard ----------
function Home({ state, settings, go, focus }: { state: State; settings: Settings; go: (v: View) => void; focus: ReturnType<typeof useFocusTimer> }) {
  const completed = state.progress.filter((p) => p.status === "completed").length;
  const started = state.progress.filter((p) => p.status !== "not_started").length;
  const mastered = state.words.filter((w) => w.mastery === "mastered" || w.known).length;
  const studied = state.words.length;
  const now = Date.now();
  const due = state.words.filter((w) => w.nextReviewAt && new Date(w.nextReviewAt).getTime() <= now).length;
  const overdue = state.words.filter((w) => w.difficult).length;
  const today = state.studyDays.find((d) => d.day === dayKey(new Date()));
  // streak: consecutive days up to today with minutes > 0
  const daySet = new Set(state.studyDays.filter((d) => d.minutes > 0).map((d) => d.day));
  let streak = 0;
  const cursor = new Date();
  if (!daySet.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (daySet.has(dayKey(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }
  const lastLesson = [...state.progress].filter((p) => p.lastStudiedAt).sort((a, b) => (b.lastStudiedAt ?? "").localeCompare(a.lastStudiedAt ?? ""))[0];
  const continueN = lastLesson?.lessonNumber ?? 1;
  const recent = [...state.progress].filter((p) => p.lastStudiedAt).sort((a, b) => (b.lastStudiedAt ?? "").localeCompare(a.lastStudiedAt ?? "")).slice(0, 4);
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const row = state.studyDays.find((x) => x.day === dayKey(d));
    return { day: d.toLocaleDateString(undefined, { weekday: "short" }), minutes: row?.minutes ?? 0 };
  });
  const weekMinutes = weekData.reduce((s, d) => s + d.minutes, 0);
  const savedWords = state.words.filter((w) => w.saved).slice(0, 6);
  const ringPct = Math.round((completed / 125) * 100);
  const qc = useQueryClient();
  const saveGoal = useMutation({
    mutationFn: async (mins: number) => await api.saveSettings({ ...settings, dailyGoalMinutes: mins }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const todayMin = today?.minutes ?? 0;
  const goalClock = `${String(settings.dailyGoalMinutes).padStart(2, "0")}:00`;
  const bubble =
    todayMin >= settings.dailyGoalMinutes
      ? "Goal done!"
      : due > 0
        ? `${due} word${due === 1 ? "" : "s"} to review!`
        : "I'm ready!";

  const passedExams = CHECKPOINT_ENDS.filter((end) => (checkpointBest(state, end) ?? 0) >= CHECKPOINT_PASS).length;
  const nextExamEnd = CHECKPOINT_ENDS.find((end) => blockCompleted(state, end) < 5 || (checkpointBest(state, end) ?? 0) < CHECKPOINT_PASS) ?? 125;
  const finalAttempts = state.attempts.filter((a) => a.kind === "final-speaking" && a.total > 0);
  const finalBestBand = finalAttempts.length ? Math.max(...finalAttempts.map((a) => a.correct / 10)) : null;
  const finalUnlockedHome = state.progress.find((p) => p.lessonNumber === 125)?.status === "completed";

  return (
    <div>
      {/* Greeting row: the first thing under the top nav bar — the
          greeting on the left and the reward pills (streak + words
          mastered) on the right of the same row, vertically aligned.
          The row wraps on narrow phones so nothing scrolls sideways. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-1">
        <p className="bn text-base font-semibold text-[var(--text)]">আসসালামু আলাইকুম, Sifat</p>
        <div className="ms-auto flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-[#221a05] shadow-[0_3px_10px_rgba(34,26,5,0.15)]" aria-label={`${streak} day study streak`}><Fi n="flame" solid /> {streak}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-[#221a05] shadow-[0_3px_10px_rgba(34,26,5,0.15)]" aria-label={`${mastered} words mastered`}><Fi n="star" solid /> {mastered}</span>
        </div>
      </div>
      <h1 className="font-display mt-0.5 px-1 text-[28px] leading-tight font-semibold text-[var(--text)]">Ready to learn English today?</h1>
      {/* Mascot hero on the sunny backdrop, FocusPup-style: Pip the puppy
          with a speech bubble, then a white curved sheet holding the big
          daily-goal clock and goal pills. */}
      <section aria-label="Meet Pip, your learning buddy">
        <div className="relative mx-auto mt-4 max-w-[430px]">
          <div className="bubble absolute top-1 right-1 z-10 sm:right-6" role="status">
            <p className="font-display text-base leading-tight font-semibold">{bubble}</p>
            <p className="bn text-xs font-medium text-[#7a6c3f]">চলুন শুরু করি!</p>
          </div>
          <div className="pup-bob mx-auto w-52 overflow-hidden rounded-[2.25rem] border-4 border-white/70 shadow-[0_16px_32px_rgba(34,26,5,0.28)] sm:w-64"><img src={pupMascot} alt="Pip, a cute brown puppy, sitting and smiling" className="block h-auto w-full" width={800} height={800} /></div>
        </div>

        <div className="mt-[-10px] rounded-t-[2.75rem] rounded-b-[2rem] bg-[var(--sheet)] px-5 pt-6 pb-6 shadow-[0_18px_40px_rgba(34,26,5,0.16)]">
          <p className="text-center text-xs font-extrabold tracking-[0.22em] text-[var(--dim)]">TODAY'S FOCUS · আজকের লক্ষ্য</p>
          {focus.timer.status === "idle" ? (
            <button
              type="button"
              aria-label={`Start the ${settings.dailyGoalMinutes} minute focus timer`}
              onClick={() => focus.start(settings.dailyGoalMinutes)}
              className="font-display mx-auto mt-1 block text-center text-[54px] leading-none font-semibold tracking-tight text-[var(--text)] transition active:scale-95 min-[400px]:text-[64px]"
            >
              {goalClock}
            </button>
          ) : (
            <p className="font-display mt-1 text-center text-[54px] leading-none font-semibold tracking-tight text-[var(--text)] min-[400px]:text-[64px]" aria-label={`Daily study goal: ${settings.dailyGoalMinutes} minutes`}>{goalClock}</p>
          )}
          <p className="bn mt-2 text-center text-sm font-medium text-[var(--dim)]">
            আজ পড়া হয়েছে {todayMin} মিনিট · {todayMin >= settings.dailyGoalMinutes ? "লক্ষ্য পূরণ হয়েছে!" : `আর ${settings.dailyGoalMinutes - todayMin} মিনিট বাকি`}
          </p>
          <div
            className="mx-auto mt-3 h-3.5 max-w-sm overflow-hidden rounded-full bg-[var(--surface2)]"
            role="progressbar"
            aria-label="Progress toward today's study goal"
            aria-valuenow={todayMin}
            aria-valuemin={0}
            aria-valuemax={settings.dailyGoalMinutes}
          >
            <div className="h-full rounded-full bg-[var(--hero)] transition-all" style={{ width: `${Math.min(100, Math.round((todayMin / Math.max(settings.dailyGoalMinutes, 1)) * 100))}%` }} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Daily goal length in minutes">
            {([15, 25, 45, 60].includes(settings.dailyGoalMinutes) ? [15, 25, 45, 60] : [...[15, 25, 45, 60], settings.dailyGoalMinutes].sort((a, b) => a - b)).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={settings.dailyGoalMinutes === m}
                aria-label={`Set daily goal to ${m} minutes`}
                onClick={() => saveGoal.mutate(m)}
                className={`rounded-full px-5 py-2.5 text-base font-extrabold transition active:scale-95 ${settings.dailyGoalMinutes === m ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.28)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
              >
                {m} min
              </button>
            ))}
          </div>
          {saveGoal.isError && <p className="mt-2 text-center text-sm font-semibold text-[var(--rose)]">Could not save the goal — try again.</p>}

          {focus.timer.status === "idle" ? (
            <div className="mt-5 text-center">
              <Btn variant="primary" ariaLabel={`Start a ${settings.dailyGoalMinutes} minute focus timer`} onClick={() => focus.start(settings.dailyGoalMinutes)} className="px-7 py-3 text-base">
                <Fi n="play" /> Start focus timer · <span className="bn">টাইমার শুরু করুন</span>
              </Btn>
              <p className="bn mt-2 text-xs font-medium text-[var(--dim)]">শুরু করলে টাইমারটি উপরে ডানদিকে ভেসে উঠবে — অ্যাপের যেকোনো জায়গায় গেলেও চলতে থাকবে।</p>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2" role="status">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface2)] px-3.5 py-2 text-sm font-extrabold text-[var(--text)]">
                <Fi n="clock" /> {focus.timer.status === "done" ? "Focus complete — see Pip, top right!" : focus.timer.status === "paused" ? `Timer paused · ${fmtClock(focus.timer.remainingSec)} left` : `Focusing… ${fmtClock(focus.timer.remainingSec)} left · top right`}
              </span>
              {focus.timer.status === "running" && <Btn ariaLabel="Pause the focus timer" onClick={focus.pause}>Pause</Btn>}
              {focus.timer.status === "paused" && <Btn variant="primary" ariaLabel="Resume the focus timer" onClick={focus.resume}><Fi n="play" /> Resume</Btn>}
              <Btn ariaLabel={focus.timer.status === "done" ? "Close the finished focus timer" : "Stop the focus timer"} onClick={focus.stop}>{focus.timer.status === "done" ? "Done" : "Stop"}</Btn>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4 border-t-2 border-dashed border-[var(--border)] pt-5">
            <div className="relative h-24 w-24 shrink-0" role="img" aria-label={`${completed} of 125 lessons completed`}>
              <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--surface2)" strokeWidth="9" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--hero)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${(ringPct / 100) * 213.6} 213.6`} />
              </svg>
              <span className="font-display absolute inset-0 flex items-center justify-center text-lg font-semibold text-[var(--text)]">{ringPct}%</span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg leading-snug font-semibold text-[var(--text)]">{completed} / 125 Lessons Completed</p>
              <p className="bn mt-0.5 text-sm text-[var(--dim)]">পাঠ {continueN}: {getLesson(continueN).en} — {getLesson(continueN).bn}</p>
              <Btn className="mt-2.5 px-5 py-2.5 text-base" variant="primary" ariaLabel={`Continue learning lesson ${continueN}`} onClick={() => go({ name: "lesson", n: continueN })}>
                <Fi n="play" /> Continue Learning
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-3 lg:grid-cols-5">
        <section aria-label="Today's study goal" className="rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(34,26,5,0.08)] p-5 lg:col-span-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-bold text-[var(--text)]">Today · আজ</h2>
            <span className="inline-flex items-center gap-1 text-sm text-[var(--dim)]"><Fi n="flame" /> {streak} day streak · ধারাবাহিক দিন</span>
          </div>
          <p className="mt-2 text-sm text-[var(--dim)]">
            Daily goal {settings.dailyGoalMinutes} minutes · <span className="bn">আজ পড়া হয়েছে {today?.minutes ?? 0} মিনিট</span>
          </p>
          <div
            className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--surface2)]"
            role="progressbar"
            aria-label="Daily study goal progress"
            aria-valuenow={today?.minutes ?? 0}
            aria-valuemin={0}
            aria-valuemax={settings.dailyGoalMinutes}
          >
            <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${Math.min(100, Math.round(((today?.minutes ?? 0) / Math.max(settings.dailyGoalMinutes, 1)) * 100))}%` }} />
          </div>
          <p className="mt-2 text-sm font-medium text-[var(--text)]">
            {(today?.minutes ?? 0) >= settings.dailyGoalMinutes
              ? <span className="inline-flex items-center gap-1.5"><Fi n="confetti" /> Daily goal reached — well done!</span>
              : `${Math.max(settings.dailyGoalMinutes - (today?.minutes ?? 0), 0)} more minutes to reach today's goal.`}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-[var(--border)] pt-3 text-sm text-[var(--dim)]">
            <span className="inline-flex items-center gap-1"><Fi n="calendar" /> {weekMinutes} min this week</span>
            <span className="inline-flex items-center gap-1"><Fi n="flag" /> {overdue} difficult word{overdue === 1 ? "" : "s"}</span>
            <span className="inline-flex items-center gap-1"><Fi n="check" /> {started} lessons started</span>
            <span className="inline-flex items-center gap-1"><Fi n="book" /> {studied} of {TOTAL_ENTRIES} words studied</span>
          </div>
        </section>

        <section aria-label="Quick practice" className="lg:col-span-2">
          <h2 className="font-bold text-[var(--text)]">Quick practice · দ্রুত অনুশীলন</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" aria-label="Quick practice: review due words" onClick={() => go({ name: "review" })} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3 text-left">
              <Fi n="refresh" className="text-xl" />
              <span className="mt-1 block font-semibold text-[var(--text)]">Review</span>
              <span className="bn block text-xs text-[var(--dim)]">{due}টি শব্দ বাকি</span>
            </button>
            <button type="button" aria-label={`Quick practice: flashcards for lesson ${continueN}`} onClick={() => go({ name: "lesson", n: continueN, tab: "flashcards" })} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3 text-left">
              <Fi n="copy" className="text-xl" />
              <span className="mt-1 block font-semibold text-[var(--text)]">Flashcards</span>
              <span className="bn block text-xs text-[var(--dim)]">পাঠ {continueN}</span>
            </button>
            <button type="button" aria-label={`Quick practice: read the story of lesson ${continueN}`} onClick={() => go({ name: "lesson", n: continueN, tab: "story" })} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3 text-left">
              <Fi n="book-open-cover" className="text-xl" />
              <span className="mt-1 block font-semibold text-[var(--text)]">Read a story</span>
              <span className="bn block text-xs text-[var(--dim)]">পাঠ {continueN}-এর গল্প</span>
            </button>
            <button type="button" aria-label="Quick practice: open the dictionary" onClick={() => go({ name: "dictionary" })} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3 text-left">
              <Fi n="search" className="text-xl" />
              <span className="mt-1 block font-semibold text-[var(--text)]">Dictionary</span>
              <span className="bn block text-xs text-[var(--dim)]">শব্দ খুঁজুন</span>
            </button>
          </div>
        </section>
      </div>

      <section aria-label="Learning progress" className="mt-4 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(34,26,5,0.08)] p-5">
        <h2 className="font-bold text-[var(--text)]">Learning progress · অগ্রগতি</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="flex justify-between text-sm text-[var(--text)]"><span>Lessons completed</span><span className="font-semibold">{completed} / 125</span></p>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${ringPct}%` }} />
            </div>
          </div>
          <div>
            <p className="flex justify-between text-sm text-[var(--text)]"><span>Vocabulary mastered</span><span className="font-semibold">{mastered} / {studied} studied</span></p>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]">
              <div className="h-full rounded-full bg-[var(--amber)]" style={{ width: `${studied ? Math.round((mastered / studied) * 100) : 0}%` }} />
            </div>
            <p className="bn mt-1 text-xs text-[var(--dim)]">ফ্ল্যাশকার্ড ও রিভিউতে ভালো গ্রেড পেলে শব্দ "mastered" হয়।</p>
          </div>
        </div>
      </section>

      {due > 0 && (
        <button type="button" aria-label="Open review queue for due words" onClick={() => go({ name: "review" })} className="mt-4 w-full rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-4 text-left text-[var(--text)]">
          <p className="flex items-center gap-1.5 font-bold"><Fi n="refresh" /> {due} word{due === 1 ? "" : "s"} waiting for review</p>
          <p className="bn text-sm text-[var(--dim)]">সময়মতো রিভিউ দিলে শব্দগুলো দীর্ঘদিন মনে থাকবে। এখনই শুরু করুন →</p>
        </button>
      )}

      <SectionTitle>This week · এই সপ্তাহ</SectionTitle>
      <div className="h-44 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--dim)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--dim)" }} width={30} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--chip)" }} />
            <Bar dataKey="minutes" fill="var(--accent)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {recent.length > 0 && (
        <>
          <SectionTitle>Recently studied · সম্প্রতি পড়া</SectionTitle>
          <div className="grid gap-2">
            {recent.map((p) => {
              const l = getLesson(p.lessonNumber);
              return (
                <button key={p.lessonNumber} type="button" aria-label={`Reopen lesson ${l.n}: ${l.en}`} onClick={() => go({ name: "lesson", n: l.n })} className="flex items-center gap-3 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3 text-left">
                  <Fi n={l.icon} className="text-2xl" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[var(--text)]">Lesson {l.n}: {l.en}</span>
                    <span className="bn block truncate text-sm text-[var(--dim)]">{l.bn} · {p.completion}%</span>
                  </span>
                  <span className="text-[var(--accent)]">→</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {savedWords.length > 0 && (
        <>
          <SectionTitle>Saved words · সংরক্ষিত শব্দ</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {savedWords.map((w) => (
              <button key={w.entryKey} type="button" aria-label={`Open saved word ${w.english} from lesson ${w.lessonNumber}`} onClick={() => go({ name: "lesson", n: w.lessonNumber, tab: "vocab" })} className="rounded-full bg-[var(--surface2)] px-3 py-1.5 text-sm text-[var(--text)]">
                <Fi n="star" solid /> {w.english} <span className="bn text-[var(--dim)]">· {w.bengali}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <section aria-label="Oxford 3000" className="mt-4 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(34,26,5,0.08)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]"><Fi n="book" /> Oxford 3000 · <span className="bn">অক্সফোর্ড ৩০০০ শব্দ</span></h2>
            <p className="bn mt-1 text-sm text-[var(--dim)]">প্রতিদিনের জীবনের শব্দ আগে, তারপর A1 থেকে B2 স্তর অনুযায়ী — মোট {OX_WORDS.length}টি শব্দ, প্রতিটির অর্থ, সমার্থক-বিপরীত শব্দ ও ছোট গল্পসহ।</p>
          </div>
          <Btn variant="primary" ariaLabel="Open the Oxford 3000 section" onClick={() => go({ name: "oxford" })}>
            Start · <span className="bn">শুরু করুন</span>
          </Btn>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <button type="button" aria-label="Open the Everyday Life and Spoken English track" onClick={() => go({ name: "oxfordLevel", level: "everyday" })} className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-sm font-bold text-[var(--on-accent)]">
            Everyday first · <span className="bn">প্রতিদিনের শব্দ</span> ({oxEverydayWords().length})
          </button>
          {OX_LEVELS.map((l) => (
            <button key={l} type="button" aria-label={`Open Oxford level ${l}`} onClick={() => go({ name: "oxfordLevel", level: l })} className="rounded-full bg-[var(--surface2)] px-3 py-1.5 text-sm font-bold text-[var(--text)]">
              {l} · {oxLevelCount(l)}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Phrasal Verbs" className="mt-4 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(34,26,5,0.08)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]"><Fi n="comment-question" /> Phrasal Verbs · <span className="bn">ফ্রেজাল ভার্ব</span></h2>
            <p className="bn mt-1 text-sm text-[var(--dim)]">সবচেয়ে বেশি ব্যবহৃত ফ্রেজাল ভার্বগুলো — প্রতিটির একটি ইংরেজি উদাহরণ আর উদাহরণের বাংলা অর্থ। ব্যবসায়িক ইংরেজির ১০০টি আর সম্পূর্ণ তালিকাও আছে।</p>
          </div>
          <Btn variant="primary" ariaLabel="Open the Phrasal Verbs section" onClick={() => go({ name: "phrasal" })}>
            Start · <span className="bn">শুরু করুন</span>
          </Btn>
        </div>
      </section>

      <section aria-label="Idioms and Phrases" className="mt-4 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(34,26,5,0.08)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]"><Fi n="sparkles" /> Idioms and Phrases · <span className="bn">ইডিয়ম ও ফ্রেজ</span></h2>
            <p className="bn mt-1 text-sm text-[var(--dim)]">{IDIOMS.length}টি ইডিয়ম ও ফ্রেজ — ৬৩টি বাস্তব গল্পে ভাগ করে শেখো, উদাহরণ বাক্য আর প্র্যাকটিস ওয়ার্কশিটসহ।</p>
          </div>
          <Btn variant="primary" ariaLabel="Open the Idioms and Phrases section" onClick={() => go({ name: "idioms" })}>
            Start · <span className="bn">শুরু করুন</span>
          </Btn>
        </div>
      </section>

      <section aria-label="Exams" className="mt-4 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(34,26,5,0.08)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="flex items-center gap-1.5 font-bold text-[var(--text)]"><Fi n="trophy" /> Exams · পরীক্ষা</h2>
            <p className="bn mt-0.5 text-sm text-[var(--dim)]">
              {passedExams}/২৫টি চেকপয়েন্ট পরীক্ষায় পাস · পরের পরীক্ষা: পাঠ {nextExamEnd - 4}–{nextExamEnd}
            </p>
            <p className="bn mt-0.5 text-sm text-[var(--dim)]">
              {finalUnlockedHome
                ? finalBestBand != null
                  ? `ফাইনাল IELTS স্পিকিং: সেরা অনুশীলন-ব্যান্ড ${finalBestBand.toFixed(1)}`
                  : "ফাইনাল IELTS স্পিকিং পরীক্ষা খুলে গেছে — দিয়ে দেখুন!"
                : "সবশেষে IELTS-ধাঁচের ফাইনাল স্পিকিং পরীক্ষা — Lesson 125 শেষ হলেই খুলবে।"}
            </p>
          </div>
          <Btn variant="primary" ariaLabel="Open the exams page" onClick={() => go({ name: "exams" })}>
            <Fi n="pencil" /> Open exams
          </Btn>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-label="Checkpoint exams passed" aria-valuenow={passedExams} aria-valuemin={0} aria-valuemax={25}>
          <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${Math.round((passedExams / 25) * 100)}%` }} />
        </div>
      </section>

      <button type="button" aria-label="Browse all 125 lessons" onClick={() => go({ name: "lessons" })} className="mt-6 flex w-full items-center justify-between gap-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_24px_rgba(34,26,5,0.08)] p-5 text-left">
        <span>
          <span className="block text-lg font-bold text-[var(--text)]">Browse all 125 lessons</span>
          <span className="bn block text-sm text-[var(--dim)]">সব পাঠ — অনুসন্ধান, বিভাগ ও অবস্থা অনুযায়ী খুঁজুন</span>
        </span>
        <span className="text-2xl text-[var(--accent)]" aria-hidden>→</span>
      </button>
    </div>
  );
}

// ---------- lessons list ----------
function LessonsList({ state, go }: { state: State; go: (v: View) => void }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [cat, setCat] = useState("all");
  const [listView, setListView] = useState(false);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 24;
  const filtered = LESSONS.filter((l) => {
    const p = state.progress.find((x) => x.lessonNumber === l.n);
    const st = p?.status ?? "not_started";
    if (status !== "all" && st !== status) return false;
    if (cat !== "all" && l.cat !== cat) return false;
    if (q.trim()) {
      const query = q.trim().toLowerCase();
      return String(l.n) === query || l.en.toLowerCase().includes(query) || l.bn.includes(q.trim());
    }
    return true;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
  return (
    <div>
      <SectionDropdown current="lessons" go={go} className="max-w-md" />
      <h1 className="mt-4 text-2xl font-bold text-[var(--text)]">Basic English</h1>
      <p className="text-sm text-[var(--dim)]">All 125 lessons, in order — Lesson 1: Meeting New People to Lesson 125: Things I Need and Do Not Need.</p>
      <p className="bn text-sm text-[var(--dim)]">১২৫টি পাঠ — ক্রমানুসারে সাজানো। যেকোনো পাঠে চাপ দিলে সেই পাঠই খুলবে।</p>
      <input
        aria-label="Search lessons by number or topic"
        value={q}
        onChange={(e) => { setQ(e.target.value); setPage(0); }}
        placeholder="Search: 12, fruits, ফল…"
        className="bn search-input mt-3 w-full rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--text)]"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        <ThemedSelect
          ariaLabel="Filter lessons by status"
          value={status}
          onChange={(v) => { setStatus(v); setPage(0); }}
          options={[
            { value: "all", label: "All statuses" },
            { value: "not_started", label: "Not started" },
            { value: "in_progress", label: "In progress" },
            { value: "completed", label: "Completed" },
            { value: "revision_needed", label: "Revision needed" },
          ]}
        />
        <ThemedSelect
          ariaLabel="Filter lessons by category"
          value={cat}
          onChange={(v) => { setCat(v); setPage(0); }}
          options={[
            { value: "all", label: "All categories" },
            ...CATEGORIES.map((c) => ({ value: c, label: c })),
          ]}
        />
        <Btn ariaLabel={listView ? "Switch to grid view" : "Switch to list view"} onClick={() => setListView(!listView)}>{listView ? <><Fi n="apps" /> Grid</> : <><Fi n="list" /> List</>}</Btn>
      </div>
      <p className="mt-2 text-sm text-[var(--dim)]">
        {filtered.length} lessons · showing {pageItems.length === 0 ? 0 : safePage * PAGE_SIZE + 1}–{safePage * PAGE_SIZE + pageItems.length}
      </p>
      <div className={listView ? "mt-2 grid gap-2" : "mt-2 grid grid-cols-1 gap-2.5 min-[340px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}>
        {pageItems.map((l) => {
          const p = state.progress.find((x) => x.lessonNumber === l.n);
          const completion = p?.completion ?? 0;
          return (
            <div
              key={l.n}
              className="flex flex-col rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3"
            >
              <LessonProgressMark compact lessonNumber={l.n} completion={completion} status={p?.status ?? "not_started"} />
              <button
                type="button"
                aria-label={`Lesson ${l.n}: ${l.en} — ${l.bn}`}
                onClick={() => go({ name: "lesson", n: l.n })}
                className={`mt-2.5 w-full flex-1 text-left ${listView ? "flex items-center gap-3" : "block"}`}
              >
                <Fi n={l.icon} className="text-2xl" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-[var(--accent)]">LESSON {l.n}</span>
                  <span className="block truncate font-semibold text-[var(--text)]">{l.en}</span>
                  <span className="bn block truncate text-sm text-[var(--dim)]">{l.bn}</span>
                  <span className="mt-0.5 block text-xs text-[var(--dim)]">{l.entries.length} entries · ~{l.minutes} min</span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-[var(--accent)]">{completion > 0 ? "Continue" : "Start"} →</span>
              </button>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="bn mt-4 text-center text-[var(--dim)]">কোনো পাঠ পাওয়া যায়নি। ফিল্টার বদলে দেখুন।</p>}
      {pageCount > 1 && (
        <nav className="mt-4 flex items-center justify-between gap-2" aria-label="Lesson pages">
          <Btn ariaLabel="Previous page of lessons" disabled={safePage === 0} onClick={() => { setPage(safePage - 1); window.scrollTo({ top: 0 }); }}>← Prev</Btn>
          <span className="text-sm text-[var(--dim)]">Page {safePage + 1} of {pageCount}</span>
          <Btn ariaLabel="Next page of lessons" disabled={safePage + 1 >= pageCount} onClick={() => { setPage(safePage + 1); window.scrollTo({ top: 0 }); }}>Next →</Btn>
        </nav>
      )}
    </div>
  );
}

// ---------- dictionary ----------
function Dictionary({ settings, go }: { settings: Settings; go: (v: View) => void }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchEntries(q), [q]);
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text)]">Global Dictionary</h1>
      <p className="bn text-sm text-[var(--dim)]">ইংরেজি শব্দ, বাংলা অর্থ, সমার্থক বা বিপরীত শব্দ দিয়ে খুঁজুন — সব {TOTAL_ENTRIES}টি এন্ট্রি জুড়ে।</p>
      <input
        aria-label="Search the global dictionary"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Try "happy", "সুখী", "mango"…'
        className="bn search-input mt-3 w-full rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--text)]"
      />
      {q.trim() && <p className="mt-2 text-sm text-[var(--dim)]">{hits.length} result{hits.length === 1 ? "" : "s"}</p>}
      <div className="mt-2 grid items-start gap-2 xl:grid-cols-2">
        {hits.map((h) => (
          <div key={h.entry.key} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-[var(--text)]">{h.entry.en} <span className="text-xs font-medium text-[var(--dim)]">({h.entry.pos})</span></p>
              <SpeakBtn text={h.entry.en} settings={settings} label={`Listen: ${h.entry.en}`} />
            </div>
            <p className="bn text-[var(--text)]">{h.entry.bn}</p>
            <p className="text-sm text-[var(--dim)]">{h.entry.exEn}</p>
            <button type="button" aria-label={`Open lesson ${h.entry.lesson} for ${h.entry.en}`} onClick={() => go({ name: "lesson", n: h.entry.lesson, tab: "vocab" })} className="mt-1 text-sm font-medium text-[var(--accent)]">
              Lesson {h.entry.lesson}: {h.lessonEn} · matched in {h.matchedIn} →
            </button>
          </div>
        ))}
        {q.trim() && hits.length === 0 && <p className="bn text-center text-[var(--dim)]">কিছু পাওয়া যায়নি। বানান বদলে আবার চেষ্টা করুন।</p>}
      </div>
    </div>
  );
}

// ---------- my words ----------
function MyWords({ state, settings, go }: { state: State; settings: Settings; go: (v: View) => void }) {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("saved");
  const [q, setQ] = useState("");
  const [en, setEn] = useState("");
  const [bn, setBn] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const add = useMutation({
    mutationFn: async () => await api.addCustomWord({ english: en.trim(), bengali: bn.trim(), note: note.trim() }),
    onSuccess: () => { setEn(""); setBn(""); setNote(""); setErr(""); qc.invalidateQueries({ queryKey: ["state"] }); },
  });
  const del = useMutation({
    mutationFn: async (id: number) => await api.deleteCustomWord({ id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const lists: Record<string, (w: WordState) => boolean> = {
    saved: (w) => w.saved,
    difficult: (w) => w.difficult,
    mastered: (w) => w.mastery === "mastered" || w.known,
    recent: () => true,
  };
  const savedPred = lists["saved"] ?? ((w: WordState) => w.saved);
  const words = state.words
    .filter(lists[filter] ?? savedPred)
    .filter((w) => !q.trim() || w.english.toLowerCase().includes(q.trim().toLowerCase()) || w.bengali.includes(q.trim()))
    .sort((a, b) => (b.nextReviewAt ?? "").localeCompare(a.nextReviewAt ?? ""))
    .slice(0, filter === "recent" ? 20 : 200);
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text)]">My Words · আমার শব্দখাতা</h1>
      <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Word notebook filters">
        {([["saved", "star", "Saved"], ["difficult", "flag", "Difficult"], ["mastered", "trophy", "Mastered"], ["recent", "clock", "Recent"]] as const).map(([f, icon, label]) => (
          <button key={f} type="button" role="tab" aria-selected={filter === f} aria-label={`Notebook filter: ${label}`} onClick={() => setFilter(f)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${filter === f ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}><Fi n={icon} /> {label}</button>
        ))}
      </div>
      <input aria-label="Search my words" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search my words…" className="bn search-input mt-3 w-full rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--text)]" />
      <div className="mt-2 grid gap-2">
        {words.map((w) => (
          <button key={w.entryKey} type="button" aria-label={`Open ${w.english} in lesson ${w.lessonNumber}`} onClick={() => go({ name: "lesson", n: w.lessonNumber, tab: "vocab" })} className="flex items-center gap-3 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3 text-left">
            <span className="min-w-0 flex-1">
              <span className="block truncate font-bold text-[var(--text)]">{w.english}</span>
              <span className="bn block truncate text-sm text-[var(--dim)]">{w.bengali} · Lesson {w.lessonNumber} · {w.mastery}{w.note ? ` · Note: ${w.note}` : ""}</span>
            </span>
            <SpeakBtn text={w.english} settings={settings} label={`Listen: ${w.english}`} />
          </button>
        ))}
        {words.length === 0 && <p className="bn text-sm text-[var(--dim)]">এই তালিকায় এখনো কোনো শব্দ নেই। পাঠের শব্দ কার্ডে Save চাপুন।</p>}
      </div>

      <SectionTitle>My own words · নিজের যোগ করা শব্দ</SectionTitle>
      <div className="grid gap-2">
        {state.customWords.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3">
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-[var(--text)]">{c.english}</span>
              <span className="bn block text-sm text-[var(--dim)]">{c.bengali}{c.note ? ` · ${c.note}` : ""}</span>
            </span>
            <SpeakBtn text={c.english} settings={settings} label={`Listen: ${c.english}`} />
            <Btn variant="ghost" ariaLabel={`Delete custom word ${c.english}`} onClick={() => del.mutate(c.id)}><Fi n="trash" /></Btn>
          </div>
        ))}
      </div>
      <form
        className="mt-3 grid gap-2 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!en.trim() || !bn.trim()) { setErr("English word এবং বাংলা অর্থ দুটোই লিখুন।"); return; }
          add.mutate();
        }}
      >
        <p className="bn font-semibold text-[var(--text)]">নতুন শব্দ যোগ করুন</p>
        <input {...FIELDS.addCustomWord.english} aria-label="Custom word in English" value={en} onChange={(e) => setEn(e.target.value)} placeholder="English word" className="rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)]" />
        <input {...FIELDS.addCustomWord.bengali} aria-label="Custom word Bengali meaning" value={bn} onChange={(e) => setBn(e.target.value)} placeholder="বাংলা অর্থ" className="bn rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)]" />
        <input {...FIELDS.addCustomWord.note} aria-label="Custom word note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="নোট (ঐচ্ছিক)" className="bn rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)]" />
        {err && <p className="bn text-sm text-[var(--rose)]">{err}</p>}
        <Btn variant="primary" ariaLabel="Add custom word" onClick={() => { if (!en.trim() || !bn.trim()) setErr("English word এবং বাংলা অর্থ দুটোই লিখুন।"); else add.mutate(); }}>+ Add word</Btn>
      </form>
    </div>
  );
}

// ---------- review queue ----------
function Review({ state, settings, go }: { state: State; settings: Settings; go: (v: View) => void }) {
  const qc = useQueryClient();
  const now = Date.now();
  const dueWords = state.words.filter((w) => w.nextReviewAt && new Date(w.nextReviewAt).getTime() <= now);
  const upcoming = state.words.filter((w) => w.nextReviewAt && new Date(w.nextReviewAt).getTime() > now).sort((a, b) => (a.nextReviewAt ?? "").localeCompare(b.nextReviewAt ?? "")).slice(0, 8);
  const counts = {
    new: state.words.filter((w) => w.mastery === "new").length,
    learning: state.words.filter((w) => w.mastery === "learning").length,
    review: state.words.filter((w) => w.mastery === "review").length,
    mastered: state.words.filter((w) => w.mastery === "mastered").length,
    difficult: state.words.filter((w) => w.difficult).length,
  };
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);
  const grade = useMutation({
    mutationFn: async (a: { w: WordState; g: "again" | "hard" | "good" | "easy" }) =>
      await api.gradeWord({ entryKey: a.w.entryKey, lessonNumber: a.w.lessonNumber, english: a.w.english, bengali: a.w.bengali, grade: a.g }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const current = dueWords[idx];
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text)]">Smart Review · স্মার্ট রিভিউ</h1>
      <p className="bn text-sm text-[var(--dim)]">সরলীকৃত SM-2 ব্যবধান-পুনরাবৃত্তি পদ্ধতি: ভুল হলে শব্দটি শীঘ্রই আবার আসবে, সহজ হলে অনেক পরে। মোট {state.reviewCount}টি রিভিউ সম্পন্ন হয়েছে।</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {([["New", counts.new], ["Learning", counts.learning], ["Review", counts.review], ["Mastered", counts.mastered], ["Difficult", counts.difficult]] as const).map(([label, v]) => (
          <div key={label} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3 text-center">
            <p className="text-xl font-bold text-[var(--text)]">{v}</p>
            <p className="text-xs text-[var(--dim)]">{label}</p>
          </div>
        ))}
      </div>

      {dueWords.length === 0 ? (
        <div className="mt-4 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-5 text-center">
          <p className="text-3xl"><Fi n="check" /></p>
          <p className="bn mt-2 font-semibold text-[var(--text)]">এখন কোনো শব্দ রিভিউয়ের বাকি নেই!</p>
          <p className="bn mt-1 text-sm text-[var(--dim)]">পাঠে গিয়ে ফ্ল্যাশকার্ড খেলুন — গ্রেড দিলে শব্দ এখানে রিভিউয়ের জন্য আসবে।</p>
          <Btn className="mt-3" variant="primary" ariaLabel="Go to lessons to study new words" onClick={() => go({ name: "lessons" })}>Go to lessons →</Btn>
        </div>
      ) : current ? (
        <div className="mt-4">
          <p className="text-sm text-[var(--dim)]">Due now: {dueWords.length} · Reviewed this session: {sessionDone}</p>
          <div className="flashcard-scene mt-2 h-52">
            <div className={`flashcard-inner h-full cursor-pointer ${flipped ? "flipped" : ""}`} role="button" aria-label={`Review card for ${current.english}. Activate to flip.`} tabIndex={0} onClick={() => setFlipped(!flipped)}>
              <div className="flashcard-face flex flex-col items-center justify-center rounded-3xl border-2 border-[var(--accent)] bg-[var(--surface)] p-6 text-center">
                <span className="text-2xl font-bold text-[var(--text)]">{current.english}</span>
                <span className="mt-1 text-xs text-[var(--dim)]">Lesson {current.lessonNumber} · tap to reveal</span>
                <span className="mt-2"><SpeakBtn text={current.english} settings={settings} label={`Listen: ${current.english}`} /></span>
              </div>
              <div className="flashcard-face flashcard-back flex items-center justify-center rounded-3xl border-2 border-[var(--amber)] bg-[var(--surface)] p-6 text-center">
                <span className="bn text-2xl font-bold text-[var(--text)]">{current.bengali}</span>
              </div>
            </div>
          </div>
          {flipped && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {(["again", "hard", "good", "easy"] as const).map((g) => (
                <Btn
                  key={g}
                  variant={g === "again" ? "danger" : g === "good" || g === "easy" ? "primary" : "soft"}
                  ariaLabel={`Grade this review ${g}`}
                  onClick={() => { grade.mutate({ w: current, g }); setSessionDone((s) => s + 1); setFlipped(false); setIdx(0); }}
                >
                  {g === "again" ? "Again" : g === "hard" ? "Hard" : g === "good" ? "Good" : "Easy"}
                </Btn>
              ))}
            </div>
          )}
          <Btn className="mt-3" variant="ghost" ariaLabel={`Open lesson ${current.lessonNumber} for this word`} onClick={() => go({ name: "lesson", n: current.lessonNumber, tab: "vocab" })}>
            Open in Lesson {current.lessonNumber} →
          </Btn>
        </div>
      ) : null}

      {upcoming.length > 0 && (
        <>
          <SectionTitle>Upcoming reviews · আসন্ন রিভিউ</SectionTitle>
          <div className="grid gap-1.5">
            {upcoming.map((w) => (
              <div key={w.entryKey} className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                <span className="min-w-0 flex-1 font-semibold break-words text-[var(--text)]">{w.english} <span className="bn font-normal text-[var(--dim)]">· {w.bengali}</span></span>
                <span className="shrink-0 text-sm text-[var(--dim)]">{w.nextReviewAt ? new Date(w.nextReviewAt).toLocaleDateString() : ""}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------- analytics ----------
// Time-range report: every number is computed from the learner's stored
// rows (study days, practice attempts, review history, lesson progress)
// filtered to the selected window. A period with no activity shows real
// zeros and an honest empty note — never invented values.
const REPORT_RANGES = [
  { id: "today", days: 1, label: "Today", bn: "আজ" },
  { id: "7d", days: 7, label: "Last 7 days", bn: "গত ৭ দিন" },
  { id: "1m", days: 30, label: "Last 1 month", bn: "গত ১ মাস" },
  { id: "6m", days: 182, label: "Last 6 months", bn: "গত ৬ মাস" },
  { id: "1y", days: 365, label: "Last 1 year", bn: "গত ১ বছর" },
] as const;
type ReportRangeId = (typeof REPORT_RANGES)[number]["id"];

function Analytics({ state }: { state: State }) {
  const [rangeId, setRangeId] = useState<ReportRangeId>("7d");
  const [catStatus, setCatStatus] = useState("all");
  const range = REPORT_RANGES.find((r) => r.id === rangeId) ?? REPORT_RANGES[1];

  // All-time figures, kept as a small context line under the range report.
  const completed = state.progress.filter((p) => p.status === "completed").length;
  const mastered = state.words.filter((w) => w.mastery === "mastered" || w.known).length;
  const totalMinutes = state.studyDays.reduce((s, d) => s + d.minutes, 0);

  // Window: the last `range.days` local calendar days, today included.
  const startDay = new Date();
  startDay.setHours(0, 0, 0, 0);
  startDay.setDate(startDay.getDate() - (range.days - 1));
  const startKey = dayKey(startDay);
  const startMs = startDay.getTime();
  const inRangeTime = (iso: string | null) => iso != null && new Date(iso).getTime() >= startMs;

  const daysInRange = state.studyDays.filter((d) => d.day >= startKey);
  const rangeMinutes = daysInRange.reduce((s, d) => s + d.minutes, 0);
  const rangeSessions = daysInRange.reduce((s, d) => s + d.sessions, 0);
  const activeDays = daysInRange.filter((d) => d.minutes > 0).length;
  const attemptsInRange = state.attempts.filter((a) => inRangeTime(a.createdAt));
  const reviewsInRange = state.reviews.filter((r) => inRangeTime(r.reviewedAt));
  const wordsReviewed = new Set(reviewsInRange.map((r) => r.entryKey)).size;
  const wordsLearned = state.words.filter((w) => inRangeTime(w.createdAt)).length;
  const studiedInRange = state.progress.filter((p) => inRangeTime(p.lastStudiedAt));
  const completedInRange = studiedInRange.filter((p) => p.status === "completed").length;
  const rangeQuestions = attemptsInRange.reduce((s, a) => s + a.total, 0);
  const rangeCorrect = attemptsInRange.reduce((s, a) => s + a.correct, 0);
  const rangeAccuracy = rangeQuestions ? Math.round((rangeCorrect / rangeQuestions) * 100) : null;
  const hasActivity = rangeMinutes > 0 || attemptsInRange.length > 0 || reviewsInRange.length > 0 || studiedInRange.length > 0 || wordsLearned > 0;

  // Streak: for "Today" the meaningful figure is the current streak; for
  // longer windows it is the longest run of consecutive study days inside
  // the window.
  const allActive = new Set(state.studyDays.filter((d) => d.minutes > 0).map((d) => d.day));
  let currentStreak = 0;
  const cursor = new Date();
  if (!allActive.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (allActive.has(dayKey(cursor))) { currentStreak++; cursor.setDate(cursor.getDate() - 1); }
  let rangeStreak = currentStreak;
  if (range.days > 1) {
    rangeStreak = 0;
    let run = 0;
    const c = new Date(startDay);
    for (let i = 0; i < range.days; i++) {
      if (allActive.has(dayKey(c))) { run++; rangeStreak = Math.max(rangeStreak, run); } else run = 0;
      c.setDate(c.getDate() + 1);
    }
  }

  const byKind = (kind: string) => {
    const rows = attemptsInRange.filter((a) => a.kind === kind);
    const t = rows.reduce((s, a) => s + a.total, 0);
    const c = rows.reduce((s, a) => s + a.correct, 0);
    return { sessions: rows.length, pct: t ? Math.round((c / t) * 100) : null };
  };

  // ---------- Words read / Minutes studied categories ----------
  // Two separate categories, both honouring the range selector above and
  // the status filter below. Everything comes from stored rows only:
  // a word counts as read in the window when it was first studied,
  // reviewed, saved or marked in it (word-state timestamps + review
  // history), grouped by the current status of the lesson it belongs to.
  // Minutes: the all-statuses total is the study_days total for the
  // window; the per-status split uses lesson_minutes, which records
  // which lesson each study session's minutes belonged to.
  const statusOfLesson = (n: number) => state.progress.find((p) => p.lessonNumber === n)?.status ?? "not_started";
  const reviewedKeysInRange = new Set(reviewsInRange.map((r) => r.entryKey));
  const wordsReadInRange = state.words.filter(
    (w) => inRangeTime(w.createdAt) || inRangeTime(w.lastReviewedAt) || reviewedKeysInRange.has(w.entryKey),
  );
  const STATUS_IDS = ["not_started", "in_progress", "completed", "revision_needed"] as const;
  const wordsByStatus = STATUS_IDS.map((s) => ({
    id: s,
    count: wordsReadInRange.filter((w) => statusOfLesson(w.lessonNumber) === s).length,
  }));
  const wordsShown = catStatus === "all" ? wordsReadInRange : wordsReadInRange.filter((w) => statusOfLesson(w.lessonNumber) === catStatus);
  const recentWords = [...wordsShown]
    .sort((a, b) => Math.max(new Date(b.lastReviewedAt ?? 0).getTime(), new Date(b.createdAt ?? 0).getTime()) - Math.max(new Date(a.lastReviewedAt ?? 0).getTime(), new Date(a.createdAt ?? 0).getTime()))
    .slice(0, 6);
  const lessonMinsInRange = state.lessonMinutes.filter((m) => m.day >= startKey);
  const minutesByStatus = STATUS_IDS.map((s) => ({
    id: s,
    minutes: lessonMinsInRange.filter((m) => statusOfLesson(m.lessonNumber) === s).reduce((sum, m) => sum + m.minutes, 0),
  }));
  const minutesShown = catStatus === "all" ? rangeMinutes : (minutesByStatus.find((x) => x.id === catStatus)?.minutes ?? 0);
  const statusShort = (s: string) => STATUS_LABEL[s]?.split(" · ")[0] ?? s;

  // Chart buckets: daily up to a month, weekly for 6 months, monthly for a year.
  const chartData = (() => {
    if (range.days <= 31) {
      return Array.from({ length: range.days }, (_, i) => {
        const d = new Date(startDay);
        d.setDate(d.getDate() + i);
        const row = state.studyDays.find((x) => x.day === dayKey(d));
        return {
          day: range.days === 1 ? "Today" : d.toLocaleDateString(undefined, range.days <= 7 ? { weekday: "short" } : { day: "numeric", month: "short" }),
          minutes: row?.minutes ?? 0,
        };
      });
    }
    if (range.days <= 182) {
      const weeks = Math.ceil(range.days / 7);
      return Array.from({ length: weeks }, (_, w) => {
        const ws = new Date(startDay);
        ws.setDate(ws.getDate() + w * 7);
        let minutes = 0;
        for (let i = 0; i < 7; i++) {
          const d = new Date(ws);
          d.setDate(d.getDate() + i);
          minutes += state.studyDays.find((x) => x.day === dayKey(d))?.minutes ?? 0;
        }
        return { day: ws.toLocaleDateString(undefined, { day: "numeric", month: "short" }), minutes };
      });
    }
    const out: { day: string; minutes: number }[] = [];
    const ms = new Date(startDay.getFullYear(), startDay.getMonth(), 1);
    while (ms.getTime() <= Date.now()) {
      const key = `${ms.getFullYear()}-${String(ms.getMonth() + 1).padStart(2, "0")}`;
      out.push({
        day: ms.toLocaleDateString(undefined, { month: "short" }),
        minutes: state.studyDays.filter((d) => d.day >= startKey && d.day.startsWith(key)).reduce((s, d) => s + d.minutes, 0),
      });
      ms.setMonth(ms.getMonth() + 1);
    }
    return out;
  })();
  const chartTitle = range.days === 1 ? "Today's study time" : range.days <= 31 ? "Study time per day" : range.days <= 182 ? "Study time per week" : "Study time per month";
  const fmtMinutes = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min`);
  const difficult = [...state.words].filter((w) => w.difficult || w.lapses > 0).sort((a, b) => b.lapses - a.lapses).slice(0, 8);
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text)]">Learning Analytics</h1>
      <p className="bn text-sm text-[var(--dim)]">সব সংখ্যা আপনার সংরক্ষিত পড়ার তথ্য থেকে এসেছে। সময় বেছে নিলে সেই সময়ের রিপোর্ট দেখা যাবে।</p>
      <div className="mt-4 flex flex-wrap gap-1.5 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-[0_6px_20px_rgba(34,26,5,0.07)]" role="group" aria-label="Report time range · রিপোর্টের সময়সীমা">
        {REPORT_RANGES.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={rangeId === r.id}
            aria-label={`Show report for ${r.label}`}
            onClick={() => setRangeId(r.id)}
            className={`min-w-[30%] flex-1 rounded-full px-3 py-2 text-sm font-extrabold whitespace-nowrap transition sm:min-w-0 ${rangeId === r.id ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_3px_0_rgba(34,26,5,0.25)]" : "text-[var(--dim)] hover:text-[var(--text)]"}`}
          >
            {r.label} <span className="bn font-semibold">· {r.bn}</span>
          </button>
        ))}
      </div>
      {!hasActivity && (
        <p className="bn mt-3 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--dim)]">
          এই সময়ে ({range.bn}) এখনো কোনো পড়ার রেকর্ড নেই — পড়া শুরু করলেই এখানে আসল রিপোর্ট দেখা যাবে। No study activity recorded for {range.label.toLowerCase()} yet.
        </p>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {([
          ["Study time", fmtMinutes(rangeMinutes)],
          ["Study sessions", rangeSessions],
          ["Active days", activeDays],
          [range.days === 1 ? "Day streak" : "Longest streak", rangeStreak],
          ["Lessons studied", studiedInRange.length],
          ["Lessons completed", completedInRange],
          ["Words learned", wordsLearned],
          ["Words reviewed", wordsReviewed],
          ["Reviews done", reviewsInRange.length],
          ["Practice sessions", attemptsInRange.length],
          ["Practice accuracy", rangeAccuracy == null ? "—" : `${rangeAccuracy}%`],
        ] as [string, string | number][]).map(([label, v]) => (
          <div key={label} className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3">
            <p className="text-2xl font-bold text-[var(--text)]">{v}</p>
            <p className="text-xs text-[var(--dim)]">{label} · <span className="bn">{range.bn}</span></p>
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-xs text-[var(--dim)]">
        All time · <span className="bn">সব সময় মিলিয়ে</span>: {completed} lessons completed · {mastered} words mastered · {fmtMinutes(totalMinutes)} studied · {state.reviewCount} reviews
      </p>
      <SectionTitle>Words &amp; minutes — separate categories · <span className="bn">শব্দ ও মিনিট — আলাদা আলাদা ক্যাটাগরি</span></SectionTitle>
      <div className="flex flex-wrap items-center gap-2">
        <ThemedSelect
          ariaLabel="Filter the words read and minutes studied categories by lesson status"
          value={catStatus}
          onChange={setCatStatus}
          options={[
            { value: "all", label: "All statuses" },
            { value: "not_started", label: "Not started" },
            { value: "in_progress", label: "In progress" },
            { value: "completed", label: "Completed" },
            { value: "revision_needed", label: "Revision needed" },
          ]}
        />
        <span className="text-sm text-[var(--dim)]">{range.label} · <span className="bn">{range.bn}</span></span>
      </div>
      <div className="mt-3 grid items-start gap-3 lg:grid-cols-2">
        <section aria-label="Words read category" className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
          <h3 className="font-display text-lg font-semibold text-[var(--text)]">Words read · <span className="bn">পড়া শব্দ</span></h3>
          <p className="font-display mt-1 text-4xl font-semibold text-[var(--text)]">{wordsShown.length}</p>
          <p className="text-xs text-[var(--dim)]">
            words studied or reviewed · {range.label}{catStatus !== "all" ? ` · in ${statusShort(catStatus)} lessons` : ""}
          </p>
          <div className="mt-3 grid gap-1.5">
            {wordsByStatus.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={catStatus === s.id}
                aria-label={`Filter categories to ${statusShort(s.id)} lessons — ${s.count} words read`}
                onClick={() => setCatStatus(catStatus === s.id ? "all" : s.id)}
                className={`flex items-center justify-between gap-3 rounded-full px-3 py-1.5 text-sm ${catStatus === s.id ? "bg-[var(--accent)] font-extrabold text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
              >
                <span>{STATUS_LABEL[s.id]}</span>
                <span className="font-extrabold">{s.count}</span>
              </button>
            ))}
          </div>
          {wordsShown.length === 0 ? (
            <p className="bn mt-3 text-sm text-[var(--dim)]">এই সময়ে এই ফিল্টারে এখনো কোনো শব্দ পড়া হয়নি।</p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recentWords.map((w) => (
                <span key={w.entryKey} className="rounded-full bg-[var(--surface2)] px-2.5 py-1 text-xs font-semibold text-[var(--text)]">
                  {w.english} <span className="bn font-normal text-[var(--dim)]">· {w.bengali}</span> <span className="text-[var(--dim)]">· L{w.lessonNumber}</span>
                </span>
              ))}
            </div>
          )}
        </section>
        <section aria-label="Minutes studied category" className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
          <h3 className="font-display text-lg font-semibold text-[var(--text)]">Minutes studied · <span className="bn">পড়ার মিনিট</span></h3>
          <p className="font-display mt-1 text-4xl font-semibold text-[var(--text)]">{fmtMinutes(minutesShown)}</p>
          <p className="text-xs text-[var(--dim)]">
            study time · {range.label}{catStatus !== "all" ? ` · in ${statusShort(catStatus)} lessons` : " · all lessons"}
          </p>
          <div className="mt-3 grid gap-1.5">
            {minutesByStatus.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={catStatus === s.id}
                aria-label={`Filter categories to ${statusShort(s.id)} lessons — ${s.minutes} minutes studied`}
                onClick={() => setCatStatus(catStatus === s.id ? "all" : s.id)}
                className={`flex items-center justify-between gap-3 rounded-full px-3 py-1.5 text-sm ${catStatus === s.id ? "bg-[var(--accent)] font-extrabold text-[var(--on-accent)]" : "bg-[var(--surface2)] text-[var(--text)]"}`}
              >
                <span>{STATUS_LABEL[s.id]}</span>
                <span className="font-extrabold">{fmtMinutes(s.minutes)}</span>
              </button>
            ))}
          </div>
          <p className="bn mt-3 text-xs text-[var(--dim)]">
            পাঠ অনুযায়ী মিনিটের হিসাব এখন থেকে প্রতিটি পড়ার সেশনে সংরক্ষিত হয়; তার আগের পড়ার সময় শুধু "All statuses" মোটে যোগ আছে। Minutes are recorded per lesson from now on; earlier study time is included in the All statuses total.
          </p>
        </section>
      </div>
      <SectionTitle>{chartTitle} · <span className="bn">{range.bn}</span></SectionTitle>
      <div className="h-44 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--dim)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--dim)" }} width={30} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--chip)" }} />
            <Bar dataKey="minutes" fill="var(--amber)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <SectionTitle>Accuracy by activity · কার্যকলাপ অনুযায়ী নির্ভুলতা · <span className="bn">{range.bn}</span></SectionTitle>
      <div className="grid gap-2">
        {([["quiz", "Lesson quizzes"], ["quick-practice", "Quick Practice"], ["listening", "Listening"], ["flashcards", "Flashcards"], ["matching", "Matching"], ["memory", "Memory"], ["spelling", "Spelling"], ["sentence-scramble", "Sentence Scramble"], ["listen-type", "Listen & Type"], ["odd-one-out", "Odd One Out"], ["speed-round", "Speed Round"], ["speaking", "Speaking"], ["story-quiz", "Story quizzes"]] as const).map(([kind, label]) => {
          const s = byKind(kind);
          return (
            <div key={kind} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <span className="font-medium text-[var(--text)]">{label}</span>
              <span className="text-sm text-[var(--dim)]">{s.sessions === 0 ? "No attempts yet" : `${s.pct}% · ${s.sessions} session${s.sessions === 1 ? "" : "s"}`}</span>
            </div>
          );
        })}
      </div>
      <SectionTitle>Exams · পরীক্ষা · <span className="bn">{range.bn}</span></SectionTitle>
      <div className="grid gap-2">
        {(() => {
          const cp = attemptsInRange.filter((a) => a.kind.startsWith("checkpoint-"));
          const cpPassed = cp.filter((a) => a.total > 0 && (a.correct / a.total) * 100 >= CHECKPOINT_PASS).length;
          const fin = attemptsInRange.filter((a) => a.kind === "final-speaking" && a.total > 0);
          const finBest = fin.length ? Math.max(...fin.map((a) => a.correct / 10)) : null;
          return (
            <>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                <span className="font-medium text-[var(--text)]">Checkpoint exams</span>
                <span className="text-sm text-[var(--dim)]">{cp.length === 0 ? "No attempts in this period" : `${cpPassed} passed · ${cp.length} attempt${cp.length === 1 ? "" : "s"}`}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                <span className="font-medium text-[var(--text)]">Final speaking exam</span>
                <span className="text-sm text-[var(--dim)]">{finBest == null ? "Not taken in this period" : `Best band ${finBest.toFixed(1)} · ${fin.length} attempt${fin.length === 1 ? "" : "s"}`}</span>
              </div>
            </>
          );
        })()}
      </div>
      <SectionTitle>Most difficult words · সবচেয়ে কঠিন শব্দ</SectionTitle>
      {difficult.length === 0 ? (
        <p className="bn text-sm text-[var(--dim)]">এখনো কোনো কঠিন শব্দ চিহ্নিত হয়নি।</p>
      ) : (
        <div className="grid gap-1.5">
          {difficult.map((w) => (
            <div key={w.entryKey} className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <span className="min-w-0 flex-1 font-semibold break-words text-[var(--text)]">{w.english} <span className="bn font-normal text-[var(--dim)]">· {w.bengali}</span></span>
              <span className="shrink-0 text-sm text-[var(--rose)]">Lesson {w.lessonNumber} · missed {w.lapses}×</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- settings ----------
function SettingsView({ settings }: { settings: Settings }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(settings);
  const [confirmReset, setConfirmReset] = useState(false);
  const save = useMutation({
    mutationFn: async () => await api.saveSettings(form),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const reset = useMutation({
    mutationFn: async () => await api.resetProgress({ confirm: true }),
    onSuccess: () => { setConfirmReset(false); qc.invalidateQueries({ queryKey: ["state"] }); },
  });
  const numField = (label: string, key: "dailyGoalMinutes" | "dailyGoalWords", min: number, max: number) => (
    <label className="block">
      <span className="text-sm font-medium text-[var(--text)]">{label}</span>
      <input
        type="number"
        aria-label={label}
        min={min}
        max={max}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
        className="themed-number mt-1.5 w-full rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] px-4 py-2.5 font-display text-lg font-semibold text-[var(--text)] shadow-[inset_0_2px_5px_rgba(34,26,5,0.10)] transition focus:border-[var(--text)] focus:outline-none"
      />
    </label>
  );
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[var(--text)]">Settings · সেটিংস</h1>
        <ThemeSwitcher settings={settings} compact />
      </div>
      <div className="mt-4 grid gap-4 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4">
        <label className="block">
          <span className="text-sm font-medium text-[var(--text)]">Interface language · ইন্টারফেস ভাষা</span>
          <div className="mt-1">
            <ThemedSelect fullWidth ariaLabel="Interface language" value={form.uiLanguage} onChange={(v) => setForm({ ...form, uiLanguage: v })} options={[{ value: "bn", label: "বাংলা + English (bilingual)" }, { value: "en", label: "English first" }]} />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-[var(--text)]">English accent (uses your device's voices)</span>
          <div className="mt-1">
            <ThemedSelect fullWidth ariaLabel="English pronunciation accent" value={form.accent} onChange={(v) => setForm({ ...form, accent: v })} options={[{ value: "en-US", label: "American (en-US)" }, { value: "en-GB", label: "British (en-GB)" }, { value: "en", label: "Any English voice" }]} />
          </div>
          <span className="bn mt-1 block text-xs text-[var(--dim)]">আপনার ডিভাইসে সেই অ্যাকসেন্টের কণ্ঠ না থাকলে সবচেয়ে কাছের ইংরেজি কণ্ঠ ব্যবহৃত হবে।</span>
        </label>
        <div className="block">
          <span className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-[var(--text)]">Speech speed</span>
            <span className="rounded-full bg-[var(--hero)] px-3 py-0.5 font-display text-sm font-semibold text-[#221a05] shadow-[0_2px_0_rgba(34,26,5,0.25)]">{form.speechRate.toFixed(2)}×</span>
          </span>
          <input type="range" aria-label="Speech speed" min={0.5} max={1.5} step={0.05} value={form.speechRate} onChange={(e) => setForm({ ...form, speechRate: Number(e.target.value) })} className="themed-range mt-3 w-full" style={{ "--fill": `${((form.speechRate - 0.5) / 1) * 100}%` } as CSSProperties} />
          <span className="mt-1.5 flex justify-between text-xs font-semibold text-[var(--dim)]"><span>0.50× slower</span><span>1.50× faster</span></span>
        </div>
        {numField("Daily study goal (minutes)", "dailyGoalMinutes", 1, 300)}
        {numField("Daily new-word goal", "dailyGoalWords", 1, 200)}
        <label className="flex cursor-pointer items-center gap-3 rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] px-4 py-2.5 font-semibold text-[var(--text)]">
          <input type="checkbox" aria-label="Show Bengali translations by default" checked={form.showBengali} onChange={(e) => setForm({ ...form, showBengali: e.target.checked })} className="themed-check" />
          <span className="bn">ডিফল্টভাবে বাংলা অনুবাদ দেখান</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] px-4 py-2.5 font-semibold text-[var(--text)]">
          <input type="checkbox" aria-label="Auto-play audio when opening a word" checked={form.autoPlay} onChange={(e) => setForm({ ...form, autoPlay: e.target.checked })} className="themed-check" />
          Auto-play pronunciation when a word card opens
        </label>
        <label className="block">
          <span className="text-sm font-medium text-[var(--text)]">Reading font size</span>
          <div className="mt-1">
            <ThemedSelect fullWidth ariaLabel="Reading font size" value={form.fontSize} onChange={(v) => setForm({ ...form, fontSize: v })} options={[{ value: "normal", label: "Normal" }, { value: "large", label: "Large" }]} />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-[var(--text)]">Theme</span>
          <div className="mt-1">
            <ThemedSelect fullWidth ariaLabel="Theme preference" value={form.theme} onChange={(v) => setForm({ ...form, theme: v })} options={[{ value: "system", label: "System (follow device)" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
          </div>
          <span className="bn mt-1 block text-xs text-[var(--dim)]">হেডারের থিম বোতাম দিয়েও থিম বদলাতে পারেন — পছন্দটি সংরক্ষিত থাকে।</span>
        </label>
        <Btn variant="primary" ariaLabel="Save settings" onClick={() => save.mutate()}>{save.isSuccess ? <><Fi n="check" /> Saved</> : "Save settings"}</Btn>
        {save.isError && <p className="text-sm text-[var(--rose)]">Could not save — please try again.</p>}
      </div>

      <div className="mt-4 rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] p-4">
        <h2 className="font-bold text-[var(--text)]">Credits</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--dim)]">
          Icons: <a href="https://www.flaticon.com/uicons" target="_blank" rel="noreferrer" className="font-semibold text-[var(--text)]">Uicons by Flaticon</a> — Flaticon's free icon library, used under the Flaticon Free License (free with attribution). Bengali text is set in <span className="bn font-semibold text-[var(--text)]">Noto Sans Bengali</span> from Google Fonts (SIL Open Font License 1.1); English display type is Fredoka and body type is Nunito.
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--rose)] bg-[var(--surface)] p-4">
        <h2 className="font-bold text-[var(--text)]">Reset progress</h2>
        <p className="bn mt-1 text-sm text-[var(--dim)]">সব অগ্রগতি, শব্দের অবস্থা ও পরিসংখ্যান মুছে যাবে। এই কাজ ফেরানো যাবে না।</p>
        {confirmReset ? (
          <div className="mt-2 flex gap-2">
            <Btn variant="danger" ariaLabel="Confirm reset of all progress" onClick={() => reset.mutate()}>Yes, reset everything</Btn>
            <Btn ariaLabel="Cancel reset" onClick={() => setConfirmReset(false)}>Cancel</Btn>
          </div>
        ) : (
          <Btn className="mt-2" ariaLabel="Reset all learning progress" onClick={() => setConfirmReset(true)}>Reset…</Btn>
        )}
      </div>
    </div>
  );
}

// ---------- theme switcher ----------
// Persists the learner's choice through saveSettings; App applies it by
// setting data-theme on <html>, and theme.css resolves light/dark/system.
function ThemeSwitcher({ settings, compact }: { settings: Settings; compact?: boolean }) {
  const qc = useQueryClient();
  const save = useMutation({
    mutationFn: async (theme: string) => await api.saveSettings({ ...settings, theme }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const modes: [string, string, string][] = [
    ["light", "sun", "Light theme"],
    ["dark", "moon", "Dark theme"],
    ["system", "screen", "System theme (follow device)"],
  ];
  return (
    <div className={`flex items-center justify-between rounded-full border-2 border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-[0_3px_10px_rgba(34,26,5,0.18)] ${compact ? "w-36 shrink-0" : "w-full min-w-40"}`} role="group" aria-label="Theme · থিম">
      {modes.map(([m, icon, label], i) => (
        <div key={m} className={`flex flex-1 ${i === 0 ? "justify-start" : i === 1 ? "justify-center" : "justify-end"}`}>
          <button
            type="button"
            aria-label={label}
            aria-pressed={settings.theme === m}
            onClick={() => save.mutate(m)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition ${settings.theme === m ? "bg-[var(--hero)] text-[#221a05] shadow-[0_2px_0_rgba(34,26,5,0.25)]" : "text-[var(--dim)] hover:text-[var(--text)]"}`}
          >
            <Fi n={icon} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ---------- copyright ----------
// The footer keeps a single "Copyright" link that reveals the
// content-protection notice in English and Bengali. The icon/font
// attribution lives in Settings → Credits.
function CopyrightLink({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const linkCls =
    "font-semibold text-[var(--dim)] underline decoration-dotted underline-offset-4 hover:text-[var(--text)]";
  return (
    <div className={className}>
      <div className="flex items-center justify-center">
        <button
          type="button"
          aria-label="Copyright — show the copyright protection notice"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={linkCls}
        >
          Copyright
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-3 max-w-xl rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left shadow-[0_2px_0_rgba(34,26,5,0.08)]">
          <p className="text-center text-sm font-bold text-[var(--text)]">
            © 2026 English Learning Studio — All Rights Reserved
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[var(--text)]">
            All content on this website — including the lessons, vocabulary,
            Bengali meanings, definitions, stories, examples, phrases, games,
            quizzes, exams, flashcards and the design of this app — is the
            protected property of English Learning Studio and is protected by
            copyright law.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[var(--text)]">
            This content is for your personal learning use only. No part of it
            may be copied, reproduced, republished, distributed, shared,
            translated, recorded, screenshotted for reuse, uploaded elsewhere,
            or used for any commercial purpose without prior written permission
            from the owner. Unauthorised use of this content may lead to legal
            action.
          </p>
          <p className="bn mt-3 text-center text-sm font-bold text-[var(--text)]">
            © ২০২৬ English Learning Studio — সর্বস্বত্ব সংরক্ষিত
          </p>
          <p className="bn mt-2 text-xs leading-relaxed text-[var(--text)]">
            এই ওয়েবসাইটের সব কনটেন্ট — পাঠ (lessons), শব্দভান্ডার, বাংলা অর্থ,
            সংজ্ঞা, গল্প, উদাহরণ, বাক্যাংশ, গেম, কুইজ, পরীক্ষা, ফ্ল্যাশকার্ড এবং
            এই অ্যাপের ডিজাইনসহ — English Learning Studio-এর সুরক্ষিত সম্পত্তি
            এবং কপিরাইট আইন দ্বারা সুরক্ষিত।
          </p>
          <p className="bn mt-2 text-xs leading-relaxed text-[var(--text)]">
            এই কনটেন্ট শুধুমাত্র আপনার ব্যক্তিগত শেখার জন্য। মালিকের পূর্ব
            লিখিত অনুমতি ছাড়া এর কোনো অংশ কপি, পুনঃপ্রকাশ, বিতরণ, শেয়ার,
            অনুবাদ, রেকর্ড, পুনঃব্যবহারের জন্য স্ক্রিনশট, অন্য কোথাও আপলোড বা
            কোনো বাণিজ্যিক কাজে ব্যবহার করা যাবে না। অননুমোদিত ব্যবহারের
            ক্ষেত্রে আইনগত ব্যবস্থা নেওয়া হতে পারে।
          </p>
        </div>
      )}
    </div>
  );
}

// ---------- Idioms and Phrases section ----------
// Two views, switched by pills at the top of the page:
// (1) Stories · গল্প — the 310 list idioms regrouped into connected
// real-life stories of 5 idioms each (idiom-story-groups.ts), in the
// style of the learner's Bengali idiom practice book: each story page
// shows the Bengali story ("গল্পের নমুনা", idioms underlined inside it),
// the same story in English, a table (Idiom | English Meaning | Bengali
// Meaning), 3 example sentences per idiom with the Bengali meaning under
// each, and a practice worksheet ("ওয়ার্কবুক প্র্যাকটিস শিট") — MCQ,
// fill-in-the-blanks and sentence making — scored out of 3 marks per
// idiom and saved through recordAttempt as kind `idiom-story-<num>`, so
// the best score per story shows on its card and detail page.
// (2) All Idioms · সব ইডিয়ম — the complete list from the learner's
// uploaded "IDIOMS AND PHRASES" PDF (see idioms.ts: 325 numbered
// entries, deduplicated to 310), unchanged: every card shows the idiom,
// its English meaning, the Bengali meaning directly underneath, then a
// short original usage story (idiom-stories.ts) with the idiom
// underlined inside it and the story's Bengali meaning underneath.
// Speaker buttons read text aloud with the app's shared speak() helper.
// One search box filters the whole list by idiom, meaning, Bengali
// meaning or story.

// Renders a story string, underlining every [[...]]-marked part (the
// idiom/phrase as it appears in the story, in its natural form).
function UnderlinedStory({ text }: { text: string }) {
  const parts = text.split(/(\[\[.+?\]\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[[") && p.endsWith("]]") ? (
          <u key={i} className="font-semibold underline decoration-2 underline-offset-4">
            {p.slice(2, -2)}
          </u>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function IdiomCard({ entry, settings }: { entry: IdiomEntry; settings: Settings }) {
  const story = IDIOM_STORIES[entry.n];
  const plainStory = story ? story.story.replace(/\[\[|\]\]/g, "") : "";
  return (
    <article className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)]">
      <div className="flex items-start gap-2">
        <span className="pt-1 text-sm font-extrabold text-[var(--dim)]">{entry.n}.</span>
        <h3 className="font-display min-w-0 flex-1 pt-0.5 text-lg font-semibold text-[var(--text)]">{entry.idiom}</h3>
        <SpeakBtn text={entry.idiom} settings={settings} label={`Listen: ${entry.idiom}`} />
      </div>
      <p className="mt-2 text-base text-[var(--text)]">{entry.meaning}</p>
      <p className="bn mt-1 text-base font-semibold text-[var(--dim)]">{entry.meaningBn}</p>
      {story && (
        <div className="mt-3 border-t-2 border-dashed border-[var(--border)] pt-3">
          <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--dim)]">
            <Fi n="book-open-cover" /> Story · <span className="bn">গল্প</span>
          </p>
          <p className="mt-1.5 text-base leading-relaxed text-[var(--text)]">
            <UnderlinedStory text={story.story} />
          </p>
          <PvSpeakButton id={`idiom-${entry.n}-story`} text={plainStory} settings={settings} variant="example" />
          <p className="bn mt-1 text-base text-[var(--dim)]">{story.storyBn}</p>
        </div>
      )}
    </article>
  );
}

// ---------- Idiom story groups (book-style stories + worksheets) ----------

function stripIdiomMarks(s: string): string {
  return s.replace(/\[\[|\]\]/g, "");
}

function blankIdiomMarks(s: string): string {
  return s.replace(/\[\[.+?\]\]/g, "…………");
}

// Small deterministic RNG so a story's worksheet options are the same on
// every visit (stable layout, no reshuffle between renders).
function seededRandom(seed: number): () => number {
  let t = (seed >>> 0) || 1;
  return () => {
    t = (t * 1664525 + 1013904223) >>> 0;
    return t / 4294967296;
  };
}

const ALL_GROUP_MEANINGS: string[] = IDIOM_STORY_GROUPS.flatMap((g) => g.idioms.map((i) => i.meaning));

// The 4 MCQ options for one idiom of a story: its own meaning plus 3
// meanings drawn deterministically from the other story idioms.
function idiomMcqOptions(group: IdiomStoryGroup, idx: number): string[] {
  const correct = group.idioms[idx]?.meaning ?? "";
  const rnd = seededRandom(group.num * 977 + idx * 131 + 7);
  const pool = ALL_GROUP_MEANINGS.filter((m) => m !== correct);
  const picks: string[] = [];
  const used = new Set<number>();
  while (picks.length < 3 && used.size < pool.length) {
    const j = Math.floor(rnd() * pool.length);
    if (used.has(j)) continue;
    used.add(j);
    const m = pool[j];
    if (m != null && !picks.includes(m)) picks.push(m);
  }
  const opts = [correct, ...picks];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const a = opts[i];
    const b = opts[j];
    if (a != null && b != null) {
      opts[i] = b;
      opts[j] = a;
    }
  }
  return opts;
}

// Sentence-making check: the learner's sentence counts when it actually
// uses the idiom — the idiom's words must appear in it, allowing my /
// his / her / their / your / our in place of "one's" / "one" / "your".
function sentenceUsesIdiom(text: string, idiom: string): boolean {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/'/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const variants = new Set<string>();
  const full = norm(idiom);
  if (full) variants.add(full);
  const base = norm(idiom.replace(/\(.*?\)/g, " ")).replace(/^to /, "");
  if (base) {
    variants.add(base);
    for (const p of ["my", "his", "her", "their", "your", "our"]) {
      variants.add(base.replace(/\bones\b/g, p).replace(/\bone\b/g, p).replace(/\byour\b/g, p));
    }
  }
  const t = norm(text);
  return [...variants].some((v) => v.length >= 3 && t.includes(v));
}

interface WorksheetResult {
  total: number;
  correct: number;
  mcqOk: boolean[];
  fillOk: boolean[];
  sentOk: boolean[];
}

// The book's "Practice Worksheet" for one story: A. MCQ (choose the
// correct meaning of the underlined idiom), B. Fill in the blanks (pick
// the right idiom of this story for each blank), C. Sentence Making
// (write a sentence with each idiom; the model answer — the idiom's
// third example — is revealed after submitting, and the sentence scores
// when it really uses the idiom). Submitting scores the worksheet and
// saves the attempt; the best score per story is kept from attempts.
function IdiomWorksheet({ group }: { group: IdiomStoryGroup }) {
  const idioms = group.idioms;
  const options = useMemo(() => idioms.map((_, i) => idiomMcqOptions(group, i)), [group, idioms]);
  const [mcq, setMcq] = useState<(number | null)[]>(() => idioms.map(() => null));
  const [fill, setFill] = useState<(number | null)[]>(() => idioms.map(() => null));
  const [sent, setSent] = useState<string[]>(() => idioms.map(() => ""));
  const [result, setResult] = useState<WorksheetResult | null>(null);
  const rec = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: null, kind: `idiom-story-${group.num}`, total: a.total, correct: a.correct }),
  });
  const answered = mcq.filter((v) => v != null).length + fill.filter((v) => v != null).length + sent.filter((s) => s.trim().length > 0).length;
  const submit = () => {
    const mcqOk = idioms.map((it, i) => {
      const sel = mcq[i];
      return sel != null && options[i]?.[sel] === it.meaning;
    });
    const fillOk = idioms.map((_, i) => fill[i] === i);
    const sentOk = idioms.map((it, i) => sentenceUsesIdiom(sent[i] ?? "", it.idiom));
    const correct = [...mcqOk, ...fillOk, ...sentOk].filter(Boolean).length;
    const total = idioms.length * 3;
    setResult({ total, correct, mcqOk, fillOk, sentOk });
    rec.mutate({ total, correct });
  };
  const reset = () => {
    setMcq(idioms.map(() => null));
    setFill(idioms.map(() => null));
    setSent(idioms.map(() => ""));
    setResult(null);
  };
  const submitted = result != null;
  const verdictCls = (ok: boolean) =>
    ok ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--rose)] bg-[var(--surface2)]";
  return (
    <div className="mt-4 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
      <h3 className="font-display flex flex-wrap items-center gap-2 text-xl font-semibold text-[var(--text)]">
        <Fi n="pencil" /> Practice Worksheet · <span className="bn">ওয়ার্কবুক প্র্যাকটিস শিট</span>
        <span className="text-sm font-bold text-[var(--dim)]">(Story {String(group.num).padStart(2, "0")})</span>
      </h3>

      {result && (
        <div className="mt-3 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-4" role="status">
          <p className="font-display text-lg font-semibold text-[var(--text)]">
            <Fi n={result.correct / result.total >= 0.6 ? "badge-check" : "book-open-cover"} /> Score: {result.correct} / {result.total} · {Math.round((result.correct / result.total) * 100)}%
          </p>
          <p className="bn mt-1 text-base text-[var(--text)]">
            {result.correct / result.total >= 0.6
              ? "খুব ভালো! তুমি এই গল্পের ইডিয়মগুলো ভালোভাবে বুঝেছ। নিচে প্রতিটি উত্তর দেখে নাও।"
              : "ভালো চেষ্টা! নিচে সঠিক উত্তরগুলো দেখে আবার পড়ে নাও, তারপর আবার চেষ্টা করো।"}
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--dim)]">Your best score for this story is saved. · <span className="bn">এই গল্পে তোমার সেরা স্কোর সংরক্ষিত থাকবে।</span></p>
        </div>
      )}

      <h4 className="font-display mt-5 text-base font-semibold text-[var(--text)]">A. Multiple Choice Questions (MCQ)</h4>
      <p className="bn text-sm text-[var(--dim)]">আন্ডারলাইন করা ইডিয়মের সঠিক অর্থ বেছে নাও।</p>
      <div className="mt-3 space-y-4">
        {idioms.map((it, i) => {
          const ex = it.examples[0];
          return (
            <fieldset key={i} className="rounded-2xl border-2 border-[var(--border)] bg-[var(--surface2)] p-3.5">
              <legend className="sr-only">MCQ question {i + 1}: meaning of {it.idiom}</legend>
              <p className="text-base leading-relaxed text-[var(--text)]">
                <span className="font-extrabold text-[var(--dim)]">{i + 1}. </span>
                {ex ? <UnderlinedStory text={ex[0]} /> : null}
              </p>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {(options[i] ?? []).map((opt, oi) => {
                  const sel = mcq[i] === oi;
                  const isCorrect = submitted && opt === it.meaning;
                  const isWrongPick = submitted && sel && opt !== it.meaning;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      aria-pressed={sel}
                      aria-label={`MCQ ${i + 1} option ${"abcd"[oi]}: ${opt}`}
                      onClick={() => setMcq((prev) => prev.map((v, j) => (j === i ? oi : v)))}
                      className={`rounded-full border-2 px-3.5 py-2 text-left text-sm font-semibold transition active:scale-[0.98] ${
                        isCorrect
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                          : isWrongPick
                            ? "border-[var(--rose)] bg-[var(--surface)] text-[var(--rose)]"
                            : sel
                              ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                      }`}
                    >
                      <span className="font-extrabold">({"abcd"[oi]})</span> {opt}
                      {isCorrect ? " ✓" : isWrongPick ? " ✗" : ""}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`mt-2 text-sm font-bold ${result.mcqOk[i] ? "text-[var(--accent)]" : "text-[var(--rose)]"}`} role="status">
                  {result.mcqOk[i] ? "Correct ✓" : <>Wrong ✗ — correct meaning: {it.meaning} · <span className="bn">{it.meaningBn}</span></>}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <h4 className="font-display mt-6 text-base font-semibold text-[var(--text)]">B. Fill in the Blanks</h4>
      <p className="bn text-sm text-[var(--dim)]">এই গল্পের ইডিয়মগুলো থেকে সঠিকটি বেছে শূন্যস্থান পূরণ করো।</p>
      <div className="mt-2 flex flex-wrap gap-1.5 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--surface2)] p-3" aria-label="Idiom box for fill in the blanks">
        {idioms.map((it, i) => (
          <span key={i} className="rounded-full bg-[var(--surface)] px-2.5 py-1 text-sm font-bold text-[var(--text)] shadow-sm">{it.idiom}</span>
        ))}
      </div>
      <div className="mt-3 space-y-4">
        {idioms.map((it, i) => {
          const ex = it.examples[1];
          return (
            <div key={i} className={`rounded-2xl border-2 bg-[var(--surface2)] p-3.5 ${submitted ? verdictCls(result.fillOk[i] ?? false) : "border-[var(--border)]"}`}>
              <p className="text-base leading-relaxed text-[var(--text)]">
                <span className="font-extrabold text-[var(--dim)]">{i + 1}. </span>
                {ex ? blankIdiomMarks(ex[0]) : ""}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label={`Choose the idiom for blank ${i + 1}`}>
                {idioms.map((choice, ci) => {
                  const sel = fill[i] === ci;
                  const isCorrect = submitted && ci === i;
                  const isWrongPick = submitted && sel && ci !== i;
                  return (
                    <button
                      key={ci}
                      type="button"
                      disabled={submitted}
                      aria-pressed={sel}
                      aria-label={`Blank ${i + 1}: ${choice.idiom}`}
                      onClick={() => setFill((prev) => prev.map((v, j) => (j === i ? ci : v)))}
                      className={`rounded-full border-2 px-3 py-1.5 text-sm font-bold transition active:scale-[0.98] ${
                        isCorrect
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                          : isWrongPick
                            ? "border-[var(--rose)] bg-[var(--surface)] text-[var(--rose)]"
                            : sel
                              ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                      }`}
                    >
                      {choice.idiom}
                      {isCorrect ? " ✓" : isWrongPick ? " ✗" : ""}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`mt-2 text-sm font-bold ${result.fillOk[i] ? "text-[var(--accent)]" : "text-[var(--rose)]"}`} role="status">
                  {result.fillOk[i] ? "Correct ✓" : <>Wrong ✗ — correct idiom: {it.idiom}</>}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <h4 className="font-display mt-6 text-base font-semibold text-[var(--text)]">C. Sentence Making</h4>
      <p className="bn text-sm text-[var(--dim)]">প্রতিটি ইডিয়ম দিয়ে নিজে একটি অর্থপূর্ণ বাক্য লেখো। জমা দিলে মডেল উত্তর দেখা যাবে।</p>
      <div className="mt-3 space-y-4">
        {idioms.map((it, i) => {
          const model = it.examples[2];
          return (
            <div key={i} className={`rounded-2xl border-2 bg-[var(--surface2)] p-3.5 ${submitted ? verdictCls(result.sentOk[i] ?? false) : "border-[var(--border)]"}`}>
              <label htmlFor={`idiom-sent-${group.num}-${i}`} className="font-display text-base font-semibold text-[var(--text)]">
                {i + 1}. {it.idiom}
              </label>
              <p className="bn text-sm text-[var(--dim)]">{it.meaningBn}</p>
              <input
                id={`idiom-sent-${group.num}-${i}`}
                type="text"
                value={sent[i] ?? ""}
                disabled={submitted}
                onChange={(e) => setSent((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
                placeholder="Write your sentence… · তোমার বাক্য লেখো"
                aria-label={`Write a sentence with: ${it.idiom}`}
                className="bn mt-2 w-full rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-base text-[var(--text)] outline-none disabled:opacity-70"
              />
              {submitted && (
                <div className="mt-2.5" role="status">
                  <p className={`text-sm font-bold ${result.sentOk[i] ? "text-[var(--accent)]" : "text-[var(--rose)]"}`}>
                    {result.sentOk[i] ? "Idiom used ✓" : "The idiom was not found in your sentence ✗"}
                  </p>
                  {model && (
                    <p className="mt-1 text-base text-[var(--text)]">
                      <span className="font-bold text-[var(--dim)]">Model answer: </span>
                      <UnderlinedStory text={model[0]} />
                    </p>
                  )}
                  {model && <p className="bn mt-0.5 text-base text-[var(--dim)]">{model[1]}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Btn variant="primary" ariaLabel={`Submit the worksheet for story ${group.num}`} onClick={submit}>
            <Fi n="badge-check" /> Submit · <span className="bn">জমা দাও</span>
          </Btn>
          <span className="text-sm font-semibold text-[var(--dim)]" aria-live="polite">
            {answered} / {idioms.length * 3} answered · <span className="bn">উত্তর দেওয়া হয়েছে</span>
          </span>
        </div>
      ) : (
        <div className="mt-5">
          <Btn variant="soft" ariaLabel={`Try the worksheet for story ${group.num} again`} onClick={reset}>
            <Fi n="refresh" /> Try again · <span className="bn">আবার চেষ্টা করো</span>
          </Btn>
        </div>
      )}
    </div>
  );
}

// One book-style story page: Bengali story, English story, the idiom
// table, the example sentences, and the practice worksheet.
function IdiomStoryDetail({ group, settings, bestPct, onBack }: { group: IdiomStoryGroup; settings: Settings; bestPct: number | null; onBack: () => void }) {
  const [worksheetOpen, setWorksheetOpen] = useState(false);
  const pad = String(group.num).padStart(2, "0");
  return (
    <div>
      <Btn variant="ghost" ariaLabel="Back to all idiom stories" onClick={onBack}>
        ← All stories · <span className="bn">সব গল্প</span>
      </Btn>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-extrabold tracking-wide text-[var(--on-accent)]">STORY {pad}</span>
        <span className="bn rounded-full bg-[var(--surface2)] px-3 py-1 text-xs font-extrabold text-[var(--text)]">গল্পের নমুনা</span>
        {bestPct != null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-extrabold text-[var(--text)]">
            <Fi n="badge-check" /> Best score {bestPct}%
          </span>
        )}
      </div>
      <h2 className="font-display bn mt-2 text-3xl font-semibold text-[var(--text)]">{group.titleBn}</h2>
      <p className="font-display text-lg font-semibold text-[var(--dim)]">{group.titleEn}</p>

      <section aria-label={`Story ${group.num} in Bengali`} className="mt-4 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <p className="bn flex items-center gap-1.5 text-sm font-bold text-[var(--dim)]">
          <Fi n="book-open-cover" /> গল্প · The story in Bengali
        </p>
        <p className="bn mt-2 text-lg leading-relaxed text-[var(--text)]">
          <UnderlinedStory text={group.storyBn} />
        </p>
      </section>

      <section aria-label={`Story ${group.num} in English`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--dim)]">
          <Fi n="book-open-cover" /> The same story in English
        </p>
        <p className="mt-2 text-lg leading-relaxed text-[var(--text)]">
          <UnderlinedStory text={group.storyEn} />
        </p>
        <PvSpeakButton id={`idiom-story-${group.num}-en`} text={stripIdiomMarks(group.storyEn)} settings={settings} variant="example" />
      </section>

      <section aria-label={`Idioms of story ${group.num}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <h3 className="font-display text-lg font-semibold text-[var(--text)]">Idioms in this story · <span className="bn">এই গল্পের ইডিয়ম</span></h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-base">
            <thead>
              <tr className="border-b-2 border-[var(--border)] text-sm text-[var(--dim)]">
                <th scope="col" className="py-2 pr-3 font-extrabold">Idiom</th>
                <th scope="col" className="py-2 pr-3 font-extrabold">English Meaning</th>
                <th scope="col" className="py-2 font-extrabold">Bengali Meaning</th>
              </tr>
            </thead>
            <tbody>
              {group.idioms.map((it, i) => (
                <tr key={i} className="border-b border-[var(--border)] align-top last:border-b-0">
                  <td className="font-display py-2.5 pr-3 font-semibold text-[var(--text)]">{it.idiom}</td>
                  <td className="py-2.5 pr-3 text-[var(--text)]">{it.meaning}</td>
                  <td className="bn py-2.5 font-semibold text-[var(--dim)]">{it.meaningBn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label={`Example sentences for story ${group.num}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <h3 className="font-display text-lg font-semibold text-[var(--text)]">Example Sentences · <span className="bn">ইডিয়মস ও বাক্য প্রয়োগ</span></h3>
        <div className="mt-2 space-y-5">
          {group.idioms.map((it, i) => (
            <div key={i}>
              <h4 className="font-display flex items-center gap-2 text-base font-semibold text-[var(--text)]">
                <span className="text-[var(--dim)]">{i + 1}.</span> {it.idiom}
              </h4>
              <ul className="mt-1.5 space-y-2.5">
                {it.examples.map(([en, bn], ei) => (
                  <li key={ei} className="flex items-start gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-base leading-relaxed text-[var(--text)]">
                        <UnderlinedStory text={en} />
                      </p>
                      <p className="bn mt-0.5 text-base text-[var(--dim)]">{bn}</p>
                    </div>
                    <SpeakBtn text={stripIdiomMarks(en)} settings={settings} label={`Listen to example ${ei + 1} for ${it.idiom}`} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {worksheetOpen ? (
        <IdiomWorksheet key={group.num} group={group} />
      ) : (
        <div className="mt-4 rounded-3xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-center md:p-5">
          <p className="bn text-base text-[var(--dim)]">গল্পটা পড়া শেষ? এবার ওয়ার্কশিট দিয়ে নিজেকে যাচাই করো — MCQ, শূন্যস্থান পূরণ আর বাক্য তৈরি।</p>
          <Btn variant="primary" ariaLabel={`Start the practice worksheet for story ${group.num}`} onClick={() => setWorksheetOpen(true)} className="mt-3">
            <Fi n="pencil" /> Start Practice Worksheet · <span className="bn">প্র্যাকটিস শুরু করো</span>
          </Btn>
          {bestPct != null && <p className="mt-2 text-sm font-semibold text-[var(--dim)]">Best score so far: {bestPct}%</p>}
        </div>
      )}
    </div>
  );
}

function IdiomsPage({ settings, attempts }: { settings: Settings; attempts: State["attempts"] }) {
  const [mode, setMode] = useState<"stories" | "list">("stories");
  const [openNum, setOpenNum] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const bestByStory = useMemo(() => {
    const m = new Map<number, number>();
    for (const a of attempts) {
      const match = /^idiom-story-(\d+)$/.exec(a.kind);
      if (!match || a.total <= 0) continue;
      const num = Number(match[1]);
      const pct = Math.round((a.correct / a.total) * 100);
      if (pct > (m.get(num) ?? -1)) m.set(num, pct);
    }
    return m;
  }, [attempts]);
  const openGroup = openNum != null ? IDIOM_STORY_GROUPS.find((g) => g.num === openNum) : undefined;
  useEffect(() => {
    if (openNum != null) topRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [openNum]);
  const q = query.trim().toLowerCase();
  const filtered = IDIOMS.filter((e) => {
    if (!q) return true;
    const story = IDIOM_STORIES[e.n];
    return (
      e.idiom.toLowerCase().includes(q) ||
      e.meaning.toLowerCase().includes(q) ||
      e.meaningBn.includes(query.trim()) ||
      (story != null &&
        (story.story.replace(/\[\[|\]\]/g, "").toLowerCase().includes(q) ||
          story.storyBn.includes(query.trim())))
    );
  });
  return (
    <div ref={topRef} className="scroll-mt-40">
      <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Idioms and Phrases</h1>
      <p className="bn mt-1 max-w-2xl text-base text-[var(--dim)]">
        {IDIOM_STORY_GROUPS.length}টি বাস্তব জীবনের গল্পে {IDIOMS.length}টি ইডিয়ম — প্রতি গল্পে ৫টি করে ইডিয়ম (শেষ গল্পটিতে ৪টি), অর্থের টেবিল, ৩টি করে উদাহরণ বাক্য আর নিজেকে যাচাই করার প্র্যাকটিস ওয়ার্কশিট। চাইলে নিচে সব ইডিয়মের তালিকাও দেখতে পারো।
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Idioms view: stories or full list">
        <button
          type="button"
          aria-pressed={mode === "stories" && openGroup == null}
          onClick={() => { setMode("stories"); setOpenNum(null); }}
          className={`rounded-full px-4 py-2 text-sm font-extrabold transition active:scale-[0.98] ${mode === "stories" ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]" : "bg-[var(--chip)] text-[var(--text)]"}`}
        >
          <Fi n="book-open-cover" /> Stories · <span className="bn">গল্প</span>
        </button>
        <button
          type="button"
          aria-pressed={mode === "list"}
          onClick={() => { setMode("list"); setOpenNum(null); }}
          className={`rounded-full px-4 py-2 text-sm font-extrabold transition active:scale-[0.98] ${mode === "list" ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]" : "bg-[var(--chip)] text-[var(--text)]"}`}
        >
          <Fi n="list" /> All Idioms · <span className="bn">সব ইডিয়ম</span>
        </button>
      </div>

      {openGroup != null ? (
        <div className="mt-4">
          <IdiomStoryDetail
            key={openGroup.num}
            group={openGroup}
            settings={settings}
            bestPct={bestByStory.get(openGroup.num) ?? null}
            onBack={() => setOpenNum(null)}
          />
        </div>
      ) : mode === "stories" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {IDIOM_STORY_GROUPS.map((g) => {
            const best = bestByStory.get(g.num);
            return (
              <button
                key={g.num}
                type="button"
                aria-label={`Open story ${g.num}: ${g.titleEn} (${g.titleBn})`}
                onClick={() => setOpenNum(g.num)}
                className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[0_4px_14px_rgba(34,26,5,0.06)] transition active:scale-[0.99]"
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--on-accent)]">STORY {String(g.num).padStart(2, "0")}</span>
                  {best != null && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--text)]">
                      <Fi n="badge-check" /> Best {best}%
                    </span>
                  )}
                </span>
                <span className="font-display bn mt-2 block text-xl font-semibold text-[var(--text)]">{g.titleBn}</span>
                <span className="font-display block text-sm font-semibold text-[var(--dim)]">{g.titleEn}</span>
                <span className="mt-2 block text-sm leading-relaxed text-[var(--dim)]">{g.idioms.map((i) => i.idiom).join(" · ")}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <div className="search-pill mt-4 flex items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-sm">
            <Fi n="search" className="text-[var(--dim)]" />
            <input
              aria-label="Search idioms and phrases"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search an idiom… · ইডিয়ম খুঁজুন"
              className="bn min-w-0 flex-1 bg-transparent text-base text-[var(--text)] outline-none"
            />
            {query && (
              <button type="button" aria-label="Clear idiom search" onClick={() => setQuery("")} className="text-[var(--dim)]"><Fi n="cross" /></button>
            )}
          </div>

          <p className="mt-4 text-sm font-semibold text-[var(--dim)]" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "idiom" : "idioms"}{q ? " found" : ""}
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((e) => <IdiomCard key={e.n} entry={e} settings={settings} />)}
          </div>
          {filtered.length === 0 && (
            <p className="bn mt-4 text-base text-[var(--dim)]">কোনো ইডিয়ম পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজুন।</p>
          )}
        </>
      )}
    </div>
  );
}

// ---------- Phrasal Verbs section ----------
// Two views, switched by pills at the top of the page: (1) Stories · গল্প
// — Module 01 book-style story groups (see the PvStoryDetail block
// below); (2) All Phrasal Verbs — the full lists, deliberately simple
// per the learner's original ask: every entry shows only the
// phrasal verb, a short Bengali meaning of the verb, one English example,
// and the Bengali meaning of that example. Every card also has speaker
// buttons (the app's shared speak() helper): a small one beside the verb
// speaks just the verb, and a Listen pill under the example reads the
// example sentence aloud, turning into Stop while it plays. Lists: the most common verbs
// (Grammarly order) in a collapsible dropdown, more common verbs
// (EnglishClub) in a collapsible dropdown, a collapsible Business English
// dropdown (The English Center, 10 groups of 10), and the
// Complete List from the learner's uploaded PDF grouped A–Z in collapsible
// dropdowns. The PDF entries' Bengali translations are generated once by
// the translatePhrasalBatch action and cached server-side.

// Only one phrasal-verb sentence plays at a time across the whole page:
// speak() already cancels whatever was playing, and this shared key mirrors
// which card is speaking so only that card shows Stop. Any other speak()
// call in the app also cancels the current utterance, whose onend/onerror
// then clears the key here.
let pvSpeakingKey: string | null = null;
const pvSpeakingListeners = new Set<() => void>();
function setPvSpeaking(key: string | null) {
  if (pvSpeakingKey === key) return;
  pvSpeakingKey = key;
  pvSpeakingListeners.forEach((l) => l());
}
function stopPvSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  setPvSpeaking(null);
}

// Speaker button for a phrasal-verb card. variant "verb" is the small round
// speaker beside the verb itself (speaks just the verb); variant "example"
// is the Listen pill under the example sentence. While this entry is
// playing the button becomes Stop. Uses the same speak() helper, Settings
// voice/speed and Flaticon icons as the rest of the app.
function PvSpeakButton({ id, text, settings, variant }: { id: string; text: string; settings: Settings; variant: "verb" | "example" }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((t) => t + 1);
    pvSpeakingListeners.add(bump);
    return () => { pvSpeakingListeners.delete(bump); };
  }, []);
  const playing = pvSpeakingKey === id;
  const toggle = () => {
    if (playing) {
      stopPvSpeaking();
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setPvSpeaking(id);
    speak(text, settings, { onEnd: () => { if (pvSpeakingKey === id) setPvSpeaking(null); } });
  };
  if (variant === "verb") {
    return (
      <button
        type="button"
        aria-label={playing ? `Stop: ${text}` : `Listen: ${text}`}
        onClick={toggle}
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-full border-2 shadow-sm transition active:scale-95 ${playing ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]" : "border-[var(--border)] bg-[var(--surface2)] text-[var(--text)]"}`}
      >
        <Fi n={playing ? "stop" : "volume"} className="text-sm" />
      </button>
    );
  }
  return (
    <button
      type="button"
      aria-label={playing ? `Stop listening: ${text}` : `Listen to the sentence: ${text}`}
      onClick={toggle}
      className={`mt-2 inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-sm font-semibold shadow-sm transition active:scale-95 ${playing ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]" : "border-[var(--border)] bg-[var(--surface2)] text-[var(--text)]"}`}
    >
      <Fi n={playing ? "stop" : "volume"} />
      {playing ? <>Stop · <span className="bn">থামুন</span></> : <>Listen · <span className="bn">শুনুন</span></>}
    </button>
  );
}

function PvCard({ pv, n, id, settings }: { pv: PhrasalVerb; n?: number; id: string; settings: Settings }) {
  return (
    <article className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)]">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {n != null && <span className="text-sm font-extrabold text-[var(--dim)]">{n}.</span>}
        <h3 className="font-display text-lg font-semibold text-[var(--text)]">{pv.verb}</h3>
        <PvSpeakButton id={`${id}-verb`} text={pv.verb} settings={settings} variant="verb" />
        <span className="bn text-sm font-semibold text-[var(--dim)]">· {pv.meaningBn}</span>
      </div>
      <p className="mt-2 text-base text-[var(--text)]">{pv.example}</p>
      <PvSpeakButton id={`${id}-example`} text={pv.example} settings={settings} variant="example" />
      <p className="bn mt-1 text-base text-[var(--dim)]">{pv.exampleBn}</p>
    </article>
  );
}

type PvTranslation = { meaningBn: string; exampleBn: string };

function PdfPvCard({ entry, tr, settings }: { entry: PdfPhrasalVerb; tr?: PvTranslation; settings: Settings }) {
  return (
    <article className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)]">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="font-display text-lg font-semibold text-[var(--text)]">{entry.verb}</h3>
        <PvSpeakButton id={`${entry.key}-verb`} text={entry.verb} settings={settings} variant="verb" />
        {tr ? (
          <span className="bn text-sm font-semibold text-[var(--dim)]">· {tr.meaningBn}</span>
        ) : (
          <span className="text-sm font-semibold text-[var(--dim)]">· {entry.meaning}</span>
        )}
      </div>
      <p className="mt-2 text-base text-[var(--text)]">{entry.example}</p>
      <PvSpeakButton id={`${entry.key}-example`} text={entry.example} settings={settings} variant="example" />
      {tr ? (
        <p className="bn mt-1 text-base text-[var(--dim)]">{tr.exampleBn}</p>
      ) : (
        <p className="bn mt-1 text-sm text-[var(--dim)]">বাংলা অনুবাদ তৈরি হচ্ছে…</p>
      )}
    </article>
  );
}

// ---------- Phrasal verb story groups (book-style stories) ----------
// All story modules in the style of the learner's Bengali phrasal-verb
// story book ("গল্পে গল্পে PHRASAL VERBS"), organised module by module
// in learning order (phrasal-stories-all.ts): Module 01 is the book's
// own hand-written module (phrasal-story-groups.ts, untouched); Modules
// 02+ cover the Most common, More common, Business English and Complete
// A–Z lists, at most 10 stories per module. Every story page
// follows the book's order: the Bengali story (verbs underlined inside
// it) plus the same story in English, a table (Phrasal Verb | Bengali
// Meaning | English Meaning), then "English Examples" — one English
// example per verb with the verb underlined and the Bengali meaning of
// the sentence directly underneath. Listen buttons use PvSpeakButton,
// the same speech as the phrasal-verb cards.

const PV_HOW_TO: { bn: string; en: string }[] = [
  { bn: "বাংলা গল্পটি পড়ুন", en: "প্রথমে পুরো গল্পটি পড়ুন; শুধু অর্থ বোঝার চেষ্টা করুন, প্রতিটি Phrasal Verb-এর দিকে খেয়াল করুন।" },
  { bn: "৫টি Phrasal Verb খুঁজে বের করুন", en: "গল্পের ভিতরে আন্ডারলাইন করা পাঁচটি Phrasal Verb খুঁজুন, আর দেখুন কোন পরিস্থিতিতে সেগুলো ব্যবহার হলো।" },
  { bn: "বাংলা ও English অর্থ দেখুন", en: "গল্পের নিচের টেবিলে প্রতিটি Phrasal Verb-এর বাংলা ও English অর্থ পড়ুন।" },
  { bn: "English উদাহরণ পড়ুন", en: "প্রতিটি Phrasal Verb-এর English বাক্যটি পড়ুন, Listen চেপে শুনুন, আর তার নিচে বাংলা অর্থ দেখুন।" },
  { bn: "নিজের বাক্য বানান", en: "প্রতিটি Phrasal Verb দিয়ে নিজের জীবনের একটি বাক্য খাতায় লিখুন বা জোরে বলুন। কয়েক দিন পর গল্পটি আবার পড়ুন।" },
];

function PvHowToGuide() {
  return (
    <section aria-label="How to use this book" className="mt-4 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
      <h2 className="font-display bn text-2xl font-semibold text-[var(--text)]">এই বইটি কীভাবে পড়বেন?</h2>
      <p className="text-sm font-bold tracking-wide text-[var(--dim)]">HOW TO USE THIS BOOK</p>
      <p className="bn mt-2 text-base text-[var(--dim)]">প্রতিটি গল্প সহজ আর মজার; ধাপে ধাপে পড়লেই প্রতিদিন একটু একটু করে শেখা যাবে।</p>
      <ol className="mt-3 space-y-2.5">
        {PV_HOW_TO.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-extrabold text-[var(--on-accent)]">{i + 1}</span>
            <span className="min-w-0 pt-0.5">
              <span className="bn block text-base font-bold text-[var(--text)]">{s.bn}</span>
              <span className="bn block text-base text-[var(--dim)]">{s.en}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// One book-style phrasal-verb story page: Bengali story, English story,
// the phrasal-verb table, and the English Examples. Used by every story
// module (Module 01's book stories and all generated modules alike);
// storyKey keeps the Listen-button ids unique across modules, and the
// Mark-as-read button feeds the per-module progress in the browser.
function PvStoryDetail({ group, moduleNum, storyKey, isDone, onToggleDone, settings, onBack }: { group: PvStoryGroup; moduleNum: number; storyKey: string; isDone: boolean; onToggleDone: () => void; settings: Settings; onBack: () => void }) {
  const pad = String(group.num).padStart(2, "0");
  return (
    <div>
      <Btn variant="ghost" ariaLabel="Back to the module's stories" onClick={onBack}>
        ← Module stories · <span className="bn">মডিউলের গল্প</span>
      </Btn>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-extrabold tracking-wide text-[var(--on-accent)]">STORY {pad}</span>
        <span className="rounded-full bg-[var(--surface2)] px-3 py-1 text-xs font-extrabold text-[var(--text)]">MODULE {String(moduleNum).padStart(2, "0")}</span>
        {isDone && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface2)] px-3 py-1 text-xs font-extrabold text-[var(--text)]">
            <Fi n="check" /> Read · <span className="bn">পড়া হয়েছে</span>
          </span>
        )}
      </div>
      <h2 className="font-display bn mt-2 text-3xl font-semibold text-[var(--text)]">{group.titleBn}</h2>
      <p className="font-display text-lg font-semibold text-[var(--dim)]">{group.titleEn}</p>

      <section aria-label={`Story ${group.num} in Bengali`} className="mt-4 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <p className="bn flex items-center gap-1.5 text-sm font-bold text-[var(--dim)]">
          <Fi n="book-open-cover" /> গল্প · The story in Bengali
        </p>
        <p className="bn mt-2 text-lg leading-relaxed text-[var(--text)]">
          <UnderlinedStory text={group.storyBn} />
        </p>
        <PvSpeakButton id={`pv-story-${storyKey}-bn`} text={stripIdiomMarks(group.storyBn)} settings={settings} variant="example" />
      </section>

      <section aria-label={`Story ${group.num} in English`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--dim)]">
          <Fi n="book-open-cover" /> The same story in English
        </p>
        <p className="mt-2 text-lg leading-relaxed text-[var(--text)]">
          <UnderlinedStory text={group.storyEn} />
        </p>
        <PvSpeakButton id={`pv-story-${storyKey}-en`} text={stripIdiomMarks(group.storyEn)} settings={settings} variant="example" />
      </section>

      <section aria-label={`Phrasal verbs of story ${group.num}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <h3 className="font-display flex items-center gap-1.5 text-lg font-semibold text-[var(--text)]">
          <Fi n="book-open-cover" /> Phrasal Verbs · <span className="bn">এই গল্পের ফ্রেজাল ভার্ব</span>
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-base">
            <thead>
              <tr className="border-b-2 border-[var(--border)] text-sm text-[var(--dim)]">
                <th scope="col" className="py-2 pr-3 font-extrabold">Phrasal Verb</th>
                <th scope="col" className="py-2 pr-3 font-extrabold">Bengali Meaning</th>
                <th scope="col" className="py-2 font-extrabold">English Meaning</th>
              </tr>
            </thead>
            <tbody>
              {group.verbs.map((v, i) => (
                <tr key={i} className="border-b border-[var(--border)] align-top last:border-b-0">
                  <td className="font-display py-2.5 pr-3 font-semibold text-[var(--text)]">{v.verb}</td>
                  <td className="bn py-2.5 pr-3 font-semibold text-[var(--dim)]">{v.meaningBn || "বাংলা অনুবাদ তৈরি হচ্ছে…"}</td>
                  <td className="py-2.5 text-[var(--text)]">{v.meaningEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label={`English examples for story ${group.num}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <h3 className="font-display text-lg font-semibold text-[var(--text)]">English Examples</h3>
        <p className="bn mt-0.5 text-sm text-[var(--dim)]">এবার এই Phrasal Verb গুলো দিয়ে English বাক্যে ব্যবহার করতে শিখুন।</p>
        <div className="mt-3 space-y-3">
          {group.verbs.map((v, i) => (
            <div key={i} className="rounded-2xl border-2 border-[var(--border)] bg-[var(--surface2)] p-3.5">
              <p className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-extrabold text-[var(--on-accent)]">{i + 1}</span>
                <span className="font-display text-sm font-extrabold tracking-wide text-[var(--text)]">{v.verb.toUpperCase()}</span>
              </p>
              <p className="mt-2 text-lg font-semibold leading-relaxed text-[var(--text)]">
                <UnderlinedStory text={v.example[0]} />
              </p>
              <p className="bn mt-0.5 text-base text-[var(--dim)]">{v.example[1] || "বাংলা অনুবাদ তৈরি হচ্ছে…"}</p>
              <PvSpeakButton id={`pv-story-${storyKey}-ex-${i}`} text={stripIdiomMarks(v.example[0])} settings={settings} variant="example" />
            </div>
          ))}
        </div>
        <p className="bn mt-3 flex items-start gap-2 rounded-2xl bg-[var(--accent-soft)] px-3.5 py-2.5 text-base text-[var(--text)]">
          <Fi n="sparkles" className="mt-1 shrink-0" />
          <span>প্রতিটি বাক্য জোরে পড়ুন, তারপর সেই Phrasal Verb দিয়ে নিজের একটি বাক্য বানান।</span>
        </p>
      </section>

      <section aria-label="Mark this story as read" className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <button
          type="button"
          aria-pressed={isDone}
          aria-label={isDone ? `Story ${group.num} is marked as read; tap to undo` : `Mark story ${group.num} as read`}
          onClick={onToggleDone}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-extrabold shadow-sm transition active:scale-[0.98] ${isDone ? "bg-[var(--surface2)] text-[var(--text)] border-2 border-[var(--border)]" : "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]"}`}
        >
          <Fi n="check" />
          {isDone ? <>Read · <span className="bn">পড়া হয়েছে</span></> : <>Mark as read · <span className="bn">পড়া শেষ</span></>}
        </button>
        <p className="bn mt-2 text-sm text-[var(--dim)]">গল্পটি পড়া শেষ হলে এখানে চিহ্ন দিন — মডিউলের অগ্রগতিতে এটি যোগ হবে।</p>
      </section>
    </div>
  );
}

const PV_LETTERS = "abcdefghijklmnopqrstuvwxyz".split("").filter((l) => PV_PDF.some((e) => e.verb.startsWith(l)));

// Stories the learner has marked as read, kept on this device; the module
// browser's per-module progress is counted from these marks.
const PV_DONE_KEY = "els-pv-stories-done-v1";
function loadPvDone(): Set<string> {
  try {
    const raw = window.localStorage.getItem(PV_DONE_KEY);
    const arr: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}
function savePvDone(done: ReadonlySet<string>) {
  try {
    window.localStorage.setItem(PV_DONE_KEY, JSON.stringify([...done]));
  } catch {
    // storage unavailable — the marks simply will not persist
  }
}

const PV_LIST_ORDER: PvModule["listId"][] = ["daily", "common", "more", "business", "az"];

function PhrasalVerbsPage({ settings }: { settings: Settings }) {
  const showBn = settings.showBengali;
  const [pvMode, setPvMode] = useState<"stories" | "all">("stories");
  const [pvModuleId, setPvModuleId] = useState<string | null>(null);
  const [openStoryNum, setOpenStoryNum] = useState<number | null>(null);
  const [pvDone, setPvDone] = useState<ReadonlySet<string>>(() => loadPvDone());
  const pvTopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (openStoryNum != null || pvModuleId != null) pvTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [openStoryNum, pvModuleId]);
  const togglePvDone = (key: string) => {
    setPvDone((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      savePvDone(next);
      return next;
    });
  };
  const pvDoneCount = (m: PvModule) => {
    let c = 0;
    for (let n = 1; n <= m.storyCount; n++) if (pvDone.has(`${m.id}:${n}`)) c++;
    return c;
  };
  const [query, setQuery] = useState("");
  const [commonOpen, setCommonOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const [openLetters, setOpenLetters] = useState<ReadonlySet<string>>(new Set());
  const [translations, setTranslations] = useState<Record<string, PvTranslation>>({});
  const requestedRef = useRef<Set<string>>(new Set());

  const q = query.trim().toLowerCase();
  const matches = (pv: PhrasalVerb) =>
    !q || pv.verb.toLowerCase().includes(q) || pv.meaningBn.includes(q) || pv.example.toLowerCase().includes(q) || pv.exampleBn.includes(q);
  const common = PV_COMMON.filter(matches);
  const more = PV_MORE.filter(matches);
  const bizGroups = PV_BUSINESS_GROUPS.map((g) => ({ ...g, items: g.items.filter(matches) })).filter((g) => g.items.length > 0);
  const bizCount = bizGroups.reduce((s, g) => s + g.items.length, 0);
  const pdfMatches = (e: PdfPhrasalVerb) => {
    if (!q) return true;
    const tr = translations[e.key];
    return (
      e.verb.toLowerCase().includes(q) ||
      e.meaning.toLowerCase().includes(q) ||
      e.example.toLowerCase().includes(q) ||
      (tr != null && (tr.meaningBn.includes(q) || tr.exampleBn.includes(q)))
    );
  };

  // Fetch cached translations for a set of PDF entries, then translate any
  // still missing in small batches (the server caches them permanently).
  const ensureTranslations = useCallback(
    async (entries: PdfPhrasalVerb[]) => {
      const todo = entries.filter((e) => !requestedRef.current.has(e.key));
      if (todo.length === 0) return;
      todo.forEach((e) => requestedRef.current.add(e.key));
      try {
        const cached = await api.getPhrasalTranslations({ keys: todo.map((e) => e.key) });
        if (cached.translations.length > 0) {
          setTranslations((prev) => {
            const next = { ...prev };
            for (const t of cached.translations) next[t.key] = { meaningBn: t.meaningBn, exampleBn: t.exampleBn };
            return next;
          });
        }
        const have = new Set(cached.translations.map((t) => t.key));
        const missing = todo.filter((e) => !have.has(e.key));
        for (let i = 0; i < missing.length; i += 10) {
          const batch = missing.slice(i, i + 10);
          try {
            const res = await api.translatePhrasalBatch({
              items: batch.map((e) => ({ key: e.key, meaning: e.meaning, example: e.example })),
            });
            if (res.translations.length > 0) {
              setTranslations((prev) => {
                const next = { ...prev };
                for (const t of res.translations) next[t.key] = { meaningBn: t.meaningBn, exampleBn: t.exampleBn };
                return next;
              });
            }
          } catch {
            batch.forEach((e) => requestedRef.current.delete(e.key));
          }
        }
      } catch {
        todo.forEach((e) => requestedRef.current.delete(e.key));
      }
    },
    [],
  );

  const toggleLetter = (letter: string) => {
    setOpenLetters((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) next.delete(letter);
      else next.add(letter);
      return next;
    });
    void ensureTranslations(PV_PDF.filter((e) => e.verb.startsWith(letter)));
  };

  // While searching, make sure matches inside the Complete List get their
  // Bengali translations too (first 60 matching entries per search).
  useEffect(() => {
    if (!q) return;
    const found = PV_PDF.filter((e) => e.verb.toLowerCase().includes(q) || e.meaning.toLowerCase().includes(q) || e.example.toLowerCase().includes(q)).slice(0, 60);
    if (found.length > 0) void ensureTranslations(found);
  }, [q, ensureTranslations]);

  const searching = q.length > 0;
  const pdfLetterGroups = PV_LETTERS.map((letter) => ({
    letter,
    all: PV_PDF.filter((e) => e.verb.startsWith(letter)),
  })).map((g) => ({ ...g, items: searching ? g.all.filter(pdfMatches) : g.all }));

  // Story-module navigation: module browser → one module's stories → one
  // story. A–Z module stories are built from the translation cache, so
  // their Bengali fills in as translations arrive.
  const selectedModule = pvModuleId != null ? PV_MODULES.find((m) => m.id === pvModuleId) : undefined;
  const moduleStories: PvStoryGroup[] =
    selectedModule == null
      ? []
      : selectedModule.listId === "az"
        ? buildAzStories(selectedModule, translations)
        : (selectedModule.stories ?? []);
  const openStoryObj =
    selectedModule != null && openStoryNum != null ? moduleStories.find((g) => g.num === openStoryNum) : undefined;

  // Opening a Complete List story fetches its five entries' Bengali
  // translations (cached server-side after the first time).
  useEffect(() => {
    if (selectedModule?.listId === "az" && openStoryNum != null) {
      void ensureTranslations(azStoryEntries(selectedModule, openStoryNum));
    }
  }, [selectedModule, openStoryNum, ensureTranslations]);

  return (
    <div ref={pvTopRef} className="scroll-mt-40">
      <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Phrasal Verbs</h1>
      <p className="bn mt-1 max-w-2xl text-base text-[var(--dim)]">
        গল্পে গল্পে ফ্রেজাল ভার্ব শিখুন — সব ফ্রেজাল ভার্ব এখন মডিউল অনুযায়ী সাজানো: Module 01 থেকে একে একে পড়ুন। প্রতিটি মডিউলে সর্বোচ্চ ১০টি গল্প, প্রতি গল্পে ৫টি ফ্রেজাল ভার্ব, অর্থের টেবিল আর English Examples। সব ফ্রেজাল ভার্বের পুরো তালিকা ও সার্চ আগের মতোই “All Phrasal Verbs”-এ আছে।
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Phrasal verbs view: stories or full list">
        <button
          type="button"
          aria-pressed={pvMode === "stories" && openStoryObj == null}
          onClick={() => { setPvMode("stories"); setOpenStoryNum(null); setPvModuleId(null); }}
          className={`rounded-full px-4 py-2 text-sm font-extrabold transition active:scale-[0.98] ${pvMode === "stories" ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]" : "bg-[var(--chip)] text-[var(--text)]"}`}
        >
          <Fi n="book-open-cover" /> Stories · <span className="bn">গল্প</span>
        </button>
        <button
          type="button"
          aria-pressed={pvMode === "all"}
          onClick={() => { setPvMode("all"); setOpenStoryNum(null); }}
          className={`rounded-full px-4 py-2 text-sm font-extrabold transition active:scale-[0.98] ${pvMode === "all" ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]" : "bg-[var(--chip)] text-[var(--text)]"}`}
        >
          <Fi n="list" /> All Phrasal Verbs · <span className="bn">সব ফ্রেজাল ভার্ব</span>
        </button>
      </div>

      {openStoryObj != null && selectedModule != null ? (
        <div className="mt-4">
          <PvStoryDetail
            key={`${selectedModule.id}-${openStoryObj.num}`}
            group={openStoryObj}
            moduleNum={selectedModule.num}
            storyKey={`${selectedModule.id}-${openStoryObj.num}`}
            isDone={pvDone.has(`${selectedModule.id}:${openStoryObj.num}`)}
            onToggleDone={() => togglePvDone(`${selectedModule.id}:${openStoryObj.num}`)}
            settings={settings}
            onBack={() => setOpenStoryNum(null)}
          />
        </div>
      ) : pvMode === "stories" ? (
        selectedModule != null ? (
          <>
            <div className="mt-4">
              <Btn variant="ghost" ariaLabel="Back to all phrasal verb modules" onClick={() => setPvModuleId(null)}>
                ← All modules · <span className="bn">সব মডিউল</span>
              </Btn>
            </div>
            <section aria-label={`Module ${selectedModule.num}: ${selectedModule.titleEn}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-center shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-6">
              <p className="text-xs font-extrabold tracking-[0.3em] text-[var(--dim)]">MODULE</p>
              <p className="font-display mt-1 text-6xl font-semibold leading-none text-[var(--text)]">{String(selectedModule.num).padStart(2, "0")}</p>
              <h2 className="font-display mt-3 text-2xl font-semibold text-[var(--text)]">{selectedModule.titleEn}</h2>
              <p className="bn mt-1 text-lg font-semibold text-[var(--dim)]">{selectedModule.titleBn}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-[var(--text)]">{selectedModule.storyCount} STORIES</span>
                <span className="rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-[var(--text)]">{selectedModule.verbCount} PHRASAL VERBS</span>
              </div>
              <div className="mx-auto mt-4 max-w-md">
                <div className="h-3 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-valuenow={pvDoneCount(selectedModule)} aria-valuemin={0} aria-valuemax={selectedModule.storyCount} aria-label={`Module ${selectedModule.num} progress: ${pvDoneCount(selectedModule)} of ${selectedModule.storyCount} stories read`}>
                  <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${selectedModule.storyCount > 0 ? Math.round((pvDoneCount(selectedModule) / selectedModule.storyCount) * 100) : 0}%` }} />
                </div>
                <p className="mt-1.5 text-sm font-bold text-[var(--dim)]">
                  {pvDoneCount(selectedModule)} of {selectedModule.storyCount} stories read · <span className="bn">গল্প পড়া হয়েছে</span>
                </p>
              </div>
            </section>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {moduleStories.map((g) => {
                const done = pvDone.has(`${selectedModule.id}:${g.num}`);
                return (
                  <button
                    key={g.num}
                    type="button"
                    aria-label={`Open story ${g.num} of module ${selectedModule.num}: ${g.titleEn} (${g.titleBn})${done ? " — already read" : ""}`}
                    onClick={() => setOpenStoryNum(g.num)}
                    className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[0_4px_14px_rgba(34,26,5,0.06)] transition active:scale-[0.99]"
                  >
                    <span className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--on-accent)]">STORY {String(g.num).padStart(2, "0")}</span>
                      {done && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface2)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--text)]">
                          <Fi n="check" /> Read
                        </span>
                      )}
                    </span>
                    <span className="font-display bn mt-2 block text-xl font-semibold text-[var(--text)]">{g.titleBn}</span>
                    <span className="font-display block text-sm font-semibold text-[var(--dim)]">{g.titleEn}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-[var(--dim)]">{g.verbs.map((v) => v.verb).join(" · ")}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <PvHowToGuide />
            <p className="bn mt-4 text-base text-[var(--dim)]">
              মডিউল অনুযায়ী একে একে পড়ুন — Module 01 থেকে শুরু করুন। প্রতিটি মডিউলে সর্বোচ্চ ১০টি গল্প আছে; গল্প পড়া শেষ হলে “Mark as read” চিহ্ন দিলে মডিউলের অগ্রগতি এখানে দেখা যাবে।
            </p>
            {PV_LIST_ORDER.map((listId) => (
              <section key={listId} aria-label={`${PV_LIST_TITLES[listId].en} story modules`} className="mt-6">
                <SectionTitle>
                  {PV_LIST_TITLES[listId].en} · <span className="bn">{PV_LIST_TITLES[listId].bn}</span>
                </SectionTitle>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {PV_MODULES.filter((m) => m.listId === listId).map((m) => {
                    const done = pvDoneCount(m);
                    const pct = m.storyCount > 0 ? Math.round((done / m.storyCount) * 100) : 0;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        aria-label={`Open module ${m.num}: ${m.titleEn} (${m.titleBn}) — ${m.storyCount} stories, ${m.verbCount} phrasal verbs, ${done} read`}
                        onClick={() => { setPvModuleId(m.id); setOpenStoryNum(null); }}
                        className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[0_4px_14px_rgba(34,26,5,0.06)] transition active:scale-[0.99]"
                      >
                        <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--on-accent)]">MODULE {String(m.num).padStart(2, "0")}</span>
                        <span className="font-display mt-2 block text-lg font-semibold leading-snug text-[var(--text)]">{m.titleEn}</span>
                        <span className="bn block text-base font-semibold text-[var(--dim)]">{m.titleBn}</span>
                        <span className="mt-1.5 block text-sm font-semibold text-[var(--text)]">{m.storyCount} stories · {m.verbCount} phrasal verbs</span>
                        <span className="mt-2.5 block h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]">
                          <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
                        </span>
                        <span className="mt-1 block text-xs font-bold text-[var(--dim)]">
                          {done > 0 ? <>{done} of {m.storyCount} read · <span className="bn">পড়া হয়েছে</span></> : <>Not started · <span className="bn">এখনো শুরু হয়নি</span></>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        )
      ) : (
        <>
      <div className="search-pill mt-4 flex items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-sm">
        <Fi n="search" className="text-[var(--dim)]" />
        <input
          aria-label="Search phrasal verbs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a phrasal verb… · ফ্রেজাল ভার্ব খুঁজুন"
          className="bn min-w-0 flex-1 bg-transparent text-base text-[var(--text)] outline-none"
        />
        {query && (
          <button type="button" aria-label="Clear phrasal verb search" onClick={() => setQuery("")} className="text-[var(--dim)]"><Fi n="cross" /></button>
        )}
      </div>

      <section aria-label="Most common phrasal verbs" className="mt-6">
        <button
          type="button"
          aria-expanded={commonOpen || searching}
          aria-label="Toggle the Most common phrasal verbs section"
          onClick={() => setCommonOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-left shadow-[0_8px_24px_rgba(34,26,5,0.08)] transition active:scale-[0.99]"
        >
          <span className="min-w-0">
            <span className="font-display block text-xl font-semibold text-[var(--text)]">Most common · <span className="bn">সবচেয়ে বেশি ব্যবহৃত</span></span>
            <span className="mt-0.5 block text-sm font-semibold text-[var(--text)]">{common.length} phrasal verbs</span>
          </span>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-transform duration-300 ${commonOpen || searching ? "rotate-180" : ""}`}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false"><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </button>
        {(commonOpen || searching) && (
          <div className="mt-3">
            <div className="grid gap-3 xl:grid-cols-2">
              {common.map((pv) => <PvCard key={`c-${pv.verb}`} pv={pv} n={PV_COMMON.indexOf(pv) + 1} id={`c-${pv.verb}`} settings={settings} />)}
            </div>
            {common.length === 0 && <p className="bn mt-2 text-sm text-[var(--dim)]">কোনো ফ্রেজাল ভার্ব পাওয়া যায়নি।</p>}
          </div>
        )}
      </section>

      <section aria-label="More common phrasal verbs" className="mt-6">
        <button
          type="button"
          aria-expanded={moreOpen || searching}
          aria-label="Toggle the More common phrasal verbs section"
          onClick={() => setMoreOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-left shadow-[0_8px_24px_rgba(34,26,5,0.08)] transition active:scale-[0.99]"
        >
          <span className="min-w-0">
            <span className="font-display block text-xl font-semibold text-[var(--text)]">More common phrasal verbs · <span className="bn">আরও প্রচলিত ফ্রেজাল ভার্ব</span></span>
            <span className="mt-0.5 block text-sm font-semibold text-[var(--text)]">{more.length} phrasal verbs</span>
          </span>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-transform duration-300 ${moreOpen || searching ? "rotate-180" : ""}`}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false"><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </button>
        {(moreOpen || searching) && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-[var(--text)]">{more.length} entries — a verb with more than one meaning appears once for each meaning.</p>
            <div className="mt-2 grid gap-3 xl:grid-cols-2">
              {more.map((pv, i) => <PvCard key={`m-${pv.verb}-${pv.meaningBn}-${i}`} pv={pv} id={`m-${pv.verb}-${pv.meaningBn}-${i}`} settings={settings} />)}
            </div>
            {more.length === 0 && <p className="bn mt-2 text-sm text-[var(--dim)]">কোনো ফ্রেজাল ভার্ব পাওয়া যায়নি।</p>}
          </div>
        )}
      </section>

      <section aria-label="Phrasal Verbs for Business English" className="mt-8">
        <button
          type="button"
          aria-expanded={bizOpen || searching}
          aria-label="Toggle the Phrasal Verbs for Business English section"
          onClick={() => setBizOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 rounded-[2rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-left shadow-[0_8px_24px_rgba(34,26,5,0.08)] transition active:scale-[0.99]"
        >
          <span className="min-w-0">
            <span className="font-display block text-xl font-semibold text-[var(--text)]">Phrasal Verbs for Business English</span>
            <span className="bn mt-0.5 block text-sm text-[var(--dim)]">ব্যবসায়িক ইংরেজির ফ্রেজাল ভার্ব — ১০টি গ্রুপে ১০০টি</span>
          </span>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-transform duration-300 ${bizOpen || searching ? "rotate-180" : ""}`}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false"><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </button>
        {(bizOpen || searching) && (
          <div className="mt-3">
            {bizGroups.map((g) => (
              <div key={g.title} className="mt-4">
                <h3 className="font-display text-lg font-semibold text-[var(--text)]">{g.title} · <span className="bn">{g.titleBn}</span></h3>
                <div className="mt-2 grid gap-3 xl:grid-cols-2">
                  {g.items.map((pv, i) => <PvCard key={`b-${g.title}-${pv.verb}-${i}`} pv={pv} id={`b-${g.title}-${pv.verb}-${i}`} settings={settings} />)}
                </div>
              </div>
            ))}
            {bizCount === 0 && <p className="bn mt-2 text-sm text-[var(--dim)]">কোনো ব্যবসায়িক ফ্রেজাল ভার্ব পাওয়া যায়নি।</p>}
          </div>
        )}
      </section>

      <section aria-label="Complete Phrasal Verbs List" className="mt-8">
        <SectionTitle>Complete list · <span className="bn">সম্পূর্ণ তালিকা (A–Z)</span></SectionTitle>
        <p className="text-sm font-semibold text-[var(--text)]">{PV_PDF.length} entries from the complete list — tap a letter to open it.</p>
        {pdfLetterGroups.map(({ letter, all, items }) => {
          const open = openLetters.has(letter) || (searching && items.length > 0);
          if (searching && items.length === 0) return null;
          return (
            <div key={letter} className="mt-3">
              <button
                type="button"
                aria-expanded={open}
                aria-label={`Toggle phrasal verbs starting with ${letter.toUpperCase()}`}
                onClick={() => toggleLetter(letter)}
                className="flex w-full items-center justify-between gap-3 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-left shadow-sm transition active:scale-[0.99]"
              >
                <span className="font-display text-lg font-semibold text-[var(--text)]">
                  {letter.toUpperCase()} <span className="text-sm font-bold text-[var(--dim)]">· {all.length} verbs</span>
                </span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false"><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </button>
              {open && (
                <div className="mt-3 grid gap-3 xl:grid-cols-2">
                  {items.map((e) => <PdfPvCard key={e.key} entry={e} tr={translations[e.key]} settings={settings} />)}
                </div>
              )}
            </div>
          );
        })}
        {searching && pdfLetterGroups.every((g) => g.items.length === 0) && (
          <p className="bn mt-2 text-sm text-[var(--dim)]">সম্পূর্ণ তালিকায় কোনো ফ্রেজাল ভার্ব পাওয়া যায়নি।</p>
        )}
      </section>
      {showBn && <p className="bn mt-6 text-xs text-[var(--dim)]">সম্পূর্ণ তালিকার বাংলা অনুবাদ প্রতিটি অক্ষরের গ্রুপ প্রথমবার খুললেই তৈরি হয়ে সংরক্ষিত থাকে।</p>}
        </>
      )}
    </div>
  );
}

// ---------- Oxford 3000 section ----------
// A separate section from the 125 lessons, built from the learner's uploaded
// Oxford 3000 (American English) PDF: the PDF supplied only the words, parts
// of speech and CEFR levels; every definition, Bengali meaning, example,
// synonym/antonym and story is original app content (see oxford.ts).
// Order, as the learner asked: Everyday Life & Spoken English first, then
// A1 → A2 → B1 → B2 (the PDF itself covers A1–B2 only).
type OxWordState = State["oxfordWords"][number];

function oxStateOf(state: State, w: OxWord): OxWordState | undefined {
  return state.oxfordWords.find((x) => x.entryKey === w.key);
}

function oxKnown(s: OxWordState | undefined): boolean {
  return !!s && (s.known || s.mastery === "mastered");
}

function OxWordCard({ word, state, settings, showBn }: { word: OxWord; state: State; settings: Settings; showBn: boolean }) {
  const qc = useQueryClient();
  const ws = oxStateOf(state, word);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState(ws?.note ?? "");
  const [storyOpen, setStoryOpen] = useState(false);
  const [saveError, setSaveError] = useState("");
  const flags = useMutation({
    mutationFn: async (patch: { saved?: boolean; known?: boolean; difficult?: boolean; note?: string }) =>
      await api.setOxfordFlags({
        entryKey: word.key,
        level: word.level,
        english: word.word,
        bengali: word.bn,
        ...patch,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
    onError: (e) => setSaveError(e instanceof Error ? e.message : "Could not save — try again."),
  });
  const cat = EVERYDAY_CATS.find((c) => c.id === word.everydayCat);
  return (
    <article className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_6px_20px_rgba(34,26,5,0.07)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xl font-bold break-words text-[var(--text)]">
            {word.word}
            {word.qualifier && <span className="text-sm font-semibold text-[var(--dim)]"> ({word.qualifier})</span>}
          </h3>
          <p className="text-xs font-medium tracking-wide text-[var(--accent)]">
            {word.posLabel} · <span className="font-bold">{word.level}</span>
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {cat && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-bold text-[var(--on-accent)]">
                <Fi n="star" solid /> Everyday · <span className="bn">{cat.bn}</span>
              </span>
            )}
            {ws?.mastery && ws.mastery !== "new" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface2)] px-2.5 py-0.5 text-xs font-bold text-[var(--text)]">
                <Fi n="check" /> {ws.mastery}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1.5">
          <SpeakBtn text={word.word} settings={settings} />
          <SpeakBtn text={word.word} settings={settings} slow label={`Listen slowly: ${word.word}`} />
        </div>
      </div>

      {showBn && <p className="bn mt-2 text-lg font-semibold text-[var(--text)]">{word.bn}</p>}
      <p className="mt-2 text-sm text-[var(--text)]">{word.defEn}</p>
      {showBn && <p className="bn mt-1 text-sm text-[var(--dim)]">{word.defBn}</p>}

      <div className="mt-3 rounded-xl bg-[var(--surface2)] p-3">
        <p className="text-sm text-[var(--text)]">
          <span className="font-semibold">Example: </span>
          {word.exEn}
          <button type="button" aria-label={`Listen to example: ${word.exEn}`} className="ml-2" onClick={() => speak(word.exEn, settings)}><Fi n="volume" /></button>
        </p>
        {showBn && <p className="bn mt-1 text-sm text-[var(--dim)]">{word.exBn}</p>}
      </div>

      {word.synonyms.length > 0 && (
        <RelGroup title="Synonyms · সমার্থক শব্দ" rels={word.synonyms} settings={settings} showBn={showBn} />
      )}
      {word.antonyms.length > 0 ? (
        <RelGroup title="Antonyms · বিপরীত শব্দ" rels={word.antonyms} settings={settings} showBn={showBn} />
      ) : (
        <div className="mt-2">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--dim)]">Antonyms · বিপরীত শব্দ</p>
          <p className="mt-1 text-sm italic text-[var(--dim)]">
            {word.antonymNote ?? "No antonym with a confirmed Bengali meaning is available for this word yet."}
          </p>
        </div>
      )}

      <div className="mt-3">
        <button
          type="button"
          aria-expanded={storyOpen}
          aria-label={`${storyOpen ? "Hide" : "Read"} the short story for ${word.word}`}
          onClick={() => setStoryOpen(!storyOpen)}
          className={`inline-flex min-h-[2.75rem] items-center gap-2.5 rounded-full border-2 py-2 pl-4 pr-2 text-sm font-bold shadow-[0_4px_0_rgba(34,26,5,0.10)] transition active:scale-[0.98] active:shadow-none ${storyOpen ? "border-[var(--text)] bg-[var(--surface2)] text-[var(--text)]" : "border-[var(--border)] bg-[var(--surface2)] text-[var(--text)]"}`}
        >
          <Fi n="book-open-cover" className="text-base leading-none" />
          <span className="whitespace-nowrap">Short story · <span className="bn">ছোট গল্প</span></span>
          <span aria-hidden className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] transition-transform duration-200 ${storyOpen ? "rotate-180" : ""}`}>
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false"><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </button>
        {storyOpen && (
          <div className="mt-2 rounded-xl bg-[var(--surface2)] p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-[var(--text)]">
                {word.micro.titleEn}
                {showBn && <span className="bn text-sm font-normal text-[var(--dim)]"> · {word.micro.titleBn}</span>}
              </p>
              <Btn ariaLabel={`Listen to the short story for ${word.word}`} onClick={() => speakAll(word.micro.lines.map((l) => l.en), settings)}>
                <Fi n="play" /> Listen to story
              </Btn>
            </div>
            <div className="mt-2 space-y-1.5">
              {word.micro.lines.map((line, i) => (
                <div key={i}>
                  <p className="flex items-start gap-2 text-sm text-[var(--text)]">
                    <button type="button" aria-label={`Listen to story sentence ${i + 1} for ${word.word}`} onClick={() => speak(line.en, settings)}><Fi n="volume" /></button>
                    <span>{highlight(line.en, word.word)}</span>
                  </p>
                  {showBn && <p className="bn mt-0.5 pl-7 text-sm text-[var(--dim)]">{line.bn}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Btn variant={ws?.saved ? "primary" : "soft"} ariaLabel={`${ws?.saved ? "Unsave" : "Save"} Oxford word ${word.word}`} onClick={() => flags.mutate({ saved: !ws?.saved })}>
          {ws?.saved ? <><Fi n="star" solid /> Saved</> : <><Fi n="star" /> Save</>}
        </Btn>
        <Btn variant={ws?.known ? "primary" : "soft"} ariaLabel={`Mark Oxford word ${word.word} as known`} onClick={() => flags.mutate({ known: !ws?.known })}>
          <Fi n="check" /> Known
        </Btn>
        <Btn variant={ws?.difficult ? "danger" : "soft"} ariaLabel={`Mark Oxford word ${word.word} as difficult`} onClick={() => flags.mutate({ difficult: !ws?.difficult })}>
          <Fi n="flag" /> Difficult
        </Btn>
        <Btn variant="ghost" ariaLabel={`Add a note for Oxford word ${word.word}`} onClick={() => setNoteOpen(!noteOpen)}>
          <Fi n="memo" /> Note
        </Btn>
      </div>
      {saveError && <p className="mt-2 text-sm font-semibold text-[var(--rose)]">{saveError}</p>}

      {noteOpen && (
        <div className="mt-2 flex gap-2">
          <input
            {...FIELDS.setOxfordFlags.note}
            aria-label={`Personal note for Oxford word ${word.word}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="আপনার নোট লিখুন…"
            className="bn min-w-0 flex-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-base text-[var(--text)]"
          />
          <Btn variant="primary" ariaLabel="Save note" onClick={() => flags.mutate({ note })}>Save</Btn>
        </div>
      )}
      {ws?.nextReviewAt && (
        <p className="mt-2 text-xs text-[var(--dim)]">
          Mastery: {ws.mastery} · Next review: {new Date(ws.nextReviewAt).toLocaleDateString()}
        </p>
      )}
    </article>
  );
}

// Deterministic spread pick so a flashcard/quiz set is stable per session.
function oxPick(words: OxWord[], count: number, seed: number): OxWord[] {
  if (words.length <= count) return [...words];
  const out: OxWord[] = [];
  const step = words.length / count;
  for (let i = 0; i < count; i++) {
    let j = Math.floor(i * step + (seed % Math.max(1, Math.floor(step)))) % words.length;
    let guard = 0;
    while (guard < words.length && out.some((w) => w.key === words[j]?.key)) {
      j = (j + 1) % words.length;
      guard++;
    }
    const w = words[j];
    if (w) out.push(w);
  }
  return out;
}

function OxFlashcards({ words, settings, label }: { words: OxWord[]; settings: Settings; state: State; label: string }) {
  const qc = useQueryClient();
  const [order, setOrder] = useState<OxWord[]>(() => oxPick(words, Math.min(20, words.length), 3));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [graded, setGraded] = useState(0);
  const grade = useMutation({
    mutationFn: async (a: { w: OxWord; g: "again" | "hard" | "good" | "easy" }) =>
      await api.gradeOxfordWord({ entryKey: a.w.key, level: a.w.level, english: a.w.word, bengali: a.w.bn, grade: a.g }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const card = order[idx];
  const showBn = settings.showBengali;
  if (!card) return <p className="bn text-[var(--dim)]">এই অংশে এখনো কোনো শব্দ নেই।</p>;
  const doneAll = idx >= order.length;
  return (
    <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-lg font-semibold text-[var(--text)]">Flashcards · <span className="bn">ফ্ল্যাশকার্ড</span> — {label}</p>
        <Btn
          ariaLabel="Shuffle Oxford flashcards"
          onClick={() => {
            setOrder(oxPick(words, Math.min(20, words.length), Math.floor(Math.random() * 997) + 1));
            setIdx(0);
            setFlipped(false);
            setGraded(0);
          }}
        >
          <Fi n="refresh" /> Shuffle
        </Btn>
      </div>
      {doneAll ? (
        <div className="py-6 text-center">
          <p className="text-lg font-bold text-[var(--text)]">Session complete! · <span className="bn">সেশন শেষ!</span></p>
          <p className="bn mt-1 text-sm text-[var(--dim)]">{graded}টি কার্ড গ্রেড করা হয়েছে — গ্রেড অনুযায়ী শব্দগুলো আবার রিভিউতে আসবে।</p>
          <Btn
            variant="primary"
            ariaLabel="Restart Oxford flashcards"
            className="mt-3"
            onClick={() => { setIdx(0); setFlipped(false); setGraded(0); }}
          >
            <Fi n="refresh" /> Go again
          </Btn>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm text-[var(--dim)]">Card {idx + 1} of {order.length} · tap the card to flip · <span className="bn">কার্ডটি উল্টাতে চাপ দিন</span></p>
          <div className="flashcard-scene mt-2">
            <button
              type="button"
              aria-label={flipped ? `Flashcard back: ${card.word} means ${card.bn}. Tap to flip back` : `Flashcard front: ${card.word}. Tap to see the meaning`}
              onClick={() => setFlipped(!flipped)}
              className="block w-full text-left"
            >
              <div className={`flashcard-inner min-h-44 ${flipped ? "flipped" : ""}`}>
                <div className="flashcard-face flex flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-[var(--surface2)] p-5">
                  <p className="text-center text-3xl font-bold break-words text-[var(--text)]">{card.word}</p>
                  <p className="text-sm text-[var(--dim)]">{card.posLabel}</p>
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)]" onClick={(e) => { e.stopPropagation(); speak(card.word, settings); }}>
                    <Fi n="volume" className="text-lg" />
                  </span>
                </div>
                <div className="flashcard-face flashcard-back flex flex-col items-center justify-center gap-1.5 rounded-[1.5rem] bg-[var(--accent-soft)] p-5">
                  {showBn && <p className="bn text-center text-2xl font-bold text-[var(--text)]">{card.bn}</p>}
                  <p className="text-center text-sm text-[var(--text)]">{card.defEn}</p>
                  <p className="text-center text-sm italic text-[var(--dim)]">{card.exEn}</p>
                </div>
              </div>
            </button>
          </div>
          {flipped && (
            <div className="mt-3 grid grid-cols-4 gap-1.5" role="group" aria-label="Grade this flashcard">
              {(["again", "hard", "good", "easy"] as const).map((g) => (
                <Btn
                  key={g}
                  variant={g === "again" ? "danger" : g === "easy" ? "primary" : "soft"}
                  ariaLabel={`Grade ${card.word} as ${g}`}
                  onClick={() => {
                    grade.mutate({ w: card, g });
                    setGraded((n) => n + 1);
                    setFlipped(false);
                    setIdx((i) => i + 1);
                  }}
                >
                  {g === "again" ? "Again" : g === "hard" ? "Hard" : g === "good" ? "Good" : "Easy"}
                </Btn>
              ))}
            </div>
          )}
          <p className="bn mt-2 text-xs text-[var(--dim)]">গ্রেড দিলে শব্দটি স্পেসড রিপিটিশন অনুযায়ী আবার আসবে — ঠিক পাঠের শব্দের মতো।</p>
        </>
      )}
    </div>
  );
}

function OxQuizInner({ words, settings, label, onRestart }: { words: OxWord[]; settings: Settings; label: string; onRestart: () => void }) {
  const qc = useQueryClient();
  const questions = useMemo(() => {
    const picked = oxPick(words, Math.min(10, words.length), 11);
    return picked.map((w, qi) => {
      const others = words.filter((x) => x.key !== w.key);
      const distract: string[] = [];
      for (let k = 0; k < 3 && others.length > 0; k++) {
        const cand = others[(qi * 7 + k * 13 + 5) % others.length];
        if (cand && !distract.includes(cand.bn) && cand.bn !== w.bn) distract.push(cand.bn);
      }
      const options = [w.bn, ...distract];
      const pos = qi % options.length;
      const rotated = [...options.slice(pos), ...options.slice(0, pos)];
      return { w, options: rotated, answer: rotated.indexOf(w.bn) };
    });
  }, [words]);
  const [idx, setIdx] = useState(0);
  const [pickedOpt, setPickedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const record = useMutation({
    mutationFn: async (a: { total: number; correct: number }) =>
      await api.recordAttempt({ lessonNumber: null, kind: "oxford-quiz", total: a.total, correct: a.correct }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["state"] }),
  });
  const q = questions[idx];
  if (questions.length === 0) return <p className="bn text-[var(--dim)]">কুইজের জন্য যথেষ্ট শব্দ নেই।</p>;
  if (finished || !q) {
    return (
      <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-center shadow-sm">
        <p className="font-display text-2xl font-semibold text-[var(--text)]">{score} / {questions.length}</p>
        <p className="bn mt-1 text-sm text-[var(--dim)]">
          {score >= Math.ceil(questions.length * 0.7) ? "দারুণ! এই অংশের শব্দগুলো ভালো শিখেছেন।" : "ভালো চেষ্টা! শব্দগুলো আবার দেখে আবার চেষ্টা করুন।"}
        </p>
        <Btn variant="primary" ariaLabel="Start a new Oxford quiz" className="mt-3" onClick={onRestart}>
          <Fi n="refresh" /> New quiz · <span className="bn">নতুন কুইজ</span>
        </Btn>
      </div>
    );
  }
  return (
    <div className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
      <p className="font-display text-lg font-semibold text-[var(--text)]">Quiz · <span className="bn">কুইজ</span> — {label}</p>
      <p className="mt-1 text-sm text-[var(--dim)]">Question {idx + 1} of {questions.length} · Score: {score}</p>
      <div className="mt-3 flex items-center gap-2">
        <p className="text-xl font-bold text-[var(--text)]">What does “{q.w.word}” mean?</p>
        <button type="button" aria-label={`Listen: ${q.w.word}`} onClick={() => speak(q.w.word, settings)} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface2)]"><Fi n="volume" /></button>
      </div>
      <div className="mt-3 grid gap-2">
        {q.options.map((opt, oi) => {
          const isAnswer = oi === q.answer;
          const isPicked = pickedOpt === oi;
          return (
            <button
              key={oi}
              type="button"
              disabled={pickedOpt !== null}
              aria-label={`Answer option: ${opt}`}
              onClick={() => {
                setPickedOpt(oi);
                if (isAnswer) setScore((s) => s + 1);
              }}
              className={`bn rounded-full border-2 px-4 py-2.5 text-left text-base font-semibold transition ${
                pickedOpt === null
                  ? "border-[var(--border)] bg-[var(--surface2)] text-[var(--text)]"
                  : isAnswer
                    ? "border-transparent bg-[var(--accent)] text-[var(--on-accent)]"
                    : isPicked
                      ? "border-transparent bg-[var(--rose)] text-white"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--dim)]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {pickedOpt !== null && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-[var(--text)]">
            {pickedOpt === q.answer ? "Correct!" : `Not quite — “${q.w.word}” means ${q.w.bn}.`}
          </p>
          <Btn
            variant="primary"
            ariaLabel={idx + 1 >= questions.length ? "Finish the Oxford quiz" : "Next quiz question"}
            onClick={() => {
              if (idx + 1 >= questions.length) {
                record.mutate({ total: questions.length, correct: score });
                setFinished(true);
              } else {
                setIdx(idx + 1);
                setPickedOpt(null);
              }
            }}
          >
            {idx + 1 >= questions.length ? "Finish" : "Next"}
          </Btn>
        </div>
      )}
    </div>
  );
}

function OxQuiz({ words, settings, label }: { words: OxWord[]; settings: Settings; label: string }) {
  const [session, setSession] = useState(0);
  return <OxQuizInner key={session} words={words} settings={settings} label={label} onRestart={() => setSession((s) => s + 1)} />;
}

// ---------- Oxford 3000 book-style stories ----------
// All 3,003 Oxford words grouped into stories of 10 (302 stories),
// module by module in learning order — Everyday Life first, then the
// remaining A1, A2, B1 and B2 words (oxford-stories.ts) — in the style
// of the learner's vocabulary story book: each story is numbered
// গল্প ০১, ০২, … with a Bengali title, one connected Bengali story with
// its 10 words bold + underlined inside it and a Listen button, then a
// "Vocabulary List" table (শব্দ | উচ্চারণ | অর্থ — Bengali meaning plus
// the English synonym in brackets), then one detail card per word with
// an English example (word underlined, Bengali underneath, Listen) and
// a little story for every synonym and antonym (word underlined,
// Bengali underneath, Listen). Words with no natural antonym say so
// honestly. Read marks live on this device, like the phrasal stories.

const OX_HOW_TO: { bn: string; en: string }[] = [
  { bn: "বাংলা গল্পটি পড়ুন", en: "প্রথমে পুরো গল্পটি পড়ুন; গল্পের ভিতরে বোল্ড ও আন্ডারলাইন করা ১০টি Oxford শব্দ খেয়াল করুন।" },
  { bn: "Vocabulary List দেখুন", en: "গল্পের নিচের টেবিলে প্রতিটি শব্দের বাংলা উচ্চারণ আর অর্থ (বন্ধনীতে English সমার্থক শব্দ) পড়ুন।" },
  { bn: "English উদাহরণ পড়ুন", en: "প্রতিটি শব্দের English উদাহরণ বাক্যটি পড়ুন, Listen চেপে শুনুন, আর তার নিচে বাংলা অর্থ দেখুন।" },
  { bn: "সমার্থক ও বিপরীত শব্দের ছোট গল্প পড়ুন", en: "প্রতিটি সমার্থক ও বিপরীত শব্দের নিজের ছোট্ট গল্প আছে — গল্পটি পড়ুন, শুনুন, আর শব্দটি কীভাবে ব্যবহার হয় বুঝুন।" },
  { bn: "মডিউল ধরে এগিয়ে যান", en: "Module 01 থেকে একে একে পড়ুন; গল্প পড়া শেষ হলে “Mark as read” চিহ্ন দিন, মডিউলের অগ্রগতি এখানেই দেখা যাবে।" },
];

function OxHowToGuide() {
  return (
    <section aria-label="How to read the Oxford stories" className="mt-4 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
      <h2 className="font-display bn text-2xl font-semibold text-[var(--text)]">এই বইটি কীভাবে পড়বেন?</h2>
      <p className="text-sm font-bold tracking-wide text-[var(--dim)]">HOW TO USE THIS BOOK</p>
      <p className="bn mt-2 text-base text-[var(--dim)]">প্রতিটি গল্পে ১০টি করে Oxford 3000 শব্দ — গল্প পড়ুন, শব্দের তালিকা দেখুন, উদাহরণ আর ছোট গল্পগুলো শুনুন।</p>
      <ol className="mt-3 space-y-2.5">
        {OX_HOW_TO.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-extrabold text-[var(--on-accent)]">{i + 1}</span>
            <span className="min-w-0 pt-0.5">
              <span className="bn block text-base font-bold text-[var(--text)]">{s.bn}</span>
              <span className="bn block text-base text-[var(--dim)]">{s.en}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// The little stories of one word's synonyms / antonyms: each related
// word gets its own 1–2 sentence English story (the word underlined),
// the Bengali meaning of that story directly underneath, and a Listen
// button — generated by oxRelStory from the app's own relation data.
function OxRelStories({ sw, kind, storyNum, wordIdx, settings }: { sw: OxStoryWord; kind: "syn" | "ant"; storyNum: number; wordIdx: number; settings: Settings }) {
  const rels = kind === "syn" ? sw.word.synonyms : sw.word.antonyms;
  if (kind === "ant" && rels.length === 0) {
    return (
      <div className="mt-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--dim)]">Antonyms · <span className="bn">বিপরীত শব্দ</span></p>
        <p className="mt-1 text-sm italic text-[var(--dim)]">
          {sw.word.antonymNote ?? "No natural antonym for this meaning — English has no true opposite for this word, so none is invented here."}
        </p>
        <p className="bn mt-0.5 text-sm text-[var(--dim)]">এই শব্দের কোনো স্বাভাবিক বিপরীত শব্দ নেই — তাই এখানে জোর করে কোনো বিপরীত শব্দ বানানো হয়নি।</p>
      </div>
    );
  }
  if (rels.length === 0) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--dim)]">
        {kind === "syn" ? <>Synonyms · <span className="bn">সমার্থক শব্দ</span></> : <>Antonyms · <span className="bn">বিপরীত শব্দ</span></>}
      </p>
      <div className="mt-2 space-y-2.5">
        {rels.map((rel, j) => {
          const story = oxRelStory(sw.word, rel, kind);
          return (
            <div key={`${rel.en}-${j}`} className="rounded-2xl bg-[var(--surface2)] p-3">
              <p className="text-sm font-bold text-[var(--text)]">
                {rel.en} <span className="bn font-semibold text-[var(--dim)]">— {rel.bn}</span>
              </p>
              <p className="mt-1 text-base leading-relaxed text-[var(--text)]">
                <UnderlinedStory text={story.en} />
              </p>
              <p className="bn mt-0.5 text-base text-[var(--dim)]">{story.bn}</p>
              <PvSpeakButton id={`ox-story-${storyNum}-w${wordIdx}-${kind}-${j}`} text={stripIdiomMarks(story.en)} settings={settings} variant="example" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// One word of a story, in detail: its English example (word underlined,
// Bengali meaning underneath, Listen) plus the synonym/antonym stories.
function OxStoryWordDetail({ sw, idx, storyNum, settings }: { sw: OxStoryWord; idx: number; storyNum: number; settings: Settings }) {
  const w = sw.word;
  return (
    <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--surface2)] p-3.5">
      <p className="flex flex-wrap items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-extrabold text-[var(--on-accent)]">{idx + 1}</span>
        <span className="font-display text-base font-extrabold tracking-wide text-[var(--text)]">{w.word.toUpperCase()}</span>
        <span className="bn text-sm font-semibold text-[var(--dim)]">{sw.pronBn}</span>
        <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-xs font-extrabold text-[var(--text)]">{w.level}</span>
      </p>
      <p className="bn mt-1.5 text-base font-semibold text-[var(--text)]">{w.bn}{sw.synonymEn ? <span className="font-semibold text-[var(--dim)]"> ({sw.synonymEn})</span> : null}</p>
      <p className="mt-2 text-lg font-semibold leading-relaxed text-[var(--text)]">
        <UnderlinedStory text={sw.example[0]} />
      </p>
      <p className="bn mt-0.5 text-base text-[var(--dim)]">{sw.example[1]}</p>
      <PvSpeakButton id={`ox-story-${storyNum}-ex-${idx}`} text={stripIdiomMarks(sw.example[0])} settings={settings} variant="example" />
      <OxRelStories sw={sw} kind="syn" storyNum={storyNum} wordIdx={idx} settings={settings} />
      <OxRelStories sw={sw} kind="ant" storyNum={storyNum} wordIdx={idx} settings={settings} />
    </div>
  );
}

// One book-style Oxford story page: the Bengali story, the Vocabulary
// List table, then the per-word examples and relation stories.
function OxStoryDetail({ story, moduleNum, isDone, onToggleDone, settings, onBack }: { story: OxStory; moduleNum: number; isDone: boolean; onToggleDone: () => void; settings: Settings; onBack: () => void }) {
  const paragraphs = story.storyBn.split(/\n\n+/).filter((p) => p.trim().length > 0);
  return (
    <div>
      <Btn variant="ghost" ariaLabel="Back to the module's Oxford stories" onClick={onBack}>
        ← Module stories · <span className="bn">মডিউলের গল্প</span>
      </Btn>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="bn rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-extrabold tracking-wide text-[var(--on-accent)]">গল্প {oxBnPad(story.num)}</span>
        <span className="rounded-full bg-[var(--surface2)] px-3 py-1 text-xs font-extrabold text-[var(--text)]">STORY {String(story.num).padStart(2, "0")}</span>
        <span className="rounded-full bg-[var(--surface2)] px-3 py-1 text-xs font-extrabold text-[var(--text)]">MODULE {String(moduleNum).padStart(2, "0")}</span>
        {isDone && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface2)] px-3 py-1 text-xs font-extrabold text-[var(--text)]">
            <Fi n="check" /> Read · <span className="bn">পড়া হয়েছে</span>
          </span>
        )}
      </div>
      <h2 className="font-display bn mt-2 text-3xl font-semibold text-[var(--text)]">{story.titleBn}</h2>
      <p className="font-display text-lg font-semibold text-[var(--dim)]">{story.titleEn}</p>

      <section aria-label={`Story ${story.num} in Bengali`} className="mt-4 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <p className="bn flex items-center gap-1.5 text-sm font-bold text-[var(--dim)]">
          <Fi n="book-open-cover" /> গল্প · The story in Bengali
        </p>
        {paragraphs.map((p, i) => (
          <p key={i} className="bn mt-2 text-lg leading-relaxed text-[var(--text)]">
            <UnderlinedStory text={p} />
          </p>
        ))}
        <PvSpeakButton id={`ox-story-${story.num}-bn`} text={stripIdiomMarks(story.storyBn)} settings={settings} variant="example" />
      </section>

      <section aria-label={`Vocabulary list of story ${story.num}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <h3 className="font-display flex items-center gap-1.5 text-lg font-semibold text-[var(--text)]">
          <Fi n="book-open-cover" /> Vocabulary List · <span className="bn">শব্দের তালিকা</span>
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-base">
            <thead>
              <tr className="border-b-2 border-[var(--border)] text-sm text-[var(--dim)]">
                <th scope="col" className="bn py-2 pr-3 font-extrabold">শব্দ (Word)</th>
                <th scope="col" className="bn py-2 pr-3 font-extrabold">উচ্চারণ</th>
                <th scope="col" className="bn py-2 font-extrabold">অর্থ (Meaning)</th>
              </tr>
            </thead>
            <tbody>
              {story.words.map((sw, i) => (
                <tr key={sw.word.key} className="border-b border-[var(--border)] align-top last:border-b-0">
                  <td className="font-display py-2.5 pr-3 font-semibold text-[var(--text)]">{sw.word.word}</td>
                  <td className="bn py-2.5 pr-3 font-semibold text-[var(--dim)]">{sw.pronBn}</td>
                  <td className="bn py-2.5 text-[var(--text)]">
                    {sw.word.bn}
                    {sw.synonymEn ? <span className="font-semibold text-[var(--dim)]"> ({sw.synonymEn})</span> : null}
                    <span className="sr-only">Word {i + 1} of story {story.num}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label={`Examples and word stories for story ${story.num}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <h3 className="font-display text-lg font-semibold text-[var(--text)]">Word Examples &amp; Stories · <span className="bn">উদাহরণ ও ছোট গল্প</span></h3>
        <p className="bn mt-0.5 text-sm text-[var(--dim)]">প্রতিটি শব্দের একটি English উদাহরণ, আর প্রতিটি সমার্থক ও বিপরীত শব্দের নিজের ছোট্ট গল্প — Listen চেপে শুনুন।</p>
        <div className="mt-3 space-y-3">
          {story.words.map((sw, i) => (
            <OxStoryWordDetail key={sw.word.key} sw={sw} idx={i} storyNum={story.num} settings={settings} />
          ))}
        </div>
        <p className="bn mt-3 flex items-start gap-2 rounded-2xl bg-[var(--accent-soft)] px-3.5 py-2.5 text-base text-[var(--text)]">
          <Fi n="sparkles" className="mt-1 shrink-0" />
          <span>প্রতিটি উদাহরণ জোরে পড়ুন, তারপর সেই শব্দ দিয়ে নিজের একটি বাক্য বানান।</span>
        </p>
      </section>

      <section aria-label="Mark this Oxford story as read" className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-5">
        <button
          type="button"
          aria-pressed={isDone}
          aria-label={isDone ? `Story ${story.num} is marked as read; tap to undo` : `Mark story ${story.num} as read`}
          onClick={onToggleDone}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-extrabold shadow-sm transition active:scale-[0.98] ${isDone ? "bg-[var(--surface2)] text-[var(--text)] border-2 border-[var(--border)]" : "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]"}`}
        >
          <Fi n="check" />
          {isDone ? <>Read · <span className="bn">পড়া হয়েছে</span></> : <>Mark as read · <span className="bn">পড়া শেষ</span></>}
        </button>
        <p className="bn mt-2 text-sm text-[var(--dim)]">গল্পটি পড়া শেষ হলে এখানে চিহ্ন দিন — মডিউলের অগ্রগতিতে এটি যোগ হবে।</p>
      </section>
    </div>
  );
}

const OX_DONE_KEY = "els-ox-stories-done-v1";
function loadOxDone(): Set<number> {
  try {
    const raw = window.localStorage.getItem(OX_DONE_KEY);
    const arr: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((x): x is number => typeof x === "number") : []);
  } catch {
    return new Set();
  }
}
function saveOxDone(done: ReadonlySet<number>) {
  try {
    window.localStorage.setItem(OX_DONE_KEY, JSON.stringify([...done]));
  } catch {
    // storage unavailable — the marks simply will not persist
  }
}

// The Oxford story browser: modules in learning order (Everyday Life,
// then A1, A2, B1, B2), one module's stories in order, then one story.
function OxfordStoriesHub({ settings }: { settings: Settings }) {
  const [oxModuleId, setOxModuleId] = useState<string | null>(null);
  const [openStoryNum, setOpenStoryNum] = useState<number | null>(null);
  const [oxDone, setOxDone] = useState<ReadonlySet<number>>(() => loadOxDone());
  const oxTopRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (openStoryNum != null || oxModuleId != null) oxTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [openStoryNum, oxModuleId]);
  const toggleOxDone = (num: number) => {
    setOxDone((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      saveOxDone(next);
      return next;
    });
  };
  const oxDoneCount = (m: OxModule) => m.stories.filter((s) => oxDone.has(s.num)).length;
  const selectedModule = oxModuleId != null ? OX_MODULES.find((m) => m.id === oxModuleId) : undefined;
  const openStoryObj = selectedModule != null && openStoryNum != null ? selectedModule.stories.find((s) => s.num === openStoryNum) : undefined;

  return (
    <div ref={oxTopRef} className="scroll-mt-40">
      {openStoryObj != null && selectedModule != null ? (
        <div className="mt-4">
          <OxStoryDetail
            key={openStoryObj.num}
            story={openStoryObj}
            moduleNum={selectedModule.num}
            isDone={oxDone.has(openStoryObj.num)}
            onToggleDone={() => toggleOxDone(openStoryObj.num)}
            settings={settings}
            onBack={() => setOpenStoryNum(null)}
          />
        </div>
      ) : selectedModule != null ? (
        <>
          <div className="mt-4">
            <Btn variant="ghost" ariaLabel="Back to all Oxford story modules" onClick={() => setOxModuleId(null)}>
              ← All modules · <span className="bn">সব মডিউল</span>
            </Btn>
          </div>
          <section aria-label={`Oxford module ${selectedModule.num}: ${selectedModule.titleEn}`} className="mt-3 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-5 text-center shadow-[0_4px_14px_rgba(34,26,5,0.06)] md:p-6">
            <p className="text-xs font-extrabold tracking-[0.3em] text-[var(--dim)]">MODULE</p>
            <p className="font-display mt-1 text-6xl font-semibold leading-none text-[var(--text)]">{String(selectedModule.num).padStart(2, "0")}</p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-[var(--text)]">{selectedModule.titleEn}</h2>
            <p className="bn mt-1 text-lg font-semibold text-[var(--dim)]">{selectedModule.titleBn}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-[var(--text)]">{selectedModule.storyCount} STORIES</span>
              <span className="rounded-full border-2 border-[var(--border)] bg-[var(--surface2)] px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-[var(--text)]">{selectedModule.wordCount} WORDS</span>
            </div>
            <div className="mx-auto mt-4 max-w-md">
              <div className="h-3 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-valuenow={oxDoneCount(selectedModule)} aria-valuemin={0} aria-valuemax={selectedModule.storyCount} aria-label={`Oxford module ${selectedModule.num} progress: ${oxDoneCount(selectedModule)} of ${selectedModule.storyCount} stories read`}>
                <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${selectedModule.storyCount > 0 ? Math.round((oxDoneCount(selectedModule) / selectedModule.storyCount) * 100) : 0}%` }} />
              </div>
              <p className="mt-1.5 text-sm font-bold text-[var(--dim)]">
                {oxDoneCount(selectedModule)} of {selectedModule.storyCount} stories read · <span className="bn">গল্প পড়া হয়েছে</span>
              </p>
            </div>
          </section>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {selectedModule.stories.map((s) => {
              const done = oxDone.has(s.num);
              return (
                <button
                  key={s.num}
                  type="button"
                  aria-label={`Open story ${s.num} of Oxford module ${selectedModule.num}: ${s.titleEn} (${s.titleBn})${done ? " — already read" : ""}`}
                  onClick={() => setOpenStoryNum(s.num)}
                  className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[0_4px_14px_rgba(34,26,5,0.06)] transition active:scale-[0.99]"
                >
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="bn rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--on-accent)]">গল্প {oxBnPad(s.num)}</span>
                    <span className="rounded-full bg-[var(--surface2)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--text)]">STORY {String(s.num).padStart(2, "0")}</span>
                    {done && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface2)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--text)]">
                        <Fi n="check" /> Read
                      </span>
                    )}
                  </span>
                  <span className="font-display bn mt-2 block text-xl font-semibold text-[var(--text)]">{s.titleBn}</span>
                  <span className="font-display block text-sm font-semibold text-[var(--dim)]">{s.titleEn}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--dim)]">{s.words.map((sw) => sw.word.word).join(" · ")}</span>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <OxHowToGuide />
          <p className="bn mt-4 text-base text-[var(--dim)]">
            মডিউল অনুযায়ী একে একে পড়ুন — Module 01 থেকে শুরু করুন। সব মিলিয়ে {OX_TOTAL_STORIES}টি গল্পে পুরো Oxford 3000 তালিকার ৩,০০৩টি শব্দই আছে, প্রতিটি শব্দ ঠিক একটি গল্পে। প্রতিটি মডিউলে সর্বোচ্চ ১০টি গল্প; গল্প পড়া শেষ হলে “Mark as read” চিহ্ন দিলে মডিউলের অগ্রগতি এখানে দেখা যাবে।
          </p>
          {OX_SECTION_ORDER.map((sectionId) => (
            <section key={sectionId} aria-label={`${OX_SECTION_TITLES[sectionId]?.en ?? sectionId} Oxford story modules`} className="mt-6">
              <SectionTitle>
                {OX_SECTION_TITLES[sectionId]?.en} · <span className="bn">{OX_SECTION_TITLES[sectionId]?.bn}</span>
              </SectionTitle>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {OX_MODULES.filter((m) => m.sectionId === sectionId).map((m) => {
                  const done = oxDoneCount(m);
                  const pct = m.storyCount > 0 ? Math.round((done / m.storyCount) * 100) : 0;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      aria-label={`Open Oxford module ${m.num}: ${m.titleEn} (${m.titleBn}) — ${m.storyCount} stories, ${m.wordCount} words, ${done} read`}
                      onClick={() => { setOxModuleId(m.id); setOpenStoryNum(null); }}
                      className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[0_4px_14px_rgba(34,26,5,0.06)] transition active:scale-[0.99]"
                    >
                      <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--on-accent)]">MODULE {String(m.num).padStart(2, "0")}</span>
                      <span className="font-display mt-2 block text-lg font-semibold leading-snug text-[var(--text)]">{m.titleEn}</span>
                      <span className="bn block text-base font-semibold text-[var(--dim)]">{m.titleBn}</span>
                      <span className="mt-1.5 block text-sm font-semibold text-[var(--text)]">{m.storyCount} stories · {m.wordCount} words</span>
                      <span className="mt-2.5 block h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]">
                        <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="mt-1 block text-xs font-bold text-[var(--dim)]">
                        {done > 0 ? <>{done} of {m.storyCount} read · <span className="bn">পড়া হয়েছে</span></> : <>Not started · <span className="bn">এখনো শুরু হয়নি</span></>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

function OxfordHub({ state, settings, go }: { state: State; settings: Settings; go: (v: View) => void }) {
  const showBn = settings.showBengali;
  const [oxMode, setOxMode] = useState<"stories" | "all">("stories");
  const [query, setQuery] = useState("");
  const results = searchOxford(query);
  const everyday = oxEverydayWords();
  const everydayKnown = everyday.filter((w) => oxKnown(oxStateOf(state, w))).length;
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Oxford 3000</h1>
      <p className="bn mt-1 max-w-2xl text-base text-[var(--dim)]">
        আপনার দেওয়া Oxford 3000 (American English) PDF থেকে নেওয়া শব্দের তালিকা — মোট {OX_WORDS.length}টি শব্দ। শব্দ, শব্দের ধরন ও স্তর (A1–B2) PDF থেকে; প্রতিটি শব্দের ইংরেজি সংজ্ঞা, বাংলা অর্থ, উদাহরণ, সমার্থক-বিপরীত শব্দ ও ছোট গল্প এই অ্যাপের জন্য আলাদাভাবে লেখা।
      </p>
      <p className="mt-1 max-w-2xl text-sm text-[var(--dim)]">
        Start with the words you need every day, then work level by level from A1 to B2. Every word works like a lesson word: meaning, story, listen, flashcards, quiz, save and progress.
      </p>
      <p className="bn mt-1 max-w-2xl text-base text-[var(--dim)]">
        এখন সব শব্দ গল্পে গল্পে সাজানো — {OX_TOTAL_STORIES}টি গল্প, প্রতি গল্পে ১০টি শব্দ, Module 01 থেকে একে একে। প্রতিটি গল্পে বাংলা গল্প, Vocabulary List (শব্দ · উচ্চারণ · অর্থ), English উদাহরণ, আর সমার্থক ও বিপরীত শব্দের ছোট গল্প। পুরো শব্দের তালিকা, সার্চ, ফ্ল্যাশকার্ড আর সেভ করা অগ্রগতি আগের মতোই “All Oxford Words”-এ আছে।
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Oxford 3000 view: stories or all words">
        <button
          type="button"
          aria-pressed={oxMode === "stories"}
          onClick={() => setOxMode("stories")}
          className={`rounded-full px-4 py-2 text-sm font-extrabold transition active:scale-[0.98] ${oxMode === "stories" ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]" : "bg-[var(--chip)] text-[var(--text)]"}`}
        >
          <Fi n="book-open-cover" /> Stories · <span className="bn">গল্প</span>
        </button>
        <button
          type="button"
          aria-pressed={oxMode === "all"}
          onClick={() => setOxMode("all")}
          className={`rounded-full px-4 py-2 text-sm font-extrabold transition active:scale-[0.98] ${oxMode === "all" ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)]" : "bg-[var(--chip)] text-[var(--text)]"}`}
        >
          <Fi n="list" /> All Oxford Words · <span className="bn">সব শব্দ</span>
        </button>
      </div>

      {oxMode === "stories" ? (
        <OxfordStoriesHub settings={settings} />
      ) : (
      <>
      <div className="search-pill mt-4 flex items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-sm">
        <Fi n="search" className="text-[var(--dim)]" />
        <input
          aria-label="Search Oxford 3000 words in English or Bengali"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word… · শব্দ খুঁজুন"
          className="bn min-w-0 flex-1 bg-transparent text-base text-[var(--text)] outline-none"
        />
        {query && (
          <button type="button" aria-label="Clear Oxford search" onClick={() => setQuery("")} className="text-[var(--dim)]"><Fi n="cross" /></button>
        )}
      </div>
      {query.trim() && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-[var(--text)]">{results.length} result{results.length === 1 ? "" : "s"} for “{query.trim()}”</p>
          <div className="mt-2 grid gap-3 xl:grid-cols-2">
            {results.slice(0, 10).map((w) => (
              <OxWordCard key={w.key} word={w} state={state} settings={settings} showBn={showBn} />
            ))}
          </div>
          {results.length === 0 && <p className="bn mt-2 text-sm text-[var(--dim)]">কোনো শব্দ পাওয়া যায়নি। বানান ঠিক করে আবার চেষ্টা করুন।</p>}
        </div>
      )}

      <SectionTitle>Start here · <span className="bn">এখান থেকে শুরু করুন</span></SectionTitle>
      <button
        type="button"
        aria-label="Open Everyday Life and Spoken English, the starter track"
        onClick={() => go({ name: "oxfordLevel", level: "everyday" })}
        className="block w-full rounded-[2rem] border-2 border-[var(--border)] bg-[var(--accent)] p-5 text-left text-[var(--on-accent)] shadow-[0_8px_24px_rgba(34,26,5,0.16)] transition active:scale-[0.99]"
      >
        <p className="font-display text-2xl font-semibold">Everyday Life &amp; Spoken English</p>
        <p className="bn mt-1 text-sm opacity-90">প্রতিদিনের জীবন ও কথ্য ইংরেজি — অভিবাদন, পরিবার, বাড়ি, খাবার, সময়, ভ্রমণ, কেনাকাটা, স্বাস্থ্য, কাজ ও দৈনন্দিন কাজের শব্দ আগে।</p>
        <p className="mt-2 text-sm font-bold">{everyday.length} words · {everydayKnown} known</p>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-black/20" role="progressbar" aria-label="Everyday track progress" aria-valuenow={everydayKnown} aria-valuemin={0} aria-valuemax={everyday.length}>
          <div className="h-full rounded-full bg-[var(--hero)]" style={{ width: `${everyday.length ? Math.round((everydayKnown / everyday.length) * 100) : 0}%` }} />
        </div>
      </button>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {EVERYDAY_CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-label={`Open the ${c.en} words in the Everyday track`}
            onClick={() => go({ name: "oxfordLevel", level: "everyday", cat: c.id })}
            className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-sm font-bold text-[var(--text)] shadow-sm"
          >
            <Fi n={c.icon} /> {c.en} · {c.keys.length}
          </button>
        ))}
      </div>

      <SectionTitle>By level · <span className="bn">স্তর অনুযায়ী</span></SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        {OX_LEVELS.map((l) => {
          const words = oxWordsOfLevel(l);
          const known = words.filter((w) => oxKnown(oxStateOf(state, w))).length;
          const inEveryday = words.filter((w) => w.everydayCat).length;
          return (
            <button
              key={l}
              type="button"
              aria-label={`Open Oxford level ${l} with ${words.length} words`}
              onClick={() => go({ name: "oxfordLevel", level: l })}
              className="rounded-[1.75rem] border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-sm transition active:scale-[0.99]"
            >
              <p className="font-display text-2xl font-semibold text-[var(--text)]">{l}</p>
              <p className="mt-0.5 text-sm text-[var(--dim)]">{words.length} words from the PDF · {inEveryday} of them are in the Everyday track</p>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-label={`Level ${l} progress`} aria-valuenow={known} aria-valuemin={0} aria-valuemax={words.length}>
                <div className="h-full rounded-full bg-[var(--hero)]" style={{ width: `${words.length ? Math.round((known / words.length) * 100) : 0}%` }} />
              </div>
              <p className="mt-1 text-xs font-semibold text-[var(--dim)]">{known} known · {Math.round((known / Math.max(1, words.length)) * 100)}%</p>
            </button>
          );
        })}
      </div>
      </>
      )}
    </div>
  );
}

function OxfordLevel({ level, initialCat, state, settings, go }: { level: string; initialCat?: string; state: State; settings: Settings; go: (v: View) => void }) {
  const showBn = settings.showBengali;
  const isEveryday = level === "everyday";
  const oxLevel = (OX_LEVELS as string[]).includes(level) ? (level as OxLevel) : null;
  const allWords = isEveryday ? oxEverydayWords() : oxLevel ? oxWordsOfLevel(oxLevel) : [];
  const titleEn = isEveryday ? "Everyday Life & Spoken English" : `Oxford ${level}`;
  const titleBn = isEveryday ? "প্রতিদিনের জীবন ও কথ্য ইংরেজি" : `অক্সফোর্ড ${level} স্তর`;
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [cat, setCat] = useState<string>(initialCat ?? "all");
  const [page, setPage] = useState(0);
  const [tool, setTool] = useState<"none" | "cards" | "quiz">("none");
  const PAGE_SIZE = 24;
  const filtered = allWords.filter((w) => {
    if (isEveryday && cat !== "all" && w.everydayCat !== cat) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      if (!w.word.toLowerCase().includes(q) && !w.bn.includes(query.trim())) return false;
    }
    const s = oxStateOf(state, w);
    if (status === "new") return !s;
    if (status === "learning") return !!s && !oxKnown(s);
    if (status === "known") return oxKnown(s);
    if (status === "saved") return !!s?.saved;
    if (status === "difficult") return !!s?.difficult;
    return true;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
  const knownCount = allWords.filter((w) => oxKnown(oxStateOf(state, w))).length;
  const catOf = (w: OxWord) => EVERYDAY_CATS.find((c) => c.id === w.everydayCat);
  return (
    <div>
      <button type="button" aria-label="Back to the Oxford 3000 hub" onClick={() => go({ name: "oxford" })} className="text-sm font-extrabold text-[var(--text)] underline decoration-[var(--hero)] decoration-4 underline-offset-4">
        ← Oxford 3000
      </button>
      <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--text)]">{titleEn}</h1>
      <p className="bn mt-0.5 text-base text-[var(--dim)]">{titleBn} · মোট {allWords.length}টি শব্দ · {knownCount}টি জানা হয়েছে</p>
      <div className="mt-2 h-3 max-w-md overflow-hidden rounded-full bg-[var(--surface2)]" role="progressbar" aria-label={`Progress in ${titleEn}`} aria-valuenow={knownCount} aria-valuemin={0} aria-valuemax={allWords.length}>
        <div className="h-full rounded-full bg-[var(--hero)] transition-all" style={{ width: `${allWords.length ? Math.round((knownCount / allWords.length) * 100) : 0}%` }} />
      </div>
      {isEveryday && (
        <p className="bn mt-2 max-w-2xl text-sm text-[var(--dim)]">এই শব্দগুলো তাদের নিজ নিজ স্তরের (A1–B2) অংশেও আছে — সেখানে "Everyday" চিহ্ন দিয়ে দেখানো হয়েছে, যাতে কোনো শব্দ দুইবার না আসে।</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Btn variant={tool === "cards" ? "primary" : "soft"} ariaLabel="Practise these words with flashcards" onClick={() => setTool(tool === "cards" ? "none" : "cards")}>
          <Fi n="book-open-cover" /> Flashcards
        </Btn>
        <Btn variant={tool === "quiz" ? "primary" : "soft"} ariaLabel="Take a quiz on these words" onClick={() => setTool(tool === "quiz" ? "none" : "quiz")}>
          <Fi n="trophy" /> Quiz
        </Btn>
      </div>
      {tool === "cards" && (
        <div className="mt-3">
          <OxFlashcards words={filtered.length > 0 ? filtered : allWords} settings={settings} state={state} label={titleEn} />
        </div>
      )}
      {tool === "quiz" && (
        <div className="mt-3">
          <OxQuiz words={filtered.length > 0 ? filtered : allWords} settings={settings} label={titleEn} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="search-pill flex min-w-52 flex-1 items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] px-4 py-2 shadow-sm">
          <Fi n="search" className="text-[var(--dim)]" />
          <input
            aria-label={`Search within ${titleEn}`}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            placeholder="Search this section…"
            className="bn min-w-0 flex-1 bg-transparent text-base text-[var(--text)] outline-none"
          />
        </div>
        <ThemedSelect
          ariaLabel="Filter Oxford words by progress status"
          value={status}
          onChange={(v) => { setStatus(v); setPage(0); }}
          options={[
            { value: "all", label: "All words · সব শব্দ" },
            { value: "new", label: "Not started · শুরু হয়নি" },
            { value: "learning", label: "Learning · শিখছি" },
            { value: "known", label: "Known · জানা" },
            { value: "saved", label: "Saved · সংরক্ষিত" },
            { value: "difficult", label: "Difficult · কঠিন" },
          ]}
        />
        {isEveryday && (
          <ThemedSelect
            ariaLabel="Filter Everyday words by category"
            value={cat}
            onChange={(v) => { setCat(v); setPage(0); }}
            options={[
              { value: "all", label: "All categories · সব ক্যাটাগরি" },
              ...EVERYDAY_CATS.map((c) => ({ value: c.id, label: `${c.en} · ${c.bn}` })),
            ]}
          />
        )}
      </div>

      <p className="mt-3 text-sm text-[var(--dim)]">
        {filtered.length} words · showing {pageItems.length === 0 ? 0 : safePage * PAGE_SIZE + 1}–{safePage * PAGE_SIZE + pageItems.length}
      </p>
      <div className="mt-2 grid gap-3 xl:grid-cols-2">
        {pageItems.map((w) => (
          <div key={w.key}>
            {isEveryday && catOf(w) && (
              <p className="mb-1 text-xs font-bold tracking-wide text-[var(--dim)] uppercase">{catOf(w)?.en} · <span className="bn normal-case">{catOf(w)?.bn}</span> · Level {w.level}</p>
            )}
            <OxWordCard word={w} state={state} settings={settings} showBn={showBn} />
          </div>
        ))}
      </div>
      {pageItems.length === 0 && (
        <p className="bn mt-4 text-sm text-[var(--dim)]">এই ফিল্টারে কোনো শব্দ নেই। ফিল্টার বদলে আবার দেখুন।</p>
      )}
      {pageCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <Btn ariaLabel="Previous page of Oxford words" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>← Prev</Btn>
          <span className="text-sm font-bold text-[var(--text)]">Page {safePage + 1} of {pageCount}</span>
          <Btn ariaLabel="Next page of Oxford words" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)}>Next →</Btn>
        </div>
      )}
    </div>
  );
}

// ---------- app shell ----------
const NAV: [View["name"], string, string][] = [
  ["home", "home", "Home"],
  ["lessons", "book-open-reader", "Lessons"],
  ["exams", "trophy", "Exams"],
  ["dictionary", "search", "Dictionary"],
  ["mywords", "notebook", "My Words"],
  ["review", "refresh", "Review"],
  ["analytics", "chart-histogram", "Stats"],
  ["settings", "settings", "Settings"],
];

export function App() {
  const [view, setView] = useState<View>({ name: "home" });
  // The "Lessons" nav item opens the study-section dropdown (Basic English /
  // Oxford 3000 / Phrasal Verbs / Idioms and Phrases) instead of navigating
  // directly. The nav row
  // scrolls horizontally, which would clip an absolutely-positioned panel, so
  // the panel is rendered fixed at the button's position while open.
  const [lessonsMenu, setLessonsMenu] = useState<{ top: number; left: number } | null>(null);
  const lessonsNavBtnRef = useRef<HTMLButtonElement>(null);
  const lessonsMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lessonsMenu) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (lessonsMenuRef.current?.contains(t) || lessonsNavBtnRef.current?.contains(t)) return;
      setLessonsMenu(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLessonsMenu(null); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [lessonsMenu]);
  const toggleLessonsMenu = () => {
    if (lessonsMenu) { setLessonsMenu(null); return; }
    const rect = lessonsNavBtnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.min(window.innerWidth * 0.85, 320);
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
    setLessonsMenu({ top: rect.bottom + 8, left });
  };
  const state = useQuery({ queryKey: ["state"], queryFn: () => api.getState({}) });
  const themePref = state.data?.settings.theme ?? "system";
  useEffect(() => {
    const root = document.documentElement;
    if (themePref === "light" || themePref === "dark") root.dataset.theme = themePref;
    else delete root.dataset.theme;
  }, [themePref]);
  const go = (v: View) => {
    resetScrollTop();
    setView(v);
  };
  // Land every view at its beginning. In-app navigation used to keep
  // the previous page's scroll position — the new view opened part-way
  // down with its heading hidden — because a single reset races the
  // browser work that follows a view swap (state refetch re-render,
  // font/image layout settling, focus reveal). So the reset is applied
  // on every channel that can hold the scroll (window, the scrolling
  // element, html/body, the SDK root element), before the view changes,
  // as it commits, after first paint, and repeatedly for a short while
  // afterwards so it outlasts any one late re-scroll. Focus moves to
  // the new view's <main> with preventScroll: true — focus must never
  // be the thing that scrolls the fresh page (with preventScroll:
  // false, revealing a taller-than-viewport <main> could drag the page
  // back down in nested-scroll shells).
  const mainRef = useRef<HTMLElement>(null);
  const resetScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const se = document.scrollingElement;
    if (se) se.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    document
      .querySelector<HTMLElement>("[data-hatch-space-root]")
      ?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  useLayoutEffect(resetScrollTop, [view]);
  useEffect(() => {
    const landAtTop = () => {
      resetScrollTop();
      // scrollIntoView is the one call that reveals the element through
      // EVERY scrollable ancestor — including a shell scroller outside
      // this document that window/root scrollTo cannot reach (the case
      // that left new views sitting at the old page's scroll position).
      // <main> carries scroll-mt-40, so it lands just under the sticky
      // header, exactly like a fresh page load.
      mainRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      mainRef.current?.focus({ preventScroll: true });
    };
    landAtTop();
    const raf = requestAnimationFrame(landAtTop);
    const timers = [50, 150, 350, 700].map((ms) => window.setTimeout(resetScrollTop, ms));
    // The repeated resets exist only to outlast the browser's own
    // post-navigation re-scrolls. The moment the learner deliberately
    // scrolls (wheel, touch drag, scroll keys), the resets stop so the
    // page never snaps back against them.
    const stopOnUserScroll = () => timers.forEach((t) => window.clearTimeout(t));
    window.addEventListener("wheel", stopOnUserScroll, { passive: true, once: true });
    window.addEventListener("touchstart", stopOnUserScroll, { passive: true, once: true });
    window.addEventListener("keydown", stopOnUserScroll, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("wheel", stopOnUserScroll);
      window.removeEventListener("touchstart", stopOnUserScroll);
      window.removeEventListener("keydown", stopOnUserScroll);
    };
  }, [view]);
  // Focus timer lives here so it keeps counting across every screen.
  // When a session finishes, its minutes are logged as study time on
  // the most recently studied lesson (or Lesson 1) so they count
  // toward today's daily goal.
  const qc = useQueryClient();
  const focusLessonRef = useRef(1);
  const focus = useFocusTimer((mins) => {
    void api
      .touchLesson({ lessonNumber: focusLessonRef.current, minutes: mins })
      .then(() => qc.invalidateQueries({ queryKey: ["state"] }))
      .catch(() => {});
  });
  if (state.isPending)
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--bg)]">
        <p className="bn text-[var(--dim)]">লোড হচ্ছে… Loading your studio…</p>
      </div>
    );
  if (state.error || !state.data)
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-[var(--bg)] p-6 text-center">
        <p className="text-[var(--text)]">Something went wrong while loading your learning data.</p>
        <Btn variant="primary" ariaLabel="Retry loading the app" onClick={() => state.refetch()}>Retry</Btn>
      </div>
    );
  const data = state.data;
  const settings = data.settings;
  const lastStudiedRow = [...data.progress].filter((p) => p.lastStudiedAt).sort((a, b) => (b.lastStudiedAt ?? "").localeCompare(a.lastStudiedAt ?? ""))[0];
  focusLessonRef.current = lastStudiedRow?.lessonNumber ?? 1;
  const dueCount = data.words.filter((w) => w.nextReviewAt && new Date(w.nextReviewAt).getTime() <= Date.now()).length;
  const fontCls = settings.fontSize === "large" ? "text-lg" : "";
  const navActive = (name: View["name"]) =>
    view.name === name ||
    (name === "oxford" && view.name === "oxfordLevel") ||
    (name === "exams" && (view.name === "checkpoint" || view.name === "final")) ||
    (name === "lessons" && view.name === "lesson");
  const menuCurrent: SectionName | null =
    view.name === "lessons" || view.name === "lesson"
      ? "lessons"
      : view.name === "oxford" || view.name === "oxfordLevel"
        ? "oxford"
        : view.name === "phrasal"
          ? "phrasal"
          : view.name === "idioms"
            ? "idioms"
            : null;

  return (
    <div className={`min-h-dvh bg-[var(--bg)] ${fontCls}`}>
      <header className="sticky top-0 z-30 bg-[var(--bg)] shadow-[0_8px_20px_rgba(34,26,5,0.12)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between gap-3 pt-2.5">
            <div className="flex min-w-0 items-center gap-3">
              <img src={pupMascot} alt="" className="h-10 w-10 shrink-0 rounded-full border-[3px] border-white object-cover shadow-[0_4px_12px_rgba(34,26,5,0.2)] md:h-12 md:w-12" />
              <div className="hidden min-w-0 min-[420px]:block">
                <p className="font-display truncate text-base leading-tight font-bold text-[var(--text)] md:text-lg">English Learning Studio</p>
                <p className="bn text-xs font-semibold text-[var(--dim)]">বাংলা থেকে ইংরেজি শিখুন</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {dueCount > 0 && (
                <button type="button" aria-label={`${dueCount} words due for review — open review`} onClick={() => go({ name: "review" })} className="rounded-full bg-white px-3 py-1.5 text-sm font-extrabold whitespace-nowrap text-[#221a05] shadow-[0_3px_10px_rgba(34,26,5,0.15)]">
                  <Fi n="refresh" /> {dueCount} due
                </button>
              )}
              <span className="md:hidden"><ThemeSwitcher settings={settings} compact /></span>
            </div>
          </div>
          <nav className="no-scrollbar -mx-1 overflow-x-auto px-1" aria-label="Main navigation" onScroll={() => { if (lessonsMenu) setLessonsMenu(null); }}>
            <div className="mx-auto flex w-max min-w-full justify-center gap-1.5 pt-[16px] pb-[16px]">
            {NAV.map(([name, icon, label]) => {
              const pillCls = `nav-pill flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-extrabold whitespace-nowrap transition-all duration-[400ms] active:scale-[0.98] md:px-4 md:py-2.5 md:text-base ${navActive(name) ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_4px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_0_rgba(0,0,0,0.3),0_10px_20px_rgba(34,26,5,0.3)]" : "bg-[var(--chip)] text-[var(--text)] hover:bg-[var(--accent-soft)] hover:shadow-[0_6px_14px_rgba(34,26,5,0.22)]"}`;
              if (name === "lessons") {
                return (
                  <button
                    key={name}
                    ref={lessonsNavBtnRef}
                    type="button"
                    aria-label="Open the Lessons menu: Basic English, Oxford 3000, Phrasal Verbs or Idioms and Phrases"
                    aria-haspopup="menu"
                    aria-expanded={lessonsMenu != null}
                    aria-current={navActive(name) ? "page" : undefined}
                    onClick={toggleLessonsMenu}
                    className={pillCls}
                  >
                    <Fi n={icon} className="text-base" /> {label}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden focusable="false" className={`transition-transform duration-200 ${lessonsMenu ? "rotate-180" : ""}`}><path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                );
              }
              return (
                <button
                  key={name}
                  type="button"
                  aria-label={`Navigate to ${label}`}
                  aria-current={navActive(name) ? "page" : undefined}
                  onClick={() => { setLessonsMenu(null); go({ name } as View); }}
                  className={pillCls}
                >
                  <Fi n={icon} className="text-base" /> {label}
                  {name === "review" && dueCount > 0 && <span className="rounded-full bg-[var(--rose)] px-2 py-0.5 text-xs font-bold text-white">{dueCount}</span>}
                </button>
              );
            })}
            </div>
          </nav>
        </div>
      </header>
      {lessonsMenu && (
        <div
          ref={lessonsMenuRef}
          role="menu"
          aria-label="Study sections: Basic English, Oxford 3000, Phrasal Verbs, Idioms and Phrases"
          className="fixed z-50 rounded-[1.5rem] border-2 border-[var(--border)] bg-[var(--sheet)] p-1.5 shadow-[0_18px_44px_rgba(34,26,5,0.28)]"
          style={{ top: lessonsMenu.top, left: lessonsMenu.left, width: "min(85vw, 20rem)" }}
        >
          <SectionMenuItems
            current={menuCurrent}
            onPick={(name) => { setLessonsMenu(null); go({ name } as View); }}
          />
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        <main ref={mainRef} tabIndex={-1} className="min-w-0 scroll-mt-40 px-4 pt-4 pb-10 outline-none md:px-6 md:pt-5">
          {view.name === "home" && <Home state={data} settings={settings} go={go} focus={focus} />}
          {view.name === "lessons" && <LessonsList state={data} go={go} />}
          {view.name === "exams" && <ExamsHome state={data} go={go} />}
          {view.name === "checkpoint" && <CheckpointExam key={view.end} end={view.end} state={data} settings={settings} go={go} />}
          {view.name === "final" && <FinalExam state={data} settings={settings} go={go} />}
          {view.name === "lesson" && <LessonView key={view.n} n={view.n} initialTab={view.tab} state={data} settings={settings} go={go} />}
          {view.name === "phrasal" && <PhrasalVerbsPage settings={settings} />}
          {view.name === "idioms" && <IdiomsPage settings={settings} attempts={data.attempts} />}
          {view.name === "oxford" && <OxfordHub state={data} settings={settings} go={go} />}
          {view.name === "oxfordLevel" && <OxfordLevel key={`${view.level}-${view.cat ?? ""}`} level={view.level} initialCat={view.cat} state={data} settings={settings} go={go} />}
          {view.name === "dictionary" && <Dictionary settings={settings} go={go} />}
          {view.name === "mywords" && <MyWords state={data} settings={settings} go={go} />}
          {view.name === "review" && <Review state={data} settings={settings} go={go} />}
          {view.name === "analytics" && <Analytics state={data} />}
          {view.name === "settings" && <SettingsView settings={settings} />}
          <footer key={view.name} className="mt-10 border-t-2 border-dashed border-[var(--border)] pt-4 pb-2 text-center text-xs leading-relaxed text-[var(--dim)]">
            <CopyrightLink />
          </footer>
        </main>
      </div>

      <FloatingTimer timer={focus.timer} onPause={focus.pause} onResume={focus.resume} onStop={focus.stop} />
    </div>
  );
}
