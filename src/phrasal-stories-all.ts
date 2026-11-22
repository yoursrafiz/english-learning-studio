// All-phrasal-verbs story modules — every phrasal verb list in the app,
// organised module by module in one clear learning order, in the same
// book style as Module 01 ("গল্পে গল্পে PHRASAL VERBS"):
//
//   Module 01  Daily Life and Unexpected Situations (the book module,
//              hand-written in phrasal-story-groups.ts — untouched)
//   Module 02–03   Most common (77 entries, Grammarly list order)
//   Module 04–08   More common (208 entries, EnglishClub list order)
//   Module 09–10   Business English (100 entries, the source's own 10
//              groups of 10 — two stories of 5 per group, in order)
//   Module 11+     Complete A–Z list from the learner's PDF (3,139
//              entries), grouped by letter; each letter's stories are
//              split into modules of at most 10 stories.
//
// Every module holds at most 10 stories; every story holds 5 entries
// (the last story of a list / letter may hold fewer). Within each list,
// every entry appears in exactly one story — no entry is left out and
// none is repeated. (The lists themselves overlap — e.g. "back up" is
// in several lists — so a verb can appear once per list it belongs to;
// Module 01's book set is its own separate set of 50.)
//
// How each new story is built: a rotating set of original everyday-life
// frames (a busy week, a market morning, a rainy journey…) gives the
// story its setting, Bengali title and opening/closing lines. Inside the
// frame, each entry's own example sentence from its list becomes one
// connected "moment" of the story — in English with the phrasal verb
// marked [[...]] (rendered underlined + bold, exactly like Module 01),
// and in Bengali with the list's own Bengali translation of that
// example, followed by the verb itself marked [[...]] as it appears in
// the Bengali book. The story table takes the verb, the list's own
// Bengali meaning, and an English meaning (phrasal-gloss-en.ts for the
// three lists; the PDF's own English meaning for the Complete List).
// Complete List stories take their Bengali meanings and example
// translations from the app's existing translation cache (the same
// translatePhrasalBatch flow as the All Phrasal Verbs list); until a
// translation exists, the Bengali parts honestly show the app's
// "translation being prepared" note instead of an invented translation.

import { PV_BUSINESS_GROUPS, PV_COMMON, PV_MORE, type PhrasalVerb } from "./phrasal-verbs";
import { PV_PDF, type PdfPhrasalVerb } from "./phrasal-pdf";
import { PV_MODULE, PV_STORY_GROUPS, type PvStoryGroup } from "./phrasal-story-groups";
import { pvListMeaningEn } from "./phrasal-gloss-en";

export type PvTranslationLike = { meaningBn: string; exampleBn: string };

// ---------- verb marking in example sentences ----------
// Finds the phrasal verb inside its own example sentence (base form,
// inflected, or split around an object, e.g. "backed her up") and wraps
// the matched span in [[...]] so the UI underlines it, like Module 01.

