// Usage stories for the Idioms and Phrases section. Every entry in
// idioms.ts has one short, original English story here (2–3 simple
// sentences) that shows the idiom/phrase in a real situation, plus
// `storyBn`: the Bengali meaning of that story. Inside `story`, the
// idiom/phrase itself is wrapped in [[...]] markers — the card renders
// those parts underlined (and strips the markers when speaking the
// story aloud). Keyed by the entry's number `n` in idioms.ts.

export interface IdiomStory {
  story: string;
  storyBn: string;
}

export const IDIOM_STORIES: Record<number, IdiomStory> = {
  1: {
    story: "The new rule did not come from the bosses; it came from the [[rank and file]] of the factory. The ordinary workers asked for a clean water tap, and the manager finally listened to them.",
    storyBn: "নতুন নিয়মটা বসদের কাছ থেকে আসেনি; এটা এসেছিল কারখানার সাধারণ শ্রমিকদের কাছ থেকে। সাধারণ কর্মীরা পরিষ্কার পানির কল চেয়েছিল, আর ম্যানেজার অবশেষে তাদের কথা শুনলেন।",
  },
  2: {
    story: "Rahim learns English [[by fits and starts]] — he studies hard for two days and then stops for a week. His teacher told him that a little practice every day works much better.",
    storyBn: "রহিম থেমে থেমে ইংরেজি শেখে — দুই দিন খুব পড়ে, তারপর এক সপ্তাহ বন্ধ রাখে। তার শিক্ষক বললেন, প্রতিদিন অল্প অল্প অনুশীলন অনেক ভালো কাজ করে।",
  },
  3: {
    story: "The soup needs [[a wee bit]] more salt. Just a tiny pinch will make it perfect.",
    storyBn: "স্যুপে আর সামান্য একটু লবণ দরকার। মাত্র এক চিমটি দিলেই এটি ঠিকঠাক হয়ে যাবে।",
  },
  4: {
    story: "After paying the last part of his loan, Jamal felt he was finally [[out of the wood]]. Now he could save a little money every month without worry.",
    storyBn: "ঋণের শেষ কিস্তি শোধ করার পর জামাল মনে করল, সে অবশেষে বিপদমুক্ত হলো। এখন সে দুশ্চিন্তা ছাড়াই প্রতি মাসে কিছু টাকা জমাতে পারবে।",
  },
  5: {
    story: "The young clerk could not take any decision, because he was completely [[under his thumb]] — his strict boss controlled everything he did. One day he gathered courage and politely shared his own ideas.",
    storyBn: "তরুণ কেরানিটি কোনো সিদ্ধান্ত নিতে পারত না, কারণ সে পুরোপুরি তার কঠোর বসের নিয়ন্ত্রণে ছিল — বস তার সব কাজ নিয়ন্ত্রণ করতেন। একদিন সে সাহস করে ভদ্রভাবে নিজের ভাবনার কথা বলল।",
  },
  6: {
    story: "The baby cried all night and nothing could calm her. Poor Ayesha was [[at her wits' end]] and did not know what to do, so she called her mother for help.",
    storyBn: "শিশুটি সারা রাত কাঁদল, কিছুতেই শান্ত হলো না। বেচারি আয়েশা কী করবে বুঝতে পারছিল না, তাই সাহায্যের জন্য মাকে ফোন করল।",
  },
  7: {
    story: "If Rana resigned, he would lose his income; if he stayed, the night duty would ruin his health. He was caught [[between the devil and the deep sea]] and could not decide what to do.",
    storyBn: "রানা চাকরি ছাড়লে আয় হারাবে; থাকলে রাতের ডিউটি তার স্বাস্থ্য নষ্ট করবে। সে দুই বিপদের মাঝখানে পড়ে কী করবে সিদ্ধান্ত নিতে পারছিল না।",
  },
  8: {
    story: "The exam was only a week away, so Tanvir decided to [[burn the midnight oil]] every night. He studied till two in the morning and revised all his notes.",
    storyBn: "পরীক্ষার মাত্র এক সপ্তাহ বাকি, তাই তানভীর প্রতি রাত গভীর রাত পর্যন্ত পড়ার সিদ্ধান্ত নিল। সে রাত দুইটা পর্যন্ত পড়ে সব নোট আবার ঝালিয়ে নিল।",
  },
  9: {
    story: "Our teacher always tells the truth in simple words; she likes to [[call a spade a spade]]. When my essay was weak, she said so clearly and showed me how to make it better.",
    storyBn: "আমাদের শিক্ষক সবসময় সহজ কথায় সত্য বলেন; তিনি খোলাখুলি ও সরাসরি কথা বলতে পছন্দ করেন। আমার প্রবন্ধ দুর্বল হলে তিনি তা স্পষ্ট করে বললেন এবং কীভাবে ভালো করা যায় তা দেখিয়ে দিলেন।",
  },
  10: {
    story: "Nusrat worked hard for the whole year for her board exam. In the end she [[came off with flying colors]] and won a scholarship.",
    storyBn: "নুসরাত বোর্ড পরীক্ষার জন্য সারা বছর কঠোর পরিশ্রম করল। শেষে সে অত্যন্ত সফল হলো এবং বৃত্তি পেল।",
  },
  11: {
    story: "The train was three hours late, but the old man still waited at the station, [[hoping against hope]] that his son would come. At last the train arrived, and his son stepped down with a smile.",
    storyBn: "ট্রেন তিন ঘণ্টা দেরি করল, কিন্তু বৃদ্ধ লোকটি তবু স্টেশনে অপেক্ষা করলেন, প্রায় আশা না থাকলেও ছেলে আসবে বলে। শেষে ট্রেন এল, আর তার ছেলে হাসিমুখে নেমে এল।",
  },
  12: {
    story: "When Sumon said the shop was losing money because of its poor service, he [[hit the nail on the head]]. The owner agreed at once and trained the staff again.",
    storyBn: "সুমন যখন বলল, খারাপ সেবার কারণেই দোকানটিতে লোকসান হচ্ছে, সে একদম ঠিক কথাটাই বলল। মালিক সঙ্গে সঙ্গে রাজি হলেন এবং কর্মীদের আবার প্রশিক্ষণ দিলেন।",
  },
  13: {
    story: "Be careful: Karim is helping you only because he has [[an axe to grind]]. He wants your support in the committee election next month.",
    storyBn: "সাবধান: করিম তোমাকে সাহায্য করছে শুধু এই কারণে যে বিষয়টিতে তার নিজের স্বার্থ আছে। সে আগামী মাসে কমিটির নির্বাচনে তোমার সমর্থন চায়।",
  },
  14: {
    story: "Our house was full of old newspapers and broken chairs. On Friday we cleaned everything and [[got rid of]] all the useless things.",
    storyBn: "আমাদের বাসা পুরোনো খবরের কাগজ আর ভাঙা চেয়ারে ভরা ছিল। শুক্রবারে আমরা সব পরিষ্কার করে অকেজো জিনিসগুলো ফেলে দিলাম।",
  },
  15: {
    story: "The two brothers fought over their father's land and are now [[at daggers drawn]]. They do not even speak to each other at family gatherings.",
    storyBn: "দুই ভাই বাবার জমি নিয়ে ঝগড়া করে এখন তীব্র শত্রু হয়ে গেছে। পারিবারিক অনুষ্ঠানেও তারা একে অপরের সঙ্গে কথা বলে না।",
  },
  16: {
    story: "Instead of saving for his daughter's education, the man [[played ducks and drakes]] with his money on silly things. Later he regretted it deeply.",
    storyBn: "মেয়ের পড়াশোনার জন্য টাকা জমানোর বদলে লোকটি বাজে জিনিসে টাকা নষ্ট করে বোকামি করল। পরে সে গভীরভাবে অনুতপ্ত হলো।",
  },
  17: {
    story: "The maths problem had troubled Arif for a week. Finally he [[took the bull by the horns]], sat down with the chapter, and solved it step by step.",
    storyBn: "গণিতের সমস্যাটি এক সপ্তাহ ধরে আরিফকে ভোগাচ্ছিল। অবশেষে সে সাহসের সঙ্গে সরাসরি মোকাবিলা করল, অধ্যায়টি নিয়ে বসল এবং ধাপে ধাপে সমাধান করল।",
  },
  18: {
    story: "We planned a picnic on Sunday, but it began to [[rain cats and dogs]] in the morning. So we stayed at home and played indoor games instead.",
    storyBn: "আমরা রবিবার পিকনিকের পরিকল্পনা করেছিলাম, কিন্তু সকালে মুষলধারে বৃষ্টি শুরু হলো। তাই আমরা বাসায় থেকে ঘরের খেলা খেললাম।",
  },
  19: {
    story: "When his little sister fell ill, Hasan [[moved heaven and earth]] to find a good doctor. He called every hospital in the town until one doctor agreed to see her at night.",
    storyBn: "ছোট বোন অসুস্থ হলে হাসান ভালো ডাক্তার খুঁজতে সর্বোচ্চ চেষ্টা করল। সে শহরের প্রতিটি হাসপাতালে ফোন করল, যতক্ষণ না একজন ডাক্তার রাতে তাকে দেখতে রাজি হলেন।",
  },
  20: {
    story: "Rina requested the bus driver again and again to stop, but it was of [[no avail]]. The bus had already left the stop, so she waited for the next one.",
    storyBn: "রিনা বাসচালককে বারবার থামতে অনুরোধ করল, কিন্তু কোনো ফল হলো না। বাস ইতিমধ্যে স্টপেজ ছেড়ে গেছে, তাই সে পরের বাসের জন্য অপেক্ষা করল।",
  },
  21: {
    story: "The teacher blamed Imran for the broken window, but she was [[barking up the wrong tree]]. Imran was absent that day; another boy had broken it.",
    storyBn: "শিক্ষক ভাঙা জানালার জন্য ইমরানকে দোষ দিলেন, কিন্তু তিনি ভুল মানুষকে দোষ দিচ্ছিলেন। ইমরান সেদিন অনুপস্থিত ছিল; অন্য একটি ছেলে এটি ভেঙেছিল।",
  },
  22: {
    story: "During the flood, the villagers built a wall of sandbags to [[keep the water at bay]]. Because of their hard work, their houses stayed dry through the night.",
    storyBn: "বন্যার সময় গ্রামবাসীরা পানি দূরে রাখতে বালির বস্তার দেয়াল তৈরি করল। তাদের কঠোর পরিশ্রমের কারণে সারা রাত তাদের ঘর শুকনো রইল।",
  },
  23: {
    story: "Rafiq broke his father's watch and hid it for two days. At last he [[made a clean breast of it]] and told his father everything, and his father forgave him.",
    storyBn: "রফিক বাবার ঘড়ি ভেঙে দুই দিন লুকিয়ে রাখল। শেষে সে সব স্বীকার করে বাবাকে সবকিছু বলল, আর বাবা তাকে ক্ষমা করে দিলেন।",
  },
  24: {
    story: "Everyone thought the small shopkeeper would lose the price war with the big store. But he [[had a card up his sleeve]] — a new low-cost supplier — and he surprised everyone.",
    storyBn: "সবাই ভেবেছিল ছোট দোকানদার বড় দোকানের সঙ্গে দামের লড়াইয়ে হেরে যাবে। কিন্তু তার হাতে গোপন পরিকল্পনা ছিল — কম দামের নতুন সরবরাহকারী — এবং সে সবাইকে অবাক করে দিল।",
  },
  25: {
    story: "Waiting outside the interview room, Farhan was [[like a cat on hot bricks]]. He kept walking up and down and checked his watch every minute.",
    storyBn: "ইন্টারভিউ রুমের বাইরে অপেক্ষা করতে করতে ফারহান খুব অস্থির হয়ে পড়েছিল। সে বারবার এদিক-ওদিক হাঁটছিল আর প্রতি মিনিটে ঘড়ি দেখছিল।",
  },
  26: {
    story: "After their marriage, the couple quarrelled over small things every day and led a [[cat and dog life]]. Later, with patience and kind words, they learned to live in peace.",
    storyBn: "বিয়ের পর দম্পতিটি প্রতিদিন ছোটখাটো বিষয়ে ঝগড়া করে ঝগড়ায় ভরা জীবন কাটাত। পরে ধৈর্য আর ভালো কথায় তারা শান্তিতে থাকতে শিখল।",
  },
  27: {
    story: "The boy came late and said a tiger had blocked his road to school. The teacher smiled, knowing it was a [[cock and bull story]], and asked him to tell the truth.",
    storyBn: "ছেলেটি দেরি করে এসে বলল, একটি বাঘ স্কুলের রাস্তা আটকে দিয়েছিল। শিক্ষক হেসে বুঝলেন এটি বানানো গল্প, এবং তাকে সত্যি কথা বলতে বললেন।",
  },
  28: {
    story: "The little boy asked his father to buy him a real aeroplane. His father laughed and said, 'You are [[crying for the moon]], my son — ask for a toy plane instead.'",
    storyBn: "ছোট ছেলেটি বাবাকে আসল বিমান কিনে দিতে বলল। বাবা হেসে বললেন, 'তুমি অসম্ভব জিনিস চাইছ, বাবা — বরং খেলনা বিমান চাও।'",
  },
  29: {
    story: "Before buying the old motorcycle, Shakil carefully discussed [[the pros and cons]] with his elder brother. In the end they decided to save more money and buy a new one.",
    storyBn: "পুরোনো মোটরসাইকেল কেনার আগে শাকিল বড় ভাইয়ের সঙ্গে এর ভালো-মন্দ সব দিক বিস্তারিতভাবে আলোচনা করল। শেষে তারা ঠিক করল আরও টাকা জমিয়ে নতুন কিনবে।",
  },
  30: {
    story: "With two exams on the same day and a sick mother at home, Lima was [[in a tight corner]]. Her friends helped her with notes, and she managed both exams well.",
    storyBn: "একই দিনে দুটি পরীক্ষা আর বাসায় অসুস্থ মা থাকায় লিমা খুব কঠিন পরিস্থিতিতে পড়েছিল। বন্ধুরা নোট দিয়ে সাহায্য করল, আর সে দুটি পরীক্ষাই ভালোভাবে সামলে নিল।",
  },
  31: {
    story: "The clerk checked the application form three times before submitting it; he always [[crosses his t's and dots his i's]]. Because of his care, the office never finds a mistake in his work.",
    storyBn: "কেরানিটি জমা দেওয়ার আগে আবেদন ফর্মটি তিনবার পরীক্ষা করল; সে সবসময় নিখুঁত, সতর্ক ও যত্নশীলভাবে কাজ করে। তার যত্নের কারণে অফিস কখনো তার কাজে ভুল পায় না।",
  },
  32: {
    story: "After the quarrel, Dina kept her rude colleague [[at arm's length]]. She spoke to him only about work and avoided all personal talk.",
    storyBn: "ঝগড়ার পর দিনা তার অভদ্র সহকর্মীকে দূরত্বে রাখল। সে তার সঙ্গে শুধু কাজের কথা বলত এবং সব ব্যক্তিগত আলাপ এড়িয়ে চলত।",
  },
  33: {
    story: "'Can I skip the final exam and still pass?' the student asked. The teacher replied, 'That is [[out of the question]] — everyone must sit for it.'",
    storyBn: "'আমি কি চূড়ান্ত পরীক্ষা না দিয়েও পাস করতে পারি?' ছাত্রটি জিজ্ঞেস করল। শিক্ষক উত্তর দিলেন, 'এটা অসম্ভব — সবাইকে পরীক্ষা দিতেই হবে।'",
  },
  34: {
    story: "The quiet village boy found the busy city life quite [[out of the way]] at first. But after a month, the noise and the crowds felt normal to him.",
    storyBn: "শান্ত গ্রামের ছেলেটি প্রথমে ব্যস্ত শহরের জীবন খুব অদ্ভুত মনে করল। কিন্তু এক মাস পর শব্দ আর ভিড় তার কাছে স্বাভাবিক লাগল।",
  },
  35: {
    story: "When the guard shouted, the thief [[showed a clean pair of heels]] and ran into the dark lane. Nobody could catch him that night.",
    storyBn: "পাহারাদার চিৎকার করতেই চোরটি দ্রুত পালিয়ে অন্ধকার গলিতে ঢুকে গেল। সেদিন রাতে কেউ তাকে ধরতে পারল না।",
  },
  36: {
    story: "Tomorrow the result of my admission test will come out. Please [[keep your fingers crossed]] for me — I really want a place in that college.",
    storyBn: "কাল আমার ভর্তি পরীক্ষার ফল বের হবে। আমার জন্য এই আশায় থেকো যেন পরিকল্পনা নষ্ট না হয় — আমি সত্যিই ওই কলেজে জায়গা চাই।",
  },
  37: {
    story: "The ambulance reached the hospital [[in the nick of time]]. The doctors started the treatment at once and saved the patient's life.",
    storyBn: "অ্যাম্বুলেন্সটি ঠিক শেষ মুহূর্তে হাসপাতালে পৌঁছল। ডাক্তাররা সঙ্গে সঙ্গে চিকিৎসা শুরু করে রোগীর জীবন বাঁচালেন।",
  },
  38: {
    story: "Both candidates asked for Ratan's vote, but he is still [[sitting on the fence]]. He wants to hear both sides once more before he decides.",
    storyBn: "দুই প্রার্থীই রতনের ভোট চাইল, কিন্তু সে এখনো দুটি সিদ্ধান্তের মাঝে দ্বিধায় আছে। সিদ্ধান্ত নেওয়ার আগে সে দুই পক্ষের কথা আরেকবার শুনতে চায়।",
  },
  39: {
    story: "The news of the team's victory [[spread like wild fire]] through the village. Within an hour, everyone was celebrating in the field.",
    storyBn: "দলের জয়ের খবর গ্রামজুড়ে দ্রুত ছড়িয়ে পড়ল। এক ঘণ্টার মধ্যে সবাই মাঠে উদ্‌যাপন করছিল।",
  },
  40: {
    story: "With [[the gift of the gab]], our guide made even a simple village road sound like an adventure. The tourists listened to him happily for hours.",
    storyBn: "কথা বলার প্রতিভা দিয়ে আমাদের গাইড সাধারণ গ্রামের রাস্তাকেও অভিযানের মতো শোনাল। পর্যটকরা ঘণ্টার পর ঘণ্টা খুশি মনে তার কথা শুনল।",
  },
  41: {
    story: "The poor farmer was determined to send his son to university [[by hook or by crook]]. He worked day and night and saved every taka he could.",
    storyBn: "গরিব কৃষকটি যেকোনো উপায়ে ছেলেকে বিশ্ববিদ্যালয়ে পাঠাতে বদ্ধপরিকর ছিল। সে দিনরাত কাজ করে যত টাকা পারে জমাল।",
  },
  42: {
    story: "The cashier used his position to [[feather his own nest]] with the office money. When the audit came, his dishonesty was caught and he lost his job.",
    storyBn: "ক্যাশিয়ার তার পদ ব্যবহার করে অফিসের টাকা দিয়ে অন্যায়ভাবে নিজের আয় বাড়াল। অডিট এলে তার অসততা ধরা পড়ল এবং সে চাকরি হারাল।",
  },
  43: {
    story: "A sudden strike [[threw]] the whole transport system of the city [[out of gear]]. Offices opened late, and students could not reach their classes on time.",
    storyBn: "হঠাৎ ধর্মঘটে পুরো শহরের যাতায়াত ব্যবস্থায় ব্যাঘাত ঘটল। অফিস দেরিতে খুলল, আর শিক্ষার্থীরা সময়মতো ক্লাসে পৌঁছাতে পারল না।",
  },
  44: {
    story: "As soon as the boys saw the angry farmer coming, they [[took to their heels]]. They ran across the field without looking back.",
    storyBn: "ছেলেরা রাগী কৃষককে আসতে দেখেই পালিয়ে গেল। তারা পেছনে না তাকিয়ে মাঠ পেরিয়ে ছুটল।",
  },
  45: {
    story: "The small team fought [[tooth and nail]] to win the match. In the very last minute they scored the winning goal.",
    storyBn: "ছোট দলটি ম্যাচ জিততে সর্বশক্তি দিয়ে লড়ল। একেবারে শেষ মিনিটে তারা জয়সূচক গোলটি করল।",
  },
  46: {
    story: "The old postman worked in the same office for forty years and [[died in harness]] just one month before his retirement. Everyone in the village respected him deeply.",
    storyBn: "বৃদ্ধ ডাকপিয়ন একই অফিসে চল্লিশ বছর কাজ করে অবসরের মাত্র এক মাস আগে চাকরিতে থাকা অবস্থায় মারা গেলেন। গ্রামের সবাই তাকে গভীরভাবে শ্রদ্ধা করত।",
  },
  47: {
    story: "Your elder sister wakes up early and studies every day. You should [[take a leaf out of her book]] and build the same good habit.",
    storyBn: "তোমার বড় বোন ভোরে উঠে প্রতিদিন পড়ে। তোমার উচিত তাকে অনুকরণ করে একই ভালো অভ্যাস গড়া।",
  },
  48: {
    story: "The police [[left no stone unturned]] to find the lost child. They searched every house in the area and found her safely by the evening.",
    storyBn: "পুলিশ হারানো শিশুটিকে খুঁজতে সব উপায় ব্যবহার করল, কোনো চেষ্টা বাকি রাখল না। তারা এলাকার প্রতিটি বাড়ি তল্লাশি করে সন্ধ্যার মধ্যে তাকে নিরাপদে খুঁজে পেল।",
  },
  49: {
    story: "The committee chose a chairman who was only [[a man of straw]]; the real decisions were taken by others behind him. Soon the members demanded a stronger leader.",
    storyBn: "কমিটি এমন একজন সভাপতি বেছে নিল যে ছিল গুরুত্বহীন মানুষ; আসল সিদ্ধান্ত তার পেছনে অন্যরা নিত। শীঘ্রই সদস্যরা আরও শক্তিশালী নেতা দাবি করল।",
  },
  50: {
    story: "Her letter said she was fine, but if you [[read between the lines]], you can see she is lonely and sad. I called her that evening and talked with her for an hour.",
    storyBn: "তার চিঠিতে লেখা ছিল সে ভালো আছে, কিন্তু লাইনের ফাঁকে লুকানো অর্থ বুঝলে দেখা যায় সে একা ও দুঃখী। সেদিন সন্ধ্যায় আমি তাকে ফোন করে এক ঘণ্টা কথা বললাম।",
  },
  51: {
    story: "The hunter killed the gentle deer [[in cold blood]], though it had done him no harm at all. The villagers were shocked by his cruelty.",
    storyBn: "শিকারি শান্ত হরিণটিকে ইচ্ছাকৃতভাবে ও আবেগ ছাড়া হত্যা করল, যদিও হরিণটি তার কোনো ক্ষতিই করেনি। গ্রামবাসীরা তার নিষ্ঠুরতায় হতবাক হলো।",
  },
  52: {
    story: "The broken road beside our school is [[a thorn in the flesh]] for every student. We have asked the chairman many times to repair it.",
    storyBn: "আমাদের স্কুলের পাশের ভাঙা রাস্তাটি প্রতিটি শিক্ষার্থীর জন্য বিরক্তির চিরস্থায়ী কারণ। আমরা চেয়ারম্যানকে অনেকবার এটি মেরামত করতে বলেছি।",
  },
  53: {
    story: "A stranger offered me a brand-new phone for only two thousand taka. I [[smelled a rat]] and refused to buy it, because such cheap offers are usually stolen goods.",
    storyBn: "এক অপরিচিত লোক আমাকে মাত্র দুই হাজার টাকায় একদম নতুন ফোন দিতে চাইল। আমি খারাপ কিছু সন্দেহ করে কিনতে রাজি হলাম না, কারণ এমন সস্তা প্রস্তাব সাধারণত চোরাই মালের হয়।",
  },
  54: {
    story: "My grandfather always [[harps on the same string]]: 'Save money while you are young.' We have heard it a hundred times, but he is right.",
    storyBn: "আমার দাদা সবসময় একই বিষয়ে বারবার বলেন: 'তরুণ বয়সে টাকা জমাও।' আমরা এটি শতবার শুনেছি, কিন্তু তিনি ঠিকই বলেন।",
  },
  55: {
    story: "After ten years of quarrel, the two neighbours finally [[buried the hatchet]]. They shook hands and promised to help each other from now on.",
    storyBn: "দশ বছরের ঝগড়ার পর দুই প্রতিবেশী অবশেষে ঝগড়া শেষ করে শান্তি করল। তারা হাত মিলিয়ে প্রতিশ্রুতি দিল এখন থেকে একে অপরকে সাহায্য করবে।",
  },
  56: {
    story: "When the bus broke down in the lonely hills, the driver [[left us in the lurch]] and walked away. We waited three hours in the rain before another bus came.",
    storyBn: "নির্জন পাহাড়ে বাস নষ্ট হয়ে গেলে চালক আমাদের বিপদে ফেলে হেঁটে চলে গেল। আরেকটি বাস আসার আগে আমরা বৃষ্টিতে তিন ঘণ্টা অপেক্ষা করলাম।",
  },
  57: {
    story: "On his first day in the city office, the village boy felt [[like a fish out of water]]. Everyone spoke fast English, and he understood very little.",
    storyBn: "শহরের অফিসে প্রথম দিনে গ্রামের ছেলেটি অপরিচিত পরিস্থিতিতে পড়ল। সবাই দ্রুত ইংরেজি বলছিল, আর সে খুব কমই বুঝতে পারছিল।",
  },
  58: {
    story: "The rich man's servant had to stay [[at his beck and call]] all day and night. Even on holidays, one call from the master brought him running.",
    storyBn: "ধনী লোকটির চাকরকে সারাদিন ও সারারাত তার নিয়ন্ত্রণে প্রস্তুত থাকতে হতো। ছুটির দিনেও মনিবের এক ডাকে সে ছুটে আসত।",
  },
  59: {
    story: "With his small salary, the rickshaw puller works hard [[to make both ends meet]]. Somehow he still sends his children to school.",
    storyBn: "অল্প বেতনে রিকশাচালকটি আয়ের মধ্যে জীবন চালাতে কঠোর পরিশ্রম করে। তবু কোনোভাবে সে তার সন্তানদের স্কুলে পাঠায়।",
  },
  60: {
    story: "Roni broke the school window during the game and is now [[in hot water]] with the head teacher. He has promised to pay for a new one.",
    storyBn: "রনি খেলার সময় স্কুলের জানালা ভেঙে এখন প্রধান শিক্ষকের কাছে বিপদে পড়েছে। সে নতুন জানালার টাকা দেওয়ার প্রতিশ্রুতি দিয়েছে।",
  },
  61: {
    story: "A small quarrel started between the two friends over a silly joke. Their teacher stopped it at once and [[nipped it in the bud]] before it grew into a big fight.",
    storyBn: "একটি বাজে রসিকতা নিয়ে দুই বন্ধুর মধ্যে ছোট ঝগড়া শুরু হলো। তাদের শিক্ষক সঙ্গে সঙ্গে তা থামিয়ে বড় লড়াই হওয়ার আগেই শুরুতেই শেষ করে দিলেন।",
  },
  62: {
    story: "Everyone advised the honest officer to change his report, but he [[stuck to his guns]]. He said the truth must stay in the file, whatever happens.",
    storyBn: "সবাই সৎ কর্মকর্তাকে তার প্রতিবেদন বদলাতে পরামর্শ দিল, কিন্তু সে নিজের অবস্থানে অটল রইল। সে বলল, যাই হোক, সত্য ফাইলেই থাকতে হবে।",
  },
  63: {
    story: "The proud manager had laughed at the new plan, but the plan worked and his own idea failed. He had to [[eat humble pie]] and say sorry to the whole team.",
    storyBn: "অহংকারী ম্যানেজার নতুন পরিকল্পনা নিয়ে হেসেছিলেন, কিন্তু পরিকল্পনাটি কাজ করল আর তার নিজের ভাবনা ব্যর্থ হলো। তাকে অপমান মেনে বিনয়ের সঙ্গে পুরো দলের কাছে ক্ষমা চাইতে হলো।",
  },
  64: {
    story: "After winning the science fair, the students were [[in high spirits]] all day. They sang on the bus all the way back to school.",
    storyBn: "বিজ্ঞান মেলা জেতার পর শিক্ষার্থীরা সারাদিন খুবই খুশি ছিল। তারা স্কুলে ফেরার পুরো পথ বাসে গান গাইল।",
  },
  65: {
    story: "You are [[putting the cart before the horse]] — you bought a uniform before getting the job! First get the job, then buy what you need.",
    storyBn: "তুমি ভুল ক্রমে কাজ করছ — চাকরি পাওয়ার আগেই ইউনিফর্ম কিনে ফেলেছ! আগে চাকরি পাও, তারপর যা দরকার কেনো।",
  },
  66: {
    story: "In anger, the two boys began [[to call]] each other [[names]] in the playground. The teacher stopped them and made them shake hands and say sorry.",
    storyBn: "রাগে দুই ছেলে খেলার মাঠে একে অপরকে গালিগালাজ করতে শুরু করল। শিক্ষক তাদের থামিয়ে হাত মেলাতে ও ক্ষমা চাইতে বাধ্য করলেন।",
  },
  67: {
    story: "The whole family sat [[on tenterhooks]] while the doctor examined the little girl. When he smiled and said she was fine, everyone breathed again.",
    storyBn: "ডাক্তার ছোট মেয়েটিকে পরীক্ষা করার সময় পুরো পরিবার উদ্বেগ ও উৎকণ্ঠায় ছিল। তিনি হেসে যখন বললেন সে ভালো আছে, সবাই আবার নিশ্বাস ফেলল।",
  },
  68: {
    story: "It is wrong to [[wash your dirty linen]] in public and discuss family problems before strangers. Such matters should stay inside the home.",
    storyBn: "নিজের গোপন খারাপ কথা সবার সামনে প্রকাশ করে অপরিচিতদের সামনে পারিবারিক সমস্যা আলোচনা করা ভুল। এসব বিষয় ঘরের ভেতরেই থাকা উচিত।",
  },
  69: {
    story: "Everyone knew the new rule was unfair, but nobody dared to complain to the manager. At last young Mira agreed [[to bell the cat]] and speak to him for all of us.",
    storyBn: "সবাই জানত নতুন নিয়মটি অন্যায়, কিন্তু কেউ ম্যানেজারের কাছে অভিযোগ করার সাহস পাচ্ছিল না। শেষে তরুণী মিরা ঝুঁকি নিয়ে সবার পক্ষ থেকে তার সঙ্গে কথা বলতে রাজি হলো।",
  },
  70: {
    story: "The last question of the exam was [[a hard nut to crack]]. Only two students in the whole class could solve it.",
    storyBn: "পরীক্ষার শেষ প্রশ্নটি ছিল কঠিন সমস্যা। পুরো ক্লাসে মাত্র দুইজন শিক্ষার্থী এটি সমাধান করতে পেরেছিল।",
  },
  71: {
    story: "We had planned a surprise birthday party for Mother, but my little brother [[let the cat out of the bag]]. Now she knows everything, and the surprise is gone.",
    storyBn: "আমরা মায়ের জন্য সারপ্রাইজ জন্মদিনের পার্টির পরিকল্পনা করেছিলাম, কিন্তু আমার ছোট ভাই গোপন কথা ফাঁস করে দিল। এখন তিনি সব জানেন, আর চমক শেষ।",
  },
  72: {
    story: "When [[a big gun]] of the company visited our small office, everyone became busy and careful. The director himself checked every file that day.",
    storyBn: "কোম্পানির একজন গুরুত্বপূর্ণ ব্যক্তি আমাদের ছোট অফিসে এলে সবাই ব্যস্ত ও সতর্ক হয়ে গেল। পরিচালক নিজে সেদিন প্রতিটি ফাইল পরীক্ষা করলেন।",
  },
  73: {
    story: "By cycling to the office, Karim saves money and keeps his body fit — he [[kills two birds with one stone]]. He reaches work fresh and spends nothing on bus fare.",
    storyBn: "সাইকেল চালিয়ে অফিসে গিয়ে করিম টাকা বাঁচায় এবং শরীর ফিট রাখে — এক চেষ্টায় দুটি ফল পায়। সে সতেজ হয়ে কাজে পৌঁছায় এবং বাসভাড়ায় কিছুই খরচ করে না।",
  },
  74: {
    story: "The head teacher [[took the lazy clerk to task]] for coming late every day. The clerk promised to reach the office on time from the next morning.",
    storyBn: "প্রধান শিক্ষক প্রতিদিন দেরি করে আসার জন্য অলস কেরানিকে তিরস্কার করলেন। কেরানি পরদিন সকাল থেকে সময়মতো অফিসে পৌঁছানোর প্রতিশ্রুতি দিল।",
  },
  75: {
    story: "Our new English club is slowly [[gaining ground]] in the school. Last month only five students joined; now more than fifty practise speaking every week.",
    storyBn: "আমাদের নতুন ইংরেজি ক্লাব স্কুলে ধীরে ধীরে জনপ্রিয় হচ্ছে। গত মাসে মাত্র পাঁচজন শিক্ষার্থী যোগ দিয়েছিল; এখন পঞ্চাশের বেশি প্রতি সপ্তাহে কথা বলার অনুশীলন করে।",
  },
  76: {
    story: "Nobody likes a man who always [[blows his own trumpet]]. Let your good work speak for you instead of praising yourself all day.",
    storyBn: "যে মানুষ সবসময় নিজের কৃতিত্বের প্রশংসা নিজে করে, তাকে কেউ পছন্দ করে না। সারাদিন নিজের প্রশংসা না করে তোমার ভালো কাজকেই কথা বলতে দাও।",
  },
  77: {
    story: "Rahim is not just my classmate; he is [[a bosom friend]] of mine. I can share every secret with him without any fear.",
    storyBn: "রহিম শুধু আমার সহপাঠী নয়; সে আমার খুব ঘনিষ্ঠ বন্ধু। আমি কোনো ভয় ছাড়াই তার সঙ্গে সব গোপন কথা ভাগ করতে পারি।",
  },
  78: {
    story: "Sitting by the window, the old poet fell into [[a brown study]] and forgot his tea. He was dreaming of the village of his childhood.",
    storyBn: "জানালার পাশে বসে বৃদ্ধ কবি ভাবনায় ডুবে গেলেন এবং চায়ের কথা ভুলে গেলেন। তিনি শৈশবের গ্রামের স্বপ্ন দেখছিলেন।",
  },
  79: {
    story: "The students requested a library card again and again, but the clerk [[turned a deaf ear]] to them. At last the head teacher heard their request and helped them.",
    storyBn: "শিক্ষার্থীরা বারবার লাইব্রেরি কার্ডের অনুরোধ করল, কিন্তু কেরানি তাদের কথা উপেক্ষা করল। শেষে প্রধান শিক্ষক তাদের অনুরোধ শুনে সাহায্য করলেন।",
  },
  80: {
    story: "The bus slipped on the wet road and stopped just beside the ditch — it was [[a close shave]]! One more foot and we would have fallen in.",
    storyBn: "বাসটি ভেজা রাস্তায় পিছলে খাদের ঠিক পাশে থামল — অল্পের জন্য রক্ষা! আর এক ফুট গেলেই আমরা ভেতরে পড়ে যেতাম।",
  },
  81: {
    story: "After failing twice, Bilal decided to [[turn over a new leaf]]. He now wakes up early, studies daily, and never misses a class.",
    storyBn: "দুবার ব্যর্থ হওয়ার পর বিলাল ভালোর দিকে বদলে যাওয়ার সিদ্ধান্ত নিল। সে এখন ভোরে ওঠে, প্রতিদিন পড়ে এবং কখনো ক্লাস মিস করে না।",
  },
  82: {
    story: "After thinking for a week, Sara finally [[made up her mind]] to study nursing. She filled in the admission form the same day.",
    storyBn: "এক সপ্তাহ ভাবার পর সারা অবশেষে নার্সিং পড়ার সিদ্ধান্ত নিল। সে একই দিনে ভর্তির ফর্ম পূরণ করল।",
  },
  83: {
    story: "Learning a language feels slow at first, but [[in the long run]] daily practice makes you fluent. Do not give up after one difficult month.",
    storyBn: "ভাষা শেখা প্রথমে ধীর মনে হয়, কিন্তু শেষ পর্যন্ত প্রতিদিনের অনুশীলন তোমাকে সাবলীল করে তোলে। একটা কঠিন মাসের পর হাল ছেড়ো না।",
  },
  84: {
    story: "The reporter worked for months to [[bring]] the corruption [[to light]]. When the news was published, the whole town finally knew the truth.",
    storyBn: "সাংবাদিক দুর্নীতি প্রকাশ করতে মাসের পর মাস কাজ করলেন। খবরটি ছাপা হলে পুরো শহর অবশেষে সত্য জানতে পারল।",
  },
  85: {
    story: "Years ago his partner had cheated him in business. Now he got a chance to [[pay off old scores]], but he chose to forgive instead of taking revenge.",
    storyBn: "বছরখানেক আগে তার ব্যবসায়িক অংশীদার তাকে ঠকিয়েছিল। এখন সে প্রতিশোধ নেওয়ার সুযোগ পেল, কিন্তু প্রতিশোধের বদলে ক্ষমা করাই বেছে নিল।",
  },
  86: {
    story: "Our school has [[hard and fast rules]] about attendance. If a student is absent three days without a letter, the office calls the parents.",
    storyBn: "উপস্থিতি নিয়ে আমাদের স্কুলে কঠোর নিয়ম আছে। কোনো শিক্ষার্থী চিঠি ছাড়া তিন দিন অনুপস্থিত থাকলে অফিস অভিভাবকদের ফোন করে।",
  },
  87: {
    story: "He submitted his scholarship application [[at the eleventh hour]], just five minutes before the deadline. Luckily, the office accepted it.",
    storyBn: "সে শেষ মুহূর্তে, সময়সীমার মাত্র পাঁচ মিনিট আগে বৃত্তির আবেদন জমা দিল। ভাগ্য ভালো, অফিস তা গ্রহণ করল।",
  },
  89: {
    story: "The young singer forgot his lines on the stage and [[cut a sorry figure]] before the whole audience. He promised himself to practise much more before the next show.",
    storyBn: "তরুণ গায়ক মঞ্চে তার লাইন ভুলে গিয়ে পুরো দর্শকের সামনে হাসির পাত্র হলো। সে নিজেকে প্রতিশ্রুতি দিল পরের অনুষ্ঠানের আগে আরও অনেক অনুশীলন করবে।",
  },
  90: {
    story: "The landlord ruled his tenants [[with a high hand]] and never listened to their problems. Soon most families left his building for kinder owners.",
    storyBn: "বাড়িওয়ালা অত্যাচারমূলকভাবে ভাড়াটিয়াদের শাসন করত এবং তাদের সমস্যা কখনো শুনত না। শীঘ্রই বেশিরভাগ পরিবার তার বাড়ি ছেড়ে ভালো মালিকের কাছে চলে গেল।",
  },
  91: {
    story: "I tried to settle my neighbours' quarrel and [[burned my fingers]] — both sides became angry with me! Now I stay away from other people's fights.",
    storyBn: "আমি প্রতিবেশীদের ঝগড়া মেটাতে গিয়ে বিপদে পড়লাম — দুই পক্ষই আমার ওপর রাগ করল! এখন আমি অন্যের ঝগড়া থেকে দূরে থাকি।",
  },
  92: {
    story: "The little clown's funny dance made the children [[laugh their heads off]]. Even the serious head teacher could not stop smiling.",
    storyBn: "ছোট ক্লাউনের মজার নাচে শিশুরা প্রাণ খুলে হাসল। গম্ভীর প্রধান শিক্ষকও হাসি থামাতে পারলেন না।",
  },
  93: {
    story: "After the meeting, the manager sat alone to [[chew the cud]] over the new plan. He wanted to think deeply before giving his final answer.",
    storyBn: "সভার পর ম্যানেজার নতুন পরিকল্পনা নিয়ে গভীরভাবে ভাবতে একা বসলেন। চূড়ান্ত উত্তর দেওয়ার আগে তিনি গভীরভাবে চিন্তা করতে চাইলেন।",
  },
  94: {
    story: "In the group project, Tania did most of the work while I [[played second fiddle]] and only wrote the last page. Next time I will take a bigger role.",
    storyBn: "দলগত প্রকল্পে তানিয়া বেশিরভাগ কাজ করল, আর আমি গুরুত্বহীন ভূমিকা পালন করে শুধু শেষ পৃষ্ঠাটি লিখলাম। পরের বার আমি বড় ভূমিকা নেব।",
  },
  95: {
    story: "Our accounts are completely [[above board]] — every taka is written in the book. Anyone may come and check them at any time.",
    storyBn: "আমাদের হিসাব সম্পূর্ণ সৎ ও খোলামেলা — প্রতিটি টাকা খাতায় লেখা আছে। যে কেউ যেকোনো সময় এসে পরীক্ষা করতে পারে।",
  },
  96: {
    story: "My friend stood by me [[through thick and thin]], in my good days and my bad days. Such a friend is rarer than gold.",
    storyBn: "আমার বন্ধু সব পরিস্থিতিতে, ভালো দিনে ও খারাপ দিনে আমার পাশে ছিল। এমন বন্ধু সোনার চেয়েও দুর্লভ।",
  },
  97: {
    story: "Just before the school trip, someone [[put a spoke in our wheel]] by cancelling the bus booking. We had to find another bus in a great hurry.",
    storyBn: "স্কুল ভ্রমণের ঠিক আগে কেউ বাসের বুকিং বাতিল করে আমাদের পরিকল্পনা নষ্ট করল। আমাদের খুব তাড়াহুড়ো করে আরেকটি বাস খুঁজতে হলো।",
  },
  98: {
    story: "After the long holiday, the classroom was [[at sixes and sevens]] — books here, bags there, and chairs upside down. The students cleaned it together in ten minutes.",
    storyBn: "লম্বা ছুটির পর শ্রেণিকক্ষটি এলোমেলো ও বিশৃঙ্খল অবস্থায় ছিল — এখানে বই, ওখানে ব্যাগ, আর চেয়ার উল্টানো। শিক্ষার্থীরা মিলে দশ মিনিটে তা পরিষ্কার করল।",
  },
  99: {
    story: "In our new English class I feel quite [[at home]], because the teacher is kind and the students are friendly. I am not nervous at all now.",
    storyBn: "আমাদের নতুন ইংরেজি ক্লাসে আমি বেশ স্বস্তিতে আছি, কারণ শিক্ষক সদয় এবং শিক্ষার্থীরা বন্ধুসুলভ। এখন আমি মোটেও ঘাবড়াই না।",
  },
  100: {
    story: "For my grandmother, her family is the [[alpha and omega]] of her life — the beginning and the end of everything. Nothing matters more to her than her children and grandchildren.",
    storyBn: "আমার দাদির কাছে তার পরিবারই জীবনের শুরু ও শেষ — সবকিছুর আরম্ভ ও সমাপ্তি। তার সন্তান ও নাতি-নাতনিদের চেয়ে গুরুত্বপূর্ণ তার কাছে আর কিছুই নয়।",
  },
  101: {
    story: "When the teacher asked a question in English, the new student felt completely [[at sea]]. He did not understand a single word and stayed silent.",
    storyBn: "শিক্ষক ইংরেজিতে প্রশ্ন করলে নতুন শিক্ষার্থীটি সম্পূর্ণ বিভ্রান্ত ও দিশাহারা বোধ করল। সে একটি শব্দও বুঝতে পারল না এবং চুপ করে রইল।",
  },
  104: {
    story: "Her small tailoring business is growing [[by leaps and bounds]]. Last year she had one machine; now she employs ten women of the village.",
    storyBn: "তার ছোট সেলাই ব্যবসা দ্রুতগতিতে বাড়ছে। গত বছর তার একটি মেশিন ছিল; এখন সে গ্রামের দশজন মহিলাকে কাজ দেয়।",
  },
  105: {
    story: "Once Rashed signed the contract and paid the advance, he [[burned his boats]] — there was no way back. He had to make the new shop a success.",
    storyBn: "রাশেদ চুক্তি সই করে অগ্রিম টাকা দেওয়ার পর সে পিছু হটার পথ বন্ধ করে ফেলল — ফিরে যাওয়ার কোনো উপায় রইল না। তাকে নতুন দোকানটি সফল করতেই হতো।",
  },
  106: {
    story: "I asked him a simple question about the price, but he kept [[beating about the bush]] for ten minutes. In the end he never told me the real price.",
    storyBn: "আমি তাকে দাম নিয়ে সহজ প্রশ্ন করলাম, কিন্তু সে দশ মিনিট ধরে আসল কথা এড়িয়ে অপ্রাসঙ্গিক কথা বলতে থাকল। শেষ পর্যন্ত সে আসল দামটি আমাকে বললই না।",
  },
  107: {
    story: "The rich man [[burned the candle at both ends]], spending his money on parties every night and costly gifts every day. Within two years, all his savings were gone.",
    storyBn: "ধনী লোকটি প্রতি রাতে পার্টিতে আর প্রতিদিন দামি উপহারে টাকা অপচয় করত। দুই বছরের মধ্যে তার সব সঞ্চয় শেষ হয়ে গেল।",
  },
  109: {
    story: "The old mango tree between the two houses became [[a bone of contention]]. Both families claimed it, and they quarrelled every summer over its fruit.",
    storyBn: "দুই বাড়ির মাঝখানের পুরোনো আমগাছটি ঝগড়ার কারণ হয়ে উঠল। দুই পরিবারই এটি নিজের বলে দাবি করল, আর প্রতি গ্রীষ্মে এর ফল নিয়ে ঝগড়া হতো।",
  },
  110: {
    story: "The two leaders were already angry, and the rude comment [[added fuel to the fire]]. The meeting ended in shouting instead of a solution.",
    storyBn: "দুই নেতা ইতিমধ্যে রেগে ছিলেন, আর অভদ্র মন্তব্যটি পরিস্থিতি আরও খারাপ করল। সমাধানের বদলে সভাটি চিৎকারে শেষ হলো।",
  },
  111: {
    story: "The final match will be [[an acid test]] for our young team. If they can beat the champions, they will prove they are truly strong.",
    storyBn: "ফাইনাল ম্যাচটি আমাদের তরুণ দলের জন্য কঠিন পরীক্ষা হবে। চ্যাম্পিয়নদের হারাতে পারলে তারা প্রমাণ করবে তারা সত্যিই শক্তিশালী।",
  },
  112: {
    story: "The government office is repairing the road [[at a snail's pace]]. After three months, only a small part of the work is finished.",
    storyBn: "সরকারি অফিস খুব ধীরে ধীরে রাস্তাটি মেরামত করছে। তিন মাস পর কাজের মাত্র ছোট একটি অংশ শেষ হয়েছে।",
  },
  113: {
    story: "The news of my scholarship came like [[a bolt from the blue]]. I had not expected it at all, and I ran home happily to tell my parents.",
    storyBn: "আমার বৃত্তির খবরটি অপ্রত্যাশিত কিছুর মতো এল। আমি মোটেও আশা করিনি, আর খুশিতে দৌড়ে বাসায় গিয়ে বাবা-মাকে বললাম।",
  },
  114: {
    story: "Stop [[building castles in the air]] about becoming rich in one month! Make a real plan, work hard, and grow step by step.",
    storyBn: "এক মাসে ধনী হওয়ার কাল্পনিক পরিকল্পনা করা বন্ধ করো! আসল পরিকল্পনা করো, কঠোর পরিশ্রম করো এবং ধাপে ধাপে এগিয়ে যাও।",
  },
  115: {
    story: "My uncle visits our village [[once in a blue moon]], perhaps one time in five years. So when he comes, the whole family gathers for a big meal.",
    storyBn: "আমার চাচা খুবই কদাচিৎ, হয়তো পাঁচ বছরে একবার আমাদের গ্রামে আসেন। তাই তিনি এলে পুরো পরিবার বড় খাবারের জন্য জড়ো হয়।",
  },
  116: {
    story: "I asked the officer directly about my passport, but he kept [[beating around the bush]] and talked about office rules. I still do not know when I will get it.",
    storyBn: "আমি কর্মকর্তাকে সরাসরি আমার পাসপোর্টের কথা জিজ্ঞেস করলাম, কিন্তু তিনি মূল বিষয় এড়িয়ে অফিসের নিয়মের কথা বলতে থাকলেন। আমি এখনো জানি না কখন তা পাব।",
  },
  117: {
    story: "Yes, you lost some money in that business, but [[crying over spilled milk]] will not bring it back. Learn from the mistake and start again carefully.",
    storyBn: "হ্যাঁ, ওই ব্যবসায় তুমি কিছু টাকা হারিয়েছ, কিন্তু অতীতের ক্ষতি নিয়ে অভিযোগ করলে তা ফিরে আসবে না। ভুল থেকে শেখো এবং সাবধানে আবার শুরু করো।",
  },
  118: {
    story: "Ratan still has a [[chip on his shoulder]] about losing the school prize five years ago. He becomes upset whenever anyone mentions that day.",
    storyBn: "পাঁচ বছর আগে স্কুলের পুরস্কার হারানো নিয়ে রতনের এখনো মন খারাপ আছে। কেউ সেদিনের কথা বললেই সে বিরক্ত হয়ে যায়।",
  },
  119: {
    story: "Do not worry about the driving test — for a careful driver like you, it will be a [[piece of cake]]. You have practised on this road for months.",
    storyBn: "ড্রাইভিং টেস্ট নিয়ে চিন্তা করো না — তোমার মতো সতর্ক চালকের জন্য এটি খুব সহজ হবে। তুমি মাসের পর মাস এই রাস্তায় অনুশীলন করেছ।",
  },
  120: {
    story: "When the old manager retired after thirty years, the company gave him a [[golden handshake]] of ten lakh taka. He thanked everyone with tears in his eyes.",
    storyBn: "বৃদ্ধ ম্যানেজার ত্রিশ বছর পর অবসর নিলে কোম্পানি তাকে দশ লাখ টাকার বড় বিদায়ী অর্থ দিল। তিনি চোখে পানি নিয়ে সবাইকে ধন্যবাদ জানালেন।",
  },
  121: {
    story: "Please do not [[spill the beans]] about the surprise test tomorrow. If the students hear about it today, it will no longer be a surprise.",
    storyBn: "আগামীকালের সারপ্রাইজ পরীক্ষার কথা দয়া করে ফাঁস করে দিও না। শিক্ষার্থীরা আজ শুনে ফেললে এটি আর চমক থাকবে না।",
  },
  122: {
    story: "Losing that job was a [[blessing in disguise]] for Imran. A month later he found a better job near his home with a higher salary.",
    storyBn: "ওই চাকরি হারানো ইমরানের জন্য আসলে ভালোই হয়েছিল, যদিও প্রথমে খারাপ মনে হয়েছিল। এক মাস পর সে বাসার কাছে বেশি বেতনের ভালো চাকরি পেল।",
  },
  123: {
    story: "This time our team [[means business]] — we have trained every morning for two months. We are not here just to play; we are here to win.",
    storyBn: "এবার আমাদের দল গুরুত্বসহকারে ও নিষ্ঠার সঙ্গে নেমেছে — আমরা দুই মাস ধরে প্রতি সকালে প্রশিক্ষণ নিয়েছি। আমরা শুধু খেলতে আসিনি; জিততে এসেছি।",
  },
  124: {
    story: "She promised to finish her little sister's wedding dress in time, [[come hell or high water]]. Even when the machine broke, she sewed all night by hand.",
    storyBn: "সে প্রতিশ্রুতি দিল, যত বাধাই আসুক, ছোট বোনের বিয়ের পোশাক সময়মতো শেষ করবে। মেশিন নষ্ট হয়ে গেলেও সে সারা রাত হাতে সেলাই করল।",
  },
  125: {
    story: "The little girl is the [[apple of her grandfather's eye]]. He tells her a story every evening and never says no to her small wishes.",
    storyBn: "ছোট মেয়েটি তার দাদার অত্যন্ত আদরের। তিনি প্রতি সন্ধ্যায় তাকে গল্প শোনান এবং তার ছোট ছোট ইচ্ছায় কখনো না বলেন না।",
  },
  126: {
    story: "By taking five tuition jobs with his own studies, Arif [[bit off more than he could chew]]. Soon he was too tired to do any of them well.",
    storyBn: "নিজের পড়াশোনার সঙ্গে পাঁচটি টিউশনি নিয়ে আরিফ সামর্থ্যের বাইরে কাজ নিল। শীঘ্রই সে এত ক্লান্ত হয়ে পড়ল যে কোনোটাই ভালোভাবে করতে পারছিল না।",
  },
  127: {
    story: "Working from home gives Ruma [[the best of both worlds]]: she earns from her city job and still lives with her family in the village. She enjoys both comforts at the same time.",
    storyBn: "বাসা থেকে কাজ করা রুমাকে দুটি ভিন্ন পরিস্থিতির সুবিধা একসঙ্গে দেয়: সে শহরের চাকরি থেকে আয় করে আবার গ্রামে পরিবারের সঙ্গে থাকে। সে দুটি আরাম একসঙ্গে উপভোগ করে।",
  },
  128: {
    story: "I am [[feeling a bit under the weather]] today, so I will rest at home instead of going to the market. A cup of hot tea and sleep will help me.",
    storyBn: "আজ আমি কিছুটা অসুস্থ বোধ করছি, তাই বাজারে যাওয়ার বদলে বাসায় বিশ্রাম নেব। এক কাপ গরম চা আর ঘুম আমাকে সাহায্য করবে।",
  },
  129: {
    story: "The new library was already a gift for our school, and the free computer room was the [[icing on the cake]]. Now students can study and learn computer skills in one place.",
    storyBn: "নতুন লাইব্রেরিটি আমাদের স্কুলের জন্য ইতিমধ্যে উপহার ছিল, আর বিনামূল্যের কম্পিউটার রুমটি ভালোকে আরও ভালো করে তুলল। এখন শিক্ষার্থীরা এক জায়গায় পড়াশোনা ও কম্পিউটার দক্ষতা শিখতে পারে।",
  },
  130: {
    story: "That shiny smartphone [[costs an arm and a leg]] — nearly one lakh taka! I will buy a simpler phone and save the rest of my money.",
    storyBn: "ওই ঝকঝকে স্মার্টফোনটি খুবই ব্যয়বহুল — প্রায় এক লাখ টাকা! আমি সহজ একটি ফোন কিনব এবং বাকি টাকা জমিয়ে রাখব।",
  },
  131: {
    story: "When online classes became popular, every coaching centre [[jumped on the bandwagon]] and started live classes too. Nobody wanted to be left behind.",
    storyBn: "অনলাইন ক্লাস জনপ্রিয় হলে প্রতিটি কোচিং সেন্টার চলতি ধারায় যোগ দিয়ে লাইভ ক্লাস শুরু করল। কেউ পেছনে পড়ে থাকতে চাইল না।",
  },
  132: {
    story: "I have sent you my price and my conditions; now the [[ball is in your court]]. Please tell me tomorrow whether you accept the offer or not.",
    storyBn: "আমি তোমাকে আমার দাম ও শর্ত পাঠিয়ে দিয়েছি; এখন পরের সিদ্ধান্ত নেওয়া তোমার ওপর। কাল আমাকে জানাও তুমি প্রস্তাবটি গ্রহণ করছ কিনা।",
  },
  133: {
    story: "Since his shop closed, old Mr. Karim has been [[in the doldrums]]. His friends visit him every evening and try to cheer him up with stories and tea.",
    storyBn: "দোকান বন্ধ হওয়ার পর থেকে বৃদ্ধ করিম সাহেব মন খারাপ অবস্থায় আছেন। তার বন্ধুরা প্রতি সন্ধ্যায় তাকে দেখতে আসেন এবং গল্প ও চা দিয়ে তাকে খুশি করার চেষ্টা করেন।",
  },
  134: {
    story: "In the quarrel between the two brothers, their uncle chose [[to sit on the fence]] and support neither side. He said the two brothers must solve the problem themselves.",
    storyBn: "দুই ভাইয়ের ঝগড়ায় তাদের চাচা নিরপেক্ষ থাকা বেছে নিলেন এবং কোনো পক্ষকে সমর্থন করলেন না। তিনি বললেন, দুজনকেই নিজেদের সমস্যা নিজেদের মেটাতে হবে।",
  },
  135: {
    story: "At the training centre, nobody knew each other, so our teacher told a funny story to [[break the ice]]. Soon everyone was laughing and talking freely.",
    storyBn: "প্রশিক্ষণ কেন্দ্রে কেউ কাউকে চিনত না, তাই আমাদের শিক্ষক আলাপ শুরু করতে একটি মজার গল্প বললেন। শীঘ্রই সবাই হাসছিল এবং খোলামেলা কথা বলছিল।",
  },
  136: {
    story: "I [[heard it on the grapevine]] that our school will get a new science laboratory next year. It is only a rumour, so let us wait for the official news.",
    storyBn: "আমি গুজব শুনেছি যে আমাদের স্কুল আগামী বছর নতুন বিজ্ঞান ল্যাব পাবে। এটি শুধু গুজব, তাই আনুষ্ঠানিক খবরের জন্য অপেক্ষা করি।",
  },
  137: {
    story: "The quiet man in old clothes turned out to be a famous writer — you really [[can't judge a book by its cover]]. His simple look hid a great mind.",
    storyBn: "পুরোনো পোশাক পরা শান্ত লোকটি আসলে বিখ্যাত লেখক ছিলেন — সত্যিই বাইরের চেহারা দেখে বিচার করা যায় না। তার সরল চেহারার আড়ালে ছিল মহান মন।",
  },
  138: {
    story: "Do not blame only the driver for the accident — the helper was also careless, and [[it takes two to tango]]. Both of them must answer for their mistakes.",
    storyBn: "দুর্ঘটনার জন্য শুধু চালককে দোষ দিও না — হেলপারও অসতর্ক ছিল, আর কাজে একজনের বেশি মানুষ লাগে। দুজনকেই তাদের ভুলের জবাব দিতে হবে।",
  },
  140: {
    story: "After the fall from the bicycle, the boy's knees were [[black and blue]]. His mother cleaned the bruises gently and told him to rest for two days.",
    storyBn: "সাইকেল থেকে পড়ার পর ছেলেটির হাঁটু কালশিটে ভরা হয়ে গেল। তার মা যত্নে আঘাত পরিষ্কার করে দুই দিন বিশ্রাম নিতে বললেন।",
  },
  141: {
    story: "When the result sheet showed her name at the top, Fatima was [[on cloud nine]]. She called her mother at once and cried with happiness.",
    storyBn: "ফলের তালিকায় নিজের নাম সবার ওপরে দেখে ফাতিমা খুবই খুশি হলো। সে সঙ্গে সঙ্গে মাকে ফোন করে আনন্দে কেঁদে ফেলল।",
  },
  142: {
    story: "The bus was late, the road was muddy, and then the rain started — that was the [[last straw]] for the tired travellers. They decided to walk the rest of the way.",
    storyBn: "বাস দেরি করল, রাস্তা কাদাময় ছিল, তারপর বৃষ্টি শুরু হলো — ক্লান্ত যাত্রীদের জন্য সেটাই ছিল ধারাবাহিক সমস্যার শেষটি। তারা বাকি পথ হাঁটার সিদ্ধান্ত নিল।",
  },
  143: {
    story: "From the top of the hill you get a [[bird's eye view]] of the whole river and the green fields below. We stood there quietly and enjoyed the wide scene.",
    storyBn: "পাহাড়ের চূড়া থেকে পুরো নদী আর নিচের সবুজ মাঠের বিস্তৃত দৃশ্য দেখা যায়। আমরা সেখানে চুপচাপ দাঁড়িয়ে বিস্তৃত দৃশ্যটি উপভোগ করলাম।",
  },
  144: {
    story: "The village fair will be a [[litmus test]] for his new sweets shop. If people like the sweets there, he will know his business idea is right.",
    storyBn: "গ্রামের মেলা তার নতুন মিষ্টির দোকানের জন্য সঠিক কিনা জানার পরীক্ষা হবে। সেখানে মানুষ মিষ্টি পছন্দ করলে সে জানবে তার ব্যবসার ভাবনাটি ঠিক।",
  },
  145: {
    story: "Our neighbour is so kind that he helps anyone [[at the drop of a hat]]. One call, and he comes running with his tools.",
    storyBn: "আমাদের প্রতিবেশী এত সদয় যে তিনি সঙ্গে সঙ্গে যেকোনো মানুষকে সাহায্য করেন। একবার ডাকলেই তিনি যন্ত্রপাতি নিয়ে ছুটে আসেন।",
  },
  146: {
    story: "The little boy is [[afraid of his own shadow]] — even a falling leaf makes him jump. His elder sister holds his hand and walks with him to school.",
    storyBn: "ছোট ছেলেটি সহজেই ভয় পায় — পড়ন্ত পাতাও তাকে চমকে দেয়। তার বড় বোন তার হাত ধরে স্কুলে নিয়ে যায়।",
  },
  147: {
    story: "Their plan to open a shop without any money or workers was a [[house of cards]]. It fell apart within a week when the bills arrived.",
    storyBn: "টাকা বা কর্মী ছাড়া দোকান খোলার তাদের পরিকল্পনাটি ছিল দুর্বল পরিকল্পনা। বিল এলে এক সপ্তাহের মধ্যে তা ভেঙে পড়ল।",
  },
  148: {
    story: "He lives in a [[fool's paradise]], thinking his rich uncle will pay all his debts one day. In truth, the uncle knows nothing about them.",
    storyBn: "সে সুখের মিথ্যা অনুভূতিতে বাস করে, ভাবে তার ধনী চাচা একদিন তার সব ঋণ শোধ করে দেবেন। আসলে চাচা এসবের কিছুই জানেন না।",
  },
  149: {
    story: "The new workers [[got a raw deal]] — they worked the same hours as others but were paid less. The union complained to the owner about the unfair treatment.",
    storyBn: "নতুন কর্মীরা অন্যদের মতো ভালো আচরণ পেল না — তারা অন্যদের সমান ঘণ্টা কাজ করেও কম বেতন পেল। ইউনিয়ন এই অন্যায় আচরণ নিয়ে মালিকের কাছে অভিযোগ করল।",
  },
  150: {
    story: "After I refused his unfair proposal, my old partner began to [[give me the cold shoulder]]. He passes me in the street without a word.",
    storyBn: "আমি তার অন্যায় প্রস্তাব প্রত্যাখ্যান করার পর আমার পুরোনো অংশীদার আমাকে উপেক্ষা করতে শুরু করল। সে রাস্তায় কথা না বলে আমাকে পাশ কাটিয়ে যায়।",
  },
  151: {
    story: "The poor family lives [[hand to mouth]] — the father's daily wage buys only rice and vegetables. Still, they share their little food with guests happily.",
    storyBn: "গরিব পরিবারটি শুধু মৌলিক প্রয়োজন মিটিয়ে বেঁচে থাকে — বাবার দৈনিক মজুরিতে শুধু চাল আর সবজি কেনা যায়। তবু তারা খুশি মনে তাদের অল্প খাবার অতিথিদের সঙ্গে ভাগ করে।",
  },
  152: {
    story: "When I told my little brother there was no ice cream left, he [[made a face]] and walked away sadly. His disappointed look made everyone laugh gently.",
    storyBn: "আমি ছোট ভাইকে বললাম আইসক্রিম আর নেই, সে মুখের ভঙ্গিতে হতাশা দেখিয়ে দুঃখ মনে চলে গেল। তার হতাশ চেহারা দেখে সবাই মৃদু হাসল।",
  },
  153: {
    story: "The professor wrote long English sentences full of hard words, and I said, '[[It's Greek to me]]!' I understood nothing and asked him to explain simply.",
    storyBn: "অধ্যাপক কঠিন শব্দে ভরা লম্বা ইংরেজি বাক্য লিখলেন, আর আমি বললাম, 'এটা আমার কাছে বোধগম্য নয়!' আমি কিছুই বুঝলাম না এবং তাকে সহজ করে বোঝাতে বললাম।",
  },
  154: {
    story: "When the two groups began to shout at each other, the village elder stepped in [[to pour oil on troubled waters]]. His calm words ended the quarrel in minutes.",
    storyBn: "দুই দল একে অপরের ওপর চিৎকার শুরু করলে গ্রামের মুরুব্বি শান্তি স্থাপন করতে এগিয়ে এলেন। তার শান্ত কথায় কয়েক মিনিটে ঝগড়া শেষ হলো।",
  },
  155: {
    story: "My father always says, '[[Don't put all your eggs in one basket]].' That is why he keeps his savings in two banks and a little cash at home.",
    storyBn: "আমার বাবা সবসময় বলেন, 'সব সম্পদ এক জায়গায় রেখো না।' তাই তিনি তার সঞ্চয় দুটি ব্যাংকে এবং কিছু নগদ টাকা বাসায় রাখেন।",
  },
  156: {
    story: "[[To put it in a nutshell]], our school needs a library, and we need it this year. That short sentence carried the whole meeting's message.",
    storyBn: "সংক্ষেপে বলতে গেলে, আমাদের স্কুলের একটি লাইব্রেরি দরকার, আর তা এই বছরেই দরকার। এই ছোট বাক্যটিতেই পুরো সভার বার্তা ছিল।",
  },
  157: {
    story: "The singer promised to perform at our school programme, but at the last moment he [[backed out]]. We had to invite another singer in a hurry.",
    storyBn: "গায়ক আমাদের স্কুলের অনুষ্ঠানে গান গাওয়ার প্রতিশ্রুতি দিয়েছিলেন, কিন্তু শেষ মুহূর্তে তিনি প্রতিশ্রুতি থেকে সরে এলেন। আমাদের তাড়াহুড়ো করে আরেকজন গায়ককে আমন্ত্রণ জানাতে হলো।",
  },
  158: {
    story: "The old gas cylinder in the kitchen could [[blow up]] at any time, so the fire service removed it at once. They told us to check our cylinders every year.",
    storyBn: "রান্নাঘরের পুরোনো গ্যাস সিলিন্ডার যেকোনো সময় বিস্ফোরিত হতে পারত, তাই ফায়ার সার্ভিস সঙ্গে সঙ্গে তা সরিয়ে নিল। তারা আমাদের প্রতি বছর সিলিন্ডার পরীক্ষা করতে বলল।",
  },
  159: {
    story: "When everyone doubted my plan, my best friend [[backed]] me [[up]] and spoke for me in the meeting. His support gave me new courage.",
    storyBn: "সবাই আমার পরিকল্পনা নিয়ে সন্দেহ করলে আমার সবচেয়ে ভালো বন্ধু আমাকে সমর্থন করে সভায় আমার পক্ষে কথা বলল। তার সহায়তা আমাকে নতুন সাহস দিল।",
  },
  160: {
    story: "Your school certificate will [[back upon]] your application — it is relevant proof of your education. Keep a clean copy of it with your papers.",
    storyBn: "তোমার স্কুল সার্টিফিকেট তোমার আবেদনের সঙ্গে প্রাসঙ্গিক হবে — এটি তোমার শিক্ষার প্রমাণ। কাগজপত্রের সঙ্গে এর পরিষ্কার কপি রেখো।",
  },
  161: {
    story: "Our car [[broke down]] in the middle of the highway at midnight. We waited in the cold until a kind truck driver stopped to help us.",
    storyBn: "মাঝরাতে মহাসড়কের মাঝখানে আমাদের গাড়ি নষ্ট হয়ে গেল। একজন সদয় ট্রাকচালক সাহায্য করতে থামা পর্যন্ত আমরা ঠান্ডায় অপেক্ষা করলাম।",
  },
  162: {
    story: "The speaker suddenly [[broke off]] in the middle of his speech when the microphone failed. After two minutes, he smiled and continued from the same line.",
    storyBn: "মাইক্রোফোন নষ্ট হয়ে গেলে বক্তা হঠাৎ বক্তৃতার মাঝখানে থেমে গেলেন। দুই মিনিট পর তিনি হেসে একই লাইন থেকে আবার শুরু করলেন।",
  },
  163: {
    story: "When the bell rang, the meeting [[broke up]] and everyone hurried back to class. Only the class captain stayed to clean the board.",
    storyBn: "ঘণ্টা বাজলে সভা ভেঙে গেল এবং সবাই তাড়াহুড়ো করে ক্লাসে ফিরে গেল। শুধু ক্লাস ক্যাপ্টেন বোর্ড পরিষ্কার করতে থেকে গেল।",
  },
  164: {
    story: "Her grandmother [[brought]] her [[up]] in a small village with simple food and strong values. Today she thanks her grandmother in every success.",
    storyBn: "তার দাদি তাকে ছোট গ্রামে সহজ খাবার আর শক্ত মূল্যবোধ দিয়ে লালন-পালন করেছেন। আজ সে প্রতিটি সাফল্যে দাদিকে ধন্যবাদ জানায়।",
  },
  165: {
    story: "The leader's angry speech [[called forth]] loud protests from the crowd. People stood up and demanded an apology at once.",
    storyBn: "নেতার রাগী বক্তৃতা জনতার মধ্যে জোরালো প্রতিবাদ উস্কে দিল। মানুষ দাঁড়িয়ে সঙ্গে সঙ্গে ক্ষমা চাওয়ার দাবি জানাল।",
  },
  166: {
    story: "From the field, the farmer [[called out]] to his son to bring the cows home before the rain. The boy heard him and ran at once.",
    storyBn: "মাঠ থেকে কৃষক ছেলেকে ডাক দিয়ে বৃষ্টির আগে গরুগুলো বাড়ি আনতে বললেন। ছেলেটি শুনে সঙ্গে সঙ্গে দৌড়ে গেল।",
  },
  167: {
    story: "The captain [[called upon]] every player to give his best in the final match. His strong words filled the team with new energy.",
    storyBn: "অধিনায়ক ফাইনাল ম্যাচে প্রতিটি খেলোয়াড়কে সেরাটা দিতে আদেশ করলেন। তার শক্ত কথায় দল নতুন শক্তিতে ভরে উঠল।",
  },
  168: {
    story: "Even when the work became hard, the nurses [[carried on]] through the night without rest. By morning, every patient was safe.",
    storyBn: "কাজ কঠিন হয়ে গেলেও নার্সরা বিশ্রাম ছাড়াই সারা রাত কাজ চালিয়ে গেলেন। সকালের মধ্যে প্রতিটি রোগী নিরাপদ ছিল।",
  },
  169: {
    story: "Do not [[cast away]] your old books — give them to the village library instead. Another child may learn a lot from them.",
    storyBn: "তোমার পুরোনো বই ফেলে দিও না — বরং গ্রামের লাইব্রেরিতে দিয়ে দাও। আরেকটি শিশু সেগুলো থেকে অনেক কিছু শিখতে পারে।",
  },
  170: {
    story: "Rahim missed two weeks of class because of fever, but he studied hard and [[caught up with]] the others in one month. His teachers were pleased with his effort.",
    storyBn: "রহিম জ্বরের কারণে দুই সপ্তাহ ক্লাস মিস করল, কিন্তু সে কঠোর পড়াশোনা করে এক মাসে অন্যদের সমান হয়ে গেল। তার চেষ্টায় শিক্ষকরা খুশি হলেন।",
  },
  171: {
    story: "Our school's annual sports day [[came off]] beautifully last Friday. Every event finished on time, and the parents enjoyed the whole programme.",
    storyBn: "গত শুক্রবার আমাদের স্কুলের বার্ষিক ক্রীড়া দিবস সুন্দরভাবে অনুষ্ঠিত হলো। প্রতিটি ইভেন্ট সময়মতো শেষ হলো, আর অভিভাবকরা পুরো অনুষ্ঠান উপভোগ করলেন।",
  },
  172: {
    story: "It is cruel to [[cry down]] a young writer's first book before reading it. Give him a fair chance and honest advice instead.",
    storyBn: "তরুণ লেখকের প্রথম বই না পড়েই তুচ্ছ করা নিষ্ঠুর। বরং তাকে ন্যায্য সুযোগ ও সৎ পরামর্শ দাও।",
  },
  174: {
    story: "The farmers [[cried out against]] the low price of rice at the market meeting. They demanded a fair price for their hard work.",
    storyBn: "কৃষকরা বাজারের সভায় চালের কম দাম নিয়ে জোরে অভিযোগ করলেন। তারা তাদের কঠোর পরিশ্রমের ন্যায্য দাম দাবি করলেন।",
  },
  175: {
    story: "With his patience and love for children, our new teacher seems [[cut out]] for this school. The students already like him very much.",
    storyBn: "ধৈর্য আর শিশুদের প্রতি ভালোবাসা দিয়ে আমাদের নতুন শিক্ষক এই স্কুলের জন্য উপযুক্ত মনে হয়। শিক্ষার্থীরা ইতিমধ্যে তাকে খুব পছন্দ করে।",
  },
  176: {
    story: "On your way home, please [[drop in]] at my house for a cup of tea. It is only a short visit, and my mother will be happy to see you.",
    storyBn: "বাড়ি ফেরার পথে দয়া করে এক কাপ চায়ের জন্য আমার বাসায় এসো। এটি মাত্র ছোট একটি দেখা, আর আমার মা তোমাকে দেখে খুশি হবেন।",
  },
  177: {
    story: "Two students [[dropped out]] of the course because their families moved to another town. The teacher wished them well in their new school.",
    storyBn: "দুইজন শিক্ষার্থী কোর্স থেকে বাদ পড়ল, কারণ তাদের পরিবার অন্য শহরে চলে গেছে। শিক্ষক তাদের নতুন স্কুলের জন্য শুভকামনা জানালেন।",
  },
  178: {
    story: "When the rain grew heavier, the soldiers [[fell back]] to a safer place behind the hill. They waited there until the storm passed.",
    storyBn: "বৃষ্টি আরও ভারী হলে সৈন্যরা পাহাড়ের পেছনে নিরাপদ জায়গায় পিছিয়ে গেল। ঝড় থামা পর্যন্ত তারা সেখানে অপেক্ষা করল।",
  },
  179: {
    story: "Be careful on the wet stairs — the old man [[fell down]] yesterday and hurt his knee. Hold the railing whenever you go down.",
    storyBn: "ভেজা সিঁড়িতে সাবধান — বৃদ্ধ লোকটি গতকাল পড়ে গিয়ে হাঁটুতে ব্যথা পেয়েছেন। নামার সময় সবসময় রেলিং ধরো।",
  },
  180: {
    story: "In autumn, the dry leaves [[fall off]] the big mango tree one by one. The children collect them and make little boats for the pond.",
    storyBn: "শরৎকালে বড় আমগাছ থেকে শুকনো পাতা একে একে ঝরে পড়ে। শিশুরা সেগুলো কুড়িয়ে পুকুরের জন্য ছোট নৌকা বানায়।",
  },
  181: {
    story: "All the small shops in this market [[fall under]] the market committee's rules. Every shopkeeper must open and close at the fixed time.",
    storyBn: "এই বাজারের সব ছোট দোকান বাজার কমিটির নিয়মের অধীনে আসে। প্রতিটি দোকানদারকে নির্দিষ্ট সময়ে খুলতে ও বন্ধ করতে হয়।",
  },
  182: {
    story: "Since he started his small business, Mahmud is [[getting along]] well — his income grows a little every month. He hopes to open a bigger shop next year.",
    storyBn: "ছোট ব্যবসা শুরু করার পর থেকে মাহমুদ ভালোভাবে উন্নতি করছে — তার আয় প্রতি মাসে একটু একটু বাড়ছে। সে আগামী বছর বড় দোকান খোলার আশা করে।",
  },
  183: {
    story: "The two new roommates [[get on with]] each other very well — they cook together and share their books. Their small room always feels cheerful.",
    storyBn: "দুই নতুন রুমমেট একে অপরের সঙ্গে খুব মিলেমিশে থাকে — তারা একসঙ্গে রান্না করে এবং বই ভাগ করে। তাদের ছোট ঘরটি সবসময় প্রাণবন্ত লাগে।",
  },
  184: {
    story: "Be careful with that new group of boys, or you may [[get into]] trouble like them. Choose your friends wisely and stay away from bad company.",
    storyBn: "ওই নতুন ছেলেদের দলের সঙ্গে সাবধান, নাহলে তুমিও তাদের মতো ঝামেলায় জড়িয়ে পড়তে পারো। বন্ধু বুদ্ধিমানের মতো বেছে নাও এবং খারাপ সঙ্গ থেকে দূরে থাকো।",
  },
  185: {
    story: "After hours of discussion, the shopkeepers finally [[gave in]] and accepted the new market rent. Nobody was fully happy, but the market opened again.",
    storyBn: "ঘণ্টার পর ঘণ্টা আলোচনার পর দোকানদাররা অবশেষে মেনে নিয়ে নতুন বাজার ভাড়া গ্রহণ করল। কেউ পুরোপুরি খুশি ছিল না, কিন্তু বাজার আবার খুলল।",
  },
  186: {
    story: "[[Give over]] making that noise, children — your grandfather is sleeping in the next room! Play quietly outside instead.",
    storyBn: "ওই শব্দ করা বন্ধ করো, বাচ্চারা — তোমাদের দাদা পাশের ঘরে ঘুমাচ্ছেন! বরং বাইরে শান্তভাবে খেলো।",
  },
  187: {
    story: "The police [[went after]] the thief who had run into the market crowd. They caught him near the river bridge within an hour.",
    storyBn: "পুলিশ বাজারের ভিড়ে পালিয়ে যাওয়া চোরের পিছু নিল। এক ঘণ্টার মধ্যে তারা নদীর সেতুর কাছে তাকে ধরে ফেলল।",
  },
  188: {
    story: "His funny speech [[went down]] very well with the audience — everyone clapped and laughed. Even the chief guest asked for a copy of it.",
    storyBn: "তার মজার বক্তৃতা দর্শকদের কাছে খুব ভালোভাবে গৃহীত হলো — সবাই হাততালি দিয়ে হাসল। প্রধান অতিথিও এর একটি কপি চাইলেন।",
  },
  189: {
    story: "During the long bus strike, many poor people had to [[go without]] food for a whole day. Kind neighbours shared whatever little they had.",
    storyBn: "লম্বা বাস ধর্মঘটের সময় অনেক গরিব মানুষকে সারাদিন খাবার ছাড়াই থাকতে হলো। সদয় প্রতিবেশীরা তাদের যেটুকু ছিল তা ভাগ করে দিল।",
  },
  190: {
    story: "In our family we [[go by]] one simple rule: never waste food. Whatever is left at night is given to someone in need.",
    storyBn: "আমাদের পরিবারে আমরা একটি সহজ নিয়ম অনুসরণ করি: কখনো খাবার নষ্ট করো না। রাতে যা বাকি থাকে তা প্রয়োজনে থাকা কাউকে দেওয়া হয়।",
  },
  191: {
    story: "A few young men [[hang about]] the tea stall every evening, talking and laughing for hours. The old stall owner enjoys their company.",
    storyBn: "কয়েকজন তরুণ প্রতি সন্ধ্যায় চায়ের দোকানের আশেপাশে ঘোরাঘুরি করে, ঘণ্টার পর ঘণ্টা গল্প করে হাসে। বৃদ্ধ দোকানদার তাদের সঙ্গ উপভোগ করেন।",
  },
  192: {
    story: "The success of the harvest [[hangs upon]] the rain this month. If the rain comes on time, the whole village will eat well this year.",
    storyBn: "ফসলের সাফল্য এই মাসের বৃষ্টির ওপর নির্ভর করে। বৃষ্টি সময়মতো এলে পুরো গ্রাম এই বছর ভালোভাবে খেতে পারবে।",
  },
  193: {
    story: "Though food was short, the flood-hit families [[held out]] bravely for three days until help arrived. Their courage surprised the rescue team.",
    storyBn: "খাবার কম থাকলেও বন্যাকবলিত পরিবারগুলো সাহায্য আসা পর্যন্ত তিন দিন সাহসের সঙ্গে সহ্য করল। তাদের সাহস উদ্ধার দলকে অবাক করল।",
  },
  194: {
    story: "A good sportsman always [[holds to]] the rules, even when nobody is watching. That is why everyone respects our team captain.",
    storyBn: "ভালো খেলোয়াড় সবসময় নিয়ম মেনে চলে, এমনকি কেউ না দেখলেও। তাই সবাই আমাদের দলের অধিনায়ককে শ্রদ্ধা করে।",
  },
  195: {
    story: "Plant onions and garlic around the garden to [[keep]] the insects [[off]] your vegetables. This old trick really works in our village.",
    storyBn: "সবজি থেকে পোকামাকড় দূরে রাখতে বাগানের চারপাশে পেঁয়াজ ও রসুন লাগাও। আমাদের গ্রামে এই পুরোনো কৌশলটি সত্যিই কাজ করে।",
  },
  196: {
    story: "Technology is changing fast, and teachers must [[keep up with]] it to help their students. Our school now trains teachers every month.",
    storyBn: "প্রযুক্তি দ্রুত বদলাচ্ছে, আর শিক্ষকদের শিক্ষার্থীদের সাহায্য করতে এর সঙ্গে তাল মিলিয়ে চলতে হবে। আমাদের স্কুল এখন প্রতি মাসে শিক্ষকদের প্রশিক্ষণ দেয়।",
  },
  197: {
    story: "In the last round, the young boxer [[knocked out]] his strong opponent with one clean punch. The crowd stood up and cheered loudly.",
    storyBn: "শেষ রাউন্ডে তরুণ বক্সার একটি পরিষ্কার ঘুষিতে তার শক্তিশালী প্রতিপক্ষকে অজ্ঞান করে জয়ী হলো। দর্শকরা দাঁড়িয়ে জোরে উল্লাস করল।",
  },
  198: {
    story: "When the project failed, the manager blamed only the workers, but the truth is that [[it takes two to tango]] — his late decisions were also responsible. Both sides shared the fault.",
    storyBn: "প্রকল্পটি ব্যর্থ হলে ম্যানেজার শুধু কর্মীদের দোষ দিলেন, কিন্তু সত্য হলো খারাপ পরিস্থিতিতে জড়িত দুজনই দায়ী — তার দেরি করা সিদ্ধান্তও দায়ী ছিল। দুই পক্ষই দোষ ভাগ করে নিয়েছিল।",
  },
  200: {
    story: "The doctor told him to eat less sugar and walk daily to [[keep his illness at bay]]. With this simple habit, he has stayed healthy for two years.",
    storyBn: "ডাক্তার তাকে কম চিনি খেতে এবং প্রতিদিন হাঁটতে বললেন যাতে অসুখ দূরে থাকে। এই সহজ অভ্যাসে সে দুই বছর ধরে সুস্থ আছে।",
  },
  202: {
    story: "Father knows the old manager dislikes him, but he never mentions it — he believes in [[letting sleeping dogs lie]]. A new quarrel would only make office life harder.",
    storyBn: "বাবা জানেন পুরোনো ম্যানেজার তাকে অপছন্দ করেন, কিন্তু তিনি কখনো তা উল্লেখ করেন না — তিনি বিশ্বাস করেন যা ঝামেলা তৈরি করতে পারে তা একা ছেড়ে দেওয়া উচিত। নতুন ঝগড়া অফিস জীবনকে আরও কঠিন করবে।",
  },
  203: {
    story: "One free English class at the mosque [[opened the floodgates]] — soon hundreds of students wanted to join. We had to start three more classes to control the crowd.",
    storyBn: "মসজিদে একটি বিনামূল্যের ইংরেজি ক্লাস আগে নিয়ন্ত্রণে থাকা চাহিদা ছেড়ে দিল — শীঘ্রই শত শত শিক্ষার্থী যোগ দিতে চাইল। ভিড় সামলাতে আমাদের আরও তিনটি ক্লাস শুরু করতে হলো।",
  },
  204: {
    story: "My old friend called me [[out of the blue]] after ten years of silence. He was in my town for a day and wanted to meet over tea.",
    storyBn: "আমার পুরোনো বন্ধু দশ বছরের নীরবতার পর অপ্রত্যাশিতভাবে আমাকে ফোন করল। সে একদিনের জন্য আমার শহরে এসেছিল এবং চায়ের আড্ডায় দেখা করতে চাইল।",
  },
  205: {
    story: "By spending all his savings on a new business, Tanvir really went [[out on a limb]]. If the business fails, he will have nothing left.",
    storyBn: "নতুন ব্যবসায় সব সঞ্চয় খরচ করে তানভীর সত্যিই ঝুঁকিপূর্ণ কাজ করল। ব্যবসা ব্যর্থ হলে তার কিছুই থাকবে না।",
  },
  206: {
    story: "His birthday party was completely [[over the top]] — five cakes, a band, and fireworks for only ten guests. Everyone agreed it was far too much.",
    storyBn: "তার জন্মদিনের পার্টি সম্পূর্ণ অতিরিক্ত ছিল — মাত্র দশজন অতিথির জন্য পাঁচটি কেক, ব্যান্ড আর আতশবাজি। সবাই একমত হলো এটি অনেক বেশি ছিল।",
  },
  207: {
    story: "Gandhi showed the world that the [[pen is mightier than the sword]] — his peaceful words moved millions more than any army could. Even today, students read his letters with respect.",
    storyBn: "গান্ধী বিশ্বকে দেখিয়েছিলেন কথা ও যোগাযোগ যুদ্ধের চেয়ে বেশি প্রভাব ফেলে — তার শান্তিপূর্ণ কথা যেকোনো সেনাবাহিনীর চেয়ে বেশি মানুষকে নাড়া দিয়েছিল। আজও শিক্ষার্থীরা শ্রদ্ধায় তার চিঠি পড়ে।",
  },
  208: {
    story: "You have already got a discount; do not [[push your luck]] by asking for a free gift too. The shopkeeper may refuse everything if you ask for too much.",
    storyBn: "তুমি ইতিমধ্যে ছাড় পেয়েছ; বিনামূল্যে উপহারও চেয়ে নিজের প্রাপ্যের বেশি পাওয়ার চেষ্টা করো না। বেশি চাইলে দোকানদার সবকিছুই অস্বীকার করতে পারে।",
  },
  209: {
    story: "He never saved money when he was young, and now in old age he is [[reaping the harvest]] of those careless years. His present hardship is the result of his past choices.",
    storyBn: "সে তরুণ বয়সে কখনো টাকা জমায়নি, আর এখন বৃদ্ধ বয়সে সেই অসতর্ক বছরের ফল ভোগ করছে। তার বর্তমান কষ্ট অতীতের পছন্দের ফল।",
  },
  210: {
    story: "The exam is in one month, so [[roll up your sleeves]] and start revising from today. Hard work now will bring a sweet result later.",
    storyBn: "পরীক্ষা এক মাস পরে, তাই নিজেকে প্রস্তুত করো এবং আজ থেকে ঝালাই শুরু করো। এখনকার কঠোর পরিশ্রম পরে মিষ্টি ফল দেবে।",
  },
  211: {
    story: "On the question of a new library, the teachers and students [[see eye to eye]]. Everyone agrees the school needs one this year.",
    storyBn: "নতুন লাইব্রেরির প্রশ্নে শিক্ষক ও শিক্ষার্থীরা একমত। সবাই একমত যে স্কুলের এই বছর একটি লাইব্রেরি দরকার।",
  },
  212: {
    story: "Guessing the lottery number is just a [[shot in the dark]] — nobody can truly know it. It is wiser to earn money by honest work.",
    storyBn: "লটারির নম্বর অনুমান করা সম্পূর্ণ অনুমান মাত্র — কেউ সত্যিই তা জানতে পারে না। সৎ কাজে টাকা উপার্জন করাই বুদ্ধিমানের কাজ।",
  },
  213: {
    story: "From tomorrow I will [[sink my teeth into]] the new English course with full energy. I have bought the books and made a daily study plan.",
    storyBn: "কাল থেকে আমি অনেক শক্তি ও উৎসাহ নিয়ে নতুন ইংরেজি কোর্সে মন দেব। আমি বই কিনেছি এবং প্রতিদিনের পড়ার পরিকল্পনা বানিয়েছি।",
  },
  214: {
    story: "The stranger said the road would open tomorrow, but the villagers took his words [[with a grain of salt]]. They doubted him and checked with the chairman first.",
    storyBn: "অপরিচিত লোকটি বলল রাস্তা কাল খুলবে, কিন্তু গ্রামবাসীরা তার কথার সত্যতা নিয়ে সন্দেহ করল। তারা তাকে সন্দেহ করে আগে চেয়ারম্যানের কাছে খোঁজ নিল।",
  },
  215: {
    story: "By telling the strict officer about the secret plan, you are [[skating on thin ice]]. One wrong word and the whole team will be in trouble.",
    storyBn: "কঠোর কর্মকর্তাকে গোপন পরিকল্পনার কথা বলে তুমি ঝুঁকিপূর্ণ কাজ করছ। একটি ভুল কথা বললেই পুরো দল বিপদে পড়বে।",
  },
  216: {
    story: "With no money for the bus and rain pouring outside, the student was in a [[tight spot]]. A kind senior paid his fare and walked him to the hostel.",
    storyBn: "বাসের টাকা না থাকা আর বাইরে বৃষ্টি ঝরায় শিক্ষার্থীটি কঠিন পরিস্থিতিতে পড়ল। একজন সদয় সিনিয়র তার ভাড়া দিয়ে তাকে হোস্টেলে পৌঁছে দিলেন।",
  },
  217: {
    story: "Land prices are low now and will rise soon, so [[strike while the iron is hot]] and buy the small plot today. Waiting another month may cost you double.",
    storyBn: "জমির দাম এখন কম এবং শীঘ্রই বাড়বে, তাই সঠিক সময়ে কাজ করো এবং আজই ছোট প্লটটি কিনে নাও। আরেক মাস অপেক্ষা করলে দ্বিগুণ খরচ হতে পারে।",
  },
  218: {
    story: "After years of thinking, Maria finally [[took the plunge]] and opened her own bakery. The risk frightened her, but her cakes are now famous in the area.",
    storyBn: "বছরের পর বছর ভাবার পর মারিয়া অবশেষে ঝুঁকি থাকলেও নিজের বেকারি খুলল। ঝুঁকি তাকে ভয় পাইয়েছিল, কিন্তু তার কেক এখন এলাকায় বিখ্যাত।",
  },
  219: {
    story: "When the famous singer's new song came out badly, his popularity [[took a nosedive]] within weeks. His concerts, once full, now have many empty seats.",
    storyBn: "বিখ্যাত গায়কের নতুন গান খারাপ হলে কয়েক সপ্তাহের মধ্যে তার জনপ্রিয়তা দ্রুত পড়ে গেল। তার একসময়ের পূর্ণ কনসার্টে এখন অনেক আসন খালি থাকে।",
  },
  220: {
    story: "The little boy [[thinks the world of]] his elder sister, who taught him to read and ride a bicycle. To him, she is the best person on earth.",
    storyBn: "ছোট ছেলেটি তার বড় বোনকে খুব প্রশংসা করে, যে তাকে পড়তে ও সাইকেল চালাতে শিখিয়েছে। তার কাছে সে পৃথিবীর সেরা মানুষ।",
  },
  221: {
    story: "The English you learn today will [[stand you in good stead]] when you travel or apply for a job. Every new word is a tool for your future.",
    storyBn: "আজ তুমি যে ইংরেজি শিখছ তা ভ্রমণে বা চাকরির আবেদনে তোমার উপকারে আসবে। প্রতিটি নতুন শব্দ তোমার ভবিষ্যতের জন্য একটি হাতিয়ার।",
  },
  222: {
    story: "The senior teacher happily [[took a back seat]] and let the young teachers lead the programme. She watched proudly as they managed everything well.",
    storyBn: "প্রবীণ শিক্ষক খুশি মনে কম গুরুত্বপূর্ণ ভূমিকা নিলেন এবং তরুণ শিক্ষকদের অনুষ্ঠান পরিচালনা করতে দিলেন। তারা সবকিছু ভালোভাবে সামলানো দেখে তিনি গর্বে দেখলেন।",
  },
  223: {
    story: "Arguing with him for hours is like [[waving a dead chicken]] — nothing will change his mind. Save your time and speak to the manager instead.",
    storyBn: "তার সঙ্গে ঘণ্টার পর ঘণ্টা তর্ক করা অর্থহীন কাজ — কিছুই তার মন বদলাবে না। সময় বাঁচিয়ে বরং ম্যানেজারের সঙ্গে কথা বলো।",
  },
  224: {
    story: "At the village fair, the children had a [[whale of a time]] — they rode the merry-go-round and ate sweets all evening. Nobody wanted to go home.",
    storyBn: "গ্রামের মেলায় শিশুরা খুব উপভোগ করল — তারা নাগরদোলায় চড়ল এবং সারা সন্ধ্যা মিষ্টি খেল। কেউ বাড়ি যেতে চাইল না।",
  },
  225: {
    story: "This grammar rule is hard, but if you [[wrap your brain around]] it slowly, it becomes easy. Read the examples one by one and practise daily.",
    storyBn: "এই ব্যাকরণ নিয়মটি কঠিন, কিন্তু ধীরে ধীরে বোঝার জন্য মনোযোগ দিলে এটি সহজ হয়ে যায়। উদাহরণগুলো একে একে পড়ো এবং প্রতিদিন অনুশীলন করো।",
  },
  226: {
    story: "Before the exam, do not read everything — [[zero in on]] the ten most important topics first. Deep focus on them will raise your marks quickly.",
    storyBn: "পরীক্ষার আগে সবকিছু পড়ো না — প্রথমে দশটি সবচেয়ে গুরুত্বপূর্ণ বিষয়ে সব মনোযোগ দাও। সেগুলোতে গভীর মনোযোগ দ্রুত তোমার নম্বর বাড়াবে।",
  },
  227: {
    story: "[[Above all]], be honest in your work, whatever job you do in life. Honesty will earn you respect long after money is forgotten.",
    storyBn: "সবার ওপরে, জীবনে যে কাজই করো, কাজে সৎ থাকো। টাকা ভুলে যাওয়ার পরও সততা তোমাকে শ্রদ্ধা এনে দেবে।",
  },
  228: {
    story: "The school remained closed for two extra days [[on account of]] the heavy flood in the area. Classes started again when the water went down.",
    storyBn: "এলাকায় ভারী বন্যার কারণে স্কুল আরও দুই দিন বন্ধ রইল। পানি নেমে গেলে আবার ক্লাস শুরু হলো।",
  },
  229: {
    story: "You must [[on no account]] touch the electric wires with wet hands — it can kill you. Call an electrician for every repair, big or small.",
    storyBn: "কোনো কারণেই ভেজা হাতে বৈদ্যুতিক তার ছুঁবে না — এটি তোমাকে মেরে ফেলতে পারে। ছোট-বড় প্রতিটি মেরামতের জন্য ইলেকট্রিশিয়ান ডাকো।",
  },
  230: {
    story: "In every danger of the long journey, his servant remained a true [[Fidus Achates]] — a faithful friend who never left his side. The master trusted him with his life.",
    storyBn: "লম্বা যাত্রার প্রতিটি বিপদে তার চাকর সত্যিকারের বিশ্বস্ত বন্ধু হয়ে রইল — যে কখনো তার পাশ ছাড়েনি। মনিব তার জীবন দিয়ে তাকে বিশ্বাস করতেন।",
  },
  231: {
    story: "The great businessman could do everything well except keep accounts — that was the [[heel of Achilles]] in his work. At last he hired an honest accountant to guard that weak point.",
    storyBn: "মহান ব্যবসায়ী হিসাব রাখা ছাড়া সবকিছু ভালো পারতেন — সেটাই ছিল তার কাজের দুর্বল জায়গা। শেষে তিনি সেই দুর্বল জায়গা রক্ষা করতে একজন সৎ হিসাবরক্ষক রাখলেন।",
  },
  232: {
    story: "With his tall figure and bright smile, the new actor looked like [[an Adonis]] on the stage. The whole audience admired the very handsome young man.",
    storyBn: "লম্বা গড়ন আর উজ্জ্বল হাসি দিয়ে নতুন অভিনেতা মঞ্চে খুব সুদর্শন পুরুষের মতো দেখাচ্ছিল। পুরো দর্শক সেই সুদর্শন তরুণকে প্রশংসা করল।",
  },
  233: {
    story: "Since winning a small prize, the young singer has begun [[to assume airs]] and no longer talks to his old friends. Success should make a man humble, not proud.",
    storyBn: "ছোট একটি পুরস্কার জেতার পর থেকে তরুণ গায়ক নিজেকে বড় মনে করতে শুরু করেছে এবং পুরোনো বন্ধুদের সঙ্গে আর কথা বলে না। সাফল্য মানুষকে অহংকারী নয়, বিনয়ী করা উচিত।",
  },
  234: {
    story: "At the wedding, the rich guest chose [[to stand aloof]] and did not mix with the other guests. He sat alone in a corner with his phone all evening.",
    storyBn: "বিয়েতে ধনী অতিথি নিজের মধ্যে থাকা বেছে নিলেন এবং অন্য অতিথিদের সঙ্গে মিশলেন না। তিনি সারা সন্ধ্যা ফোন নিয়ে এক কোণে একা বসে রইলেন।",
  },
  235: {
    story: "After three years of friendship, Hasan finally [[led]] his beloved [[to the altar]] in a simple village ceremony. Both families blessed the happy couple warmly.",
    storyBn: "তিন বছরের বন্ধুত্বের পর হাসান অবশেষে সাধারণ গ্রাম্য অনুষ্ঠানে তার প্রিয়তমাকে বিয়ে করল। দুই পরিবারই সুখী দম্পতিকে আন্তরিক আশীর্বাদ করল।",
  },
  236: {
    story: "Do not trust his sweet words — the whole office knows he is [[an Ananias]] who never tells the truth. Check every paper he gives you twice.",
    storyBn: "তার মিষ্টি কথায় বিশ্বাস করো না — পুরো অফিস জানে সে একজন মিথ্যাবাদী যে কখনো সত্য বলে না। সে যে কাগজ দেয় তা দুইবার পরীক্ষা করো।",
  },
  237: {
    story: "The young wrestler, strong and perfectly built like [[an Apollo]], won every match at the district games. Crowds came from far villages just to watch him.",
    storyBn: "তরুণ কুস্তিগীর, নিখুঁত দেহের অধিকারী পুরুষের মতো শক্তিশালী, জেলা খেলায় প্রতিটি ম্যাচ জিতল। দূরের গ্রাম থেকে মানুষ শুধু তাকে দেখতে এল।",
  },
  238: {
    story: "Just one rude question from the reporter [[upset the apple cart]] of the peaceful meeting. After that, everyone started arguing and nothing was decided.",
    storyBn: "সাংবাদিকের একটি মাত্র অভদ্র প্রশ্ন শান্ত সভার শান্তি নষ্ট করে দিল। তারপর সবাই তর্ক শুরু করল এবং কিছুই সিদ্ধান্ত হলো না।",
  },
  239: {
    story: "The head teacher keeps her office in [[apple pie order]] — every file, book and pen has its fixed place. She can find any paper within a minute.",
    storyBn: "প্রধান শিক্ষক তার অফিস নিখুঁত শৃঙ্খলায় রাখেন — প্রতিটি ফাইল, বই ও কলমের নির্দিষ্ট জায়গা আছে। তিনি এক মিনিটের মধ্যে যেকোনো কাগজ খুঁজে পান।",
  },
  240: {
    story: "In his small village, the old farmer lives an [[Arcadian life]] — simple food, clean air, and peace all around. He says he would not exchange it for any city palace.",
    storyBn: "ছোট গ্রামে বৃদ্ধ কৃষক আনন্দময়, সুখী, গ্রাম্য ও সরল জীবন কাটান — সহজ খাবার, পরিষ্কার বাতাস আর চারদিকে শান্তি। তিনি বলেন, শহরের কোনো প্রাসাদের সঙ্গে তিনি এটি বদলাবেন না।",
  },
  241: {
    story: "When enemies attacked the border village, the young men [[took up arms]] to defend their homes. The whole village stood behind them with food and courage.",
    storyBn: "শত্রুরা সীমান্ত গ্রামে আক্রমণ করলে তরুণরা ঘর রক্ষা করতে অস্ত্র ধরল। পুরো গ্রাম খাবার আর সাহস নিয়ে তাদের পেছনে দাঁড়াল।",
  },
  242: {
    story: "He is helping the committee only [[to grind]] his own axe — he wants the chairman's seat next year. His sweet service hides a selfish aim.",
    storyBn: "সে কমিটিকে সাহায্য করছে শুধু মনে স্বার্থপর উদ্দেশ্য নিয়ে — সে আগামী বছর চেয়ারম্যানের আসন চায়। তার মিষ্টি সেবার আড়ালে লুকিয়ে আছে স্বার্থপর লক্ষ্য।",
  },
  243: {
    story: "Our small team has already [[broken the back of]] the big project — the hardest part is done. The rest is simple and will finish by Friday.",
    storyBn: "আমাদের ছোট দল ইতিমধ্যে বড় প্রকল্পের সবচেয়ে কঠিন অংশটি করে ফেলেছে। বাকিটা সহজ এবং শুক্রবারের মধ্যে শেষ হবে।",
  },
  244: {
    story: "A true friend never [[backbites]] his friend [[behind his back]]. If you have a complaint, say it honestly to his face.",
    storyBn: "সত্যিকারের বন্ধু কখনো বন্ধুর পেছনে খারাপ কথা বলে না। তোমার অভিযোগ থাকলে সততার সঙ্গে তার মুখে বলো।",
  },
  245: {
    story: "The new manager agrees with everything the owner says — [[he has no backbone]] and no will of his own. The staff wish he would sometimes speak his own mind.",
    storyBn: "নতুন ম্যানেজার মালিকের সব কথায় রাজি হয় — তার নিজের কোনো ইচ্ছাশক্তি নেই। কর্মীরা চায় সে মাঝে মাঝে নিজের মনের কথা বলুক।",
  },
  246: {
    story: "One small rumour [[caused bad blood]] between the two families, and they stopped visiting each other. It took the village elder months to bring peace between them.",
    storyBn: "একটি ছোট গুজব দুই পরিবারের মধ্যে শত্রুতা সৃষ্টি করল, আর তারা একে অপরের বাড়ি যাওয়া বন্ধ করে দিল। গ্রামের মুরুব্বির তাদের মধ্যে শান্তি আনতে মাসের পর মাস লাগল।",
  },
  247: {
    story: "When the job transfer came, the teacher left the village [[bag and baggage]] — every book, pot and blanket went with her. She promised to return every winter.",
    storyBn: "চাকরির বদলি এলে শিক্ষক সব জিনিসপত্রসহ গ্রাম ছাড়লেন — প্রতিটি বই, হাঁড়ি আর কম্বল তার সঙ্গে গেল। তিনি প্রতি শীতে ফিরে আসার প্রতিশ্রুতি দিলেন।",
  },
  248: {
    story: "Even when sales fell, the young shopkeeper kept working hard [[to keep the ball rolling]]. His patience slowly brought the customers back.",
    storyBn: "বিক্রি কমে গেলেও তরুণ দোকানদার কাজ চালিয়ে যেতে কঠোর পরিশ্রম করতে থাকল। তার ধৈর্য ধীরে ধীরে ক্রেতাদের ফিরিয়ে আনল।",
  },
  249: {
    story: "The officer promised the farmers a new road, free seeds and cheap loans, but it was only a [[Barmecide feast]] — imaginary benefits that never came. The farmers are still waiting.",
    storyBn: "কর্মকর্তা কৃষকদের নতুন রাস্তা, বিনামূল্যে বীজ আর সস্তা ঋণের প্রতিশ্রুতি দিলেন, কিন্তু তা ছিল শুধু কাল্পনিক সুবিধা যা কখনো আসেনি। কৃষকরা এখনো অপেক্ষা করছে।",
  },
  250: {
    story: "Instead of the long main road, the postman takes a [[bee-line]] across the fields to the village. This shortest path saves him a full hour every day.",
    storyBn: "লম্বা প্রধান রাস্তার বদলে ডাকপিয়ন মাঠ পেরিয়ে গ্রামে যাওয়ার সবচেয়ে কম দূরত্বের পথ নেয়। এই সবচেয়ে ছোট পথ তাকে প্রতিদিন পুরো এক ঘণ্টা বাঁচায়।",
  },
  251: {
    story: "It is cowardly to praise a man to his face and blame him [[behind his back]]. Honest people say the same thing in both places.",
    storyBn: "কারো মুখে প্রশংসা করে তার অজান্তে দোষ দেওয়া কাপুরুষতা। সৎ মানুষ দুই জায়গাতেই একই কথা বলে।",
  },
  252: {
    story: "The actors practised for weeks [[behind the scenes]] before the big show. The audience saw only the bright stage, not their long hard work.",
    storyBn: "বড় অনুষ্ঠানের আগে অভিনেতারা সপ্তাহের পর সপ্তাহ গোপনে অনুশীলন করলেন। দর্শকরা শুধু উজ্জ্বল মঞ্চ দেখল, তাদের লম্বা কঠোর পরিশ্রম দেখল না।",
  },
  253: {
    story: "In the debate, instead of answering the question, he attacked his opponent's family — that was [[hitting below the belt]]. The judges warned him for the unfair act.",
    storyBn: "বিতর্কে প্রশ্নের উত্তর দেওয়ার বদলে সে প্রতিপক্ষের পরিবারকে আক্রমণ করল — এটি ছিল প্রতিযোগিতায় অন্যায় আচরণ। বিচারকরা এই অন্যায় কাজের জন্য তাকে সতর্ক করলেন।",
  },
  254: {
    story: "The proud champion laughed at the young player before the match, but in the end he [[bit the dust]] and lost in straight sets. The crowd cheered for the humble winner.",
    storyBn: "অহংকারী চ্যাম্পিয়ন ম্যাচের আগে তরুণ খেলোয়াড়কে নিয়ে হাসল, কিন্তু শেষে সে পরাজিত হলো এবং সরাসরি সেটে হেরে গেল। দর্শকরা বিনয়ী বিজয়ীর জন্য উল্লাস করল।",
  },
  255: {
    story: "Nobody invites Uncle Ratan to picnics now, because he is such [[a wet blanket]] — he complains about the food, the weather and the music. His words spoil everyone's joy.",
    storyBn: "কেউ এখন রতন চাচাকে পিকনিকে ডাকে না, কারণ তিনি আনন্দ নিরুৎসাহিত করা ব্যক্তি — তিনি খাবার, আবহাওয়া আর গান নিয়ে অভিযোগ করেন। তার কথা সবার আনন্দ নষ্ট করে দেয়।",
  },
  257: {
    story: "In our village, everyone respects Mrs. Rahman as [[a blue stocking]] — a learned woman who has read hundreds of books. Young girls go to her with their study questions.",
    storyBn: "আমাদের গ্রামে সবাই রহমান ভাবীকে বিদ্বান মহিলা হিসেবে শ্রদ্ধা করে — তিনি শত শত বই পড়েছেন। তরুণীরা পড়াশোনার প্রশ্ন নিয়ে তার কাছে যায়।",
  },
  258: {
    story: "[[At first blush]], the old house looked haunted and empty, but inside we found a warm family and a garden full of flowers. First sight can often deceive us.",
    storyBn: "প্রথম দৃষ্টিতে পুরোনো বাড়িটিকে ভূতুড়ে ও খালি মনে হলো, কিন্তু ভেতরে আমরা উষ্ণ একটি পরিবার আর ফুলে ভরা বাগান পেলাম। প্রথম দৃষ্টি প্রায়ই আমাদের ধোঁকা দিতে পারে।",
  },
  260: {
    story: "Fishing is old Harun's [[bread and butter]] — the river gives his family food and income every day. He thanks the river each morning before he casts his net.",
    storyBn: "মাছ ধরা বৃদ্ধ হারুনের জীবিকার উপায় — নদী প্রতিদিন তার পরিবারকে খাবার ও আয় দেয়। জাল ফেলার আগে প্রতি সকালে সে নদীকে ধন্যবাদ জানায়।",
  },
  261: {
    story: "After a long and kind life, the village teacher [[breathed his last]] peacefully in his sleep. Hundreds of his old students came to his funeral to say goodbye.",
    storyBn: "লম্বা ও সদয় জীবনের পর গ্রামের শিক্ষক ঘুমের মধ্যে শান্তিতে মারা গেলেন। বিদায় জানাতে শত শত পুরোনো শিক্ষার্থী তার জানাজায় এল।",
  },
  262: {
    story: "The poor school tried [[to make bricks without straw]] — building a science room without money, tools or materials. In the end, the villagers collected funds and helped them.",
    storyBn: "গরিব স্কুলটি উপযুক্ত উপকরণ ছাড়া কিছু করার চেষ্টা করল — টাকা, যন্ত্র বা উপকরণ ছাড়া বিজ্ঞান কক্ষ বানানো। শেষে গ্রামবাসীরা তহবিল সংগ্রহ করে তাদের সাহায্য করল।",
  },
  263: {
    story: "My grandfather jokes that when he [[kicks the bucket]], his old bicycle should go to the grandson who reads the most books. We all laugh, but we also start reading more.",
    storyBn: "আমার দাদা রসিকতা করে বলেন, তিনি মারা গেলে তার পুরোনো সাইকেলটি সেই নাতির পাওয়া উচিত যে সবচেয়ে বেশি বই পড়ে। আমরা সবাই হাসি, কিন্তু আরও বেশি পড়াও শুরু করি।",
  },
  264: {
    story: "The honest honey-seller never advertises, because [[good wine needs no bush]] — people come from far villages for his pure honey. Quality speaks for itself.",
    storyBn: "সৎ মধু বিক্রেতা কখনো বিজ্ঞাপন দেয় না, কারণ ভালো জিনিসের বিজ্ঞাপন লাগে না — মানুষ দূরের গ্রাম থেকে তার খাঁটি মধুর জন্য আসে। গুণ নিজেই কথা বলে।",
  },
  265: {
    story: "Working in the office all day and driving a taxi all night, Jamal is [[burning the candle at both ends]]. His family fears his health will break down soon.",
    storyBn: "সারাদিন অফিসে কাজ করে আর সারা রাত ট্যাক্সি চালিয়ে জামাল একই সঙ্গে দুই দিকে শক্তি ব্যয় করছে। তার পরিবার ভয় পায় শীঘ্রই তার স্বাস্থ্য ভেঙে পড়বে।",
  },
  266: {
    story: "When the teacher said, 'Someone here never does his homework,' Roni's face turned red — well, [[if the cap fits, wear it]]. He quietly opened his exercise book and began to write.",
    storyBn: "শিক্ষক যখন বললেন, 'এখানে কেউ একজন কখনো বাড়ির কাজ করে না,' রনির মুখ লাল হয়ে গেল — মন্তব্য তোমার সম্পর্কে হলে সমালোচনা মেনে নাও। সে চুপচাপ খাতা খুলে লিখতে শুরু করল।",
  },
  267: {
    story: "His mother worries day and night about small things, so we gently remind her: '[[Care killed the cat]] — please rest and stop worrying so much.' She smiles and makes tea for everyone.",
    storyBn: "তার মা দিনরাত ছোটখাটো বিষয়ে দুশ্চিন্তা করেন, তাই আমরা তাকে মৃদুভাবে মনে করিয়ে দিই: 'দুশ্চিন্তা করে নিজেকে শেষ করে ফেলো না — দয়া করে বিশ্রাম নাও এবং এত চিন্তা বন্ধ করো।' তিনি হেসে সবার জন্য চা বানান।",
  },
  268: {
    story: "Among hundreds of plain shirts in the shop, the bright blue one [[caught my eye]] at once. I bought it for my younger brother's birthday.",
    storyBn: "দোকানের শত শত সাধারণ শার্টের মধ্যে উজ্জ্বল নীলটি সঙ্গে সঙ্গে আমার মনোযোগ আকর্ষণ করল। আমি এটি ছোট ভাইয়ের জন্মদিনের জন্য কিনলাম।",
  },
  269: {
    story: "At the parents' meeting, the head teacher [[took the chair]] and guided the discussion calmly. Every parent got a chance to speak.",
    storyBn: "অভিভাবক সভায় প্রধান শিক্ষক সভাপতিত্ব করলেন এবং শান্তভাবে আলোচনা পরিচালনা করলেন। প্রতিটি অভিভাবক কথা বলার সুযোগ পেলেন।",
  },
  270: {
    story: "Do not be fooled by her young face — [[she is no chicken]]; she has taught in this school for twenty years. Her experience shows in every class she takes.",
    storyBn: "তার তরুণ চেহারা দেখে ধোঁকা খেয়ো না — সে যতটা বলে তার চেয়ে বয়সে বড়; সে এই স্কুলে বিশ বছর ধরে পড়াচ্ছে। তার নেওয়া প্রতিটি ক্লাসে তার অভিজ্ঞতা দেখা যায়।",
  },
  271: {
    story: "At the book fair, you may [[pick and choose]] any three books for five hundred taka. Take your time and select the ones you will truly read.",
    storyBn: "বইমেলায় তুমি পাঁচশ টাকায় যেকোনো তিনটি বই যত্নে বেছে নিতে পারো। সময় নাও এবং যেগুলো সত্যিই পড়বে সেগুলোই বেছে নাও।",
  },
  272: {
    story: "Trying to finish the whole syllabus in one night is like trying [[to square the circle]] — it simply cannot be done. Start early and study a little every day.",
    storyBn: "এক রাতে পুরো সিলেবাস শেষ করার চেষ্টা অসম্ভব কিছুর চেষ্টার মতো — এটি সত্যিই করা যায় না। আগে থেকে শুরু করো এবং প্রতিদিন অল্প অল্প পড়ো।",
  },
  273: {
    story: "Yes, the flood damaged our crops, but remember: [[every cloud has a silver lining]]. The same flood brought rich soil that will give a better harvest next year.",
    storyBn: "হ্যাঁ, বন্যা আমাদের ফসল নষ্ট করেছে, কিন্তু মনে রেখো: খারাপ অবস্থা চিরদিন থাকে না। একই বন্যা উর্বর মাটি এনেছে যা আগামী বছর ভালো ফসল দেবে।",
  },
  274: {
    story: "The rich man is so [[close fisted]] that he never helps even his poor relatives. People respect wealth, but they love a generous heart far more.",
    storyBn: "ধনী লোকটি এত কৃপণ যে সে তার গরিব আত্মীয়দেরও কখনো সাহায্য করে না। মানুষ সম্পদকে শ্রদ্ধা করে, কিন্তু উদার হৃদয়কে অনেক বেশি ভালোবাসে।",
  },
  275: {
    story: "My mother always teaches us to [[cut our cloth according to our cloth]] — spend only what we earn. Because of her wisdom, our family has never taken a loan.",
    storyBn: "আমার মা সবসময় আমাদের আয়ের মধ্যে জীবন চালাতে শেখান — আমরা যা আয় করি শুধু তাই খরচ করি। তার জ্ঞানের কারণে আমাদের পরিবার কখনো ঋণ নেয়নি।",
  },
  277: {
    story: "He said he was [[cock sure]] that his team would win, but they lost by three goals. Overconfidence often brings such surprises.",
    storyBn: "সে বলল সে সম্পূর্ণ নিশ্চিত তার দল জিতবে, কিন্তু তারা তিন গোলে হেরে গেল। অতিরিক্ত আত্মবিশ্বাস প্রায়ই এমন চমক আনে।",
  },
  278: {
    story: "When the young artist showed his first painting, please do not [[throw cold water upon]] his hopes with rude words. A little praise will help him grow.",
    storyBn: "তরুণ শিল্পী তার প্রথম ছবি দেখালে দয়া করে অভদ্র কথায় তার প্রচেষ্টাকে নিরুৎসাহিত করো না। একটু প্রশংসা তাকে বেড়ে উঠতে সাহায্য করবে।",
  },
  279: {
    story: "Our usually cheerful teacher looked [[off color]] today and spoke very little in class. We later learned she had a fever since morning.",
    storyBn: "আমাদের সাধারণত প্রাণবন্ত শিক্ষক আজ স্বাভাবিক অবস্থায় ছিলেন না এবং ক্লাসে খুব কম কথা বললেন। পরে আমরা জানলাম সকাল থেকে তার জ্বর।",
  },
  280: {
    story: "To learn the poem well, [[commit]] it [[to memory]] line by line before Friday. Then recite it to your partner without looking at the book.",
    storyBn: "কবিতাটি ভালোভাবে শিখতে শুক্রবারের আগে লাইন ধরে ধরে মুখস্থ করো। তারপর বই না দেখে সঙ্গীর কাছে আবৃত্তি করো।",
  },
  281: {
    story: "Five teachers tried to cook the school feast together, each with a different recipe — truly, [[too many cooks spoil the broth]]. In the end the food had too much salt and no taste.",
    storyBn: "পাঁচজন শিক্ষক একসঙ্গে স্কুলের ভোজ রান্নার চেষ্টা করলেন, প্রত্যেকে আলাদা রেসিপি নিয়ে — সত্যিই, প্রয়োজনের চেয়ে বেশি কর্মী থাকলে কাজ নষ্ট হয়। শেষে খাবারে লবণ বেশি হলো আর স্বাদ রইল না।",
  },
  282: {
    story: "At the rich man's funeral, his greedy nephew wept loudly, but everyone knew they were [[crocodile tears]] — he was only thinking of the property. His sadness was pure acting.",
    storyBn: "ধনী লোকটির জানাজায় তার লোভী ভাতিজা জোরে কাঁদল, কিন্তু সবাই জানত তা মায়াকান্না — সে শুধু সম্পত্তির কথা ভাবছিল। তার দুঃখ ছিল পুরোপুরি অভিনয়।",
  },
  284: {
    story: "The wedding plan is all [[cut and dried]] — the date, the hall and the menu were fixed months ago. Now we only have to invite the guests.",
    storyBn: "বিয়ের পরিকল্পনা সব আগে থেকে ঠিক করা — তারিখ, হল আর মেনু মাস আগে ঠিক হয়েছে। এখন আমাদের শুধু অতিথিদের আমন্ত্রণ জানাতে হবে।",
  },
  285: {
    story: "Our school magazine is fully [[up to date]] — it carries this month's news, results and photos. Students wait eagerly for every new issue.",
    storyBn: "আমাদের স্কুল পত্রিকা সম্পূর্ণ সাম্প্রতিক — এতে এই মাসের খবর, ফলাফল আর ছবি থাকে। শিক্ষার্থীরা প্রতিটি নতুন সংখ্যার জন্য আগ্রহে অপেক্ষা করে।",
  },
  286: {
    story: "After the fire destroyed his little shop, the poor trader passed through real [[evil days]]. With help from his neighbours, he slowly built his life again.",
    storyBn: "আগুনে তার ছোট দোকান ধ্বংস হওয়ার পর গরিব ব্যবসায়ী সত্যিকারের দুর্ভাগ্যের সময় পার করল। প্রতিবেশীদের সাহায্যে সে ধীরে ধীরে আবার জীবন গড়ল।",
  },
  287: {
    story: "My grandfather often speaks of the [[halcyon days]] of his youth, when the village had peace, cheap food and happy songs every evening. His eyes shine whenever he tells those stories.",
    storyBn: "আমার দাদা প্রায়ই তার যৌবনের শান্তি ও সুখের সময়ের কথা বলেন, যখন গ্রামে শান্তি, সস্তা খাবার আর প্রতি সন্ধ্যায় আনন্দের গান ছিল। সেই গল্প বললেই তার চোখ জ্বলজ্বল করে।",
  },
  288: {
    story: "When the old headmaster retired, the young teacher [[stepped into his shoes]] and received his room, his duties and even his old bicycle. He promised to honour the great man's work.",
    storyBn: "বৃদ্ধ প্রধান শিক্ষক অবসর নিলে তরুণ শিক্ষক উত্তরাধিকার সূত্রে তার জায়গা নিলেন এবং তার ঘর, দায়িত্ব এমনকি পুরোনো সাইকেলটিও পেলেন। তিনি মহান মানুষটির কাজকে সম্মান করার প্রতিশ্রুতি দিলেন।",
  },
  289: {
    story: "'[[Go to the devil]]!' shouted the angry shopkeeper when the thief tried to cheat him again. The frightened boy ran out of the shop and never returned.",
    storyBn: "'দূর হয়ে যাও!' রাগী দোকানদার চিৎকার করল যখন চোরটি আবার তাকে ঠকানোর চেষ্টা করল। ভীত ছেলেটি দোকান থেকে দৌড়ে বেরিয়ে গেল এবং আর কখনো ফিরল না।",
  },
  290: {
    story: "In the village club, some men secretly played with [[devil's bones]] for money every night. When the elders found out, they stopped the gambling at once.",
    storyBn: "গ্রামের ক্লাবে কিছু মানুষ প্রতি রাতে গোপনে টাকার জন্য পাশা খেলত। মুরুব্বিরা জানতে পেরে সঙ্গে সঙ্গে জুয়া বন্ধ করে দিলেন।",
  },
  291: {
    story: "The boys spent the whole rainy afternoon playing with [[devil's playthings]] under the big tree. Their grandfather warned them never to play cards for money.",
    storyBn: "ছেলেরা পুরো বৃষ্টির বিকেল বড় গাছের নিচে তাস খেলে কাটাল। তাদের দাদা তাদের সতর্ক করলেন কখনো টাকার জন্য তাস না খেলতে।",
  },
  292: {
    story: "Once the rumour spread that the honest clerk had taken a bribe, nobody trusted him again — truly, [[give a dog a bad name and hang him]]. Though the charge was false, his good name never fully returned.",
    storyBn: "একবার গুজব ছড়াল যে সৎ কেরানি ঘুষ নিয়েছে, তারপর কেউ তাকে আর বিশ্বাস করল না — সত্যিই, একবার কেউ সুনাম হারালে সবাই তাকে খারাপ ভাবে। অভিযোগ মিথ্যা হলেও তার সুনাম পুরোপুরি আর ফিরল না।",
  },
  293: {
    story: "The poor farmer waited patiently for years, and at last [[every dog has his day]] — his son passed the medical exam and became a doctor. The whole village celebrated his good fortune.",
    storyBn: "গরিব কৃষক বছরের পর বছর ধৈর্য ধরে অপেক্ষা করল, আর অবশেষে সবারই সৌভাগ্যের দিন আসে — তার ছেলে মেডিকেল পরীক্ষায় পাস করে ডাক্তার হলো। পুরো গ্রাম তার সৌভাগ্য উদ্‌যাপন করল।",
  },
  294: {
    story: "The clever salesman tried [[to throw dust in our eyes]] with big words and false promises. But my father checked the papers carefully and saw the trick at once.",
    storyBn: "চালাক বিক্রেতা বড় বড় কথা আর মিথ্যা প্রতিশ্রুতি দিয়ে আমাদের ধোঁকা দেওয়ার চেষ্টা করল। কিন্তু আমার বাবা কাগজপত্র যত্নে পরীক্ষা করে সঙ্গে সঙ্গে চালাকি ধরে ফেললেন।",
  },
  295: {
    story: "The rich man bought a huge old car that drank petrol and broke down every week — a real [[white elephant]]. In the end he sold it for half the price.",
    storyBn: "ধনী লোকটি একটি বিশাল পুরোনো গাড়ি কিনল যা পেট্রোল খেত আর প্রতি সপ্তাহে নষ্ট হতো — সত্যিকারের অকেজো জিনিস যা রাখতে অত্যন্ত খরচ হয়। শেষে সে অর্ধেক দামে তা বিক্রি করে দিল।",
  },
  296: {
    story: "The young village singer [[set the Thames on fire]] with her first song on television — everyone in the country was talking about her. Even the newspapers printed her photo on the front page.",
    storyBn: "তরুণী গ্রাম্য গায়িকা টেলিভিশনে তার প্রথম গান দিয়ে অসাধারণ কিছু করে ফেলল — সারা দেশের সবাই তার কথা বলছিল। এমনকি সংবাদপত্রগুলো প্রথম পৃষ্ঠায় তার ছবি ছাপল।",
  },
  297: {
    story: "Since the hot oil burned his hand last year, little Rafi never goes near the stove — truly, [[a burnt child dreads the fire]]. His mother now cooks while he plays safely outside.",
    storyBn: "গত বছর গরম তেলে হাত পোড়ার পর থেকে ছোট রাফি কখনো চুলার কাছে যায় না — সত্যিই, যার একবার খারাপ অভিজ্ঞতা হয়েছে সে আবার তেমন পরিস্থিতির আশঙ্কায় ভয় পায়। তার মা এখন রান্না করেন আর সে নিরাপদে বাইরে খেলে।",
  },
  298: {
    story: "At the big city party, the shy village girl felt like [[a fish out of water]]. She knew nobody there and stood quietly in a corner all evening.",
    storyBn: "বড় শহরের পার্টিতে লাজুক গ্রাম্য মেয়েটি অস্বস্তিকর পরিস্থিতিতে থাকা কারো মতো বোধ করল। সে সেখানে কাউকে চিনত না এবং সারা সন্ধ্যা এক কোণে চুপচাপ দাঁড়িয়ে রইল।",
  },
  299: {
    story: "The referee saw the player kick the ball with his hand and cried, '[[Foul play]]!' The goal was cancelled, and the player was shown a yellow card.",
    storyBn: "রেফারি খেলোয়াড়টিকে হাত দিয়ে বল মারতে দেখে চিৎকার করলেন, 'প্রতারণা!' গোলটি বাতিল হলো, আর খেলোয়াড়টিকে হলুদ কার্ড দেখানো হলো।",
  },
  300: {
    story: "He left his small village job for city work, but the city job was worse — he had [[jumped from the frying pan into the fire]]. Now he works longer hours for less pay.",
    storyBn: "সে শহরের কাজের জন্য গ্রামের ছোট চাকরি ছাড়ল, কিন্তু শহরের চাকরি আরও খারাপ ছিল — সে এক বিপদ থেকে বেরিয়ে আরও বড় বিপদে পড়ল। এখন সে কম বেতনে বেশি ঘণ্টা কাজ করে।",
  },
  301: {
    story: "The shining watch in the cheap shop looked like gold, but it stopped working in two days — remember, [[all that glitters is not gold]]. Pretty looks can hide poor quality.",
    storyBn: "সস্তা দোকানের ঝকঝকে ঘড়িটি সোনার মতো দেখাচ্ছিল, কিন্তু দুই দিনে তা বন্ধ হয়ে গেল — মনে রেখো, সব জিনিস দেখতে যতটা আকর্ষণীয় মনে হয় ততটা নয়। সুন্দর চেহারা খারাপ গুণ লুকাতে পারে।",
  },
  303: {
    story: "The library is free only this month, so [[make hay while the sun shines]] and read as many books as you can. Such a chance may not come again.",
    storyBn: "লাইব্রেরি শুধু এই মাসে বিনামূল্যে, তাই সব সুযোগ কাজে লাগাও এবং যত পারো বই পড়ো। এমন সুযোগ আবার নাও আসতে পারে।",
  },
  304: {
    story: "When we moved to the new house, we took everything — [[lock, stock and barrel]] — even the old broken chairs. Nothing was left behind in the empty rooms.",
    storyBn: "আমরা নতুন বাসায় ওঠার সময় সবকিছু পুরোপুরি নিয়ে গেলাম — এমনকি পুরোনো ভাঙা চেয়ারগুলোও। খালি ঘরগুলোতে কিছুই রেখে যাইনি।",
  },
  305: {
    story: "He missed the scholarship by only one mark, but [[a miss is as good as a mile]] — the place went to another student. He promised to try harder next year.",
    storyBn: "সে মাত্র এক নম্বরের জন্য বৃত্তি হারাল, কিন্তু কাছাকাছি গেলেও ব্যর্থতাই ব্যর্থতা — জায়গাটি অন্য শিক্ষার্থী পেল। সে আগামী বছর আরও চেষ্টা করার প্রতিশ্রুতি দিল।",
  },
  307: {
    story: "One good exam result does not make you a master — remember, [[one swallow does not make a summer]]. Keep studying steadily for the whole year.",
    storyBn: "একটি ভালো পরীক্ষার ফল তোমাকে মাস্টার বানায় না — মনে রেখো, একটা ঘটনা দেখেই সিদ্ধান্ত নেওয়া নির্ভরযোগ্য নয়। সারা বছর ধারাবাহিকভাবে পড়তে থাকো।",
  },
  308: {
    story: "Sitting idle and dreaming of riches is useless — [[if wishes were horses, beggars might ride]]. Get up, learn a skill, and earn your living by real work.",
    storyBn: "অলস বসে থেকে ধনী হওয়ার স্বপ্ন দেখা অর্থহীন — শুধু ইচ্ছা করলেই যদি সব হতো, তাহলে সবচেয়ে গরিব মানুষও সবকিছু পেত। ওঠো, একটি দক্ষতা শেখো এবং আসল কাজে জীবিকা অর্জন করো।",
  },
  309: {
    story: "The strange fish caught in the river was [[a nine days' wonder]] — crowds came to see it for a week, and then everyone forgot it. New wonders quickly replace the old ones.",
    storyBn: "নদীতে ধরা পড়া অদ্ভুত মাছটি ছিল কিছুদিনের চাঞ্চল্য — এক সপ্তাহ ধরে ভিড় এসে তা দেখল, তারপর সবাই ভুলে গেল। নতুন চমক দ্রুত পুরোনোকে বদলে দেয়।",
  },
  310: {
    story: "That newspaper prints shocking stories without checking the truth, just to sell more copies — a true example of the [[yellow press]]. Wise readers always check such news in a second paper.",
    storyBn: "ওই সংবাদপত্র সত্য যাচাই না করে শুধু বেশি কপি বিক্রির জন্য চাঞ্চল্যকর গল্প ছাপে — এটি হলুদ সাংবাদিকতার সত্যিকারের উদাহরণ। জ্ঞানী পাঠকরা সবসময় এমন খবর দ্বিতীয় পত্রিকায় যাচাই করেন।",
  },
  311: {
    story: "'Give me [[a ball park figure]] for the wedding cost,' father said. 'I do not need exact taka — just a rough total to plan our savings.'",
    storyBn: "'বিয়ের খরচের মোটামুটি আর্থিক হিসাব দাও,' বাবা বললেন। 'আমার সঠিক টাকা দরকার নেই — সঞ্চয়ের পরিকল্পনার জন্য শুধু মোটামুটি হিসাব।'",
  },
  312: {
    story: "At the end of every month, the shopkeeper sits down [[to balance the books]] and checks that his spending is not more than his income. This habit has kept his shop safe for twenty years.",
    storyBn: "প্রতি মাসের শেষে দোকানদার হিসাব মেলাতে বসে এবং খরচ যেন আয়ের বেশি না হয় তা পরীক্ষা করে। এই অভ্যাস তার দোকানকে বিশ বছর ধরে নিরাপদ রেখেছে।",
  },
  313: {
    story: "For our tea stall, the morning office crowd is a real [[cash cow]] — their daily tea and snacks bring half of our income. We always serve them with extra care.",
    storyBn: "আমাদের চায়ের দোকানের জন্য সকালের অফিসের ভিড় সত্যিকারের আয়ের উৎস — তাদের প্রতিদিনের চা ও নাস্তা আমাদের আয়ের অর্ধেক আনে। আমরা সবসময় অতিরিক্ত যত্নে তাদের সেবা করি।",
  },
  314: {
    story: "In our class debate practice, Ruma always plays the [[devil's advocate]] and argues against the popular side. Her counter-arguments make our team think harder and prepare better.",
    storyBn: "আমাদের ক্লাসের বিতর্ক অনুশীলনে রুমা সবসময় বিপক্ষের যুক্তি উপস্থাপন করে জনপ্রিয় পক্ষের বিরুদ্ধে যুক্তি দেয়। তার বিপক্ষ যুক্তি আমাদের দলকে আরও গভীরভাবে ভাবতে ও ভালো প্রস্তুতি নিতে সাহায্য করে।",
  },
  315: {
    story: "At the family picnic, uncle sang one song so badly that everyone laughed and said, '[[Don't give up the day job]]!' He laughed too and returned happily to his cooking.",
    storyBn: "পারিবারিক পিকনিকে চাচা একটি গান এত খারাপ গাইলেন যে সবাই হেসে বলল, 'তুমি এই কাজে ভালো নও; পেশাদারভাবে তা করতে পারবে না!' তিনিও হেসে খুশি মনে রান্নায় ফিরে গেলেন।",
  },
  316: {
    story: "The dishonest manager [[cooked the books]] to hide the money he had stolen from the company. When the real audit came, the false accounts were caught at once.",
    storyBn: "অসৎ ম্যানেজার কোম্পানি থেকে চুরি করা টাকা লুকাতে আর্থিক হিসাব বদলে ফেলল। আসল অডিট এলে মিথ্যা হিসাব সঙ্গে সঙ্গে ধরা পড়ল।",
  },
  317: {
    story: "After coming late to the office for the tenth time, the careless guard [[got the sack]]. He lost his job that very day and had to tell his family the sad news.",
    storyBn: "দশমবার অফিসে দেরি করে আসার পর অসতর্ক পাহারাদার চাকরি থেকে বরখাস্ত হলো। সে সেদিনই চাকরি হারাল এবং পরিবারকে দুঃখের খবরটি বলতে হলো।",
  },
  318: {
    story: "Before Eid, the tailors of our market are completely [[snowed under]] with orders — they sew day and night without rest. Customers must wait a week for a simple shirt.",
    storyBn: "ঈদের আগে আমাদের বাজারের দর্জিরা অর্ডারে খুব ব্যস্ত থাকে — তারা বিশ্রাম ছাড়াই দিনরাত সেলাই করে। ক্রেতাদের সাধারণ শার্টের জন্য এক সপ্তাহ অপেক্ষা করতে হয়।",
  },
  319: {
    story: "To build their little house before the rains, the poor couple [[worked their fingers to the bone]]. Their hands were sore, but their dream home stood ready in two months.",
    storyBn: "বৃষ্টির আগে তাদের ছোট ঘর বানাতে গরিব দম্পতিটি খুব কঠোর পরিশ্রম করল। তাদের হাতে ব্যথা হলো, কিন্তু তাদের স্বপ্নের ঘর দুই মাসে তৈরি হয়ে গেল।",
  },
  321: {
    story: "[[In the heat of the moment]], he shouted rude words at his best friend and walked out. The next morning he felt sorry and came back to apologise.",
    storyBn: "মুহূর্তে যা ঘটছে তাতে অভিভূত হয়ে সে তার সবচেয়ে ভালো বন্ধুকে অভদ্র কথা বলে চিৎকার করে বেরিয়ে গেল। পরদিন সকালে সে দুঃখিত হয়ে ক্ষমা চাইতে ফিরে এল।",
  },
  322: {
    story: "The rude boy pushed the old woman at the bus stop and did not even say sorry — he has [[not a spark of decency]] in him. Everyone present felt ashamed of his behaviour.",
    storyBn: "অভদ্র ছেলেটি বাস স্টপে বৃদ্ধ মহিলাকে ধাক্কা দিয়ে ক্ষমাও চাইল না — তার মধ্যে কোনো শিষ্টাচার নেই। উপস্থিত সবাই তার আচরণে লজ্জিত হলো।",
  },
  323: {
    story: "We were just talking about our old teacher when she walked into the room — '[[Speak of the devil]]!' we laughed. She smiled and asked what we had been saying about her.",
    storyBn: "আমরা ঠিক আমাদের পুরোনো শিক্ষকের কথা বলছিলাম, তখনই তিনি ঘরে ঢুকলেন — 'যার কথা বলছিলে, সে এসে হাজির!' আমরা হাসলাম। তিনি হেসে জিজ্ঞেস করলেন আমরা তার সম্পর্কে কী বলছিলাম।",
  },
  324: {
    story: "For his daughter's wedding, the father went the [[whole nine yards]] — new clothes, a big feast, music and lights for the whole street. He wanted her special day to be perfect in every way.",
    storyBn: "মেয়ের বিয়ের জন্য বাবা সবকিছু পুরোপুরি করলেন — নতুন পোশাক, বড় ভোজ, গান আর পুরো রাস্তাজুড়ে আলো। তিনি চেয়েছিলেন তার বিশেষ দিনটি সব দিক থেকে নিখুঁত হোক।",
  },
  325: {
    story: "'When will the rain stop?' I asked my brother. He looked at the dark sky and said, '[[Your guess is as good as mine]] — I have no idea at all.'",
    storyBn: "'বৃষ্টি কখন থামবে?' আমি ভাইকে জিজ্ঞেস করলাম। সে অন্ধকার আকাশের দিকে তাকিয়ে বলল, 'কোনো বিষয়েই আমার কোনো ধারণা নেই — আমিও জানি না।'",
  },
};
