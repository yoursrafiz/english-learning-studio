// Phrasal Verb Story Groups — the Phrasal Verbs section reworked in the
// style of the learner's Bengali phrasal-verb story book ("গল্পে গল্পে
// PHRASAL VERBS"): phrasal verbs grouped into connected everyday-life
// stories of 5, one module at a time.
//
// Module 01 — "Daily Life and Unexpected Situations · দৈনন্দিন জীবন ও
// অপ্রত্যাশিত ঘটনা" — Stories 01–10, 50 phrasal verbs.
//  - Story 01 "কাপড় কাচার দিন" and Story 05 "বৃষ্টির রাত" keep the
//    book's own verb sets and meanings, exactly as the learner specified.
//  - The other 8 stories group everyday phrasal verbs taken from the
//    app's existing lists (PV_COMMON / PV_MORE in phrasal-verbs.ts) by a
//    real daily-life situation; their Bengali meanings are the lists'
//    own meanings.
// Every story is one connected everyday-life story told twice: `storyBn`
// in Bengali (with the English phrasal verbs inside it, as in the book)
// and `storyEn` in English. Wherever a phrasal verb appears in a story
// or an example sentence it is wrapped in [[...]] markers; the UI renders
// those parts underlined and bold, and strips the markers when speaking
// aloud. Each verb carries exactly one English example sentence with its
// Bengali meaning. All stories and examples are original, written for
// this app in the book's style.

export interface PvStoryVerb {
  verb: string;
  meaningBn: string;
  meaningEn: string;
  /** [English example sentence (verb marked with [[...]]), Bengali meaning of the sentence]. */
  example: [string, string];
}

export interface PvStoryGroup {
  num: number;
  titleBn: string;
  titleEn: string;
  storyBn: string;
  storyEn: string;
  verbs: PvStoryVerb[];
}

export const PV_MODULE = {
  num: 1,
  titleEn: "Daily Life and Unexpected Situations",
  titleBn: "দৈনন্দিন জীবন ও অপ্রত্যাশিত ঘটনা",
} as const;

