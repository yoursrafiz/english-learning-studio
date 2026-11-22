// Oxford 3000 book-style stories — every Oxford 3000 word grouped into
// connected Bengali stories of 10 words, in the style of the learner's
// vocabulary story book (the "গল্প" pages with a Vocabulary List table):
// each story is numbered (গল্প ০১, গল্প ০২, …), has a Bengali title, and
// tells one connected Bengali story in which each of its 10 words appears
// in English, marked [[...]] so the UI renders it bold + underlined,
// exactly like the Phrasal Verbs and Idioms story pages.
//
// Order (as the learner asked, module by module like the Phrasal Verbs
// modules): Everyday Life & Spoken English first, then the remaining
// A1 words, then A2, B1 and B2. Every one of the 3,003 words appears in
// exactly one story — Everyday words are taken first in their Everyday
// category order and are NOT repeated in their level's stories, so the
// stories cover the whole list once, with no duplicates. Stories are
// grouped into modules of at most 10 stories, numbered Module 01, 02, …
//
// How the content is made (honest note, mirroring the Phrasal Verbs
// modules): Stories 01–02 are hand-written for this app. The remaining
// stories are built from original rotating everyday-life frames (a
// school day, a market morning, a rainy journey…): inside the frame,
// each word gets one Bengali sentence that uses it in context together
// with its own Bengali meaning from oxford-content.ts, so the story
// stays connected and every word is explained where it appears. The
// Vocabulary List data is the app's own Oxford data: the Bengali meaning
// and the English synonym come from OX_CONTENT (via OxWord.synonyms);
// the pronunciation is a Bengali-letter pronunciation guide produced by
// oxPronBn below (a hand-checked override table for common/irregular
// words plus a phonetic transliteration for the rest — a learner's
// guide, not IPA). Each word also gets one English example sentence
// (oxStoryExample) with its Bengali meaning, and each synonym/antonym
// gets its own little 1–2 sentence story (oxRelStory). The screenshot
// example words (Gregarious, Defendant, …) come from a different
// advanced vocabulary book and are not in the Oxford 3000 list, so they
// are used here as the format model only, never as Oxford entries.

import {
  OX_WORDS,
  oxEverydayWords,
  oxWordsOfLevel,
  type OxWord,
} from "./oxford";
import type { Rel } from "./curriculum";

// ---------- Bengali numerals ----------

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export function oxBnNum(n: number): string {
  return String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}
export function oxBnPad(n: number): string {
  return oxBnNum(n).padStart(2, "০");
}

