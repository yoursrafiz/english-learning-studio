// Oxford 3000 section — derived word data.
//
// The word list, parts of speech and CEFR levels come from the learner's
// uploaded PDF (see oxford-data.ts). Everything else — definitions, Bengali
// meanings (oxford-content.ts), examples, micro-stories and relation stories —
// is original content written for this app, generated here with the same
// rotating-frame approach the 125 lessons use for their generated content.
// A word's primary level is the lowest level among its senses, so every word
// lives in exactly one level section; words in the Everyday track keep their
// level home and are only flagged there, never duplicated.

import { OX_RAW, type OxLevel } from "./oxford-data";
import { OX_CONTENT } from "./oxford-content";
import { OX_ANT_GLOSS } from "./oxford-antonym-gloss";
import { LESSONS, type Rel, type RelStory } from "./curriculum";

export type { OxLevel };

export interface OxSense {
  pos: string;
  level: OxLevel;
}

export interface OxWord {
  /** Server word-state key, namespaced so it can never collide with lesson keys. */
  key: string;
  /** Raw key inside oxford-data / oxford-content. */
  rawKey: string;
  word: string;
  qualifier: string | null;
  senses: OxSense[];
  posLabel: string;
  level: OxLevel;
  bn: string;
  defEn: string;
  defBn: string;
  exEn: string;
  exBn: string;
  synonyms: Rel[];
  antonyms: Rel[];
  noAntonym: boolean;
  antonymNote: string | null;
  micro: { titleEn: string; titleBn: string; lines: { en: string; bn: string }[] };
  everydayCat: string | null;
}

const NAMES = ["Rafi", "Mina", "Arif", "Nusrat", "Karim", "Suma"];