const IRREGULAR: Record<string, string[]> = {
  be: ["am", "is", "are", "was", "were", "been", "being"],
  bear: ["bore", "borne"], beat: ["beaten"], become: ["became"], begin: ["began", "begun"],
  bend: ["bent"], bite: ["bit", "bitten"], bleed: ["bled"], blow: ["blew", "blown"],
  break: ["broke", "broken"], bring: ["brought"], build: ["built"], burn: ["burnt"],
  buy: ["bought"], catch: ["caught"], choose: ["chose", "chosen"], come: ["came"],
  cut: ["cut"], deal: ["dealt"], dig: ["dug"], do: ["did", "done", "does"],
  draw: ["drew", "drawn"], dream: ["dreamt"], drink: ["drank", "drunk"], drive: ["drove", "driven"],
  eat: ["ate", "eaten"], fall: ["fell", "fallen"], feed: ["fed"], feel: ["felt"],
  fight: ["fought"], find: ["found"], fly: ["flew", "flown"], forbid: ["forbade", "forbidden"],
  forget: ["forgot", "forgotten"], forgive: ["forgave", "forgiven"], freeze: ["froze", "frozen"],
  get: ["got", "gotten"], give: ["gave", "given"], go: ["went", "gone", "goes"],
  grind: ["ground"], grow: ["grew", "grown"], hang: ["hung"], have: ["had", "has"],
  hear: ["heard"], hide: ["hid", "hidden"], hit: ["hit"], hold: ["held"],
  hurt: ["hurt"], keep: ["kept"], kneel: ["knelt"], know: ["knew", "known"],
  lay: ["laid"], lead: ["led"], lean: ["leant"], leap: ["leapt"], learn: ["learnt"],
  leave: ["left"], lend: ["lent"], let: ["let"], lie: ["lay", "lain"], light: ["lit"],
  lose: ["lost"], make: ["made"], mean: ["meant"], meet: ["met"], pay: ["paid"],
  put: ["put"], read: ["read"], ride: ["rode", "ridden"], ring: ["rang", "rung"],
  rise: ["rose", "risen"], run: ["ran"], say: ["said"], see: ["saw", "seen"],
  seek: ["sought"], sell: ["sold"], send: ["sent"], set: ["set"], sew: ["sewed", "sewn"],
  shake: ["shook", "shaken"], shine: ["shone"], shoot: ["shot"], show: ["showed", "shown"],
  shrink: ["shrank", "shrunk"], shut: ["shut"], sing: ["sang", "sung"], sink: ["sank", "sunk"],
  sit: ["sat"], sleep: ["slept"], slide: ["slid"], smell: ["smelt"], speak: ["spoke", "spoken"],
  spell: ["spelt"], spend: ["spent"], spill: ["spilt"], split: ["split"], spoil: ["spoilt"],
  spread: ["spread"], spring: ["sprang", "sprung"], stand: ["stood"], steal: ["stole", "stolen"],
  stick: ["stuck"], sting: ["stung"], strike: ["struck"], swear: ["swore", "sworn"],
  sweep: ["swept"], swim: ["swam", "swum"], swing: ["swung"], take: ["took", "taken"],
  teach: ["taught"], tear: ["tore", "torn"], tell: ["told"], think: ["thought"],
  throw: ["threw", "thrown"], understand: ["understood"], wake: ["woke", "woken"],
  wear: ["wore", "worn"], weep: ["wept"], win: ["won"], wind: ["wound"],
  withdraw: ["withdrew", "withdrawn"], write: ["wrote", "written"], wring: ["wrung"],
};

function formsOf(word: string): Set<string> {
  const w = word.toLowerCase();
  const forms = new Set<string>([w]);
  const irr = IRREGULAR[w];
  if (irr) for (const f of irr) forms.add(f);
  forms.add(w + "s");
  forms.add(w + "es");
  if (w.endsWith("e")) {
    forms.add(w + "d");
    forms.add(w.slice(0, -1) + "ing");
  } else {
    forms.add(w + "ed");
    forms.add(w + "ing");
    if (w.length >= 3 && /[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
      const doubled = w + w[w.length - 1];
      forms.add(doubled + "ed");
      forms.add(doubled + "ing");
    }
    if (w.endsWith("y") && !/[aeiou]y$/.test(w)) {
      forms.add(w.slice(0, -1) + "ies");
      forms.add(w.slice(0, -1) + "ied");
    }
  }
  return forms;
}

/** The verb form searched for in sentences: first alternative, without a leading "not". */
export function pvPrimaryForm(verb: string): string {
  const first = (verb.split("/")[0] ?? verb).trim().toLowerCase();
  return first.startsWith("not ") ? first.slice(4) : first;
}

export function markPvExample(example: string, verb: string): string {
  const primary = pvPrimaryForm(verb);
  const words = primary.split(/\s+/).filter(Boolean);
  const sentence = example.trim();
  if (words.length === 0) return sentence;
  const firstForms = formsOf(words[0] ?? "");
  const tokenRe = /[A-Za-z']+/g;
  const tokens: { text: string; start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(sentence)) !== null) {
    tokens.push({ text: m[0].toLowerCase(), start: m.index, end: m.index + m[0].length });
  }
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!t || !firstForms.has(t.text)) continue;
    // Match the remaining words of the verb in order, allowing a few
    // tokens in between (split phrasal verbs: "backed her up").
    let j = i;
    let ok = true;
    for (let w = 1; w < words.length; w++) {
      const want = words[w] ?? "";
      let found = -1;
      for (let k = j + 1; k < Math.min(tokens.length, j + 6); k++) {
        if (tokens[k]?.text === want) { found = k; break; }
      }
      if (found === -1) { ok = false; break; }
      j = found;
    }
    if (ok) {
      const from = t.start;
      const to = tokens[j]?.end ?? t.end;
      return sentence.slice(0, from) + "[[" + sentence.slice(from, to) + "]]" + sentence.slice(to);
    }
  }
  // The verb could not be located in its inflected form — keep the
  // sentence and add the verb itself, marked, so it is never missing.
  return sentence + " ([[" + primary + "]])";
}