// ---------- pronunciation in Bengali letters ----------
// Hand-checked pronunciations for common / irregular words whose
// spelling would mislead the phonetic transliterator below.
const PRON_OVERRIDES: Record<string, string> = {
  "a": "এ", "an": "অ্যান", "hello": "হ্যালো", "hi": "হাই", "hey": "হেই",
  "goodbye": "গুডবাই", "bye": "বাই", "please": "প্লিজ", "thanks": "থ্যাংকস",
  "thank": "থ্যাংক", "sorry": "সরি", "excuse": "এক্সকিউজ", "welcome": "ওয়েলকাম",
  "yes": "ইয়েস", "ok": "ওকে", "man": "ম্যান", "woman": "উম্যান", "women": "উইমেন",
  "get": "গেট", "give": "গিভ", "girl": "গার্ল", "put": "পুট", "book": "বুক",
  "look": "লুক", "good": "গুড", "full": "ফুল", "pull": "পুল", "push": "পুশ",
  "foot": "ফুট", "cook": "কুক", "would": "উড", "could": "কুড", "should": "শুড",
  "one": "ওয়ান", "two": "টু", "who": "হু", "busy": "বিজি", "city": "সিটি",
  "people": "পিপল", "little": "লিটল", "water": "ওয়াটার", "school": "স্কুল",
  "read": "রিড", "great": "গ্রেট", "eat": "ইট", "tea": "টি", "sea": "সি",
  "see": "সি", "eye": "আই", "hair": "হেয়ার", "ear": "ইয়ার", "nose": "নোজ",
  "mouth": "মাউথ", "tooth": "টুথ", "heart": "হার্ট", "stomach": "স্টমাক",
  "doctor": "ডক্টর", "sugar": "শুগার", "salt": "সল্ট", "juice": "জুস",
  "fruit": "ফ্রুট", "money": "মানি", "buy": "বাই", "hour": "আওয়ার",
  "minute": "মিনিট", "second": "সেকেন্ড", "monday": "মানডে", "tuesday": "টিউজডে",
  "wednesday": "ওয়েনজডে", "thursday": "থার্সডে", "friday": "ফ্রাইডে",
  "saturday": "স্যাটারডে", "sunday": "সানডে", "january": "জানুয়ারি",
  "february": "ফেব্রুয়ারি", "march": "মার্চ", "april": "এপ্রিল", "may": "মে",
  "june": "জুন", "july": "জুলাই", "august": "অগস্ট", "september": "সেপ্টেম্বর",
  "october": "অক্টোবর", "november": "নভেম্বর", "december": "ডিসেম্বর",
  "know": "নো", "knee": "নি", "knife": "নাইফ", "write": "রাইট", "wrong": "রং",
  "listen": "লিসন", "often": "অফেন", "answer": "আনসার", "climb": "ক্লাইম",
  "comb": "কোম", "debt": "ডেট", "doubt": "ডাউট", "island": "আইল্যান্ড",
  "hourly": "আওয়ারলি", "honest": "অনেস্ট", "honor": "অনার", "ghost": "গোস্ট",
  "choir": "কোয়ায়ার", "chaos": "কেয়স", "chemist": "কেমিস্ট", " stomach": "স্টমাক",
  "said": "সেড", "says": "সেজ", "again": "এগেন", "against": "এগেনস্ট",
  "friend": "ফ্রেন্ড", "business": "বিজনেস", "busybody": "বিজিবডি",
  "beautiful": "বিউটিফুল", "because": "বিকজ", "come": "কাম", "some": "সাম",
  "done": "ডান", "gone": "গন", "love": "লাভ", "above": "অ্যাবাভ", "among": "অ্যামাং",
  "month": "মান্থ", "mother": "মাদার", "father": "ফাদার", "brother": "ব্রাদার",
  "other": "আদার", "color": "কালার", "centre": "সেন্টার", "center": "সেন্টার",
  "theatre": "থিয়েটার", "theater": "থিয়েটার", "queue": "কিউ", "unique": "ইউনিক",
  "unit": "ইউনিট", "united": "ইউনাইটেড", "university": "ইউনিভার্সিটি",
  "use": "ইউজ", "used": "ইউজড", "useful": "ইউজফুল", "usual": "ইউজুয়াল",
  "usually": "ইউজুয়ালি", "music": "মিউজিক", "pupil": "পিউপিল", "tune": "টিউন",
  "duty": "ডিউটি", "during": "ডিউরিং", "new": "নিউ", "news": "নিউজ",
  "few": "ফিউ", "view": "ভিউ", "review": "রিভিউ", "interview": "ইন্টারভিউ",
  "goes": "গোজ", "does": "ডাজ", "shoes": "শুজ", "shoe": "শু", "canoe": "ক্যানু",
  "blood": "ব্লাড", "flood": "ফ্লাড", "door": "ডোর", "floor": "ফ্লোর",
  "poor": "পুওর", "sure": "শিওর", "sugar2": "শুগার", "busy2": "বিজি",
  "women2": "উইমেন", "pretty": "প্রিটি", "english": "ইংলিশ", "england": "ইংল্যান্ড",
  "build": "বিল্ড", "built": "বিল্ট", "quick": "কুইক", "quite": "কোয়াইট",
  "quiet": "কোয়ায়েট", "language": "ল্যাংগুয়েজ", "village": "ভিলেজ",
  "orange": "অরেঞ্জ", "page": "পেজ", "age": "এজ", "large": "লার্জ",
  "change": "চেঞ্জ", "watch": "ওয়াচ", "wash": "ওয়াশ", "want": "ওয়ান্ট",
  "what": "হোয়াট", "when": "হোয়েন", "where": "হোয়্যার", "which": "হুইচ",
  "while": "হোয়াইল", "white": "হোয়াইট", "who2": "হু", "whole": "হোল",
  "write2": "রাইট", "autumn": "অটাম", "column": "কলাম", "listen2": "লিসন",
  "castle": "ক্যাসল", "fasten": "ফাসন", "often2": "অফেন", "soften": "সফন",
  "half": "হাফ", "calf": "কাফ", "walk": "ওয়াক", "talk": "টক", "chalk": "চক",
  "calm": "কাম", "palm": "পাম", "almond": "আমন্ড", "salmon": "স্যামন",
  "work": "ওয়ার্ক", "word": "ওয়ার্ড", "world": "ওয়ার্ল্ড", "worse": "ওয়ার্স",
  "worth": "ওয়ার্থ", "warm": "ওয়ার্ম", "warn": "ওয়ার্ন", "toward": "টোয়ার্ড",
  "towards": "টোয়ার্ডস", "water2": "ওয়াটার", "also": "অলসো", "always": "অলওয়েজ",
  "already": "অলরেডি", "almost": "অলমোস্ট", "although": "অলদো", "altogether": "অলটুগেদার",
  "all": "অল", "call": "কল", "fall": "ফল", "ball": "বল", "small": "স্মল",
  "wall": "ওয়াল", "tall": "টল", "also2": "অলসো", "broad": "ব্রড", "abroad": "অ্যাব্রড",
  "head": "হেড", "bread": "ব্রেড", "dead": "ডেড", "ready": "রেডি",
  "breakfast": "ব্রেকফাস্ট", "weather": "ওয়েদার", "feather": "ফেদার",
  "health": "হেলথ", "healthy": "হেলদি", "heavy": "হেভি", "heaven": "হেভেন",
  "instead": "ইনস্টেড", "steady": "স্টেডি", "meant": "মেন্ট",
  "hear": "হিয়ার", "dear": "ডিয়ার", "near": "নিয়ার",
  "year": "ইয়ার", "wear": "ওয়্যার", "bear": "বিয়ার", "pear": "পিয়ার",
  "how": "হাউ", "now": "নাউ", "cow": "কাউ", "own": "ওন", "why": "হোয়াই",
  "you": "ইয়ু", "your": "ইয়োর", "our": "আওয়ার", "key": "কি", "grey": "গ্রে",
  "begin": "বিগিন", "tiger": "টাইগার", "together": "টুগেদার", "with": "উইথ",
  "the": "দা", "their": "দেয়ার", "them": "দেম", "then": "দেন", "there": "দেয়ার",
  "these": "দিজ", "they": "দেই", "this": "দিস", "those": "দোজ", "that": "দ্যাট",
  "through": "থ্রু", "country": "কান্ট্রি", "young": "ইয়াং", "touch": "টাচ",
  "couple": "কাপল", "double": "ডাবল", "monkey": "মাঙ্কি", "lion": "লায়ন",
  "ocean": "ওশান", "question": "কোয়েশ্চন", "produce": "প্রোডিউস",
  "reduce": "রিডিউস", "daughter": "ডটার", "laugh": "লাফ", "swim": "সুইম",
  "sweet": "সুইট", "swing": "সুইং", "vacation": "ভ্যাকেশন", "tired": "টায়ার্ড",
  "fire": "ফায়ার", "surprise": "সারপ্রাইজ", "remember": "রিমেম্বার",
  "understand": "আন্ডারস্ট্যান্ড", "window": "উইন্ডো",
};

type Phon = { t: "c"; b: string } | { t: "v"; ind: string; sign: string } | { t: "x"; b: string };