function hashOf(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function parseSenses(s: string): OxSense[] {
  // Senses are "pos:level" pairs, but a pos can itself contain a comma
  // ("prep., adv.:A1"), so regroup comma tokens until one ends in a level.
  const out: OxSense[] = [];
  let buf = "";
  for (const tok of s.split(",")) {
    buf = buf ? `${buf},${tok}` : tok;
    const m = /:(A1|A2|B1|B2)\s*$/.exec(buf);
    if (m) {
      out.push({ pos: buf.slice(0, buf.length - m[0].length).trim(), level: m[1] as OxLevel });
      buf = "";
    }
  }
  if (buf) out.push({ pos: buf.trim(), level: "A1" });
  return out;
}

// ---- Bengali gloss lookup for synonyms / antonyms ----
// A related word's Bengali meaning comes from the Oxford list itself when the
// related word is also an Oxford word, otherwise from the 125 lessons'
// vocabulary and relations. A relation whose Bengali meaning cannot be found
// in either source is dropped rather than shown with a guessed meaning.
const gloss = new Map<string, string>();
for (const [rawKey, word] of OX_RAW.map((r) => [r[0], r[1]] as const)) {
  const k = word.toLowerCase();
  if (!gloss.has(k)) {
    const c = OX_CONTENT[rawKey];
    if (c) gloss.set(k, c[0]);
  }
}
for (const lesson of LESSONS) {
  for (const e of lesson.entries) {
    const k = e.en.toLowerCase();
    if (!gloss.has(k)) gloss.set(k, e.bn);
    for (const r of [...e.synonyms, ...e.antonyms, ...e.alternatives]) {
      const rk = r.en.toLowerCase();
      if (!gloss.has(rk)) gloss.set(rk, r.bn);
    }
  }
}
// Hand-authored Bengali meanings for genuine antonyms that are not Oxford
// headwords or lesson words (e.g. "inability", "ungrateful"). Without these,
// antonyms already listed in oxford-content.ts would be dropped by the
// lookup above even though they are real, dictionary-listed opposites.
for (const [k, v] of Object.entries(OX_ANT_GLOSS)) {
  if (!gloss.has(k)) gloss.set(k, v);
}

function splitList(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

function buildOxRelStory(
  headEn: string,
  headBn: string,
  relEn: string,
  relBn: string,
  kind: "syn" | "ant",
  level: OxLevel,
): RelStory {
  const h = hashOf(`${headEn}|${relEn}|${kind}`);
  const v = h % 2;
  const name = NAMES[h % NAMES.length] ?? "Rafi";
  const friend = NAMES[(h + 2) % NAMES.length] ?? "Mina";
  const topicEn = `the Oxford 3000 ${level} word list`;
  const topicBn = `Oxford 3000-এর ${level} স্তরের শব্দের তালিকা`;
  if (kind === "syn") {
    const titles: [string, string][] = [
      ["Two Words, One Meaning", "দুটি শব্দ, একই অর্থ"],
      ["Say It Another Way", "অন্যভাবে বলুন"],
    ];
    const bodies: { en: string; bn: string }[][] = [
      [
        { en: `${name} was learning words from ${topicEn} with ${friend}.`, bn: `${name} ${friend}-এর সঙ্গে ${topicBn} থেকে শব্দ শিখছিল।` },
        { en: `"For '${headEn}' we can also say '${relEn}'," ${friend} said.`, bn: `"${headEn}"-এর বদলে আমরা "${relEn}"-ও বলতে পারি," ${friend} বলল।` },
        { en: `"${relEn} means ${relBn} — the same as ${headBn}!" ${name} repeated happily.`, bn: `"${relEn}" মানে ${relBn} — ঠিক ${headBn}-এর মতোই!" ${name} খুশি হয়ে আবার বলল।` },
        { en: `Now ${name} knows two ways to say the same thing.`, bn: `এখন ${name} একই কথা দুইভাবে বলতে পারে।` },
      ],
      [
        { en: `The teacher wrote "${headEn}" on the board.`, bn: `শিক্ষক বোর্ডে "${headEn}" লিখলেন।` },
        { en: `"Who knows another word like this?" she asked.`, bn: `"এর মতো আরেকটি শব্দ কে জানে?" তিনি জিজ্ঞাসা করলেন।` },
        { en: `${name} raised a hand: "'${relEn}' — it means ${relBn}."`, bn: `${name} হাত তুলল: "'${relEn}' — এর অর্থ ${relBn}।"` },
        { en: `"Very good!" the teacher said. "Same meaning, new word."`, bn: `"খুব ভালো!" শিক্ষক বললেন। "একই অর্থ, নতুন শব্দ।"` },
      ],
    ];
    const title = titles[v] ?? titles[0] ?? ["", ""];
    return { titleEn: title[0] ?? "", titleBn: title[1] ?? "", lines: bodies[v] ?? bodies[0] ?? [] };
  }
  const titles: [string, string][] = [
    ["The Opposite Word", "বিপরীত শব্দ"],
    ["Two Different Pictures", "দুটি আলাদা ছবি"],
  ];
  const bodies: { en: string; bn: string }[][] = [
    [
      { en: `${name} asked ${friend}, "What is the opposite of '${headEn}'?"`, bn: `${name} ${friend}-কে জিজ্ঞাসা করল, "'${headEn}'-এর বিপরীত শব্দ কী?"` },
      { en: `"${relEn}," ${friend} answered. "It means ${relBn} — completely different from ${headBn}."`, bn: `"${relEn}," ${friend} উত্তর দিল। "এর অর্থ ${relBn} — ${headBn} থেকে সম্পূর্ণ আলাদা।"` },
      { en: `${name} made two sentences, one with each word.`, bn: `${name} দুটি শব্দ দিয়ে দুটি বাক্য বানাল।` },
      { en: `Now the difference is clear and easy to remember.`, bn: `এখন পার্থক্যটি স্পষ্ট এবং মনে রাখা সহজ।` },
    ],
    [
      { en: `One day ${name} felt confused between "${headEn}" and "${relEn}".`, bn: `একদিন ${name} "${headEn}" ও "${relEn}" নিয়ে দ্বিধায় পড়ল।` },
      { en: `Mother explained: "${headEn} means ${headBn}, but ${relEn} means ${relBn}."`, bn: `মা বুঝিয়ে বললেন: "${headEn} মানে ${headBn}, কিন্তু ${relEn} মানে ${relBn}।"` },
      { en: `"They are opposites!" ${name} said with a smile.`, bn: `"এরা একে অপরের বিপরীত!" ${name} হেসে বলল।` },
      { en: `${name} used both words correctly all day.`, bn: `${name} সারাদিন দুটি শব্দই সঠিকভাবে ব্যবহার করল।` },
    ],
  ];
  const title = titles[v] ?? titles[0] ?? ["", ""];
  return { titleEn: title[0] ?? "", titleBn: title[1] ?? "", lines: bodies[v] ?? bodies[0] ?? [] };
}

function buildOxMicro(w: OxWord, idx: number): OxWord["micro"] {
  const name = NAMES[idx % NAMES.length] ?? "Rafi";
  const friend = NAMES[(idx + 2) % NAMES.length] ?? "Mina";
  const display = w.word;
  const bn = w.bn;
  const frame = idx % 4;
  if (frame === 0) {
    return {
      titleEn: `A New Word for ${name}`,
      titleBn: `${name}-এর নতুন শব্দ`,
      lines: [
        { en: `${name} opened the Oxford 3000 ${w.level} word list one morning.`, bn: `এক সকালে ${name} Oxford 3000-এর ${w.level} স্তরের শব্দের তালিকা খুলল।` },
        { en: `The first new word was "${display}".`, bn: `প্রথম নতুন শব্দটি ছিল "${display}"।` },
        { en: `In Bengali, "${display}" means ${bn}.`, bn: `বাংলায় "${display}" মানে ${bn}।` },
        { en: `${name} wrote it in a notebook and practised it three times.`, bn: `${name} শব্দটি খাতায় লিখল এবং তিনবার অনুশীলন করল।` },
        { en: `"I will remember '${display}' — ${bn}," ${name} said with a smile.`, bn: `"আমি '${display}' মনে রাখব — ${bn}," ${name} হেসে বলল।` },
      ],
    };
  }
  if (frame === 1) {
    return {
      titleEn: `${name} and ${friend} Practise Together`,
      titleBn: `${name} ও ${friend} একসঙ্গে অনুশীলন করে`,
      lines: [
        { en: `After school, ${name} met ${friend} in the park.`, bn: `স্কুলের পর ${name} পার্কে ${friend}-এর সঙ্গে দেখা করল।` },
        { en: `They opened the Oxford 3000 ${w.level} list on a phone.`, bn: `তারা ফোনে Oxford 3000-এর ${w.level} স্তরের তালিকা খুলল।` },
        { en: `${friend} pointed at a word and asked, "What does '${display}' mean?"`, bn: `${friend} একটি শব্দের দিকে ইশারা করে জিজ্ঞাসা করল, "'${display}' মানে কী?"` },
        { en: `"It means ${bn}," ${name} answered. "Say it with me: ${display}."`, bn: `"এর মানে ${bn}," ${name} উত্তর দিল। "আমার সঙ্গে বলো: ${display}।"` },
        { en: `They said '${display}' together three times and laughed.`, bn: `তারা একসঙ্গে তিনবার '${display}' বলল এবং হাসল।` },
      ],
    };
  }
  if (frame === 2) {
    return {
      titleEn: `Evening Revision at Home`,
      titleBn: `বাড়িতে সন্ধ্যার ঝালাই`,
      lines: [
        { en: `In the evening, ${name} sat with mother to revise the day's words.`, bn: `সন্ধ্যায় ${name} মায়ের সঙ্গে বসে দিনের শব্দগুলো ঝালিয়ে নিল।` },
        { en: `Mother asked, "Which ${w.level} word did you learn today?"`, bn: `মা জিজ্ঞাসা করলেন, "আজ ${w.level} স্তরের কোন শব্দটি শিখলে?"` },
        { en: `"I learned '${display}'. In our language it means ${bn}," ${name} said.`, bn: `"আমি '${display}' শিখেছি। আমাদের ভাষায় এর অর্থ ${bn}," ${name} বলল।` },
        { en: `Mother smiled and repeated the word slowly: "${display}."`, bn: `মা হেসে ধীরে ধীরে শব্দটি বললেন: "${display}।"` },
        { en: `"Very good, Mother!" ${name} said. "Tomorrow I will teach you one more."`, bn: `"খুব ভালো, মা!" ${name} বলল। "আগামীকাল আরও একটি শেখাব।"` },
      ],
    };
  }
  return {
    titleEn: `The Word on the Wall`,
    titleBn: `দেয়ালের শব্দ`,
    lines: [
      { en: `${name} sticks one new word card on the bedroom wall every day.`, bn: `${name} প্রতিদিন শোবার ঘরের দেয়ালে একটি করে নতুন শব্দের কার্ড লাগায়।` },
      { en: `Today's card, from the ${w.level} list, says "${display}" in big letters.`, bn: `আজকের কার্ডে, ${w.level} তালিকা থেকে, বড় অক্ষরে লেখা "${display}"।` },
      { en: `Under it, ${name} wrote the Bengali meaning: ${bn}.`, bn: `তার নিচে ${name} বাংলা অর্থ লিখল: ${bn}।` },
      { en: `Every time ${name} passes the wall, the word "${display}" is practised once more.`, bn: `যতবার ${name} দেয়ালের পাশ দিয়ে যায়, "${display}" শব্দটি আরও একবার ঝালাই হয়।` },
      { en: `Small steps every day — that is how ${name} learns English.`, bn: `প্রতিদিন ছোট ছোট পদক্ষেপ — এভাবেই ${name} ইংরেজি শেখে।` },
    ],
  };
}

// ---- Everyday Life & Spoken English track ----
// A hand-picked starter track: the words a learner needs every day, grouped
// by situation. Each key appears in exactly one category; the word still
// lives in its level section, flagged as covered here.
export interface EverydayCat {
  id: string;
  en: string;
  bn: string;
  icon: string;
  keys: string[];
}

export const EVERYDAY_CATS: EverydayCat[] = [
  {
    id: "greetings",
    en: "Greetings & Polite Words",
    bn: "অভিবাদন ও ভদ্র শব্দ",
    icon: "handshake",
    keys: ["hello", "hi", "hey", "goodbye", "bye", "please", "thanks", "thank", "sorry", "excuse", "welcome", "yes", "no", "ok"],
  },
  {
    id: "people",
    en: "People & Family",
    bn: "মানুষ ও পরিবার",
    icon: "family",
    keys: ["man", "woman", "boy", "girl", "friend", "family", "mother", "father", "dad", "mom", "parent", "brother", "sister", "child", "baby", "husband", "wife", "people", "person", "name"],
  },
  {
    id: "home",
    en: "At Home",
    bn: "বাড়িতে",
    icon: "home",
    keys: ["home", "house", "room", "door", "window", "table", "chair", "kitchen", "toilet", "key", "wall", "floor", "roof", "garden", "address", "light-from-the-sun-a-lamp"],
  },
  {
    id: "food",
    en: "Food & Drink",
    bn: "খাবার ও পানীয়",
    icon: "bowl-rice",
    keys: ["food", "water", "tea", "coffee", "milk", "rice", "bread", "egg", "fish", "meat", "fruit", "apple", "orange", "eat", "drink", "breakfast", "lunch", "dinner", "hungry", "thirsty", "cook", "cooking", "restaurant", "cake", "sugar", "salt"],
  },
  {
    id: "time",
    en: "Time & Days",
    bn: "সময় ও দিন",
    icon: "clock",
    keys: ["time", "day", "today", "tomorrow", "yesterday", "morning", "evening", "night", "week", "month", "year", "hour", "minute", "second-unit-of-time", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "now", "early", "late", "always", "never", "often", "sometimes", "o-clock"],
  },
  {
    id: "travel",
    en: "Travel & Places",
    bn: "ভ্রমণ ও জায়গা",
    icon: "map",
    keys: ["go", "come", "walk", "run", "car", "bus", "train", "road", "street", "city", "town", "village", "country", "place", "here", "there", "left", "right", "near", "far", "travel", "trip", "hotel", "map", "ticket", "visit", "leave", "stop", "wait"],
  },
  {
    id: "shopping",
    en: "Shopping & Money",
    bn: "কেনাকাটা ও টাকা",
    icon: "shopping-cart",
    keys: ["money", "price", "buy", "sell", "shop", "shopping", "market", "store", "cost", "cheap", "expensive", "pay", "dollar", "bank-money", "open", "closed", "free"],
  },
  {
    id: "health",
    en: "Health & Body",
    bn: "স্বাস্থ্য ও শরীর",
    icon: "hand",
    keys: ["head", "eye", "ear", "nose", "mouth", "hand", "foot", "hair", "body", "face", "tooth", "leg", "finger", "stomach", "heart", "doctor", "hospital", "sick", "ill", "pain", "medicine", "tired", "health", "healthy"],
  },
  {
    id: "work-school",
    en: "Work & School",
    bn: "কাজ ও স্কুল",
    icon: "book",
    keys: ["work", "job", "office", "school", "teacher", "student", "book", "read", "write", "learn", "study", "lesson", "question", "word", "language", "speak", "listen", "understand", "know", "think", "class", "exam"],
  },
  {
    id: "routines",
    en: "Daily Routines",
    bn: "দৈনন্দিন কাজ",
    icon: "refresh",
    keys: ["sleep", "wake", "wash", "dress", "dressed", "clean", "play", "sit", "stand", "help", "start", "finish", "close"],
  },
  {
    id: "verbs",
    en: "Common Verbs & Expressions",
    bn: "সাধারণ ক্রিয়া ও অভিব্যক্তি",
    icon: "comment",
    keys: ["be-v-auxiliary", "have", "do1-v-auxiliary", "get", "make", "take", "give", "see", "look", "say", "tell", "ask", "want", "need", "like-find-sb-sth-pleasant", "love", "use", "find", "keep", "let", "put", "bring", "call", "try", "feel", "show", "move", "change", "turn", "live"],
  },
];

const everydayCatOf = new Map<string, string>();
for (const cat of EVERYDAY_CATS) {
  for (const k of cat.keys) everydayCatOf.set(k, cat.id);
}
export const EVERYDAY_KEYS = new Set(everydayCatOf.keys());

function buildWord(raw: (typeof OX_RAW)[number], idx: number): OxWord {
  const [rawKey, word, qualifier, sensesStr, levelStr] = raw;
  const level = (levelStr || "A1") as OxLevel;
  const senses = parseSenses(sensesStr);
  const content = OX_CONTENT[rawKey] ?? ["", "", "", ""];
  const [bn, defEn, synStr, antStr] = content;
  const firstPos = senses[0]?.pos ?? "";
  const isVerb = /(^|[\s,])v\.|modal/.test(firstPos);
  const isAdj = /adj\./.test(firstPos);
  const lower = word.toLowerCase();
  const simpleWord = !/[\s-]/.test(word);
  const exEn = isVerb && simpleWord
    ? [`We ${lower} together on Fridays.`, `${NAMES[idx % NAMES.length] ?? "Rafi"} can ${lower} very well.`, `They ${lower} at home in the evening.`][idx % 3] ?? `We use the word "${lower}" in everyday English.`
    : isAdj
      ? [`It was a ${lower} day, and everyone noticed it.`, `She felt ${lower} after the long day.`, `He looked ${lower} but tried to smile.`][idx % 3] ?? `We use the word "${lower}" in everyday English.`
      : `We use the word "${lower}" when we talk about everyday English.`;
  // Synonyms share the head word's meaning, so when a synonym is not itself
  // an Oxford/lesson word with its own gloss, it is shown with the head
  // word's Bengali meaning. Antonyms are never glossed this way — an
  // unresolved antonym is dropped rather than given a wrong meaning.
  const toRels = (list: string[], kind: "syn" | "ant"): Rel[] =>
    list
      .map((en) => {
        const relBn = gloss.get(en.toLowerCase()) ?? (kind === "syn" ? bn : undefined);
        return relBn ? { en, bn: relBn } : null;
      })
      .filter((r): r is { en: string; bn: string } => r !== null)
      .map((r) => ({ ...r, story: buildOxRelStory(word, bn, r.en, r.bn, kind, level) }));
  const antonymRels = toRels(splitList(antStr), "ant");
  const w: OxWord = {
    key: `OX-${rawKey}`,
    rawKey,
    word,
    qualifier: qualifier ?? null,
    senses,
    posLabel: senses.map((s) => `${s.pos} ${s.level}`).join(" · "),
    level,
    bn,
    defEn,
    defBn: `বাংলায় "${word}" মানে ${bn}। Oxford 3000 তালিকায় এটি ${level} স্তরের শব্দ।`,
    exEn,
    exBn: `আমরা যখন দৈনন্দিন ইংরেজি বলি, তখন "${word}" শব্দটি ব্যবহার করি।`,
    synonyms: toRels(splitList(synStr), "syn"),
    antonyms: antonymRels,
    noAntonym: antonymRels.length === 0,
    antonymNote:
      antonymRels.length === 0
        ? "No natural antonym for this meaning — English has no true opposite for this word, so none is invented here."
        : null,
    micro: { titleEn: "", titleBn: "", lines: [] },
    everydayCat: everydayCatOf.get(rawKey) ?? null,
  };
  w.micro = buildOxMicro(w, idx);
  return w;
}

export const OX_WORDS: OxWord[] = OX_RAW.map((raw, i) => buildWord(raw, i));

export const OX_BY_KEY = new Map(OX_WORDS.map((w) => [w.rawKey, w]));

export const OX_LEVELS: OxLevel[] = ["A1", "A2", "B1", "B2"];

export function oxWordsOfLevel(level: OxLevel): OxWord[] {
  return OX_WORDS.filter((w) => w.level === level);
}

export function oxLevelCount(level: OxLevel): number {
  return oxWordsOfLevel(level).length;
}

export function oxEverydayWords(): OxWord[] {
  return EVERYDAY_CATS.flatMap((cat) => cat.keys.map((k) => OX_BY_KEY.get(k)).filter((w): w is OxWord => w !== undefined));
}

export function searchOxford(q: string): OxWord[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const hits: OxWord[] = [];
  for (const w of OX_WORDS) {
    if (
      w.word.toLowerCase().includes(query) ||
      w.bn.includes(q.trim()) ||
      w.synonyms.some((s) => s.en.toLowerCase().includes(query)) ||
      w.antonyms.some((s) => s.en.toLowerCase().includes(query))
    ) {
      hits.push(w);
    }
    if (hits.length >= 60) break;
  }
  return hits;
}