// ---------- story frames ----------

interface PvFrame {
  titleBn: string;
  titleEn: string;
  introBn: string;
  introEn: string;
  outroBn: string;
  outroEn: string;
}

const FRAMES: PvFrame[] = [
  {
    titleBn: "ব্যস্ত এক সপ্তাহ", titleEn: "A Busy Week",
    introBn: "রাহিম ঢাকার একটি ছোট অফিসে কাজ করে। গত সপ্তাহটা এত ব্যস্ত ছিল যে সে তার ডায়েরিতে পাঁচটি ঘটনা লিখে রেখেছিল — আর প্রতিটি ঘটনা তাকে একটি নতুন ফ্রেজাল ভার্ব শিখিয়েছে।",
    introEn: "Rahim works in a small office in Dhaka. Last week was so busy that he noted five moments in his diary — and each moment taught him a new phrasal verb.",
    outroBn: "শুক্রবার রাতে রাহিম ঘটনাগুলো আবার পড়ে হাসল — ব্যস্ত সপ্তাহটাই হয়ে গেল ইংরেজি শেখার একটি পাঠ।",
    outroEn: "On Friday night, Rahim read the five moments again and smiled — a busy week had become an English lesson.",
  },
  {
    titleBn: "বাজারের সকাল", titleEn: "A Morning at the Market",
    introBn: "সারা সকালে মায়ের সঙ্গে বাজারে গিয়েছিল। সবজির দোকান আর মাছের দোকানের মাঝে পরপর পাঁচটি ছোট ছোট ঘটনা ঘটে গেল।",
    introEn: "Sara went to the market early in the morning with her mother. Between the vegetable stalls and the fish sellers, five small moments happened one after another.",
    outroBn: "ভারী ব্যাগ হাতে বাড়ি ফেরার পথে সারা মাকে পুরো গল্পটা বলল — আর প্রতিটি নতুন শব্দ তার মনে থেকে গেল।",
    outroEn: "Walking home with the heavy bags, Sara told her mother the whole story — and remembered every new word.",
  },
  {
    titleBn: "গ্রামের বাড়িতে ছুটি", titleEn: "A Holiday in the Village",
    introBn: "তানভীর ছুটিতে গ্রামের বাড়িতে গিয়েছিল। শহরের কোলাহল থেকে দূরে, পাঁচটি শান্ত ঘটনা তার ভ্রমণটাকে বিশেষ করে তুলল।",
    introEn: "Tanvir went to his village home for a short holiday. Away from the noise of the city, five quiet moments made the trip special.",
    outroBn: "বাস গ্রাম ছেড়ে যাওয়ার সময় তানভীর পেছনে তাকিয়ে নিজেকে প্রতিশ্রুতি দিল, সে শীঘ্রই আবার ফিরবে।",
    outroEn: "When the bus left the village, Tanvir looked back and promised himself he would return soon.",
  },
  {
    titleBn: "স্কুলের একদিন", titleEn: "A Day at School",
    introBn: "নুসরাত নবম শ্রেণির ছাত্রী। এক স্কুলের দিন, সকালের অ্যাসেম্বলি থেকে শেষ ঘণ্টা পর্যন্ত, তাকে মনে রাখার মতো পাঁচটি ঘটনা দিল।",
    introEn: "Nusrat is a student of class nine. One school day, from the morning assembly to the last bell, gave her five moments to remember.",
    outroBn: "বাড়ি ফিরে নুসরাত হোমওয়ার্ক শুরুর আগে দিনের পাঁচটি ঘটনা খাতায় লিখে রাখল।",
    outroEn: "At home, Nusrat wrote the day's five moments in her notebook before starting her homework.",
  },
  {
    titleBn: "নতুন শহরে প্রথম দিন", titleEn: "First Day in a New City",
    introBn: "আরিফ একটি মাত্র স্যুটকেস আর অনেক আশা নিয়ে নতুন শহরে পৌঁছাল। সেখানে তার প্রথম দিনটি ছিল ছোট ছোট বিস্ময়ে ভরা।",
    introEn: "Arif arrived in a new city with one suitcase and a lot of hope. His first day there was full of small surprises.",
    outroBn: "সেদিন রাতে বিছানায় শুয়ে আরিফের মনে হলো, নতুন শহরটা ইতিমধ্যে তার নিজের হয়ে উঠছে।",
    outroEn: "Lying in bed that night, Arif felt the new city was already becoming his own.",
  },
  {
    titleBn: "পরিবারের সঙ্গে এক সন্ধ্যা", titleEn: "An Evening with Family",
    introBn: "শুক্রবার সন্ধ্যায় মীরার পরিবারের সবাই বাড়িতে ছিল। চা আর গল্পের মধ্যে দিয়ে একে একে পাঁচটি উষ্ণ ঘটনা ঘটে গেল।",
    introEn: "On Friday evening, everyone in Meera's family was at home. Over tea and stories, five warm moments passed one by one.",
    outroBn: "সন্ধ্যা শেষ হলে মীরার মন ভরে গেল কৃতজ্ঞতায় — একটি সাধারণ সন্ধ্যাই হয়ে গেল পরিবারের সম্পদ।",
    outroEn: "When the evening ended, Meera felt grateful — an ordinary evening had become a family treasure.",
  },
  {
    titleBn: "বন্ধুর জন্মদিন", titleEn: "A Friend's Birthday",
    introBn: "সেদিন ছিল ইমরানের প্রিয় বন্ধুর জন্মদিন, আর বাড়ির ছোট্ট পার্টিটা ছিল হাসিতে ভরা। পাঁচটি মজার ঘটনা সবাইকে আরও হাসাল।",
    introEn: "It was Imran's best friend's birthday, and the small party at home was full of laughter. Five funny moments made everyone laugh even more.",
    outroBn: "বিদায়ের আগে ইমরানের বন্ধু বলল, এটি ছিল তার জীবনের সেরা জন্মদিন।",
    outroEn: "Before leaving, Imran's friend said it was the best birthday of his life.",
  },
  {
    titleBn: "বৃষ্টিভেজা যাত্রা", titleEn: "A Rainy Journey",
    introBn: "রিনা ট্রেনে করে বাড়ি ফিরছিল, তখনই বৃষ্টি শুরু হলো। দীর্ঘ যাত্রাটা তাকে এমন পাঁচটি ঘটনা দিল, যা সে কখনো ভুলবে না।",
    introEn: "Rina was travelling home by train when the rain began. The long journey gave her five moments she would never forget.",
    outroBn: "ট্রেন অবশেষে তার স্টেশনে পৌঁছালে বৃষ্টি থেমে গিয়েছিল, আর আকাশ ছিল পরিষ্কার।",
    outroEn: "When the train finally reached her station, the rain had stopped and the sky was clear.",
  },
  {
    titleBn: "ছোট্ট দোকানের গল্প", titleEn: "The Little Shop",
    introBn: "করিম রাস্তার মোড়ে একটি ছোট্ট দোকান চালায়। প্রতিদিন নতুন নতুন ক্রেতা আসে — আর সেদিন এল মনে রাখার মতো পাঁচটি ঘটনা।",
    introEn: "Karim runs a little shop at the corner of the road. Every day brings new customers — and that day brought five moments worth remembering.",
    outroBn: "রাতে দোকান বন্ধ করার সময় করিম দিনের টাকার সঙ্গে সঙ্গে দিনের ঘটনাগুলোও গুনে দেখল।",
    outroEn: "Closing the shop at night, Karim counted the day's moments along with the day's money.",
  },
  {
    titleBn: "পরীক্ষার আগের রাত", titleEn: "The Night Before the Exam",
    introBn: "পরীক্ষার আগের রাতে সুমাইয়া বই নিয়ে বসেছিল, আর পরিবারের সবাই নিঃশব্দে ঘরে চলাফেরা করছিল। পাঁচটি ছোট ঘটনা তার মনের চাপ কমিয়ে দিল।",
    introEn: "The night before her exam, Sumaiya sat with her books while her family moved quietly around the house. Five small moments broke her tension.",
    outroBn: "সুমাইয়া সেদিন রাতে তাড়াতাড়ি বই বন্ধ করে শান্ত মনে ঘুমিয়ে পড়ল।",
    outroEn: "Sumaiya closed her books early that night and slept with a calm mind.",
  },
  {
    titleBn: "হাসপাতালে একদিন", titleEn: "A Day at the Hospital",
    introBn: "ফারহানা একটি ব্যস্ত হাসপাতালে নার্স হিসেবে কাজ করে। সারাদিন অন্যদের সেবা করতে করতে পাঁচটি ঘটনা তার মন ছুঁয়ে গেল।",
    introEn: "Farhana works as a nurse in a busy hospital. Through one long day of caring for others, five moments touched her heart.",
    outroBn: "ডিউটি শেষে ফারহানা ধীরে ধীরে বাড়ির পথে হাঁটল, যাদের সে সাহায্য করেছে তাদের কথা ভাবতে ভাবতে।",
    outroEn: "At the end of her shift, Farhana walked home slowly, thinking of the people she had helped.",
  },
  {
    titleBn: "নদীর পাড়ে পিকনিক", titleEn: "A Picnic by the River",
    introBn: "বাবুল ছুটির দিনে পরিবার নিয়ে নদীর পাড়ে পিকনিকে গিয়েছিল। খোলা আকাশের নিচে পাঁচটি আনন্দের ঘটনা নদীর পানির মতো বয়ে গেল।",
    introEn: "Babul took his family for a picnic by the river on a holiday. Under the open sky, five happy moments passed like the river water.",
    outroBn: "নদীর ওপর সূর্য ডুবতে থাকলে পরিবারটি ভরা মন নিয়ে জিনিসপত্র গুছিয়ে নিল।",
    outroEn: "As the sun set over the river, the family packed their things with full hearts.",
  },
];