export const PV_STORY_GROUPS: PvStoryGroup[] = [
  {
    num: 1,
    titleBn: "কাপড় কাচার দিন",
    titleEn: "Laundry Day",
    storyBn:
      "রোবার সকালে রীতার মা রোদ ওঠার আগেই কাপড় কাচতে বসলেন। সাবানমাখা কাপড় দেখে মা বললেন, “আগে সাবানটা ভালো করে [[rinse out]] করো, নইলে কাপড় শক্ত হয়ে যাবে।” রীতা ঠান্ডা পরিষ্কার পানিতে কাপড় ধুয়ে নিল। তারপর মা বললেন, “এবার প্রতিটি কাপড় থেকে পানি [[wring out]] করো।” রীতা দুই হাতে শাড়ি নিংড়াতে লাগল। পানির ধারা নিচে গড়িয়ে পড়ল, হাত ক্লান্ত হয়ে গেল, তবু সে হাসিমুখে কাজ করে গেল। এবার কাপড় রশিতে মেলার পালা। মা বললেন, “মেলার আগে প্রতিটি কাপড় [[shake out]] করে নাও, বাবা।” রীতা প্রতিটি কাপড় ঝাঁকাল। তারপর বলল, “পুরো দড়িটা আমি নিজে [[peg out]] করব।” সে প্রতিটি কাপড়ে ক্লিপ লাগাল, যাতে হাওয়ায় উড়িয়ে না নিয়ে যায়। দুপুরের রোদ তখন মেঝেয়। মা হাঁড়ির দিকে তাকিয়ে বললেন, “ওই রোদে এক ঘণ্টায় কাপড় পুরোপুরি [[dry out]] হয়ে যাবে।” সত্যিই ঘণ্টাখানেক পর সব কাপড় শুকিয়ে গেল। সন্ধ্যায় রীতা নিজের হাতে কাচা শাড়ি পরল, কাপড়ে রোদ আর সাবানের গন্ধ। মা মেয়ের সঙ্গে বললেন, “এবার তুই কাপড় কাচা শিখে গেলি।” রীতার নিজের পরিশ্রমে গর্ব হলো।",
    storyEn:
      "On Sunday morning, Rita's mother sat down to wash clothes before the sun was fully up. Looking at the soapy clothes, she said, “First [[rinse out]] the soap well, or the clothes will turn stiff.” Rita washed the clothes in cool, clean water. Then her mother said, “Now [[wring out]] the water from every piece.” Rita began to squeeze the sari with both hands. Water ran down in a stream and her hands grew tired, but she kept working with a smile. Now it was time to hang the clothes on the line. Her mother said, “Before hanging, [[shake out]] every piece of clothing, dear.” Rita shook each one. Then she said, “I will [[peg out]] the whole line myself.” She put a clip on every piece so the wind could not blow them away. The midday sun was on the floor now. Looking towards the courtyard, her mother said, “In this sun, the clothes will [[dry out]] completely in an hour.” And truly, after about an hour, all the clothes were dry. In the evening Rita wore the sari she had washed with her own hands; it smelled of sun and soap. Her mother said to her, “Now you have learned to wash clothes.” Rita felt proud of her own hard work.",
    verbs: [
      { verb: "Rinse out", meaningBn: "সাবান ধুয়ে ফেলা", meaningEn: "To wash off soap with water", example: ["Please [[rinse out]] the glass before you pour the juice.", "জুস ঢালার আগে গ্লাসটা ধুয়ে নাও।"] },
      { verb: "Wring out", meaningBn: "নিংড়ানো", meaningEn: "To squeeze water out", example: ["She [[wrung out]] the wet cloth over the bucket.", "সে বালতির ওপর ভেজা কাপড়টা নিংড়াল।"] },
      { verb: "Shake out", meaningBn: "ঝেড়ে পরিষ্কার করা", meaningEn: "To shake to remove dust", example: ["[[Shake out]] the mat outside the door.", "দরজার বাইরে মাদুরটা ঝেড়ে নাও।"] },
      { verb: "Peg out", meaningBn: "মেলায় টাঙানো", meaningEn: "To hang washing on a line", example: ["Mother [[pegged out]] the shirts in the morning sun.", "মা সকালের রোদে শার্টগুলো মেলে দিলেন।"] },
      { verb: "Dry out", meaningBn: "শুকিয়ে যাওয়া", meaningEn: "To become completely dry", example: ["Thin clothes [[dry out]] quickly on a windy day.", "বাতাসের দিনে পাতলা কাপড় তাড়াতাড়ি শুকিয়ে যায়।"] },
    ],
  },
  {
    num: 2,
    titleBn: "সকালের তাড়াহুড়ো",
    titleEn: "The Morning Hurry",
    storyBn:
      "সোমবার সকালে অ্যালার্ম বাজতেই তানিয়া চমকে [[wake up]] করল। ঘড়িতে সাড়ে সাতটা — অফিসের বাস আটটায়! সে তাড়াতাড়ি বিছানা থেকে [[get up]] করে বাথরুমে ছুটল। আলমারি খুলে সে একটা পরিষ্কার শাড়ি বের করে [[put on]] করল, কিন্তু চুল আঁচড়াতে গিয়ে দেখল সময় প্রায় শেষ। রান্নাঘরে গিয়ে সে পানির বোতলটা [[fill up]] করল, ব্যাগে রাখল। ফ্রিজ খুলতেই মন খারাপ হয়ে গেল — দুধ [[run out of]] হয়ে গেছে, চা হবে না আজ। মা পেছন থেকে হেসে বললেন, “চা ছাড়াই একদিন চলবে। আগে বাস ধরো!” তানিয়া জুতা পরে দরজা দিয়ে ছুটে বেরিয়ে গেল। গলির মোড়ে পৌঁছে দেখল, বাসটা তখনো আসেনি। সে হাঁপাতে হাঁপাতে হাসল — তাড়াহুড়োর সকালটা শেষ পর্যন্ত ভালোভাবেই শুরু হলো।",
    storyEn:
      "On Monday morning, Tania [[woke up]] with a start when the alarm rang. The clock said half past seven — the office bus was at eight! She quickly [[got up]] from bed and rushed to the bathroom. She opened the wardrobe, took out a clean sari and [[put]] it [[on]], but while combing her hair she saw the time was almost gone. In the kitchen she [[filled up]] her water bottle and put it in her bag. Opening the fridge made her sad — the milk had [[run out]], so there would be no tea today. Her mother laughed from behind and said, “One day without tea will be fine. Catch the bus first!” Tania put on her shoes and ran out of the door. Reaching the corner of the lane, she saw the bus had not come yet. Panting, she smiled — the hurried morning had started well after all.",
    verbs: [
      { verb: "Wake up", meaningBn: "ঘুম থেকে জাগা", meaningEn: "To stop sleeping and open your eyes", example: ["I [[wake up]] at six every morning.", "আমি প্রতিদিন সকালে ছয়টায় ঘুম থেকে জাগি।"] },
      { verb: "Get up", meaningBn: "ঘুম থেকে ওঠা", meaningEn: "To get out of bed after sleeping", example: ["She [[got up]] early to catch the train.", "ট্রেন ধরতে সে ভোরে বিছানা থেকে উঠল।"] },
      { verb: "Put on", meaningBn: "গায়ে পরা", meaningEn: "To put clothing on your body", example: ["[[Put on]] your jacket; it is cold outside.", "জ্যাকেটটা গায়ে দাও; বাইরে ঠান্ডা।"] },
      { verb: "Fill up", meaningBn: "পুরোপুরি ভরে তোলা", meaningEn: "To make something completely full", example: ["He [[filled up]] the bucket with water.", "সে বালতিটা পানি দিয়ে ভরে তুলল।"] },
      { verb: "Run out of", meaningBn: "ফুরিয়ে যাওয়া", meaningEn: "To have no more of something left", example: ["We have [[run out of]] rice, so buy some today.", "আমাদের চাল ফুরিয়ে গেছে, তাই আজ কিছু কিনো।"] },
    ],
  },
  {
    num: 3,
    titleBn: "বাজারে একদিন",
    titleEn: "A Day at the Market",
    storyBn:
      "শুক্রবার বিকেলে সাকিব বাজারে গেল বোনের বিয়ের জন্য একটা পাঞ্জাবি কিনতে। প্রথম দোকানে পছন্দের রঙটা পেল না। সে আরও কয়েকজন দোকানদারকে [[ask around]] করল — কোথায় ভালো পাঞ্জাবি পাওয়া যায়। একজন বলল, গলির শেষের দোকানে নতুন কালেকশন এসেছে। সাকিব সেখানে গিয়ে অনেকক্ষণ ধরে নীল পাঞ্জাবি [[look for]] করতে লাগল। দোকানদার তিনটা পাঞ্জাবি নামিয়ে দিল। সাকিব আয়নার সামনে একটা [[try on]] করে দেখল — হাতাটা একটু লম্বা। সে কাপড়টা হাতে নিয়ে ভালো করে [[check out]] করল, সেলাই আর বোতাম ঠিক আছে কি না। সব ঠিকঠাক দেখে সে মানিব্যাগ থেকে টাকা [[take out]] করে দাম দিল। পাঞ্জাবিটা ব্যাগে ভরে বাড়ির পথ ধরতেই তার মনে হলো, বিয়ের দিন এই পাঞ্জাবি পরলে বোন খুব খুশি হবে।",
    storyEn:
      "On Friday afternoon, Sakib went to the market to buy a panjabi for his sister's wedding. The first shop did not have the colour he liked. He [[asked around]] — he asked several shopkeepers where he could find a good panjabi. One of them said a new collection had come to the shop at the end of the lane. Sakib went there and spent a long time [[looking for]] a blue panjabi. The shopkeeper brought down three panjabis. Sakib [[tried on]] one in front of the mirror — the sleeve was a little long. He took the cloth in his hands and [[checked]] it [[out]] carefully, to see whether the stitching and buttons were all right. When everything looked fine, he [[took out]] money from his wallet and paid. Putting the panjabi in his bag, he started for home, thinking how happy his sister would be to see him wearing it on her wedding day.",
    verbs: [
      { verb: "Ask around", meaningBn: "অনেককে জিজ্ঞেস করা", meaningEn: "To ask many people for information", example: ["I [[asked around]] but nobody knew the address.", "আমি অনেককে জিজ্ঞেস করেছি, কিন্তু কেউ ঠিকানাটা জানত না।"] },
      { verb: "Look for", meaningBn: "খোঁজা", meaningEn: "To try to find something", example: ["She is [[looking for]] her keys everywhere.", "সে সব জায়গায় তার চাবিগুলো খুঁজছে।"] },
      { verb: "Try on", meaningBn: "পরে দেখা", meaningEn: "To put on clothes to see if they fit", example: ["Can I [[try on]] these shoes, please?", "আমি কি এই জুতাগুলো পরে দেখতে পারি?"] },
      { verb: "Check out", meaningBn: "খুঁটিয়ে দেখা, পরীক্ষা করা", meaningEn: "To look at something carefully", example: ["[[Check out]] the fresh fish before you buy it.", "কেনার আগে তাজা মাছটা খুঁটিয়ে দেখো।"] },
      { verb: "Take out", meaningBn: "বাইরে বের করে নেওয়া", meaningEn: "To remove something from inside", example: ["He [[took out]] his phone and called home.", "সে ফোনটা বের করে বাড়িতে ফোন করল।"] },
    ],
  },
  {
    num: 4,
    titleBn: "অসুস্থ মায়ের পাশে",
    titleEn: "Beside My Sick Mother",
    storyBn:
      "গত সপ্তাহে নুসরাতের মা হঠাৎ জ্বরে [[come down with]] করলেন — সর্দি-জ্বরে গা পুড়ে যাচ্ছিল। নুসরাত চাকরি থেকে দুই দিনের ছুটি নিয়ে সারাক্ষণ মায়ের [[look after]] করতে লাগল। সে সময়মতো ওষুধ দিত, কপালে ভেজা কাপড় দিত, হালকা খিচুড়ি রান্না করে খাওয়াত। ডাক্তার ফোনে বলেছিলেন, তিন দিনে জ্বর না কমলে তিনি নিজে [[call back]] করবেন। দ্বিতীয় দিন বিকেলে নুসরাত মায়ের ছোটবেলার গল্প শুনিয়ে মাকে [[cheer up]] করার চেষ্টা করল। মা দুর্বল গলায় হেসে বললেন, “তুই পাশে থাকলেই আমার অর্ধেক অসুখ সেরে যায়।” চার দিনের মাথায় জ্বর ছেড়ে গেল। ধীরে ধীরে মা [[get over]] করতে লাগলেন — নিজে উঠে বসতে পারলেন, বারান্দায় গিয়ে চা খেলেন। নুসরাতের চোখে পানি এল — মায়ের সুস্থ মুখটাই তার সবচেয়ে বড় শান্তি।",
    storyEn:
      "Last week, Nusrat's mother suddenly [[came down with]] a fever — her body was burning with cold and fever. Nusrat took two days off work and [[looked after]] her mother all the time. She gave the medicine on time, put a wet cloth on her forehead, and cooked soft khichuri and fed her. The doctor had said on the phone that if the fever did not go down in three days, he would [[call back]] himself. On the second afternoon, Nusrat tried to [[cheer up]] her mother by telling stories from her childhood. Her mother laughed in a weak voice and said, “When you are beside me, half my illness is cured.” On the fourth day, the fever left. Slowly, her mother began to [[get over]] the illness — she could sit up by herself and went to the veranda to drink tea. Tears came to Nusrat's eyes — her mother's healthy face was her greatest peace.",
    verbs: [
      { verb: "Look after", meaningBn: "দেখাশোনা করা", meaningEn: "To take care of someone", example: ["Grandma [[looks after]] the children after school.", "দাদি স্কুলের পর বাচ্চাদের দেখাশোনা করেন।"] },
      { verb: "Come down with", meaningBn: "অসুখে পড়া", meaningEn: "To become ill with something", example: ["He [[came down with]] the flu last winter.", "গত শীতে সে ফ্লুতে আক্রান্ত হয়েছিল।"] },
      { verb: "Get over", meaningBn: "সেরে ওঠা, কাটিয়ে ওঠা", meaningEn: "To recover from an illness", example: ["It took her a week to [[get over]] the cold.", "সর্দি থেকে সেরে উঠতে তার এক সপ্তাহ লেগেছিল।"] },
      { verb: "Call back", meaningBn: "ফিরতি ফোন করা", meaningEn: "To phone someone again or return a call", example: ["The doctor will [[call back]] this evening.", "ডাক্তার আজ সন্ধ্যায় ফিরতি ফোন করবেন।"] },
      { verb: "Cheer up", meaningBn: "মন ভালো করে দেওয়া", meaningEn: "To make someone feel happier", example: ["A funny story can [[cheer up]] a sad friend.", "একটা মজার গল্প দুঃখী বন্ধুর মন ভালো করে দিতে পারে।"] },
    ],
  },
  {
    num: 5,
    titleBn: "বৃষ্টির রাত",
    titleEn: "A Rainy Night",
    storyBn:
      "জুলাই মাসের এক রাতে বাইরে মুষলধারে বৃষ্টি হচ্ছিল। সুমাইয়া দেখল ছাদ থেকে পানি দেয়াল বেয়ে [[drip down]] করতে শুরু করেছে। বাবা তাড়াতাড়ি বালতি রাখলেন। কিছুক্ষণ পর দরজার নিচ দিয়ে পানি ভেতরে আসতে লাগল। সুমাইয়া চিন্তিত হয়ে বলল, “ওই ফাঁক দিয়ে বৃষ্টির পানি [[seep in]] করছে।” বাবা পুরোনো তোয়ালে দরজায় গুঁজে দিলেন। জানালা দিয়েও ঠান্ডা হাওয়া আসছিল। মা বললেন, “ওই জানালা দিয়েও ঠান্ডা হাওয়া [[creep in]] করছে,” বলে ছোট চাদর টাঙিয়ে দিলেন। ছাদের পুরোনো টিনের ছিদ্র দিয়ে কিনা বাবা ওপর তাকিয়ে বললেন, “ওই ফাটল দিয়ে সারারাত পানি [[leak out]] করবে।” তিনি ফাটলে কাপড় ঠেসে দিলেন। ঠিক তখনই বালতিটা ভরে গেল, সুমাইয়া চিৎকার করে বলল, “বালতি এখনই [[spill over]] করবে!” দৌড়ে গিয়ে সে বালতি খালি করল। সারারাত পরিবারের কেউ চোখের পাতা এক করতে পারল না। সকালে রোদ উঠতেই সুমাইয়া ক্লান্ত গলায় হাসিমুখে বলল, “বাবা, এবার সবার আগে ছাদটা মেরামত করবে, আর কখনো এমন রাত আসতে দেব না।”",
    storyEn:
      "One night in July, it was raining heavily outside. Sumaiya saw that water from the roof had started to [[drip down]] along the wall. Her father quickly put a bucket under it. A little later, water began to come in under the door. Worried, Sumaiya said, “Rain water is [[seeping in]] through that gap.” Her father pushed an old towel against the door. Cold air was coming through the window too. Her mother said, “Cold air is also [[creeping in]] through that window,” and hung a small blanket over it. Looking up at a hole in the old tin roof, her father said, “Water will [[leak out]] through that crack all night.” He pressed a cloth into the crack. Just then the bucket filled up, and Sumaiya cried out, “The bucket is about to [[spill over]]!” She ran and emptied the bucket. All night, nobody in the family could sleep. When the sun rose in the morning, Sumaiya said with a tired smile, “Father, this time repair the roof before everything else — we will never let such a night come again.”",
    verbs: [
      { verb: "Drip down", meaningBn: "চুঁইয়ে পড়া", meaningEn: "To fall slowly in drops", example: ["Water [[dripped down]] from the wet umbrella.", "ভেজা ছাতা থেকে পানি চুঁইয়ে পড়ছিল।"] },
      { verb: "Seep in", meaningBn: "ধীরে ধীরে ঢোকা", meaningEn: "To enter slowly through gaps", example: ["Rain [[seeped in]] through the old wall.", "পুরোনো দেয়াল দিয়ে বৃষ্টির পানি ধীরে ধীরে ঢুকেছিল।"] },
      { verb: "Creep in", meaningBn: "নিঃশব্দে ঢোকা", meaningEn: "To enter slowly and quietly", example: ["Cold air [[crept in]] under the door.", "দরজার নিচ দিয়ে ঠান্ডা হাওয়া নিঃশব্দে ঢুকেছিল।"] },
      { verb: "Leak out", meaningBn: "ফাঁস হয়ে যাওয়া", meaningEn: "To escape through a hole", example: ["Oil can [[leak out]] from a broken pipe.", "ভাঙা পাইপ থেকে তেল ফাঁস হয়ে বেরিয়ে যেতে পারে।"] },
      { verb: "Spill over", meaningBn: "উপচে পড়া", meaningEn: "To overflow at the top", example: ["Do not fill the pot fully; the soup will [[spill over]].", "হাঁড়িটা পুরোপুরি ভরো না; স্যুপ উপচে পড়বে।"] },
    ],
  },
  {
    num: 6,
    titleBn: "বাসে করে বাড়ি ফেরা",
    titleEn: "Going Home by Bus",
    storyBn:
      "বৃহস্পতিবার সন্ধ্যায় রফিক অফিস থেকে বেরিয়ে বাসস্ট্যান্ডে দাঁড়াল। ভিড়ের মধ্যে ধাক্কাধাক্কি করে সে কোনোমতে বাসে [[get on]] করল। বাস আধা ঘণ্টা চলার পর হঠাৎ ঝাঁকুনি দিয়ে থেমে গেল — ইঞ্জিন [[break down]] করে গেছে। ড্রাইভার বললেন, মেকানিক আসতে এক ঘণ্টা লাগবে। যাত্রীরা রাস্তার পাশে নেমে দাঁড়াল। কেউ কেউ রাগ করতে লাগল, কিন্তু রফিক সবাইকে বলল, রাগ করে লাভ নেই, বৃষ্টি আসার আগ পর্যন্ত আমাদের [[wait out]] করতেই হবে। তার কথায় ধীরে ধীরে সবাই [[calm down]] করল। এক ঘণ্টা পর মেকানিক এসে বাস ঠিক করল। বাস আবার ছুটল। রাত নটায় রফিক বাড়ি [[get back]] করল। মা দরজা খুলে বললেন, “এত দেরি?” রফিক হেসে বলল, “রাস্তায় অনেক গল্প জমা হয়ে গেছে, খেতে খেতে বলব।”",
    storyEn:
      "On Thursday evening, Rafiq left the office and stood at the bus stand. Pushing through the crowd, he somehow [[got on]] the bus. After running for half an hour, the bus suddenly stopped with a jerk — the engine had [[broken down]]. The driver said the mechanic would take an hour to come. The passengers got down and stood beside the road. Some began to get angry, but Rafiq told everyone there was no use being angry; they had to [[wait out]] the time until the rain came. At his words, everyone slowly [[calmed down]]. After an hour, the mechanic came and fixed the bus. The bus started again. At nine at night, Rafiq [[got back]] home. His mother opened the door and said, “So late?” Rafiq smiled and said, “Many stories have gathered on the road — I will tell them while eating.”",
    verbs: [
      { verb: "Get on", meaningBn: "গাড়িতে ওঠা", meaningEn: "To step onto a bus, train or other transport", example: ["We [[got on]] the bus at the station.", "আমরা স্টেশনে বাসে উঠলাম।"] },
      { verb: "Break down", meaningBn: "নষ্ট হয়ে যাওয়া, চলা বন্ধ হওয়া", meaningEn: "To stop working (for a machine or vehicle)", example: ["Our car [[broke down]] on the way home.", "বাড়ি ফেরার পথে আমাদের গাড়ি নষ্ট হয়ে গিয়েছিল।"] },
      { verb: "Wait out", meaningBn: "শেষ না হওয়া পর্যন্ত অপেক্ষা করা", meaningEn: "To wait until something ends", example: ["Let us [[wait out]] the rain in this shop.", "চলো এই দোকানে বৃষ্টি থামা পর্যন্ত অপেক্ষা করি।"] },
      { verb: "Calm down", meaningBn: "শান্ত হওয়া", meaningEn: "To become calm after feeling angry or worried", example: ["Take a deep breath and [[calm down]].", "গভীর শ্বাস নাও আর শান্ত হও।"] },
      { verb: "Get back", meaningBn: "ফিরে আসা", meaningEn: "To return to a place", example: ["What time did you [[get back]] last night?", "গত রাতে তুমি কয়টায় ফিরে এসেছিলে?"] },
    ],
  },
  {
    num: 7,
    titleBn: "পড়ার টেবিলে সন্ধ্যা",
    titleEn: "An Evening at the Study Table",
    storyBn:
      "পরীক্ষার আগের সন্ধ্যায় আরিফ পড়ার টেবিলে বসল। ইংরেজি খাতায় একটা কঠিন শব্দ দেখে সে ডিকশনারিতে শব্দটা [[look up]] করল। তারপর নোট পড়তে পড়তে সে [[find out]] করল, গত সপ্তাহের ক্লাসে শিক্ষক এই অধ্যায় থেকেই প্রশ্ন করবেন বলেছিলেন। একটা অঙ্ক কিছুতেই মিলছিল না। আরিফ অনেকক্ষণ চেষ্টা করে শেষে নিজে নিজে অঙ্কটা [[figure out]] করল — ভুলটা ছিল ছোট্ট একটা যোগে। খুশি হয়ে সে পুরো অধ্যায়টা আবার [[go over]] করল, যাতে কোনো অংশ বাদ না যায়। রাত দশটায় সে হোমওয়ার্কের খাতাটা ব্যাগে ভরল — সকালে স্কুলে গিয়েই সে খাতাটা [[hand in]] করবে। মা এক গ্লাস দুধ এনে বললেন, “এবার ঘুমোও। মন দিয়ে পড়লে ভয় থাকে না।” আরিফ বই বন্ধ করে হাসল — কালকের পরীক্ষা নিয়ে তার আর দুশ্চিন্তা নেই।",
    storyEn:
      "On the evening before the exam, Arif sat at his study table. Seeing a difficult word in his English notebook, he [[looked up]] the word in the dictionary. Then, while reading his notes, he [[found out]] that the teacher had said in last week's class that questions would come from this very chapter. One sum just would not come right. After trying for a long time, Arif finally [[figured out]] the sum by himself — the mistake was in a tiny addition. Happily, he [[went over]] the whole chapter once more, so that no part was left out. At ten at night, he put his homework notebook in his bag — in the morning, as soon as he reached school, he would [[hand in]] the notebook. His mother brought a glass of milk and said, “Now sleep. If you study with your heart, there is no fear.” Arif closed his book and smiled — he had no more worry about tomorrow's exam.",
    verbs: [
      { verb: "Look up", meaningBn: "খুঁজে বের করা (বই বা ডাটাবেসে)", meaningEn: "To search for information in a book or online", example: ["[[Look up]] the word in your dictionary.", "ডিকশনারিতে শব্দটা খুঁজে বের করো।"] },
      { verb: "Find out", meaningBn: "জানতে পারা, খুঁজে বের করা", meaningEn: "To learn or discover something", example: ["I [[found out]] the exam date today.", "আমি আজ পরীক্ষার তারিখটা জানতে পারলাম।"] },
      { verb: "Figure out", meaningBn: "বুঝে বের করা, সমাধান খুঁজে পাওয়া", meaningEn: "To understand or solve something", example: ["Can you [[figure out]] this puzzle?", "তুমি কি এই ধাঁধাটা বুঝে বের করতে পারবে?"] },
      { verb: "Go over", meaningBn: "খুঁটিয়ে দেখা, আবার পড়া", meaningEn: "To read or check something again carefully", example: ["[[Go over]] your answers before you finish.", "শেষ করার আগে উত্তরগুলো আবার খুঁটিয়ে দেখো।"] },
      { verb: "Hand in", meaningBn: "জমা দেওয়া", meaningEn: "To give work to a teacher or office", example: ["Please [[hand in]] your essay tomorrow.", "দয়া করে আগামীকাল তোমার রচনাটা জমা দাও।"] },
    ],
  },
  {
    num: 8,
    titleBn: "বন্ধুদের আড্ডা",
    titleEn: "An Evening with Friends",
    storyBn:
      "অনেক দিন পর শনিবার বিকেলে পুরোনো বন্ধুরা ঠিক করল, সবাই মিলে [[get together]] করবে। রাহাতের বাসার ছাদে সবাই জড়ো হলো। চা আর মুড়ি খেতে খেতে তারা ঘণ্টার পর ঘণ্টা [[hang out]] করল — স্কুলজীবনের মজার গল্পে ছাদ ভরে উঠল হাসিতে। সন্ধ্যা নামতেই রাহাত বলল, আজ রাতে বাইরে খাওয়া হবে। সবাই মিলে তারা পাড়ার ছোট্ট রেস্তোরাঁয় [[eat out]] করতে গেল। খাওয়ার পর আবার ছাদে ফিরে ফাহিম মোবাইলে পুরোনো গান ছাড়ল। গানের শব্দ কম শুনে সাবা বলল, “একটু [[turn up]] করো তো!” গান জোরে বাজতেই সবাই গলা মেলাল। গানের মাঝে রাহাত কিছু বলতে গেল, কিন্তু কেউ শুনতে পেল না। সাবা হেসে বলল, “[[speak up]]! জোরে বলো, নইলে গানের শব্দে তোমার কথা ডুবে যাবে।” রাত বাড়ল, কিন্তু কারো বাড়ি ফিরতে ইচ্ছে করছিল না — এমন আড্ডা বারবার আসে না।",
    storyEn:
      "After a long time, on Saturday afternoon, the old friends decided they would all [[get together]]. Everyone gathered on the roof of Rahat's house. Drinking tea and eating muri, they [[hung out]] for hours — the roof filled with laughter at funny stories from school life. As evening fell, Rahat said they would eat out tonight. Together they went to [[eat out]] at the small restaurant in the neighbourhood. After eating, back on the roof, Fahim played old songs on his mobile. Hearing the music too low, Saba said, “[[Turn]] it [[up]] a little!” As the music grew louder, everyone joined in singing. In the middle of the song, Rahat tried to say something, but nobody could hear him. Saba laughed and said, “[[Speak up]]! Speak louder, or your words will drown in the music.” The night grew late, but nobody wanted to go home — an evening like this does not come again and again.",
    verbs: [
      { verb: "Hang out", meaningBn: "আড্ডা দিয়ে সময় কাটানো", meaningEn: "To spend time relaxing with friends", example: ["We [[hang out]] at the tea stall every Friday.", "আমরা প্রতি শুক্রবার চায়ের দোকানে আড্ডা দিই।"] },
      { verb: "Get together", meaningBn: "একত্র হওয়া, মিলিত হওয়া", meaningEn: "To meet and be together", example: ["Our family [[gets together]] on Eid day.", "ঈদের দিনে আমাদের পরিবার একত্র হয়।"] },
      { verb: "Eat out", meaningBn: "রেস্তোরাঁয় খাওয়া", meaningEn: "To eat at a restaurant, not at home", example: ["Let us [[eat out]] tonight; I am too tired to cook.", "চলো আজ রাতে রেস্তোরাঁয় খাই; রান্না করতে আমি খুব ক্লান্ত।"] },
      { verb: "Turn up", meaningBn: "শব্দ বাড়ানো", meaningEn: "To increase the sound or volume", example: ["Please [[turn up]] the radio; I love this song.", "দয়া করে রেডিওর শব্দ বাড়াও; এই গানটা আমার খুব প্রিয়।"] },
      { verb: "Speak up", meaningBn: "জোরে বলা, মত প্রকাশ করা", meaningEn: "To speak louder or say what you think", example: ["[[Speak up]], please — we cannot hear you at the back.", "দয়া করে জোরে বলুন — পেছন থেকে আমরা শুনতে পাচ্ছি না।"] },
    ],
  },
  {
    num: 9,
    titleBn: "ঘর গোছানোর দিন",
    titleEn: "The Day of Tidying the House",
    storyBn:
      "ঈদের আগের দিন ফারিয়া ঠিক করল, পুরো ঘরটা [[clean up]] করবে। প্রথমে সে আলমারি খুলে পুরোনো, ছেঁড়া কাপড়গুলো আলাদা করল — যেগুলো আর পরা যাবে না, সেগুলো সে [[throw away]] করল। কিন্তু ভালো কাপড়গুলো ফেলল না; সেগুলো সে পাশের বস্তির গরিব পরিবারদের [[give away]] করল। তারপর বইয়ের তাকের এলোমেলো বইগুলো বিষয় অনুযায়ী [[sort out]] করল — গল্পের বই একদিকে, পড়ার বই আরেকদিকে। কাজ শেষে সে ফ্যান আর লাইট [[shut off]] করে বারান্দায় দাঁড়াল। পরিষ্কার ঘরটার দিকে তাকিয়ে তার মন ভরে গেল। মা এসে বললেন, “ঘর পরিষ্কার হলে মনও পরিষ্কার হয়।” ফারিয়া হেসে বলল, “কাল ঈদ — এবার ঘরটাও তৈরি, মনটাও তৈরি।”",
    storyEn:
      "On the day before Eid, Faria decided she would [[clean up]] the whole house. First she opened the wardrobe and separated the old, torn clothes — the ones that could not be worn any more, she [[threw away]]. But she did not throw away the good clothes; she [[gave]] them [[away]] to the poor families in the nearby slum. Then she [[sorted out]] the messy books on the shelf by subject — story books on one side, study books on the other. When the work was done, she [[shut off]] the fan and the light and stood on the veranda. Looking at the clean house, her heart filled with joy. Her mother came and said, “When the house is clean, the mind is clean too.” Faria smiled and said, “Tomorrow is Eid — this time the house is ready, and so is my heart.”",
    verbs: [
      { verb: "Clean up", meaningBn: "পরিষ্কার করা, গুছিয়ে তোলা", meaningEn: "To make a place clean and tidy", example: ["Please [[clean up]] your room before the guests come.", "অতিথিরা আসার আগে তোমার ঘরটা পরিষ্কার করো।"] },
      { verb: "Throw away", meaningBn: "ফেলে দেওয়া", meaningEn: "To put something in the rubbish", example: ["Do not [[throw away]] old newspapers; we can sell them.", "পুরোনো খবরের কাগজ ফেলে দিও না; আমরা সেগুলো বিক্রি করতে পারি।"] },
      { verb: "Give away", meaningBn: "বিনামূল্যে দিয়ে দেওয়া", meaningEn: "To give something free to someone", example: ["She [[gave away]] her old books to the library.", "সে তার পুরোনো বইগুলো লাইব্রেরিতে বিনামূল্যে দিয়ে দিল।"] },
      { verb: "Sort out", meaningBn: "গুছিয়ে সমাধান করা", meaningEn: "To organise things or solve a problem", example: ["Let us [[sort out]] these papers today.", "চলো আজ এই কাগজগুলো গুছিয়ে ফেলি।"] },
      { verb: "Shut off", meaningBn: "বন্ধ করে দেওয়া", meaningEn: "To stop a machine, water or electricity", example: ["[[Shut off]] the fan when you leave the room.", "ঘর থেকে বের হওয়ার সময় ফ্যানটা বন্ধ করে দাও।"] },
    ],
  },
  {
    num: 10,
    titleBn: "অফিসের প্রথম দিন",
    titleEn: "First Day at the Office",
    storyBn:
      "নতুন চাকরির প্রথম দিনে ইমরান সকালে আয়নার সামনে দাঁড়িয়ে যত্ন করে [[dress up]] করল — পরিষ্কার শার্ট, ইস্ত্রি করা প্যান্ট। অফিসে পৌঁছে রিসেপশনে তাকে একটা ফর্ম [[fill in]] করতে দেওয়া হলো — নাম, ঠিকানা, ফোন নম্বর। তারপর আইটি বিভাগের রুমা তাকে তার ডেস্কে বসিয়ে কম্পিউটারটা [[set up]] করে দিলেন। ইমরান নিজের পাসওয়ার্ড দিয়ে প্রথমবার [[log in]] করল — পর্দায় নিজের নাম দেখে তার বুকটা গর্বে ভরে উঠল। দুপুরে ম্যানেজার তাকে বললেন, কোনো সমস্যা হলে সরাসরি [[call up]] করতে। ইমরান মাথা নেড়ে বলল, “অবশ্যই, স্যার।” দিন শেষে বাড়ি ফিরে সে মাকে বলল, “প্রথম দিনটা ভয়ের ছিল, কিন্তু সবাই এত ভালো — মনে হচ্ছে এই অফিসটাই আমার দ্বিতীয় বাড়ি হয়ে যাবে।”",
    storyEn:
      "On the first day of his new job, Imran stood before the mirror in the morning and [[dressed up]] carefully — a clean shirt and ironed trousers. Reaching the office, he was given a form at reception to [[fill in]] — name, address, phone number. Then Ruma from the IT department sat him at his desk and [[set up]] the computer for him. Imran [[logged in]] for the first time with his own password — seeing his own name on the screen filled his chest with pride. At noon, the manager told him to [[call up]] directly if there was any problem. Imran nodded and said, “Of course, sir.” At the end of the day, back home, he told his mother, “The first day was frightening, but everyone is so kind — it feels like this office will become my second home.”",
    verbs: [
      { verb: "Dress up", meaningBn: "ভালো পোশাক পরা, সাজগোজ করা", meaningEn: "To wear smart or formal clothes", example: ["He [[dressed up]] for his job interview.", "চাকরির ইন্টারভিউর জন্য সে ভালো পোশাক পরে সেজেছিল।"] },
      { verb: "Fill in", meaningBn: "ফর্মে তথ্য লেখা", meaningEn: "To write information in a form", example: ["[[Fill in]] the form with your name and address.", "তোমার নাম আর ঠিকানা দিয়ে ফর্মটি পূরণ করো।"] },
      { verb: "Set up", meaningBn: "সাজানো, আয়োজন করা", meaningEn: "To prepare or arrange something ready to use", example: ["They [[set up]] the room for the meeting.", "তারা সভার জন্য ঘরটা সাজিয়ে তৈরি করল।"] },
      { verb: "Log in", meaningBn: "সিস্টেমে প্রবেশ করা", meaningEn: "To enter a computer system with your password", example: ["I cannot [[log in]] without my password.", "পাসওয়ার্ড ছাড়া আমি সিস্টেমে প্রবেশ করতে পারি না।"] },
      { verb: "Call up", meaningBn: "ফোন করা", meaningEn: "To telephone someone", example: ["[[Call]] me [[up]] when you reach home.", "বাড়ি পৌঁছে আমাকে ফোন করো।"] },
    ],
  },
];