const CONS: Record<string, string> = {
  b: "ব", d: "ড", f: "ফ", h: "হ", j: "জ", k: "ক", l: "ল", m: "ম", n: "ন",
  p: "প", r: "র", s: "স", t: "ট", v: "ভ", z: "জ",
};
const IS_CONS = (ch: string) => /[bcdfghjklmnpqrstvwxz]/.test(ch);

function phonemes(raw: string): Phon[] {
  let w = raw.toLowerCase().replace(/[’']/g, "");
  // Silent final -e after a consonant (make, home, write…) — but keep
  // -ee / -ie / -ye / -oe endings.
  let droppedE = false;
  if (w.length > 3 && w.endsWith("e") && IS_CONS(w[w.length - 2] ?? "") && !/(ee|ie|ye|oe)$/.test(w)) {
    w = w.slice(0, -1);
    droppedE = true;
  }
  const out: Phon[] = [];
  let vowelCount = 0;
  const closedAt = (i: number, len: number) => {
    const a = w[i + len] ?? "";
    const b = w[i + len + 1] ?? "";
    return IS_CONS(a) && (b === "" || IS_CONS(b));
  };
  let i = 0;
  while (i < w.length) {
    const rest = w.slice(i);
    // Multi-letter sounds first (longest match wins).
    if (rest.startsWith("tion") || rest.startsWith("sion")) { out.push({ t: "c", b: "শন" }); i += 4; continue; }
    if (rest.startsWith("cian")) { out.push({ t: "c", b: "শান" }); i += 4; continue; }
    if (rest.startsWith("tious") || rest.startsWith("cious")) { out.push({ t: "c", b: "শাস" }); i += 5; continue; }
    if (rest.startsWith("ture")) { out.push({ t: "c", b: "চার" }); i += 4; continue; }
    if (rest.startsWith("sure")) { out.push({ t: "c", b: "শার" }); i += 4; continue; }
    if (rest.startsWith("dge")) { out.push({ t: "c", b: "জ" }); i += 3; continue; }
    if (rest.startsWith("tch")) { out.push({ t: "c", b: "চ" }); i += 3; continue; }
    if (rest.startsWith("ough") || rest.startsWith("augh")) { out.push({ t: "v", ind: "অ", sign: "" }); vowelCount++; i += 4; continue; }
    if (rest.startsWith("eigh")) { out.push({ t: "v", ind: "এই", sign: "েই" }); vowelCount++; i += 4; continue; }
    if (rest.startsWith("igh")) { out.push({ t: "v", ind: "আই", sign: "াই" }); vowelCount++; i += 3; continue; }
    if (rest.startsWith("eau")) { out.push({ t: "v", ind: "ও", sign: "ো" }); vowelCount++; i += 3; continue; }
    if (rest.startsWith("ch")) { out.push({ t: "c", b: "চ" }); i += 2; continue; }
    if (rest.startsWith("sh")) { out.push({ t: "c", b: "শ" }); i += 2; continue; }
    if (rest.startsWith("th")) { out.push({ t: "c", b: "থ" }); i += 2; continue; }
    if (rest.startsWith("ph")) { out.push({ t: "c", b: "ফ" }); i += 2; continue; }
    if (rest.startsWith("wh")) { out.push({ t: "c", b: "ওয়" }); i += 2; continue; }
    if (rest.startsWith("ck")) { out.push({ t: "c", b: "ক" }); i += 2; continue; }
    if (rest.startsWith("qu")) { out.push({ t: "c", b: "কু" }); i += 2; continue; }
    if (rest.startsWith("ng")) {
      if (i + 2 >= w.length) { out.push({ t: "x", b: "ং" }); i += 2; continue; }
      out.push({ t: "c", b: "ঙ্গ" }); i += 2; continue;
    }
    if (rest.startsWith("ee") || rest.startsWith("ea")) { out.push({ t: "v", ind: "ই", sign: "ি" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ai")) { out.push({ t: "v", ind: "এই", sign: "েই" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ay")) { out.push(i + 2 >= w.length ? { t: "v", ind: "এই", sign: "ে" } : { t: "v", ind: "এই", sign: "েই" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("au") || rest.startsWith("aw")) { out.push({ t: "v", ind: "অ", sign: "" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("oi") || rest.startsWith("oy")) { out.push({ t: "v", ind: "অয়", sign: "য়" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ou")) { out.push({ t: "v", ind: "আউ", sign: "াউ" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ow")) { out.push(i + 2 >= w.length ? { t: "v", ind: "ও", sign: "ো" } : { t: "v", ind: "আউ", sign: "াউ" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("oa")) { out.push({ t: "v", ind: "ও", sign: "ো" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ey") && i + 2 >= w.length) { out.push({ t: "v", ind: "ই", sign: "ি" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("oo")) { out.push({ t: "v", ind: "উ", sign: "ু" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ei")) { out.push({ t: "v", ind: "এই", sign: "েই" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ie")) { out.push({ t: "v", ind: "ই", sign: "ি" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ue")) { out.push({ t: "v", ind: "উ", sign: "ু" }); vowelCount++; i += 2; continue; }
    if (rest.startsWith("ew")) { out.push({ t: "v", ind: "ইউ", sign: "িউ" }); vowelCount++; i += 2; continue; }
    const ch = w[i] ?? "";
    const next = w[i + 1] ?? "";
    const nextEff = next === "" && droppedE ? "e" : next;
    // Magic-e: a vowel followed by exactly one consonant before the
    // dropped silent -e is the long sound (make, like, home, cute).
    const magic = droppedE && /^[bcdfghjklmnpqrstvwxz]$/.test(w.slice(i + 1));
    // Doubled consonants are one sound (apple, coffee, letter) — except
    // cc before e/i/y, which is /ks/ (accept, accident).
    if (IS_CONS(ch) && next === ch && !(ch === "c" && /[eiy]/.test(w[i + 2] ?? ""))) {
      if (ch === "c") out.push({ t: "c", b: "ক" });
      else if (ch === "g") out.push({ t: "c", b: "গ" });
      else if (ch === "x") out.push({ t: "c", b: "ক্স" });
      else if (ch === "w") out.push({ t: "c", b: "ওয়" });
      else if (ch === "q") out.push({ t: "c", b: "ক" });
      else { const cc = CONS[ch]; if (cc) out.push({ t: "c", b: cc }); }
      i += 2; continue;
    }
    // Final -le after a consonant keeps its own syllable (able, table).
    if (ch === "l" && droppedE && i === w.length - 1 && out[out.length - 1]?.t === "c") {
      out.push({ t: "x", b: "ল" }); i++; continue;
    }
    if (ch === "a") {
      if (magic) { out.push({ t: "v", ind: "এই", sign: "ে" }); vowelCount++; i++; continue; }
      const closed = closedAt(i, 1);
      if (vowelCount === 0 && closed && out.length > 0) out.push({ t: "v", ind: "অ্যা", sign: "্যা" });
      else out.push({ t: "v", ind: "অ্যা", sign: "া" });
      vowelCount++; i++; continue;
    }
    if (ch === "e") {
      if (next === "r" && i + 2 === w.length) out.push({ t: "v", ind: "আ", sign: "া" });
      else out.push({ t: "v", ind: "এ", sign: "ে" });
      vowelCount++; i++; continue;
    }
    if (ch === "i") {
      if (magic) out.push({ t: "v", ind: "আই", sign: "াই" });
      else out.push({ t: "v", ind: "ই", sign: "ি" });
      vowelCount++; i++; continue;
    }
    if (ch === "o") {
      if (magic) { out.push({ t: "v", ind: "ও", sign: "ো" }); vowelCount++; i++; continue; }
      const closed = closedAt(i, 1);
      out.push(closed ? { t: "v", ind: "অ", sign: "" } : { t: "v", ind: "ও", sign: "ো" });
      vowelCount++; i++; continue;
    }
    if (ch === "u") {
      if (magic) { out.push({ t: "v", ind: "ইউ", sign: "িউ" }); vowelCount++; i++; continue; }
      const open = IS_CONS(next) && /[aeiou]/.test(w[i + 2] ?? "");
      if (open) out.push({ t: "v", ind: "ইউ", sign: "িউ" });
      else out.push({ t: "v", ind: "আ", sign: "া" });
      vowelCount++; i++; continue;
    }
    if (ch === "n" && /[kgx]/.test(next)) { out.push({ t: "c", b: "ঙ" }); i++; continue; }
    if (ch === "y") {
      if (i === 0 && /[aeiou]/.test(next)) { out.push({ t: "c", b: "ইয়" }); i++; continue; }
      if (i > 0) { out.push({ t: "v", ind: "ই", sign: "ি" }); vowelCount++; i++; continue; }
      out.push({ t: "c", b: "ইয়" }); i++; continue;
    }
    if (ch === "c") { out.push({ t: "c", b: /[eiy]/.test(nextEff) ? "স" : "ক" }); i++; continue; }
    if (ch === "g") { out.push({ t: "c", b: /[ei]/.test(nextEff) && w[i + 2] !== "g" ? "জ" : "গ" }); i++; continue; }
    if (ch === "x") { out.push({ t: "c", b: "ক্স" }); i++; continue; }
    if (ch === "w") { out.push({ t: "c", b: "ওয়" }); i++; continue; }
    if (ch === "q") { out.push({ t: "c", b: "ক" }); i++; continue; }
    const cons = CONS[ch];
    if (cons) { out.push({ t: "c", b: cons }); i++; continue; }
    i++; // punctuation / digits are skipped
  }
  return out;
}

function transliterateToken(token: string): string {
  const clean = token.toLowerCase().replace(/[^a-z'-]/g, "");
  if (!clean) return token;
  const override = PRON_OVERRIDES[clean];
  if (override) return override;
  const phons = phonemes(clean);
  let out = "";
  let prev: "c" | "v" | "x" | "" = "";
  for (const p of phons) {
    if (p.t === "c") {
      out += prev === "c" ? `্${p.b}` : p.b;
      prev = "c";
    } else if (p.t === "v") {
      out += prev === "c" ? p.sign : p.ind;
      prev = "v";
    } else {
      out += p.b;
      prev = "x";
    }
  }
  return out;
}

/** Pronunciation of an Oxford word written in Bengali letters. */
export function oxPronBn(word: string): string {
  return word
    .split(/\s+/)
    .map((part) => part.split("-").map(transliterateToken).join("-"))
    .join(" ");
}

// ---------- shared helpers ----------

export function bnFirst(bn: string): string {
  return (bn.split("/")[0] ?? bn).trim();
}

/** Bengali gerund form of an infinitive gloss: করা → করার, যাওয়া → যাওয়ার। */
export function bnGerund(bn: string): string {
  const f = bnFirst(bn);
  return f.endsWith("া") ? `${f}র` : f;
}

function hashOf(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type PosCat = "verb" | "adj" | "noun" | "other";
function posCatOf(w: OxWord): PosCat {
  const pos = w.senses[0]?.pos ?? "";
  // Greetings and other exclamations (hello, sorry, thanks…) are used
  // as whole utterances, not as nouns/adjectives — they take the
  // neutral "used in a sentence" frames.
  if (/exclam/.test(pos)) return "other";
  if (/(^|[\s,])v\.|modal/.test(pos)) return "verb";
  if (/adj\./.test(pos)) return "adj";
  if (/n\./.test(pos)) return "noun";
  return "other";
}

function capWord(w: OxWord): string {
  return w.word;
}

// ---------- one English example per word ----------
// POS-aware example sentences; the word is [[...]]-marked so the UI
// underlines it, and the Bengali line underneath is the example's own
// Bengali meaning (built from the same frame + the word's Bengali gloss).

export function oxStoryExample(w: OxWord): [string, string] {
  const word = w.word;
  const lower = word.toLowerCase();
  const bn = bnFirst(w.bn);
  const cat = posCatOf(w);
  const v = hashOf(w.rawKey) % 3;
  const multi = /[\s,]/.test(word);
  if (multi || cat === "other") {
    return [
      `Mina used [[${word}]] correctly in her own sentence.`,
      `মিনা তার নিজের বাক্যে "${word}" ঠিকভাবে ব্যবহার করল — মানে ${w.bn}।`,
    ];
  }
  if (cat === "verb") {
    const frames: [string, string][] = [
      [`Yesterday, Mina tried to [[${lower}]] before sunset.`, `গতকাল মিনা সূর্য ডোবার আগেই ${bnGerund(w.bn)} চেষ্টা করেছিল।`],
      [`We [[${lower}]] together every Friday after school.`, `আমরা প্রতি শুক্রবার স্কুলের পর একসঙ্গে এই কাজটি করি — "${word}" মানে ${w.bn}।`],
      [`Rafi learned to [[${lower}]] from his elder sister.`, `রাফি তার বড় বোনের কাছ থেকে ${bnGerund(w.bn)} শিখেছিল।`],
    ];
    return frames[v] ?? frames[0]!;
  }
  if (cat === "adj") {
    const frames: [string, string][] = [
      [`It was truly [[${lower}]], and everyone could feel it.`, `এটি সত্যিই ${bn} ছিল — সবাই তা অনুভব করতে পেরেছিল।`],
      [`The [[${lower}]] morning made the whole family happy.`, `${bn} সকালটা পুরো পরিবারকে খুশি করে দিয়েছিল।`],
      [`She felt [[${lower}]] after hearing the good news.`, `ভালো খবরটা শুনে সে ${bn} বোধ করল।`],
    ];
    return frames[v] ?? frames[0]!;
  }
  const frames: [string, string][] = [
    [`We talked about the [[${lower}]] in class today.`, `আজ ক্লাসে আমরা ${bn} নিয়ে কথা বললাম।`],
    [`This [[${lower}]] is important for our family.`, `এই ${bn} আমাদের পরিবারের জন্য গুরুত্বপূর্ণ।`],
    [`Rafi wrote about the [[${lower}]] in his notebook.`, `রাফি তার খাতায় ${bn} নিয়ে লিখল।`],
  ];
  return frames[v] ?? frames[0]!;
}

// ---------- a little story for every synonym / antonym ----------
// A short 1–2 sentence original story in English that uses the related
// word naturally (the word is [[...]]-marked so the UI underlines it),
// with the little story's Bengali meaning directly underneath. The frame
// follows the head word's part of speech, which the synonym/antonym
// shares. Words with no natural antonym never reach this function —
// the UI shows the word's honest no-antonym note instead.

export function oxRelStory(head: OxWord, rel: Rel, kind: "syn" | "ant"): { en: string; bn: string } {
  const r = rel.en;
  const rLower = r.toLowerCase();
  const rBn = bnFirst(rel.bn);
  const cat = posCatOf(head);
  const v = hashOf(`${head.rawKey}|${r}|${kind}`) % 3;
  const multi = /\s/.test(r);
  if (multi || cat === "other") {
    return {
      en: `During the evening adda, Karim said [[${r}]] in a sentence, and everyone understood him at once.`,
      bn: `সন্ধ্যার আড্ডায় করিম একটি বাক্যে "${r}" বলল, আর সবাই সঙ্গে সঙ্গে তার কথা বুঝে গেল — "${r}" মানে ${rel.bn}।`,
    };
  }
  if (cat === "verb") {
    const frames: { en: string; bn: string }[] = [
      { en: `Early in the morning, Suma tried to [[${rLower}]] before the house woke up. She finished the work quietly and smiled.`, bn: `ভোরে, বাড়ির সবাই জাগার আগেই, সুমা ${bnGerund(rel.bn)} চেষ্টা করল। সে নিঃশব্দে কাজটা শেষ করে হাসল।` },
      { en: `When the rain stopped, the children ran outside to [[${rLower}]] together. Their laughter filled the whole lane.`, bn: `বৃষ্টি থামলে বাচ্চারা একসঙ্গে ${bnGerund(rel.bn)} জন্য বাইরে ছুটে গেল। তাদের হাসিতে পুরো গলি ভরে উঠল।` },
      { en: `Grandfather taught Rafi how to [[${rLower}]] with patience. Now Rafi can do it all by himself.`, bn: `দাদা রাফিকে ধৈর্য ধরে ${bnGerund(rel.bn)} শেখালেন। এখন রাফি নিজে নিজেই তা করতে পারে।` },
    ];
    return frames[v] ?? frames[0]!;
  }
  if (cat === "adj") {
    const frames: { en: string; bn: string }[] = [
      { en: `The [[${rLower}]] morning made everyone in the house cheerful. Even grandfather sang an old song.`, bn: `${rBn} সকালটা বাড়ির সবাইকে আনন্দিত করে তুলল। এমনকি দাদাও একটি পুরোনো গান গাইলেন।` },
      { en: `Mina felt [[${rLower}]] when she heard the good news. She ran to tell her mother at once.`, bn: `ভালো খবরটা শুনে মিনা ${rBn} বোধ করল। সে সঙ্গে সঙ্গে মাকে বলতে ছুটে গেল।` },
      { en: `It was a [[${rLower}]] day, and the children played outside till evening. Nobody wanted to go home early.`, bn: `দিনটি ছিল ${rBn}, আর বাচ্চারা সন্ধ্যা পর্যন্ত বাইরে খেলল। কেউ তাড়াতাড়ি বাড়ি যেতে চাইল না।` },
    ];
    return frames[v] ?? frames[0]!;
  }
  const frames: { en: string; bn: string }[] = [
    { en: `A [[${rLower}]] stood near the school gate in the morning. Every child looked at it with wonder.`, bn: `সকালে স্কুলের গেটের কাছে একটি ${rBn} ছিল। প্রতিটি বাচ্চা অবাক হয়ে তার দিকে তাকাল।` },
    { en: `Mother talked about the [[${rLower}]] at dinner last night. We all listened with great interest.`, bn: `গত রাতে খাবার টেবিলে মা ${rBn} নিয়ে কথা বললেন। আমরা সবাই খুব আগ্রহ নিয়ে শুনলাম।` },
    { en: `Rafi drew a picture of a [[${rLower}]] in his notebook. His teacher praised the drawing warmly.`, bn: `রাফি তার খাতায় একটি ${rBn}-এর ছবি আঁকল। তার শিক্ষক ছবিটির খুব প্রশংসা করলেন।` },
  ];
  return frames[v] ?? frames[0]!;
}

// ---------- story frames ----------

interface OxFrame {
  titleBn: string;
  titleEn: string;
  introBn: string;
  outroBn: string;
}

const FRAMES: OxFrame[] = [
  { titleBn: "স্কুলের একদিন", titleEn: "A Day at School", introBn: "{name} সকালে ব্যাগ কাঁধে স্কুলে গেল। সেদিন ক্লাসে আর খেলার মাঠে একের পর এক এমন সব ঘটনা ঘটল, যেগুলো তার অনেক দিন মনে থাকবে।", outroBn: "বাড়ি ফিরে {name} মাকে সারাদিনের গল্প বলল। মা হেসে বললেন, “একটি সাধারণ দিনও কত কিছু শেখায়!”" },
  { titleBn: "বাজারের সকাল", titleEn: "A Morning at the Market", introBn: "{name} ভোরে মায়ের সঙ্গে বাজারে গেল। সবজি, মাছ আর মানুষের ভিড়ের মধ্যে দিয়ে হাঁটতে হাঁটতে সে চারপাশের সবকিছু খেয়াল করতে লাগল।", outroBn: "ভারী ব্যাগ হাতে বাড়ি ফেরার পথে {name} বুঝল, বাজারের সকালটা তাকে অনেক নতুন জিনিস শিখিয়ে দিয়েছে।" },
  { titleBn: "বৃষ্টিভেজা যাত্রা", titleEn: "A Rainy Journey", introBn: "{name} ট্রেনে করে গ্রামের বাড়ি যাচ্ছিল, তখনই ঝমঝমিয়ে বৃষ্টি নামল। জানালার পাশে বসে সে বাইরের ভেজা পৃথিবীটা দেখতে লাগল।", outroBn: "ট্রেন গন্তব্যে পৌঁছানোর আগেই বৃষ্টি থেমে গেল, আর ভেজা মাটির গন্ধে {name}-এর মন ভরে গেল।" },
  { titleBn: "পরিবারের সঙ্গে এক সন্ধ্যা", titleEn: "An Evening with Family", introBn: "শুক্রবার সন্ধ্যায় {name}-এর পরিবারের সবাই বাড়িতে ছিল। চা আর গল্পের মধ্যে দিয়ে সন্ধ্যাটা ধীরে ধীরে জমে উঠল।", outroBn: "রাত গভীর হলে {name} মনে মনে বলল, পরিবারের সঙ্গে কাটানো এমন সন্ধ্যাই জীবনের আসল সম্পদ।" },
  { titleBn: "গ্রামের বাড়িতে ছুটি", titleEn: "A Holiday in the Village", introBn: "{name} ছুটিতে গ্রামের বাড়িতে গেল। শহরের কোলাহল থেকে দূরে, সবুজ মাঠ আর নদীর পাড়ে তার দিনগুলো কাটতে লাগল।", outroBn: "ছুটি শেষে শহরে ফেরার সময় {name} পেছনে তাকিয়ে প্রতিশ্রুতি দিল, সে আবার গ্রামে ফিরবে।" },
  { titleBn: "পরীক্ষার আগের রাত", titleEn: "The Night Before the Exam", introBn: "পরীক্ষার আগের রাতে {name} পড়ার টেবিলে বসেছিল। বাড়ির সবাই নিঃশব্দে চলাফেরা করছিল, যাতে তার পড়ায় ব্যাঘাত না ঘটে।", outroBn: "রাত দশটায় বই বন্ধ করে {name} শান্ত মনে ঘুমিয়ে পড়ল — কালকের পরীক্ষা নিয়ে তার আর কোনো ভয় নেই।" },
  { titleBn: "নতুন শহরে প্রথম দিন", titleEn: "First Day in a New City", introBn: "{name} একটি মাত্র ব্যাগ আর অনেক স্বপ্ন নিয়ে নতুন শহরে পৌঁছাল। অচেনা রাস্তা আর অচেনা মানুষের মধ্যে তার প্রথম দিনটা শুরু হলো।", outroBn: "সেদিন রাতে বিছানায় শুয়ে {name}-এর মনে হলো, নতুন শহরটা ধীরে ধীরে তার নিজের হয়ে উঠছে।" },
  { titleBn: "বন্ধুর জন্মদিন", titleEn: "A Friend's Birthday", introBn: "সেদিন ছিল {name}-এর প্রিয় বন্ধুর জন্মদিন। বাড়ির ছোট্ট আয়োজনে হাসি আর আনন্দে ভরে উঠল চারপাশ।", outroBn: "বিদায়ের আগে বন্ধুটি বলল, এটি ছিল তার জীবনের সবচেয়ে সুন্দর জন্মদিন।" },
  { titleBn: "নদীর পাড়ে পিকনিক", titleEn: "A Picnic by the River", introBn: "ছুটির দিনে {name} পরিবার নিয়ে নদীর পাড়ে পিকনিকে গেল। খোলা আকাশ, ঠান্ডা বাতাস আর নদীর কলকল শব্দে সবার মন ভরে গেল।", outroBn: "সূর্য ডোবার আগে পরিবারটি ভরা মন নিয়ে বাড়ির পথ ধরল।" },
  { titleBn: "অফিসের ব্যস্ত দিন", titleEn: "A Busy Day at the Office", introBn: "{name} একটি ছোট অফিসে কাজ করে। সেদিন সকাল থেকে সন্ধ্যা পর্যন্ত কাজের চাপে তার দম ফেলার সময় ছিল না।", outroBn: "দেরি করে অফিস থেকে বেরিয়ে {name} বুঝল, ব্যস্ত দিনটাই তাকে সবচেয়ে বেশি শিখিয়েছে।" },
  { titleBn: "হাসপাতালে একদিন", titleEn: "A Day at the Hospital", introBn: "{name} সেদিন অসুস্থ দাদাকে নিয়ে হাসপাতালে গেল। ব্যস্ত করিডোরে সে অনেক মানুষের অনেক গল্প দেখল।", outroBn: "সন্ধ্যায় দাদাকে নিয়ে বাড়ি ফেরার পথে {name} মনে মনে সবার সুস্থতা কামনা করল।" },
  { titleBn: "ছোট্ট দোকানের গল্প", titleEn: "The Little Shop", introBn: "পাড়ার মোড়ের ছোট্ট দোকানটায় {name} প্রায়ই যায়। সেদিন দোকানে একের পর এক মজার ঘটনা ঘটতে লাগল।", outroBn: "দোকান থেকে ফেরার পথে {name} হাসল — ছোট্ট দোকানটায় প্রতিদিনই একটি করে গল্প লুকিয়ে থাকে।" },
];

const NAMES = ["রাফি", "মিনা", "আরিফ", "নুসরাত", "করিম", "সুমা", "তানিয়া", "রাহিম", "ফারিয়া", "ইমরান", "সাকিব", "রিনা"];
const CONNECTORS = ["প্রথমে", "তারপর", "এরপর", "কিছুক্ষণ পরে", "হঠাৎ", "একটু পরে", "সন্ধ্যা নামতেই", "তারপর আবার", "কিছুক্ষণ পর আবার", "সবশেষে"];

function clauseFor(w: OxWord, name: string, idx: number, total: number): string {
  const conn = idx === total - 1 && total > 1 ? "সবশেষে" : CONNECTORS[idx % (CONNECTORS.length - 1)] ?? "তারপর";
  const W = capWord(w);
  const bn = bnFirst(w.bn);
  const cat = posCatOf(w);
  const v = hashOf(w.rawKey) % 2;
  if (cat === "verb") {
    return v === 0
      ? `${conn} ${name}-কে [[${W}]] করতে হলো — মানে ${w.bn}।`
      : `${conn} ${name} মন দিয়ে [[${W}]] করল — অর্থাৎ ${w.bn}।`;
  }
  if (cat === "adj") {
    return v === 0
      ? `${conn} সবকিছু হয়ে উঠল খুবই [[${W}]] — মানে ${bn}।`
      : `${conn} ${name}-কে দেখে সবাই বলল, সে সত্যিই [[${W}]] — অর্থাৎ ${bn}।`;
  }
  if (cat === "noun") {
    return v === 0
      ? `${conn} সবার চোখে পড়ল একটি [[${W}]] — বাংলায় যাকে বলে ${bn}।`
      : `${conn} ${name} একটি [[${W}]] নিয়ে কথা বলল — মানে ${bn}।`;
  }
  return v === 0
    ? `${conn} [[${W}]] কথাটি সবার মুখে মুখে ঘুরল — এর অর্থ ${w.bn}।`
    : `${conn} ${name} [[${W}]] শব্দটি ঠিক জায়গায় ব্যবহার করল — মানে ${w.bn}।`;
}

// ---------- hand-written opening stories ----------
// Story 01 and 02 are written by hand for the first twenty Everyday
// words; each is used only when the story's word list matches exactly.

const HANDWRITTEN: Record<string, { titleBn: string; titleEn: string; storyBn: string }> = {
  "hello|hi|hey|goodbye|bye|please|thanks|thank|sorry|excuse": {
    titleBn: "নতুন বন্ধুর সঙ্গে প্রথম দেখা",
    titleEn: "Meeting a New Friend",
    storyBn:
      "ঢাকার একটি স্কুলে নতুন ছাত্র এল সাকিব। প্রথম দিন সকালে সে দরজায় দাঁড়িয়ে হাসিমুখে বলল, “[[Hello]]!” তারপর ছোট্ট করে বলল, “[[Hi]], আমি সাকিব।” পাশের বেঞ্চের রাফি হেসে বলল, “[[Hey]], বসো এখানে!” দুজনের বন্ধুত্ব শুরু হয়ে গেল। ক্লাসে ঢোকার আগে সে শিক্ষককে বলল, “[[Excuse]] me, স্যার, আমি কি ভেতরে আসতে পারি?” শিক্ষক হেসে মাথা নাড়লেন।\n\nটিফিনের সময় সাকিব ভুল করে রাফির খাতা ফেলে দিল। সে সঙ্গে সঙ্গে বলল, “[[Sorry]], আমার ভুল হয়ে গেছে।” রাফি হেসে বলল, “ঠিক আছে।” সাকিব খাতাটা তুলে দিয়ে বলল, “[[Please]], এটা নাও।” রাফি বলল, “[[Thanks]]!” সাকিব উত্তর দিল, “তুমি আমার বন্ধু, [[thank]] you বলার দরকার নেই।” ছুটির সময় দুজনে একসঙ্গে গেট পর্যন্ত হাঁটল। রাফি বলল, “কাল আবার দেখা হবে। [[Goodbye]]!” সাকিব হাত নেড়ে বলল, “[[Bye]]! কাল দেখা হবে।” প্রথম দিনের ভয় কেটে গিয়ে সাকিবের মন ভরে গেল — নতুন স্কুলে তার একজন বন্ধু হয়ে গেছে।",
  },
  "welcome|yes|no|ok|man|woman|boy|girl|friend|family": {
    titleBn: "পার্কে এক বিকেল",
    titleEn: "An Afternoon in the Park",
    storyBn:
      "বিকেলে রাফি তার [[friend]] সাকিবকে নিয়ে পার্কে গেল। গেটের কাছে একজন [[man]] হাসিমুখে তাদের বললেন, “[[Welcome]]! পার্কে স্বাগতম।” ভেতরে একটি [[woman]] তার ছোট [[boy]] আর [[girl]]-কে নিয়ে বসে ছিলেন; পুরো [[family]] একসঙ্গে বাদাম খাচ্ছিল।\n\nসাকিব জিজ্ঞেস করল, “আমরা কি ওই বেঞ্চটায় বসতে পারি?” রাফি বলল, “[[Yes]], অবশ্যই পারি।” কিন্তু বেঞ্চটা ভেজা ছিল। সাকিব বলল, “[[No]], এখানে বসা যাবে না, বেঞ্চ ভেজা।” রাফি অন্য বেঞ্চ দেখিয়ে বলল, “ওইটা শুকনো আছে।” সাকিব হেসে বলল, “[[Ok]], চলো ওখানেই বসি।” দুই বন্ধু শুকনো বেঞ্চে বসে সারাটা বিকেল গল্প করল।",
  },
};

// ---------- stories & modules ----------

export interface OxStoryWord {
  word: OxWord;
  pronBn: string;
  synonymEn: string | null;
  example: [string, string];
}

export interface OxStory {
  /** Global story number, 1-based, in learning order across all sections. */
  num: number;
  /** Story number inside its module (1-based). */
  localNum: number;
  sectionId: string;
  titleBn: string;
  titleEn: string;
  storyBn: string;
  words: OxStoryWord[];
}

export interface OxModule {
  id: string;
  num: number;
  sectionId: string;
  titleEn: string;
  titleBn: string;
  storyCount: number;
  wordCount: number;
  stories: OxStory[];
}

export const OX_SECTION_ORDER = ["everyday", "A1", "A2", "B1", "B2"] as const;
export type OxSectionId = (typeof OX_SECTION_ORDER)[number];

export const OX_SECTION_TITLES: Record<string, { en: string; bn: string }> = {
  everyday: { en: "Everyday Life & Spoken English", bn: "দৈনন্দিন জীবন ও কথ্য ইংরেজি" },
  A1: { en: "Level A1", bn: "স্তর A1" },
  A2: { en: "Level A2", bn: "স্তর A2" },
  B1: { en: "Level B1", bn: "স্তর B1" },
  B2: { en: "Level B2", bn: "স্তর B2" },
};

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function sectionWords(sectionId: string): OxWord[] {
  if (sectionId === "everyday") return oxEverydayWords();
  const everydayKeys = new Set(oxEverydayWords().map((w) => w.rawKey));
  return oxWordsOfLevel(sectionId as "A1" | "A2" | "B1" | "B2").filter((w) => !everydayKeys.has(w.rawKey));
}

function buildStoryBn(words: OxWord[], frame: OxFrame, name: string): string {
  const clauses = words.map((w, i) => clauseFor(w, name, i, words.length));
  const half = Math.ceil(clauses.length / 2);
  const intro = frame.introBn.replaceAll("{name}", name);
  const outro = frame.outroBn.replaceAll("{name}", name);
  const para1 = [intro, ...clauses.slice(0, half)].join(" ");
  const para2 = [...clauses.slice(half), outro].join(" ");
  return `${para1}\n\n${para2}`;
}

function buildModules(): OxModule[] {
  const modules: OxModule[] = [];
  let moduleNum = 0;
  let storyNum = 0;
  for (const sectionId of OX_SECTION_ORDER) {
    const words = sectionWords(sectionId);
    const storyChunks = chunk(words, 10);
    const stories: OxStory[] = storyChunks.map((group, gi) => {
      storyNum += 1;
      const num = storyNum;
      const frame = FRAMES[(num - 1) % FRAMES.length] ?? FRAMES[0]!;
      const name = NAMES[(num - 1) % NAMES.length] ?? "রাফি";
      const key = group.map((w) => w.word.toLowerCase()).join("|");
      const hand = HANDWRITTEN[key];
      return {
        num,
        localNum: gi + 1,
        sectionId,
        titleBn: hand?.titleBn ?? frame.titleBn,
        titleEn: hand?.titleEn ?? frame.titleEn,
        storyBn: hand?.storyBn ?? buildStoryBn(group, frame, name),
        words: group.map((w) => ({
          word: w,
          pronBn: oxPronBn(w.word),
          synonymEn: w.synonyms[0]?.en ?? null,
          example: oxStoryExample(w),
        })),
      };
    });
    const secTitle = OX_SECTION_TITLES[sectionId] ?? { en: sectionId, bn: sectionId };
    chunk(stories, 10).forEach((group, pi) => {
      moduleNum += 1;
      modules.push({
        id: `ox-${sectionId.toLowerCase()}-${pi + 1}`,
        num: moduleNum,
        sectionId,
        titleEn: `${secTitle.en} — Part ${pi + 1}`,
        titleBn: `${secTitle.bn} — পর্ব ${oxBnNum(pi + 1)}`,
        storyCount: group.length,
        wordCount: group.reduce((s, g) => s + g.words.length, 0),
        stories: group.map((g, i) => ({ ...g, localNum: i + 1 })),
      });
    });
  }
  return modules;
}

export const OX_MODULES: OxModule[] = buildModules();
export const OX_STORIES: OxStory[] = OX_MODULES.flatMap((m) => m.stories);
export const OX_TOTAL_STORIES = OX_STORIES.length;
export const OX_TOTAL_STORY_WORDS = OX_STORIES.reduce((s, g) => s + g.words.length, 0);

// Sanity anchor for the DATA-PLAN: the stories must cover the Oxford
// list exactly once (3,003 words).
export const OX_WORDS_COUNT = OX_WORDS.length;