const BIZ_FRAMES: PvFrame[] = [
  {
    titleBn: "সোমবারের মিটিং", titleEn: "The Monday Meeting",
    introBn: "নাদিয়া একটি ট্রেডিং কোম্পানিতে ছোট একটি দলের নেতৃত্ব দেয়। সোমবারের মিটিংয়ে পাঁচটি ঘটনা দেখিয়ে দিল, তার দল আসলে কীভাবে কাজ করে।",
    introEn: "Nadia leads a small team at a trading company. In Monday's meeting, five moments showed how her team really works.",
    outroBn: "মিটিং শেষ হলে নাদিয়া পাঁচটি ঘটনা ডায়েরিতে লিখে রাখল — এমন ঘটনা দিয়েই ভালো দল গড়ে ওঠে।",
    outroEn: "When the meeting ended, Nadia noted the five moments in her diary — good teams are built in moments like these.",
  },
  {
    titleBn: "নতুন প্রকল্পের শুরু", titleEn: "Starting a New Project",
    introBn: "ওমরের কোম্পানি সদ্য একটি নতুন প্রকল্প পেয়েছে। প্রথম ব্যস্ত সপ্তাহে পাঁচটি ঘটনা ঠিক করে দিল, কাজটা কীভাবে শুরু হবে।",
    introEn: "Omar's company had just won a new project. In the first busy week, five moments decided how the work would begin.",
    outroBn: "শুক্রবারের মধ্যে ওমর বুঝে গেল, প্রকল্পটি ভালো হাতেই আছে — তার দলের, আর তার নিজের।",
    outroEn: "By Friday, Omar knew the project was in good hands — his team's, and his own.",
  },
  {
    titleBn: "ক্লায়েন্টের ফোন কল", titleEn: "The Client Call",
    introBn: "সারা কোম্পানির সবচেয়ে বড় ক্লায়েন্টের দেখাশোনা করে। একটি গুরুত্বপূর্ণ ফোন কল একের পর এক পাঁচটি ঘটনা নিয়ে এল।",
    introEn: "Sara looks after the company's biggest client. One important phone call brought five moments, one after another.",
    outroBn: "সারা ফোন রাখার সময় হাসছিল — ক্লায়েন্ট এখন তার দলের ওপর আগের চেয়ে বেশি ভরসা করে।",
    outroEn: "When Sara put the phone down, she was smiling — the client trusted her team more than ever.",
  },
  {
    titleBn: "টিমের ব্যস্ত দিন", titleEn: "A Busy Day for the Team",
    introBn: "অফিসে রাহিমের দলের জন্য সেদিন ছিল মাসের সবচেয়ে ব্যস্ত দিন। সকাল থেকে সন্ধ্যা পর্যন্ত পাঁচটি ঘটনা সবাইকে ছুটিয়ে রাখল।",
    introEn: "It was the busiest day of the month for Rahim's team at the office. From morning to evening, five moments kept everyone moving.",
    outroBn: "দেরি করে অফিস ছাড়ার সময় দলটি ক্লান্ত ছিল, কিন্তু একসঙ্গে যা করেছে তাতে গর্বিতও ছিল।",
    outroEn: "Leaving the office late, the team felt tired but proud of what they had done together.",
  },
  {
    titleBn: "বাজেটের হিসাবের দিন", titleEn: "Working on the Budget",
    introBn: "কোম্পানির হিসাবরক্ষক ফরিদ বার্ষিক বাজেট তৈরি করছিল। ক্যালকুলেটর আর ফাইল নিয়ে বসে সে পাঁচটি গুরুত্বপূর্ণ ঘটনার মধ্যে দিয়ে গেল।",
    introEn: "Farid, the company's accountant, was preparing the yearly budget. Sitting with his calculator and files, he passed through five important moments.",
    outroBn: "শেষ হিসাবটা মিলে গেলে ফরিদ হেলান দিয়ে বসল — বাজেট অবশেষে তৈরি।",
    outroEn: "When the last figure matched, Farid leaned back — the budget was finally ready.",
  },
  {
    titleBn: "বছরের শেষের রিপোর্ট", titleEn: "The Year-End Report",
    introBn: "বছরের শেষে একটি ছোট সফটওয়্যার কোম্পানি মালিকদের জন্য রিপোর্ট তৈরি করছিল। সেই সপ্তাহের পাঁচটি ঘটনাই পুরো গল্পটা বলে দেয়।",
    introEn: "At the end of the year, a small software company was preparing its report for the owners. Five moments from that week tell the whole story.",
    outroBn: "রিপোর্ট সময়মতো পাঠানো হলো, আর পুরো অফিস চা-মিষ্টি দিয়ে উদ্‌যাপন করল।",
    outroEn: "The report was sent on time, and the whole office celebrated with tea and sweets.",
  },
];

