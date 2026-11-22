// Idiom Story Groups — the Idioms and Phrases list reworked in the style
// of the learner's Bengali idiom practice book ("গল্পের নমুনা" story
// sample, "ইডিয়মস ও বাক্য প্রয়োগ" idioms and sentence application,
// "ওয়ার্কবুক প্র্যাকটিস শিট" practice worksheet).
//
// The 310 list idioms are grouped into connected real-life stories of 5
// idioms each (63 stories; the last has 4). Story 01 and Story 08 keep
// the book's own groupings and titles: Story 01 "ইন্টারভিউর চাপ" and
// Story 08 "স্বপ্নের চার চাকার খোঁজে" — three of their idioms (All in a
// day's work, Always a bridesmaid never a bride, Actions speak louder
// than words, An open book) are not in the 310 list, so their meanings
// come from the book pages the learner photographed; Stories 01 and 08
// use the book's own table meanings for all five of their idioms. Every
// other idiom's meaning/Bengali meaning is copied exactly from idioms.ts
// (its `n` field points back to that entry).
//
// Each story is one connected everyday-life story told twice: `storyBn`
// in Bengali (with the English idioms inside it, as in the book) and
// `storyEn` in English. Wherever an idiom appears in a story or an
// example sentence it is wrapped in [[...]] markers; the UI renders
// those parts underlined and strips the markers when speaking aloud.
// Every idiom carries exactly 3 example sentences, each with its Bengali
// meaning — the worksheet (MCQ / fill-in-the-blanks / sentence making)
// is built from them: MCQ uses example 1, the blank uses example 2, and
// example 3 is the model answer for sentence making. All stories and
// examples are original, written for this app in the book's style.

export interface IdiomStoryIdiom {
  idiom: string;
  meaning: string;
  meaningBn: string;
  /** Entry number in idioms.ts, when this idiom is one of the 310. */
  n?: number;
  /** Exactly 3 examples: [English sentence (idiom marked with [[...]]), Bengali meaning]. */
  examples: [string, string][];
}

export interface IdiomStoryGroup {
  num: number;
  titleBn: string;
  titleEn: string;
  storyBn: string;
  storyEn: string;
  idioms: IdiomStoryIdiom[];
}

export const IDIOM_STORY_GROUPS: IdiomStoryGroup[] = [
  {
    num: 1,
    titleBn: "ইন্টারভিউর চাপ",
    titleEn: "The Pressure of the Interview",
    storyBn:
      "রিফাত অনেক দিন ধরে একটা ভালো চাকরির জন্য চেষ্টা করছে। অবশেষে নামকরা একটি প্রতিষ্ঠানে তার ইন্টারভিউয়ের ডাক পড়ল। কিন্তু বোর্ডে বসার পর টেকনিক্যাল এক্সপার্ট যখন কঠিন সব ইংরেজি টার্ম দিয়ে একের পর এক প্রশ্ন করতে লাগলেন, রিফাতের মনে হলো সবকিছু তার কাছে [[All Greek]]। সে থমকে গেল। প্যানেলের আরেকজন সদস্য তাকে অযথা খোঁচাতে লাগলেন। রিফাত বুঝল, এই লোকটার [[an axe to grind]] আছে, কারণ গত বছর একটা প্রজেক্ট নিয়ে তাদের মতবিরোধ হয়েছিল। তবু রিফাত শান্ত থাকল। চাকরির বাজারে এমন কঠিন পরিস্থিতি সামলানো এখন তার কাছে [[all in a day's work]]। আগের প্রতিটি ইন্টারভিউতে সে শেষ ধাপে গিয়ে ছিটকে পড়েছে — যেন সে [[always a bridesmaid, never a bride]]। কিন্তু এবার সে প্রতিজ্ঞা করেছে, শুধু কথা নয়, নিজের কাজের নমুনা দিয়েই সে নিজেকে প্রমাণ করবে। কারণ সে ভালো করেই জানে, [[actions speak louder than words]]।",
    storyEn:
      "Rifat had been trying for a good job for a long time. At last, he was called for an interview at a well-known company. But when he sat before the board and the technical expert started asking question after question full of difficult English terms, everything felt like [[all Greek]] to him. He froze for a moment. Another member of the panel kept needling him with sharp comments. Rifat understood that this man had [[an axe to grind]], because they had disagreed over a project the year before. Still, Rifat stayed calm. Facing such hard moments in the job market was now [[all in a day's work]] for him. In every earlier interview he had reached the final round and then fallen short — as if he were [[always a bridesmaid, never a bride]]. But this time he promised himself he would prove his worth with samples of his work, not just words. Because he knew very well that [[actions speak louder than words]].",
    idioms: [
      {
        idiom: "All Greek (to me)",
        meaning: "Incomprehensible / not able to understand",
        meaningBn: "কিছুই বুঝতে না পারা / দুর্বোধ্য",
        n: 153,
        examples: [
          ["The instructions for assembling the new furniture were [[all Greek]] to me.", "নতুন আসবাব জোড়া লাগানোর নির্দেশনাগুলো আমার কাছে ছিল সম্পূর্ণ দুর্বোধ্য।"],
          ["When the professor started using complex codes, the whole lecture became [[all Greek]] to the students.", "অধ্যাপক যখন জটিল কোড ব্যবহার শুরু করলেন, পুরো লেকচারটাই শিক্ষার্থীদের কাছে দুর্বোধ্য হয়ে গেল।"],
          ["I tried to read the financial report, but honestly, it is [[all Greek]] to me.", "আমি আর্থিক প্রতিবেদনটা পড়ার চেষ্টা করেছিলাম, কিন্তু সত্যি বলতে, এটা আমার কাছে দুর্বোধ্যই থেকে গেছে।"],
        ],
      },
      {
        idiom: "An axe to grind",
        meaning: "To have a personal or selfish motive",
        meaningBn: "ব্যক্তিগত বা গোপন স্বার্থ থাকা",
        n: 13,
        examples: [
          ["He did not invite me to the meeting because he has [[an axe to grind]] against me.", "সে আমাকে সভায় ডাকেনি, কারণ আমার বিরুদ্ধে তার ব্যক্তিগত স্বার্থ/রোষ আছে।"],
          ["The critic wrote a harsh review, but it is clear she has [[an axe to grind]] with the author.", "সমালোচক কড়া রিভিউ লিখেছেন, কিন্তু বোঝাই যাচ্ছে লেখকের সঙ্গে তার ব্যক্তিগত রোষ আছে।"],
          ["I do not trust his free advice; he usually has [[an axe to grind]].", "তার বিনামূল্যের পরামর্শে আমি ভরসা করি না; সাধারণত তার কোনো গোপন স্বার্থ থাকে।"],
        ],
      },
      {
        idiom: "All in a day's work",
        meaning: "Something unusual or difficult accepted as part of a normal routine",
        meaningBn: "কোনো কঠিন বা অস্বাভাবিক কাজকে দৈনন্দিন কাজের অংশ হিসেবে মেনে নেওয়া",
        examples: [
          ["Dealing with angry clients is tough, but it is [[all in a day's work]] for a customer service agent.", "রাগী গ্রাহক সামলানো কঠিন, কিন্তু একজন কাস্টমার সার্ভিস কর্মীর কাছে এটা দৈনন্দিন কাজই।"],
          ["I had to work twelve hours straight yesterday, but it is [[all in a day's work]].", "গতকাল আমাকে টানা বারো ঘণ্টা কাজ করতে হয়েছে, কিন্তু এটা আমার দৈনন্দিন কাজেরই অংশ।"],
          ["Fixing three broken machines before lunch is [[all in a day's work]] for our mechanic.", "দুপুরের আগেই তিনটি নষ্ট মেশিন মেরামত করা আমাদের মেকানিকের কাছে দৈনন্দিন কাজ।"],
        ],
      },
      {
        idiom: "Always a bridesmaid, never a bride",
        meaning: "Always playing a secondary role",
        meaningBn: "সবসময় দ্বিতীয় সারিতে থাকা, কখনো প্রধান ভূমিকায় না আসা",
        examples: [
          ["Our team finished second in the tournament again — [[always a bridesmaid, never a bride]].", "আমাদের দল আবার টুর্নামেন্টে দ্বিতীয় হলো — সবসময় দ্বিতীয়, কখনো প্রথম নয়।"],
          ["He has been nominated for the award four times without winning; he feels like [[always a bridesmaid, never a bride]].", "সে চারবার পুরস্কারের জন্য মনোনীত হয়েছে কিন্তু জেতেনি; তার মনে হয় সে সবসময় দ্বিতীয় সারিতেই থেকে যায়।"],
          ["She is a great assistant manager but never gets promoted to the top position; it is a classic case of [[always a bridesmaid, never a bride]].", "সে চমৎকার সহকারী ব্যবস্থাপক, কিন্তু কখনো শীর্ষ পদে ওঠে না; এটা সবসময় দ্বিতীয় ভূমিকায় থাকারই উদাহরণ।"],
        ],
      },
      {
        idiom: "Actions speak louder than words",
        meaning: "What you do is more important than what you say",
        meaningBn: "কথার চেয়ে কাজের গুরুত্ব বেশি",
        examples: [
          ["You keep saying you will improve your performance, but [[actions speak louder than words]].", "তুমি বারবার বলছ তুমি কাজের মান বাড়াবে, কিন্তু কথার চেয়ে কাজই বড় প্রমাণ।"],
          ["The company promised to reduce pollution, and their recent investments show that [[actions speak louder than words]].", "কোম্পানিটি দূষণ কমানোর প্রতিশ্রুতি দিয়েছিল, আর তাদের সাম্প্রতিক বিনিয়োগ প্রমাণ করে কাজই কথার চেয়ে বড়।"],
          ["Do not just tell me you are a hardworking person; show it, because [[actions speak louder than words]].", "শুধু বলো না যে তুমি পরিশ্রমী; কাজে দেখাও, কারণ কথার চেয়ে কাজের গুরুত্ব বেশি।"],
        ],
      },
    ],
  },
  {
    num: 2,
    titleBn: "নাসরিনের লড়াই",
    titleEn: "Nasrin's Struggle",
    storyBn:
      "নাসরিন একটা গার্মেন্টস কারখানায় সেলাইয়ের কাজ করে। কারখানার নতুন নিয়মটা মালিকদের কাছ থেকে আসেনি; এটা এসেছিল [[rank and file]] শ্রমিকদের দাবি থেকে — সাধারণ কর্মীরা পরিষ্কার পানির ব্যবস্থা চেয়েছিল। নাসরিন রাতে বাসায় এসে ইংরেজি শেখে, কিন্তু পড়াটা হয় [[by fits and starts]] — দুই দিন খুব পড়ে, তারপর কাজের চাপে এক সপ্তাহ বন্ধ। তার স্বামী করিম আগে তাকে পড়তে বারণ করত, মনে হতো নাসরিন যেন তার [[under his thumb]]-এর নিচে থাকতে বাধ্য। গত মাসে ঋণের শেষ কিস্তি শোধ হওয়ার পর নাসরিন অনুভব করল, তারা অবশেষে [[out of the wood]] — বিপদমুক্ত। এখন তার স্যুপে শুধু [[a wee bit]] বেশি সাহস দরকার, আর সেটাই সে প্রতিদিন একটু একটু করে জোগাড় করছে।",
    storyEn:
      "Nasrin works as a sewing operator in a garment factory. The factory's new rule did not come from the owners; it came from the demand of the [[rank and file]] — the ordinary workers wanted clean drinking water. At night Nasrin studies English at home, but she learns [[by fits and starts]] — she studies hard for two days, then work pressure stops her for a week. Her husband Karim used to forbid her studies, and it felt as if she had to live [[under his thumb]]. Last month, after the final instalment of their loan was paid, Nasrin felt they were finally [[out of the wood]] — free from danger. Now her life needs just [[a wee bit]] more courage, and she is gathering it little by little every day.",
    idioms: [
      {
        idiom: "Rank and File",
        meaning: "Ordinary People",
        meaningBn: "সাধারণ মানুষ",
        n: 1,
        examples: [
          ["The new holiday rule came from the [[rank and file]] of the office, not from the bosses.", "ছুটির নতুন নিয়মটা বসদের কাছ থেকে নয়, অফিসের সাধারণ কর্মীদের কাছ থেকে এসেছে।"],
          ["A good leader always listens to the [[rank and file]].", "একজন ভালো নেতা সবসময় সাধারণ মানুষের কথা শোনেন।"],
          ["The [[rank and file]] of the party demanded a change in the committee.", "দলের সাধারণ সদস্যরা কমিটিতে পরিবর্তন দাবি করল।"],
        ],
      },
      {
        idiom: "By fits and starts",
        meaning: "In short periods, not regularly",
        meaningBn: "মাঝে মাঝে, নিয়মিতভাবে নয়",
        n: 2,
        examples: [
          ["He is learning to drive [[by fits and starts]], so his progress is slow.", "সে থেমে থেমে গাড়ি চালানো শিখছে, তাই তার অগ্রগতি ধীর।"],
          ["The work moved ahead [[by fits and starts]] because money came late.", "টাকা দেরিতে আসায় কাজটা থেমে থেমে এগিয়েছে।"],
          ["If you practise the piano [[by fits and starts]], you will forget the lessons.", "থেমে থেমে পিয়ানো অনুশীলন করলে পাঠ ভুলে যাবে।"],
        ],
      },
      {
        idiom: "A wee bit",
        meaning: "A little",
        meaningBn: "সামান্য একটু",
        n: 3,
        examples: [
          ["The soup needs [[a wee bit]] more salt.", "স্যুপে আর সামান্য একটু লবণ দরকার।"],
          ["I am [[a wee bit]] tired after the long walk.", "লম্বা হাঁটার পর আমি সামান্য একটু ক্লান্ত।"],
          ["Move the table [[a wee bit]] to the left, please.", "টেবিলটা সামান্য একটু বামে সরাও, দয়া করে।"],
        ],
      },
      {
        idiom: "Out of the wood",
        meaning: "Free from difficulties and dangers",
        meaningBn: "কষ্ট ও বিপদ থেকে মুক্ত",
        n: 4,
        examples: [
          ["After paying the last part of his loan, Jamal felt he was finally [[out of the wood]].", "ঋণের শেষ অংশ শোধ করার পর জামাল মনে করল, সে অবশেষে বিপদমুক্ত হলো।"],
          ["The patient is better now, but the doctor says she is not [[out of the wood]] yet.", "রোগী এখন ভালো আছে, কিন্তু ডাক্তার বলছেন সে এখনো পুরোপুরি বিপদমুক্ত নয়।"],
          ["Once the exam results came out well, the students felt [[out of the wood]].", "পরীক্ষার ফল ভালো হওয়ার পর শিক্ষার্থীরা বিপদমুক্ত মনে করল।"],
        ],
      },
      {
        idiom: "Under his thumb",
        meaning: "Under his control",
        meaningBn: "তার নিয়ন্ত্রণে",
        n: 5,
        examples: [
          ["The young clerk was completely [[under his thumb]] and could not say no to any order.", "তরুণ কেরানিটি সম্পূর্ণ তার নিয়ন্ত্রণে ছিল এবং কোনো আদেশে না বলতে পারত না।"],
          ["She does not want to live [[under his thumb]] for the rest of her life.", "সে সারাজীবন তার নিয়ন্ত্রণে থাকতে চায় না।"],
          ["The manager keeps the whole team [[under his thumb]] with strict rules.", "ম্যানেজার কঠোর নিয়ম দিয়ে পুরো দলকে নিজের নিয়ন্ত্রণে রাখেন।"],
        ],
      },
    ],
  },
  {
    num: 3,
    titleBn: "পরীক্ষার আগের রাত",
    titleEn: "The Night Before the Exam",
    storyBn:
      "আগামীকাল আরিফের উচ্চমাধ্যমিক পরীক্ষা। সারা বছর সে ঠিকমতো পড়েনি, তাই আজ রাতে সে [[at his wits' end]] — কী করবে বুঝতে পারছে না। পড়তে বসলে মনে হয় ঘুম আসছে, না পড়লে ফেল নিশ্চিত — সে যেন [[between the devil and the deep sea]]-এর মাঝখানে পড়েছে। বড় ভাই রাকিব তাকে বললেন, ভয় পেয়ে লাভ নেই; আজ রাতে [[burn the midnight oil]] করে গুরুত্বপূর্ণ অধ্যায়গুলো শেষ করো। রাকিব [[call a spade a spade]] ধরনের মানুষ — তিনি সরাসরি বললেন, অলসতাই তোমার আসল সমস্যা। আরিফ সারারাত জেগে পড়ল, আর পরীক্ষায় সে সত্যিই [[came off with flying colors]] — সবাইকে অবাক করে ভালো ফল করল।",
    storyEn:
      "Tomorrow is Arif's higher secondary exam. He did not study properly all year, so tonight he is [[at his wits' end]] — he does not know what to do. If he sits down to study he feels sleepy, and if he does not study, failure is certain — he is caught [[between the devil and the deep sea]]. His elder brother Rakib told him there was no use being afraid; tonight he should [[burn the midnight oil]] and finish the important chapters. Rakib is the kind of man who calls [[a spade a spade]] — he said directly, laziness is your real problem. Arif studied all night, and in the exam he truly [[came off with flying colors]] — he surprised everyone with a fine result.",
    idioms: [
      {
        idiom: "At one’s wits end",
        meaning: "In a state where one does not know what to do",
        meaningBn: "এমন অবস্থা যেখানে কী করতে হবে বোঝা যায় না",
        n: 6,
        examples: [
          ["The mother was [[at her wits' end]] when her child did not return home by midnight.", "মধ্যরাতেও সন্তান বাসায় না ফেরায় মা দিশাহারা হয়ে পড়লেন।"],
          ["I am [[at my wits' end]] trying to fix this old computer.", "এই পুরনো কম্পিউটারটা ঠিক করতে গিয়ে আমি দিশাহারা।"],
          ["The teacher was [[at his wits' end]] with the noisy class.", "শোরগোল করা ক্লাস নিয়ে শিক্ষক দিশাহারা হয়ে পড়লেন।"],
        ],
      },
      {
        idiom: "Between the devil and the deep sea",
        meaning: "Between two dangers",
        meaningBn: "দুই বিপদের মাঝখানে",
        n: 7,
        examples: [
          ["If he tells the truth he loses his job, and if he lies he loses his honour — he is [[between the devil and the deep sea]].", "সত্য বললে চাকরি যাবে, মিথ্যা বললে সম্মান যাবে — সে দুই বিপদের মাঝখানে পড়েছে।"],
          ["The small shopkeeper was [[between the devil and the deep sea]]: rising prices on one side, angry customers on the other.", "ছোট দোকানি দুই বিপদের মাঝখানে পড়েছিল: একদিকে বাড়তি দাম, অন্যদিকে রাগী ক্রেতা।"],
          ["Caught [[between the devil and the deep sea]], the driver had to choose the less dangerous road.", "দুই বিপদের মাঝখানে পড়ে চালককে কম বিপজ্জনক রাস্তাটাই বেছে নিতে হলো।"],
        ],
      },
      {
        idiom: "Burn the midnight oil",
        meaning: "Work or study hard",
        meaningBn: "কঠোর পরিশ্রম বা পড়াশোনা করা",
        n: 8,
        examples: [
          ["Students [[burn the midnight oil]] in the weeks before the final exam.", "ফাইনাল পরীক্ষার আগের সপ্তাহগুলোতে শিক্ষার্থীরা রাত জেগে পড়ে।"],
          ["She [[burned the midnight oil]] to finish the report before the deadline.", "সে সময়সীমার আগে প্রতিবেদন শেষ করতে রাত জেগে কাজ করল।"],
          ["If you want a scholarship, you must be ready to [[burn the midnight oil]].", "বৃত্তি পেতে চাইলে রাত জেগে পড়ার জন্য প্রস্তুত থাকতে হবে।"],
        ],
      },
      {
        idiom: "Call a spade a spade",
        meaning: "Speak frankly and directly",
        meaningBn: "খোলাখুলি ও সরাসরি কথা বলা",
        n: 9,
        examples: [
          ["Let us [[call a spade a spade]]: the plan failed because we started too late.", "খোলাখুলি বলি: পরিকল্পনাটা ব্যর্থ হয়েছে কারণ আমরা খুব দেরিতে শুরু করেছিলাম।"],
          ["My grandfather always [[calls a spade a spade]], even when the truth hurts.", "আমার দাদা সবসময় সরাসরি কথা বলেন, সত্য কষ্টদায়ক হলেও।"],
          ["The report [[calls a spade a spade]] and blames poor management for the loss.", "প্রতিবেদনটি খোলাখুলি ভাষায় ক্ষতির জন্য খারাপ ব্যবস্থাপনাকেই দায়ী করেছে।"],
        ],
      },
      {
        idiom: "Come off with flying colors",
        meaning: "Be highly successful",
        meaningBn: "অত্যন্ত সফল হওয়া",
        n: 10,
        examples: [
          ["She [[came off with flying colors]] in the medical admission test.", "সে মেডিকেল ভর্তি পরীক্ষায় অত্যন্ত সফল হলো।"],
          ["Our cricket team [[came off with flying colors]] in the district tournament.", "আমাদের ক্রিকেট দল জেলা টুর্নামেন্টে দারুণ সফল হলো।"],
          ["If you prepare honestly, you will [[come off with flying colors]].", "সততার সঙ্গে প্রস্তুতি নিলে তুমি অত্যন্ত সফল হবে।"],
        ],
      },
    ],
  },
  {
    num: 4,
    titleBn: "ভাইয়ে ভাইয়ে দ্বন্দ্ব",
    titleEn: "The Quarrel Between Brothers",
    storyBn:
      "পৈতৃক জমি নিয়ে দুই ভাই সেলিম ও নাসিম এখন [[at daggers drawn]] — একে অপরের চরম শত্রু। গ্রামের মানুষ জানে, তারা একসময় একসঙ্গে দোকান চালাত, কিন্তু পুরনো দোকানটা নিয়ে সেলিম [[playing ducks and drakes]] করেছে — টাকা-পয়সার হিসাব এলোমেলো করে ফেলেছে। গ্রামের স্কুলশিক্ষক হরেন বাবু একদিন সরাসরি [[hit the nail on the head]] — তিনি বললেন, সমস্যা জমি নয়, সমস্যা দুজনের অহংকার। নাসিম এখন পুরনো দোকানটা [[to get rid of]] চায়, বিক্রি করে নিজের ভাগ নিয়ে আলাদা হতে চায়। সবাই [[hoping against hope]] অপেক্ষা করছে — আশা নেই জেনেও আশা করছে, একদিন দুই ভাই আবার এক টেবিলে বসে চা খাবে।",
    storyEn:
      "Over their father's land, the two brothers Selim and Nasim are now [[at daggers drawn]] — bitter enemies of each other. The villagers know they once ran a shop together, but Selim has been [[playing ducks and drakes]] with the old shop — he made a mess of the money accounts. One day the village schoolteacher, Haren Babu, [[hit the nail on the head]] — he said the problem is not the land, the problem is the pride of both brothers. Nasim now wants [[to get rid of]] the old shop, sell it, take his share and live separately. Everyone is [[hoping against hope]] — hoping without real hope that one day the two brothers will sit at one table and drink tea together again.",
    idioms: [
      {
        idiom: "Hoping against hope",
        meaning: "Without hope",
        meaningBn: "আশা ছাড়াই আশা করা",
        n: 11,
        examples: [
          ["The farmers looked at the dry sky, [[hoping against hope]] for rain.", "কৃষকেরা শুকনো আকাশের দিকে তাকিয়ে আশা ছাড়াই বৃষ্টির আশা করছিল।"],
          ["She waited at the station, [[hoping against hope]] that her brother would come.", "সে স্টেশনে অপেক্ষা করছিল, আশা ছাড়াই আশা করে যে তার ভাই আসবে।"],
          ["We kept calling the lost boy's name, [[hoping against hope]].", "আমরা হারানো ছেলেটির নাম ধরে ডাকতে থাকলাম, আশা ছাড়াই আশা করে।"],
        ],
      },
      {
        idiom: "Hit the nail on the head",
        meaning: "Do or say the exact thing",
        meaningBn: "ঠিক কথাটি বলা বা ঠিক কাজটি করা",
        n: 12,
        examples: [
          ["When you said the team lacks practice, you [[hit the nail on the head]].", "তুমি যখন বললে দলের অনুশীলনের অভাব আছে, তুমি ঠিক কথাটাই বলেছ।"],
          ["The doctor [[hit the nail on the head]] when he blamed my sleepless nights for the headaches.", "ডাক্তার ঠিক কথাটাই বললেন যখন তিনি আমার মাথাব্যথার জন্য ঘুমহীন রাতকে দায়ী করলেন।"],
          ["Her comment about rising prices [[hit the nail on the head]].", "দাম বাড়া নিয়ে তার মন্তব্যটা ছিল একদম ঠিক কথা।"],
        ],
      },
      {
        idiom: "To get rid of",
        meaning: "Dispose of",
        meaningBn: "ফেলে দেওয়া / মুক্তি পাওয়া",
        n: 14,
        examples: [
          ["We need [[to get rid of]] these old newspapers before the rains come.", "বর্ষা আসার আগে আমাদের এই পুরনো খবরের কাগজগুলো ফেলে দিতে হবে।"],
          ["He is trying [[to get rid of]] his smoking habit.", "সে তার ধূমপানের অভ্যাস থেকে মুক্তি পাওয়ার চেষ্টা করছে।"],
          ["The company [[got rid of]] the damaged goods at a low price.", "কোম্পানিটি ক্ষতিগ্রস্ত মাল কম দামে ছেড়ে দিল।"],
        ],
      },
      {
        idiom: "At daggers drawn",
        meaning: "Bitterly hostile",
        meaningBn: "তীব্র শত্রুভাবাপন্ন",
        n: 15,
        examples: [
          ["The two neighbours are [[at daggers drawn]] over a small piece of land.", "এক টুকরো জমি নিয়ে দুই প্রতিবেশী তীব্র শত্রুভাবাপন্ন।"],
          ["After the election, the two leaders remained [[at daggers drawn]].", "নির্বাচনের পর দুই নেতা তীব্র শত্রুভাবাপন্নই থেকে গেলেন।"],
          ["Brothers should not stay [[at daggers drawn]] for years over money.", "টাকার জন্য ভাইদের বছরের পর বছর শত্রু হয়ে থাকা উচিত নয়।"],
        ],
      },
      {
        idiom: "To play ducks and drakes",
        meaning: "To act foolishly or inconsistently",
        meaningBn: "বোকামি করা বা অসঙ্গত আচরণ করা",
        n: 16,
        examples: [
          ["He [[played ducks and drakes]] with his father's savings and lost everything.", "সে তার বাবার জমানো টাকা নিয়ে বোকামি করে সব হারাল।"],
          ["Do not [[play ducks and drakes]] with your health by skipping meals.", "খাবার বাদ দিয়ে নিজের স্বাস্থ্য নিয়ে বোকামি করো না।"],
          ["The clerk was dismissed for [[playing ducks and drakes]] with the office funds.", "অফিসের তহবিল নিয়ে অসঙ্গত আচরণের জন্য কেরানিকে বরখাস্ত করা হলো।"],
        ],
      },
    ],
  },
  {
    num: 5,
    titleBn: "বন্যার রাতে",
    titleEn: "The Night of the Flood",
    storyBn:
      "সেই রাতে আকাশ ভেঙে [[rained cats and dogs]]। নদীর পানি বেড়ে গ্রামে ঢুকে পড়ল। কৃষক জলিল তার গাভীটাকে খুঁজে পাচ্ছিল না। প্রতিবেশীরা প্রথমে ভাবল, গাভীটা হয়তো চর এলাকায় আটকে আছে — কিন্তু সেখানে খোঁজা মানে [[barking up the wrong tree]], কারণ পানি সেদিকেই বেশি। জলিল [[took the bull by the horns]] — সে নিজেই টর্চ নিয়ে বেরিয়ে পড়ল। গ্রামের যুবকেরা [[moved heaven and earth]] — নৌকা, দড়ি, লোকজন সব জোগাড় করল। প্রথম দুই ঘণ্টা সব চেষ্টা [[of no avail]] গেল, কোনো ফল হলো না। অবশেষে ভোরের দিকে গাভীটাকে স্কুলঘরের উঁচু মাঠে নিরাপদে পাওয়া গেল।",
    storyEn:
      "That night it [[rained cats and dogs]]. The river rose and water entered the village. The farmer Jalil could not find his cow. At first the neighbours thought the cow might be stuck on the char — but searching there meant [[barking up the wrong tree]], because the water was deepest on that side. Jalil [[took the bull by the horns]] — he went out himself with a torch. The young men of the village [[moved heaven and earth]] — they arranged boats, ropes and people. For the first two hours every effort was [[of no avail]]; nothing worked. At last, towards dawn, the cow was found safe on the high ground of the school field.",
    idioms: [
      {
        idiom: "To take the bull by the horns",
        meaning: "To tackle a problem in a bold and direct fashion",
        meaningBn: "সাহসের সঙ্গে সরাসরি সমস্যার মোকাবিলা করা",
        n: 17,
        examples: [
          ["Instead of waiting, she [[took the bull by the horns]] and spoke to the manager herself.", "অপেক্ষা না করে সে সাহস করে নিজেই ম্যানেজারের সঙ্গে কথা বলল।"],
          ["The team captain [[took the bull by the horns]] and changed the plan at once.", "দলের অধিনায়ক সাহসের সঙ্গে সরাসরি পরিকল্পনা বদলে ফেলল।"],
          ["Sometimes you must [[take the bull by the horns]] and admit your mistake.", "কখনো কখনো সাহস করে নিজের ভুল স্বীকার করতেই হয়।"],
        ],
      },
      {
        idiom: "Rain cats and dogs",
        meaning: "Rain heavily",
        meaningBn: "মুষলধারে বৃষ্টি হওয়া",
        n: 18,
        examples: [
          ["We could not go to the market because it was [[raining cats and dogs]].", "মুষলধারে বৃষ্টি হচ্ছিল বলে আমরা বাজারে যেতে পারিনি।"],
          ["It [[rained cats and dogs]] all night and the roads went under water.", "সারারাত মুষলধারে বৃষ্টি হলো আর রাস্তাগুলো পানিতে তলিয়ে গেল।"],
          ["Take an umbrella; it looks like it will [[rain cats and dogs]] today.", "ছাতা নিয়ে যাও; মনে হচ্ছে আজ মুষলধারে বৃষ্টি হবে।"],
        ],
      },
      {
        idiom: "To move heaven and earth",
        meaning: "To make a supreme effort",
        meaningBn: "সর্বোচ্চ চেষ্টা করা",
        n: 19,
        examples: [
          ["The mother [[moved heaven and earth]] to find a doctor for her sick child.", "মা তার অসুস্থ সন্তানের জন্য ডাক্তার খুঁজতে সর্বোচ্চ চেষ্টা করলেন।"],
          ["He will [[move heaven and earth]] to keep his promise.", "সে তার প্রতিশ্রুতি রাখতে সর্বোচ্চ চেষ্টা করবে।"],
          ["The rescue team [[moved heaven and earth]] to save the trapped workers.", "উদ্ধারকারী দল আটকে পড়া শ্রমিকদের বাঁচাতে সর্বোচ্চ চেষ্টা করল।"],
        ],
      },
      {
        idiom: "No avail",
        meaning: "Without any result",
        meaningBn: "কোনো ফল ছাড়াই",
        n: 20,
        examples: [
          ["We searched for the key everywhere, but [[to no avail]].", "আমরা সব জায়গায় চাবি খুঁজলাম, কিন্তু কোনো ফল হলো না।"],
          ["He knocked on the door many times, but [[of no avail]] — nobody opened it.", "সে অনেকবার দরজায় ধাক্কা দিল, কিন্তু কোনো ফল হলো না — কেউ খুলল না।"],
          ["The medicine was given for a week, but [[to no avail]].", "এক সপ্তাহ ওষুধ দেওয়া হলো, কিন্তু কোনো ফল পাওয়া গেল না।"],
        ],
      },
      {
        idiom: "Bark up the wrong tree",
        meaning: "Accuse or denounce the wrong person",
        meaningBn: "ভুল মানুষকে দোষ দেওয়া বা অভিযুক্ত করা",
        n: 21,
        examples: [
          ["If you think I took your pen, you are [[barking up the wrong tree]].", "তুমি যদি ভাবো আমি তোমার কলম নিয়েছি, তাহলে তুমি ভুল মানুষকে দোষ দিচ্ছ।"],
          ["The police questioned the guard, but they were [[barking up the wrong tree]]; he was on leave that day.", "পুলিশ প্রহরীকে জিজ্ঞাসাবাদ করল, কিন্তু তারা ভুল মানুষকে ধরেছিল; সে ওই দিন ছুটিতে ছিল।"],
          ["Do not [[bark up the wrong tree]] by blaming the new boy for the broken window.", "ভাঙা জানালার জন্য নতুন ছেলেটিকে দোষ দিয়ে ভুল করো না।"],
        ],
      },
    ],
  },
  {
    num: 6,
    titleBn: "নতুন সংসারের গোপন কথা",
    titleEn: "A Secret in the New Household",
    storyBn:
      "বিয়ের পর থেকেই তানিয়া আর সুমনের জীবনটা [[cat and dog life]] হয়ে উঠেছিল — সারাদিন ছোটখাটো ঝগড়া। বিয়ের অনুষ্ঠানের দিন তানিয়া [[like a cat on hot bricks]] ছিল — খুব উদ্বিগ্ন, কারণ সে একটা কথা লুকিয়েছিল: সে একটা ছোট সেলাইয়ের ব্যবসা শুরু করতে চায়, আর তার জন্য সে কিছু টাকা জমিয়েছে। সুমন টের পেয়েছিল তানিয়া কিছু লুকাচ্ছে, কিন্তু সরাসরি কিছু বলেনি; সে ঝগড়াটাকে [[keep at bay]] রাখতে চাইছিল। একদিন তানিয়া সাহস করে [[made a clean breast of it]] — সব খুলে বলল। তখন সুমন হেসে বলল, আমিও একটা সারপ্রাইজ রেখেছিলাম — সে [[had a card up his sleeve]]: তানিয়ার জন্য সে একটা সেলাই মেশিন কিনে রেখেছিল!",
    storyEn:
      "Since their wedding, Tania and Sumon's life had become a [[cat and dog life]] — small quarrels all day long. On the wedding day Tania had been [[like a cat on hot bricks]] — very nervous, because she was hiding something: she wanted to start a small tailoring business, and she had saved some money for it. Sumon had sensed that Tania was hiding something, but he said nothing directly; he wanted to [[keep]] the quarrels [[at bay]]. One day Tania gathered courage and [[made a clean breast of it]] — she told him everything. Then Sumon smiled and said he had a surprise too — he [[had a card up his sleeve]]: he had already bought a sewing machine for Tania!",
    idioms: [
      {
        idiom: "Keep one at bay",
        meaning: "Keep one at a distance",
        meaningBn: "কাউকে দূরে রাখা",
        n: 22,
        examples: [
          ["The guard dog [[kept]] the thieves [[at bay]] all night.", "পাহারা কুকুরটা সারারাত চোরদের দূরে রাখল।"],
          ["She takes a vitamin tablet every day to [[keep]] illness [[at bay]].", "অসুখ দূরে রাখতে সে প্রতিদিন একটা ভিটামিন ট্যাবলেট খায়।"],
          ["Regular exercise helps [[keep]] old-age weakness [[at bay]].", "নিয়মিত ব্যায়াম বার্ধক্যের দুর্বলতা দূরে রাখতে সাহায্য করে।"],
        ],
      },
      {
        idiom: "Make a clean breast of it",
        meaning: "Confess – especially when a person has done a wrong thing",
        meaningBn: "স্বীকার করা — বিশেষ করে নিজের করা অন্যায়",
        n: 23,
        examples: [
          ["The boy [[made a clean breast of it]] and admitted he had broken the window.", "ছেলেটি সব স্বীকার করল এবং জানাল সে-ই জানালা ভেঙেছে।"],
          ["It is better to [[make a clean breast of it]] than to live with a lie.", "মিথ্যা নিয়ে বেঁচে থাকার চেয়ে সব স্বীকার করে নেওয়া ভালো।"],
          ["She [[made a clean breast of it]] to her mother about the lost money.", "হারানো টাকার ব্যাপারে সে তার মায়ের কাছে সব খুলে বলল।"],
        ],
      },
      {
        idiom: "Have a card up one’s sleeve",
        meaning: "Have a secret plan in reserve",
        meaningBn: "গোপন পরিকল্পনা হাতে রাখা",
        n: 24,
        examples: [
          ["The lawyer smiled quietly; he [[had a card up his sleeve]] for the last hearing.", "আইনজীবী নীরবে হাসলেন; শেষ শুনানির জন্য তার হাতে একটা গোপন পরিকল্পনা ছিল।"],
          ["Do not worry about the negotiation — our manager [[has a card up his sleeve]].", "আলোচনা নিয়ে চিন্তা করো না — আমাদের ম্যানেজারের হাতে গোপন পরিকল্পনা আছে।"],
          ["She [[had a card up her sleeve]] and surprised everyone with a cheaper supplier.", "তার হাতে গোপন পরিকল্পনা ছিল, আর সে সস্তা সরবরাহকারী এনে সবাইকে অবাক করল।"],
        ],
      },
      {
        idiom: "Like a cat on hot bricks",
        meaning: "Very nervous",
        meaningBn: "খুবই উদ্বিগ্ন / অস্থির",
        n: 25,
        examples: [
          ["Before the result day, the students were [[like cats on hot bricks]].", "ফলাফলের দিনের আগে শিক্ষার্থীরা ছিল খুবই অস্থির।"],
          ["He waited outside the interview room [[like a cat on hot bricks]].", "সে ইন্টারভিউ কক্ষের বাইরে খুব উদ্বিগ্নভাবে অপেক্ষা করছিল।"],
          ["The little boy sat [[like a cat on hot bricks]] in the dentist's chair.", "ছোট্ট ছেলেটি দাঁতের ডাক্তারের চেয়ারে খুব অস্থিরভাবে বসে ছিল।"],
        ],
      },
      {
        idiom: "Cat and dog life",
        meaning: "Life full of quarrels",
        meaningBn: "ঝগড়ায় ভরা জীবন",
        n: 26,
        examples: [
          ["The old couple led a [[cat and dog life]] for years over small matters.", "বুড়ো দম্পতি ছোটখাটো বিষয় নিয়ে বছরের পর বছর ঝগড়ায় ভরা জীবন কাটাল।"],
          ["Nobody enjoys a [[cat and dog life]] at home.", "বাড়িতে ঝগড়ায় ভরা জীবন কেউ পছন্দ করে না।"],
          ["They decided to talk calmly instead of living a [[cat and dog life]].", "তারা ঝগড়ায় ভরা জীবনের বদলে শান্তভাবে কথা বলার সিদ্ধান্ত নিল।"],
        ],
      },
    ],
  },
  {
    num: 7,
    titleBn: "মোটরসাইকেলের স্বপ্ন",
    titleEn: "The Dream of a Motorbike",
    storyBn:
      "রনি একটা মোটরসাইকেল কিনতে চায়, কিন্তু সে এখন [[in a tight corner]] — হাতে টাকা কম, অথচ অফিস অনেক দূরে। বাবা বললেন, আগে [[the pros and cons]] ভালো করে ভেবে দেখো — সুবিধা-অসুবিধা দুটোই। রনি প্রতিদিন বাবাকে বোঝায়, কিন্তু বাবা বলেন, তুমি [[cry for the moon]] করছ — এখন এত দামি বাইক চাওয়া মানে অসম্ভব জিনিস চাওয়া। বিক্রেতা অবশ্য একটা [[cock and bull story]] শুনিয়েছিল — বলেছিল বাইকটা নাকি সোনার ইঞ্জিনে চলে! বাবা হাসলেন, কারণ তিনি প্রতিটি কাগজপত্র [[cross his t's and dot his i's]] ভঙ্গিতে যাচাই করেন — নিখুঁতভাবে না দেখে তিনি কিছু কিনেন না। শেষ পর্যন্ত বাবা-ছেলে মিলে একটা ভালো সেকেন্ড-হ্যান্ড বাইকই কিনল।",
    storyEn:
      "Roni wants to buy a motorbike, but he is [[in a tight corner]] now — he has little money, yet his office is far away. His father said, first think carefully about [[the pros and cons]] — both the advantages and the disadvantages. Roni tries to convince his father every day, but his father says, you are [[crying for the moon]] — asking for such an expensive bike now means asking for the impossible. The seller, of course, told a [[cock and bull story]] — he claimed the bike runs on a golden engine! Father smiled, because he checks every paper as if to [[cross his t's and dot his i's]] — he buys nothing without examining it perfectly. In the end, father and son together bought a good second-hand bike.",
    idioms: [
      {
        idiom: "Cock and bull story",
        meaning: "Made up story that one should not believe",
        meaningBn: "বানানো গল্প, যা বিশ্বাস করা উচিত নয়",
        n: 27,
        examples: [
          ["He told a [[cock and bull story]] about why he was late, and nobody believed him.", "সে দেরির কারণ নিয়ে একটা বানানো গল্প বলল, আর কেউ তা বিশ্বাস করল না।"],
          ["Do not waste time on his [[cock and bull story]]; check the facts yourself.", "তার বানানো গল্পে সময় নষ্ট করো না; নিজে তথ্য যাচাই করো।"],
          ["The salesman invented a [[cock and bull story]] to sell the old phone.", "বিক্রেতা পুরনো ফোনটা বিক্রি করতে একটা বানানো গল্প বানাল।"],
        ],
      },
      {
        idiom: "Cry for the moon",
        meaning: "Ask for the impossible",
        meaningBn: "অসম্ভব জিনিস চাওয়া",
        n: 28,
        examples: [
          ["Asking for a holiday home on this salary is [[crying for the moon]].", "এই বেতনে ছুটির বাড়ি চাওয়া মানে অসম্ভব জিনিস চাওয়া।"],
          ["The child [[cried for the moon]] when he demanded a real aeroplane as a toy.", "খেলনা হিসেবে আসল বিমান দাবি করে শিশুটি অসম্ভব জিনিস চাইল।"],
          ["We should plan with what we have, not [[cry for the moon]].", "আমাদের যা আছে তা দিয়েই পরিকল্পনা করা উচিত, অসম্ভব জিনিস চাওয়া নয়।"],
        ],
      },
      {
        idiom: "The pros and cons",
        meaning: "The various aspects of a matter in detail",
        meaningBn: "কোনো বিষয়ের ভালো-মন্দ সব দিক বিস্তারিতভাবে",
        n: 29,
        examples: [
          ["Before moving to the city, they discussed [[the pros and cons]] for a whole evening.", "শহরে যাওয়ার আগে তারা পুরো এক সন্ধ্যা ভালো-মন্দ সব দিক নিয়ে আলোচনা করল।"],
          ["Write down [[the pros and cons]] before you choose a course.", "কোর্স বেছে নেওয়ার আগে ভালো-মন্দ দিকগুলো লিখে নাও।"],
          ["Every business has [[its pros and cons]]; the wise man weighs them first.", "প্রতিটি ব্যবসারই ভালো-মন্দ দিক আছে; জ্ঞানী মানুষ আগে সেগুলো ওজন করে।"],
        ],
      },
      {
        idiom: "Be in a tight corner",
        meaning: "In a very difficult situation",
        meaningBn: "খুব কঠিন পরিস্থিতিতে",
        n: 30,
        examples: [
          ["The shopkeeper was [[in a tight corner]] when the loan payment fell due.", "ঋণের কিস্তির সময় হয়ে যাওয়ায় দোকানি খুব কঠিন পরিস্থিতিতে পড়ল।"],
          ["Our team was [[in a tight corner]] after losing two early wickets.", "দুটি উইকেট তাড়াতাড়ি হারিয়ে আমাদের দল কঠিন পরিস্থিতিতে পড়ল।"],
          ["He found himself [[in a tight corner]] with no money and no friends nearby.", "টাকা নেই, কাছাকাছি বন্ধুও নেই — সে নিজেকে খুব কঠিন পরিস্থিতিতে পেল।"],
        ],
      },
      {
        idiom: "Cross one’s t’s and dot one’s i’s",
        meaning: "Be precise, careful and exact",
        meaningBn: "নিখুঁত, সতর্ক ও যত্নশীল হওয়া",
        n: 31,
        examples: [
          ["Before signing the agreement, the lawyer [[crossed his t's and dotted his i's]].", "চুক্তিতে সই করার আগে আইনজীবী প্রতিটি বিষয় নিখুঁতভাবে যাচাই করলেন।"],
          ["She always [[crosses her t's and dots her i's]] when she writes an official letter.", "সরকারি চিঠি লেখার সময় সে সবসময় প্রতিটি খুঁটিনাটি নিখুঁতভাবে দেখে।"],
          ["A good accountant [[crosses his t's and dots his i's]] in every account book.", "একজন ভালো হিসাবরক্ষক প্রতিটি খাতায় নিখুঁত ও যত্নশীল থাকেন।"],
        ],
      },
    ],
  },
  {
    num: 8,
    titleBn: "স্বপ্নের চার চাকার খোঁজে",
    titleEn: "In Search of the Dream Car",
    storyBn:
      "আরমান রিকশা আর বাসের ভিড়ে অতিষ্ঠ হয়ে ঠিক করল, সে নিজের একটা ছোট গাড়ি কিনবে। গাড়ি কেনার জন্য সে তার এক বন্ধুর কাছ থেকে ধার করার কথা ভাবল, যাতে সে তার বড় ব্যবসার ফান্ডের টাকায় হাত না দেয়। কিন্তু হঠাৎ একদিন তার বন্ধু ব্যবসার ক্ষতির দোহাই দিয়ে পুরো টাকা তুলে নিল, আর আরমানকে মাঝপথে [[be left in the lurch]] অবস্থায় ফেলে দিল। এই ঘটনাটা তার কাছে একেবারেই [[bolt from the blue]]-এর মতো ছিল। তার আরমান দাম যাচাই না করে কোনো গাড়ি কিনবে না; সে ঠিক করল, এই মানসিক চাপটা তার গাড়ি কেনার ইচ্ছাকে পুরোপুরি নষ্ট করে দিতে পারে, তাই সে এই নেতিবাচক চিন্তাকে শুরুতেই [[nip in the bud]] করার সিদ্ধান্ত নিল। সে তার বাবাকে সব খুলে বলল। আরমানের জীবনযাপন একেবারেই [[an open book]]; তার মধ্যে কোনো লুকোচুরি নেই। সে তার নতুন পরিকল্পনার কথা আত্মীয়দের জানাল। আরমান [[blow his own trumpet]] করে জানাল না যে সে নিজে অনেক টাকা জমিয়েছে; বরং সে সবার কাছে নিজের চার চাকার স্থিরতা ধরতে পারে।",
    storyEn:
      "Fed up with rickshaws and crowded buses, Arman decided he would buy a small car of his own. To buy the car he planned to borrow from a friend, so that he would not have to touch the money of his big business fund. But one day, suddenly, his friend withdrew all the money, blaming business losses, and Arman was [[left in the lurch]] in the middle of everything. The incident came to him like a [[bolt from the blue]]. Arman decided he would not buy any car without checking the price properly; this mental stress could completely spoil his wish to buy a car, so he decided to [[nip]] this negative thinking [[in the bud]]. He told his father everything openly. Arman's life is truly [[an open book]]; there is no hiding in him. He shared his new plan with his relatives. Arman did not [[blow his own trumpet]] about how much money he had saved himself; rather, with everyone's help, his dream of four wheels could finally stand firm.",
    idioms: [
      {
        idiom: "Be left in the lurch",
        meaning: "To be abandoned in a difficult situation",
        meaningBn: "বিপদের সময় ছেড়ে যাওয়া / কঠিন পরিস্থিতিতে অসহায় ফেলে যাওয়া",
        n: 56,
        examples: [
          ["When the project manager suddenly resigned, the entire team was [[left in the lurch]].", "প্রজেক্ট ম্যানেজার হঠাৎ পদত্যাগ করলে পুরো দল বিপদে পড়ে গেল।"],
          ["I promised to help him, and I would never [[leave him in the lurch]].", "আমি তাকে সাহায্যের প্রতিশ্রুতি দিয়েছি, আর আমি কখনো তাকে বিপদে ফেলে যাব না।"],
          ["The company went bankrupt, and hundreds of employees were [[left in the lurch]].", "কোম্পানিটি দেউলিয়া হয়ে গেল, আর শত শত কর্মী অসহায় অবস্থায় পড়ে গেল।"],
        ],
      },
      {
        idiom: "Bolt from the blue",
        meaning: "A sudden and unexpected disaster",
        meaningBn: "বিনা মেঘে বজ্রপাত / সম্পূর্ণ অপ্রত্যাশিত বিপদ",
        n: 113,
        examples: [
          ["The news of his sudden resignation came as a [[bolt from the blue]].", "তার হঠাৎ পদত্যাগের খবরটা এল বিনা মেঘে বজ্রপাতের মতো।"],
          ["Winning the lottery was a complete [[bolt from the blue]] for our family.", "লটারি জেতাটা আমাদের পরিবারের জন্য ছিল সম্পূর্ণ অপ্রত্যাশিত ঘটনা।"],
          ["The sudden cancellation of the exam felt like a [[bolt from the blue]] to the students.", "পরীক্ষা হঠাৎ বাতিল হওয়াটা শিক্ষার্থীদের কাছে বিনা মেঘে বজ্রপাতের মতো মনে হলো।"],
        ],
      },
      {
        idiom: "Nip in the bud",
        meaning: "To stop something at an early stage before it becomes worse",
        meaningBn: "অঙ্কুরেই বিনাশ করা / খারাপ হওয়ার আগেই থামিয়ে দেওয়া",
        n: 61,
        examples: [
          ["If you see any signs of a bad habit in your child, you should [[nip it in the bud]].", "সন্তানের মধ্যে খারাপ অভ্যাসের লক্ষণ দেখলে তা শুরুতেই থামিয়ে দেওয়া উচিত।"],
          ["The manager decided to [[nip the rumor in the bud]] before it spread across the office.", "গুজবটা অফিসে ছড়িয়ে পড়ার আগেই ম্যানেজার তা থামিয়ে দেওয়ার সিদ্ধান্ত নিলেন।"],
          ["We need to [[nip this problem in the bud]] before it ruins the whole project.", "পুরো প্রকল্প নষ্ট করার আগেই আমাদের এই সমস্যাটা শুরুতেই থামাতে হবে।"],
        ],
      },
      {
        idiom: "An open book",
        meaning: "Someone who is easy to understand and has no secrets",
        meaningBn: "যাকে সহজে বোঝা যায় এবং যার কোনো গোপনীয়তা নেই",
        examples: [
          ["You do not have to guess what he is thinking; his life is [[an open book]].", "সে কী ভাবছে তা অনুমান করতে হয় না; তার জীবন খোলা বইয়ের মতো।"],
          ["She shares all her feelings with me because our relationship is like [[an open book]].", "সে তার সব অনুভূতি আমার সঙ্গে ভাগ করে, কারণ আমাদের সম্পর্ক খোলা বইয়ের মতো।"],
          ["The celebrity claims that his past is [[an open book]] to his fans.", "তারকাটি দাবি করেন, তার অতীত তার ভক্তদের কাছে খোলা বইয়ের মতো।"],
        ],
      },
      {
        idiom: "Blow one's own trumpet",
        meaning: "To boast about one's own achievements",
        meaningBn: "নিজের ঢাক নিজে পেটানো / নিজের কৃতিত্বের বড়াই করা",
        n: 76,
        examples: [
          ["I do not like to [[blow my own trumpet]], but I did play a major role in winning this contract.", "আমি নিজের ঢাক নিজে পেটাতে পছন্দ করি না, কিন্তু এই চুক্তি জয়ে আমার বড় ভূমিকা ছিল।"],
          ["He spends half the meeting [[blowing his own trumpet]] instead of discussing real issues.", "আসল বিষয় আলোচনার বদলে সে সভার অর্ধেক সময় নিজের বড়াই করে কাটায়।"],
          ["Anyone who constantly [[blows his own trumpet]] usually lacks true confidence.", "যে সবসময় নিজের ঢাক নিজে পেটায়, তার মধ্যে সাধারণত প্রকৃত আত্মবিশ্বাসের অভাব থাকে।"],
        ],
      },
    ],
  },
  {
    num: 9,
    titleBn: "শহরে প্রথম সপ্তাহ",
    titleEn: "The First Week in the City",
    storyBn:
      "গ্রাম থেকে ঢাকায় এসে শাকিল একটা মেসে উঠল। রুমমেট রাব্বি প্রথম দিন থেকেই তাকে [[at arm's length]] রাখল — দূরত্ব বজায় রেখে কথা বলত। শাকিল ভেবেছিল শহরে কাজ পাওয়া সহজ, কিন্তু কাজ খোঁজা তার কাছে [[out of the question]] মনে হতে লাগল — যেন অসম্ভব। একদিন মেসে একটা [[out of the way]] ঘটনা ঘটল: রান্নাঘরে অদ্ভুত শব্দ! ভয় পেয়ে রাব্বি [[showed a clean pair of heels]] — সোজা ছাদে দৌড়! শব্দটা আসলে ছিল একটা বিড়ালের। সেদিন রাতে দুজনে মিলে চা খেতে খেতে শাকিল [[kept his fingers crossed]] আর বলল, কাল ইন্টারভিউটা যেন ভালো হয়। সেই রাত থেকে রাব্বি আর তাকে দূরে রাখল না।",
    storyEn:
      "Coming from the village to Dhaka, Shakil moved into a mess. From the first day his roommate Rabbi kept him [[at arm's length]] — he talked while keeping a distance. Shakil had thought finding work in the city would be easy, but job hunting began to feel [[out of the question]] — almost impossible. One day an [[out of the way]] incident happened in the mess: a strange sound in the kitchen! Frightened, Rabbi [[showed a clean pair of heels]] — he ran straight to the roof! The sound was actually just a cat. That night, drinking tea together, Shakil [[kept his fingers crossed]] and said, may tomorrow's interview go well. From that night Rabbi no longer kept him at a distance.",
    idioms: [
      {
        idiom: "At arm’s length",
        meaning: "To keep at a distance",
        meaningBn: "দূরত্ব বজায় রাখা",
        n: 32,
        examples: [
          ["After the quarrel, she kept her old friend [[at arm's length]].", "ঝগড়ার পর সে তার পুরনো বন্ধুকে দূরে রাখল।"],
          ["A wise officer keeps bribe-givers [[at arm's length]].", "একজন জ্ঞানী কর্মকর্তা ঘুষদাতাদের দূরে রাখেন।"],
          ["He is friendly with everyone but keeps strangers [[at arm's length]].", "সে সবার সঙ্গে বন্ধুসুলভ, কিন্তু অপরিচিতদের দূরে রাখে।"],
        ],
      },
      {
        idiom: "Out of the question",
        meaning: "Impossible",
        meaningBn: "অসম্ভব",
        n: 33,
        examples: [
          ["Buying a car this year is [[out of the question]] on my salary.", "আমার বেতনে এই বছর গাড়ি কেনা অসম্ভব।"],
          ["A holiday now is [[out of the question]]; the exams are next week.", "এখন ছুটি অসম্ভব; পরীক্ষা আগামী সপ্তাহে।"],
          ["For a heart patient, heavy exercise is [[out of the question]].", "হৃদরোগীর জন্য ভারী ব্যায়াম অসম্ভব।"],
        ],
      },
      {
        idiom: "Out of the way",
        meaning: "Strange",
        meaningBn: "অদ্ভুত / অস্বাভাবিক",
        n: 34,
        examples: [
          ["There is something [[out of the way]] about that empty house at night.", "রাতে ওই খালি বাড়িটা নিয়ে কিছু একটা অদ্ভুত ব্যাপার আছে।"],
          ["He asked an [[out of the way]] question that surprised the teacher.", "সে একটা অদ্ভুত প্রশ্ন করল যা শিক্ষককে অবাক করল।"],
          ["Nothing [[out of the way]] happened during the journey.", "যাত্রায় অস্বাভাবিক কিছু ঘটেনি।"],
        ],
      },
      {
        idiom: "Show a clean pair of heels",
        meaning: "Run away",
        meaningBn: "পালিয়ে যাওয়া",
        n: 35,
        examples: [
          ["When the police arrived, the thieves [[showed a clean pair of heels]].", "পুলিশ এলে চোরেরা পালিয়ে গেল।"],
          ["The dog barked loudly and the fox [[showed a clean pair of heels]].", "কুকুর জোরে ডাকল আর শেয়ালটা পালিয়ে গেল।"],
          ["Seeing the angry crowd, the pickpocket [[showed a clean pair of heels]].", "রাগী ভিড় দেখে পকেটমার পালিয়ে গেল।"],
        ],
      },
      {
        idiom: "Keep one’s fingers crossed",
        meaning: "The anxiety in which you hope that nothing will upset your plans",
        meaningBn: "এই উদ্বেগ নিয়ে আশা করা যে পরিকল্পনা নষ্ট হবে না",
        n: 36,
        examples: [
          ["I have applied for the job; now I am just [[keeping my fingers crossed]].", "আমি চাকরির আবেদন করেছি; এখন শুধু আশায় বসে আছি যেন সব ঠিকঠাক হয়।"],
          ["We [[kept our fingers crossed]] while the doctor examined the patient.", "ডাক্তার রোগীকে পরীক্ষা করার সময় আমরা উদ্বেগ নিয়ে আশা করছিলাম।"],
          ["[[Keep your fingers crossed]] for good weather on the picnic day.", "পিকনিকের দিন ভালো আবহাওয়ার জন্য আশা করে থেকো।"],
        ],
      },
    ],
  },
  {
    num: 10,
    titleBn: "গুজবের আগুন",
    titleEn: "The Fire of Rumour",
    storyBn:
      "স্কুলের এক শিক্ষক বদলি হচ্ছেন — এই খবরটা [[spread like wild fire]] ছড়িয়ে পড়ল পুরো পাড়ায়। কে প্রথম বলল, কেউ জানে না। প্রাক্তন ছাত্র রাসেল [[in the nick of time]] স্কুলে পৌঁছল — ঠিক শেষ মুহূর্তে, বিদায় অনুষ্ঠান শুরুর আগেই। কমিটির সদস্যরা তখনো [[sitting on the fence]] — তারা ঠিক করতে পারছিল না অনুষ্ঠানটা বড় করে হবে নাকি ছোট। রাসেলের [[the gift of the gab]] আছে — কথা বলার প্রতিভা; সে পাঁচ মিনিটে সবাইকে রাজি করিয়ে বড় অনুষ্ঠানের পক্ষে নিয়ে এল। শেষ পর্যন্ত ছাত্ররা প্রতিজ্ঞা করল, তারা তাদের প্রিয় শিক্ষককে সম্মান জানাবে [[by hook or by crook]] — যেকোনো উপায়ে।",
    storyEn:
      "The news that a schoolteacher was being transferred [[spread like wild fire]] through the whole neighbourhood. Who said it first, nobody knows. Former student Rasel reached the school [[in the nick of time]] — just at the last moment, before the farewell programme began. The committee members were still [[sitting on the fence]] — they could not decide whether the programme would be big or small. Rasel has [[the gift of the gab]] — a talent for speaking; in five minutes he convinced everyone in favour of a big programme. In the end the students promised they would honour their beloved teacher [[by hook or by crook]] — by any means possible.",
    idioms: [
      {
        idiom: "In the nick of time",
        meaning: "Just at the last moment",
        meaningBn: "ঠিক শেষ মুহূর্তে",
        n: 37,
        examples: [
          ["The ambulance arrived [[in the nick of time]] and saved the patient.", "অ্যাম্বুলেন্স ঠিক শেষ মুহূর্তে পৌঁছে রোগীকে বাঁচাল।"],
          ["He caught the train [[in the nick of time]].", "সে ঠিক শেষ মুহূর্তে ট্রেনটা ধরল।"],
          ["The fire brigade came [[in the nick of time]] before the fire spread.", "আগুন ছড়ানোর আগেই দমকল ঠিক শেষ মুহূর্তে এসে পৌঁছল।"],
        ],
      },
      {
        idiom: "Sitting on the fence",
        meaning: "Hesitate between two decisions",
        meaningBn: "দুটি সিদ্ধান্তের মাঝে দ্বিধায় থাকা",
        n: 38,
        examples: [
          ["You cannot keep [[sitting on the fence]]; choose one side and say it clearly.", "তুমি আর দ্বিধায় থাকতে পারো না; একটা পক্ষ বেছে পরিষ্কার করে বলো।"],
          ["The chairman remained [[sitting on the fence]] while the members argued.", "সদস্যরা তর্ক করার সময় সভাপতি দ্বিধায়ই থেকে গেলেন।"],
          ["In a crisis, [[sitting on the fence]] helps nobody.", "সংকটের সময় দ্বিধায় থাকা কারো উপকার করে না।"],
        ],
      },
      {
        idiom: "Spread like wild fire",
        meaning: "Spread quickly",
        meaningBn: "দ্রুত ছড়িয়ে পড়া",
        n: 39,
        examples: [
          ["The news of the victory [[spread like wild fire]] in the village.", "জয়ের খবরটা গ্রামে দ্রুত ছড়িয়ে পড়ল।"],
          ["A false rumour can [[spread like wild fire]] on social media.", "মিথ্যা গুজব সোশ্যাল মিডিয়ায় দ্রুত ছড়িয়ে পড়তে পারে।"],
          ["The disease [[spread like wild fire]] during the rainy season.", "বর্ষাকালে রোগটা দ্রুত ছড়িয়ে পড়ল।"],
        ],
      },
      {
        idiom: "The gift of the gab",
        meaning: "Talent for speaking",
        meaningBn: "কথা বলার প্রতিভা",
        n: 40,
        examples: [
          ["A good salesman needs [[the gift of the gab]].", "একজন ভালো বিক্রেতার কথা বলার প্রতিভা দরকার।"],
          ["She has [[the gift of the gab]] and can convince anyone in minutes.", "তার কথা বলার প্রতিভা আছে, আর সে মিনিটের মধ্যে যেকাউকে রাজি করাতে পারে।"],
          ["Our class teacher has [[the gift of the gab]]; even dull lessons feel interesting.", "আমাদের ক্লাস শিক্ষকের কথা বলার প্রতিভা আছে; একঘেয়ে পাঠও আকর্ষণীয় লাগে।"],
        ],
      },
      {
        idiom: "By hook or by crook",
        meaning: "By fair or foul means",
        meaningBn: "ভালো বা মন্দ — যেকোনো উপায়ে",
        n: 41,
        examples: [
          ["He is determined to pass the exam [[by hook or by crook]].", "সে যেকোনো উপায়ে পরীক্ষায় পাস করতে দৃঢ়প্রতিজ্ঞ।"],
          ["The land grabber wanted the plot [[by hook or by crook]].", "জমিদখলকারী যেকোনো উপায়ে জমিটা চাইছিল।"],
          ["We must finish this bridge before the monsoon, [[by hook or by crook]].", "বর্ষার আগে যেকোনো উপায়ে এই সেতুটা শেষ করতেই হবে।"],
        ],
      },
    ],
  },
  {
    num: 11,
    titleBn: "অফিসের নতুন কর্মকর্তা",
    titleEn: "The New Officer at the Office",
    storyBn:
      "নতুন কর্মকর্তা মি. চৌধুরী অফিসে এসেই কয়েকজন কর্মচারীর অন্যায় সুবিধা নেওয়ার পথ বন্ধ করে দিলেন। পুরনো কেরানি বাবুল সাহেব এতদিন অফিসের টাকায় [[feathered his own nest]] — অন্যায়ভাবে নিজের পকেট ভরেছেন। একদিন ফাইল হারিয়ে যাওয়ায় পুরো অফিসের কাজ [[thrown out of gear]] হয়ে গেল — সব এলোমেলো। জুনিয়র অফিসার তানভীর ভয়ে [[took to his heels]] — সোজা বাসায় পালাল! মি. চৌধুরী তাকে ফোন করে বললেন, সমস্যা থেকে পালানো যায় না; [[tooth and nail]] লড়তে হবে — সর্বশক্তি দিয়ে কাজ ঠিক করতে হবে। বাবুল সাহেবের পুরনো সহকর্মী বললেন, তিনি চান বাবুল [[die in harness]] হোক — চাকরিতে থেকেই শেষ দিন পর্যন্ত কাজ করুক, অপমানে নয়।",
    storyEn:
      "As soon as the new officer Mr. Chowdhury joined the office, he stopped the unfair benefits some employees had been taking. The old clerk Babul Saheb had long been [[feathering his own nest]] with office money — filling his own pocket unfairly. One day, when a file went missing, the whole office's work was [[thrown out of gear]] — everything fell into disorder. The junior officer Tanvir, frightened, [[took to his heels]] — he ran straight home! Mr. Chowdhury phoned him and said, you cannot run away from a problem; we must fight [[tooth and nail]] — put in all our strength to set the work right. Babul Saheb's old colleague said he wished Babul would [[die in harness]] — work till his last day in service, not in disgrace.",
    idioms: [
      {
        idiom: "Feather one’s own nest",
        meaning: "Make money unfairly",
        meaningBn: "অন্যায়ভাবে টাকা উপার্জন করা",
        n: 42,
        examples: [
          ["The corrupt officer [[feathered his own nest]] while the road project suffered.", "দুর্নীতিবাজ কর্মকর্তা অন্যায়ভাবে টাকা কামালেন, আর সড়ক প্রকল্প ক্ষতিগ্রস্ত হলো।"],
          ["A public servant should serve people, not [[feather his own nest]].", "একজন সরকারি কর্মচারীর মানুষের সেবা করা উচিত, অন্যায়ভাবে টাকা কামানো নয়।"],
          ["He used his position to [[feather his own nest]] for ten years.", "সে দশ বছর ধরে নিজের পদ ব্যবহার করে অন্যায়ভাবে টাকা উপার্জন করেছে।"],
        ],
      },
      {
        idiom: "Throw out of gear",
        meaning: "Disturb the work",
        meaningBn: "কাজে ব্যাঘাত ঘটানো",
        n: 43,
        examples: [
          ["The sudden strike [[threw]] the factory's production [[out of gear]].", "হঠাৎ ধর্মঘট কারখানার উৎপাদনে ব্যাঘাত ঘটাল।"],
          ["Heavy rain [[threw]] the city's traffic [[out of gear]].", "ভারী বৃষ্টি শহরের যান চলাচলে ব্যাঘাত ঘটাল।"],
          ["One absent teacher can [[throw]] the whole routine [[out of gear]].", "একজন অনুপস্থিত শিক্ষক পুরো রুটিনে ব্যাঘাত ঘটাতে পারেন।"],
        ],
      },
      {
        idiom: "Take to one’s heels",
        meaning: "Run away",
        meaningBn: "পালিয়ে যাওয়া",
        n: 44,
        examples: [
          ["When the farmer shouted, the boys [[took to their heels]].", "কৃষক চিৎকার করলে ছেলেরা পালিয়ে গেল।"],
          ["The deer [[took to its heels]] at the sound of the tiger.", "বাঘের শব্দ পেয়ে হরিণটা পালিয়ে গেল।"],
          ["Instead of facing the question, he [[took to his heels]].", "প্রশ্নের মুখোমুখি না হয়ে সে পালিয়ে গেল।"],
        ],
      },
      {
        idiom: "Tooth and nail",
        meaning: "With all one’s power",
        meaningBn: "সর্বশক্তি দিয়ে",
        n: 45,
        examples: [
          ["The small team fought [[tooth and nail]] to win the match.", "ছোট দলটি ম্যাচ জিততে সর্বশক্তি দিয়ে লড়ল।"],
          ["Villagers resisted the river erosion [[tooth and nail]].", "গ্রামবাসী নদীভাঙন সর্বশক্তি দিয়ে প্রতিরোধ করল।"],
          ["She defended her thesis [[tooth and nail]] before the examiners.", "সে পরীক্ষকদের সামনে সর্বশক্তি দিয়ে তার গবেষণা পত্র রক্ষা করল।"],
        ],
      },
      {
        idiom: "Die in harness",
        meaning: "Die while in service",
        meaningBn: "চাকরিতে থাকা অবস্থায় মারা যাওয়া",
        n: 46,
        examples: [
          ["The old postman [[died in harness]] after forty years of service.", "বৃদ্ধ ডাকপিয়ন চল্লিশ বছর চাকরির পর চাকরিতে থাকা অবস্থায় মারা গেলেন।"],
          ["He does not want to retire; he wishes to [[die in harness]].", "সে অবসর নিতে চায় না; সে চাকরিতে থাকা অবস্থায় শেষ নিঃশ্বাস নিতে চায়।"],
          ["Many dedicated teachers [[die in harness]], serving students till the end.", "অনেক নিবেদিতপ্রাণ শিক্ষক শেষ পর্যন্ত শিক্ষার্থীদের সেবা করে চাকরিতে থাকা অবস্থায় মারা যান।"],
        ],
      },
    ],
  },
  {
    num: 12,
    titleBn: "বইমেলায় একদিন",
    titleEn: "A Day at the Book Fair",
    storyBn:
      "বইমেলায় গিয়ে মিতা তার প্রিয় লেখকের নতুন বইটা কিনল। বাসায় এসে সে সিদ্ধান্ত নিল, সে এই লেখকের মতো লিখতে শিখবে — [[take a leaf out of his book]], তাকে অনুকরণ করবে। তার বান্ধবী রুমা গল্প লেখার প্রতিযোগিতায় জিততে [[left no stone unturned]] — সব উপায় চেষ্টা করল, প্রতিদিন লিখল, শিক্ষকের পরামর্শ নিল। অথচ তাদের ক্লাসের শাকিল নিজেকে বড় লেখক ভাবে, কিন্তু আসলে সে [[a man of straw]] — গুরুত্বহীন মানুষ, লেখায় কোনো গভীরতা নেই। মিতা বইটা পড়ে [[read between the lines]] — লাইনের ফাঁকের লুকানো অর্থ বুঝতে পারল: লেখক আসলে নিজের মায়ের কথাই লিখেছেন। বইয়ের শেষ গল্পে এক শিকারি [[in cold blood]] — ইচ্ছাকৃতভাবে, আবেগ ছাড়া — একটা হরিণ মেরেছিল; মিতার চোখে পানি এল। সেদিন মিতা বুঝল, ভালো লেখা মানে শুধু সুন্দর বাক্য নয়, পাঠকের মন ছুঁয়ে যাওয়া।",
    storyEn:
      "At the book fair, Mita bought her favourite writer's new book. Coming home, she decided she would learn to write like this writer — [[take a leaf out of his book]], imitate him. Her friend Ruma, to win the story-writing competition, [[left no stone unturned]] — she tried every means, wrote every day, and took her teacher's advice. But Shakil from their class thinks of himself as a great writer, while in truth he is [[a man of straw]] — a man of no substance, with no depth in his writing. Reading the book, Mita [[read between the lines]] — she understood the hidden meaning: the writer had actually written about his own mother. In the book's last story, a hunter killed a deer [[in cold blood]] — deliberately and without emotion; tears came to Mita's eyes. That day Mita understood that good writing is not only beautiful sentences, but words that touch the reader's heart.",
    idioms: [
      {
        idiom: "Take a leaf out of one’s book",
        meaning: "Imitate one",
        meaningBn: "কাউকে অনুকরণ করা",
        n: 47,
        examples: [
          ["You should [[take a leaf out of her book]] and keep a daily diary.", "তোমার উচিত তাকে অনুকরণ করে প্রতিদিনের ডায়েরি রাখা।"],
          ["The young player [[took a leaf out of the captain's book]] and practised before sunrise.", "তরুণ খেলোয়াড় অধিনায়ককে অনুকরণ করে সূর্য ওঠার আগে অনুশীলন করল।"],
          ["Our school [[took a leaf out of their book]] and started a reading hour.", "আমাদের স্কুল তাদের অনুকরণ করে পাঠের ঘণ্টা শুরু করল।"],
        ],
      },
      {
        idiom: "Leave no stone unturned",
        meaning: "Use all available means",
        meaningBn: "সব উপায় ব্যবহার করা / কোনো চেষ্টা বাকি না রাখা",
        n: 48,
        examples: [
          ["The police [[left no stone unturned]] to find the missing child.", "নিখোঁজ শিশুটিকে খুঁজতে পুলিশ কোনো চেষ্টা বাকি রাখল না।"],
          ["She [[left no stone unturned]] to make the programme a success.", "অনুষ্ঠান সফল করতে সে সব উপায় ব্যবহার করল।"],
          ["We will [[leave no stone unturned]] until the road is repaired.", "রাস্তা মেরামত না হওয়া পর্যন্ত আমরা কোনো চেষ্টা বাকি রাখব না।"],
        ],
      },
      {
        idiom: "A man of straw",
        meaning: "A man of no substance",
        meaningBn: "গুরুত্বহীন মানুষ",
        n: 49,
        examples: [
          ["The committee chose a chairman who proved to be [[a man of straw]].", "কমিটি এমন একজন সভাপতি বেছে নিল যিনি গুরুত্বহীন মানুষ বলে প্রমাণিত হলেন।"],
          ["Do not depend on him in a crisis; he is [[a man of straw]].", "সংকটে তার ওপর নির্ভর করো না; সে গুরুত্বহীন মানুষ।"],
          ["People soon realised the new leader was [[a man of straw]].", "মানুষ শীঘ্রই বুঝল নতুন নেতা গুরুত্বহীন মানুষ।"],
        ],
      },
      {
        idiom: "Read between the lines",
        meaning: "Understand the hidden meaning",
        meaningBn: "লাইনের ফাঁকে লুকানো অর্থ বোঝা",
        n: 50,
        examples: [
          ["Her letter sounded happy, but [[reading between the lines]], I knew she was sad.", "তার চিঠি আনন্দের মনে হলেও, লাইনের ফাঁকে পড়ে আমি বুঝলাম সে দুঃখী।"],
          ["A good reader learns to [[read between the lines]] of a poem.", "একজন ভালো পাঠক কবিতার লুকানো অর্থ বুঝতে শেখে।"],
          ["[[Read between the lines]] of his speech and you will find a warning.", "তার বক্তৃতার লুকানো অর্থ বুঝলেই তুমি সতর্কবার্তা খুঁজে পাবে।"],
        ],
      },
      {
        idiom: "In cold blood",
        meaning: "Deliberately and without emotion",
        meaningBn: "ইচ্ছাকৃতভাবে ও আবেগ ছাড়া",
        n: 51,
        examples: [
          ["The hunter killed the deer [[in cold blood]], and the villagers were angry.", "শিকারি ইচ্ছাকৃতভাবে আবেগ ছাড়া হরিণটিকে মারল, আর গ্রামবাসী রেগে গেল।"],
          ["He rejected his old friend's request [[in cold blood]].", "সে আবেগ ছাড়া ইচ্ছাকৃতভাবে তার পুরনো বন্ধুর অনুরোধ ফিরিয়ে দিল।"],
          ["The crime was planned [[in cold blood]] over many weeks.", "অপরাধটা অনেক সপ্তাহ ধরে ইচ্ছাকৃতভাবে ঠান্ডা মাথায় পরিকল্পনা করা হয়েছিল।"],
        ],
      },
    ],
  },
  {
    num: 13,
    titleBn: "পাশের বাড়ির রহস্য",
    titleEn: "The Mystery of the Next-door House",
    storyBn:
      "পাশের বাড়ির বৃদ্ধ রহিম চাচা সবার কাছে [[a thorn in the flesh]] — বিরক্তির চিরস্থায়ী কারণ, কারণ তিনি সারাদিন অভিযোগ করেন। একদিন রাতে তার বাড়ি থেকে অদ্ভুত শব্দ এলে পাড়ার যুবক তুষার [[smelled a rat]] — খারাপ কিছু সন্দেহ করল। সে দেখল, দুজন লোক বাড়ির পেছনে ঘোরাঘুরি করছে। তুষার বারবার একই কথা বলতে লাগল — প্রতিবেশীরা বিরক্ত হয়ে বলল, তুমি [[harping on the same string]] কেন? কিন্তু তুষার পুলিশকে খবর দিল, আর চোর ধরা পড়ল। পরদিন রহিম চাচা সবার সঙ্গে [[buried the hatchet]] — ঝগড়া শেষ করে শান্তি করলেন, আর তুষারকে ধন্যবাদ দিলেন। আসলে শহর থেকে আসা রহিম চাচার ভাগ্নে এই পাড়ায় [[like a fish out of water]] — অপরিচিত পরিস্থিতিতে অস্বস্তিতে ছিল; সেই-ই ভয়ে প্রথম শব্দটা শুনেছিল।",
    storyEn:
      "Old Rahim uncle from the next-door house is [[a thorn in the flesh]] to everyone — a constant source of annoyance, because he complains all day. One night, when strange sounds came from his house, the neighbourhood youth Tushar [[smelled a rat]] — he suspected something foul. He saw two men moving around behind the house. Tushar kept saying the same thing again and again — the neighbours got annoyed and said, why are you [[harping on the same string]]? But Tushar informed the police, and the thieves were caught. The next day Rahim uncle [[buried the hatchet]] with everyone — he ended the quarrels, made peace, and thanked Tushar. In fact, Rahim uncle's nephew, who had come from the city, was [[like a fish out of water]] in this neighbourhood — uncomfortable in a strange situation; it was he who had first heard the sound in fear.",
    idioms: [
      {
        idiom: "A thorn in the flesh",
        meaning: "A constant source of annoyance",
        meaningBn: "বিরক্তির চিরস্থায়ী কারণ",
        n: 52,
        examples: [
          ["The broken road has been [[a thorn in the flesh]] of the villagers for years.", "ভাঙা রাস্তাটা বছরের পর বছর গ্রামবাসীর বিরক্তির কারণ হয়ে আছে।"],
          ["His rude driver was [[a thorn in the flesh]] of the whole office.", "তার রূঢ় চালক ছিল পুরো অফিসের বিরক্তির কারণ।"],
          ["Load-shedding is [[a thorn in the flesh]] for students during exams.", "পরীক্ষার সময় লোডশেডিং শিক্ষার্থীদের বিরক্তির চিরস্থায়ী কারণ।"],
        ],
      },
      {
        idiom: "Smell a rat",
        meaning: "Suspect something foul",
        meaningBn: "খারাপ কিছু সন্দেহ করা",
        n: 53,
        examples: [
          ["When the stranger offered a very cheap phone, I [[smelled a rat]].", "অপরিচিত লোকটি খুব সস্তায় ফোন দিতে চাইলে আমি খারাপ কিছু সন্দেহ করলাম।"],
          ["The officer [[smelled a rat]] when the accounts did not match.", "হিসাব না মিললে কর্মকর্তা খারাপ কিছু সন্দেহ করলেন।"],
          ["She [[smelled a rat]] as soon as he changed his story.", "সে কথা বদলাতেই মেয়েটি খারাপ কিছু সন্দেহ করল।"],
        ],
      },
      {
        idiom: "Harp on the same string",
        meaning: "Dwell on the same subject",
        meaningBn: "একই বিষয়ে বারবার বলতে থাকা",
        n: 54,
        examples: [
          ["Please stop [[harping on the same string]]; we have heard the complaint ten times.", "দয়া করে একই কথা বারবার বলা বন্ধ করো; অভিযোগটা আমরা দশবার শুনেছি।"],
          ["The old man keeps [[harping on the same string]] about his young days.", "বৃদ্ধ লোকটি তার যৌবনের দিন নিয়ে একই কথা বারবার বলতে থাকেন।"],
          ["A good speaker does not [[harp on the same string]] for an hour.", "একজন ভালো বক্তা এক ঘণ্টা ধরে একই বিষয়ে বলতে থাকেন না।"],
        ],
      },
      {
        idiom: "Bury the hatchet",
        meaning: "End the quarrel and make peace",
        meaningBn: "ঝগড়া শেষ করে শান্তি করা",
        n: 55,
        examples: [
          ["After ten years, the two families decided to [[bury the hatchet]].", "দশ বছর পর দুই পরিবার ঝগড়া শেষ করে শান্তি করার সিদ্ধান্ত নিল।"],
          ["Old friends should [[bury the hatchet]] and start again.", "পুরনো বন্ধুদের ঝগড়া মিটিয়ে আবার শুরু করা উচিত।"],
          ["The leaders [[buried the hatchet]] and signed a peace agreement.", "নেতারা ঝগড়া শেষ করে শান্তি চুক্তিতে সই করলেন।"],
        ],
      },
      {
        idiom: "Like a fish out of water",
        meaning: "In a strange situation",
        meaningBn: "অপরিচিত পরিস্থিতিতে",
        n: 57,
        examples: [
          ["At the big city party, the village boy felt [[like a fish out of water]].", "বড় শহরের অনুষ্ঠানে গ্রামের ছেলেটি অপরিচিত পরিস্থিতিতে অস্বস্তি বোধ করল।"],
          ["On her first day at the new school, she was [[like a fish out of water]].", "নতুন স্কুলে প্রথম দিনে সে ছিল জলছাড়া মাছের মতো অস্বস্তিতে।"],
          ["Without his tools, the mechanic is [[like a fish out of water]].", "যন্ত্রপাতি ছাড়া মেকানিক জলছাড়া মাছের মতো।"],
        ],
      },
    ],
  },
  {
    num: 14,
    titleBn: "হোটেলের চাকরি",
    titleEn: "The Job at the Hotel",
    storyBn:
      "সুমন একটা হোটেলে ওয়েটারের কাজ পেল। ম্যানেজার সাহেব খুব কড়া মানুষ; কর্মচারীরা যেন তার [[at his beck and call]] — সবসময় তার ইশারায় প্রস্তুত থাকতে হয়। বেতন কম, তাই সুমনকে [[to make both ends meet]] খুব হিসাব করে চলতে হয় — আয়ের মধ্যে জীবন চালাতে হয়। একদিন এক প্রভাবশালী অতিথি বিনা কারণে তাকে অপমান করলে সুমন [[in hot water]] পড়ল — বড় ঝামেলায়। কিন্তু সে [[stuck to his guns]] — নিজের অবস্থানে অটল থাকল, বলল, আমি কোনো ভুল করিনি। শেষ পর্যন্ত সিসিটিভি দেখে ম্যানেজার সত্য জানলেন, আর সেই অতিথিকেই [[eat humble pie]] করতে হলো — বিনয়ের সঙ্গে ক্ষমা চেয়ে নতি স্বীকার করতে হলো সবার সামনে। সেদিন সুমন শিখল, বিপদে অটল থাকলে সম্মান বাঁচে।",
    storyEn:
      "Sumon got a job as a waiter in a hotel. The manager is a very strict man; the staff must stay [[at his beck and call]] — always ready at his signal. The salary is low, so Sumon has [[to make both ends meet]] very carefully — he must live within his income. One day, when an influential guest insulted him without reason, Sumon fell [[in hot water]] — in big trouble. But he [[stuck to his guns]] — he remained firm in his position and said, I have done nothing wrong. In the end, watching the CCTV, the manager learned the truth, and that very guest had to [[eat humble pie]] — to apologise humbly and yield before everyone. That day Sumon learned that standing firm in trouble saves one's honour.",
    idioms: [
      {
        idiom: "At one’s beck and call",
        meaning: "Under his control",
        meaningBn: "তার নিয়ন্ত্রণে",
        n: 58,
        examples: [
          ["The rich man keeps three servants [[at his beck and call]].", "ধনী লোকটি তিনজন চাকরকে তার ইশারায় প্রস্তুত রাখেন।"],
          ["A good nurse is always [[at the beck and call]] of her patients.", "একজন ভালো সেবিকা সবসময় রোগীদের ডাকে প্রস্তুত থাকেন।"],
          ["He expects his younger brother to be [[at his beck and call]] all day.", "সে আশা করে তার ছোট ভাই সারাদিন তার ইশারায় থাকবে।"],
        ],
      },
      {
        idiom: "To make both ends meet",
        meaning: "To live within one’s income",
        meaningBn: "আয়ের মধ্যে জীবন চালানো",
        n: 59,
        examples: [
          ["With rising prices, poor families struggle [[to make both ends meet]].", "দাম বাড়ায় গরিব পরিবারগুলো আয়ের মধ্যে জীবন চালাতে হিমশিম খায়।"],
          ["The rickshaw puller works day and night [[to make both ends meet]].", "রিকশাচালক আয়-ব্যয় মেলাতে দিনরাত কাজ করে।"],
          ["She took a second job [[to make both ends meet]].", "আয়ের মধ্যে জীবন চালাতে সে দ্বিতীয় একটা কাজ নিল।"],
        ],
      },
      {
        idiom: "In hot water",
        meaning: "In trouble",
        meaningBn: "বিপদে / ঝামেলায়",
        n: 60,
        examples: [
          ["The student was [[in hot water]] for copying in the exam.", "পরীক্ষায় নকলের জন্য শিক্ষার্থীটি ঝামেলায় পড়ল।"],
          ["He landed [[in hot water]] after losing the office keys.", "অফিসের চাবি হারিয়ে সে বিপদে পড়ল।"],
          ["If you break the rules again, you will be [[in hot water]].", "আবার নিয়ম ভাঙলে তুমি ঝামেলায় পড়বে।"],
        ],
      },
      {
        idiom: "Stick to one’s guns",
        meaning: "Remain faithful to the cause",
        meaningBn: "নিজের অবস্থানে অটল থাকা",
        n: 62,
        examples: [
          ["Even when everyone opposed him, the scientist [[stuck to his guns]].", "সবাই বিরোধিতা করলেও বিজ্ঞানী নিজের অবস্থানে অটল থাকলেন।"],
          ["You should [[stick to your guns]] if you know you are right.", "তুমি ঠিক জানলে নিজের অবস্থানে অটল থাকা উচিত।"],
          ["The captain [[stuck to his guns]] and did not change the batting order.", "অধিনায়ক নিজের অবস্থানে অটল থেকে ব্যাটিং অর্ডার বদলালেন না।"],
        ],
      },
      {
        idiom: "To eat humble pie",
        meaning: "To apologize humbly and to yield under humiliating circumstances",
        meaningBn: "বিনয়ের সঙ্গে ক্ষমা চাওয়া ও অপমানের কাছে নতি স্বীকার করা",
        n: 63,
        examples: [
          ["After the results proved him wrong, the manager had [[to eat humble pie]].", "ফলাফল তাকে ভুল প্রমাণ করায় ম্যানেজারকে বিনয়ের সঙ্গে ক্ষমা চাইতে হলো।"],
          ["He boasted a lot, but in the end he [[ate humble pie]] before the whole team.", "সে অনেক বড়াই করেছিল, কিন্তু শেষে পুরো দলের সামনে তাকে নতি স্বীকার করতে হলো।"],
          ["It takes courage [[to eat humble pie]] and admit a mistake.", "নতি স্বীকার করে ভুল মানতে সাহস লাগে।"],
        ],
      },
    ],
  },
  {
    num: 15,
    titleBn: "বিয়ের আয়োজন",
    titleEn: "Arranging the Wedding",
    storyBn:
      "বোনের বিয়ের আয়োজন করতে গিয়ে পুরো পরিবার [[put the cart before the horse]] করে ফেলল — তারা হল বুকিং না দিয়েই খাবারের অর্ডার দিয়ে বসল, কাজের ক্রম উল্টে গেল। বিয়ের আগের রাতে দুলাভাইয়ের বন্ধুরা মজা করে বরকে [[called names]] — গালাগালাজের ভঙ্গিতে ডাকতে লাগল, সবাই হাসল। বরপক্ষের একজন বৃদ্ধ অতিথি [[on tenterhooks]] ছিলেন — নাতির বিয়ে ঠিকঠাক হবে তো, এই উদ্বেগে। কনের মা সবাইকে বললেন, ঘরের কথা বাইরে নয় — [[wash your dirty linen]] in public করা যাবে না, নিজেদের গোপন কথা অপরিচিতদের সামনে বলা যাবে না। শেষ পর্যন্ত সবাই [[in high spirits]] — খুব খুশি মনে বিয়েটা সম্পন্ন হলো।",
    storyEn:
      "While arranging his sister's wedding, the whole family [[put the cart before the horse]] — they ordered the food before booking the hall; the order of work was reversed. On the night before the wedding, the groom's friends jokingly [[called]] him [[names]] — they teased him with mock abuse, and everyone laughed. An elderly guest from the groom's side was [[on tenterhooks]] — anxious whether his grandson's wedding would go well. The bride's mother told everyone, household matters must not go outside — we must not [[wash our dirty linen]] in public, we must not speak of our private matters before strangers. In the end, everyone was [[in high spirits]] — the wedding was completed in great happiness.",
    idioms: [
      {
        idiom: "In high spirits",
        meaning: "Very happy",
        meaningBn: "খুবই খুশি",
        n: 64,
        examples: [
          ["After winning the match, the players were [[in high spirits]].", "ম্যাচ জেতার পর খেলোয়াড়রা খুবই খুশি ছিল।"],
          ["The children returned from the picnic [[in high spirits]].", "শিশুরা পিকনিক থেকে খুব খুশি মনে ফিরল।"],
          ["Good news from home kept the soldiers [[in high spirits]].", "বাড়ি থেকে ভালো খবর সৈনিকদের খুব খুশি রাখল।"],
        ],
      },
      {
        idiom: "Put the cart before the horse",
        meaning: "Put or do things in the wrong order",
        meaningBn: "ভুল ক্রমে কাজ করা",
        n: 65,
        examples: [
          ["You are [[putting the cart before the horse]] by printing invitations before fixing the date.", "তারিখ ঠিক না করে নিমন্ত্রণপত্র ছাপিয়ে তুমি ভুল ক্রমে কাজ করছ।"],
          ["Do not [[put the cart before the horse]]; learn the basics before the advanced lessons.", "ভুল ক্রমে কাজ করো না; উন্নত পাঠের আগে মৌলিক বিষয় শেখো।"],
          ["He [[put the cart before the horse]] when he hired staff before renting an office.", "অফিস ভাড়া না করে কর্মী নিয়োগ দিয়ে সে ভুল ক্রমে কাজ করল।"],
        ],
      },
      {
        idiom: "To call names",
        meaning: "To abuse",
        meaningBn: "গালিগালাজ করা",
        n: 66,
        examples: [
          ["The boys were punished for [[calling]] the new student [[names]].", "নতুন শিক্ষার্থীকে গালাগালাজ করার জন্য ছেলেদের শাস্তি দেওয়া হলো।"],
          ["It is wrong to [[call]] anyone [[names]] in anger.", "রাগের মাথায় কাউকে গালিগালাজ করা অন্যায়।"],
          ["She cried when her classmates [[called her names]].", "সহপাঠীরা তাকে গালাগালাজ করলে সে কাঁদল।"],
        ],
      },
      {
        idiom: "On tenterhooks",
        meaning: "In a state of suspense and anxiety",
        meaningBn: "উদ্বেগ ও উৎকণ্ঠার অবস্থায়",
        n: 67,
        examples: [
          ["The whole country was [[on tenterhooks]] during the final match.", "ফাইনাল ম্যাচের সময় পুরো দেশ উদ্বেগে ছিল।"],
          ["We waited [[on tenterhooks]] for the medical report.", "আমরা মেডিকেল রিপোর্টের জন্য উৎকণ্ঠায় অপেক্ষা করলাম।"],
          ["The passengers sat [[on tenterhooks]] as the plane shook in the storm.", "ঝড়ে বিমান কাঁপতে থাকায় যাত্রীরা উদ্বেগে বসে ছিল।"],
        ],
      },
      {
        idiom: "Wash one’s dirty linen",
        meaning: "Discuss unpleasant in public-private matters before strangers",
        meaningBn: "নিজের গোপন খারাপ কথা অপরিচিতদের সামনে প্রকাশ করা",
        n: 68,
        examples: [
          ["A wise family never [[washes its dirty linen]] in public.", "একটি জ্ঞানী পরিবার কখনো নিজেদের গোপন কথা সবার সামনে প্রকাশ করে না।"],
          ["The two partners [[washed their dirty linen]] before the clients, and the deal broke.", "দুই অংশীদার ক্রেতাদের সামনে নিজেদের গোপন কথা প্রকাশ করল, আর চুক্তি ভেঙে গেল।"],
          ["Please settle the matter at home; do not [[wash your dirty linen]] in the office.", "দয়া করে বিষয়টা বাড়িতে মেটাও; অফিসে গোপন কথা প্রকাশ করো না।"],
        ],
      },
    ],
  },
  {
    num: 16,
    titleBn: "সার্কাসের বাঘ",
    titleEn: "The Circus Tiger",
    storyBn:
      "শহরে সার্কাস এসেছে। সার্কাসের বাঘটাকে খাঁচায় ঢোকানো ছিল [[to bell the cat]]-এর মতো কাজ — ঝুঁকির মুখোমুখি হওয়া। নতুন খেলোয়াড় রতনের কাছে পুরো বিষয়টা ছিল [[a hard nut to crack]] — কঠিন সমস্যা। দলের [[a big gun]] — সবচেয়ে গুরুত্বপূর্ণ ব্যক্তি, পুরনো ট্রেনার ওস্তাদ করিম — তিনি জানতেন একটা কৌশল: বাঘটাকে খাবার দেখিয়ে শান্ত করা যায়, আর তাতে [[kill two birds with one stone]] হবে — এক চেষ্টায় বাঘও শান্ত হবে, দর্শকও খুশি হবে। কিন্তু হঠাৎ কেউ [[let the cat out of the bag]] — গোপন কথাটা ফাঁস করে দিল যে বাঘটা সেদিন অসুস্থ! দর্শকদের মধ্যে গুঞ্জন শুরু হলো, আর ম্যানেজার রতনকে [[took to task]] — বকা দিল কেন সে আগে খবরটা জানায়নি।",
    storyEn:
      "A circus has come to town. Putting the circus tiger into its cage was a task like [[to bell the cat]] — facing real risk. For the new performer Ratan, the whole matter was [[a hard nut to crack]] — a difficult problem. The team's [[big gun]] — the most important person, the old trainer Ustad Karim — knew a trick: the tiger could be calmed by showing it food, and that would [[kill two birds with one stone]] — with one effort the tiger would be calm and the audience happy. But suddenly someone [[let the cat out of the bag]] — revealed the secret that the tiger was ill that day! A murmur rose among the audience, and the manager [[took]] Ratan [[to task]] — rebuked him for not reporting the news earlier.",
    idioms: [
      {
        idiom: "To bell the cat",
        meaning: "To face the risk",
        meaningBn: "ঝুঁকির মুখোমুখি হওয়া",
        n: 69,
        examples: [
          ["Everyone agreed the manager should be told, but nobody wanted [[to bell the cat]].", "সবাই একমত হলো ম্যানেজারকে বলা উচিত, কিন্তু ঝুঁকি নিয়ে কেউ বলতে চাইল না।"],
          ["The young officer volunteered [[to bell the cat]] and inform the director of the loss.", "তরুণ কর্মকর্তা ঝুঁকি নিয়ে পরিচালককে ক্ষতির খবর দিতে এগিয়ে এলেন।"],
          ["It is easy to make a plan; the question is who will [[bell the cat]].", "পরিকল্পনা করা সহজ; প্রশ্ন হলো ঝুঁকিটা কে নেবে।"],
        ],
      },
      {
        idiom: "A hard nut to crack",
        meaning: "A difficult problem",
        meaningBn: "কঠিন সমস্যা",
        n: 70,
        examples: [
          ["The last maths problem was [[a hard nut to crack]] for the whole class.", "শেষ অঙ্কটা পুরো ক্লাসের জন্য কঠিন সমস্যা ছিল।"],
          ["Traffic jam in this city is [[a hard nut to crack]].", "এই শহরের যানজট একটা কঠিন সমস্যা।"],
          ["For the new teacher, the noisy class proved [[a hard nut to crack]].", "নতুন শিক্ষকের কাছে শোরগোল করা ক্লাসটা কঠিন সমস্যা হয়ে দাঁড়াল।"],
        ],
      },
      {
        idiom: "Let the cat out of the bag",
        meaning: "Reveal a secret",
        meaningBn: "গোপন কথা ফাঁস করা",
        n: 71,
        examples: [
          ["We planned a surprise party, but his sister [[let the cat out of the bag]].", "আমরা সারপ্রাইজ পার্টির পরিকল্পনা করেছিলাম, কিন্তু তার বোন গোপন কথাটা ফাঁস করে দিল।"],
          ["Do not [[let the cat out of the bag]] about the new price list yet.", "নতুন দামের তালিকার গোপন কথাটা এখনো ফাঁস করো না।"],
          ["He [[let the cat out of the bag]] when he mentioned the transfer order.", "বদলির আদেশের কথা বলে সে গোপন কথাটা ফাঁস করে দিল।"],
        ],
      },
      {
        idiom: "A big gun",
        meaning: "An important person",
        meaningBn: "গুরুত্বপূর্ণ ব্যক্তি",
        n: 72,
        examples: [
          ["The minister himself is [[a big gun]] in the party.", "মন্ত্রী নিজেই দলের একজন গুরুত্বপূর্ণ ব্যক্তি।"],
          ["They invited [[a big gun]] of the film world to open the festival.", "তারা উৎসব উদ্বোধনে চলচ্চিত্র জগতের একজন গুরুত্বপূর্ণ ব্যক্তিকে আমন্ত্রণ জানাল।"],
          ["In our office, the cashier is not [[a big gun]], but his work is vital.", "আমাদের অফিসে ক্যাশিয়ার বড় কেউ নন, কিন্তু তার কাজ অত্যন্ত গুরুত্বপূর্ণ।"],
        ],
      },
      {
        idiom: "Kill two birds with one stone",
        meaning: "To achieve two results with one effort",
        meaningBn: "এক চেষ্টায় দুটি ফল পাওয়া",
        n: 73,
        examples: [
          ["By cycling to work, he [[kills two birds with one stone]] — saving money and staying fit.", "সাইকেলে অফিস গিয়ে সে এক চেষ্টায় দুটি ফল পায় — টাকাও বাঁচে, শরীরও ভালো থাকে।"],
          ["The fair [[killed two birds with one stone]]: farmers sold crops and buyers got fair prices.", "মেলাটা এক চেষ্টায় দুটি ফল দিল: কৃষক ফসল বিক্রি করল, ক্রেতা ন্যায্য দাম পেল।"],
          ["Let us [[kill two birds with one stone]] and visit the bank on our way to the market.", "চলো এক চেষ্টায় দুটি কাজ করি — বাজারে যাওয়ার পথে ব্যাংকেও যাই।"],
        ],
      },
    ],
  },
  {
    num: 17,
    titleBn: "স্কুলের ক্রিকেট দল",
    titleEn: "The School Cricket Team",
    storyBn:
      "স্কুলের ক্রিকেট দলের কোচ রফিক স্যার [[took]] অধিনায়ক বাবুলকে [[to task]] — প্র্যাকটিসে দেরি করার জন্য বকা দিলেন। বাবুল অবশ্য ধীরে ধীরে দলে [[gaining ground]] — জনপ্রিয় হয়ে উঠছিল, কারণ সে সবার কথা শোনে। তার সবচেয়ে কাছের মানুষ তার [[a bosom friend]] সাগর — খুব ঘনিষ্ঠ বন্ধু, যে সবসময় পাশে থাকে। একদিন প্র্যাকটিসের সময় বাবুল হঠাৎ [[in a brown study]] হয়ে গেল — ভাবনায় ডুবে গেল, বল আসছে দেখলই না! কোচ রাগ করলেও সাগর তাকে সামলাল। ম্যাচের দিন প্রতিপক্ষ দল তাদের পরিকল্পনা [[turned a deaf ear]] — কোচের পরামর্শ উপেক্ষা করল, আর সেই ভুলেই তারা হারল।",
    storyEn:
      "The school cricket team's coach, Rafiq Sir, [[took]] the captain Babul [[to task]] — he rebuked him for coming late to practice. Babul, however, was slowly [[gaining ground]] in the team — becoming popular, because he listened to everyone. The person closest to him is his [[bosom friend]] Sagar — a very close friend who always stands beside him. One day during practice Babul suddenly fell [[in a brown study]] — he sank into his thoughts and did not even see the ball coming! The coach was angry, but Sagar handled him. On match day, the opposing team [[turned a deaf ear]] to their coach's advice — they ignored it, and because of that very mistake they lost.",
    idioms: [
      {
        idiom: "Take one to task",
        meaning: "Rebuke",
        meaningBn: "তিরস্কার করা / বকা দেওয়া",
        n: 74,
        examples: [
          ["The headmaster [[took]] the peon [[to task]] for his carelessness.", "প্রধান শিক্ষক অবহেলার জন্য পিয়নকে বকা দিলেন।"],
          ["She [[took]] her son [[to task]] for wasting money on games.", "খেলায় টাকা নষ্ট করার জন্য তিনি ছেলেকে বকা দিলেন।"],
          ["The officer was [[taken to task]] for the missing files.", "হারানো ফাইলের জন্য কর্মকর্তাকে তিরস্কার করা হলো।"],
        ],
      },
      {
        idiom: "Gain ground",
        meaning: "Become Popular",
        meaningBn: "জনপ্রিয় হওয়া",
        n: 75,
        examples: [
          ["The new singer is [[gaining ground]] among young listeners.", "নতুন গায়ক তরুণ শ্রোতাদের মধ্যে জনপ্রিয় হচ্ছে।"],
          ["Online classes are [[gaining ground]] in remote villages.", "দূরবর্তী গ্রামে অনলাইন ক্লাস জনপ্রিয় হচ্ছে।"],
          ["Her honest work helped her [[gain ground]] in the office.", "তার সৎ কাজ তাকে অফিসে জনপ্রিয় হতে সাহায্য করল।"],
        ],
      },
      {
        idiom: "A bosom friend",
        meaning: "A very close friend",
        meaningBn: "খুব ঘনিষ্ঠ বন্ধু",
        n: 77,
        examples: [
          ["Karim is my [[bosom friend]]; I share every secret with him.", "করিম আমার খুব ঘনিষ্ঠ বন্ধু; আমি তার সঙ্গে সব গোপন কথা ভাগ করি।"],
          ["A [[bosom friend]] stands by you in every danger.", "খুব ঘনিষ্ঠ বন্ধু সব বিপদে তোমার পাশে থাকে।"],
          ["They have been [[bosom friends]] since childhood.", "তারা শৈশব থেকে খুব ঘনিষ্ঠ বন্ধু।"],
        ],
      },
      {
        idiom: "A brown study",
        meaning: "Dreaming",
        meaningBn: "স্বপ্নে বিভোর থাকা / ভাবনায় ডুবে থাকা",
        n: 78,
        examples: [
          ["He sat by the window [[in a brown study]], forgetting his tea.", "সে জানালার পাশে ভাবনায় ডুবে বসে রইল, চায়ের কথা ভুলে গেল।"],
          ["The poet was lost [[in a brown study]] when the guests arrived.", "অতিথিরা এলে কবি ভাবনায় ডুবে ছিলেন।"],
          ["Do not disturb grandfather when he is [[in a brown study]].", "দাদা ভাবনায় ডুবে থাকলে তাকে বিরক্ত করো না।"],
        ],
      },
      {
        idiom: "Turn a deaf ear",
        meaning: "Disregard / ignore what one says",
        meaningBn: "কারো কথা উপেক্ষা করা",
        n: 79,
        examples: [
          ["The authorities [[turned a deaf ear]] to the villagers' demand for a bridge.", "কর্তৃপক্ষ সেতুর জন্য গ্রামবাসীর দাবি উপেক্ষা করল।"],
          ["She [[turned a deaf ear]] to all the gossip about her.", "সে তার সম্পর্কে সব গুজব উপেক্ষা করল।"],
          ["A good judge never [[turns a deaf ear]] to a poor man's complaint.", "একজন ভালো বিচারক কখনো গরিব মানুষের অভিযোগ উপেক্ষা করেন না।"],
        ],
      },
    ],
  },
  {
    num: 18,
    titleBn: "বাসের ঝাঁকুনি",
    titleEn: "The Jolt of the Bus",
    storyBn:
      "ঢাকা থেকে বাড়ি ফেরার বাসে উঠে হাসান [[a close shave]] পেল — অল্পের জন্য রক্ষা পেল: বাসটা একটা ট্রাকের গা ঘেঁষে বেরিয়ে গেল! সেই ঘটনার পর সে প্রতিজ্ঞা করল, সে [[turn over a new leaf]] — ভালোর দিকে বদলে যাবে, আর কখনো চালককে তাড়া দেবে না। বাড়ি ফিরে সে [[made up his mind]] — সিদ্ধান্ত নিল, এবার সে বাবার দোকানে বসবে। বাবা বললেন, [[in the long run]] — শেষ পর্যন্ত — সততাই সবচেয়ে বড় মূলধন। হাসান পুরনো হিসাবের খাতা ঘেঁটে একটা গোপন কথা [[brought to light]] — প্রকাশ করল: দোকানের এক কর্মচারী বহুদিন ধরে টাকা সরাচ্ছিল।",
    storyEn:
      "On the bus home from Dhaka, Hasan had [[a close shave]] — a narrow escape: the bus brushed past a truck! After that incident he promised he would [[turn over a new leaf]] — change for the better, and never hurry a driver again. Returning home, he [[made up his mind]] — he decided that this time he would sit in his father's shop. Father said, [[in the long run]] — eventually — honesty is the greatest capital. Going through the old account books, Hasan [[brought to light]] a secret — he disclosed that an employee of the shop had been stealing money for a long time.",
    idioms: [
      {
        idiom: "A close shave",
        meaning: "Narrow escape",
        meaningBn: "অল্পের জন্য রক্ষা পাওয়া",
        n: 80,
        examples: [
          ["The cyclist had [[a close shave]] when the bus passed him at speed.", "বাসটা গতিতে পাশ কাটালে সাইকেল আরোহী অল্পের জন্য রক্ষা পেল।"],
          ["It was [[a close shave]]; the tree fell just behind our rickshaw.", "অল্পের জন্য রক্ষা পেলাম; গাছটা আমাদের রিকশার ঠিক পেছনে পড়ল।"],
          ["He escaped the fire by the window — truly [[a close shave]].", "সে জানালা দিয়ে আগুন থেকে বাঁচল — সত্যিই অল্পের জন্য রক্ষা।"],
        ],
      },
      {
        idiom: "Turn over a new leaf",
        meaning: "Change for the better",
        meaningBn: "ভালোর দিকে বদলে যাওয়া",
        n: 81,
        examples: [
          ["After failing once, the student [[turned over a new leaf]] and studied daily.", "একবার ফেল করে শিক্ষার্থীটি ভালোর দিকে বদলে গিয়ে প্রতিদিন পড়তে লাগল।"],
          ["He promised his mother he would [[turn over a new leaf]].", "সে তার মাকে প্রতিশ্রুতি দিল সে ভালোর দিকে বদলে যাবে।"],
          ["The new year is a good time to [[turn over a new leaf]].", "নতুন বছর ভালোর দিকে বদলে যাওয়ার ভালো সময়।"],
        ],
      },
      {
        idiom: "Make up one’s mind",
        meaning: "Decide",
        meaningBn: "সিদ্ধান্ত নেওয়া",
        n: 82,
        examples: [
          ["She has [[made up her mind]] to study nursing.", "সে নার্সিং পড়ার সিদ্ধান্ত নিয়েছে।"],
          ["Please [[make up your mind]] quickly; the train will not wait.", "দয়া করে তাড়াতাড়ি সিদ্ধান্ত নাও; ট্রেন অপেক্ষা করবে না।"],
          ["He could not [[make up his mind]] between the two jobs.", "সে দুটি চাকরির মধ্যে সিদ্ধান্ত নিতে পারছিল না।"],
        ],
      },
      {
        idiom: "In the long run",
        meaning: "Eventually; ultimately",
        meaningBn: "শেষ পর্যন্ত; অবশেষে",
        n: 83,
        examples: [
          ["Hard work always pays [[in the long run]].", "কঠোর পরিশ্রম শেষ পর্যন্ত সবসময় ফল দেয়।"],
          ["Cheap shoes cost more [[in the long run]] because they tear quickly.", "সস্তা জুতা শেষ পর্যন্ত বেশি খরচের, কারণ তা তাড়াতাড়ি ছিঁড়ে যায়।"],
          ["[[In the long run]], truth wins over clever lies.", "শেষ পর্যন্ত, চালাক মিথ্যার ওপর সত্য জয়ী হয়।"],
        ],
      },
      {
        idiom: "Bring to light",
        meaning: "Disclose",
        meaningBn: "প্রকাশ করা",
        n: 84,
        examples: [
          ["The audit [[brought to light]] many errors in the accounts.", "নিরীক্ষায় হিসাবের অনেক ভুল প্রকাশ পেল।"],
          ["Her diary [[brought to light]] the real story of those days.", "তার ডায়েরি সেই দিনগুলোর আসল গল্প প্রকাশ করল।"],
          ["The journalist [[brought to light]] the corruption in the project.", "সাংবাদিক প্রকল্পের দুর্নীতি প্রকাশ করলেন।"],
        ],
      },
    ],
  },
  {
    num: 19,
    titleBn: "পুরনো হিসাব",
    titleEn: "Old Accounts",
    storyBn:
      "দশ বছর আগে দুই বন্ধু মানিক ও জুয়েলের মধ্যে টাকা নিয়ে মনোমালিন্য হয়েছিল। এখন মানিক শহরে বড় ব্যবসায়ী। গ্রামে ফিরে সে জুয়েলের সঙ্গে দেখা করে [[pay off old scores]] করতে চাইল — প্রতিশোধ নিতে চাইল পুরনো অপমানের! কিন্তু জুয়েলের অবস্থা দেখে তার মন গলে গেল: জুয়েল এখন গরিব, অসুস্থ। গ্রামের চেয়ারম্যান বললেন, অফিস হোক বা গ্রাম, [[hard and fast rules]] দিয়ে সব সমস্যা মেটে না — কঠোর নিয়মের বাইরেও মানুষের মন লাগে। [[At the eleventh hour]] — শেষ মুহূর্তে — মানিক প্রতিশোধের বদলে জুয়েলের চিকিৎসার টাকা দিয়ে দিল। গ্রামের এক যুবক মন্তব্য করল, যারা একসময় জুয়েলকে [[with a high hand]] — অত্যাচারমূলকভাবে — অপমান করেছিল, আজ তারা [[cut a sorry figure]] — হাসির পাত্র হলো নিজেদের আচরণে। সবাই বলল, এটাই আসল বড়লোকি।",
    storyEn:
      "Ten years ago, the two friends Manik and Jewel had a falling-out over money. Now Manik is a big businessman in the city. Returning to the village, he met Jewel and wanted to [[pay off old scores]] — to take revenge for the old insult! But seeing Jewel's condition, his heart melted: Jewel is now poor and ill. The village chairman said, whether in an office or a village, not every problem is solved by [[hard and fast rules]] — beyond strict rules, you also need a human heart. [[At the eleventh hour]] — at the last moment — instead of revenge, Manik gave the money for Jewel's treatment. A village youth remarked that those who once insulted Jewel [[with a high hand]] — oppressively — today [[cut a sorry figure]] — they made a poor show of themselves by their own behaviour. Everyone said, this is true greatness.",
    idioms: [
      {
        idiom: "Pay off old scores",
        meaning: "Take revenge",
        meaningBn: "প্রতিশোধ নেওয়া",
        n: 85,
        examples: [
          ["He waited for years to [[pay off old scores]] with his rival.", "সে তার প্রতিদ্বন্দ্বীর ওপর প্রতিশোধ নিতে বছরের পর বছর অপেক্ষা করল।"],
          ["Wise people forgive instead of [[paying off old scores]].", "জ্ঞানী মানুষ প্রতিশোধের বদলে ক্ষমা করে।"],
          ["The team [[paid off old scores]] by defeating their old rivals in the final.", "দলটি ফাইনালে পুরনো প্রতিদ্বন্দ্বীদের হারিয়ে প্রতিশোধ নিল।"],
        ],
      },
      {
        idiom: "Hard and fast rules",
        meaning: "Strict rules",
        meaningBn: "কঠোর নিয়ম",
        n: 86,
        examples: [
          ["There are no [[hard and fast rules]] for raising children; every child is different.", "সন্তান লালনের কোনো কঠোর নিয়ম নেই; প্রতিটি শিশুই আলাদা।"],
          ["The hostel follows [[hard and fast rules]] about visiting hours.", "হোস্টেল সাক্ষাতের সময় নিয়ে কঠোর নিয়ম মেনে চলে।"],
          ["Cooking has few [[hard and fast rules]]; taste decides a lot.", "রান্নায় কঠোর নিয়ম কমই আছে; স্বাদই অনেক কিছু ঠিক করে।"],
        ],
      },
      {
        idiom: "At the eleventh hour",
        meaning: "At the last moment",
        meaningBn: "শেষ মুহূর্তে",
        n: 87,
        examples: [
          ["The agreement was signed [[at the eleventh hour]], just before the deadline.", "সময়সীমার ঠিক আগে, শেষ মুহূর্তে চুক্তিটা সই হলো।"],
          ["He submitted his application [[at the eleventh hour]].", "সে শেষ মুহূর্তে তার আবেদন জমা দিল।"],
          ["Rain stopped [[at the eleventh hour]], and the match could begin.", "শেষ মুহূর্তে বৃষ্টি থামল, আর ম্যাচ শুরু হতে পারল।"],
        ],
      },
      {
        idiom: "To cut a sorry figure",
        meaning: "To make a poor show",
        meaningBn: "খারাপ প্রদর্শনী করা / হাসির পাত্র হওয়া",
        n: 89,
        examples: [
          ["The singer forgot the words and [[cut a sorry figure]] on stage.", "গায়ক কথাগুলো ভুলে গিয়ে মঞ্চে হাসির পাত্র হলো।"],
          ["Without preparation, the debater [[cut a sorry figure]].", "প্রস্তুতি ছাড়া বিতার্কিক খারাপ প্রদর্শনী করল।"],
          ["He [[cut a sorry figure]] in the interview because he knew nothing about the company.", "কোম্পানি সম্পর্কে কিছু না জানায় সে ইন্টারভিউতে হাসির পাত্র হলো।"],
        ],
      },
      {
        idiom: "With a high hand",
        meaning: "Oppressively",
        meaningBn: "অত্যাচারমূলকভাবে",
        n: 90,
        examples: [
          ["The landlord treated the poor tenants [[with a high hand]].", "বাড়িওয়ালা গরিব ভাড়াটিয়াদের সঙ্গে অত্যাচারমূলক আচরণ করলেন।"],
          ["A ruler who governs [[with a high hand]] soon loses the people's love.", "যে শাসক অত্যাচারমূলকভাবে শাসন করেন, তিনি শীঘ্রই মানুষের ভালোবাসা হারান।"],
          ["The manager was removed for dealing with the staff [[with a high hand]].", "কর্মীদের সঙ্গে অত্যাচারমূলক আচরণের জন্য ম্যানেজারকে সরিয়ে দেওয়া হলো।"],
        ],
      },
    ],
  },
  {
    num: 20,
    titleBn: "মামার বাড়ির আম বাগান",
    titleEn: "The Mango Orchard at Uncle's House",
    storyBn:
      "গ্রীষ্মের ছুটিতে রনি মামার বাড়ি গেল। মামা বললেন, আম বাগানে অন্যের গাছে হাত দিও না — [[burn your fingers]] হতে পারে, অন্যের বিষয়ে নাক গলিয়ে বিপদে পড়তে পারো। বাগানে গিয়ে রনি দেখল, গাছে উঠে ছোট মামাতো ভাই টুটুল এমন কাণ্ড করছে যে সবাই [[laughed their heads off]] — প্রাণ খুলে হাসল। দুপুরে খাওয়ার পর দাদু বসে [[chewing the cud]] — পুরনো দিনের কথা গভীরভাবে ভাবছিলেন। রনি বুঝল, এই বাড়িতে সে সবার ছোট বলে তাকে সবসময় [[play second fiddle]] করতে হয় — গুরুত্বহীন ভূমিকা; কিন্তু দাদুর গল্পে সে-ই প্রধান শ্রোতা। দাদু বললেন, জীবনে [[above board]] থাকবে — সৎ ও খোলামেলা — তাহলেই সবাই ভালোবাসবে।",
    storyEn:
      "In the summer holiday Roni went to his uncle's house. Uncle said, do not touch others' trees in the mango orchard — you may [[burn your fingers]], you may get into trouble by interfering in others' affairs. Going to the orchard, Roni saw his little cousin Tutul doing such antics up in the tree that everyone [[laughed their heads off]] — laughed heartily. After lunch, Grandfather sat [[chewing the cud]] — pondering deeply over the old days. Roni understood that in this house, being the youngest, he always has to [[play second fiddle]] — an unimportant part; but in Grandfather's stories, he is the main listener. Grandfather said, in life stay [[above board]] — honest and open — and everyone will love you.",
    idioms: [
      {
        idiom: "Burn one’s fingers",
        meaning: "Get into trouble by interfering in other’s affairs",
        meaningBn: "অন্যের বিষয়ে নাক গলিয়ে বিপদে পড়া",
        n: 91,
        examples: [
          ["He [[burned his fingers]] by lending money to a stranger.", "অপরিচিতকে টাকা ধার দিয়ে সে বিপদে পড়ল।"],
          ["Do not invest in that scheme; many people have [[burned their fingers]].", "ওই প্রকল্পে বিনিয়োগ করো না; অনেক মানুষ বিপদে পড়েছে।"],
          ["She [[burned her fingers]] once in business and is careful now.", "সে একবার ব্যবসায় বিপদে পড়ে এখন সতর্ক।"],
        ],
      },
      {
        idiom: "Laugh one’s head off",
        meaning: "Laugh heartily",
        meaningBn: "প্রাণ খুলে হাসা",
        n: 92,
        examples: [
          ["The clown's tricks made the children [[laugh their heads off]].", "জোকারের কৌশলে শিশুরা প্রাণ খুলে হাসল।"],
          ["We [[laughed our heads off]] at his funny story.", "তার মজার গল্প শুনে আমরা প্রাণ খুলে হাসলাম।"],
          ["She [[laughed her head off]] when the goat entered the classroom.", "ছাগলটা ক্লাসে ঢুকলে সে প্রাণ খুলে হাসল।"],
        ],
      },
      {
        idiom: "Chew the cud",
        meaning: "Ponder over something",
        meaningBn: "কোনো বিষয় নিয়ে গভীরভাবে ভাবা",
        n: 93,
        examples: [
          ["The old farmer sat under the tree, [[chewing the cud]] over the price of paddy.", "বৃদ্ধ কৃষক গাছের নিচে বসে ধানের দাম নিয়ে গভীরভাবে ভাবছিলেন।"],
          ["Give him time to [[chew the cud]] before he answers.", "উত্তর দেওয়ার আগে তাকে গভীরভাবে ভাবার সময় দাও।"],
          ["She [[chewed the cud]] over the proposal all evening.", "সে সারাসন্ধ্যা প্রস্তাবটা নিয়ে গভীরভাবে ভাবল।"],
        ],
      },
      {
        idiom: "Play second fiddle",
        meaning: "Take an unimportant part",
        meaningBn: "গুরুত্বহীন ভূমিকা পালন করা",
        n: 94,
        examples: [
          ["In the band, he is tired of [[playing second fiddle]] to his elder brother.", "ব্যান্ডে বড় ভাইয়ের ছায়ায় গুরুত্বহীন ভূমিকা পালন করে সে ক্লান্ত।"],
          ["She refused to [[play second fiddle]] and started her own shop.", "সে গুরুত্বহীন ভূমিকায় থাকতে অস্বীকার করে নিজের দোকান শুরু করল।"],
          ["A deputy often has to [[play second fiddle]], but his work matters.", "একজন উপ-প্রধানকে প্রায়ই গুরুত্বহীন ভূমিকায় থাকতে হয়, কিন্তু তার কাজ গুরুত্বপূর্ণ।"],
        ],
      },
      {
        idiom: "Above board",
        meaning: "Honest and open",
        meaningBn: "সৎ ও খোলামেলা",
        n: 95,
        examples: [
          ["All our dealings are [[above board]]; we hide nothing from customers.", "আমাদের সব লেনদেন সৎ ও খোলামেলা; আমরা ক্রেতাদের কাছ থেকে কিছু লুকাই না।"],
          ["The election was fair and [[above board]].", "নির্বাচন সুষ্ঠু ও খোলামেলা ছিল।"],
          ["Keep your accounts [[above board]] and nobody can blame you.", "হিসাব সৎ ও খোলামেলা রাখো, কেউ তোমাকে দোষ দিতে পারবে না।"],
        ],
      },
    ],
  },
  {
    num: 21,
    titleBn: "বন্ধুর পরীক্ষা",
    titleEn: "The Test of Friendship",
    storyBn:
      "বিপদে পড়লে বোঝা যায় কে আসল বন্ধু। শফিকের বাবা হাসপাতালে ভর্তি হলে তার বন্ধু আরিফ [[through thick and thin]] পাশে থাকল — সব পরিস্থিতিতে। কিন্তু আরেক বন্ধু বেলাল টাকা ধার দেওয়ার কথা শুনেই [[put a spoke in his wheel]] — পরিকল্পনা নষ্ট করে দিল, বলল তার কাছেও টাকা নেই। হাসপাতালের করিডোরে বসে শফিক দেখল, চারদিকে সবকিছু [[at sixes and sevens]] — এলোমেলো, বিশৃঙ্খল। তখন নার্স আপা এসে তাকে বসতে দিলেন, পানি খাওয়ালেন; সেই ছোট সাহায্যেই শফিক প্রথম [[at home]] অনুভব করল — স্বস্তি পেল। পরে সে বলত, এই ঘটনাটাই তার জীবনের [[alpha and omega]] — শুরু ও শেষ, সবচেয়ে বড় শিক্ষা।",
    storyEn:
      "In danger you learn who a real friend is. When Shafiq's father was admitted to hospital, his friend Arif stood beside him [[through thick and thin]] — under all conditions. But another friend, Belal, hearing about lending money, [[put a spoke in his wheel]] — he upset the plan, saying he had no money either. Sitting in the hospital corridor, Shafiq saw everything around him [[at sixes and sevens]] — disordered and chaotic. Then the nurse came, gave him a seat and water to drink; with that small help Shafiq first felt [[at home]] — comfortable. Later he would say, this incident is the [[alpha and omega]] of his life — the beginning and the end, his greatest lesson.",
    idioms: [
      {
        idiom: "Through thick and thin",
        meaning: "Under all conditions",
        meaningBn: "সব পরিস্থিতিতে",
        n: 96,
        examples: [
          ["True friends stay together [[through thick and thin]].", "আসল বন্ধুরা সব পরিস্থিতিতে একসঙ্গে থাকে।"],
          ["She supported her husband [[through thick and thin]] for forty years.", "তিনি চল্লিশ বছর সব পরিস্থিতিতে স্বামীর পাশে ছিলেন।"],
          ["The old servant remained with the family [[through thick and thin]].", "বৃদ্ধ চাকর সব পরিস্থিতিতে পরিবারের সঙ্গে থেকে গেল।"],
        ],
      },
      {
        idiom: "Put a spoke in one’s wheel",
        meaning: "To upset one’s plans",
        meaningBn: "কারো পরিকল্পনা নষ্ট করা",
        n: 97,
        examples: [
          ["Rain [[put a spoke in our wheel]] on the day of the picnic.", "পিকনিকের দিন বৃষ্টি আমাদের পরিকল্পনা নষ্ট করে দিল।"],
          ["His rivals tried to [[put a spoke in his wheel]] before the election.", "নির্বাচনের আগে তার প্রতিদ্বন্দ্বীরা তার পরিকল্পনা নষ্ট করার চেষ্টা করল।"],
          ["A sudden power cut [[put a spoke in the wheel]] of the evening programme.", "হঠাৎ বিদ্যুৎ চলে যাওয়া সন্ধ্যার অনুষ্ঠানের পরিকল্পনা নষ্ট করে দিল।"],
        ],
      },
      {
        idiom: "At sixes and sevens",
        meaning: "In a disordered/disorganized manner, chaotic",
        meaningBn: "এলোমেলো ও বিশৃঙ্খল অবস্থায়",
        n: 98,
        examples: [
          ["After the storm, the whole village was [[at sixes and sevens]].", "ঝড়ের পর পুরো গ্রাম এলোমেলো হয়ে গেল।"],
          ["His papers lay [[at sixes and sevens]] on the desk.", "তার কাগজপত্র ডেস্কে এলোমেলো পড়ে ছিল।"],
          ["The office was [[at sixes and sevens]] on the day the manager resigned.", "ম্যানেজার পদত্যাগের দিন অফিসটা বিশৃঙ্খল ছিল।"],
        ],
      },
      {
        idiom: "At home",
        meaning: "Comfortable",
        meaningBn: "স্বস্তিতে / আরামে",
        n: 99,
        examples: [
          ["Within a week, the new student felt quite [[at home]] in the hostel.", "এক সপ্তাহের মধ্যে নতুন শিক্ষার্থী হোস্টেলে বেশ স্বস্তি বোধ করল।"],
          ["She is completely [[at home]] with computers.", "সে কম্পিউটার নিয়ে সম্পূর্ণ স্বস্তিতে থাকে।"],
          ["Make yourself [[at home]]; tea is coming.", "নিজেকে স্বস্তিতে রাখো; চা আসছে।"],
        ],
      },
      {
        idiom: "Alpha and omega",
        meaning: "The beginning and the end",
        meaningBn: "শুরু ও শেষ",
        n: 100,
        examples: [
          ["For the poet, his mother was the [[alpha and omega]] of his world.", "কবির কাছে তার মা-ই ছিল তার জগতের শুরু ও শেষ।"],
          ["Honesty should be the [[alpha and omega]] of every business.", "সততাই হওয়া উচিত প্রতিটি ব্যবসার শুরু ও শেষ।"],
          ["This book is the [[alpha and omega]] of our history course.", "এই বইটাই আমাদের ইতিহাস কোর্সের শুরু ও শেষ।"],
        ],
      },
    ],
  },
  {
    num: 22,
    titleBn: "সিদ্ধান্তের আগুন",
    titleEn: "The Fire of Decision",
    storyBn:
      "বিদেশে পড়তে যাওয়ার সুযোগ পেয়ে তানিয়া প্রথমে [[at sea]] ছিল — বিভ্রান্ত ও দিশাহারা। কিন্তু তার ছোট ব্যবসাটা তখন [[by leaps and bounds]] এগোচ্ছিল — দ্রুতগতিতে বাড়ছিল। এক রাতে সে [[burned her boats]] — সিদ্ধান্ত থেকে সরে আসার পথ বন্ধ করে দিল: সে ভিসার আবেদন জমা দিয়েই দিল। বাবা বললেন, সিদ্ধান্ত নেওয়ার পর [[beat about the bush]] করো না — আসল কথা এড়িয়ে যেয়ো না, সরাসরি প্রস্তুতি নাও। তানিয়া জানত, তার বড় ভাই পড়াশোনায় টাকা [[burning candle at both ends]] করেছে — অযথা অপচয়; সে সেই ভুল করবে না। সে প্রতিটি টাকা হিসাব করে রাখল।",
    storyEn:
      "Getting the chance to study abroad, Tania was at first [[at sea]] — confused and lost. But her small business was then growing [[by leaps and bounds]] — rapidly. One night she [[burned her boats]] — she closed the path of going back on her decision: she submitted the visa application. Father said, after deciding, do not [[beat about the bush]] — do not avoid the main point; prepare directly. Tania knew her elder brother had wasted money on his studies like [[burning candle at both ends]] — wasting lavishly; she would not make that mistake. She kept an account of every taka.",
    idioms: [
      {
        idiom: "At sea",
        meaning: "Confused and lost",
        meaningBn: "বিভ্রান্ত ও দিশাহারা",
        n: 101,
        examples: [
          ["After the teacher left, the students were completely [[at sea]] with the new chapter.", "শিক্ষক চলে যাওয়ার পর শিক্ষার্থীরা নতুন অধ্যায় নিয়ে সম্পূর্ণ দিশাহারা হয়ে পড়ল।"],
          ["He felt [[at sea]] in the big city on his first day.", "প্রথম দিনে বড় শহরে সে দিশাহারা বোধ করল।"],
          ["Without instructions, the workers were [[at sea]].", "নির্দেশনা ছাড়া শ্রমিকরা বিভ্রান্ত হয়ে পড়ল।"],
        ],
      },
      {
        idiom: "By leaps and bounds",
        meaning: "Rapidly",
        meaningBn: "দ্রুতগতিতে",
        n: 104,
        examples: [
          ["Her English improved [[by leaps and bounds]] after three months of practice.", "তিন মাসের অনুশীলনে তার ইংরেজি দ্রুতগতিতে উন্নত হলো।"],
          ["The price of land in this area is rising [[by leaps and bounds]].", "এই এলাকায় জমির দাম দ্রুতগতিতে বাড়ছে।"],
          ["The child grew [[by leaps and bounds]] in one year.", "শিশুটি এক বছরে দ্রুতগতিতে বড় হয়ে গেল।"],
        ],
      },
      {
        idiom: "To burn one’s boats",
        meaning: "Go back on a decision",
        meaningBn: "সিদ্ধান্ত থেকে সরে না আসা / পিছু হটার পথ বন্ধ করা",
        n: 105,
        examples: [
          ["He resigned from his job and [[burned his boats]]; now the business must succeed.", "সে চাকরি ছেড়ে পিছু হটার পথ বন্ধ করে দিল; এখন ব্যবসাটা সফল হতেই হবে।"],
          ["By selling his shop, he [[burned his boats]] and moved to the village for good.", "দোকান বিক্রি করে সে ফেরার পথ বন্ধ করে স্থায়ীভাবে গ্রামে চলে গেল।"],
          ["Think carefully before you [[burn your boats]].", "পিছু হটার পথ বন্ধ করার আগে ভালো করে ভাবো।"],
        ],
      },
      {
        idiom: "To beat about the bush",
        meaning: "Talk irrelevantly",
        meaningBn: "অপ্রাসঙ্গিক কথা বলা / আসল কথা এড়িয়ে যাওয়া",
        n: 106,
        examples: [
          ["Stop [[beating about the bush]] and tell me the price directly.", "আসল কথা এড়িয়ে না গিয়ে সরাসরি দামটা বলো।"],
          ["The officer [[beat about the bush]] for ten minutes before giving the news.", "খবরটা দেওয়ার আগে কর্মকর্তা দশ মিনিট অপ্রাসঙ্গিক কথা বললেন।"],
          ["A good witness does not [[beat about the bush]] in court.", "একজন ভালো সাক্ষী আদালতে আসল কথা এড়িয়ে যায় না।"],
        ],
      },
      {
        idiom: "To burn candle at both ends",
        meaning: "To waste lavishly",
        meaningBn: "অযথা অপচয় করা",
        n: 107,
        examples: [
          ["Working day and night without rest is like [[burning the candle at both ends]].", "বিশ্রাম ছাড়া দিনরাত কাজ করা মানে দুই দিক থেকে মোমবাতি জ্বালানো।"],
          ["He spends on parties and gifts, [[burning candle at both ends]].", "সে পার্টি আর উপহারে খরচ করে অযথা অপচয় করে।"],
          ["If you [[burn the candle at both ends]], your health will soon break down.", "দুই দিক থেকে শক্তি খরচ করলে তোমার স্বাস্থ্য শীঘ্রই ভেঙে পড়বে।"],
        ],
      },
    ],
  },
  {
    num: 23,
    titleBn: "মাঠের খেলা, মনের খেলা",
    titleEn: "Games on the Field, Games of the Mind",
    storyBn:
      "আন্তঃস্কুল ক্রিকেট ফাইনালে দুই দলের মধ্যে একটা বল নিয়ে [[a bone of contention]] তৈরি হলো — ঝগড়ার কারণ: আম্পায়ারের সিদ্ধান্ত। এক দলের সমর্থকরা চিৎকার করে পরিস্থিতি [[added fuel to the fire]] — আরও খারাপ করে তুলল। সবার কাছে এই ম্যাচটা ছিল [[an acid test]] — কঠিন পরীক্ষা, কে চাপে মাথা ঠান্ডা রাখতে পারে। আমাদের দলের ব্যাটসম্যান রনি অবশ্য [[at a snail's pace]] রান নিচ্ছিল — খুব ধীরে ধীরে, সবাই অধৈর্য। তবু শেষ ওভারে সে দুটি ছক্কা মেরে ম্যাচ ঘুরিয়ে দিল। পরে কোচ বললেন, রনি আসলে [[building castles in the air]] নয়, পরিকল্পনা করেই খেলেছে — ধীরে শুরু, জোরে শেষ।",
    storyEn:
      "In the inter-school cricket final, one ball became [[a bone of contention]] between the two teams — a source of quarrel: the umpire's decision. Supporters of one team shouted and [[added fuel to the fire]] — they made the situation worse. For everyone, this match was [[an acid test]] — a critical test of who could keep a cool head under pressure. Our team's batsman Roni, however, was taking runs [[at a snail's pace]] — very slowly; everyone grew impatient. Yet in the last over he hit two sixes and turned the match. Later the coach said Roni was not [[building castles in the air]]; he had played with a plan — a slow start, a strong finish.",
    idioms: [
      {
        idiom: "A bone of contention",
        meaning: "A source of quarrel",
        meaningBn: "ঝগড়ার কারণ",
        n: 109,
        examples: [
          ["The boundary wall became [[a bone of contention]] between the two families.", "সীমানা প্রাচীরটা দুই পরিবারের মধ্যে ঝগড়ার কারণ হয়ে উঠল।"],
          ["Money is often [[a bone of contention]] among brothers.", "টাকা প্রায়ই ভাইদের মধ্যে ঝগড়ার কারণ হয়।"],
          ["The old car remained [[a bone of contention]] after their father's death.", "বাবার মৃত্যুর পর পুরনো গাড়িটা ঝগড়ার কারণ হয়ে থাকল।"],
        ],
      },
      {
        idiom: "Add fuel to the fire",
        meaning: "To aggravate the situation",
        meaningBn: "পরিস্থিতি আরও খারাপ করা",
        n: 110,
        examples: [
          ["His rude reply [[added fuel to the fire]], and the argument turned into a fight.", "তার রূঢ় উত্তর পরিস্থিতি আরও খারাপ করল, আর তর্কটা মারামারিতে রূপ নিল।"],
          ["Do not [[add fuel to the fire]] by repeating the insult.", "অপমানটা আবার বলে পরিস্থিতি আরও খারাপ করো না।"],
          ["The false news [[added fuel to the fire]] of public anger.", "মিথ্যা খবর জনরোষের আগুনে ঘি ঢেলে দিল।"],
        ],
      },
      {
        idiom: "An acid test",
        meaning: "A critical test",
        meaningBn: "কঠিন পরীক্ষা",
        n: 111,
        examples: [
          ["The first flood was [[an acid test]] for the new embankment.", "প্রথম বন্যাটা নতুন বাঁধের জন্য ছিল কঠিন পরীক্ষা।"],
          ["A leader faces [[an acid test]] during a crisis.", "সংকটের সময় নেতাকে কঠিন পরীক্ষার মুখোমুখি হতে হয়।"],
          ["This match will be [[an acid test]] of the young goalkeeper.", "এই ম্যাচটা তরুণ গোলরক্ষকের জন্য কঠিন পরীক্ষা হবে।"],
        ],
      },
      {
        idiom: "At a snail’s pace",
        meaning: "Very slowly",
        meaningBn: "খুব ধীরে ধীরে",
        n: 112,
        examples: [
          ["The bus moved [[at a snail's pace]] through the flooded road.", "বাসটা প্লাবিত রাস্তা দিয়ে খুব ধীরে ধীরে চলল।"],
          ["The old computer works [[at a snail's pace]].", "পুরনো কম্পিউটারটা খুব ধীরে ধীরে কাজ করে।"],
          ["The file is moving [[at a snail's pace]] from desk to desk.", "ফাইলটা ডেস্ক থেকে ডেস্কে খুব ধীরে ধীরে যাচ্ছে।"],
        ],
      },
      {
        idiom: "To build castles in the air",
        meaning: "Make imaginary schemes",
        meaningBn: "কাল্পনিক পরিকল্পনা করা",
        n: 114,
        examples: [
          ["Instead of [[building castles in the air]], save a little money every month.", "কাল্পনিক পরিকল্পনা না করে প্রতি মাসে কিছু টাকা জমাও।"],
          ["He spends his time [[building castles in the air]] about becoming rich overnight.", "সে রাতারাতি ধনী হওয়ার কাল্পনিক পরিকল্পনা করে সময় কাটায়।"],
          ["Plans without work are only [[castles in the air]].", "কাজ ছাড়া পরিকল্পনা শুধু আকাশকুসুম কল্পনা।"],
        ],
      },
    ],
  },
  {
    num: 24,
    titleBn: "ছোট সুখের গল্প",
    titleEn: "A Story of Small Happiness",
    storyBn:
      "বৃদ্ধা রহিমা খালা বলেন, আসল সুখ বড় জিনিসে নয়। তার নাতি সাব্বির [[once in a blue moon]] গ্রামে আসে — খুবই কদাচিৎ, তবু এলে পুরো বাড়ি আনন্দে ভরে যায়। খালা রাগ হলে কথা না বলে [[beating around the bush]] করেন না — তিনি সরাসরি বলেন। একবার সাব্বির পরীক্ষায় খারাপ করে [[crying over spilled milk]] করছিল — অতীতের ব্যর্থতা নিয়ে অভিযোগ; খালা বললেন, যা গেছে তা গেছে। সাব্বিরের কাঁধে একটা [[chip on his shoulder]] ছিল — পুরনো একটা অপমানের মনখারাপ সে বয়ে বেড়াত। খালার হাতের পায়েস খেয়ে সে হেসে বলল, খালা, তোমার রান্না তো [[piece of cake]] মনে হয় তোমার কাছে — এত সহজ! খালা বললেন, সহজ মনে হয় কারণ ভালোবাসা দিয়ে করি।",
    storyEn:
      "Old Rahima Khala says real happiness is not in big things. Her grandson Sabbir comes to the village [[once in a blue moon]] — very rarely, yet when he comes, the whole house fills with joy. When Khala is angry she does not speak [[beating around the bush]] — she speaks directly. Once, after doing badly in an exam, Sabbir was [[crying over spilled milk]] — complaining about a past failure; Khala said, what is gone is gone. Sabbir carried a [[chip on his shoulder]] — he bore the hurt of an old insult. Eating Khala's payesh, he laughed and said, Khala, cooking seems like a [[piece of cake]] to you — so easy! Khala said, it seems easy because I do it with love.",
    idioms: [
      {
        idiom: "Once in a blue moon",
        meaning: "Something that happens very rarely",
        meaningBn: "খুবই কদাচিৎ ঘটে এমন কিছু",
        n: 115,
        examples: [
          ["We eat out at a restaurant only [[once in a blue moon]].", "আমরা রেস্তোরাঁয় খাই খুবই কদাচিৎ।"],
          ["He visits his village home [[once in a blue moon]].", "সে তার গ্রামের বাড়িতে যায় খুবই কদাচিৎ।"],
          ["Such a fair price comes [[once in a blue moon]].", "এমন ন্যায্য দাম খুবই কদাচিৎ আসে।"],
        ],
      },
      {
        idiom: "Beating around the bush",
        meaning: "Avoiding the main topic",
        meaningBn: "মূল বিষয় এড়িয়ে যাওয়া",
        n: 116,
        examples: [
          ["Stop [[beating around the bush]] and say what you need.", "মূল বিষয় এড়িয়ে না গিয়ে যা দরকার তা বলো।"],
          ["The manager kept [[beating around the bush]] instead of announcing the decision.", "সিদ্ধান্ত ঘোষণার বদলে ম্যানেজার মূল বিষয় এড়িয়ে যেতে থাকলেন।"],
          ["She hates [[beating around the bush]] in meetings.", "সে সভায় মূল বিষয় এড়িয়ে যাওয়া পছন্দ করে না।"],
        ],
      },
      {
        idiom: "Cry over spilled milk",
        meaning: "Complaining about a loss or failure from the past",
        meaningBn: "অতীতের ক্ষতি বা ব্যর্থতা নিয়ে অভিযোগ করা",
        n: 117,
        examples: [
          ["The match is lost; there is no use [[crying over spilled milk]].", "ম্যাচ হেরে গেছে; অতীতের ব্যর্থতা নিয়ে অভিযোগ করে লাভ নেই।"],
          ["Instead of [[crying over spilled milk]], prepare better for the next exam.", "অতীতের ক্ষতি নিয়ে কান্নাকাটি না করে পরের পরীক্ষার জন্য ভালো প্রস্তুতি নাও।"],
          ["He wasted a year [[crying over spilled milk]] after his business failed.", "ব্যবসা ব্যর্থ হওয়ার পর সে এক বছর অতীতের ব্যর্থতা নিয়ে অভিযোগ করে কাটাল।"],
        ],
      },
      {
        idiom: "Chip on your shoulder",
        meaning: "When someone is upset about something that happened a while ago",
        meaningBn: "অনেক আগের ঘটনা নিয়ে মন খারাপ থাকা",
        n: 118,
        examples: [
          ["He still has a [[chip on his shoulder]] about not being invited last year.", "গত বছর আমন্ত্রণ না পাওয়া নিয়ে তার এখনো মন খারাপ আছে।"],
          ["Do not carry a [[chip on your shoulder]] into a new job.", "পুরনো মন খারাপ নিয়ে নতুন চাকরিতে যেয়ো না।"],
          ["Her [[chip on her shoulder]] about the old insult spoils every family gathering.", "পুরনো অপমান নিয়ে তার মন খারাপ প্রতিটি পারিবারিক আড্ডা নষ্ট করে।"],
        ],
      },
      {
        idiom: "Piece of cake",
        meaning: "Something that is easy to understand or do",
        meaningBn: "সহজে বোঝা বা করা যায় এমন কিছু",
        n: 119,
        examples: [
          ["For an experienced driver, parking here is a [[piece of cake]].", "অভিজ্ঞ চালকের কাছে এখানে গাড়ি রাখা খুব সহজ কাজ।"],
          ["The exam was a [[piece of cake]] for the well-prepared students.", "ভালো প্রস্তুতি নেওয়া শিক্ষার্থীদের কাছে পরীক্ষাটা ছিল খুব সহজ।"],
          ["Fixing this tap is a [[piece of cake]]; I will do it in five minutes.", "এই কলটা ঠিক করা খুব সহজ; আমি পাঁচ মিনিটে করে দেব।"],
        ],
      },
    ],
  },
  {
    num: 25,
    titleBn: "অফিসের শেষ সপ্তাহ",
    titleEn: "The Last Week at the Office",
    storyBn:
      "মি. রহমানের অবসরের দিনে অফিস তাকে [[golden handshake]] দিল — চাকরি ছাড়ার সময় বড় অঙ্কের টাকা। বিদায় অনুষ্ঠানে তিনি হেসে বললেন, তোমরা কেউ আমার গোপন খবরটা [[spill the beans]] করো না — গোপন কথা ফাঁস করো না: আমি আসলে গ্রামে গিয়ে একটা স্কুল খুলব! সবাই অবাক। তরুণ সহকর্মী নাবিল বলল, স্যার, আপনার এই সিদ্ধান্ত প্রথমে আমাকে হতাশ করলেও এখন বুঝি এটা [[blessing in disguise]] — প্রথমে খারাপ মনে হলেও আসলে ভালো। মি. রহমান গম্ভীর হয়ে বললেন, আমি [[mean business]] — গুরুত্বসহকারে বলছি, স্কুলটা আমি খুলবই। [[Come hell or high water]] — যত বাধাই আসুক — স্কুলের কাজ থামবে না।",
    storyEn:
      "On Mr. Rahman's retirement day, the office gave him a [[golden handshake]] — a big sum of money when he left the company. At the farewell programme he smiled and said, none of you [[spill the beans]] about my secret — do not disclose it: I am actually going to open a school in the village! Everyone was surprised. Young colleague Nabil said, Sir, at first your decision disappointed me, but now I understand it is a [[blessing in disguise]] — something good that did not seem so at first. Mr. Rahman said seriously, I [[mean business]] — I am saying this with dedication: I will open that school. [[Come hell or high water]] — whatever obstacles come — the school's work will not stop.",
    idioms: [
      {
        idiom: "Golden handshake",
        meaning: "A big sum of money given to a person when he/she leaves a company or retires",
        meaningBn: "চাকরি ছাড়ার বা অবসরের সময় দেওয়া বড় অঙ্কের টাকা",
        n: 120,
        examples: [
          ["The retiring manager received a [[golden handshake]] of ten lakh taka.", "অবসর নেওয়া ম্যানেজার দশ লাখ টাকার বড় বিদায়ী অর্থ পেলেন।"],
          ["Many senior officers were offered a [[golden handshake]] to leave early.", "অনেক জ্যেষ্ঠ কর্মকর্তাকে আগেভাগে চাকরি ছাড়তে বড় অঙ্কের টাকার প্রস্তাব দেওয়া হলো।"],
          ["A [[golden handshake]] helped him start his village school.", "বিদায়ী বড় অর্থ তাকে গ্রামের স্কুল শুরু করতে সাহায্য করল।"],
        ],
      },
      {
        idiom: "Spill the beans",
        meaning: "To disclose a secret",
        meaningBn: "গোপন কথা ফাঁস করে দেওয়া",
        n: 121,
        examples: [
          ["The little girl [[spilled the beans]] about the surprise gift.", "ছোট্ট মেয়েটি সারপ্রাইজ উপহারের গোপন কথাটা ফাঁস করে দিল।"],
          ["Who [[spilled the beans]] about the new office timing?", "নতুন অফিস সময়ের গোপন কথাটা কে ফাঁস করল?"],
          ["He [[spilled the beans]] by mistake during the interview.", "সে ইন্টারভিউতে ভুল করে গোপন কথাটা ফাঁস করে দিল।"],
        ],
      },
      {
        idiom: "Blessing in disguise",
        meaning: "Something good and useful that did not initially seem that way",
        meaningBn: "প্রথমে খারাপ মনে হলেও আসলে ভালো ও উপকারী কিছু",
        n: 122,
        examples: [
          ["Losing that job was a [[blessing in disguise]]; he found a better one.", "ওই চাকরিটা হারানো ছিল ছদ্মবেশে আশীর্বাদ; সে আরও ভালো একটা পেল।"],
          ["The rain that cancelled our trip was a [[blessing in disguise]] — the road had flooded.", "যে বৃষ্টি আমাদের ভ্রমণ বাতিল করল তা ছিল ছদ্মবেশে আশীর্বাদ — রাস্তা প্লাবিত হয়েছিল।"],
          ["His failure in the exam proved a [[blessing in disguise]]; he changed to a subject he loves.", "পরীক্ষায় তার ব্যর্থতা ছদ্মবেশে আশীর্বাদ হলো; সে তার পছন্দের বিষয়ে বদলে গেল।"],
        ],
      },
      {
        idiom: "Mean business",
        meaning: "Being Serious or Dedicated",
        meaningBn: "গুরুত্বসহকারে ও নিষ্ঠার সঙ্গে কাজ করা",
        n: 123,
        examples: [
          ["When the teacher closes the door and opens the register, she [[means business]].", "শিক্ষক দরজা বন্ধ করে হাজিরা খাতা খুললে বোঝা যায় তিনি গুরুত্বসহকারে কাজ শুরু করেছেন।"],
          ["The new officer [[means business]]; the latecomers were warned on day one.", "নতুন কর্মকর্তা নিষ্ঠাবান; প্রথম দিনেই দেরি করা কর্মীদের সতর্ক করা হলো।"],
          ["Our team [[means business]] this season — practice starts at dawn.", "আমাদের দল এই মৌসুমে গুরুত্বসহকারে নেমেছে — অনুশীলন ভোরে শুরু হয়।"],
        ],
      },
      {
        idiom: "Come hell or high water",
        meaning: "Possible obstacles in your path",
        meaningBn: "যত বাধাই আসুক না কেন",
        n: 124,
        examples: [
          ["[[Come hell or high water]], I will reach the hospital tonight.", "যত বাধাই আসুক, আজ রাতেই আমি হাসপাতালে পৌঁছব।"],
          ["She promised to finish the course, [[come hell or high water]].", "সে প্রতিশ্রুতি দিল, যত বাধাই আসুক, কোর্সটা শেষ করবে।"],
          ["The postman delivers letters [[come hell or high water]].", "যত বাধাই আসুক, ডাকপিয়ন চিঠি পৌঁছে দেন।"],
        ],
      },
    ],
  },
  {
    num: 26,
    titleBn: "নতুন ফ্ল্যাটের গল্প",
    titleEn: "The Story of the New Flat",
    storyBn:
      "তিশা তার ছোট্ট মেয়েকে নিয়ে নতুন ফ্ল্যাটে উঠল। মেয়েটা তার [[apple of her eye]] — অত্যন্ত আদরের। ফ্ল্যাট সাজাতে গিয়ে তিশা [[bit off more than she could chew]] — সামর্থ্যের বাইরে কাজ নিল: একাই সব ঘর রং করতে গেল! পাশের ফ্ল্যাটের আপা সাহায্য করায় কাজটা সহজ হলো; তিশা বলল, এই শহরে চাকরি আর সংসার একসঙ্গে পাওয়া মানে [[the best of both worlds]] — দুটি জগতের সেরা সুবিধা। সন্ধ্যায় সে [[feeling a bit under the weather]] ছিল — কিছুটা অসুস্থ; প্রতিবেশী আপা স্যুপ পাঠিয়ে দিলেন। নতুন বাসায় প্রথম সপ্তাহেই তিশা বুঝল, ভালো প্রতিবেশী পাওয়া হলো [[icing on the cake]] — ভালোকে আরও ভালো করে তোলা।",
    storyEn:
      "Tisha moved into a new flat with her little daughter. The girl is the [[apple of her eye]] — deeply cherished. While decorating the flat, Tisha [[bit off more than she could chew]] — she took on more than she could manage: she tried to paint all the rooms alone! With help from the sister in the next flat, the work became easy; Tisha said, having a job and a family together in this city means [[the best of both worlds]] — the benefits of two different situations at the same time. In the evening she was [[feeling a bit under the weather]] — slightly ill; the neighbouring sister sent soup. In the very first week in the new home, Tisha understood that getting good neighbours is the [[icing on the cake]] — something that turns good into great.",
    idioms: [
      {
        idiom: "Apple of one’s eye",
        meaning: "Being cherished",
        meaningBn: "অত্যন্ত আদরের / প্রিয়",
        n: 125,
        examples: [
          ["The little granddaughter is the [[apple of his eye]].", "ছোট্ট নাতনিটি তার অত্যন্ত আদরের।"],
          ["For the farmer, his only cow is the [[apple of his eye]].", "কৃষকের কাছে তার একমাত্র গাভীটি অত্যন্ত প্রিয়।"],
          ["She is the [[apple of her mother's eye]] and can do no wrong at home.", "সে তার মায়ের অত্যন্ত আদরের, বাড়িতে তার কোনো দোষই ধরা হয় না।"],
        ],
      },
      {
        idiom: "Bite off more than you can chew",
        meaning: "Not able to complete a task due to lack of ability",
        meaningBn: "সামর্থ্যের বাইরে কাজ নেওয়া",
        n: 126,
        examples: [
          ["He took five projects at once and [[bit off more than he could chew]].", "সে একসঙ্গে পাঁচটা প্রকল্প নিয়ে সামর্থ্যের বাইরে কাজ নিল।"],
          ["Do not [[bite off more than you can chew]] in your first month at the job.", "চাকরির প্রথম মাসে সামর্থ্যের বাইরে কাজ নিয়ো না।"],
          ["By promising two weddings in one day, the caterer [[bit off more than he could chew]].", "এক দিনে দুটি বিয়ের প্রতিশ্রুতি দিয়ে ক্যাটারার সামর্থ্যের বাইরে কাজ নিল।"],
        ],
      },
      {
        idiom: "The best of both worlds",
        meaning: "The benefits of widely differing situations, enjoyed at the same time",
        meaningBn: "দুটি ভিন্ন পরিস্থিতির সুবিধা একসঙ্গে পাওয়া",
        n: 127,
        examples: [
          ["Working from home gives him [[the best of both worlds]] — a salary and time with his children.", "বাড়ি থেকে কাজ করে সে দুটি সুবিধা একসঙ্গে পায় — বেতন আর সন্তানদের সঙ্গে সময়।"],
          ["Their house near the city offers [[the best of both worlds]]: village calm and city facilities.", "শহরের কাছের তাদের বাড়ি দুটি সুবিধা একসঙ্গে দেয়: গ্রামের শান্তি আর শহরের সুযোগ।"],
          ["A part-time course lets students enjoy [[the best of both worlds]].", "খণ্ডকালীন কোর্স শিক্ষার্থীদের দুটি সুবিধা একসঙ্গে উপভোগ করতে দেয়।"],
        ],
      },
      {
        idiom: "Feeling a bit under the weather",
        meaning: "Feeling slightly ill",
        meaningBn: "কিছুটা অসুস্থ বোধ করা",
        n: 128,
        examples: [
          ["I am [[feeling a bit under the weather]] today, so I will rest at home.", "আজ আমি কিছুটা অসুস্থ বোধ করছি, তাই বাড়িতে বিশ্রাম নেব।"],
          ["She was [[feeling a bit under the weather]] and left the office early.", "সে কিছুটা অসুস্থ বোধ করায় অফিস থেকে তাড়াতাড়ি চলে গেল।"],
          ["If you are [[feeling under the weather]], drink warm water and take rest.", "কিছুটা অসুস্থ বোধ করলে গরম পানি খাও আর বিশ্রাম নাও।"],
        ],
      },
      {
        idiom: "Icing on the cake",
        meaning: "Something that turns good into great",
        meaningBn: "ভালো জিনিসকে আরও ভালো করে তোলে এমন কিছু",
        n: 129,
        examples: [
          ["The job was good, and the friendly colleagues were the [[icing on the cake]].", "চাকরিটা ভালো ছিল, আর বন্ধুসুলভ সহকর্মীরা ছিল ভালোর ওপর আরও ভালো।"],
          ["Winning the match was great; the trophy was the [[icing on the cake]].", "ম্যাচ জেতা ছিল দারুণ; ট্রফিটা ছিল তার ওপর বাড়তি আনন্দ।"],
          ["For the students, the picnic after the exam was the [[icing on the cake]].", "শিক্ষার্থীদের কাছে পরীক্ষার পরের পিকনিকটা ছিল বাড়তি আনন্দ।"],
        ],
      },
    ],
  },
  {
    num: 27,
    titleBn: "মোবাইল কেনার দিন",
    titleEn: "The Day of Buying a Mobile",
    storyBn:
      "নতুন মোবাইল কিনতে গিয়ে রাহাত দেখল, ভালো ফোনটা [[costs an arm and a leg]] — খুবই ব্যয়বহুল। দোকানি বলল, এখন সবাই এই মডেলটাই কিনছে; রাহাত ভাবল, শুধু সবাই কিনছে বলেই [[jump the bandwagon]] করা ঠিক নয় — জনপ্রিয় ধারায় অন্ধভাবে যোগ দেওয়া। সে বাড়ি ফিরে বাবাকে বলল। বাবা বললেন, এখন [[ball is in your court]] — পরের সিদ্ধান্ত তোমার: পুরনো ফোনটা আরও এক বছর চালাবে, নাকি জমানো টাকা ভাঙবে? রাহাত কয়েকদিন [[in the doldrums]] থাকল — মন খারাপ, হতাশ। শেষে সে ঠিক করল, সে কোনো পক্ষে ঝুঁকবে না — [[sit on the fence]] নয়, বরং সে পুরনো ফোনটা মেরামত করে আরও ছয় মাস চালাবে, তারপর ভালো ফোন কিনবে।",
    storyEn:
      "Going to buy a new mobile, Rahat saw that the good phone [[costs an arm and a leg]] — it is very expensive. The shopkeeper said everyone is buying this model now; Rahat thought, just because everyone is buying it, it is not right to [[jump the bandwagon]] — to join a popular trend blindly. He went home and told his father. Father said, now the [[ball is in your court]] — the next decision is yours: will you use the old phone for another year, or break your savings? For a few days Rahat was [[in the doldrums]] — in low spirits. In the end he decided he would not lean to either side hastily — not [[sit on the fence]], but repair the old phone, use it six more months, and then buy a good phone.",
    idioms: [
      {
        idiom: "Cost an arm and a leg",
        meaning: "Be very expensive",
        meaningBn: "খুবই ব্যয়বহুল হওয়া",
        n: 130,
        examples: [
          ["That flat in Gulshan [[costs an arm and a leg]].", "গুলশানের ওই ফ্ল্যাটটা খুবই ব্যয়বহুল।"],
          ["The wedding dress [[cost her an arm and a leg]].", "বিয়ের পোশাকটা তার কাছে খুবই ব্যয়বহুল পড়ল।"],
          ["Good treatment at that private hospital [[costs an arm and a leg]].", "ওই বেসরকারি হাসপাতালে ভালো চিকিৎসা খুবই ব্যয়বহুল।"],
        ],
      },
      {
        idiom: "Jump the bandwagon",
        meaning: "To join a popular activity or trend",
        meaningBn: "জনপ্রিয় কোনো কাজ বা চলতি ধারায় যোগ দেওয়া",
        n: 131,
        examples: [
          ["Many shops [[jumped the bandwagon]] and started selling online during the lockdown.", "লকডাউনের সময় অনেক দোকান চলতি ধারায় যোগ দিয়ে অনলাইনে বিক্রি শুরু করল।"],
          ["He is not truly interested in cricket; he just [[jumped the bandwagon]] during the World Cup.", "সে আসলে ক্রিকেটে আগ্রহী নয়; বিশ্বকাপের সময় শুধু চলতি ধারায় যোগ দিয়েছিল।"],
          ["Do not [[jump the bandwagon]] without checking the facts.", "তথ্য যাচাই না করে জনপ্রিয় ধারায় যোগ দিয়ো না।"],
        ],
      },
      {
        idiom: "Ball is in your court",
        meaning: "When it is up to you to make the next decision or step",
        meaningBn: "পরের সিদ্ধান্ত বা পদক্ষেপ নেওয়া তোমার ওপর",
        n: 132,
        examples: [
          ["I have sent the proposal; now the [[ball is in your court]].", "আমি প্রস্তাব পাঠিয়ে দিয়েছি; এখন পরের সিদ্ধান্ত তোমার।"],
          ["The company has offered the salary you asked for — the [[ball is in your court]] now.", "কোম্পানি তুমি যে বেতন চেয়েছিলে তা দিয়েছে — এখন সিদ্ধান্ত তোমার।"],
          ["We have apologised; the [[ball is in their court]] to forgive or not.", "আমরা ক্ষমা চেয়েছি; ক্ষমা করবে কিনা তা এখন তাদের সিদ্ধান্ত।"],
        ],
      },
      {
        idiom: "To be in the doldrums",
        meaning: "To be in low spirits",
        meaningBn: "মন খারাপ / হতাশ অবস্থায় থাকা",
        n: 133,
        examples: [
          ["After losing his job, he was [[in the doldrums]] for months.", "চাকরি হারিয়ে সে মাসের পর মাস হতাশায় ছিল।"],
          ["Rainy days put the whole village [[in the doldrums]].", "বৃষ্টির দিনগুলো পুরো গ্রামকে মনখারাপে ফেলে দেয়।"],
          ["A good friend can pull you out of [[the doldrums]].", "একজন ভালো বন্ধু তোমাকে হতাশা থেকে টেনে তুলতে পারে।"],
        ],
      },
      {
        idiom: "To sit on the fence",
        meaning: "To remain neutral",
        meaningBn: "নিরপেক্ষ থাকা",
        n: 134,
        examples: [
          ["In the quarrel between his two sons, the father chose [[to sit on the fence]].", "দুই ছেলের ঝগড়ায় বাবা নিরপেক্ষ থাকার সিদ্ধান্ত নিলেন।"],
          ["A judge cannot [[sit on the fence]]; he must decide by the law.", "বিচারক নিরপেক্ষ থেকে চুপ থাকতে পারেন না; তাকে আইন অনুযায়ী সিদ্ধান্ত দিতেই হয়।"],
          ["She [[sat on the fence]] during the committee's debate.", "কমিটির বিতর্কের সময় সে নিরপেক্ষ থাকল।"],
        ],
      },
    ],
  },
  {
    num: 28,
    titleBn: "প্রথম চাকরির পার্টি",
    titleEn: "The First Job Party",
    storyBn:
      "প্রথম চাকরি পেয়ে নুসরাত অফিসে ছোট একটা খাওয়ার আয়োজন করল। নতুন সহকর্মীদের সঙ্গে প্রথম আলাপে [[break the ice]] করাটা জরুরি ছিল — সামাজিক আলাপ শুরু করা। খাওয়ার সময় গুজব উঠল, বস নাকি বদলি হচ্ছেন; নুসরাত [[heard it on the grapevine]] — গুজব হিসেবেই শুনল, বিশ্বাস করল না। একজন সহকর্মীকে দেখতে খুব সাধারণ মনে হলেও নুসরাত জানে, [[can't judge a book by its cover]] — বাইরের চেহারা দেখে বিচার করা যায় না; সেই সহকর্মীই পরে তাকে সবচেয়ে বেশি সাহায্য করল। অফিসের কাজে দুজনের ভুলে একটা ফাইল নষ্ট হলে বস বললেন, [[it takes two to tango]] — ভুলে দুজনেরই দায় আছে। সেদিন সবাই হাসতে হাসতে একে অপরের গায়ে [[black and blue]] রঙ মাখল — উৎসবের রঙে সবাই রঙিন (আঘাত নয়, রঙের উৎসব!)।",
    storyEn:
      "Getting her first job, Nusrat arranged a small treat at the office. In the first meeting with new colleagues, it was important to [[break the ice]] — to initiate social conversation. During the meal a rumour rose that the boss was being transferred; Nusrat [[heard it on the grapevine]] — she heard it as a rumour and did not believe it. One colleague looked very ordinary, but Nusrat knows you [[can't judge a book by its cover]] — you cannot judge by appearance; that very colleague later helped her the most. When a file was damaged by two people's mistake, the boss said, [[it takes two to tango]] — both are responsible for a mistake. That day, laughing, everyone smeared [[black and blue]] colours on each other — coloured by festival colours (not bruises, a festival of colours!).",
    idioms: [
      {
        idiom: "Break the ice",
        meaning: "To initiate a social conversation or interaction",
        meaningBn: "সামাজিক আলাপ বা পরিচয় শুরু করা",
        n: 135,
        examples: [
          ["At the training, a funny story helped [[break the ice]] among the new teachers.", "প্রশিক্ষণে একটা মজার গল্প নতুন শিক্ষকদের মধ্যে আলাপ শুরু করতে সাহায্য করল।"],
          ["He told a joke to [[break the ice]] at the meeting.", "সভায় আলাপ শুরু করতে সে একটা কৌতুক বলল।"],
          ["Games are a good way to [[break the ice]] on the first day of class.", "ক্লাসের প্রথম দিনে আলাপ শুরু করার ভালো উপায় হলো খেলা।"],
        ],
      },
      {
        idiom: "Hear it on grapevine",
        meaning: "To hear rumors about something or someone",
        meaningBn: "কোনো বিষয় বা কারো সম্পর্কে গুজব শোনা",
        n: 136,
        examples: [
          ["I [[heard it on the grapevine]] that our school will get a new building.", "আমি গুজব শুনেছি আমাদের স্কুল নতুন ভবন পাবে।"],
          ["She [[heard it on the grapevine]] that the manager is leaving.", "সে গুজব শুনেছে ম্যানেজার চলে যাচ্ছেন।"],
          ["Do not treat what you [[hear on the grapevine]] as confirmed news.", "গুজবে যা শোনো তাকে নিশ্চিত খবর মনে করো না।"],
        ],
      },
      {
        idiom: "Can’t judge a book by its cover",
        meaning: "Cannot judge something primarily on appearance",
        meaningBn: "শুধু বাইরের চেহারা দেখে বিচার করা যায় না",
        n: 137,
        examples: [
          ["The old shop looks small, but [[you can't judge a book by its cover]] — its food is the best in town.", "পুরনো দোকানটা ছোট দেখালেও বাইরে দেখে বিচার করা যায় না — এর খাবার শহরের সেরা।"],
          ["He wears simple clothes, yet [[don't judge a book by its cover]]; he is a famous scientist.", "সে সাধারণ পোশাক পরে, তবু বাইরে দেখে বিচার করো না; সে একজন বিখ্যাত বিজ্ঞানী।"],
          ["The quiet boy surprised everyone; truly, [[you can't judge a book by its cover]].", "শান্ত ছেলেটি সবাইকে অবাক করল; সত্যিই, বাইরের চেহারা দেখে বিচার করা যায় না।"],
        ],
      },
      {
        idiom: "It takes two to tango",
        meaning: "Actions or communications need more than one person",
        meaningBn: "কাজ বা যোগাযোগে একজনের বেশি মানুষ লাগে",
        n: 138,
        examples: [
          ["A quarrel is never one-sided; [[it takes two to tango]].", "ঝগড়া কখনো একপক্ষীয় নয়; দুজনেরই ভূমিকা থাকে।"],
          ["For a good conversation, [[it takes two to tango]] — both must listen.", "ভালো আলাপের জন্য দুজনকেই শুনতে হয়।"],
          ["The deal failed because one side stopped cooperating; [[it takes two to tango]].", "এক পক্ষ সহযোগিতা বন্ধ করায় চুক্তি ব্যর্থ হলো; কাজে দুজনেরই লাগে।"],
        ],
      },
      {
        idiom: "Black and blue",
        meaning: "Full of Bruises",
        meaningBn: "কালশিটে ভরা / আঘাতে ভরা",
        n: 140,
        examples: [
          ["He fell off the bicycle and his knees were [[black and blue]].", "সে সাইকেল থেকে পড়ে গেল আর তার হাঁটু কালশিটে ভরে গেল।"],
          ["After the boxing practice, his arms were [[black and blue]].", "বক্সিং অনুশীলনের পর তার হাত কালশিটে ভরা ছিল।"],
          ["The poor donkey was beaten [[black and blue]] by its cruel owner.", "নিষ্ঠুর মালিক গরিব গাধাটাকে মেরে কালশিটে ভরিয়ে দিল।"],
        ],
      },
    ],
  },
  {
    num: 29,
    titleBn: "জয়ের দিন",
    titleEn: "The Day of Victory",
    storyBn:
      "জেলা ফুটবল ফাইনাল জিতে পুরো দল [[on cloud nine]] — খুবই খুশি। অধিনায়ক রাসেল বলল, এই জয়টা সহজে আসেনি; মৌসুমজুড়ে একটার পর একটা সমস্যা এসেছে, আর শেষ ম্যাচের আগের দিন গোলরক্ষকের চোটটা ছিল [[the last straw]] — ধারাবাহিক সমস্যার শেষ আঘাত। তবু দল হাল ছাড়েনি। স্টেডিয়ামের ছাদ থেকে পুরো মাঠের [[a bird's eye view]] পাওয়া যায় — উঁচু থেকে বিস্তৃত দৃশ্য; সেখান থেকে কোচ দেখলেন প্রতিপক্ষের দুর্বলতা। এই ফাইনালটাই ছিল [[a litmus test]] — কোন দল সত্যিকারের শক্তিশালী তা জানার পরীক্ষা। জয়ের পর ভক্তরা [[at the drop of a hat]] মাঠে নেমে এল — সঙ্গে সঙ্গে, এক মুহূর্ত দেরি না করে।",
    storyEn:
      "Winning the district football final, the whole team was [[on cloud nine]] — very happy. Captain Rasel said, this victory did not come easily; all season one problem came after another, and the goalkeeper's injury the day before the final match was [[the last straw]] — the final problem in a series of problems. Yet the team did not give up. From the stadium roof you get [[a bird's eye view]] of the whole field — a view from a very high place; from there the coach saw the opponents' weakness. This final was [[a litmus test]] — a test to know which team is truly strong. After the victory, the fans came down to the field [[at the drop of a hat]] — instantly, without a moment's delay.",
    idioms: [
      {
        idiom: "Be on cloud nine",
        meaning: "Be very happy",
        meaningBn: "খুবই খুশি থাকা",
        n: 141,
        examples: [
          ["After passing the medical exam, she was [[on cloud nine]].", "মেডিকেল পরীক্ষায় পাস করে সে খুবই খুশি ছিল।"],
          ["The children were [[on cloud nine]] when the picnic was announced.", "পিকনিকের ঘোষণা হলে শিশুরা খুবই খুশি হলো।"],
          ["He has been [[on cloud nine]] since his daughter was born.", "মেয়ে জন্মের পর থেকে সে খুবই খুশি।"],
        ],
      },
      {
        idiom: "Last straw",
        meaning: "The final problem in a series of problems",
        meaningBn: "ধারাবাহিক সমস্যার শেষ সমস্যাটি",
        n: 142,
        examples: [
          ["The bus breaking down was [[the last straw]], and he decided to buy a bicycle.", "বাস নষ্ট হওয়াটা ছিল শেষ আঘাত, আর সে সাইকেল কেনার সিদ্ধান্ত নিল।"],
          ["When the roof leaked again, it was [[the last straw]] for the tenants.", "ছাদ আবার চুইয়ে পড়লে তা ভাড়াটিয়াদের জন্য শেষ সমস্যা হয়ে দাঁড়াল।"],
          ["His rude remark was [[the last straw]], and she left the meeting.", "তার রূঢ় মন্তব্যটা ছিল শেষ আঘাত, আর সে সভা ছেড়ে চলে গেল।"],
        ],
      },
      {
        idiom: "A bird’s eye view",
        meaning: "A view from a very high place that allows you to see a very large area",
        meaningBn: "অনেক উঁচু থেকে দেখা বিস্তৃত দৃশ্য",
        n: 143,
        examples: [
          ["From the tower, we got [[a bird's eye view]] of the whole city.", "টাওয়ার থেকে আমরা পুরো শহরের বিস্তৃত দৃশ্য দেখলাম।"],
          ["The map gives [[a bird's eye view]] of the river system.", "মানচিত্রটা নদী ব্যবস্থার উঁচু থেকে দেখা চিত্র দেয়।"],
          ["From the aeroplane window, the fields looked like a green quilt in [[a bird's eye view]].", "বিমানের জানালা থেকে মাঠগুলো উঁচু থেকে দেখা সবুজ কাঁথার মতো লাগছিল।"],
        ],
      },
      {
        idiom: "A litmus Test",
        meaning: "A method that helps to know if something is correct",
        meaningBn: "কোনো কিছু সঠিক কিনা জানার পদ্ধতি",
        n: 144,
        examples: [
          ["The first month of work is [[a litmus test]] for a new employee.", "কাজের প্রথম মাসটা নতুন কর্মীর জন্য একটা যাচাই পরীক্ষা।"],
          ["How a leader acts in a crisis is [[a litmus test]] of character.", "সংকটে নেতা কীভাবে আচরণ করেন তা চরিত্রের যাচাই।"],
          ["Customer reviews are [[a litmus test]] for any new product.", "ক্রেতাদের মতামত যেকোনো নতুন পণ্যের জন্য যাচাই পদ্ধতি।"],
        ],
      },
      {
        idiom: "At the drop of a hat",
        meaning: "Willingness to do something instantly",
        meaningBn: "সঙ্গে সঙ্গে কিছু করতে রাজি হওয়া",
        n: 145,
        examples: [
          ["She is always ready to help [[at the drop of a hat]].", "সে সবসময় সঙ্গে সঙ্গে সাহায্য করতে রাজি।"],
          ["The fire service team leaves [[at the drop of a hat]] when the bell rings.", "ঘণ্টা বাজলেই দমকল দল সঙ্গে সঙ্গে বেরিয়ে পড়ে।"],
          ["He would travel anywhere [[at the drop of a hat]] for a good book fair.", "ভালো বইমেলার জন্য সে সঙ্গে সঙ্গে যেকোনো জায়গায় যেতে রাজি।"],
        ],
      },
    ],
  },
  {
    num: 30,
    titleBn: "ভয় আর ভরসা",
    titleEn: "Fear and Trust",
    storyBn:
      "ছোট্ট রিয়াদ এমন ছেলে যে নিজের ছায়া দেখলেও ভয় পায় — [[afraid of his own shadow]]। তার বাবা একটা ব্যবসার পরিকল্পনা করেছিলেন, কিন্তু সেটা ছিল [[a house of cards]] — দুর্বল পরিকল্পনা, সামান্য ধাক্কাতেই ভেঙে পড়ার মতো। পরিবারটা কিছুদিন [[fool's paradise]]-এ ছিল — সুখের মিথ্যা অনুভূতিতে, ভাবত সব ঠিক আছে। কিন্তু বাজারে মন্দা এলে তারা [[got a raw deal]] — অন্যদের মতো ভালো আচরণ পেল না, ব্যাংক তাদের ঋণ দিল না। তখন পুরনো বন্ধু করিম সাহায্য করতে চাইলে রিয়াদের বড় ভাই তাকে [[gave the cold shoulder]] — উপেক্ষা করল, কারণ সে করিমকে বিশ্বাস করত না। পরে বাবা বললেন, ভুল মানুষকে অবিশ্বাস আর ঠিক মানুষকে উপেক্ষা — দুটোই ক্ষতি করে।",
    storyEn:
      "Little Riyad is a boy who is [[afraid of his own shadow]] — he gets frightened even by his own shadow. His father had made a business plan, but it was [[a house of cards]] — a poor plan, ready to fall at a small push. For some days the family lived in a [[fool's paradise]] — a false sense of happiness, thinking everything was fine. But when the market slowed, they [[got a raw deal]] — they were not treated as well as others; the bank refused them a loan. Then, when old friend Karim wanted to help, Riyad's elder brother [[gave]] him [[the cold shoulder]] — he ignored him, because he did not trust Karim. Later father said, distrusting the wrong person and ignoring the right person — both cause harm.",
    idioms: [
      {
        idiom: "Afraid of one’s own shadow",
        meaning: "To become easily frightened",
        meaningBn: "সহজেই ভয় পাওয়া",
        n: 146,
        examples: [
          ["The little girl is [[afraid of her own shadow]] and sleeps with a light on.", "ছোট্ট মেয়েটি সহজেই ভয় পায় আর আলো জ্বালিয়ে ঘুমায়।"],
          ["After the accident, the driver became [[afraid of his own shadow]].", "দুর্ঘটনার পর চালক সহজেই ভয় পেতে লাগলেন।"],
          ["A brave soldier is never [[afraid of his own shadow]].", "একজন সাহসী সৈনিক কখনো সহজে ভয় পায় না।"],
        ],
      },
      {
        idiom: "A house of cards",
        meaning: "A poor plan",
        meaningBn: "দুর্বল পরিকল্পনা",
        n: 147,
        examples: [
          ["Their business plan was [[a house of cards]] and fell apart in a month.", "তাদের ব্যবসার পরিকল্পনা ছিল দুর্বল, এক মাসেই ভেঙে পড়ল।"],
          ["A promise without money or workers is [[a house of cards]].", "টাকা বা কর্মী ছাড়া প্রতিশ্রুতি দুর্বল পরিকল্পনা মাত্র।"],
          ["The whole scheme stood like [[a house of cards]] on borrowed money.", "পুরো প্রকল্পটা ধার করা টাকার ওপর দুর্বল পরিকল্পনার মতো দাঁড়িয়ে ছিল।"],
        ],
      },
      {
        idiom: "Fool’s paradise",
        meaning: "False sense of happiness",
        meaningBn: "সুখের মিথ্যা অনুভূতি",
        n: 148,
        examples: [
          ["He is living in a [[fool's paradise]] if he thinks the job will come without trying.", "সে যদি ভাবে চেষ্টা ছাড়াই চাকরি আসবে, তবে সে সুখের মিথ্যা অনুভূতিতে আছে।"],
          ["The farmers were in a [[fool's paradise]] until the flood warning came.", "বন্যার সতর্কবার্তা না আসা পর্যন্ত কৃষকেরা মিথ্যা সুখে ছিল।"],
          ["Do not live in a [[fool's paradise]]; check your savings before you resign.", "মিথ্যা সুখে থেকো না; পদত্যাগের আগে জমানো টাকা দেখে নাও।"],
        ],
      },
      {
        idiom: "Get a raw deal",
        meaning: "To not be treated as well as other people",
        meaningBn: "অন্যদের মতো ভালো আচরণ না পাওয়া",
        n: 149,
        examples: [
          ["The night-shift workers feel they [[get a raw deal]] in this factory.", "রাতের শিফটের শ্রমিকরা মনে করে তারা এই কারখানায় অন্যদের মতো ভালো আচরণ পায় না।"],
          ["Small farmers often [[get a raw deal]] from middlemen.", "ছোট কৃষকেরা প্রায়ই মধ্যস্বত্বভোগীদের কাছ থেকে ন্যায্য আচরণ পায় না।"],
          ["She [[got a raw deal]] when her extra work was not counted.", "তার অতিরিক্ত কাজ গোনা না হওয়ায় সে ন্যায্য আচরণ পেল না।"],
        ],
      },
      {
        idiom: "Give cold shoulder",
        meaning: "To ignore",
        meaningBn: "উপেক্ষা করা / পাত্তা না দেওয়া",
        n: 150,
        examples: [
          ["At the reunion, his old classmates [[gave him the cold shoulder]].", "পুনর্মিলনীতে তার পুরনো সহপাঠীরা তাকে উপেক্ষা করল।"],
          ["Do not [[give the cold shoulder]] to a guest, even if you are busy.", "ব্যস্ত থাকলেও অতিথিকে উপেক্ষা করো না।"],
          ["The committee [[gave the cold shoulder]] to the young writer's proposal.", "কমিটি তরুণ লেখকের প্রস্তাব উপেক্ষা করল।"],
        ],
      },
    ],
  },
  {
    num: 31,
    titleBn: "মায়ের হাতের খাবার",
    titleEn: "Food from Mother's Hands",
    storyBn:
      "প্রবাসী জীবনে রাকিবের দিন কাটে [[hand to mouth]] — শুধু মৌলিক প্রয়োজন মিটিয়ে। মেসের খাবার মুখে দিলেই সে [[makes a face]] — মুখের ভঙ্গিতে অপছন্দ দেখায়। একদিন মা ফোনে বললেন, তোমার জন্য পার্সেলে আচার পাঠিয়েছি। খবরটা শুনে রাকিব বলল, মা যেন [[pour oil on troubled waters]] — শান্তি এনে দিলেন মনের অশান্তিতে। রাকিব এখন সব সম্পদ এক জায়গায় রাখে না; মা শিখিয়েছেন, [[don't put all your eggs in one basket]] — সব সম্পদ এক ঝুড়িতে রাখতে নেই। ফোন রাখার আগে মা বললেন, [[to put it in a nutshell]] — সংক্ষেপে বলতে গেলে — ভালো থাকা মানে অল্পে সন্তুষ্ট থাকা।",
    storyEn:
      "In his expatriate life, Rakib's days pass [[hand to mouth]] — living on only basic necessities. As soon as he puts the mess food in his mouth, he [[makes a face]] — showing dislike through his expression. One day Mother said on the phone, I have sent pickles for you in a parcel. Hearing the news, Rakib said, it is as if Mother [[poured oil on troubled waters]] — she brought peace to his troubled mind. Rakib now does not keep all his resources in one place; Mother taught him, [[don't put all your eggs in one basket]] — do not put all your resources in one place. Before ending the call, Mother said, [[to put it in a nutshell]] — in a few words — to live well means to be content with little.",
    idioms: [
      {
        idiom: "Hand to mouth",
        meaning: "Live on only basic necessities",
        meaningBn: "শুধু মৌলিক প্রয়োজন মিটিয়ে বেঁচে থাকা",
        n: 151,
        examples: [
          ["Many day labourers live [[hand to mouth]].", "অনেক দিনমজুর শুধু মৌলিক প্রয়োজন মিটিয়ে বেঁচে থাকে।"],
          ["After losing his job, the family lived [[hand to mouth]] for a year.", "চাকরি হারিয়ে পরিবারটা এক বছর কোনোমতে প্রয়োজন মিটিয়ে চলল।"],
          ["A [[hand to mouth]] life leaves no room for savings.", "শুধু প্রয়োজন মিটিয়ে বাঁচা জীবনে জমানোর সুযোগ থাকে না।"],
        ],
      },
      {
        idiom: "Make a face",
        meaning: "To show dislike or disappointment through facial expressions",
        meaningBn: "মুখের ভঙ্গিতে অপছন্দ বা হতাশা দেখানো",
        n: 152,
        examples: [
          ["The child [[made a face]] when he tasted the bitter medicine.", "তেতো ওষুধ খেয়ে শিশুটি মুখ ভঙ্গি করল।"],
          ["She [[made a face]] at the smell of the drain.", "নর্দমার গন্ধে সে মুখের ভঙ্গিতে অপছন্দ দেখাল।"],
          ["Do not [[make a face]] at your grandmother's cooking; eat politely.", "দাদীর রান্নায় মুখ ভঙ্গি করো না; ভদ্রভাবে খাও।"],
        ],
      },
      {
        idiom: "To pour oil on troubled waters",
        meaning: "To make peace",
        meaningBn: "শান্তি স্থাপন করা",
        n: 154,
        examples: [
          ["The village elder [[poured oil on troubled waters]] between the two families.", "গ্রামের প্রবীণ দুই পরিবারের মধ্যে শান্তি স্থাপন করলেন।"],
          ["Her calm words [[poured oil on troubled waters]] in the angry meeting.", "তার শান্ত কথা রাগী সভায় শান্তি এনে দিল।"],
          ["A good captain knows how [[to pour oil on troubled waters]] in his team.", "একজন ভালো অধিনায়ক জানেন কীভাবে দলে শান্তি স্থাপন করতে হয়।"],
        ],
      },
      {
        idiom: "Don’t put all your eggs in one basket",
        meaning: "Do not put all your resources in one basket (in one place or thing)",
        meaningBn: "সব সম্পদ এক জায়গায় রাখা উচিত নয়",
        n: 155,
        examples: [
          ["He invested in land and a shop — he did not [[put all his eggs in one basket]].", "সে জমি আর দোকানে বিনিয়োগ করল — সব সম্পদ এক জায়গায় রাখল না।"],
          ["Apply to several universities; [[don't put all your eggs in one basket]].", "বেশ কয়েকটি বিশ্ববিদ্যালয়ে আবেদন করো; সব আশা এক জায়গায় রেখো না।"],
          ["Wise farmers grow two crops, because they [[don't put all their eggs in one basket]].", "জ্ঞানী কৃষকেরা দুই ফসল করে, কারণ তারা সব সম্পদ এক জায়গায় রাখে না।"],
        ],
      },
      {
        idiom: "To put in a nutshell",
        meaning: "To say in a few words or to make something concise",
        meaningBn: "কয়েক কথায় বলা / সংক্ষেপ করা",
        n: 156,
        examples: [
          ["[[To put it in a nutshell]], the project failed because of poor planning.", "সংক্ষেপে বলতে গেলে, প্রকল্পটা ব্যর্থ হয়েছে খারাপ পরিকল্পনার জন্য।"],
          ["The teacher [[put the whole lesson in a nutshell]] in the last five minutes.", "শিক্ষক শেষ পাঁচ মিনিটে পুরো পাঠটা সংক্ষেপে বলে দিলেন।"],
          ["His speech [[put the problem in a nutshell]]: no water, no crop.", "তার বক্তব্য সমস্যাটা সংক্ষেপে বলল: পানি নেই, ফসল নেই।"],
        ],
      },
    ],
  },
  {
    num: 32,
    titleBn: "চুক্তির গল্প",
    titleEn: "The Story of a Contract",
    storyBn:
      "দুই ব্যবসায়ীর মধ্যে চুক্তি হয়েছিল, কিন্তু শেষ মুহূর্তে একজন [[backed out]] — প্রতিশ্রুতি থেকে সরে এল। খবরটা শুনে অন্যজন রাগে [[blew up]] — যেন বিস্ফোরিত হলো, চিৎকার করে উঠল। তখন তাদের পুরনো বন্ধু সালাম সাহেব এগিয়ে এসে শান্তভাবে [[backed up]] দিলেন — দুজনকেই সমর্থন করলেন, বললেন, বিষয়টা এখনও মেটানো যায়। আলোচনায় বসল তারা; সালাম সাহেব বললেন, প্রতিটি শর্তই [[bears upon]] the deal — চুক্তির সঙ্গে প্রাসঙ্গিক, কোনোটাই বাদ দেওয়া যাবে না। হঠাৎ বিদ্যুৎ চলে গিয়ে জেনারেটর [[broke down]] — যান্ত্রিক ব্যর্থতা; সভা থেমে গেল। পরদিন আবার বসে তারা চুক্তি শেষ করল।",
    storyEn:
      "There was a contract between two businessmen, but at the last moment one of them [[backed out]] — he withdrew from the promise. Hearing the news, the other man [[blew up]] in anger — as if he exploded, and shouted. Then their old friend Salam Saheb came forward and calmly [[backed up]] both of them — he supported them and said, the matter can still be settled. They sat in discussion; Salam Saheb said, every condition [[bears upon]] the deal — it is relevant to the contract; none can be dropped. Suddenly the electricity went off and the generator [[broke down]] — a mechanical failure; the meeting stopped. The next day they sat again and completed the contract.",
    idioms: [
      {
        idiom: "Back out",
        meaning: "To withdraw from a promise or contract",
        meaningBn: "প্রতিশ্রুতি বা চুক্তি থেকে সরে আসা",
        n: 157,
        examples: [
          ["He promised to sell the land but [[backed out]] at the last moment.", "সে জমি বিক্রির প্রতিশ্রুতি দিয়ে শেষ মুহূর্তে সরে এল।"],
          ["A gentleman never [[backs out]] of his word.", "ভদ্রলোক কখনো নিজের কথা থেকে সরে আসেন না।"],
          ["The sponsor [[backed out]], and the programme was cancelled.", "পৃষ্ঠপোষক সরে আসায় অনুষ্ঠান বাতিল হলো।"],
        ],
      },
      {
        idiom: "Blow up",
        meaning: "To explode",
        meaningBn: "বিস্ফোরিত হওয়া",
        n: 158,
        examples: [
          ["The gas cylinder [[blew up]] and damaged the kitchen.", "গ্যাস সিলিন্ডার বিস্ফোরিত হয়ে রান্নাঘর ক্ষতিগ্রস্ত হলো।"],
          ["When he heard the false accusation, he [[blew up]] in anger.", "মিথ্যা অভিযোগ শুনে সে রাগে ফেটে পড়ল।"],
          ["The old bridge was [[blown up]] to build a new one.", "নতুন সেতু বানাতে পুরনো সেতুটা উড়িয়ে দেওয়া হলো।"],
        ],
      },
      {
        idiom: "Back Up",
        meaning: "To support and sustain",
        meaningBn: "সমর্থন ও সহায়তা করা",
        n: 159,
        examples: [
          ["Her friends [[backed her up]] when she complained to the manager.", "সে ম্যানেজারের কাছে অভিযোগ করলে তার বন্ধুরা তাকে সমর্থন করল।"],
          ["Please [[back up]] your statement with evidence.", "দয়া করে প্রমাণ দিয়ে তোমার বক্তব্য সমর্থন করো।"],
          ["The whole village [[backed up]] the young teacher's new library plan.", "পুরো গ্রাম তরুণ শিক্ষকের নতুন লাইব্রেরি পরিকল্পনা সমর্থন করল।"],
        ],
      },
      {
        idiom: "Back Upon",
        meaning: "To be relevant",
        meaningBn: "প্রাসঙ্গিক হওয়া",
        n: 160,
        examples: [
          ["His long experience [[bears upon]] the success of the project.", "তার দীর্ঘ অভিজ্ঞতা প্রকল্পের সাফল্যের সঙ্গে প্রাসঙ্গিক।"],
          ["What you eat [[bears upon]] your health every day.", "তুমি যা খাও তা প্রতিদিন তোমার স্বাস্থ্যের সঙ্গে প্রাসঙ্গিক।"],
          ["The price of fuel [[bears upon]] the price of everything.", "জ্বালানির দাম সবকিছুর দামের সঙ্গে প্রাসঙ্গিক।"],
        ],
      },
      {
        idiom: "Break Down",
        meaning: "Failure in something",
        meaningBn: "কোনো কিছুর ব্যর্থতা",
        n: 161,
        examples: [
          ["Our car [[broke down]] in the middle of the highway.", "মহাসড়কের মাঝখানে আমাদের গাড়ি নষ্ট হয়ে গেল।"],
          ["The talks [[broke down]] after two days of discussion.", "দুই দিনের আলোচনার পর আলোচনা ভেঙে গেল।"],
          ["She [[broke down]] in tears when she heard the news.", "খবরটা শুনে সে কান্নায় ভেঙে পড়ল।"],
        ],
      },
    ],
  },
  {
    num: 33,
    titleBn: "মেলার মাঠে",
    titleEn: "At the Fairground",
    storyBn:
      "গ্রামের মেলা শেষ হওয়ার মুখে ঘোষক হঠাৎ [[called out]] — চিৎকার করে ডাক দিলেন: শেষ প্রতিযোগিতা শুরু হচ্ছে! আগের দিন বৃষ্টির জন্য মেলার একটা অংশ [[broke off]] — বন্ধ হয়ে গিয়েছিল। আজ ভিড় আবার জমেছে। মেলা শেষে ভিড় [[breaks up]] — ছত্রভঙ্গ হয়ে সবাই বাড়ির পথ ধরল। মেলার মাঠে ছোট্ট রুমি তার মাকে জিজ্ঞেস করল, মা, তুমি আমাকে কীভাবে [[brought up]] — লালন-পালন করলে? মা হেসে বললেন, ভালোবাসা দিয়ে। রুমির প্রশ্নটা মায়ের মনে [[called forth]] অনেক পুরনো স্মৃতি — উস্কে দিল আবেগ। মেলা কমিটির সভাপতি ঘোষণা দিলেন, আগামী বছর মেলা আবার [[break off]] হবে না — পুরো সাত দিন চলবে।",
    storyEn:
      "As the village fair was about to end, the announcer suddenly [[called out]] — he shouted: the last competition is starting! The day before, one part of the fair had [[broken off]] because of rain — it had been discontinued. Today the crowd has gathered again. At the end of the fair, the crowd [[breaks up]] — it disperses and everyone heads home. On the fairground little Rumi asked her mother, Mother, how did you [[bring]] me [[up]] — rear me? Mother smiled and said, with love. Rumi's question [[called forth]] many old memories in the mother — it provoked deep emotion. The fair committee president announced that next year the fair will not [[break off]] — it will run for a full seven days.",
    idioms: [
      {
        idiom: "Break off",
        meaning: "To end or discontinue",
        meaningBn: "শেষ করা বা বন্ধ করা",
        n: 162,
        examples: [
          ["The meeting [[broke off]] without any decision.", "সভাটা কোনো সিদ্ধান্ত ছাড়াই শেষ হয়ে গেল।"],
          ["He [[broke off]] in the middle of his speech when the bell rang.", "ঘণ্টা বাজলে সে বক্তৃতার মাঝখানে থেমে গেল।"],
          ["The two countries [[broke off]] trade relations.", "দুই দেশ বাণিজ্য সম্পর্ক বন্ধ করে দিল।"],
        ],
      },
      {
        idiom: "Break Up",
        meaning: "To disperse / dissolve",
        meaningBn: "ছত্রভঙ্গ হওয়া / ভেঙে যাওয়া",
        n: 163,
        examples: [
          ["The crowd [[broke up]] peacefully after the programme.", "অনুষ্ঠানের পর ভিড় শান্তভাবে ছত্রভঙ্গ হলো।"],
          ["The marriage [[broke up]] after years of quarrels.", "বছরের পর বছর ঝগড়ার পর বিয়েটা ভেঙে গেল।"],
          ["Police [[broke up]] the illegal gathering at midnight.", "পুলিশ মধ্যরাতে অবৈধ জমায়েত ছত্রভঙ্গ করে দিল।"],
        ],
      },
      {
        idiom: "Bring up",
        meaning: "To rear",
        meaningBn: "লালন-পালন করা",
        n: 164,
        examples: [
          ["She [[brought up]] three children alone after her husband died.", "স্বামীর মৃত্যুর পর তিনি একাই তিন সন্তান লালন-পালন করলেন।"],
          ["Grandparents often help [[bring up]] the grandchildren.", "দাদা-দাদি প্রায়ই নাতি-নাতনিদের লালন-পালনে সাহায্য করেন।"],
          ["He was [[brought up]] in a small village by the river.", "সে নদীর ধারের ছোট গ্রামে লালিত-পালিত হয়েছে।"],
        ],
      },
      {
        idiom: "Call forth",
        meaning: "To provoke",
        meaningBn: "উস্কে দেওয়া",
        n: 165,
        examples: [
          ["His insulting words [[called forth]] anger among the listeners.", "তার অপমানজনক কথা শ্রোতাদের মধ্যে রাগ উস্কে দিল।"],
          ["The sad song [[called forth]] tears from the audience.", "দুঃখের গানটা দর্শকদের চোখে পানি এনে দিল।"],
          ["The new tax [[called forth]] protests in many towns.", "নতুন কর অনেক শহরে প্রতিবাদ উস্কে দিল।"],
        ],
      },
      {
        idiom: "Call out",
        meaning: "To shout",
        meaningBn: "চিৎকার করা / ডাক দেওয়া",
        n: 166,
        examples: [
          ["The guard [[called out]] when he saw the thief.", "চোর দেখে প্রহরী চিৎকার করে উঠল।"],
          ["Please [[call out]] the names of the winners one by one.", "দয়া করে বিজয়ীদের নাম একে একে ডাকো।"],
          ["She [[called out]] to her brother across the field.", "সে মাঠের ওপার থেকে ভাইকে ডাক দিল।"],
        ],
      },
    ],
  },
  {
    num: 34,
    titleBn: "চিঠি আর টেলিফোন",
    titleEn: "Letters and Telephones",
    storyBn:
      "ডাকঘরের পুরনো পিয়ন জলিল সাহেব প্রতিদিন সকালে গ্রামে চিঠি বিলি করেন। একদিন স্কুলের প্রধান শিক্ষক তাকে [[called upon]] — আদেশ করলেন যেন পরীক্ষার খাতাগুলো সাবধানে পৌঁছে দেওয়া হয়। জলিল সাহেব তার কাজ [[carried on]] — চালিয়ে গেলেন বৃষ্টির মধ্যেও। নদীর ঘাটে একটা পুরনো নৌকা [[cast away]] অবস্থায় পড়ে ছিল — একপাশে ফেলে রাখা। ঘাটের ছেলেরা বলল, নৌকাটা মেরামত করলে সবাই [[catch up with]] the town — শহরের সঙ্গে তাল মিলিয়ে চলতে পারবে, মানে পেছন থেকে ধরে ফেলতে পারবে। বছর শেষে গ্রামে একটা বড় অনুষ্ঠান [[came off]] — অনুষ্ঠিত হলো, যেখানে জলিল সাহেবকে সম্মাননা দেওয়া হলো।",
    storyEn:
      "Old postman Jalil Saheb delivers letters in the village every morning. One day the headmaster of the school [[called upon]] him — ordered him to deliver the exam scripts carefully. Jalil Saheb [[carried on]] his work — he continued even in the rain. At the river ghat, an old boat lay [[cast away]] — thrown aside. The boys at the ghat said, if the boat is repaired, everyone can [[catch up with]] the town — overtake it, keep pace with it. At the end of the year, a big programme [[came off]] in the village — it took place, where Jalil Saheb was honoured.",
    idioms: [
      {
        idiom: "Call upon",
        meaning: "To order",
        meaningBn: "আদেশ করা",
        n: 167,
        examples: [
          ["The officer [[called upon]] the soldiers to guard the bridge.", "কর্মকর্তা সৈনিকদের সেতু পাহারা দিতে আদেশ করলেন।"],
          ["The chairman [[called upon]] the members to speak one by one.", "সভাপতি সদস্যদের একে একে বলতে আদেশ করলেন।"],
          ["He was [[called upon]] to explain the missing money.", "হারানো টাকার ব্যাখ্যা দিতে তাকে আদেশ করা হলো।"],
        ],
      },
      {
        idiom: "Carry on",
        meaning: "To continue",
        meaningBn: "চালিয়ে যাওয়া",
        n: 168,
        examples: [
          ["Despite the rain, the farmers [[carried on]] harvesting.", "বৃষ্টি সত্ত্বেও কৃষকেরা ফসল কাটা চালিয়ে গেলেন।"],
          ["Please [[carry on]] with your story; we are listening.", "দয়া করে তোমার গল্প চালিয়ে যাও; আমরা শুনছি।"],
          ["She [[carried on]] her father's business after his death.", "বাবার মৃত্যুর পর সে তার ব্যবসা চালিয়ে গেল।"],
        ],
      },
      {
        idiom: "Cast away",
        meaning: "To throw aside",
        meaningBn: "ফেলে দেওয়া / একপাশে সরিয়ে দেওয়া",
        n: 169,
        examples: [
          ["Do not [[cast away]] old books; donate them to the library.", "পুরনো বই ফেলে দিয়ো না; লাইব্রেরিতে দান করো।"],
          ["The broken chair was [[cast away]] behind the house.", "ভাঙা চেয়ারটা বাড়ির পেছনে ফেলে রাখা হয়েছিল।"],
          ["He [[cast away]] his bad habits and started a new life.", "সে তার খারাপ অভ্যাস ফেলে দিয়ে নতুন জীবন শুরু করল।"],
        ],
      },
      {
        idiom: "Catch up with",
        meaning: "To overtake",
        meaningBn: "পেছন থেকে ধরে ফেলা / সমান হয়ে যাওয়া",
        n: 170,
        examples: [
          ["Run fast and you will [[catch up with]] the others.", "জোরে দৌড়াও, তাহলে অন্যদের ধরে ফেলতে পারবে।"],
          ["After his illness, the student worked hard to [[catch up with]] the class.", "অসুখের পর শিক্ষার্থীটি ক্লাসের সঙ্গে সমান হতে কঠোর পরিশ্রম করল।"],
          ["The police car finally [[caught up with]] the stolen truck.", "পুলিশের গাড়ি অবশেষে চুরি যাওয়া ট্রাকটাকে ধরে ফেলল।"],
        ],
      },
      {
        idiom: "Come off",
        meaning: "To take place",
        meaningBn: "ঘটে যাওয়া / অনুষ্ঠিত হওয়া",
        n: 171,
        examples: [
          ["The wedding [[came off]] beautifully despite the rain.", "বৃষ্টি সত্ত্বেও বিয়েটা সুন্দরভাবে অনুষ্ঠিত হলো।"],
          ["The school sports will [[come off]] next Friday.", "স্কুলের খেলা আগামী শুক্রবার অনুষ্ঠিত হবে।"],
          ["His plan to visit the village did not [[come off]] this year.", "এই বছর তার গ্রামে যাওয়ার পরিকল্পনা ঘটে উঠল না।"],
        ],
      },
    ],
  },
  {
    num: 35,
    titleBn: "বাজারের দিন",
    titleEn: "A Day at the Market",
    storyBn:
      "হাটের দিনে বাজারে গিয়ে বৃদ্ধ কাসেম চাচা দেখলেন, কয়েকজন বিক্রেতা তার পরিচিত দোকানির নামে [[crying down]] করছে — তাকে হেয় করছে, যাতে ক্রেতা কমে যায়। কাসেম চাচা এ অন্যায়ের বিরুদ্ধে [[cried out against]] — জোরে অভিযোগ করলেন। বাজার কমিটির সভাপতি বললেন, এই দোকানি আসলে এই কাজের জন্যই [[cut out]] — সে সৎ ব্যবসার জন্যই তৈরি। দুপুরে কাসেম চাচার বাড়িতে তার নাতি [[dropped in]] — অনানুষ্ঠানিকভাবে দেখা করতে এল। নাতি বলল, সে শহরের স্কুলে ভর্তি হয়েছিল কিন্তু পড়া [[dropped out]] — বাদ পড়ে গেছে মাঝপথে, কারণ টাকার অভাব। কাসেম চাচা বললেন, চিন্তা করো না, আমরা সবাই মিলে তোমাকে আবার স্কুলে পাঠাব।",
    storyEn:
      "Going to the market on haat day, old Kasem uncle saw that some sellers were [[crying down]] his familiar shopkeeper — making little of him, so that his customers decrease. Kasem uncle [[cried out against]] this injustice — he complained loudly against it. The market committee president said, this shopkeeper is truly [[cut out]] for this work — he is made for honest business. At noon, Kasem uncle's grandson [[dropped in]] at his house — he visited casually. The grandson said he had been admitted to a town school but had [[dropped out]] — he had fallen out midway, because of lack of money. Kasem uncle said, do not worry; together we will all send you back to school.",
    idioms: [
      {
        idiom: "Cry Down",
        meaning: "To make little of",
        meaningBn: "তুচ্ছ করা / হেয় করা",
        n: 172,
        examples: [
          ["Rival sellers tried to [[cry down]] his goods, but customers trusted him.", "প্রতিদ্বন্দ্বী বিক্রেতারা তার মাল হেয় করার চেষ্টা করল, কিন্তু ক্রেতারা তাকেই বিশ্বাস করল।"],
          ["Do not [[cry down]] a beginner's honest effort.", "একজন নবীনের সৎ চেষ্টাকে হেয় করো না।"],
          ["The critics [[cried down]] the young poet's first book.", "সমালোচকেরা তরুণ কবির প্রথম বইটাকে হেয় করলেন।"],
        ],
      },
      {
        idiom: "Cry out against",
        meaning: "To complain loudly against",
        meaningBn: "জোরে অভিযোগ করা",
        n: 174,
        examples: [
          ["The villagers [[cried out against]] the cutting of the old trees.", "গ্রামবাসী পুরনো গাছ কাটার বিরুদ্ধে জোরে অভিযোগ করল।"],
          ["Students [[cried out against]] the sudden fee increase.", "শিক্ষার্থীরা হঠাৎ ফি বাড়ার বিরুদ্ধে জোরে অভিযোগ করল।"],
          ["She [[cried out against]] the unfair decision of the committee.", "সে কমিটির অন্যায় সিদ্ধান্তের বিরুদ্ধে জোরে অভিযোগ করল।"],
        ],
      },
      {
        idiom: "Cut out",
        meaning: "Designed for",
        meaningBn: "তৈরি / উপযুক্ত",
        n: 175,
        examples: [
          ["He is [[cut out]] to be a teacher; children love his classes.", "সে শিক্ষক হওয়ার জন্যই তৈরি; শিশুরা তার ক্লাস ভালোবাসে।"],
          ["Not everyone is [[cut out]] for army life.", "সবাই সেনাবাহিনীর জীবনের জন্য উপযুক্ত নয়।"],
          ["She is [[cut out]] for leadership — calm, honest and brave.", "সে নেতৃত্বের জন্য তৈরি — শান্ত, সৎ ও সাহসী।"],
        ],
      },
      {
        idiom: "Drop in",
        meaning: "To Visit Casually",
        meaningBn: "অনানুষ্ঠানিকভাবে দেখা করতে যাওয়া",
        n: 176,
        examples: [
          ["My uncle [[dropped in]] for tea on his way home.", "বাড়ি ফেরার পথে আমার চাচা চা খেতে অনানুষ্ঠানিকভাবে এলেন।"],
          ["Please [[drop in]] whenever you pass this way.", "এদিক দিয়ে গেলে যেকোনো সময় দেখা করে যেয়ো।"],
          ["An old friend [[dropped in]] unexpectedly last evening.", "গত সন্ধ্যায় একজন পুরনো বন্ধু অপ্রত্যাশিতভাবে দেখা করতে এল।"],
        ],
      },
      {
        idiom: "Drop out",
        meaning: "To fall",
        meaningBn: "পড়ে যাওয়া / বাদ পড়া",
        n: 177,
        examples: [
          ["Many poor students [[drop out]] of school to work.", "অনেক গরিব শিক্ষার্থী কাজ করতে গিয়ে স্কুল থেকে বাদ পড়ে।"],
          ["One runner [[dropped out]] of the race with an injury.", "একজন দৌড়বিদ আঘাত নিয়ে প্রতিযোগিতা থেকে বাদ পড়ল।"],
          ["He [[dropped out]] of the training course after two weeks.", "সে দুই সপ্তাহ পর প্রশিক্ষণ কোর্স থেকে বাদ পড়ল।"],
        ],
      },
    ],
  },
  {
    num: 36,
    titleBn: "পাহাড়ে ওঠা নামা",
    titleEn: "Up and Down the Hill",
    storyBn:
      "পাহাড়ি এলাকায় বেড়াতে গিয়ে সাজিদদের দল পথ হারাল। গাইড বললেন, বৃষ্টি এলে আমাদের [[fall back]] করতে হবে — পিছিয়ে যেতে হবে নিরাপদ জায়গায়। সরু পথে হাঁটতে গিয়ে ছোট্ট আরিফ [[fell down]] — উঁচু জায়গা থেকে নিচে পড়ে গেল, তবে বড় আঘাত লাগেনি। পাহাড়ের ধারে কিছু পাথর [[fell off]] — ঝরে পড়ল নিচে। গাইড বললেন, এই এলাকাটা সংরক্ষিত বনের [[falls under]] — অধীনে আসে, তাই এখানে আগুন জ্বালানো যাবে না। সন্ধ্যায় তারা নিরাপদে নিচে নামল। সাজিদ বলল, পাহাড়ে ঘোরা মানে শুধু ওঠা নয় — [[get along]] করতে হয় প্রকৃতির সঙ্গে, মানে এগিয়ে যেতে হয় তার নিয়ম মেনে।",
    storyEn:
      "Travelling in the hill area, Sajid's group lost their way. The guide said, if rain comes we must [[fall back]] — retreat to a safe place. Walking on the narrow path, little Arif [[fell down]] — he fell from a higher place to a lower one, though he was not badly hurt. Some stones at the hill's edge [[fell off]] — they dropped off below. The guide said, this area [[falls under]] the reserved forest — it comes under it, so no fire can be lit here. In the evening they came down safely. Sajid said, travelling in the hills does not mean only climbing — you must [[get along]] with nature, that is, proceed following her rules.",
    idioms: [
      {
        idiom: "Fall back",
        meaning: "To Recede; To Retreat",
        meaningBn: "পিছিয়ে যাওয়া; পলায়ন করা",
        n: 178,
        examples: [
          ["The soldiers were ordered to [[fall back]] to the river line.", "সৈনিকদের নদীর ধারে পিছিয়ে যেতে আদেশ দেওয়া হলো।"],
          ["When the flood rose, the villagers [[fell back]] to the school building.", "বন্যা বাড়লে গ্রামবাসী স্কুল ভবনে পিছিয়ে গেল।"],
          ["Prices [[fell back]] slightly after the Eid rush.", "ঈদের ভিড়ের পর দাম কিছুটা পিছিয়ে এল।"],
        ],
      },
      {
        idiom: "Fall down",
        meaning: "From a higher position to a lower one",
        meaningBn: "উঁচু জায়গা থেকে নিচু জায়গায় নামা",
        n: 179,
        examples: [
          ["The old wall [[fell down]] in the storm.", "ঝড়ে পুরনো দেয়ালটা পড়ে গেল।"],
          ["The child [[fell down]] from the stairs and hurt his knee.", "শিশুটি সিঁড়ি থেকে পড়ে গিয়ে হাঁটুতে আঘাত পেল।"],
          ["Leaves [[fall down]] from the trees in autumn.", "শরতে গাছ থেকে পাতা ঝরে পড়ে।"],
        ],
      },
      {
        idiom: "Fall off",
        meaning: "To Withdraw; To Drop Off",
        meaningBn: "সরে যাওয়া; ঝরে পড়া",
        n: 180,
        examples: [
          ["A button has [[fallen off]] my shirt.", "আমার শার্ট থেকে একটা বোতাম ঝরে পড়েছে।"],
          ["Attendance [[fell off]] during the harvest season.", "ফসল কাটার মৌসুমে উপস্থিতি কমে গেল।"],
          ["The paint is [[falling off]] the old door.", "পুরনো দরজা থেকে রঙ ঝরে পড়ছে।"],
        ],
      },
      {
        idiom: "Fall under",
        meaning: "To come under",
        meaningBn: "অধীনে আসা",
        n: 181,
        examples: [
          ["This village [[falls under]] the new union council.", "এই গ্রামটা নতুন ইউনিয়ন পরিষদের অধীনে আসে।"],
          ["Imported medicines [[fall under]] strict checking.", "আমদানি করা ওষুধ কঠোর যাচাইয়ের অধীনে আসে।"],
          ["His case [[falls under]] the labour law.", "তার মামলা শ্রম আইনের অধীনে আসে।"],
        ],
      },
      {
        idiom: "Get along",
        meaning: "To Prosper; To Progress; To Proceed",
        meaningBn: "উন্নতি করা; এগিয়ে যাওয়া",
        n: 182,
        examples: [
          ["How is your son [[getting along]] at his new school?", "তোমার ছেলে নতুন স্কুলে কেমন এগোচ্ছে?"],
          ["The small shop is [[getting along]] well this year.", "ছোট দোকানটা এই বছর ভালোই এগোচ্ছে।"],
          ["We must [[get along]] with the work before the guests arrive.", "অতিথি আসার আগে আমাদের কাজটা এগিয়ে নিতে হবে।"],
        ],
      },
    ],
  },
  {
    num: 37,
    titleBn: "প্রতিবেশীর সঙ্গে মিল",
    titleEn: "Getting Along with the Neighbour",
    storyBn:
      "নতুন বাড়িতে উঠে হাবিব সাহেবের পরিবার পাশের বাড়ির লোকজনের সঙ্গে [[get on with]] শিখল — মিলেমিশে থাকা। পাশের বাড়ির ছেলে রবিন একদিন খেলতে গিয়ে ঝামেলায় [[got into]] — জড়িয়ে পড়ল বড়দের তর্কে। রবিনের মা বললেন, বড়দের বিষয়ে জড়ানো ঠিক নয়। সন্ধ্যায় দুই পরিবারের মধ্যে পুরনো একটা ভুল বোঝাবুঝি ছিল; হাবিব সাহেব প্রথমে [[gave in]] — মেনে নিলেন নিজের ভুল, ক্ষমা চাইলেন। প্রতিবেশী চাচা হেসে বললেন, পুরনো কথা [[give over]] করো — আর ওই কথা তুলো না। সেই থেকে দুই পরিবার একসঙ্গে চা খায়, আর হাবিব সাহেবের ছেলে প্রতিদিন সকালে [[goes after]] তার স্বপ্ন — সে ডাক্তার হওয়ার লক্ষ্যের পিছু ছুটছে, প্রতিবেশীদের শুভকামনা নিয়ে।",
    storyEn:
      "After moving into the new house, Habib Saheb's family learned to [[get on with]] the people next door — to live pleasantly together. One day the next-door boy Robin, while playing, [[got into]] trouble — he became involved in the elders' argument. Robin's mother said, it is not right to get involved in elders' matters. In the evening there was an old misunderstanding between the two families; Habib Saheb first [[gave in]] — he yielded, admitted his mistake and apologised. The neighbouring uncle smiled and said, [[give over]] the old matter — do not raise it any longer. Since then the two families drink tea together, and Habib Saheb's son [[goes after]] his dream every morning — he pursues his goal of becoming a doctor, with the neighbours' good wishes.",
    idioms: [
      {
        idiom: "Get on with",
        meaning: "To Live Pleasantly Together; To Progress",
        meaningBn: "মিলেমিশে থাকা; উন্নতি করা",
        n: 183,
        examples: [
          ["She [[gets on with]] everyone in the office.", "সে অফিসের সবার সঙ্গে মিলেমিশে থাকে।"],
          ["How are you [[getting on with]] your English course?", "তোমার ইংরেজি কোর্স কেমন এগোচ্ছে?"],
          ["The two brothers [[get on with]] each other very well.", "দুই ভাই একে অপরের সঙ্গে খুব ভালো মিলেমিশে থাকে।"],
        ],
      },
      {
        idiom: "Get into",
        meaning: "To be involved in",
        meaningBn: "জড়িয়ে পড়া",
        n: 184,
        examples: [
          ["He [[got into]] trouble for speaking against the manager.", "ম্যানেজারের বিরুদ্ধে কথা বলে সে ঝামেলায় জড়িয়ে পড়ল।"],
          ["Do not [[get into]] a fight that is not yours.", "যে মারামারি তোমার নয়, তাতে জড়িয়ো না।"],
          ["She [[got into]] the habit of reading before sleep.", "সে ঘুমের আগে পড়ার অভ্যাসে জড়িয়ে পড়ল (অভ্যস্ত হলো)।"],
        ],
      },
      {
        idiom: "Give in",
        meaning: "To Surrender; To Yield",
        meaningBn: "আত্মসমর্পণ করা; মেনে নেওয়া",
        n: 185,
        examples: [
          ["After a long argument, the shopkeeper [[gave in]] and lowered the price.", "দীর্ঘ তর্কের পর দোকানি মেনে নিয়ে দাম কমাল।"],
          ["The soldiers refused to [[give in]] even when surrounded.", "ঘেরাও হয়েও সৈনিকেরা আত্মসমর্পণ করতে অস্বীকার করল।"],
          ["Mother finally [[gave in]] and allowed the picnic.", "মা অবশেষে মেনে নিয়ে পিকনিকের অনুমতি দিলেন।"],
        ],
      },
      {
        idiom: "Give over",
        meaning: "Not to do any longer",
        meaningBn: "আর না করা",
        n: 186,
        examples: [
          ["[[Give over]] complaining and start working.", "অভিযোগ করা বন্ধ করে কাজ শুরু করো।"],
          ["He has [[given over]] smoking after his illness.", "অসুখের পর সে ধূমপান ছেড়ে দিয়েছে।"],
          ["Please [[give over]] making that noise.", "দয়া করে ওই শব্দ করা বন্ধ করো।"],
        ],
      },
      {
        idiom: "Go after",
        meaning: "To Follow; To Pursue",
        meaningBn: "অনুসরণ করা; পিছু নেওয়া",
        n: 187,
        examples: [
          ["The dog [[went after]] the thief across the field.", "কুকুরটা মাঠজুড়ে চোরের পিছু নিল।"],
          ["She is [[going after]] her dream of becoming a doctor.", "সে ডাক্তার হওয়ার স্বপ্নের পিছু ছুটছে।"],
          ["The police [[went after]] the stolen car at once.", "পুলিশ সঙ্গে সঙ্গে চুরি যাওয়া গাড়ির পিছু নিল।"],
        ],
      },
    ],
  },
  {
    num: 38,
    titleBn: "নদীর ঘাটে সন্ধ্যা",
    titleEn: "Evening at the River Ghat",
    storyBn:
      "নদীর ঘাটে সন্ধ্যায় জেলেরা জাল গুছিয়ে রাখছিল। নতুন নিয়ম অনুযায়ী ছোট মাছ ধরা যাবে না — এই প্রস্তাবটা প্রথমে অনেকের কাছেই [[did not go down]] — গৃহীত হলো না। বৃদ্ধ জেলে করিম বললেন, নদী শুকিয়ে গেলে আমাদের [[go without]] চলতে হবে — মাছ ছাড়াই থাকতে হবে; তাই নিয়ম মানাই ভালো। তার কথা সবাই [[went by]] — অনুসরণ করল। ঘাটের ধারে কয়েকজন অলস যুবক [[hanging about]] ছিল — আশেপাশে ঘোরাঘুরি করছিল; করিম তাদের কাজে ডাকলেন। যুবকেরা বুঝল, তাদের পরিবার তাদের ওপর [[hang upon]] — নির্ভর করে; অলস বসে থাকা চলে না।",
    storyEn:
      "In the evening at the river ghat, the fishermen were packing their nets. According to the new rule, small fish cannot be caught — at first this proposal [[did not go down]] with many — it was not accepted. Old fisherman Karim said, if the river dries up we will have to [[go without]] — remain without fish; so it is better to obey the rule. Everyone [[went by]] his words — they followed them. At the edge of the ghat, some idle youths were [[hanging about]] — loitering near the place; Karim called them to work. The youths understood that their families [[hang upon]] them — depend on them; sitting idle will not do.",
    idioms: [
      {
        idiom: "Go Down",
        meaning: "To be accepted",
        meaningBn: "গৃহীত হওয়া / মেনে নেওয়া",
        n: 188,
        examples: [
          ["The new tax did not [[go down]] well with the traders.", "নতুন কর ব্যবসায়ীদের কাছে ভালোভাবে গৃহীত হলো না।"],
          ["His speech [[went down]] well with the young audience.", "তার বক্তব্য তরুণ শ্রোতাদের কাছে ভালোভাবে গৃহীত হলো।"],
          ["The price rise will not [[go down]] with ordinary people.", "দাম বাড়া সাধারণ মানুষের কাছে গৃহীত হবে না।"],
        ],
      },
      {
        idiom: "Go without",
        meaning: "To remain without",
        meaningBn: "ছাড়াই থাকা",
        n: 189,
        examples: [
          ["During the strike, the town had to [[go without]] bus service.", "ধর্মঘটের সময় শহরকে বাস সেবা ছাড়াই থাকতে হলো।"],
          ["He [[went without]] sleep for two nights to finish the work.", "কাজ শেষ করতে সে দুই রাত ঘুম ছাড়াই কাটাল।"],
          ["Poor families often [[go without]] new clothes at Eid.", "গরিব পরিবারগুলোকে প্রায়ই ঈদে নতুন পোশাক ছাড়াই থাকতে হয়।"],
        ],
      },
      {
        idiom: "Go by",
        meaning: "To follow",
        meaningBn: "অনুসরণ করা",
        n: 190,
        examples: [
          ["Always [[go by]] the doctor's advice after an operation.", "অপারেশনের পর সবসময় ডাক্তারের পরামর্শ অনুসরণ করো।"],
          ["We [[went by]] the map and reached the village before dark.", "আমরা মানচিত্র অনুসরণ করে অন্ধকারের আগে গ্রামে পৌঁছলাম।"],
          ["Do not [[go by]] rumours; check the notice board.", "গুজব অনুসরণ করো না; নোটিশ বোর্ড দেখো।"],
        ],
      },
      {
        idiom: "Hang about",
        meaning: "To Loiter near a place",
        meaningBn: "কোনো জায়গার আশেপাশে ঘোরাঘুরি করা",
        n: 191,
        examples: [
          ["Some boys were [[hanging about]] the school gate after class.", "ক্লাসের পর কয়েকজন ছেলে স্কুলের গেটের আশেপাশে ঘোরাঘুরি করছিল।"],
          ["Do not [[hang about]] the hospital corridor; wait outside.", "হাসপাতালের করিডোরে ঘোরাঘুরি করো না; বাইরে অপেক্ষা করো।"],
          ["He spends his evenings [[hanging about]] the tea stall.", "সে তার সন্ধ্যা চায়ের দোকানের আশেপাশে ঘোরাঘুরি করে কাটায়।"],
        ],
      },
      {
        idiom: "Hang upon",
        meaning: "To depend upon",
        meaningBn: "নির্ভর করা",
        n: 192,
        examples: [
          ["The harvest [[hangs upon]] the rain this year.", "এই বছর ফসল বৃষ্টির ওপর নির্ভর করে।"],
          ["His whole future [[hangs upon]] this one interview.", "তার পুরো ভবিষ্যৎ এই একটা ইন্টারভিউয়ের ওপর নির্ভর করে।"],
          ["The baby's health [[hangs upon]] proper food and care.", "শিশুর স্বাস্থ্য সঠিক খাবার ও যত্নের ওপর নির্ভর করে।"],
        ],
      },
    ],
  },
  {
    num: 39,
    titleBn: "শীতের রাতের প্রহরা",
    titleEn: "Guarding on a Winter Night",
    storyBn:
      "শীতের রাতে গ্রামের স্কুল পাহারা দিচ্ছিল যুবক আনিস। ঠান্ডা আর ঘুমের সঙ্গে লড়াই করে তাকে [[hold out]] করতে হয়েছে — সহ্য করতে হয়েছে, হার মানেনি। স্কুল কমিটির নিয়ম সে [[held to]] — মেনে চলল: রাতে কাউকে ভেতরে ঢুকতে দেওয়া যাবে না। ভোরের দিকে সে দেখল, কয়েকটা কুকুর স্কুলের মাঠে ঢুকে ফুলের বাগান নষ্ট করছে; সে লাঠি ঘুরিয়ে কুকুরগুলোকে [[kept off]] — দূরে রাখল। তার বন্ধু রুবেল পাশের গ্রামে নাইট স্কুলে পড়ে; আনিস প্রতিদিন ভোরে তার সঙ্গে [[keep up with]] চেষ্টা করে — তাল মিলিয়ে পড়ে। একদিন মাঠে ক্রিকেট খেলায় আনিস এমন জোরে বল করল যে ব্যাটসম্যান [[knocked out]] হয়ে গেল — বলে আঘাত পেয়ে প্রায় অজ্ঞান! সবাই তাকে হাসপাতালে নিল, সে সুস্থ হয়ে উঠল।",
    storyEn:
      "On a winter night, young Anis was guarding the village school. Fighting the cold and sleep, he had to [[hold out]] — to endure and refuse to yield. He [[held to]] the school committee's rule — he abided by it: nobody may be let in at night. Towards dawn he saw some dogs entering the school field and spoiling the flower garden; waving his stick, he [[kept]] the dogs [[off]] — he warded them off. His friend Rubel studies at a night school in the next village; every dawn Anis tries to [[keep up with]] him — to keep pace with him in study. One day in a cricket match on the field, Anis bowled so hard that the batsman was [[knocked out]] — hit by the ball, nearly senseless! Everyone took him to hospital, and he recovered.",
    idioms: [
      {
        idiom: "Hold out",
        meaning: "To Endure; To Refuse to yield; To continue; To offer",
        meaningBn: "সহ্য করা; হার না মানা; চালিয়ে যাওয়া; প্রস্তাব দেওয়া",
        n: 193,
        examples: [
          ["The small fort [[held out]] against the enemy for a month.", "ছোট দুর্গটা এক মাস শত্রুর বিরুদ্ধে টিকে থাকল।"],
          ["He [[held out]] his hand to help the old man cross the road.", "বৃদ্ধকে রাস্তা পার হতে সাহায্য করতে সে হাত বাড়িয়ে দিল।"],
          ["Our food will not [[hold out]] for the whole journey.", "আমাদের খাবার পুরো যাত্রায় চলবে না।"],
        ],
      },
      {
        idiom: "Hold to",
        meaning: "Abide By",
        meaningBn: "মেনে চলা",
        n: 194,
        examples: [
          ["A good officer [[holds to]] the rules even under pressure.", "একজন ভালো কর্মকর্তা চাপের মধ্যেও নিয়ম মেনে চলেন।"],
          ["She [[held to]] her decision despite everyone's advice.", "সবার পরামর্শ সত্ত্বেও সে তার সিদ্ধান্ত মেনে চলল।"],
          ["We must [[hold to]] our promise to the villagers.", "গ্রামবাসীর কাছে আমাদের প্রতিশ্রুতি মেনে চলতে হবে।"],
        ],
      },
      {
        idiom: "Keep off",
        meaning: "To ward off",
        meaningBn: "দূরে রাখা / ঠেকানো",
        n: 195,
        examples: [
          ["The net [[keeps off]] mosquitoes at night.", "জাল রাতে মশা দূরে রাখে।"],
          ["Please [[keep off]] the wet paint.", "দয়া করে ভেজা রঙ থেকে দূরে থাকো।"],
          ["The fence [[keeps off]] cattle from the garden.", "বেড়া বাগান থেকে গবাদি পশু দূরে রাখে।"],
        ],
      },
      {
        idiom: "Keep up with",
        meaning: "To keep pace with",
        meaningBn: "তাল মিলিয়ে চলা",
        n: 196,
        examples: [
          ["It is hard to [[keep up with]] the fast boys in a race.", "দৌড়ে দ্রুতগামী ছেলেদের সঙ্গে তাল মিলিয়ে চলা কঠিন।"],
          ["She reads the newspaper daily to [[keep up with]] the news.", "খবরের সঙ্গে তাল মিলিয়ে চলতে সে প্রতিদিন খবরের কাগজ পড়ে।"],
          ["Old teachers try to [[keep up with]] new technology.", "পুরনো শিক্ষকেরা নতুন প্রযুক্তির সঙ্গে তাল মিলিয়ে চলার চেষ্টা করেন।"],
        ],
      },
      {
        idiom: "Knock out",
        meaning: "To win by hitting another one",
        meaningBn: "আঘাত করে জয়ী হওয়া / অজ্ঞান করে ফেলা",
        n: 197,
        examples: [
          ["The boxer [[knocked out]] his opponent in the third round.", "বক্সার তৃতীয় রাউন্ডে প্রতিপক্ষকে আঘাত করে হারিয়ে দিল।"],
          ["The falling branch [[knocked out]] the passer-by for a few minutes.", "পড়ন্ত ডাল পথচারীকে কয়েক মিনিটের জন্য অজ্ঞান করে দিল।"],
          ["Our team [[knocked out]] the champions in the semi-final.", "আমাদের দল সেমিফাইনালে চ্যাম্পিয়নদের হারিয়ে দিল।"],
        ],
      },
    ],
  },
  {
    num: 40,
    titleBn: "পুরনো ঝগড়া, নতুন সেতু",
    titleEn: "An Old Quarrel, a New Bridge",
    storyBn:
      "দুই গ্রামের মধ্যে নদীর ওপর সেতু বানানো নিয়ে বহুদিনের মনোমালিন্য। পঞ্চায়েতের সভায় বড় চাচা বললেন, [[it takes two to tango]] — খারাপ পরিস্থিতিতে দুই পক্ষই দায়ী; একা এক পক্ষকে দোষ দেওয়া যাবে না। প্রথম কাজ হলো নদীর বন্যার পানি [[keep at bay]] — দূরে রাখা, যাতে কাজ শুরু করা যায়। পুরনোরা বললেন, এই বিষয়টা নিয়ে আর ঝগড়া বাড়িয়ে লাভ নেই — [[let sleeping dogs lie]], যা ঝামেলা তৈরি করতে পারে তা একা ছেড়ে দাও। সেতুর কাজ শুরু হতেই যেন [[opened the floodgates]] — আগে নিয়ন্ত্রণে থাকা আবেগ ছেড়ে দেওয়া হলো: দুই গ্রামের মানুষ একসঙ্গে কাজে নামল। খবরটা এল [[out of the blue]] — অপ্রত্যাশিতভাবে: সরকার পুরো টাকা মঞ্জুর করেছে!",
    storyEn:
      "Between two villages there was a long-standing dispute about building a bridge over the river. At the panchayat meeting, the elder uncle said, [[it takes two to tango]] — both people involved in a bad situation are responsible for it; one side alone cannot be blamed. The first task is to [[keep]] the river's flood water [[at bay]] — keep it away, so that work can begin. The elders said, there is no gain in increasing this quarrel — [[let sleeping dogs lie]], leave alone what might cause trouble. As soon as the bridge work began, it was as if someone [[opened the floodgates]] — released what was previously under control: the people of both villages started working together. The news came [[out of the blue]] — unexpectedly: the government has granted the full money!",
    idioms: [
      {
        idiom: "It takes two to tango",
        meaning: "Both people involved in a bad situation are responsible for it",
        meaningBn: "খারাপ পরিস্থিতিতে জড়িত দুজনই দায়ী",
        n: 198,
        examples: [
          ["Do not blame only the clerk for the bribe; [[it takes two to tango]].", "ঘুষের জন্য শুধু কেরানিকে দোষ দিয়ো না; দুজনই দায়ী।"],
          ["A friendship breaks from both sides — [[it takes two to tango]].", "বন্ধুত্ব দুই দিক থেকেই ভাঙে — দুজনই দায়ী।"],
          ["The fight in the market needed two angry men; [[it takes two to tango]].", "বাজারের মারামারিতে দুজন রাগী মানুষই লেগেছিল; দুজনই দায়ী।"],
        ],
      },
      {
        idiom: "Keep something at bay",
        meaning: "Keep something away",
        meaningBn: "কোনো কিছুকে দূরে রাখা",
        n: 200,
        examples: [
          ["The embankment [[keeps]] the flood [[at bay]].", "বাঁধ বন্যাকে দূরে রাখে।"],
          ["Drink enough water to [[keep]] weakness [[at bay]] in summer.", "গ্রীষ্মে দুর্বলতা দূরে রাখতে যথেষ্ট পানি খাও।"],
          ["Good locks [[keep]] thieves [[at bay]].", "ভালো তালা চোরদের দূরে রাখে।"],
        ],
      },
      {
        idiom: "Let sleeping dogs lie",
        meaning: "Leave something alone if it might cause trouble",
        meaningBn: "যা ঝামেলা তৈরি করতে পারে তা একা ছেড়ে দেওয়া",
        n: 202,
        examples: [
          ["Do not mention the old land dispute again; [[let sleeping dogs lie]].", "পুরনো জমির বিবাদ আবার তুলো না; ঝামেলা হতে পারে এমন বিষয় একা ছেড়ে দাও।"],
          ["He wanted to reopen the case, but his lawyer advised him to [[let sleeping dogs lie]].", "সে মামলাটা আবার খুলতে চেয়েছিল, কিন্তু আইনজীবী তাকে বিষয়টা একা ছেড়ে দিতে পরামর্শ দিলেন।"],
          ["About his first job, it is better to [[let sleeping dogs lie]].", "তার প্রথম চাকরি নিয়ে বিষয়টা একা ছেড়ে দেওয়াই ভালো।"],
        ],
      },
      {
        idiom: "Open the floodgates",
        meaning: "Release something that was previously under control",
        meaningBn: "আগে নিয়ন্ত্রণে থাকা কিছু ছেড়ে দেওয়া",
        n: 203,
        examples: [
          ["One success [[opened the floodgates]] of orders for the small factory.", "একটা সাফল্য ছোট কারখানাটার জন্য অর্ডারের বন্যা ছেড়ে দিল।"],
          ["When the dam gate broke, it [[opened the floodgates]] to the fields.", "বাঁধের গেট ভেঙে গেলে মাঠে পানির বন্যা ছেড়ে দেওয়া হলো।"],
          ["Her tears [[opened the floodgates]] of everyone's sympathy.", "তার কান্না সবার সহানুভূতির বন্যা বইয়ে দিল।"],
        ],
      },
      {
        idiom: "Out of the blue",
        meaning: "Happen unexpectedly",
        meaningBn: "অপ্রত্যাশিতভাবে ঘটা",
        n: 204,
        examples: [
          ["His old friend called him [[out of the blue]] after ten years.", "দশ বছর পর তার পুরনো বন্ধু অপ্রত্যাশিতভাবে তাকে ফোন করল।"],
          ["The offer of a scholarship came [[out of the blue]].", "বৃত্তির প্রস্তাবটা অপ্রত্যাশিতভাবে এল।"],
          ["[[Out of the blue]], the sky darkened and rain began.", "অপ্রত্যাশিতভাবে আকাশ অন্ধকার হয়ে বৃষ্টি শুরু হলো।"],
        ],
      },
    ],
  },
  {
    num: 41,
    titleBn: "সাহসী সিদ্ধান্ত",
    titleEn: "A Brave Decision",
    storyBn:
      "গ্রামের মেয়ে শারমিন শহরে গিয়ে নার্সিং পড়তে চায়। আত্মীয়রা বলল, মেয়ে মানুষ শহরে একা যাওয়া মানে [[out on a limb]] — ঝুঁকিপূর্ণ কাজ। শারমিনের মা প্রথমে ভয় পেলেও পরে মেয়ের পাশে দাঁড়ালেন। কলেজের এক শিক্ষক শারমিনের আবেদন দেখে বললেন, এই মেয়েটা [[over the top]] কিছু নয় — সে অতিরিক্ত কিছু করছে না, সে শুধু তার অধিকার চাইছে। শারমিন বলে, [[pen is mightier than the sword]] — কলম তরবারির চেয়ে শক্তিশালী; পড়াশোনাই তার অস্ত্র। ভর্তির পর সে আর [[push her luck]] করল না — প্রাপ্যের চেয়ে বেশি চাইল না; সে মন দিয়ে পড়তে লাগল। তিন বছর পর সে হাসপাতালে চাকরি পেয়ে [[reaped the harvest]] — অতীতের পরিশ্রমের ফল ভোগ করল।",
    storyEn:
      "Village girl Sharmin wants to go to the city to study nursing. Relatives said, for a girl to go to the city alone means going [[out on a limb]] — doing something risky. Sharmin's mother was afraid at first but later stood beside her daughter. A college teacher, seeing Sharmin's application, said, this girl is nothing [[over the top]] — she is not doing anything excessive; she is only asking for her right. Sharmin says, the [[pen is mightier than the sword]] — words and communication have a greater effect than war; study is her weapon. After admission she did not [[push her luck]] any more — she did not try to obtain more than what she had; she studied with full attention. Three years later, getting a job at a hospital, she [[reaped the harvest]] — she received the result of her past hard work.",
    idioms: [
      {
        idiom: "Out on a limb",
        meaning: "Do something risky",
        meaningBn: "ঝুঁকিপূর্ণ কিছু করা",
        n: 205,
        examples: [
          ["By investing all his savings in one shop, he went [[out on a limb]].", "সব জমানো টাকা এক দোকানে বিনিয়োগ করে সে ঝুঁকিপূর্ণ কাজ করল।"],
          ["The young reporter went [[out on a limb]] to publish the truth.", "তরুণ সাংবাদিক সত্য প্রকাশ করতে ঝুঁকি নিলেন।"],
          ["Do not go [[out on a limb]] for a plan nobody has checked.", "কেউ যাচাই করেনি এমন পরিকল্পনার জন্য ঝুঁকি নিয়ো না।"],
        ],
      },
      {
        idiom: "Over the Top",
        meaning: "Totally excessive and not suitable for the occasion",
        meaningBn: "সম্পূর্ণ অতিরিক্ত ও উপলক্ষের জন্য অনুপযুক্ত",
        n: 206,
        examples: [
          ["His angry reaction was completely [[over the top]] for such a small mistake.", "এত ছোট ভুলের জন্য তার রাগী প্রতিক্রিয়া ছিল সম্পূর্ণ অতিরিক্ত।"],
          ["The decoration of the wedding hall was beautiful but a little [[over the top]].", "বিয়ে হলের সাজ সুন্দর ছিল, কিন্তু কিছুটা অতিরিক্ত।"],
          ["Do not go [[over the top]] with spices in this dish.", "এই খাবারে মসলা অতিরিক্ত দিয়ো না।"],
        ],
      },
      {
        idiom: "Pen is mightier than the sword",
        meaning: "Words and communication have a greater effect than war",
        meaningBn: "কথা ও যোগাযোগ যুদ্ধের চেয়ে বেশি প্রভাব ফেলে",
        n: 207,
        examples: [
          ["The writer's articles changed public opinion — truly, the [[pen is mightier than the sword]].", "লেখকের প্রবন্ধ জনমত বদলে দিল — সত্যিই, কলম তরবারির চেয়ে শক্তিশালী।"],
          ["Teachers prove every day that the [[pen is mightier than the sword]].", "শিক্ষকেরা প্রতিদিন প্রমাণ করেন কলম তরবারির চেয়ে শক্তিশালী।"],
          ["He chose journalism because he believes the [[pen is mightier than the sword]].", "সে সাংবাদিকতা বেছে নিল কারণ সে বিশ্বাস করে কলম তরবারির চেয়ে শক্তিশালী।"],
        ],
      },
      {
        idiom: "Push one’s luck",
        meaning: "Trying to obtain more than what one has",
        meaningBn: "নিজের প্রাপ্যের চেয়ে বেশি পাওয়ার চেষ্টা করা",
        n: 208,
        examples: [
          ["You have got leave for three days; do not [[push your luck]] by asking for five.", "তুমি তিন দিনের ছুটি পেয়েছ; পাঁচ দিন চেয়ে প্রাপ্যের বেশি চেয়ো না।"],
          ["He [[pushed his luck]] and lost everything in the last bet.", "সে প্রাপ্যের বেশি পেতে গিয়ে শেষ বাজিতে সব হারাল।"],
          ["The driver [[pushed his luck]] by speeding on the wet road.", "চালক ভেজা রাস্তায় গতি বাড়িয়ে নিজের ভাগ্য চাপে ফেলল।"],
        ],
      },
      {
        idiom: "Reap the harvest",
        meaning: "Benefit or suffer as a direct result of past actions",
        meaningBn: "অতীতের কাজের সরাসরি ফল ভোগ করা",
        n: 209,
        examples: [
          ["After years of honest work, the farmer [[reaped the harvest]] of respect in his old age.", "বছরের পর বছর সৎ কাজের পর কৃষক বৃদ্ধ বয়সে সম্মানের ফল ভোগ করলেন।"],
          ["He neglected his studies and now [[reaps the harvest]] of failure.", "সে পড়াশোনা অবহেলা করেছে, এখন ব্যর্থতার ফল ভোগ করছে।"],
          ["Plant kindness today and you will [[reap the harvest]] tomorrow.", "আজ সদয়তা বপন করো, কাল তার ফল ভোগ করবে।"],
        ],
      },
    ],
  },
  {
    num: 42,
    titleBn: "নতুন বছরের প্রস্তুতি",
    titleEn: "Preparing for the New Year",
    storyBn:
      "নতুন বছরের আগে স্কুলের ছাত্ররা ঠিক করল, তারা স্কুলটা পরিষ্কার করবে। সকালে সবাই [[rolled up their sleeves]] — নিজেকে প্রস্তুত করল কাজের জন্য। প্রধান শিক্ষক বললেন, পরিচ্ছন্নতা নিয়ে আমরা সবাই [[see eye to eye]] — একমত। কাজের মাঝে এক ছাত্র অনুমান করে বলল কোন বাক্সে বই আছে — সেটা ছিল শুধু [[shot in the dark]] — সম্পূর্ণ অনুমান, তবু মিলে গেল! দুপুরে সবাই মিলে বড় পরিষ্কারের কাজে [[sank their teeth into]] — অনেক উৎসাহ নিয়ে ঝাঁপিয়ে পড়ল। শিক্ষক বললেন, পত্রিকায় যা পড়ো তা [[take with a grain of salt]] — তথ্যের সত্যতা নিয়ে সন্দেহ রেখে পড়ো, সব খবর সত্যি নয়।",
    storyEn:
      "Before the new year, the school students decided they would clean the school. In the morning everyone [[rolled up their sleeves]] — got themselves prepared for work. The headmaster said, about cleanliness we all [[see eye to eye]] — we are in agreement. During the work, one student guessed which box held the books — it was only a [[shot in the dark]] — a complete guess, yet it matched! At noon everyone [[sank their teeth into]] the big cleaning work — they did it with a lot of energy and enthusiasm. The teacher said, whatever you read in the newspaper, [[take]] it [[with a grain of salt]] — doubt the accuracy of the information; not all news is true.",
    idioms: [
      {
        idiom: "Roll up sleeves",
        meaning: "To get yourself prepared",
        meaningBn: "নিজেকে প্রস্তুত করা",
        n: 210,
        examples: [
          ["The exam is near; it is time to [[roll up your sleeves]] and study.", "পরীক্ষা কাছে; এখন নিজেকে প্রস্তুত করে পড়ার সময়।"],
          ["Everyone [[rolled up their sleeves]] to repair the village road.", "গ্রামের রাস্তা মেরামতে সবাই নিজেকে প্রস্তুত করল।"],
          ["She [[rolled up her sleeves]] and began cleaning the kitchen.", "সে নিজেকে প্রস্তুত করে রান্নাঘর পরিষ্কার শুরু করল।"],
        ],
      },
      {
        idiom: "See eye to eye",
        meaning: "To be in agreement with",
        meaningBn: "কারো সঙ্গে একমত হওয়া",
        n: 211,
        examples: [
          ["The two partners [[see eye to eye]] on the new plan.", "দুই অংশীদার নতুন পরিকল্পনায় একমত।"],
          ["Parents and teachers should [[see eye to eye]] about children's study.", "সন্তানদের পড়াশোনা নিয়ে বাবা-মা ও শিক্ষকদের একমত হওয়া উচিত।"],
          ["We do not [[see eye to eye]] on politics, but we are still friends.", "রাজনীতিতে আমরা একমত নই, তবু আমরা বন্ধু।"],
        ],
      },
      {
        idiom: "Shot in the dark",
        meaning: "A complete guess",
        meaningBn: "সম্পূর্ণ অনুমান",
        n: 212,
        examples: [
          ["His answer was just a [[shot in the dark]], but it was correct.", "তার উত্তরটা ছিল শুধু সম্পূর্ণ অনুমান, কিন্তু তা সঠিক হলো।"],
          ["Choosing that road was a [[shot in the dark]]; we had no map.", "ওই রাস্তা বেছে নেওয়া ছিল সম্পূর্ণ অনুমান; আমাদের কাছে মানচিত্র ছিল না।"],
          ["Do not decide by a [[shot in the dark]]; ask someone who knows.", "সম্পূর্ণ অনুমানে সিদ্ধান্ত নিয়ো না; যে জানে তাকে জিজ্ঞেস করো।"],
        ],
      },
      {
        idiom: "Sink your teeth into",
        meaning: "Do something with a lot of energy and enthusiasm",
        meaningBn: "অনেক শক্তি ও উৎসাহ নিয়ে কিছু করা",
        n: 213,
        examples: [
          ["She finally got a project she could [[sink her teeth into]].", "অবশেষে সে এমন একটা প্রকল্প পেল যাতে সে পূর্ণ উৎসাহে ঝাঁপিয়ে পড়তে পারে।"],
          ["The young engineer [[sank his teeth into]] the bridge design.", "তরুণ প্রকৌশলী পূর্ণ উৎসাহে সেতুর নকশায় ঝাঁপিয়ে পড়লেন।"],
          ["Give the students a real problem to [[sink their teeth into]].", "শিক্ষার্থীদের পূর্ণ উৎসাহে করার মতো একটা বাস্তব সমস্যা দাও।"],
        ],
      },
      {
        idiom: "Take with a grain/pinch of salt",
        meaning: "To doubt the accuracy of information",
        meaningBn: "তথ্যের সত্যতা নিয়ে সন্দেহ করা",
        n: 214,
        examples: [
          ["[[Take]] his promises [[with a pinch of salt]]; he often forgets them.", "তার প্রতিশ্রুতি সন্দেহ নিয়ে নাও; সে প্রায়ই তা ভুলে যায়।"],
          ["Rumours from the market should be [[taken with a grain of salt]].", "বাজারের গুজব সন্দেহ নিয়ে নেওয়া উচিত।"],
          ["She [[takes]] every advertisement [[with a grain of salt]].", "সে প্রতিটি বিজ্ঞাপন সন্দেহ নিয়ে দেখে।"],
        ],
      },
    ],
  },
  {
    num: 43,
    titleBn: "বাজারের ঝুঁকি",
    titleEn: "Risk in the Market",
    storyBn:
      "শেয়ার বাজারে টাকা লাগিয়ে পুরনো ব্যবসায়ী হালিম সাহেব এখন [[skating on thin ice]] — ঝুঁকিপূর্ণ অবস্থায় কিছু করছেন। তার ছোট দোকানটা একটা [[tight spot]]-এ পড়েছে — কঠিন পরিস্থিতিতে: বকেয়া বেড়ে গেছে। ব্যাংকের ম্যানেজার বললেন, সুযোগ এখনই — [[strike while the iron is hot]], সঠিক সময়ে কাজ করো; ঋণের সুদ কম থাকতেই আবেদন করো। হালিম সাহেব অনেক ভেবে [[took the plunge]] — ঝুঁকি থাকলেও আগ্রহের কাজে ঝাঁপিয়ে পড়লেন: তিনি দোকানটা বড় করার সিদ্ধান্ত নিলেন। কিন্তু প্রথম মাসেই বিক্রি [[took a nosedive]] — দ্রুত পড়ে গেল। তবু তিনি হাল ছাড়লেন না; ধীরে ধীরে দোকান আবার দাঁড়াল।",
    storyEn:
      "Investing money in the share market, old businessman Halim Saheb is now [[skating on thin ice]] — doing something risky. His small shop has fallen into a [[tight spot]] — a difficult situation: dues have increased. The bank manager said, the opportunity is now — [[strike while the iron is hot]], act at the right time; apply while the loan interest is low. After much thought, Halim Saheb [[took the plunge]] — he ventured into the work of his interest despite the risks: he decided to expand the shop. But in the very first month, sales [[took a nosedive]] — a rapid drop. Yet he did not give up; slowly the shop stood again.",
    idioms: [
      {
        idiom: "Skating on thin ice",
        meaning: "Do or say something risky",
        meaningBn: "ঝুঁকিপূর্ণ কিছু করা বা বলা",
        n: 215,
        examples: [
          ["By joking about the boss's family, he was [[skating on thin ice]].", "বসের পরিবার নিয়ে মজা করে সে ঝুঁকিপূর্ণ কাজ করছিল।"],
          ["The company is [[skating on thin ice]] with so many unpaid bills.", "এত বকেয়া বিল নিয়ে কোম্পানিটা ঝুঁকিপূর্ণ অবস্থায় আছে।"],
          ["Do not [[skate on thin ice]] by driving without a licence.", "লাইসেন্স ছাড়া গাড়ি চালিয়ে ঝুঁকি নিয়ো না।"],
        ],
      },
      {
        idiom: "Tight spot",
        meaning: "A difficult situation",
        meaningBn: "কঠিন পরিস্থিতি",
        n: 216,
        examples: [
          ["Losing his wallet in a strange city put him in a [[tight spot]].", "অপরিচিত শহরে মানিব্যাগ হারিয়ে সে কঠিন পরিস্থিতিতে পড়ল।"],
          ["The team was in a [[tight spot]] after two quick wickets fell.", "দুটি উইকেট তাড়াতাড়ি পড়ায় দল কঠিন পরিস্থিতিতে পড়ল।"],
          ["A true friend helps you in a [[tight spot]].", "আসল বন্ধু কঠিন পরিস্থিতিতে তোমাকে সাহায্য করে।"],
        ],
      },
      {
        idiom: "Strike while the iron is hot",
        meaning: "To act at the right time",
        meaningBn: "সঠিক সময়ে কাজ করা",
        n: 217,
        examples: [
          ["Land is cheap this season; [[strike while the iron is hot]] and buy now.", "এই মৌসুমে জমি সস্তা; সঠিক সময়ে কাজ করে এখনই কেনো।"],
          ["She applied for the scholarship as soon as it opened — she [[struck while the iron was hot]].", "বৃত্তি খুলতেই সে আবেদন করল — সে সঠিক সময়ে কাজ করল।"],
          ["In business, you must [[strike while the iron is hot]].", "ব্যবসায় সঠিক সময়ে কাজ করতেই হয়।"],
        ],
      },
      {
        idiom: "Take the plunge",
        meaning: "Venture into something of one’s interest despite the risks involved",
        meaningBn: "ঝুঁকি থাকলেও আগ্রহের কাজে ঝাঁপিয়ে পড়া",
        n: 218,
        examples: [
          ["After ten years of service, he [[took the plunge]] and opened his own shop.", "দশ বছর চাকরির পর সে ঝাঁপিয়ে পড়ে নিজের দোকান খুলল।"],
          ["They [[took the plunge]] and got married despite many obstacles.", "অনেক বাধা সত্ত্বেও তারা ঝাঁপিয়ে পড়ে বিয়ে করল।"],
          ["Learning to swim, the child finally [[took the plunge]] into the deep water.", "সাঁতার শিখতে গিয়ে শিশুটি অবশেষে গভীর পানিতে ঝাঁপ দিল।"],
        ],
      },
      {
        idiom: "Take a nosedive",
        meaning: "Rapid drop or decrease in value",
        meaningBn: "মূল্যের দ্রুত পতন",
        n: 219,
        examples: [
          ["The price of onions [[took a nosedive]] after the new harvest arrived.", "নতুন ফসল আসার পর পেঁয়াজের দাম দ্রুত পড়ে গেল।"],
          ["His marks [[took a nosedive]] when he stopped studying.", "পড়া বন্ধ করলে তার নম্বর দ্রুত পড়ে গেল।"],
          ["The company's shares [[took a nosedive]] after the bad news.", "খারাপ খবরের পর কোম্পানির শেয়ারের দাম দ্রুত পড়ে গেল।"],
        ],
      },
    ],
  },
  {
    num: 44,
    titleBn: "দাদুর সম্মান",
    titleEn: "Grandfather's Honour",
    storyBn:
      "গ্রামের সবাই দাদুকে [[think the world of]] — খুব প্রশংসা করে, কারণ তিনি সারাজীবন মানুষের উপকার করেছেন। তার জ্ঞান অনেক যুবকের [[stood in good stead]] — উপকারে এসেছে। এবারের মেলায় দাদু [[took a back seat]] — কম গুরুত্বপূর্ণ ভূমিকা নিলেন, যুবকদের এগিয়ে দিলেন। কিছু যুবক অবশ্য সারাদিন [[waving a dead chicken]] করল — অর্থহীন কাজ করে সময় নষ্ট করল। তবু মেলার শেষে সবাই মিলে নদীর ধারে বসে [[had a whale of a time]] — খুব উপভোগ করল। দাদু বললেন, আনন্দ মানে বড় আয়োজন নয়, মানুষের সঙ্গে সময় কাটানো।",
    storyEn:
      "Everyone in the village [[thinks the world of]] Grandfather — they admire him very much, because he has spent his whole life helping people. His wisdom has [[stood]] many young men [[in good stead]] — it has been of good service to them. At this year's fair, Grandfather [[took a back seat]] — he chose a less important role and pushed the young men forward. Some youths, however, spent the whole day [[waving a dead chicken]] — doing something useless and wasting time. Yet at the end of the fair, everyone sat together by the river and [[had a whale of a time]] — enjoyed a lot. Grandfather said, joy does not mean a big arrangement; it means spending time with people.",
    idioms: [
      {
        idiom: "Think the world of",
        meaning: "Admire someone very much",
        meaningBn: "কাউকে খুব প্রশংসা করা",
        n: 220,
        examples: [
          ["The students [[think the world of]] their kind headmaster.", "শিক্ষার্থীরা তাদের সদয় প্রধান শিক্ষককে খুব প্রশংসা করে।"],
          ["She [[thinks the world of]] her elder sister.", "সে তার বড় বোনকে খুব প্রশংসা করে।"],
          ["The villagers [[think the world of]] the honest chairman.", "গ্রামবাসী সৎ চেয়ারম্যানকে খুব প্রশংসা করে।"],
        ],
      },
      {
        idiom: "Stand in a good stead",
        meaning: "To be useful or be of good service to someone",
        meaningBn: "কারো উপকারে আসা",
        n: 221,
        examples: [
          ["His knowledge of rivers [[stood him in good stead]] during the flood.", "বন্যার সময় নদী সম্পর্কে তার জ্ঞান তার উপকারে এল।"],
          ["Good handwriting will [[stand you in good stead]] in exams.", "ভালো হাতের লেখা পরীক্ষায় তোমার উপকারে আসবে।"],
          ["The training [[stood her in good stead]] when the real emergency came.", "আসল জরুরি অবস্থা এলে প্রশিক্ষণটা তার উপকারে এল।"],
        ],
      },
      {
        idiom: "Take a back seat",
        meaning: "Choose to be less important in a role",
        meaningBn: "কম গুরুত্বপূর্ণ ভূমিকা নেওয়া",
        n: 222,
        examples: [
          ["The senior leader [[took a back seat]] and let the young members lead.", "জ্যেষ্ঠ নেতা কম গুরুত্বপূর্ণ ভূমিকা নিয়ে তরুণ সদস্যদের নেতৃত্ব দিতে দিলেন।"],
          ["After his illness, the captain [[took a back seat]] in the team.", "অসুখের পর অধিনায়ক দলে কম গুরুত্বপূর্ণ ভূমিকা নিলেন।"],
          ["She [[took a back seat]] in the discussion and listened.", "সে আলোচনায় কম গুরুত্বপূর্ণ ভূমিকা নিয়ে শুনতে থাকল।"],
        ],
      },
      {
        idiom: "Wave a dead chicken",
        meaning: "Do something useless",
        meaningBn: "অর্থহীন কাজ করা",
        n: 223,
        examples: [
          ["Arguing with him is like [[waving a dead chicken]]; he never listens.", "তার সঙ্গে তর্ক করা অর্থহীন কাজের মতো; সে কখনো শোনে না।"],
          ["Do not [[wave a dead chicken]] by repairing that broken radio again and again.", "ওই ভাঙা রেডিওটা বারবার মেরামত করে অর্থহীন কাজ করো না।"],
          ["Sending more letters to that office is just [[waving a dead chicken]].", "ওই অফিসে আরও চিঠি পাঠানো শুধু অর্থহীন কাজ।"],
        ],
      },
      {
        idiom: "Whale of a time",
        meaning: "Enjoy a lot",
        meaningBn: "খুব উপভোগ করা",
        n: 224,
        examples: [
          ["The children had a [[whale of a time]] at the zoo.", "শিশুরা চিড়িয়াখানায় খুব উপভোগ করল।"],
          ["We had a [[whale of a time]] on the boat trip.", "নৌকা ভ্রমণে আমরা খুব উপভোগ করলাম।"],
          ["She had a [[whale of a time]] at her cousin's wedding.", "সে তার চাচাতো বোনের বিয়েতে খুব উপভোগ করল।"],
        ],
      },
    ],
  },
  {
    num: 45,
    titleBn: "মনোযোগের পাঠ",
    titleEn: "A Lesson in Attention",
    storyBn:
      "বিজ্ঞানের ক্লাসে শিক্ষক একটা কঠিন বিষয় বোঝাচ্ছিলেন। ছাত্র রাহাত অনেকক্ষণ ধরে [[wrapping his brain around]] it করছিল — বোঝার জন্য মনোযোগ দিচ্ছিল। শিক্ষক বললেন, আজ আমরা একটা জিনিসেই [[zero in on]] করব — একটা বিষয়ে সব মনোযোগ দেব: পানির চক্র। তিনি বললেন, পড়াশোনায় [[above all]] দরকার ধৈর্য — সবার ওপরে, প্রধানত ধৈর্য। রাহাতের বন্ধু দেরি করে এল [[on account of]] বৃষ্টি — বৃষ্টির কারণে। শিক্ষক বললেন, [[on no account]] ক্লাসে মোবাইল ব্যবহার করবে না — কোনো কারণেই নয়। ক্লাস শেষে রাহাত বিষয়টা পুরোপুরি বুঝে গেল।",
    storyEn:
      "In the science class, the teacher was explaining a difficult topic. Student Rahat was [[wrapping his brain around]] it for a long time — concentrating on it to understand. The teacher said, today we will [[zero in on]] one thing only — focus all attention on one thing: the water cycle. He said, in study, [[above all]], patience is needed — chiefly, mainly patience. Rahat's friend came late [[on account of]] the rain — due to the rain. The teacher said, [[on no account]] use a mobile in class — not for any reason. At the end of the class, Rahat understood the topic completely.",
    idioms: [
      {
        idiom: "Wrap one’s brain around",
        meaning: "Concentrate on something to understand",
        meaningBn: "বোঝার জন্য মনোযোগ দেওয়া",
        n: 225,
        examples: [
          ["It took me a week to [[wrap my brain around]] the new software.", "নতুন সফটওয়্যারটা বুঝতে আমার এক সপ্তাহ লাগল।"],
          ["She is still [[wrapping her brain around]] the idea of moving abroad.", "সে এখনো বিদেশে যাওয়ার ভাবনাটা বোঝার চেষ্টা করছে।"],
          ["Give him time to [[wrap his brain around]] the bad news.", "খারাপ খবরটা বুঝতে তাকে সময় দাও।"],
        ],
      },
      {
        idiom: "Zero in on something",
        meaning: "Focus all attention on one thing",
        meaningBn: "একটা জিনিসে সব মনোযোগ দেওয়া",
        n: 226,
        examples: [
          ["The police [[zeroed in on]] the main suspect.", "পুলিশ প্রধান সন্দেহভাজনের ওপর সব মনোযোগ দিল।"],
          ["Before the exam, [[zero in on]] your weakest subject.", "পরীক্ষার আগে তোমার সবচেয়ে দুর্বল বিষয়ে সব মনোযোগ দাও।"],
          ["The camera [[zeroed in on]] the bird on the branch.", "ক্যামেরা ডালের পাখিটার ওপর সব মনোযোগ দিল।"],
        ],
      },
      {
        idiom: "Above all",
        meaning: "Chiefly, Mainly",
        meaningBn: "সবার ওপরে; প্রধানত",
        n: 227,
        examples: [
          ["[[Above all]], a teacher must be patient.", "সবার ওপরে, একজন শিক্ষককে ধৈর্যশীল হতেই হয়।"],
          ["She is kind, honest and, [[above all]], hardworking.", "সে সদয়, সৎ এবং সবার ওপরে, পরিশ্রমী।"],
          ["[[Above all]], keep the children safe during the trip.", "সবার ওপরে, ভ্রমণে শিশুদের নিরাপদ রাখো।"],
        ],
      },
      {
        idiom: "On Account of",
        meaning: "Due to",
        meaningBn: "কারণে",
        n: 228,
        examples: [
          ["The match was postponed [[on account of]] heavy rain.", "ভারী বৃষ্টির কারণে ম্যাচ স্থগিত করা হলো।"],
          ["He could not attend the meeting [[on account of]] his illness.", "অসুস্থতার কারণে সে সভায় যোগ দিতে পারল না।"],
          ["The road is closed [[on account of]] repairs.", "মেরামতের কারণে রাস্তা বন্ধ আছে।"],
        ],
      },
      {
        idiom: "On no account",
        meaning: "Not for Any Reason",
        meaningBn: "কোনো কারণেই নয়",
        n: 229,
        examples: [
          ["[[On no account]] should you open this door during the flight.", "কোনো কারণেই উড়ানের সময় এই দরজা খুলবে না।"],
          ["[[On no account]] tell him the secret plan.", "কোনো কারণেই তাকে গোপন পরিকল্পনাটা বলো না।"],
          ["Students must [[on no account]] copy in the examination hall.", "শিক্ষার্থীরা কোনো কারণেই পরীক্ষার হলে নকল করতে পারবে না।"],
        ],
      },
    ],
  },
  {
    num: 46,
    titleBn: "বিশ্বস্ত বন্ধু",
    titleEn: "The Faithful Friend",
    storyBn:
      "দুই বন্ধু অর্জুন ও বিক্রম ছোটবেলা থেকে একসঙ্গে। বিক্রম অর্জুনের [[a fidus Achates]] — বিশ্বস্ত বন্ধু, সব বিপদে পাশে থাকে। অর্জুন দেখতে [[an Adonis]] — খুব সুদর্শন, তাই অনেকে ভাবত সে হয়তো [[assumes airs]] — নিজেকে বড় মনে করে; কিন্তু আসলে সে খুব সাধারণ। তার একটাই দুর্বলতা — সে মঞ্চে উঠলেই ঘাবড়ে যায়, এটাই তার [[the heel of Achilles]] — দুর্বল জায়গা। কলেজের অনুষ্ঠানে সে সবার থেকে [[stood aloof]] — নিজেকে আলাদা রাখল, কারো সঙ্গে মিশল না। বিক্রম তাকে টেনে এনে সবার সঙ্গে পরিচয় করিয়ে দিল। সেদিন অর্জুন বুঝল, বন্ধু মানে শুধু পাশে থাকা নয়, ঠিক সময়ে টেনে তোলা।",
    storyEn:
      "Two friends, Arjun and Bikram, have been together since childhood. Bikram is Arjun's [[fidus Achates]] — a faithful friend who stands beside him in every danger. Arjun looks like [[an Adonis]] — a very handsome man, so many thought he might [[assume airs]] — affect superiority; but actually he is very simple. He has only one weakness — he gets nervous as soon as he goes on stage; this is his [[heel of Achilles]] — his weak point. At the college programme he [[stood aloof]] from everyone — he kept to himself and did not mix with others. Bikram pulled him in and introduced him to everyone. That day Arjun understood: a friend means not only standing beside you, but pulling you up at the right time.",
    idioms: [
      {
        idiom: "A Fidus Achates",
        meaning: "A faithful friend or a devoted follower",
        meaningBn: "বিশ্বস্ত বন্ধু বা অনুরাগী অনুসারী",
        n: 230,
        examples: [
          ["In every danger, his [[fidus Achates]] stood beside him.", "প্রতিটি বিপদে তার বিশ্বস্ত বন্ধু তার পাশে দাঁড়াল।"],
          ["The leader's [[fidus Achates]] never left him in forty years of politics.", "নেতার বিশ্বস্ত অনুসারী চল্লিশ বছরের রাজনীতিতে তাকে কখনো ছাড়েনি।"],
          ["Every great man needs a [[fidus Achates]] who tells him the truth.", "প্রতিটি বড় মানুষের একজন বিশ্বস্ত বন্ধু দরকার, যে তাকে সত্য বলে।"],
        ],
      },
      {
        idiom: "The Heel of Achilles",
        meaning: "A Weak Point",
        meaningBn: "দুর্বল জায়গা",
        n: 231,
        examples: [
          ["His quick temper is his [[heel of Achilles]].", "তার তাড়াতাড়ি রাগ করাটাই তার দুর্বল জায়গা।"],
          ["The team's weak fielding proved to be its [[heel of Achilles]].", "দলের দুর্বল ফিল্ডিংই তার দুর্বল জায়গা হয়ে দাঁড়াল।"],
          ["For the strong fort, the old gate was the [[heel of Achilles]].", "শক্তিশালী দুর্গের জন্য পুরনো গেটটাই ছিল দুর্বল জায়গা।"],
        ],
      },
      {
        idiom: "An Adonis",
        meaning: "A very handsome man",
        meaningBn: "খুব সুদর্শন পুরুষ",
        n: 232,
        examples: [
          ["The new film hero is truly [[an Adonis]].", "নতুন চলচ্চিত্রের নায়ক সত্যিই খুব সুদর্শন পুরুষ।"],
          ["He is no [[Adonis]], but his kind heart wins everyone.", "সে খুব সুদর্শন নয়, কিন্তু তার সদয় মন সবাইকে জয় করে।"],
          ["In his youth, grandfather was known as [[an Adonis]] of the village.", "যৌবনে দাদা গ্রামের খুব সুদর্শন পুরুষ হিসেবে পরিচিত ছিলেন।"],
        ],
      },
      {
        idiom: "To assume airs",
        meaning: "To affect superiority",
        meaningBn: "নিজেকে বড় মনে করা / অহংকার দেখানো",
        n: 233,
        examples: [
          ["After his promotion, he began [[to assume airs]] before his old colleagues.", "পদোন্নতির পর সে পুরনো সহকর্মীদের সামনে নিজেকে বড় মনে করতে লাগল।"],
          ["Do not [[assume airs]] just because you won one prize.", "মাত্র একটা পুরস্কার জিতেই অহংকার দেখিয়ো না।"],
          ["She never [[assumes airs]], though she is the director's daughter.", "পরিচালকের মেয়ে হলেও সে কখনো অহংকার দেখায় না।"],
        ],
      },
      {
        idiom: "To stand aloof",
        meaning: "To keep to oneself and not mix with others",
        meaningBn: "নিজের মধ্যে থাকা ও অন্যের সঙ্গে না মেশা",
        n: 234,
        examples: [
          ["At the party, the new boy [[stood aloof]] in a corner.", "অনুষ্ঠানে নতুন ছেলেটি এক কোণে নিজের মধ্যে থাকল।"],
          ["A leader should not [[stand aloof]] from ordinary people.", "একজন নেতার সাধারণ মানুষের থেকে আলাদা থাকা উচিত নয়।"],
          ["She [[stood aloof]] while the others quarrelled.", "অন্যরা ঝগড়া করার সময় সে আলাদা থাকল।"],
        ],
      },
    ],
  },
  {
    num: 47,
    titleBn: "বিয়ের প্রস্তাব",
    titleEn: "The Marriage Proposal",
    storyBn:
      "গ্রামের ছেলে সোহেল শহরে চাকরি পেয়ে বদলে গেল। সে তার প্রেমিকা রুমাকে [[lead to the altar]] করতে চায় — বিয়ে করতে চায়, কিন্তু পরিবারের অমত আছে। রুমার বাবা বললেন, ছেলেটা নাকি আগেও অনেক মিথ্যা বলেছে — সে একটা [[an Ananias]] — মিথ্যাবাদী। সোহেলের বন্ধুরা বলল, রুমার ভাই [[an Apollo]] — নিখুঁত দেহের অধিকারী, কুস্তিগীর; তার সঙ্গে লাগতে যেয়ো না! এই খবরে দুই পরিবারের শান্তি [[upset the apple cart]] হলো — শান্তি নষ্ট হলো। কিন্তু শেষে সোহেল সবার সামনে সত্যি কথাটা প্রমাণ করে দিল: সে কখনো মিথ্যা বলেনি, গুজবটা ছড়িয়েছিল একজন হিংসুটে প্রতিবেশী। দুই পরিবার রাজি হলো, আর বিয়ের দিন সবকিছু সাজানো হলো [[apple pie order]]-এ — নিখুঁত শৃঙ্খলায়।",
    storyEn:
      "Village boy Sohel changed after getting a job in the city. He wants to [[lead]] Rumana [[to the altar]] — to marry her, but the family disagrees. Rumana's father said the boy has told many lies before — he is [[an Ananias]] — a liar. Sohel's friends said, Rumana's brother is [[an Apollo]] — a man with a perfect physique, a wrestler; do not go against him! At this news, the peace of the two families was [[upset]] like [[the apple cart]] — the peace was disturbed. But in the end Sohel proved the truth before everyone: he had never lied; the rumour had been spread by a jealous neighbour. Both families agreed, and on the wedding day everything was arranged in [[apple pie order]] — in perfect order.",
    idioms: [
      {
        idiom: "To lead to the altar",
        meaning: "To marry",
        meaningBn: "বিয়ে করা",
        n: 235,
        examples: [
          ["After five years of friendship, he [[led her to the altar]].", "পাঁচ বছরের বন্ধুত্বের পর সে তাকে বিয়ে করল।"],
          ["The young officer [[led the teacher's daughter to the altar]] in a simple ceremony.", "তরুণ কর্মকর্তা সাধারণ অনুষ্ঠানে শিক্ষকের মেয়েকে বিয়ে করলেন।"],
          ["They met at university and he [[led her to the altar]] last spring.", "বিশ্ববিদ্যালয়ে তাদের দেখা হয় আর গত বসন্তে সে তাকে বিয়ে করল।"],
        ],
      },
      {
        idiom: "An Ananias",
        meaning: "A Liar",
        meaningBn: "মিথ্যাবাদী",
        n: 236,
        examples: [
          ["Nobody trusts him now; everyone calls him [[an Ananias]].", "এখন কেউ তাকে বিশ্বাস করে না; সবাই তাকে মিথ্যাবাদী বলে।"],
          ["The salesman proved to be [[an Ananias]] when the goods turned out false.", "মাল নকল বের হলে বিক্রেতা মিথ্যাবাদী প্রমাণিত হলো।"],
          ["Do not become [[an Ananias]] for small gains.", "ছোট লাভের জন্য মিথ্যাবাদী হয়ো না।"],
        ],
      },
      {
        idiom: "An Apollo",
        meaning: "A Man with Perfect Physique",
        meaningBn: "নিখুঁত দেহের অধিকারী পুরুষ",
        n: 237,
        examples: [
          ["The gym trainer looks like [[an Apollo]].", "জিমের প্রশিক্ষককে নিখুঁত দেহের অধিকারী পুরুষের মতো দেখায়।"],
          ["In his wrestling days, he was called [[an Apollo]] of the district.", "কুস্তির দিনে তাকে জেলার নিখুঁত দেহের পুরুষ বলা হতো।"],
          ["He is tall and strong, truly [[an Apollo]].", "সে লম্বা ও শক্তিশালী, সত্যিই নিখুঁত দেহের অধিকারী।"],
        ],
      },
      {
        idiom: "To Upset the Apple Cart",
        meaning: "To disturb the peace",
        meaningBn: "শান্তি নষ্ট করা",
        n: 238,
        examples: [
          ["His sudden resignation [[upset the apple cart]] of the whole project.", "তার হঠাৎ পদত্যাগ পুরো প্রকল্পের শান্তি নষ্ট করে দিল।"],
          ["Do not [[upset the apple cart]] by raising that old issue now.", "এখন ওই পুরনো বিষয় তুলে শান্তি নষ্ট করো না।"],
          ["The false news [[upset the apple cart]] in the peaceful village.", "মিথ্যা খবর শান্ত গ্রামে শান্তি নষ্ট করে দিল।"],
        ],
      },
      {
        idiom: "Apple Pie Order",
        meaning: "In perfect order",
        meaningBn: "নিখুঁত শৃঙ্খলায়",
        n: 239,
        examples: [
          ["Her kitchen is always in [[apple pie order]].", "তার রান্নাঘর সবসময় নিখুঁত শৃঙ্খলায় থাকে।"],
          ["The librarian keeps every shelf in [[apple pie order]].", "গ্রন্থাগারিক প্রতিটি তাক নিখুঁত শৃঙ্খলায় রাখেন।"],
          ["Before the inspection, the office was put in [[apple pie order]].", "পরিদর্শনের আগে অফিস নিখুঁত শৃঙ্খলায় সাজানো হলো।"],
        ],
      },
    ],
  },
  {
    num: 48,
    titleBn: "গ্রামের সরল জীবন",
    titleEn: "The Simple Village Life",
    storyBn:
      "শহরের ব্যস্ত জীবন ছেড়ে অবসরে গ্রামে ফিরলেন শিক্ষক হরেন বাবু। তিনি বলেন, [[arcadian life]] — আনন্দময়, সরল গ্রাম্য জীবনই আসল শান্তি। যৌবনে তিনি সেনাবাহিনীতে ছিলেন; দেশের জন্য [[took up arms]] — অস্ত্র ধরেছিলেন। এখন তিনি বলেন, জীবনের সবচেয়ে কঠিন কাজ — [[to break the back of anything]] — তিনি যৌবনেই করে ফেলেছেন: নিজের অহংকার ভাঙা। গ্রামের এক যুবক অন্যের নামে [[backbites]] — পেছনে খারাপ কথা বলে; হরেন বাবু তাকে বুঝিয়ে বললেন, পরনিন্দা মানুষকে ছোট করে। তিনি আরও বললেন, যারা অন্যের ভালো কাজে সাহায্যের ভান করে, তাদের অনেকের মনেই [[to grind]] থাকে — নিজের স্বার্থপর উদ্দেশ্য লুকিয়ে রাখে; সাবধানে মানুষ চিনবে। যুবকটা লজ্জা পেয়ে স্বভাব বদলাল।",
    storyEn:
      "Leaving the busy life of the city, teacher Haren Babu returned to the village in retirement. He says, [[arcadian life]] — a blissful, happy, rural and simple life — is real peace. In his youth he was in the army; for the country he [[took up arms]] — he fought. Now he says, the most difficult part of life — [[to break the back of]] anything — he has already done in his youth: breaking his own pride. A village youth [[backbites]] others — speaks badly about people behind their backs; Haren Babu explained to him that backbiting makes a person small. He also said, many who pretend to help others' good work have something [[to grind]] in their minds — they hide a selfish objective of their own; know people carefully. The youth felt ashamed and changed his habit.",
    idioms: [
      {
        idiom: "Arcadian Life",
        meaning: "A blissful, happy, rural and simple life",
        meaningBn: "আনন্দময়, সুখী, গ্রাম্য ও সরল জীবন",
        n: 240,
        examples: [
          ["After retirement, the poet chose an [[arcadian life]] in his village.", "অবসরের পর কবি তার গ্রামে সরল গ্রাম্য জীবন বেছে নিলেন।"],
          ["They dream of an [[arcadian life]] away from the noise of the city.", "তারা শহরের কোলাহল থেকে দূরে সরল গ্রাম্য জীবনের স্বপ্ন দেখে।"],
          ["An [[arcadian life]] needs little money but much peace.", "সরল গ্রাম্য জীবনে টাকা কম লাগে, কিন্তু শান্তি লাগে অনেক।"],
        ],
      },
      {
        idiom: "To take up arms",
        meaning: "To fight or go to the war",
        meaningBn: "অস্ত্র ধরা / যুদ্ধে যাওয়া",
        n: 241,
        examples: [
          ["In 1971, students and farmers [[took up arms]] for the country.", "১৯৭১ সালে ছাত্র ও কৃষক দেশের জন্য অস্ত্র ধরেছিল।"],
          ["The villagers [[took up arms]] against the robbers.", "গ্রামবাসী ডাকাতদের বিরুদ্ধে অস্ত্র ধরল।"],
          ["He [[took up arms]] at the age of eighteen.", "সে আঠারো বছর বয়সে যুদ্ধে গেল।"],
        ],
      },
      {
        idiom: "To Grind",
        meaning: "To have some selfish objective in view",
        meaningBn: "মনে স্বার্থপর উদ্দেশ্য থাকা",
        n: 242,
        examples: [
          ["He helps the chairman only because he has an axe [[to grind]] of his own.", "সে চেয়ারম্যানকে সাহায্য করে শুধু কারণ তার নিজের স্বার্থপর উদ্দেশ্য আছে।"],
          ["Beware of flatterers; each has something [[to grind]] for himself.", "তোষামোদকারীদের থেকে সাবধান; প্রত্যেকের নিজের স্বার্থপর উদ্দেশ্য আছে।"],
          ["Her sudden kindness made me suspect she had an interest [[to grind]].", "তার হঠাৎ সদয়তা দেখে আমার সন্দেহ হলো তার মনে স্বার্থপর উদ্দেশ্য আছে।"],
        ],
      },
      {
        idiom: "To break the back of anything",
        meaning: "To perform the most difficult part",
        meaningBn: "সবচেয়ে কঠিন অংশটি করা",
        n: 243,
        examples: [
          ["We have [[broken the back of]] the work; only the finishing remains.", "আমরা কাজের সবচেয়ে কঠিন অংশটা করে ফেলেছি; শুধু শেষ ছোঁয়া বাকি।"],
          ["By noon, the farmers had [[broken the back of]] the harvesting.", "দুপুরের মধ্যে কৃষকেরা ফসল কাটার সবচেয়ে কঠিন অংশটা শেষ করলেন।"],
          ["Once you [[break the back of]] the syllabus, revision becomes easy.", "পাঠ্যক্রমের সবচেয়ে কঠিন অংশটা শেষ করলেই পুনরালোচনা সহজ হয়।"],
        ],
      },
      {
        idiom: "To backbite a person",
        meaning: "To speak badly about someone behind their back",
        meaningBn: "কারো পেছনে খারাপ কথা বলা",
        n: 244,
        examples: [
          ["It is a bad habit [[to backbite]] your colleagues.", "সহকর্মীদের পেছনে খারাপ কথা বলা খারাপ অভ্যাস।"],
          ["She never [[backbites]] anyone, and everyone trusts her.", "সে কখনো কারো পেছনে খারাপ কথা বলে না, আর সবাই তাকে বিশ্বাস করে।"],
          ["Those who [[backbite]] others lose their own respect.", "যারা অন্যের পেছনে খারাপ কথা বলে, তারা নিজেদের সম্মান হারায়।"],
        ],
      },
    ],
  },
  {
    num: 49,
    titleBn: "প্রবাসের ব্যাগ",
    titleEn: "The Expatriate's Bag",
    storyBn:
      "প্রবাসে যাওয়ার দিন রফিক [[bag and baggage]] রওনা হলো — সব জিনিসপত্রসহ। মা বললেন, ওখানে গিয়ে কাজটা [[keep the ball rolling]] রাখবে — কাজ চালিয়ে যাবে, থামবে না। রফিকের এক বন্ধু তাকে বলেছিল, প্রবাসে নাকি টাকার গাছ আছে; রফিক পরে বুঝল সেটা ছিল [[barmecide feast]] — কাল্পনিক সুবিধা, আসলে কঠোর পরিশ্রম ছাড়া কিছু নেই। বিমানবন্দর থেকে বাসা পর্যন্ত সে [[bee-line]] পথে গেল — সবচেয়ে কম দূরত্বের পথে। প্রথম মাসে মালিক তার সঙ্গে খারাপ ব্যবহার করলে রফিক বুঝল, [[he has no backbone]] হলে চলবে না — নিজের ইচ্ছাশক্তি থাকতে হবে; সে ভদ্রভাবে নিজের অধিকারের কথা বলল। ধীরে ধীরে সব ঠিক হয়ে গেল।",
    storyEn:
      "On the day of leaving for abroad, Rafiq set out [[bag and baggage]] — with all his belongings. Mother said, after going there, [[keep the ball rolling]] with your work — keep things going, do not stop. A friend of Rafiq had told him there is a money tree abroad; Rafiq later understood that was a [[barmecide feast]] — imaginary benefits; in reality there is nothing without hard work. From the airport to his home he went by the [[bee-line]] — the shortest distance between two places. In the first month, when the owner behaved badly with him, Rafiq understood that being a man who [[has no backbone]] will not do — he must have a will of his own; he politely spoke of his rights. Slowly everything became fine.",
    idioms: [
      {
        idiom: "He has no backbone",
        meaning: "He has no will of his own",
        meaningBn: "তার নিজের কোনো ইচ্ছাশক্তি নেই",
        n: 245,
        examples: [
          ["A manager who [[has no backbone]] cannot control a big team.", "যে ম্যানেজারের নিজের ইচ্ছাশক্তি নেই, সে বড় দল নিয়ন্ত্রণ করতে পারে না।"],
          ["Do not say he [[has no backbone]]; he is only very polite.", "বোলো না তার ইচ্ছাশক্তি নেই; সে শুধু খুব ভদ্র।"],
          ["People respect a leader who [[has a backbone]] and keeps his word.", "মানুষ সেই নেতাকে সম্মান করে যার ইচ্ছাশক্তি আছে আর যে কথা রাখে।"],
        ],
      },
      {
        idiom: "To cause bad blood",
        meaning: "To Cause Enmity",
        meaningBn: "শত্রুতা সৃষ্টি করা",
        n: 246,
        examples: [
          ["The land dispute [[caused bad blood]] between the two brothers.", "জমির বিবাদ দুই ভাইয়ের মধ্যে শত্রুতা সৃষ্টি করল।"],
          ["Harsh words in a meeting can [[cause bad blood]] for years.", "সভায় কঠোর কথা বছরের পর বছর শত্রুতা সৃষ্টি করতে পারে।"],
          ["The chairman apologised early so that the matter would not [[cause bad blood]].", "চেয়ারম্যান আগেভাগে ক্ষমা চাইলেন যাতে বিষয়টা শত্রুতা সৃষ্টি না করে।"],
        ],
      },
      {
        idiom: "Bag and Baggage",
        meaning: "With all one's belongings",
        meaningBn: "সব জিনিসপত্রসহ",
        n: 247,
        examples: [
          ["The tenant left the house [[bag and baggage]] at midnight.", "ভাড়াটিয়া মধ্যরাতে সব জিনিসপত্রসহ বাড়ি ছেড়ে গেল।"],
          ["After the flood, the family moved to the shelter [[bag and baggage]].", "বন্যার পর পরিবারটি সব জিনিসপত্রসহ আশ্রয়কেন্দ্রে গেল।"],
          ["He was transferred and shifted [[bag and baggage]] to the new district.", "তাকে বদলি করা হলো আর সে সব জিনিসপত্রসহ নতুন জেলায় চলে গেল।"],
        ],
      },
      {
        idiom: "To keep the ball rolling",
        meaning: "To keep things going",
        meaningBn: "কাজ চালিয়ে যাওয়া",
        n: 248,
        examples: [
          ["Even with few students, the teacher [[kept the ball rolling]] at the night school.", "ছাত্র কম হলেও শিক্ষক নাইট স্কুলের কাজ চালিয়ে গেলেন।"],
          ["Someone must [[keep the ball rolling]] while the manager is on leave.", "ম্যানেজার ছুটিতে থাকলে কাউকে কাজ চালিয়ে যেতে হবে।"],
          ["Her jokes [[kept the ball rolling]] at the dull party.", "তার কৌতুক একঘেয়ে অনুষ্ঠানে আড্ডা চালিয়ে রাখল।"],
        ],
      },
      {
        idiom: "Barmecide feast",
        meaning: "Imaginary Benefits",
        meaningBn: "কাল্পনিক সুবিধা",
        n: 249,
        examples: [
          ["The agent's promise of a high salary abroad proved a [[barmecide feast]].", "এজেন্টের বিদেশে বেশি বেতনের প্রতিশ্রুতি কাল্পনিক সুবিধা বলে প্রমাণিত হলো।"],
          ["Do not run after a [[barmecide feast]]; take the real offer in hand.", "কাল্পনিক সুবিধার পেছনে ছুটো না; হাতের আসল প্রস্তাবটা নাও।"],
          ["His grand business plan was only a [[barmecide feast]] for his partners.", "তার বড় ব্যবসার পরিকল্পনা অংশীদারদের জন্য ছিল শুধু কাল্পনিক সুবিধা।"],
        ],
      },
    ],
  },
  {
    num: 50,
    titleBn: "গোপন বৈঠক",
    titleEn: "The Secret Meeting",
    storyBn:
      "গ্রামের স্কুলের জন্য জমি দান করা নিয়ে দুই পক্ষের মধ্যে [[behind the scenes]] আলোচনা চলছিল — গোপনে। জমিদারের ছেলে জমিটা দিতে রাজি, কিন্তু সে চায় বিষয়টা [[behind his father's back]] না হোক — বাবার অজান্তে নয়; বাবাকে জানিয়েই হবে। সভায় একজন বলল, খেলার মাঠের প্রতিযোগিতায় অন্যায় করা মানে [[hit below the belt]] — প্রতিযোগিতায় অন্যায় আচরণ; স্কুলের কাজেও অন্যায় চলবে না। পুরনো জমিদার যুদ্ধের সময় [[bit the dust]] হয়েছিলেন — যুদ্ধে পরাজিত হয়েছিলেন শত্রুর হাতে, তাই তিনি শান্তির মূল্য জানতেন। তার কথায় সবাই রাজি হলো: জমি স্কুলের নামেই যাবে। সভা শেষে জমিদারের ছেলে [[bee-line]] পথে — সবচেয়ে কম দূরত্বের সোজা পথে — বাবার কাছে গিয়ে সুখবরটা দিল।",
    storyEn:
      "About donating land for the village school, discussion was going on [[behind the scenes]] between two sides — in private. The landlord's son agreed to give the land, but he wanted the matter not to happen [[behind his father's back]] — without his father's knowledge; it would happen by informing his father. At the meeting someone said, doing injustice in a playground competition means to [[hit below the belt]] — to act unfairly in a contest; injustice will not do in the school's work either. The old landlord had [[bitten the dust]] during the war — he had been defeated in battle by the enemy, so he knew the value of peace. At his word, everyone agreed: the land will go in the school's name. After the meeting, the landlord's son made a [[bee-line]] — he went by the shortest, straightest path — to his father and gave him the good news.",
    idioms: [
      {
        idiom: "Bee-line",
        meaning: "The shortest distance between two places",
        meaningBn: "দুটি জায়গার মধ্যে সবচেয়ে কম দূরত্ব",
        n: 250,
        examples: [
          ["The crow flew in a [[bee-line]] to its nest.", "কাকটা সোজা সবচেয়ে কম দূরত্বের পথে তার বাসায় উড়ে গেল।"],
          ["He made a [[bee-line]] for the ticket counter as soon as the train came.", "ট্রেন আসতেই সে সোজা টিকিট কাউন্টারের দিকে গেল।"],
          ["The children made a [[bee-line]] to the mango tree.", "শিশুরা সোজা আম গাছের দিকে ছুটল।"],
        ],
      },
      {
        idiom: "Behind one's back",
        meaning: "Without one's Knowledge",
        meaningBn: "কারো অজান্তে",
        n: 251,
        examples: [
          ["He sold the cow [[behind his father's back]].", "সে তার বাবার অজান্তে গাভীটা বিক্রি করে দিল।"],
          ["True friends never speak ill of you [[behind your back]].", "আসল বন্ধুরা কখনো তোমার অজান্তে তোমার নামে খারাপ কথা বলে না।"],
          ["The clerk changed the file [[behind the officer's back]].", "কেরানি কর্মকর্তার অজান্তে ফাইলটা বদলে দিল।"],
        ],
      },
      {
        idiom: "Behind the scenes",
        meaning: "In Private",
        meaningBn: "গোপনে",
        n: 252,
        examples: [
          ["Much work happens [[behind the scenes]] before a programme begins.", "অনুষ্ঠান শুরুর আগে গোপনে অনেক কাজ হয়।"],
          ["The two leaders settled the matter [[behind the scenes]].", "দুই নেতা গোপনে বিষয়টা মিটিয়ে নিলেন।"],
          ["Volunteers work [[behind the scenes]] to make the fair successful.", "স্বেচ্ছাসেবকেরা মেলা সফল করতে পর্দার আড়ালে কাজ করে।"],
        ],
      },
      {
        idiom: "To hit below the belt",
        meaning: "To act unfairly in a contest",
        meaningBn: "প্রতিযোগিতায় অন্যায় আচরণ করা",
        n: 253,
        examples: [
          ["Spreading a false rumour about a rival is [[hitting below the belt]].", "প্রতিদ্বন্দ্বী সম্পর্কে মিথ্যা গুজব ছড়ানো প্রতিযোগিতায় অন্যায় আচরণ।"],
          ["In debate, attacking someone's family is [[hitting below the belt]].", "বিতর্কে কারো পরিবার আক্রমণ করা অন্যায় আচরণ।"],
          ["The boxer was warned for [[hitting below the belt]].", "বক্সারকে অন্যায় আঘাতের জন্য সতর্ক করা হলো।"],
        ],
      },
      {
        idiom: "To bite the dust",
        meaning: "To be Defeated in Battle",
        meaningBn: "যুদ্ধে পরাজিত হওয়া",
        n: 254,
        examples: [
          ["Many brave soldiers [[bit the dust]] in the war of liberation.", "মুক্তিযুদ্ধে অনেক সাহসী সৈনিক যুদ্ধে প্রাণ দিলেন।"],
          ["The champion finally [[bit the dust]] against the young player.", "চ্যাম্পিয়ন অবশেষে তরুণ খেলোয়াড়ের কাছে পরাজিত হলো।"],
          ["His old car [[bit the dust]] on the highway and never ran again.", "তার পুরনো গাড়ি মহাসড়কে নষ্ট হয়ে গেল আর কখনো চলল না।"],
        ],
      },
    ],
  },
  {
    num: 51,
    titleBn: "বিদায়ের আগের দিন",
    titleEn: "The Day Before Farewell",
    storyBn:
      "কলেজের বিদায় অনুষ্ঠানের আগের দিন সবাই ব্যস্ত। সিনিয়র আপা মিতা একজন [[a blue stocking]] — বিদ্বান, শিক্ষিত মহিলা; তিনি অনুষ্ঠানের বক্তব্য লিখে দিলেন। নতুন ছাত্ররা তাকে [[at first blush]] দেখে ভয় পেল — প্রথম দৃষ্টিতে কঠোর মনে হলো, কিন্তু আসলে তিনি খুব সদয়। অনুষ্ঠানে একজন ছাত্র ছিল [[a wet blanket]] — আনন্দ নিরুৎসাহিত করে এমন মানুষ; সে বারবার বলছিল, এইসব অনুষ্ঠান করে লাভ কী! তবু সবাই কাজ চালিয়ে গেল। অধ্যক্ষ বললেন, শিক্ষকতা শুধু পেশা নয়, এটা আমার [[bread and butter]] — জীবিকার উপায়ের চেয়েও বেশি, আমার গর্ব। পুরনো শিক্ষক রহিম স্যার এই বছরই [[breathed his last]] — মারা গেলেন; তার স্মৃতিতে এক মিনিট নীরবতা পালন করা হলো।",
    storyEn:
      "The day before the college farewell programme, everyone was busy. Senior sister Mita is [[a blue stocking]] — a learned, educated woman; she wrote the programme's speeches. The new students feared her [[at first blush]] — at first sight she seemed strict, but actually she is very kind. At the programme, one student was [[a wet blanket]] — a person who discourages enjoyment; he kept saying, what is the use of such programmes! Still everyone carried on with the work. The principal said, teaching is not only a profession; it is my [[bread and butter]] — more than my means of livelihood, it is my pride. Old teacher Rahim Sir [[breathed his last]] this very year — he died; one minute of silence was observed in his memory.",
    idioms: [
      {
        idiom: "A Wet Blanket",
        meaning: "A person who discourages enjoyment or enthusiasm",
        meaningBn: "আনন্দ বা উৎসাহ নিরুৎসাহিত করে এমন ব্যক্তি",
        n: 255,
        examples: [
          ["Do not be [[a wet blanket]] at the picnic; join the fun.", "পিকনিকে আনন্দ নষ্ট করো না; মজায় যোগ দাও।"],
          ["His negative comments made him [[a wet blanket]] at every meeting.", "তার নেতিবাচক মন্তব্য তাকে প্রতিটি সভায় আনন্দ-নষ্টকারী করে তুলল।"],
          ["The rainy weather was [[a wet blanket]] on our holiday plans.", "বৃষ্টির আবহাওয়া আমাদের ছুটির পরিকল্পনায় পানি ঢেলে দিল।"],
        ],
      },
      {
        idiom: "A blue Stocking",
        meaning: "A learned/educated or intellectual woman",
        meaningBn: "বিদ্বান/শিক্ষিত বা বুদ্ধিজীবী মহিলা",
        n: 257,
        examples: [
          ["Our literature teacher is known as [[a blue stocking]] in the town.", "আমাদের সাহিত্যের শিক্ষক শহরে বিদ্বান মহিলা হিসেবে পরিচিত।"],
          ["She is [[a blue stocking]] who has written three books on history.", "তিনি একজন বিদ্বান মহিলা, যিনি ইতিহাস নিয়ে তিনটি বই লিখেছেন।"],
          ["The [[blue stocking]] of the family, she answers every difficult question.", "পরিবারের বিদ্বান মহিলা হিসেবে সে প্রতিটি কঠিন প্রশ্নের উত্তর দেয়।"],
        ],
      },
      {
        idiom: "At First Blush",
        meaning: "At first sight",
        meaningBn: "প্রথম দৃষ্টিতে",
        n: 258,
        examples: [
          ["[[At first blush]], the plan looked perfect, but later we found many faults.", "প্রথম দৃষ্টিতে পরিকল্পনাটা নিখুঁত মনে হলেও পরে আমরা অনেক ত্রুটি পেলাম।"],
          ["The house seemed small [[at first blush]], but inside it is spacious.", "বাড়িটা প্রথম দৃষ্টিতে ছোট মনে হলেও ভেতরে প্রশস্ত।"],
          ["[[At first blush]], his offer appeared generous.", "প্রথম দৃষ্টিতে তার প্রস্তাব উদার মনে হলো।"],
        ],
      },
      {
        idiom: "One's bread and butter",
        meaning: "One's means of livelihood",
        meaningBn: "জীবিকার উপায়",
        n: 260,
        examples: [
          ["For a rickshaw puller, his rickshaw is his [[bread and butter]].", "রিকশাচালকের কাছে তার রিকশাই তার জীবিকার উপায়।"],
          ["Fishing is the [[bread and butter]] of the coastal families.", "মাছ ধরাই উপকূলের পরিবারগুলোর জীবিকার উপায়।"],
          ["Do not risk your [[bread and butter]] for a small extra gain.", "ছোট বাড়তি লাভের জন্য তোমার জীবিকার উপায় ঝুঁকিতে ফেলো না।"],
        ],
      },
      {
        idiom: "To breathe one’s last",
        meaning: "To Die",
        meaningBn: "মারা যাওয়া",
        n: 261,
        examples: [
          ["The old freedom fighter [[breathed his last]] at the age of ninety.", "বৃদ্ধ মুক্তিযোদ্ধা নব্বই বছর বয়সে মারা গেলেন।"],
          ["She [[breathed her last]] peacefully in her sleep.", "তিনি ঘুমের মধ্যে শান্তিতে মারা গেলেন।"],
          ["The great poet [[breathed his last]] in this very house.", "মহান কবি এই বাড়িতেই মারা গিয়েছিলেন।"],
        ],
      },
    ],
  },
  {
    num: 52,
    titleBn: "খড় ছাড়া ইট",
    titleEn: "Bricks Without Straw",
    storyBn:
      "গ্রামে একটা পাঠাগার বানানোর কাজ শুরু হলো, কিন্তু টাকা কম। ঠিকাদার বললেন, এত কম টাকায় কাজ করা মানে [[to make bricks without straw]] — উপযুক্ত উপকরণ ছাড়া কাজ করার চেষ্টা। তবু গ্রামের মানুষ হাল ছাড়ল না। পুরনো স্কুলের প্রধান শিক্ষক বললেন, জীবনটাই এমন — অনেকে চেষ্টা করে, কেউ [[kicks the bucket]] পর্যন্ত কাজ করে যায় — মারা যাওয়া পর্যন্ত মানুষের জন্য কাজ করে। পাঠাগারের জন্য বই সংগ্রহ শুরু হলো; একজন বইবিক্রেতা বললেন, [[good wine needs no bush]] — ভালো জিনিসের বিজ্ঞাপন লাগে না; ভালো বই নিজেই পাঠক টানবে। যুবক সেলিম দিনরাত কাজ করে [[burned the candle at both ends]] — একই সঙ্গে দুই দিকে শক্তি ব্যয় করল: দিনে রাজমিস্ত্রির কাজ, রাতে হিসাব। বড়রা তাকে সাবধান করলেন, শরীর ভেঙে পড়লে সব শেষ। ঠিকাদার সাহেব একদিন সেলিমের কাজের সমালোচনা করলে গ্রামের এক প্রবীণ হেসে বললেন, [[if the cap fits, wear it]] — মন্তব্য যদি তোমার সম্পর্কে হয়, তবে সমালোচনা মেনে নাও; সেলিম বুঝল, সমালোচনা শুনে কাজ আরও ভালো করতে হয়।",
    storyEn:
      "Work began to build a library in the village, but money was short. The contractor said, working with so little money means [[to make bricks without straw]] — to attempt something without proper materials. Still the villagers did not give up. The old school headmaster said, life itself is like this — many people keep trying; some keep working for others until they [[kick the bucket]] — until they die. Collection of books for the library began; a bookseller said, [[good wine needs no bush]] — there is no need to advertise something good; good books will draw readers themselves. Young Selim worked day and night and [[burned the candle at both ends]] — expended energy in two directions at the same time: mason's work by day, accounts by night. The elders warned him: if your body breaks down, everything ends. One day, when the contractor criticised Selim's work, a village elder smiled and said, [[if the cap fits, wear it]] — if you think the remarks refer to you, then accept the criticism; Selim understood that hearing criticism, one must do the work even better.",
    idioms: [
      {
        idiom: "To make bricks without straw",
        meaning: "To attempt to do something without proper materials",
        meaningBn: "উপযুক্ত উপকরণ ছাড়া কিছু করার চেষ্টা করা",
        n: 262,
        examples: [
          ["Teaching science without a laboratory is [[making bricks without straw]].", "পরীক্ষাগার ছাড়া বিজ্ঞান শেখানো মানে উপকরণ ছাড়া কাজের চেষ্টা।"],
          ["The poor farmer tried [[to make bricks without straw]] with one broken plough.", "গরিব কৃষক একটা ভাঙা লাঙল দিয়ে উপকরণ ছাড়াই কাজের চেষ্টা করল।"],
          ["Do not ask the cook [[to make bricks without straw]]; buy the ingredients first.", "রাঁধুনিকে উপকরণ ছাড়া কাজ করতে বোলো না; আগে উপকরণ কেনো।"],
        ],
      },
      {
        idiom: "To kick the bucket",
        meaning: "To die",
        meaningBn: "মারা যাওয়া",
        n: 263,
        examples: [
          ["The old mango tree finally [[kicked the bucket]] in the storm.", "পুরনো আম গাছটা অবশেষে ঝড়ে মরে গেল।"],
          ["His ancient radio [[kicked the bucket]] last night.", "তার প্রাচীন রেডিওটা গত রাতে নষ্ট হয়ে গেল।"],
          ["The miser saved all his life and [[kicked the bucket]] without enjoying a taka.", "কৃপণটা সারাজীবন জমিয়ে এক টাকাও উপভোগ না করে মারা গেল।"],
        ],
      },
      {
        idiom: "Good wine needs no bush",
        meaning: "There is no need to advertise something good",
        meaningBn: "ভালো জিনিসের বিজ্ঞাপন লাগে না",
        n: 264,
        examples: [
          ["Her small sweet shop has no signboard, yet customers crowd it — [[good wine needs no bush]].", "তার ছোট মিষ্টির দোকানে সাইনবোর্ড নেই, তবু ক্রেতার ভিড় — ভালো জিনিসের বিজ্ঞাপন লাগে না।"],
          ["A truly honest trader proves that [[good wine needs no bush]].", "সত্যিকারের সৎ ব্যবসায়ী প্রমাণ করেন ভালো জিনিসের বিজ্ঞাপন লাগে না।"],
          ["The teacher's fame spread by word of mouth; [[good wine needs no bush]].", "শিক্ষকের সুনাম মুখে মুখে ছড়াল; ভালো জিনিসের বিজ্ঞাপন লাগে না।"],
        ],
      },
      {
        idiom: "To burn the candle at both ends",
        meaning: "To expend energy in two directions at the same time",
        meaningBn: "একই সঙ্গে দুই দিকে শক্তি ব্যয় করা",
        n: 265,
        examples: [
          ["Studying all night and working all day, she is [[burning the candle at both ends]].", "সারারাত পড়ে আর সারাদিন কাজ করে সে একই সঙ্গে দুই দিকে শক্তি ব্যয় করছে।"],
          ["If you [[burn the candle at both ends]], you will fall ill before the exam.", "দুই দিকে শক্তি ব্যয় করলে পরীক্ষার আগেই তুমি অসুস্থ হয়ে পড়বে।"],
          ["The young officer [[burned the candle at both ends]] and soon needed rest.", "তরুণ কর্মকর্তা দুই দিকে শক্তি ব্যয় করে শীঘ্রই বিশ্রামের প্রয়োজন বোধ করলেন।"],
        ],
      },
      {
        idiom: "If the cap fits, wear it",
        meaning: "If you think the remarks refer to you, then accept the criticism",
        meaningBn: "মন্তব্য তোমার সম্পর্কে হলে সমালোচনা মেনে নাও",
        n: 266,
        examples: [
          ["I did not name anyone; [[if the cap fits, wear it]].", "আমি কারো নাম বলিনি; মন্তব্য তোমার সম্পর্কে মনে হলে সমালোচনা মেনে নাও।"],
          ["He became angry at the general remark — clearly [[the cap fitted]] him.", "সাধারণ মন্তব্যে সে রেগে গেল — স্পষ্টতই মন্তব্যটা তার সম্পর্কেই ছিল।"],
          ["The teacher said lazy students should wake up; [[if the cap fits, wear it]].", "শিক্ষক বললেন অলস ছাত্রদের জাগা উচিত; যার সম্পর্কে প্রযোজ্য, সে মেনে নিক।"],
        ],
      },
    ],
  },
  {
    num: 53,
    titleBn: "দুশ্চিন্তার বিড়াল",
    titleEn: "The Cat of Worry",
    storyBn:
      "বৃদ্ধা দাদি তার নাতনিকে সবসময় বলেন, [[care killed the cat]] — দুশ্চিন্তা করে নিজেকে শেষ করে ফেলো না। নাতনি রুবি পরীক্ষা নিয়ে এত দুশ্চিন্তা করে যে খাওয়া-ঘুম ছেড়ে দিয়েছে। একদিন বাজারে গিয়ে একটা রঙিন শাড়ি রুবির [[caught her eye]] — মনোযোগ আকর্ষণ করল; সে হেসে ফেলল অনেক দিন পর। সন্ধ্যায় গ্রামের সভায় চাচা [[took the chair]] — সভায় সভাপতিত্ব করলেন। সভায় এক মহিলা সম্পর্কে কেউ বলল, [[she is no chicken]] — সে যতটা বলে তার চেয়ে বয়সে বড়, তবু তার অভিজ্ঞতাই গ্রামের সম্পদ। রুবি বুঝল, বই মুখস্থ করার আগে দরকার মনের শান্তি; সে প্রতিটি বিষয় [[pick and choose]] করে পড়তে লাগল — যত্নে বেছে নিয়ে।",
    storyEn:
      "Old grandmother always tells her granddaughter, [[care killed the cat]] — do not fret and worry yourself to death. Granddaughter Rubi worries so much about the exam that she has given up eating and sleeping properly. One day, going to the market, a colourful saree [[caught her eye]] — it attracted her attention; she laughed after many days. In the evening village meeting, uncle [[took the chair]] — he presided over the meeting. At the meeting someone said about a woman, [[she is no chicken]] — she is older than she says, yet her experience is the village's wealth. Rubi understood: before memorising books, peace of mind is needed; she began to study by [[picking and choosing]] each topic — making a careful selection.",
    idioms: [
      {
        idiom: "Care killed the cat",
        meaning: "Don’t fret and worry yourself to death",
        meaningBn: "দুশ্চিন্তা করে নিজেকে শেষ করে ফেলো না",
        n: 267,
        examples: [
          ["Stop worrying about the result; remember, [[care killed the cat]].", "ফলাফল নিয়ে দুশ্চিন্তা বন্ধ করো; মনে রেখো, দুশ্চিন্তা মানুষকে শেষ করে দেয়।"],
          ["He frets over every small thing — truly, [[care killed the cat]].", "সে প্রতিটি ছোট বিষয়ে দুশ্চিন্তা করে — সত্যিই, দুশ্চিন্তাই তার ক্ষতি।"],
          ["Work hard but do not worry endlessly; [[care killed the cat]].", "কঠোর পরিশ্রম করো, কিন্তু অশেষ দুশ্চিন্তা করো না; দুশ্চিন্তা করে নিজেকে শেষ করো না।"],
        ],
      },
      {
        idiom: "To Catch one's eye",
        meaning: "To attract attention",
        meaningBn: "মনোযোগ আকর্ষণ করা",
        n: 268,
        examples: [
          ["A red bicycle in the shop window [[caught his eye]].", "দোকানের জানালায় একটা লাল সাইকেল তার মনোযোগ আকর্ষণ করল।"],
          ["The headline [[caught her eye]] as she turned the newspaper page.", "খবরের কাগজের পাতা ওল্টাতে শিরোনামটা তার মনোযোগ আকর্ষণ করল।"],
          ["Try to [[catch the teacher's eye]] if you have a question.", "প্রশ্ন থাকলে শিক্ষকের মনোযোগ আকর্ষণ করার চেষ্টা করো।"],
        ],
      },
      {
        idiom: "To take the chair",
        meaning: "To preside a meeting",
        meaningBn: "সভায় সভাপতিত্ব করা",
        n: 269,
        examples: [
          ["The eldest member [[took the chair]] at the village meeting.", "সবচেয়ে প্রবীণ সদস্য গ্রামের সভায় সভাপতিত্ব করলেন।"],
          ["Our principal will [[take the chair]] at tomorrow's seminar.", "আমাদের অধ্যক্ষ আগামীকালের সেমিনারে সভাপতিত্ব করবেন।"],
          ["When the chairman is absent, the vice-chairman [[takes the chair]].", "সভাপতি অনুপস্থিত থাকলে সহ-সভাপতি সভাপতিত্ব করেন।"],
        ],
      },
      {
        idiom: "She is no chicken",
        meaning: "She is older than she says",
        meaningBn: "সে যতটা বলে তার চেয়ে বয়সে বড়",
        n: 270,
        examples: [
          ["Do not treat her like a child; [[she is no chicken]].", "তাকে শিশুর মতো আচরণ করো না; সে যতটা বলে তার চেয়ে বয়সে বড়।"],
          ["The actress claims to be twenty-five, but [[she is no chicken]].", "অভিনেত্রী পঁচিশ বছর বয়স দাবি করেন, কিন্তু তিনি তার চেয়ে বয়সে বড়।"],
          ["Grandmother may look young, but [[she is no chicken]] — she is eighty.", "দাদিকে তরুণ দেখালেও তিনি যতটা মনে হয় তার চেয়ে বয়সে বড় — তার বয়স আশি।"],
        ],
      },
      {
        idiom: "To pick and choose",
        meaning: "To make a careful selection",
        meaningBn: "যত্নে বেছে নেওয়া",
        n: 271,
        examples: [
          ["At the book fair, she took an hour to [[pick and choose]] ten books.", "বইমেলায় সে দশটা বই যত্নে বেছে নিতে এক ঘণ্টা নিল।"],
          ["When jobs are few, you cannot [[pick and choose]] too much.", "চাকরি কম থাকলে খুব বেশি বেছে নেওয়া যায় না।"],
          ["He [[picked and chose]] the best mangoes from the basket.", "সে ঝুড়ি থেকে যত্নে সেরা আমগুলো বেছে নিল।"],
        ],
      },
    ],
  },
  {
    num: 54,
    titleBn: "মেঘের রূপালি ধার",
    titleEn: "The Silver Edge of the Cloud",
    storyBn:
      "পাহাড়ে বেড়াতে গিয়ে দুই বন্ধু বৃত্তকে বর্গ করার মতো অসম্ভব পরিকল্পনা করল — তারা এক দিনে পুরো পাহাড় ঘুরবে! অভিজ্ঞ গাইড হেসে বললেন, এটা [[to square the circle]] — অসম্ভব কিছুর চেষ্টা। সন্ধ্যায় বৃষ্টি এলে তাদের মন খারাপ হলো, কিন্তু গাইড বললেন, [[every cloud has a silver lining]] — খারাপ অবস্থা চিরদিন থাকে না; বৃষ্টির পর পাহাড় সবচেয়ে সুন্দর হয়। পরদিন সকালে সত্যিই রোদ উঠল। গ্রামের হাটে একজন [[close fisted]] দোকানি — কৃপণ — তাদের কাছে পানির দাম বেশি চাইল; গাইড বললেন, জীবনে [[cut your cloth according to your cloth]] — আয়ের মধ্যে চলতে শেখো, অপচয় নয়। এক বন্ধু [[cock sure]] ছিল — সম্পূর্ণ নিশ্চিত ছিল যে বৃষ্টি আর আসবে না; গাইড হেসে বললেন, পাহাড়ের আবহাওয়া নিয়ে এত নিশ্চিত হতে নেই। বন্ধু দুজন সেই যাত্রা থেকে জীবনের বড় পাঠ নিয়ে ফিরল।",
    storyEn:
      "Going to travel in the hills, two friends made an impossible plan — they would tour the whole hill in one day! The experienced guide laughed and said, this is [[to square the circle]] — to attempt something impossible. In the evening, when rain came, their minds became sad, but the guide said, [[every cloud has a silver lining]] — adverse conditions do not last forever; after rain the hill is most beautiful. The next morning the sun truly rose. At the village market, a [[close fisted]] shopkeeper — a mean man — asked a high price for water from them; the guide said, in life learn to [[cut your cloth according to your cloth]] — live within your income, not wastefully. One friend was [[cock sure]] — perfectly certain that the rain would not come again; the guide smiled and said, one should not be so certain about hill weather. The two friends returned from that journey with a great lesson of life.",
    idioms: [
      {
        idiom: "To square the circle",
        meaning: "To attempt something impossible",
        meaningBn: "অসম্ভব কিছুর চেষ্টা করা",
        n: 272,
        examples: [
          ["Trying to please everyone is like trying [[to square the circle]].", "সবাইকে খুশি করার চেষ্টা অসম্ভব কিছুর চেষ্টার মতো।"],
          ["He spent years trying [[to square the circle]] of working full-time and studying full-time.", "সে বছরের পর বছর পূর্ণকালীন চাকরি আর পূর্ণকালীন পড়ার অসম্ভব সমন্বয়ের চেষ্টা করল।"],
          ["Do not waste your life trying [[to square the circle]].", "অসম্ভব কিছুর চেষ্টায় জীবন নষ্ট করো না।"],
        ],
      },
      {
        idiom: "Every cloud has a silver lining",
        meaning: "Adverse conditions do not last forever",
        meaningBn: "খারাপ অবস্থা চিরদিন থাকে না",
        n: 273,
        examples: [
          ["He lost his job but found a better one; [[every cloud has a silver lining]].", "সে চাকরি হারাল কিন্তু আরও ভালো একটা পেল; খারাপ অবস্থা চিরদিন থাকে না।"],
          ["The flood damaged the crop, yet [[every cloud has a silver lining]] — the land became more fertile.", "বন্যা ফসল নষ্ট করল, তবু খারাপের মধ্যেও ভালো আছে — জমি আরও উর্বর হলো।"],
          ["Tell her not to lose hope; [[every cloud has a silver lining]].", "তাকে বলো আশা না হারাতে; খারাপ অবস্থা চিরদিন থাকে না।"],
        ],
      },
      {
        idiom: "Close fisted",
        meaning: "Mean",
        meaningBn: "কৃপণ",
        n: 274,
        examples: [
          ["The [[close fisted]] landlord never repairs the house.", "কৃপণ বাড়িওয়ালা কখনো বাড়ি মেরামত করেন না।"],
          ["He is rich but [[close fisted]]; he never helps the poor.", "সে ধনী কিন্তু কৃপণ; সে কখনো গরিবদের সাহায্য করে না।"],
          ["A [[close fisted]] man may save money but loses friends.", "কৃপণ মানুষ টাকা বাঁচাতে পারে, কিন্তু বন্ধু হারায়।"],
        ],
      },
      {
        idiom: "Cut your cloth according to your cloth",
        meaning: "Live within your income",
        meaningBn: "আয়ের মধ্যে জীবন চালানো",
        n: 275,
        examples: [
          ["Father always advises us to [[cut our cloth according to our cloth]].", "বাবা সবসময় আমাদের আয়ের মধ্যে জীবন চালাতে উপদেশ দেন।"],
          ["If you [[cut your cloth according to your cloth]], you will never need a loan.", "আয়ের মধ্যে জীবন চালালে তোমার কখনো ঋণের দরকার হবে না।"],
          ["The young couple learned to [[cut their cloth according to their cloth]] in the city.", "তরুণ দম্পতি শহরে আয়ের মধ্যে জীবন চালাতে শিখল।"],
        ],
      },
      {
        idiom: "To be cock sure",
        meaning: "To be perfectly sure or certain",
        meaningBn: "সম্পূর্ণ নিশ্চিত হওয়া",
        n: 277,
        examples: [
          ["He was [[cock sure]] of winning, but he lost the election.", "সে জয় নিয়ে সম্পূর্ণ নিশ্চিত ছিল, কিন্তু নির্বাচনে হেরে গেল।"],
          ["Do not be [[cock sure]] about the weather in the hills.", "পাহাড়ের আবহাওয়া নিয়ে সম্পূর্ণ নিশ্চিত হয়ো না।"],
          ["She spoke in a [[cock sure]] manner, though she knew little.", "সে কম জানলেও সম্পূর্ণ নিশ্চিত ভঙ্গিতে কথা বলল।"],
        ],
      },
    ],
  },
  {
    num: 55,
    titleBn: "ঠান্ডা পানির ছিটা",
    titleEn: "A Splash of Cold Water",
    storyBn:
      "যুবক রাশেদ একটা নতুন ব্যবসার পরিকল্পনা নিয়ে খুব উৎসাহী ছিল। কিন্তু তার বড় ভাই [[threw cold water upon]] it — প্রচেষ্টাকে নিরুৎসাহিত করলেন, বললেন এতে লাভ হবে না। রাশেদের মন খারাপ হলো। সেদিন তার বন্ধু সুমন [[off color]] ছিল — স্বাভাবিক অবস্থায় নয়, কেমন অসুস্থ ভাব। রাশেদ তবু হাল ছাড়ল না; সে প্রতিদিন ভোরে উঠে ব্যবসার হিসাব [[commit to memory]] করল — মুখস্থ করে ফেলল প্রতিটি সংখ্যা। বাবা হেসে বললেন, একটা রান্নাঘরে [[too many cooks spoil the broth]] — প্রয়োজনের চেয়ে বেশি কর্মী থাকলে কাজ নষ্ট হয়; তাই পরামর্শ অনেকের নিলেও সিদ্ধান্ত নিজে নাও। এক বছর পর রাশেদের দোকান সফল হলো, আর বড় ভাইয়ের চোখে সেদিন [[crocodile tears]] ছিল না — ছিল সত্যিকারের গর্ব (যদিও তিনি আবেগ লুকাতে চেয়েছিলেন)।",
    storyEn:
      "Young Rashed was very enthusiastic about a plan for a new business. But his elder brother [[threw cold water upon]] it — he discouraged the effort, saying there would be no profit. Rashed felt sad. That day his friend Sumon was [[off color]] — not in his usual form, feeling somewhat unwell. Rashed still did not give up; every dawn he rose and [[committed]] the business accounts [[to memory]] — he learned every number by heart. Father smiled and said, in a kitchen [[too many cooks spoil the broth]] — where there are more workers than necessary, the work is spoiled; so take advice from many, but decide yourself. One year later Rashed's shop succeeded, and that day there were no [[crocodile tears]] in his elder brother's eyes — there was real pride (though he tried to hide his emotion).",
    idioms: [
      {
        idiom: "To throw cold water upon anything",
        meaning: "To discourage efforts",
        meaningBn: "প্রচেষ্টাকে নিরুৎসাহিত করা",
        n: 278,
        examples: [
          ["Do not [[throw cold water upon]] the children's plan to plant trees.", "শিশুদের গাছ লাগানোর পরিকল্পনায় ঠান্ডা পানি ঢেলো না।"],
          ["The manager [[threw cold water upon]] the new idea without hearing it fully.", "ম্যানেজার নতুন ধারণাটা পুরো না শুনেই তা নিরুৎসাহিত করলেন।"],
          ["Her friends [[threw cold water upon]] her dream of becoming a singer.", "তার বন্ধুরা তার গায়িকা হওয়ার স্বপ্নকে নিরুৎসাহিত করল।"],
        ],
      },
      {
        idiom: "Off color",
        meaning: "Not in the usual form",
        meaningBn: "স্বাভাবিক অবস্থায় নয়",
        n: 279,
        examples: [
          ["The teacher is [[off color]] today and has taken leave.", "শিক্ষক আজ স্বাভাবিক অবস্থায় নেই, ছুটি নিয়েছেন।"],
          ["Our best player was [[off color]] in the final match.", "ফাইনাল ম্যাচে আমাদের সেরা খেলোয়াড় স্বাভাবিক ফর্মে ছিল না।"],
          ["He looks [[off color]]; perhaps he needs rest.", "তাকে অসুস্থ দেখাচ্ছে; হয়তো তার বিশ্রাম দরকার।"],
        ],
      },
      {
        idiom: "To commit to memory",
        meaning: "To learn by heart",
        meaningBn: "মুখস্থ করা",
        n: 280,
        examples: [
          ["Students [[commit]] the poem [[to memory]] for the recitation contest.", "শিক্ষার্থীরা আবৃত্তি প্রতিযোগিতার জন্য কবিতা মুখস্থ করে।"],
          ["She [[committed]] the whole list of capitals [[to memory]].", "সে রাজধানীর পুরো তালিকা মুখস্থ করে ফেলল।"],
          ["Try to [[commit]] these ten words [[to memory]] every day.", "প্রতিদিন এই দশটা শব্দ মুখস্থ করার চেষ্টা করো।"],
        ],
      },
      {
        idiom: "Too many cooks spoil the broth",
        meaning: "Where there are more workers than necessary",
        meaningBn: "প্রয়োজনের চেয়ে বেশি কর্মী থাকা",
        n: 281,
        examples: [
          ["Five people tried to write one letter — truly, [[too many cooks spoil the broth]].", "পাঁচজন মিলে একটা চিঠি লিখতে গেল — সত্যিই, বেশি কর্মী কাজ নষ্ট করে।"],
          ["The committee failed because [[too many cooks spoiled the broth]].", "প্রয়োজনের চেয়ে বেশি কর্মী থাকায় কমিটি ব্যর্থ হলো।"],
          ["Let one person lead the work; [[too many cooks spoil the broth]].", "একজনকে কাজের নেতৃত্ব দিতে দাও; বেশি নেতা কাজ নষ্ট করে।"],
        ],
      },
      {
        idiom: "Crocodile tears",
        meaning: "Hypocritical Tears",
        meaningBn: "ভণ্ডামির কান্না / মায়াকান্না",
        n: 282,
        examples: [
          ["The stepmother shed [[crocodile tears]] at the funeral, but everyone knew the truth.", "সৎমা অন্ত্যেষ্টিতে মায়াকান্না করলেন, কিন্তু সবাই সত্য জানত।"],
          ["Do not be fooled by his [[crocodile tears]]; he is happy about your failure.", "তার ভণ্ডামির কান্নায় ভুলো না; সে তোমার ব্যর্থতায় খুশি।"],
          ["Politicians sometimes shed [[crocodile tears]] for the poor before elections.", "রাজনীতিবিদেরা কখনো কখনো নির্বাচনের আগে গরিবদের জন্য মায়াকান্না করেন।"],
        ],
      },
    ],
  },
  {
    num: 56,
    titleBn: "দুঃসময়ের দিন",
    titleEn: "Days of Misfortune",
    storyBn:
      "একসময় গ্রামে [[evil days]] এল — দুর্ভাগ্যের সময়: ফসল নষ্ট হলো, কাজ কমে গেল। বৃদ্ধরা বলেন, একসময় এই গ্রামে [[halcyon days]] ছিল — শান্তি ও সুখের সময়, যখন নদীতে মাছ আর মাঠে সোনালি ধান ছিল। দুঃসময়ে জমিদারের পুরনো কর্মচারী মারা গেলে তার ছেলে [[stepped into dead man's shoes]] — উত্তরাধিকার সূত্রে সেই পদ পেল। বাজারে সব জিনিস [[cut and dried]] দামে বিক্রি হতে লাগল — আগে থেকে ঠিক করা দামে, দামাদামির সুযোগ নেই। তবু গ্রামের যুবকেরা একটা [[up to date]] পাঠাগার বানাল — সাম্প্রতিক বই দিয়ে, যাতে দুঃসময়েও মন ভালো থাকে।",
    storyEn:
      "Once [[evil days]] came to the village — a period of misfortune: crops were damaged, work decreased. The elders say, once this village had [[halcyon days]] — a time of peace and happiness, when there were fish in the river and golden paddy in the fields. In the hard times, when the landlord's old employee died, his son [[stepped into the dead man's shoes]] — he came into that post by inheritance. In the market everything began to sell at [[cut and dried]] prices — readymade, fixed beforehand, with no chance to bargain. Still, the village youths built an [[up to date]] library — with recent books, so that minds stay well even in misfortune.",
    idioms: [
      {
        idiom: "Cut and dried",
        meaning: "Readymade",
        meaningBn: "তৈরি / আগে থেকে ঠিক করা",
        n: 284,
        examples: [
          ["There is no [[cut and dried]] answer to this question.", "এই প্রশ্নের কোনো তৈরি উত্তর নেই।"],
          ["The shop sells goods at [[cut and dried]] prices.", "দোকানটা আগে থেকে ঠিক করা দামে মাল বিক্রি করে।"],
          ["Life has no [[cut and dried]] rules for success.", "জীবনে সাফল্যের কোনো তৈরি নিয়ম নেই।"],
        ],
      },
      {
        idiom: "Up to date",
        meaning: "Recent",
        meaningBn: "সাম্প্রতিক",
        n: 285,
        examples: [
          ["Please keep the list [[up to date]] with new students' names.", "দয়া করে নতুন শিক্ষার্থীদের নাম দিয়ে তালিকাটা হালনাগাদ রাখো।"],
          ["This book contains [[up to date]] information about the country.", "এই বইটে দেশ সম্পর্কে সাম্প্রতিক তথ্য আছে।"],
          ["An [[up to date]] map is necessary for the journey.", "যাত্রার জন্য একটা সাম্প্রতিক মানচিত্র দরকার।"],
        ],
      },
      {
        idiom: "Evil days",
        meaning: "A period of misfortune",
        meaningBn: "দুর্ভাগ্যের সময়",
        n: 286,
        examples: [
          ["The family saved money in good times to face [[evil days]].", "পরিবারটি দুর্ভাগ্যের সময়ের জন্য ভালো সময়ে টাকা জমিয়েছিল।"],
          ["In [[evil days]], true friends are known.", "দুর্ভাগ্যের সময়ে আসল বন্ধু চেনা যায়।"],
          ["The old man had seen many [[evil days]] in his long life.", "বৃদ্ধ লোকটি তার দীর্ঘ জীবনে অনেক দুর্ভাগ্যের সময় দেখেছিলেন।"],
        ],
      },
      {
        idiom: "Halcyon Days",
        meaning: "A time when there are peace and happiness in the land",
        meaningBn: "দেশে শান্তি ও সুখের সময়",
        n: 287,
        examples: [
          ["Grandfather often recalls the [[halcyon days]] of his youth.", "দাদা প্রায়ই তার যৌবনের শান্তি ও সুখের দিনগুলো মনে করেন।"],
          ["After the war, the country longed for [[halcyon days]].", "যুদ্ধের পর দেশ শান্তি ও সুখের সময়ের জন্য আকুল ছিল।"],
          ["Those school years were the [[halcyon days]] of my life.", "ওই স্কুলের বছরগুলো ছিল আমার জীবনের শান্তি ও সুখের সময়।"],
        ],
      },
      {
        idiom: "To step into dead man's shoes",
        meaning: "To come into an inheritance",
        meaningBn: "উত্তরাধিকার সূত্রে পাওয়া",
        n: 288,
        examples: [
          ["When the postman retired, his son [[stepped into the dead man's shoes]].", "ডাকপিয়ন অবসর নিলে তার ছেলে উত্তরাধিকার সূত্রে সেই পদ পেল।"],
          ["She [[stepped into her mother's shoes]] and ran the family shop.", "সে উত্তরাধিকার সূত্রে পারিবারিক দোকান চালাতে লাগল।"],
          ["It is not easy to [[step into a dead man's shoes]] in a famous institution.", "বিখ্যাত প্রতিষ্ঠানে উত্তরাধিকার সূত্রে পদ পাওয়া সহজ নয়।"],
        ],
      },
    ],
  },
  {
    num: 57,
    titleBn: "কুকুরের দিন",
    titleEn: "Every Dog's Day",
    storyBn:
      "গ্রামের দুষ্টু ছেলে বল্টু একদিন সত্যিই রেগে গিয়ে বলল, সবাই [[go to the devil]] — দূর হয়ে যাও! তার দাদু হেসে বললেন, রাগের মাথায় কথা বলতে নেই। দাদুর ঘরে পুরনো [[devil's bones]] পড়ে আছে — পাশা, জুয়ার ঘুঁটি; যৌবনে তিনি জুয়া খেলতেন, এখন অনুতপ্ত। টেবিলে [[devil's playthings]] — তাস — দেখে তিনি বললেন, এইসব জিনিস অনেক পরিবার নষ্ট করেছে। তিনি একটা পুরনো কথা বললেন: [[give a dog a bad name and hang him]] — একবার কেউ সুনাম হারালে সবাই তাকে খারাপই ভাবে; তাই সুনাম বাঁচিয়ে চলো। বল্টু এখন বদলে গেছে; গ্রামের সবাই বলে, [[every dog has his day]] — সবারই সৌভাগ্যের দিন আসে, বল্টুরও এসেছে: সে এখন স্কুলের সেরা ছাত্রদের একজন।",
    storyEn:
      "One day the village's naughty boy Boltu, truly angry, said, [[go to the devil]] — be off, all of you! His grandfather smiled and said, one should not speak in anger. In grandfather's room lie old [[devil's bones]] — dice; in his youth he used to gamble, now he repents. Seeing [[devil's playthings]] on the table — playing cards — he said, these things have ruined many families. He told an old saying: [[give a dog a bad name and hang him]] — once a person loses his reputation, everyone thinks ill of him; so guard your good name. Boltu has changed now; everyone in the village says, [[every dog has his day]] — sooner or later everyone has his share of good fortune; Boltu's day has come too: he is now one of the best students of the school.",
    idioms: [
      {
        idiom: "Go to the devil",
        meaning: "Be off",
        meaningBn: "দূর হয়ে যাও",
        n: 289,
        examples: [
          ["The angry shopkeeper shouted at the noisy boys, “[[Go to the devil]]!”", "রাগী দোকানি শোরগোল করা ছেলেদের চিৎকার করে বললেন, “দূর হয়ে যাও!”"],
          ["In anger he told the beggar to [[go to the devil]], and felt ashamed later.", "রাগের মাথায় সে ভিক্ষুককে দূর হয়ে যেতে বলল, পরে লজ্জা পেল।"],
          ["Do not say [[go to the devil]] to anyone; use gentle words.", "কাউকে দূর হয়ে যেতে বলো না; নম্র কথা বলো।"],
        ],
      },
      {
        idiom: "Devil's bones",
        meaning: "Dice",
        meaningBn: "পাশা (জুয়ার ঘুঁটি)",
        n: 290,
        examples: [
          ["In the old story, the king lost his kingdom over [[devil's bones]].", "পুরনো গল্পে রাজা পাশা খেলায় তার রাজ্য হারিয়েছিলেন।"],
          ["He keeps a pair of [[devil's bones]] as a reminder of his wasted youth.", "সে নষ্ট যৌবনের স্মৃতি হিসেবে একজোড়া পাশা রেখে দিয়েছে।"],
          ["Gambling with [[devil's bones]] ruined the rich merchant's son.", "পাশা দিয়ে জুয়া খেলে ধনী ব্যবসায়ীর ছেলে নষ্ট হয়ে গেল।"],
        ],
      },
      {
        idiom: "Devil’s Playthings",
        meaning: "Playing Cards",
        meaningBn: "তাস (খেলার)",
        n: 291,
        examples: [
          ["Grandfather calls playing cards [[devil's playthings]] and never touches them.", "দাদা তাসকে শয়তানের খেলনা বলেন আর কখনো ছোঁন না।"],
          ["Many families have been ruined by [[devil's playthings]].", "তাসের জুয়ায় অনেক পরিবার নষ্ট হয়েছে।"],
          ["He spent his nights with [[devil's playthings]] instead of his books.", "বইয়ের বদলে সে তার রাত তাস খেলে কাটাত।"],
        ],
      },
      {
        idiom: "Give a dog a bad name and hang him",
        meaning: "Once a person loses his reputation",
        meaningBn: "একবার কেউ সুনাম হারালে তাকে সবাই খারাপ ভাবে",
        n: 292,
        examples: [
          ["One small mistake followed him for years — truly, [[give a dog a bad name and hang him]].", "একটা ছোট ভুল বছরের পর বছর তাকে তাড়া করল — সত্যিই, একবার সুনাম হারালে রক্ষা নেই।"],
          ["Be careful with your good name; [[give a dog a bad name and hang him]], as the saying goes.", "নিজের সুনাম নিয়ে সতর্ক থাকো; কথায় আছে, একবার সুনাম হারালে সবাই খারাপ ভাবে।"],
          ["The honest clerk suffered because of one false report — [[give a dog a bad name and hang him]].", "একটা মিথ্যা প্রতিবেদনের জন্য সৎ কেরানি ভুগল — একবার সুনাম হারালে এমনই হয়।"],
        ],
      },
      {
        idiom: "Every dog has his day",
        meaning: "Sooner or later, everyone has his share of good fortune",
        meaningBn: "আগে হোক পরে হোক, সবারই সৌভাগ্যের দিন আসে",
        n: 293,
        examples: [
          ["The poor singer finally got a chance to perform — [[every dog has his day]].", "গরিব গায়ক অবশেষে গান গাওয়ার সুযোগ পেল — সবারই সৌভাগ্যের দিন আসে।"],
          ["Do not lose hope; [[every dog has his day]].", "আশা হারিয়ো না; সবারই সৌভাগ্যের দিন আসে।"],
          ["After years of hard work, the farmer's son became an officer — [[every dog has his day]].", "বছরের পর বছর পরিশ্রমের পর কৃষকের ছেলে কর্মকর্তা হলো — সবারই দিন আসে।"],
        ],
      },
    ],
  },
  {
    num: 58,
    titleBn: "সাদা হাতির বোঝা",
    titleEn: "The Burden of the White Elephant",
    storyBn:
      "ধনী ব্যবসায়ী সিরাজ সাহেব একটা বড় বাড়ি কিনেছিলেন শখ করে, কিন্তু বাড়িটা এখন তার কাছে [[a white elephant]] — অকেজো জিনিস যা রাখতে অত্যন্ত খরচ হয়। তার এক কর্মচারী বাড়ি বিক্রির বিষয়ে তাকে [[throw dust in his eyes]] চেয়েছিল — ধোঁকা দিতে চেয়েছিল ভুল হিসাব দেখিয়ে। সিরাজ সাহেবের ছেলে হিসাব দেখে সত্য ধরে ফেলল। ছেলে বলল, বাবা, তুমি একদিন [[set the Thames on fire]] করতে চেয়েছিলে — অসাধারণ কিছু করতে; কিন্তু এখন বুঝি, বড় কাজ মানে বড় খরচ নয়। বাড়িটা বিক্রি করে সেই টাকায় তারা একটা স্কুল বানাল। গ্রামের মানুষ বলে, [[a burnt child dreads the fire]] — যার একবার খারাপ অভিজ্ঞতা হয়েছে, সে সতর্ক হয়; সিরাজ সাহেব এখন যেকোনো বড় খরচের আগে দশবার ভাবেন। স্কুলে ভর্তি হয়ে এক গ্রামের ছেলে প্রথমে [[a fish out of water]] ছিল — অস্বস্তিকর পরিস্থিতিতে; এখন সে স্কুলের সেরা ছাত্র।",
    storyEn:
      "Rich businessman Siraj Saheb had bought a big house out of fancy, but the house is now [[a white elephant]] to him — a useless possession which is extremely expensive to keep. One of his employees tried [[to throw dust in his eyes]] about selling the house — to deceive him by showing false accounts. Siraj Saheb's son, checking the accounts, caught the truth. The son said, Father, once you wanted [[to set the Thames on fire]] — to do something sensational; but now I understand, a great work does not mean great expense. Selling the house, with that money they built a school. The villagers say, [[a burnt child dreads the fire]] — one who has had a bad experience becomes careful; Siraj Saheb now thinks ten times before any big expense. Admitted to the school, a village boy was at first [[a fish out of water]] — in an awkward situation; now he is the school's best student.",
    idioms: [
      {
        idiom: "To throw dust in one's eyes",
        meaning: "To try to deceive someone or mislead someone",
        meaningBn: "কাউকে ধোঁকা দেওয়া বা ভুল পথে নেওয়া",
        n: 294,
        examples: [
          ["The clever salesman tried [[to throw dust in the customer's eyes]] with false promises.", "চালাক বিক্রেতা মিথ্যা প্রতিশ্রুতি দিয়ে ক্রেতাকে ধোঁকা দিতে চাইল।"],
          ["Do not let sweet words [[throw dust in your eyes]]; check the papers.", "মিষ্টি কথায় ধোঁকা খেয়ো না; কাগজপত্র যাচাই করো।"],
          ["He [[threw dust in his father's eyes]] and took money for a false course.", "সে তার বাবাকে ধোঁকা দিয়ে ভুয়া কোর্সের জন্য টাকা নিল।"],
        ],
      },
      {
        idiom: "A white elephant",
        meaning: "A useless possession which is extremely expensive to keep",
        meaningBn: "অকেজো জিনিস যা রাখতে অত্যন্ত খরচ হয়",
        n: 295,
        examples: [
          ["The big old car became [[a white elephant]] for the retired officer.", "বড় পুরনো গাড়িটা অবসরপ্রাপ্ত কর্মকর্তার কাছে সাদা হাতি হয়ে গেল।"],
          ["That huge house in the village is [[a white elephant]] for the family abroad.", "গ্রামের ওই বিশাল বাড়িটা প্রবাসী পরিবারের কাছে সাদা হাতি।"],
          ["Think twice before buying a boat; it may become [[a white elephant]].", "নৌকা কেনার আগে দুবার ভাবো; এটা সাদা হাতি হয়ে যেতে পারে।"],
        ],
      },
      {
        idiom: "To set the Thames on fire",
        meaning: "To do something sensational or remarkable",
        meaningBn: "অসাধারণ বা চাঞ্চল্যকর কিছু করা",
        n: 296,
        examples: [
          ["The young writer's first novel [[set the Thames on fire]] in the literary world.", "তরুণ লেখকের প্রথম উপন্যাস সাহিত্য জগতে চাঞ্চল্য সৃষ্টি করল।"],
          ["He is a quiet worker; he will never [[set the Thames on fire]], but his work is solid.", "সে শান্ত কর্মী; সে কখনো চাঞ্চল্য সৃষ্টি করবে না, কিন্তু তার কাজ শক্ত।"],
          ["Her speech at the conference [[set the Thames on fire]].", "সম্মেলনে তার বক্তব্য চাঞ্চল্য সৃষ্টি করল।"],
        ],
      },
      {
        idiom: "A burnt child dreads the fire",
        meaning: "One who has had a previous unpleasant experience is always scared of situations where such experiences are likely to be repeated",
        meaningBn: "যার একবার খারাপ অভিজ্ঞতা হয়েছে, সে আবার তেমন পরিস্থিতির আশঙ্কায় ভয় পায়",
        n: 297,
        examples: [
          ["After being cheated once, he checks every paper twice — [[a burnt child dreads the fire]].", "একবার ঠকে সে প্রতিটি কাগজ দুবার যাচাই করে — ঘরপোড়া গরু সিঁদুরে মেঘ দেখলে ডরায়।"],
          ["She refused the same business again; [[a burnt child dreads the fire]].", "সে একই ব্যবসা আবার করতে অস্বীকার করল; একবার খারাপ অভিজ্ঞতা হলে মানুষ ভয় পায়।"],
          ["The farmer will not plant that crop this year — [[a burnt child dreads the fire]].", "কৃষক এই বছর ওই ফসল লাগাবেন না — একবারের খারাপ অভিজ্ঞতাই যথেষ্ট।"],
        ],
      },
      {
        idiom: "A fish out of water",
        meaning: "Anyone in an awkward situation",
        meaningBn: "অস্বস্তিকর পরিস্থিতিতে থাকা যে কেউ",
        n: 298,
        examples: [
          ["At the English debate, the village student felt like [[a fish out of water]].", "ইংরেজি বিতর্কে গ্রামের শিক্ষার্থীটি অস্বস্তিতে পড়ল।"],
          ["Without his glasses, the teacher is like [[a fish out of water]].", "চশমা ছাড়া শিক্ষক জলছাড়া মাছের মতো।"],
          ["In the big office, the new clerk looked like [[a fish out of water]] on the first day.", "বড় অফিসে প্রথম দিনে নতুন কেরানিকে অস্বস্তিকর অবস্থায় দেখাল।"],
        ],
      },
    ],
  },
  {
    num: 59,
    titleBn: "খেলার মাঠের নিয়ম",
    titleEn: "Rules of the Playground",
    storyBn:
      "আন্তঃগ্রাম ফুটবল ম্যাচে একটা দল [[foul play]] করল — প্রতারণা করল, গোপনে অতিরিক্ত খেলোয়াড় নামাল। রেফারি জানতে পেরে ম্যাচ বাতিল করলেন। হারা দলের অধিনায়ক রাগে মাঠ ছাড়তে চাইল, কিন্তু কোচ বললেন, রাগের মাথায় সিদ্ধান্ত নেওয়া মানে [[jump from a frying pan into fire]] — এক বিপদ থেকে বেরিয়ে আরও বড় বিপদে পড়া। পরের ম্যাচের আগে কোচ সবাইকে বোঝালেন, [[all that glitters are not gold]] — সব চকচকে জিনিস সোনা নয়; প্রতিপক্ষের তারকা খেলোয়াড় দেখতে ভয়ংকর হলেও খেলায় দুর্বল হতে পারে। দল ঠিক করল, তারা [[make hay while the sun shines]] — সব সুযোগ কাজে লাগাবে: প্রতিদিন ভোরে অনুশীলন। ফাইনালের দিন তারা জিতল [[lock, stock and barrel]] — পুরোপুরি, সব দিক থেকে ভালো খেলে।",
    storyEn:
      "In the inter-village football match, one team used [[foul play]] — cheating; they secretly fielded an extra player. The referee, learning of it, cancelled the match. The losing team's captain wanted to leave the field in anger, but the coach said, deciding in anger means to [[jump from a frying pan into fire]] — to come out of one trouble and get into a worse one. Before the next match, the coach explained to everyone, [[all that glitters are not gold]] — things are not always as attractive as they appear; the opponents' star player may look fearsome but can be weak in play. The team decided they would [[make hay while the sun shines]] — take advantage of all opportunities: practice every dawn. On the final day they won [[lock, stock and barrel]] — completely, playing well in every department.",
    idioms: [
      {
        idiom: "Foul play",
        meaning: "Cheating",
        meaningBn: "প্রতারণা",
        n: 299,
        examples: [
          ["The referee suspected [[foul play]] and checked the ball.", "রেফারি প্রতারণার সন্দেহ করে বলটা যাচাই করলেন।"],
          ["There was no [[foul play]] in the election; everything was fair.", "নির্বাচনে কোনো প্রতারণা ছিল না; সবকিছু সুষ্ঠু ছিল।"],
          ["The police found signs of [[foul play]] in the empty house.", "পুলিশ খালি বাড়িতে প্রতারণা/অস্বাভাবিক ঘটনার চিহ্ন পেল।"],
        ],
      },
      {
        idiom: "To jump from a frying pan into fire",
        meaning: "To come out of one trouble and get into a worse",
        meaningBn: "এক বিপদ থেকে বেরিয়ে আরও বড় বিপদে পড়া",
        n: 300,
        examples: [
          ["He left one bad job for a worse one — he [[jumped from a frying pan into fire]].", "সে একটা খারাপ চাকরি ছেড়ে আরও খারাপে গেল — এক বিপদ থেকে বেরিয়ে বড় বিপদে পড়ল।"],
          ["Do not resign in anger; you may [[jump from a frying pan into fire]].", "রাগে পদত্যাগ করো না; এক বিপদ থেকে বেরিয়ে বড় বিপদে পড়তে পারো।"],
          ["By borrowing from the moneylender, she [[jumped from a frying pan into fire]].", "সুদখোরের কাছ থেকে ধার নিয়ে সে এক বিপদ থেকে বেরিয়ে বড় বিপদে পড়ল।"],
        ],
      },
      {
        idiom: "All that glitters are not gold",
        meaning: "Things are not always as attractive as they appear",
        meaningBn: "সব জিনিস দেখতে যতটা আকর্ষণীয় মনে হয় ততটা নয়",
        n: 301,
        examples: [
          ["The shiny phone broke in a month — [[all that glitters are not gold]].", "চকচকে ফোনটা এক মাসে নষ্ট হলো — সব চকচকে জিনিস সোনা নয়।"],
          ["He learned that [[all that glitters are not gold]] when the grand job gave him no peace.", "জমকালো চাকরিটা তাকে শান্তি না দিলে সে বুঝল, সব চকচকে জিনিস সোনা নয়।"],
          ["Grandmother warns us: [[all that glitters are not gold]].", "দাদি আমাদের সতর্ক করেন: সব চকচকে জিনিস সোনা নয়।"],
        ],
      },
      {
        idiom: "Make hay while the sun shines",
        meaning: "Take advantage of all opportunities",
        meaningBn: "সব সুযোগ কাজে লাগানো",
        n: 303,
        examples: [
          ["The library is free this month — [[make hay while the sun shines]] and read as much as you can.", "এই মাসে পাঠাগার বিনামূল্যে — সুযোগ কাজে লাগিয়ে যত পারো পড়ো।"],
          ["Farmers [[make hay while the sun shines]] before the rains come.", "বৃষ্টি আসার আগে কৃষকেরা সুযোগ কাজে লাগায়।"],
          ["He is young and strong; he should [[make hay while the sun shines]].", "সে তরুণ ও শক্তিশালী; তার সুযোগ কাজে লাগানো উচিত।"],
        ],
      },
      {
        idiom: "Lock, stock and barrel",
        meaning: "The whole of everything",
        meaningBn: "সবকিছু পুরোপুরি",
        n: 304,
        examples: [
          ["He sold his shop [[lock, stock and barrel]] and moved to the village.", "সে তার দোকান সবকিছু পুরোপুরি বিক্রি করে গ্রামে চলে গেল।"],
          ["The flood destroyed their home [[lock, stock and barrel]].", "বন্যা তাদের বাড়ি সবকিছু পুরোপুরি ধ্বংস করে দিল।"],
          ["She believes the report [[lock, stock and barrel]], without checking anything.", "সে কিছু যাচাই না করে প্রতিবেদনটা পুরোপুরি বিশ্বাস করে।"],
        ],
      },
    ],
  },
  {
    num: 60,
    titleBn: "একটা ঘটনায় সিদ্ধান্ত নয়",
    titleEn: "No Decision from One Incident",
    storyBn:
      "স্কুলের নতুন প্রধান শিক্ষক প্রথম দিনেই একটা ছাত্রকে বকা দিলেন। পুরনো শিক্ষক বললেন, স্যার, [[one swallow does not make a summer]] — একটা ঘটনা দেখেই সিদ্ধান্ত নেওয়া যায় না; ছেলেটা আসলে ভালো। প্রধান শিক্ষক বুঝলেন। তিনি আরও বললেন, শিক্ষকতা মানে শুধু আশা করা নয় — [[if wishes were horses, beggars might ride]] — শুধু ইচ্ছা করলেই সব হতো না; কাজ করতে হয়। বকা খাওয়া ছেলেটা পরের সপ্তাহে স্কুলের বাগান পরিষ্কার করে সবার মন জয় করল। ঘটনাটা কিছুদিন স্কুলে [[a nine days' wonder]] ছিল — কিছুদিন চাঞ্চল্য, তারপর সবাই ভুলে গেল। প্রধান শিক্ষক তখন বললেন, পত্রিকার [[yellow press]] এমনই — চাঞ্চল্যকর খবর ছাপে; আমাদের কাজ হলো শান্তভাবে সত্য খোঁজা। আরেক শিক্ষক মন্তব্য করলেন, ছেলেটা লক্ষ্য থেকে সামান্য দূরে ছিল, কিন্তু [[a miss is as good as a mile]] — কাছাকাছি গেলেও ব্যর্থতাই ব্যর্থতা; তাই তাকে আবার সুযোগ দিতে হবে।",
    storyEn:
      "On the very first day, the school's new headmaster scolded a student. The old teacher said, Sir, [[one swallow does not make a summer]] — it is unreliable to base conclusions on a single incident; the boy is actually good. The headmaster understood. He also said, teaching does not mean only hoping — [[if wishes were horses, beggars might ride]] — if wishing could make things happen, everyone would have everything; one must work. The scolded boy, the next week, cleaned the school garden and won everyone's heart. The incident was [[a nine days' wonder]] at school — a sensation for a time, then everyone forgot. The headmaster then said, the [[yellow press]] is like that — newspapers which publish sensational stories; our work is to calmly find the truth. Another teacher remarked, the boy was only a little away from the target, but [[a miss is as good as a mile]] — a narrow miss is still a failure; so he must be given another chance.",
    idioms: [
      {
        idiom: "A miss is as good as a mile",
        meaning: "Comes nowhere near it. If someone narrowly misses the target it still is treated as a missed one or failure.",
        meaningBn: "কাছাকাছি গেলেও ব্যর্থতাই ব্যর্থতা — কেউ লক্ষ্যের খুব কাছে গিয়ে ব্যর্থ হলেও তা ব্যর্থতাই ধরা হয়",
        n: 305,
        examples: [
          ["He failed by one mark only, but [[a miss is as good as a mile]].", "সে মাত্র এক নম্বরের জন্য ফেল করল, কিন্তু কাছাকাছি গেলেও ব্যর্থতাই ব্যর্থতা।"],
          ["The ball passed just beside the goal — [[a miss is as good as a mile]].", "বলটা গোলের ঠিক পাশ দিয়ে গেল — কাছাকাছি গেলেও তা ব্যর্থতাই।"],
          ["In the admission test, [[a miss is as good as a mile]]; prepare fully.", "ভর্তি পরীক্ষায় কাছাকাছি যাওয়াও ব্যর্থতা; পুরোপুরি প্রস্তুতি নাও।"],
        ],
      },
      {
        idiom: "One swallow does not make a summer",
        meaning: "It is unreliable to base one's conclusions on only a single test or incident",
        meaningBn: "একটা ঘটনা দেখেই সিদ্ধান্ত নেওয়া নির্ভরযোগ্য নয়",
        n: 307,
        examples: [
          ["One good innings does not make him a great player — [[one swallow does not make a summer]].", "একটা ভালো ইনিংস তাকে বড় খেলোয়াড় বানায় না — একটা ঘটনায় সিদ্ধান্ত নয়।"],
          ["She was polite once, but [[one swallow does not make a summer]]; watch her longer.", "সে একবার ভদ্র ছিল, কিন্তু একটা ঘটনায় সিদ্ধান্ত নেওয়া যায় না; তাকে আরও দেখো।"],
          ["A single warm day in winter proves nothing — [[one swallow does not make a summer]].", "শীতে একটা গরম দিন কিছু প্রমাণ করে না — একটা ঘটনায় সিদ্ধান্ত নয়।"],
        ],
      },
      {
        idiom: "If wishes were horses, beggars might ride",
        meaning: "If wishing could make things happen, then even the most destitute people would have everything they wanted",
        meaningBn: "শুধু ইচ্ছা করলেই যদি সব হতো, তাহলে সবচেয়ে গরিব মানুষও সবকিছু পেত",
        n: 308,
        examples: [
          ["Stop dreaming of a job without applying — [[if wishes were horses, beggars might ride]].", "আবেদন না করে চাকরির স্বপ্ন দেখা বন্ধ করো — শুধু ইচ্ছায় সব হয় না।"],
          ["He wants a shop but saves nothing; [[if wishes were horses, beggars might ride]].", "সে দোকান চায় কিন্তু কিছু জমায় না; শুধু ইচ্ছা করলেই সব হয় না।"],
          ["Grandfather smiled: “[[If wishes were horses, beggars might ride]] — now go and work.”", "দাদা হেসে বললেন: “শুধু ইচ্ছায় সব হয় না — এখন যাও, কাজ করো।”"],
        ],
      },
      {
        idiom: "A nine days' wonder",
        meaning: "An event which relates a sensation for a time but is soon forgotten",
        meaningBn: "কিছুদিন চাঞ্চল্য তৈরি করে শীঘ্রই ভুলে যাওয়া ঘটনা",
        n: 309,
        examples: [
          ["The singer's fame after one song proved [[a nine days' wonder]].", "এক গানের পর গায়কের খ্যাতি কিছুদিনের চাঞ্চল্য বলে প্রমাণিত হলো।"],
          ["The strange fish in the pond was [[a nine days' wonder]] in the village.", "পুকুরের অদ্ভুত মাছটা গ্রামে কিছুদিনের চাঞ্চল্য ছিল।"],
          ["Do not run after fame; much of it is only [[a nine days' wonder]].", "খ্যাতির পেছনে ছুটো না; এর অনেকটাই কিছুদিনের চাঞ্চল্য মাত্র।"],
        ],
      },
      {
        idiom: "Yellow press",
        meaning: "Newspapers which publish sensational and unscrupulous stories and exaggerates the news to attract readers.",
        meaningBn: "যেসব সংবাদপত্র পাঠক টানতে চাঞ্চল্যকর ও অসৎ গল্প ছাপে এবং খবর বাড়িয়ে বলে",
        n: 310,
        examples: [
          ["The [[yellow press]] turned a small quarrel into a huge scandal.", "হলুদ সংবাদপত্র ছোট ঝগড়াকে বিশাল কেলেঙ্কারি বানিয়ে দিল।"],
          ["A wise reader avoids the [[yellow press]] and checks real news.", "একজন জ্ঞানী পাঠক হলুদ সংবাদপত্র এড়িয়ে আসল খবর যাচাই করে।"],
          ["The [[yellow press]] exaggerates every story to attract readers.", "হলুদ সংবাদপত্র পাঠক টানতে প্রতিটি গল্প বাড়িয়ে বলে।"],
        ],
      },
    ],
  },
  {
    num: 61,
    titleBn: "দোকানের হিসাব",
    titleEn: "The Shop's Accounts",
    storyBn:
      "বছর শেষে দোকানের হিসাব মেলাতে বসে মালিক আব্দুল সাহেব প্রথমে [[a ball park figure]] দিলেন — মোটামুটি আর্থিক হিসাব: লাভ প্রায় দুই লাখ। হিসাবরক্ষক বললেন, সঠিক হিসাব পেতে আমাদের [[balance the books]] করতে হবে — খরচ যেন আয়ের বেশি না হয় তা নিশ্চিত করা। দোকানের পুরনো ফ্রিজটা এখন [[a cash cow]] — এই পণ্যটা (ঠান্ডা পানীয় বিক্রি) কোম্পানির জন্য অনেক টাকা আয় করে। সভায় আব্দুল সাহেব নিজেই [[devil's advocate]] হলেন — বিপক্ষের যুক্তি উপস্থাপন করলেন, যাতে দুর্বল দিকগুলো বেরিয়ে আসে। এক কর্মচারী নতুন ব্যবসার আইডিয়া শুনে হেসে বলল, স্যার, [[don't give up the day job]] — আপনি এই কাজে এখনো পাকা নন! সবাই হেসে উঠল, কিন্তু আইডিয়াটা নিয়ে ভাবা হলো।",
    storyEn:
      "At the end of the year, sitting to match the shop's accounts, owner Abdul Saheb first gave [[a ball park figure]] — a general financial figure: profit about two lakh. The accountant said, to get the exact account we must [[balance the books]] — make certain the money spent is not more than the money received. The shop's old fridge is now [[a cash cow]] — this service (selling cold drinks) makes a lot of money for the company. At the meeting, Abdul Saheb himself became the [[devil's advocate]] — he presented the counter argument, so that the weak points come out. Hearing the new business idea, one employee laughed and said, Sir, [[don't give up the day job]] — you are not very good at this yet; you could not do it professionally! Everyone laughed, but the idea was considered.",
    idioms: [
      {
        idiom: "A ball park figure",
        meaning: "A general financial figure",
        meaningBn: "মোটামুটি আর্থিক হিসাব",
        n: 311,
        examples: [
          ["Give me [[a ball park figure]] for the cost of repairing the roof.", "ছাদ মেরামতের খরচের মোটামুটি হিসাব দাও।"],
          ["The contractor quoted [[a ball park figure]] of five lakh taka.", "ঠিকাদার পাঁচ লাখ টাকার মোটামুটি হিসাব দিলেন।"],
          ["It is only [[a ball park figure]]; the real cost may be higher.", "এটা শুধু মোটামুটি হিসাব; আসল খরচ বেশি হতে পারে।"],
        ],
      },
      {
        idiom: "To balance the books",
        meaning: "To make certain that the amount of money spent is not more than the amount of money received.",
        meaningBn: "খরচ যেন আয়ের বেশি না হয় তা নিশ্চিত করা",
        n: 312,
        examples: [
          ["Every month, the shopkeeper sits down [[to balance the books]].", "প্রতি মাসে দোকানি হিসাব মেলাতে বসে যাতে খরচ আয়ের বেশি না হয়।"],
          ["The club treasurer must [[balance the books]] before the annual meeting.", "বার্ষিক সভার আগে ক্লাবের কোষাধ্যক্ষকে হিসাব মেলাতে হয়।"],
          ["A family that [[balances the books]] never falls into debt.", "যে পরিবার হিসাব মিলিয়ে চলে, সে কখনো ঋণে পড়ে না।"],
        ],
      },
      {
        idiom: "A cash cow",
        meaning: "A product or service that makes a lot of money for a company",
        meaningBn: "কোনো পণ্য বা সেবা যা কোম্পানির জন্য অনেক টাকা আয় করে",
        n: 313,
        examples: [
          ["The small tea stall near the station is [[a cash cow]] for its owner.", "স্টেশনের কাছের ছোট চায়ের দোকানটা মালিকের জন্য অর্থ আয়ের বড় উৎস।"],
          ["For the publisher, the grammar book is [[a cash cow]] that sells every year.", "প্রকাশকের কাছে ব্যাকরণ বইটা প্রতি বছর বিক্রি হওয়া অর্থ-আয়ের পণ্য।"],
          ["The old bus route remained [[a cash cow]] for the company.", "পুরনো বাস রুটটা কোম্পানির জন্য অর্থ আয়ের উৎস হয়ে থাকল।"],
        ],
      },
      {
        idiom: "Devil's Advocate",
        meaning: "To present a counter argument",
        meaningBn: "বিপক্ষের যুক্তি উপস্থাপন করা",
        n: 314,
        examples: [
          ["In our debate practice, one student plays the [[devil's advocate]].", "আমাদের বিতর্ক অনুশীলনে একজন শিক্ষার্থী বিপক্ষের যুক্তি উপস্থাপন করে।"],
          ["Let me be the [[devil's advocate]]: what if the rain destroys the crop?", "আমি বিপক্ষের যুক্তি দিই: বৃষ্টি যদি ফসল নষ্ট করে?"],
          ["A good committee needs a [[devil's advocate]] to test every plan.", "প্রতিটি পরিকল্পনা যাচাই করতে ভালো কমিটিতে বিপক্ষের যুক্তিদাতা দরকার।"],
        ],
      },
      {
        idiom: "Don't give up the day job",
        meaning: "You are not very good at something. You could not do it professionally.",
        meaningBn: "তুমি কোনো কাজে খুব ভালো নও; পেশাদারভাবে তা করতে পারবে না",
        n: 315,
        examples: [
          ["He sang so badly at the party that we joked, “[[Don't give up the day job]]!”", "সে অনুষ্ঠানে এত খারাপ গাইল যে আমরা মজা করে বললাম, “আসল চাকরিটা ছেড়ো না!”"],
          ["My cooking is average — friends say, “[[Don't give up the day job]].”", "আমার রান্না মাঝারি — বন্ধুরা বলে, “পেশাদার রাঁধুনি হতে পারবে না।”"],
          ["After his poor acting in the school play, the teacher smiled: “[[Don't give up the day job]].”", "স্কুলের নাটকে খারাপ অভিনয়ের পর শিক্ষক হেসে বললেন: “আসল কাজটা ছেড়ো না।”"],
        ],
      },
    ],
  },
  {
    num: 62,
    titleBn: "কাজের চাপে",
    titleEn: "Under the Pressure of Work",
    storyBn:
      "অফিসে নতুন হিসাবরক্ষক রেজা এসে দেখল, পুরনো হিসাবরক্ষক [[cooked the books]] — আর্থিক হিসাব বদলে ফেলেছে। খবরটা ছড়াতেই পুরনো হিসাবরক্ষক [[got the sack]] — চাকরি থেকে বরখাস্ত হলো। রেজা এখন [[snowed under]] — খুব ব্যস্ত, কারণ বছরের সব হিসাব তাকে একা মেলাতে হচ্ছে। সে [[works his fingers to the bone]] — খুব কঠোর পরিশ্রম করে রাত জেগে। একদিন [[in the heat of the moment]] — মুহূর্তের উত্তেজনায় — সে জুনিয়রকে বকে ফেলল, পরে ক্ষমা চাইল। অফিসের সবাই জানে, এই অফিসে সততাই নিয়ম; এখানে অসৎ কাজের কোনো জায়গা নেই।",
    storyEn:
      "Coming to the office as the new accountant, Reza saw that the old accountant had [[cooked the books]] — modified the financial statements. As soon as the news spread, the old accountant [[got the sack]] — he was dismissed from his job. Reza is now [[snowed under]] — very busy, because he alone has to match the whole year's accounts. He [[works his fingers to the bone]] — he works really hard, staying up at night. One day, [[in the heat of the moment]] — overwhelmed by what was happening — he scolded a junior, and apologised later. Everyone in the office knows honesty is the rule here; there is no place for dishonest work.",
    idioms: [
      {
        idiom: "To cook the books",
        meaning: "To modify financial statements",
        meaningBn: "আর্থিক হিসাব বদলে ফেলা",
        n: 316,
        examples: [
          ["The manager was jailed for [[cooking the books]] of the company.", "কোম্পানির আর্থিক হিসাব বদলে ফেলার জন্য ম্যানেজার জেলে গেলেন।"],
          ["An honest accountant never [[cooks the books]].", "একজন সৎ হিসাবরক্ষক কখনো আর্থিক হিসাব বদলায় না।"],
          ["The audit found that someone had [[cooked the books]] for three years.", "নিরীক্ষায় পাওয়া গেল কেউ তিন বছর ধরে আর্থিক হিসাব বদলে ফেলেছে।"],
        ],
      },
      {
        idiom: "To get the sack",
        meaning: "To be dismissed from your job",
        meaningBn: "চাকরি থেকে বরখাস্ত হওয়া",
        n: 317,
        examples: [
          ["The guard [[got the sack]] for sleeping on duty.", "দায়িত্বে ঘুমানোর জন্য প্রহরী চাকরি থেকে বরখাস্ত হলো।"],
          ["If you are late every day, you may [[get the sack]].", "প্রতিদিন দেরি করলে তুমি চাকরি থেকে বরখাস্ত হতে পারো।"],
          ["He [[got the sack]] after the money was found missing.", "টাকা হারানো পাওয়ার পর সে চাকরি থেকে বরখাস্ত হলো।"],
        ],
      },
      {
        idiom: "To be snowed under",
        meaning: "To be very busy",
        meaningBn: "খুব ব্যস্ত থাকা",
        n: 318,
        examples: [
          ["Before Eid, tailors are [[snowed under]] with orders.", "ঈদের আগে দর্জিরা অর্ডারে খুব ব্যস্ত থাকে।"],
          ["I am [[snowed under]] with homework this week.", "এই সপ্তাহে আমি বাড়ির কাজে খুব ব্যস্ত।"],
          ["The post office is [[snowed under]] during the festival season.", "উৎসবের মৌসুমে ডাকঘর খুব ব্যস্ত থাকে।"],
        ],
      },
      {
        idiom: "To work your fingers to the bone or sweat blood",
        meaning: "To work really hard",
        meaningBn: "খুব কঠোর পরিশ্রম করা",
        n: 319,
        examples: [
          ["She [[worked her fingers to the bone]] to raise her children.", "সন্তানদের মানুষ করতে সে খুব কঠোর পরিশ্রম করেছে।"],
          ["The farmers [[work their fingers to the bone]] during harvest.", "ফসল কাটার সময় কৃষকেরা খুব কঠোর পরিশ্রম করেন।"],
          ["He [[sweated blood]] to pass the difficult exam.", "কঠিন পরীক্ষায় পাস করতে সে খুব কঠোর পরিশ্রম করল।"],
        ],
      },
      {
        idiom: "In the heat of the moment",
        meaning: "Overwhelmed by what is happening in the moment",
        meaningBn: "মুহূর্তে যা ঘটছে তাতে অভিভূত হওয়া",
        n: 321,
        examples: [
          ["[[In the heat of the moment]], he said words he later regretted.", "মুহূর্তের উত্তেজনায় সে এমন কথা বলল যার জন্য পরে অনুতাপ করল।"],
          ["Do not sign any paper [[in the heat of the moment]].", "মুহূর্তের উত্তেজনায় কোনো কাগজে সই করো না।"],
          ["The player pushed the referee [[in the heat of the moment]] and was punished.", "খেলোয়াড় মুহূর্তের উত্তেজনায় রেফারিকে ধাক্কা দিয়ে শাস্তি পেল।"],
        ],
      },
    ],
  },
  {
    num: 63,
    titleBn: "শেষ গল্প: কথায় আর কাজে",
    titleEn: "The Last Story: In Words and Deeds",
    storyBn:
      "গ্রামের স্কুলে বার্ষিক অনুষ্ঠানে এক ছাত্রের অভিনয় দেখে সবাই বলল, ছেলেটার মধ্যে [[not a spark of decency]] নেই — মানে অভিনয়ে সে দুষ্টু চরিত্রটা এত ভালো করল যে মনে হলো কোনো শিষ্টাচারই নেই! আসলে সে খুব ভদ্র ছেলে। অনুষ্ঠানে হঠাৎ তার পুরনো শিক্ষক এসে হাজির হলে সবাই বলে উঠল, [[speak of the devil]]! — যার কথা হচ্ছিল, সে-ই এসে হাজির। প্রধান শিক্ষক বললেন, এই অনুষ্ঠানে আমরা [[the whole nine yards]] করব — সবকিছু পুরোপুরি: গান, নাটক, কবিতা সব। এক অভিভাবক জিজ্ঞেস করলেন, আগামী বছর স্কুলে নতুন ভবন হবে তো? প্রধান শিক্ষক হেসে বললেন, [[your guess is as good as mine]] — আমারও কোনো ধারণা নেই, সরকারি সিদ্ধান্তের অপেক্ষায় আছি।",
    storyEn:
      "At the village school's annual programme, seeing one student's acting, everyone said the boy has [[not a spark of decency]] — meaning he played the wicked character so well that it seemed he had no manners at all! Actually he is a very polite boy. When his old teacher suddenly arrived at the programme, everyone exclaimed, [[speak of the devil]]! — the person we were just talking about has arrived. The headmaster said, in this programme we will do [[the whole nine yards]] — everything, all of it: songs, drama, poems, everything. A guardian asked, will there be a new building for the school next year? The headmaster smiled and said, [[your guess is as good as mine]] — I have no idea either; I am waiting for the government's decision.",
    idioms: [
      {
        idiom: "Not a spark of decency",
        meaning: "No Manners",
        meaningBn: "কোনো শিষ্টাচার নেই",
        n: 322,
        examples: [
          ["He pushed the old man aside — he has [[not a spark of decency]].", "সে বৃদ্ধকে ধাক্কা দিয়ে সরিয়ে দিল — তার কোনো শিষ্টাচার নেই।"],
          ["Talking loudly in the hospital shows [[not a spark of decency]].", "হাসপাতালে জোরে কথা বলা শিষ্টাচারের অভাব দেখায়।"],
          ["A boy who mocks the poor has [[not a spark of decency]].", "যে ছেলে গরিবদের নিয়ে উপহাস করে, তার কোনো শিষ্টাচার নেই।"],
        ],
      },
      {
        idiom: "Speak of the devil!",
        meaning: "This expression is used when the person you have just been talking about arrives",
        meaningBn: "যার কথা তুমি এতক্ষণ বলছিলে, সে এসে হাজির হলে এই কথাটি বলা হয়",
        n: 323,
        examples: [
          ["We were just talking about Rina, and she walked in — [[speak of the devil]]!", "আমরা ঠিক রিনার কথাই বলছিলাম, আর সে ঢুকে এল — যার কথা, সে-ই হাজির!"],
          ["“[[Speak of the devil]]!” they laughed when the teacher entered during their gossip.", "আড্ডার মধ্যে শিক্ষক ঢুকলে তারা হেসে বলল, “যার কথা, সে-ই হাজির!”"],
          ["I was about to call you — [[speak of the devil]]!", "আমি তোমাকে ফোন করতেই যাচ্ছিলাম — যার কথা, সে-ই হাজির!"],
        ],
      },
      {
        idiom: "Whole nine yards",
        meaning: "Everything. All of it",
        meaningBn: "সবকিছু; পুরোটাই",
        n: 324,
        examples: [
          ["For his daughter's wedding, he arranged [[the whole nine yards]] — food, music and lights.", "মেয়ের বিয়েতে সে সবকিছু পুরোপুরি আয়োজন করল — খাবার, গান আর আলো।"],
          ["She prepared for the exam with [[the whole nine yards]]: books, notes and mock tests.", "সে পরীক্ষার জন্য সবকিছু পুরোপুরি প্রস্তুতি নিল: বই, নোট আর মডেল টেস্ট।"],
          ["If we clean the house, let us do [[the whole nine yards]], not just the front room.", "বাড়ি পরিষ্কার করলে সবকিছু পুরোপুরি করি, শুধু সামনের ঘর নয়।"],
        ],
      },
      {
        idiom: "Your guess is as good as mine",
        meaning: "To have no idea about anything",
        meaningBn: "কোনো বিষয়েই কোনো ধারণা না থাকা",
        n: 325,
        examples: [
          ["“When will the rain stop?” “[[Your guess is as good as mine]].”", "“বৃষ্টি কখন থামবে?” “আমারও কোনো ধারণা নেই।”"],
          ["Who took the key? [[Your guess is as good as mine]].", "চাবিটা কে নিল? কারো কোনো ধারণা নেই।"],
          ["About the new rule's effect, [[your guess is as good as mine]].", "নতুন নিয়মের প্রভাব সম্পর্কে আমারও কোনো ধারণা নেই।"],
        ],
      },
    ],
  },
];