const EN_LEADS = [
  "The first moment: ",
  "A little later, another moment: ",
  "Then came a new moment: ",
  "After that, one more moment: ",
  "And the last moment: ",
];
const BN_LEADS = [
  "প্রথম ঘটনাটি ছিল এমন — ",
  "কিছুক্ষণ পরে আরেকটি ঘটনা ঘটল — ",
  "তারপর এল নতুন একটি মুহূর্ত — ",
  "এরপর আরও একটি ঘটনা ঘটল — ",
  "আর সবশেষ ঘটনাটি ছিল এমন — ",
];

function pick<T>(arr: readonly T[], i: number): T {
  const v = arr[((i % arr.length) + arr.length) % arr.length];
  if (v === undefined) throw new Error("pick from empty array");
  return v;
}

function leadFor(leads: readonly string[], i: number, total: number): string {
  if (total > 1 && i === total - 1) return pick(leads, leads.length - 1);
  return pick(leads, Math.min(i, leads.length - 2));
}

function capitalise(verb: string): string {
  return verb.length > 0 ? verb.charAt(0).toUpperCase() + verb.slice(1) : verb;
}

function bnSentence(s: string): string {
  const t = s.trim();
  return /[।.!?]$/.test(t) ? t : t + "।";
}

interface StoryCore {
  verb: string;
  primary: string;
  meaningBn: string;
  meaningEn: string;
  exampleEn: string;
  exampleBn: string;
}

function buildStory(num: number, frame: PvFrame, cores: StoryCore[], theme?: { en: string; bn: string }): PvStoryGroup {
  const enParts: string[] = [frame.introEn];
  const bnParts: string[] = [frame.introBn];
  if (theme) {
    enParts.push(`The theme of these moments was ${theme.en}.`);
    bnParts.push(`এই গল্পের বিষয় ছিল — ${theme.bn}।`);
  }
  cores.forEach((c, i) => {
    enParts.push(leadFor(EN_LEADS, i, cores.length) + markPvExample(c.exampleEn, c.primary));
    if (c.exampleBn.trim()) {
      bnParts.push(leadFor(BN_LEADS, i, cores.length) + bnSentence(c.exampleBn) + ` এই ঘটনায় ব্যবহার হয়েছে [[${c.primary}]]।`);
    } else {
      bnParts.push(leadFor(BN_LEADS, i, cores.length) + `এই মুহূর্তের ফ্রেজাল ভার্বটি হলো [[${c.primary}]]। বাংলা অনুবাদ তৈরি হচ্ছে, একটু পরেই এখানে দেখা যাবে।`);
    }
  });
  enParts.push(frame.outroEn);
  bnParts.push(frame.outroBn);
  return {
    num,
    titleBn: frame.titleBn,
    titleEn: frame.titleEn,
    storyBn: bnParts.join(" "),
    storyEn: enParts.join(" "),
    verbs: cores.map((c) => ({
      verb: c.verb,
      meaningBn: c.meaningBn,
      meaningEn: c.meaningEn,
      example: [markPvExample(c.exampleEn, c.primary), c.exampleBn],
    })),
  };
}

function listCore(pv: PhrasalVerb): StoryCore {
  return {
    verb: capitalise(pv.verb),
    primary: pvPrimaryForm(pv.verb),
    meaningBn: pv.meaningBn,
    meaningEn: pvListMeaningEn(pv.verb, pv.meaningBn),
    exampleEn: pv.example,
    exampleBn: pv.exampleBn,
  };
}

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// ---------- modules ----------

export type PvListId = "daily" | "common" | "more" | "business" | "az";

export interface PvModule {
  id: string;
  num: number;
  listId: PvListId;
  titleEn: string;
  titleBn: string;
  storyCount: number;
  verbCount: number;
  letter?: string;
  part?: number;
  /** Full stories, built eagerly — null for Complete A–Z modules, whose
   *  Bengali text depends on the translation cache (buildAzStories). */
  stories: PvStoryGroup[] | null;
  /** For A–Z modules: this module's slice of the Complete List. */
  azEntries?: PdfPhrasalVerb[];
}

export const PV_LIST_TITLES: Record<PvListId, { en: string; bn: string }> = {
  daily: { en: "Daily Life and Unexpected Situations", bn: "দৈনন্দিন জীবন ও অপ্রত্যাশিত ঘটনা" },
  common: { en: "Most Common Phrasal Verbs", bn: "সবচেয়ে প্রচলিত ফ্রেজাল ভার্ব" },
  more: { en: "More Common Phrasal Verbs", bn: "আরও প্রচলিত ফ্রেজাল ভার্ব" },
  business: { en: "Phrasal Verbs for Business English", bn: "ব্যবসায়িক ইংরেজির ফ্রেজাল ভার্ব" },
  az: { en: "Complete List A–Z", bn: "সম্পূর্ণ তালিকা (A–Z)" },
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export function bnNum(n: number): string {
  return String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

function listStories(entries: readonly PhrasalVerb[], frames: readonly PvFrame[], frameOffset: number): PvStoryGroup[] {
  return chunk(entries, 5).map((group, i) =>
    buildStory(i + 1, pick(frames, frameOffset + i), group.map(listCore)),
  );
}

function buildModules(): PvModule[] {
  const modules: PvModule[] = [];
  let num = 1;
  const push = (m: Omit<PvModule, "num">) => {
    modules.push({ ...m, num });
    num += 1;
  };

  // Module 01 — the book module, exactly as it already is.
  push({
    id: "m01",
    listId: "daily",
    titleEn: PV_MODULE.titleEn,
    titleBn: PV_MODULE.titleBn,
    storyCount: PV_STORY_GROUPS.length,
    verbCount: PV_STORY_GROUPS.reduce((s, g) => s + g.verbs.length, 0),
    stories: PV_STORY_GROUPS,
  });

  // Most common — 16 stories → modules of 10 + 6 stories.
  const commonStories = listStories(PV_COMMON, FRAMES, 0);
  chunk(commonStories, 10).forEach((group, pi) => {
    push({
      id: `common-${pi + 1}`,
      listId: "common",
      titleEn: `Most Common Phrasal Verbs — Part ${pi + 1}`,
      titleBn: `সবচেয়ে প্রচলিত ফ্রেজাল ভার্ব — পর্ব ${bnNum(pi + 1)}`,
      storyCount: group.length,
      verbCount: group.reduce((s, g) => s + g.verbs.length, 0),
      stories: group.map((g, i) => ({ ...g, num: i + 1 })),
    });
  });

  // More common — 42 stories → modules of 10, 10, 10, 10, 2 stories.
  const moreStories = listStories(PV_MORE, FRAMES, 3);
  chunk(moreStories, 10).forEach((group, pi) => {
    push({
      id: `more-${pi + 1}`,
      listId: "more",
      titleEn: `More Common Phrasal Verbs — Part ${pi + 1}`,
      titleBn: `আরও প্রচলিত ফ্রেজাল ভার্ব — পর্ব ${bnNum(pi + 1)}`,
      storyCount: group.length,
      verbCount: group.reduce((s, g) => s + g.verbs.length, 0),
      stories: group.map((g, i) => ({ ...g, num: i + 1 })),
    });
  });

  // Business English — two stories per source group, in group order;
  // groups 1–5 → one module, groups 6–10 → the next.
  const bizStories: PvStoryGroup[] = [];
  PV_BUSINESS_GROUPS.forEach((g, gi) => {
    chunk(g.items, 5).forEach((half, hi) => {
      bizStories.push(
        buildStory(bizStories.length + 1, pick(BIZ_FRAMES, gi * 2 + hi), half.map(listCore), { en: g.title.toLowerCase(), bn: g.titleBn }),
      );
    });
  });
  chunk(bizStories, 10).forEach((group, pi) => {
    push({
      id: `business-${pi + 1}`,
      listId: "business",
      titleEn: pi === 0 ? "Business English — Planning, Teams & Decisions" : "Business English — Money, Growth & Results",
      titleBn: pi === 0 ? "ব্যবসায়িক ইংরেজি — পরিকল্পনা, দল ও সিদ্ধান্ত" : "ব্যবসায়িক ইংরেজি — অর্থ, প্রবৃদ্ধি ও ফলাফল",
      storyCount: group.length,
      verbCount: group.reduce((s, g) => s + g.verbs.length, 0),
      stories: group.map((g, i) => ({ ...g, num: i + 1 })),
    });
  });

  // Complete A–Z — stories of 5 within each letter, split into modules
  // of at most 10 stories per letter.
  const letters: string[] = [];
  for (const e of PV_PDF) {
    const l = (e.verb.charAt(0) || "").toLowerCase();
    if (l && !letters.includes(l)) letters.push(l);
  }
  for (const letter of letters) {
    const entries = PV_PDF.filter((e) => (e.verb.charAt(0) || "").toLowerCase() === letter);
    const storyChunks = chunk(entries, 5);
    const moduleChunks = chunk(storyChunks, 10);
    moduleChunks.forEach((storyGroup, pi) => {
      const flat = storyGroup.flat();
      push({
        id: `az-${letter}-${pi + 1}`,
        listId: "az",
        titleEn: `Complete A–Z — Letter ${letter.toUpperCase()}${moduleChunks.length > 1 ? ` (Part ${pi + 1})` : ""}`,
        titleBn: `সম্পূর্ণ তালিকা (A–Z) — ${letter.toUpperCase()} অক্ষর${moduleChunks.length > 1 ? ` (পর্ব ${bnNum(pi + 1)})` : ""}`,
        storyCount: storyGroup.length,
        verbCount: flat.length,
        letter,
        part: pi + 1,
        stories: null,
        azEntries: flat,
      });
    });
  }

  return modules;
}

export const PV_MODULES: PvModule[] = buildModules();

export const PV_TOTAL_STORIES = PV_MODULES.reduce((s, m) => s + m.storyCount, 0);
export const PV_TOTAL_VERBS = PV_MODULES.reduce((s, m) => s + m.verbCount, 0);

/** Builds one A–Z module's stories from the current translation cache. */
export function buildAzStories(mod: PvModule, tr: Record<string, PvTranslationLike>): PvStoryGroup[] {
  const entries = mod.azEntries ?? [];
  return chunk(entries, 5).map((group, i) => {
    const cores: StoryCore[] = group.map((e) => {
      const t = tr[e.key];
      return {
        verb: capitalise(e.verb),
        primary: pvPrimaryForm(e.verb),
        meaningBn: t?.meaningBn ?? "",
        meaningEn: e.meaning.replace(/\.\s*$/, ""),
        exampleEn: e.example,
        exampleBn: t?.exampleBn ?? "",
      };
    });
    return buildStory(i + 1, pick(FRAMES, mod.num + i), cores);
  });
}

/** The Complete List entries of one story inside an A–Z module. */
export function azStoryEntries(mod: PvModule, storyNum: number): PdfPhrasalVerb[] {
  const entries = mod.azEntries ?? [];
  return entries.slice((storyNum - 1) * 5, storyNum * 5);
}
