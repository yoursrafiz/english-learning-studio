// English Learning Studio — original curriculum data.
// All vocabulary, Bengali translations, definitions, examples, micro-stories and
// lesson stories in this file were written for this app. The 125-topic sequence
// follows the topic map supplied by the learner; no third-party lesson content,
// translations or audio are reproduced.

import { RICH_EXTRA, RELS_MORE } from "./rich-extra";

export type EntryType = "word" | "phrase" | "sentence";

export interface RelStory {
  titleEn: string;
  titleBn: string;
  lines: { en: string; bn: string }[];
}

export interface Rel {
  en: string;
  bn: string;
  story?: RelStory;
}

export interface VocabEntry {
  key: string;
  lesson: number;
  en: string;
  bn: string;
  type: EntryType;
  pos: string;
  ipa?: string;
  defEn: string;
  defBn: string;
  exEn: string;
  exBn: string;
  synonyms: Rel[];
  antonyms: Rel[];
  noAntonymNote?: string;
  alternatives: Rel[];
  grammar?: { pattern: string; explainBn: string; more: { en: string; bn: string }[] };
  micro: { titleEn: string; titleBn: string; lines: { en: string; bn: string }[] };
}

export interface LessonStory {
  titleEn: string;
  titleBn: string;
  lines: { en: string; bn: string }[];
  questions: { qEn: string; qBn: string; options: string[]; answer: number }[];
}

export interface Lesson {
  n: number;
  en: string;
  bn: string;
  cat: string;
  icon: string;
  minutes: number;
  objectives: string[];
  entries: VocabEntry[];
  story: LessonStory;
}

export const CATEGORIES = [
  "Foundations & Numbers",
  "School, Nature & Play",
  "The Animal World",
  "Family, Clothes & Care",
  "At Home",
  "Food Shopping",
  "Food & Restaurants",
  "Town, Travel & Time",
  "Body & Health",
  "Journeys & Emergencies",
  "Work & Technology",
  "Grammar & Everyday Words",
] as const;

// [number, English title, Bengali title, category index, icon]
const META: [number, string, string, number, string][] = [
  [1, "Meeting New People", "নতুন মানুষের সঙ্গে পরিচিত হওয়া", 0, "handshake"],
  [2, "Polite Expressions and Thanking People", "ভদ্র অভিব্যক্তি ও ধন্যবাদ জানানো", 0, "hands-clapping"],
  [3, "Celebrations and Parties", "উদযাপন ও পার্টি", 0, "confetti"],
  [4, "Peace, Love, and Kindness", "শান্তি, ভালোবাসা ও দয়া", 0, "dove"],
  [5, "Feelings and Emotions", "অনুভূতি ও আবেগ", 0, "smile"],
  [6, "Days of the Week", "সপ্তাহের দিনগুলো", 0, "calendar"],
  [7, "Months of the Year", "বছরের মাসগুলো", 0, "calendar-days"],
  [8, "Numbers 1–10", "সংখ্যা ১–১০", 0, "abacus"],
  [9, "Numbers 11–20", "সংখ্যা ১১–২০", 0, "calculator"],
  [10, "Numbers 21–30", "সংখ্যা ২১–৩০", 0, "sort-numeric-down"],
  [11, "Numbers 10–100", "সংখ্যা ১০–১০০", 0, "hundred-points"],
  [12, "Numbers 100–1,000", "সংখ্যা ১০০–১,০০০", 0, "badge-percent"],
  [13, "Numbers 1,000–10,000", "সংখ্যা ১,০০০–১০,০০০", 0, "coins"],
  [14, "School Supplies", "স্কুলের সরঞ্জাম", 1, "backpack"],
  [15, "The Classroom", "শ্রেণিকক্ষ", 1, "school"],
  [16, "School Subjects", "স্কুলের বিষয়সমূহ", 1, "book"],
  [17, "Colors", "রং", 1, "palette"],
  [18, "Geography", "ভূগোল", 1, "map"],
  [19, "Astronomy", "জ্যোতির্বিজ্ঞান", 1, "telescope"],
  [20, "The Solar System", "সৌরজগৎ", 1, "planet-ringed"],
  [21, "Seasons and Weather", "ঋতু ও আবহাওয়া", 1, "cloud-sun-rain"],
  [22, "Sports", "খেলাধুলা", 1, "football"],
  [23, "Recreation and Activities", "বিনোদন ও কার্যকলাপ", 1, "fishing-rod"],
  [24, "Musical Instruments", "বাদ্যযন্ত্র", 1, "guitar"],
  [25, "At the Swimming Pool", "সুইমিং পুলে", 1, "swimming-pool"],
  [26, "At the Beach", "সমুদ্র সৈকতে", 2, "umbrella-beach"],
  [27, "Beach Activities", "সৈকতের কার্যকলাপ", 2, "volleyball"],
  [28, "Sea Animals and Fish", "সামুদ্রিক প্রাণী ও মাছ", 2, "fish"],
  [29, "Farm Animals", "খামারের পশু", 2, "cow"],
  [30, "Wild Animals", "বন্য প্রাণী", 2, "paw"],
  [31, "Insects", "পোকামাকড়", 2, "butterfly"],
  [32, "Different Types of Birds", "বিভিন্ন ধরনের পাখি", 2, "bird"],
  [33, "At the Zoo", "চিড়িয়াখানায়", 2, "lion"],
  [34, "Family Members", "পরিবারের সদস্যরা", 3, "family"],
  [35, "Extended Family Members", "বৃহত্তর পরিবারের সদস্যরা", 3, "users"],
  [36, "Friends", "বন্ধুরা", 3, "user-add"],
  [37, "Family Relationships", "পারিবারিক সম্পর্ক", 3, "heart"],
  [38, "Clothing", "পোশাক", 3, "shirt"],
  [39, "Outerwear", "বাইরের পোশাক", 3, "vest"],
  [40, "Underwear", "অন্তর্বাস", 3, "socks"],
  [41, "Baby and Children's Items", "শিশুদের জিনিসপত্র", 3, "baby-carriage"],
  [42, "Jewellery", "গহনা", 3, "gem"],
  [43, "Fashion Accessories", "ফ্যাশন আনুষাঙ্গিক", 3, "sunglasses"],
  [44, "Personal Care Products", "ব্যক্তিগত যত্নের পণ্য", 3, "spray-can-sparkles"],
  [45, "Rooms in a House", "বাড়ির ঘরসমূহ", 4, "home"],
  [46, "Parts of a House", "বাড়ির অংশসমূহ", 4, "block-brick"],
  [47, "Furniture", "আসবাবপত্র", 4, "sofa"],
  [48, "Household Items", "গৃহস্থালির জিনিসপত্র", 4, "broom"],
  [49, "Bathroom Items", "বাথরুমের জিনিসপত্র", 4, "shower"],
  [50, "Kitchen Appliances and Utensils", "রান্নাঘরের যন্ত্রপাতি ও বাসনপত্র", 4, "oven"],
  [51, "Table Setting", "টেবিল সাজানো", 5, "plate-utensils"],
  [52, "Food", "খাবার", 5, "bowl-rice"],
  [53, "Places in Town", "শহরের জায়গাসমূহ", 7, "city"],
  [54, "Shops in Town", "শহরের দোকানসমূহ", 7, "store-alt"],
  [55, "Street Features and Objects", "রাস্তার বৈশিষ্ট্য ও বস্তুসমূহ", 7, "traffic-light"],
  [56, "Shopping", "কেনাকাটা", 5, "shopping-bag"],
  [57, "Shopping for Clothes", "পোশাক কেনাকাটা", 5, "dress"],
  [58, "Bargaining and Prices", "দরদাম ও মূল্য", 5, "money"],
  [59, "Grocery Items", "মুদি পণ্য", 5, "basket-shopping-simple"],
  [60, "Grocery Shopping List", "মুদি কেনাকাটার তালিকা", 5, "list-check"],
  [61, "Fruits", "ফল", 6, "apple-whole"],
  [62, "Sweet Fruits", "মিষ্টি ফল", 6, "grape"],
  [63, "Vegetables", "শাকসবজি", 6, "carrot"],
  [64, "Healthy Vegetables", "স্বাস্থ্যকর সবজি", 6, "broccoli"],
  [65, "Herbs and Spices", "ভেষজ ও মসলা", 6, "leaf"],
  [66, "Dairy Products", "দুগ্ধজাত পণ্য", 6, "milk"],
  [67, "At the Butcher's Shop", "কসাইয়ের দোকানে", 6, "meat"],
  [68, "At the Seafood Market", "সামুদ্রিক খাবারের বাজারে", 6, "shrimp"],
  [69, "At the Bakery", "বেকারিতে", 6, "croissant"],
  [70, "Beverages", "পানীয়", 6, "cup-straw"],
  [71, "At a Restaurant", "রেস্তোরাঁয়", 6, "utensils"],
  [72, "The Restaurant Menu", "রেস্তোরাঁর মেনু", 6, "book-alt"],
  [73, "Food Preparation", "খাবার প্রস্তুতি", 6, "hat-chef"],
  [74, "Dietary Restrictions", "খাদ্য বিধিনিষেধ", 6, "triangle-warning"],
  [75, "Describing Food and Taste", "খাবার ও স্বাদের বর্ণনা", 6, "face-smile-hearts"],
  [76, "Paying the Bill", "বিল পরিশোধ করা", 6, "receipt"],
  [77, "Transportation", "পরিবহন", 7, "bus"],
  [78, "Directions", "দিকনির্দেশনা", 7, "compass-alt"],
  [79, "Asking for Directions", "পথ জিজ্ঞাসা করা", 7, "comment-question"],
  [80, "Giving Directions", "পথ নির্দেশ দেওয়া", 7, "location-arrow"],
  [81, "Around Town", "শহরজুড়ে", 7, "building"],
  [82, "Times of Day", "দিনের সময়সমূহ", 7, "sunrise"],
  [83, "Time Vocabulary", "সময়ের শব্দভাণ্ডার", 7, "clock"],
  [84, "Time and Dates", "সময় ও তারিখ", 7, "calendar-clock"],
  [85, "Body Parts", "শরীরের অঙ্গ", 8, "hand"],
  [86, "Human Anatomy", "মানবদেহের গঠন", 8, "bone"],
  [87, "Internal Organs", "অভ্যন্তরীণ অঙ্গ", 8, "anatomical-heart"],
  [88, "Medical Equipment and Supplies", "চিকিৎসা সরঞ্জাম ও উপকরণ", 8, "thermometer-half"],
  [89, "At the Medical Clinic", "মেডিকেল ক্লিনিকে", 8, "hospital"],
  [90, "Visiting a Doctor: Feeling Sick", "ডাক্তারের কাছে: অসুস্থ বোধ করা", 8, "face-thermometer"],
  [91, "Visiting a Doctor: Injuries", "ডাক্তারের কাছে: আঘাত", 8, "band-aid"],
  [92, "Visiting a Doctor: Having a Cold", "ডাক্তারের কাছে: সর্দি-কাশি", 8, "snowflake"],
  [93, "Airports and Departures", "বিমানবন্দর ও প্রস্থান", 9, "plane-departure"],
  [94, "Immigration and Customs", "ইমিগ্রেশন ও কাস্টমস", 9, "passport"],
  [95, "Travelling by Airplane", "বিমানে ভ্রমণ", 9, "plane"],
  [96, "Arrivals and Baggage", "আগমন ও লাগেজ", 9, "plane-arrival"],
  [97, "Hotel Reservations", "হোটেল বুকিং", 9, "hotel"],
  [98, "Hotel Rooms and Rental Accommodation", "হোটেল রুম ও ভাড়া বাসা", 9, "bed"],
  [99, "Checking Out of a Hotel", "হোটেল থেকে চেক আউট", 9, "door-open"],
  [100, "Emergency Expressions", "জরুরি অভিব্যক্তি", 9, "siren-on"],
  [101, "Professions", "পেশা", 10, "chalkboard-user"],
  [102, "Jobs and Occupations", "চাকরি ও পেশা", 10, "briefcase"],
  [103, "Office Equipment", "অফিস সরঞ্জাম", 10, "print"],
  [104, "Office Supplies and Objects", "অফিসের সরঞ্জাম ও বস্তু", 10, "paperclip-vertical"],
  [105, "Job Applications", "চাকরির আবেদন", 10, "document"],
  [106, "Job Interviews", "চাকরির সাক্ষাৎকার", 10, "microphone"],
  [107, "Internet Vocabulary", "ইন্টারনেট শব্দভাণ্ডার", 10, "globe"],
  [108, "Navigating the Internet", "ইন্টারনেট ব্যবহার", 10, "globe-pointer"],
  [109, "Websites", "ওয়েবসাইট", 10, "laptop"],
  [110, "Computer Parts", "কম্পিউটারের অংশ", 10, "keyboard"],
  [111, "Email Terminology", "ইমেইল পরিভাষা", 10, "envelope"],
  [112, "Online Shopping", "অনলাইন কেনাকাটা", 10, "shopping-cart"],
  [113, "Useful Everyday Words", "দরকারি দৈনন্দিন শব্দ", 11, "letter-case"],
  [114, "Adjectives", "বিশেষণ", 11, "sparkles"],
  [115, "Opposites", "বিপরীত শব্দ", 11, "arrows-h"],
  [116, "Personal Pronouns", "ব্যক্তিবাচক সর্বনাম", 11, "user"],
  [117, "Possessive Pronouns", "সম্বন্ধবাচক সর্বনাম", 11, "key"],
  [118, "Question Words", "প্রশ্নবোধক শব্দ", 11, "interrogation"],
  [119, "Indefinite Pronouns and Connecting Words", "অনির্দিষ্ট সর্বনাম ও সংযোগকারী শব্দ", 11, "arrows-repeat"],
  [120, "Prepositions", "পদান্বয়ী অব্যয়", 11, "marker"],
  [121, "Common Prepositions", "সাধারণ অব্যয়সমূহ", 11, "location-alt"],
  [122, "Conjunctions", "সংযোজক অব্যয়", 11, "link"],
  [123, "Things I Want and Do Not Want", "যা আমি চাই ও চাই না", 11, "gift"],
  [124, "Things I Like and Dislike", "যা আমি পছন্দ ও অপছন্দ করি", 11, "wishlist-heart"],
  [125, "Things I Need and Do Not Need", "যা আমার প্রয়োজন ও প্রয়োজন নেই", 11, "badge-check"],
];

// Topic word banks: "English=Bengali" pairs, comma separated. Every pair is
// specific to its lesson topic.
const BANKS: Record<number, string> = {
  1: "hello=হ্যালো,name=নাম,meet=দেখা করা,friend=বন্ধু,introduce=পরিচয় করিয়ে দেওয়া,welcome=স্বাগতম,Nice to meet you=আপনার সঙ্গে পরিচিত হয়ে ভালো লাগলো,What is your name?=আপনার নাম কী?,My name is Rafi=আমার নাম রাফি,goodbye=বিদায়",
  2: "please=অনুগ্রহ করে,thank you=ধন্যবাদ,you are welcome=আপনাকে স্বাগতম,sorry=দুঃখিত,excuse me=মাফ করবেন,grateful=কৃতজ্ঞ,polite=ভদ্র,no problem=কোনো সমস্যা নেই,after you=আপনি আগে যান,thanks a lot=অনেক ধন্যবাদ",
  3: "party=পার্টি,celebrate=উদযাপন করা,birthday=জন্মদিন,cake=কেক,gift=উপহার,balloon=বেলুন,music=সংগীত,dance=নাচ,invitation=আমন্ত্রণ,congratulations=অভিনন্দন",
  4: "peace=শান্তি,love=ভালোবাসা,kind=দয়ালু,kindness=দয়া,help=সাহায্য,share=ভাগ করা,forgive=ক্ষমা করা,smile=হাসি,gentle=কোমল,care=যত্ন",
  5: "happy=সুখী,sad=দুঃখিত,angry=রাগী,afraid=ভীত,excited=উত্তেজিত,tired=ক্লান্ত,hungry=ক্ষুধার্ত,surprised=অবাক,worried=চিন্তিত,calm=শান্ত",
  6: "Monday=সোমবার,Tuesday=মঙ্গলবার,Wednesday=বুধবার,Thursday=বৃহস্পতিবার,Friday=শুক্রবার,Saturday=শনিবার,Sunday=রবিবার,today=আজ,tomorrow=আগামীকাল,yesterday=গতকাল",
  7: "January=জানুয়ারি,February=ফেব্রুয়ারি,March=মার্চ,April=এপ্রিল,May=মে,June=জুন,July=জুলাই,August=আগস্ট,September=সেপ্টেম্বর,October=অক্টোবর,November=নভেম্বর,December=ডিসেম্বর",
  8: "one=এক,two=দুই,three=তিন,four=চার,five=পাঁচ,six=ছয়,seven=সাত,eight=আট,nine=নয়,ten=দশ",
  9: "eleven=এগারো,twelve=বারো,thirteen=তেরো,fourteen=চৌদ্দ,fifteen=পনেরো,sixteen=ষোলো,seventeen=সতেরো,eighteen=আঠারো,nineteen=উনিশ,twenty=বিশ",
  10: "twenty-one=একুশ,twenty-two=বাইশ,twenty-three=তেইশ,twenty-four=চব্বিশ,twenty-five=পঁচিশ,twenty-six=ছাব্বিশ,twenty-seven=সাতাশ,twenty-eight=আঠাশ,twenty-nine=ঊনত্রিশ,thirty=ত্রিশ",
  11: "ten=দশ,twenty=বিশ,thirty=ত্রিশ,forty=চল্লিশ,fifty=পঞ্চাশ,sixty=ষাট,seventy=সত্তর,eighty=আশি,ninety=নব্বই,one hundred=একশো",
  12: "one hundred=একশো,two hundred=দুইশো,three hundred=তিনশো,five hundred=পাঁচশো,one thousand=এক হাজার,number=সংখ্যা,count=গণনা করা,many=অনেক,How many?=কতগুলো?,price=দাম",
  13: "one thousand=এক হাজার,two thousand=দুই হাজার,five thousand=পাঁচ হাজার,ten thousand=দশ হাজার,amount=পরিমাণ,total=মোট,How much?=কত?,expensive=দামি,cheap=সস্তা,large number=বড় সংখ্যা",
  14: "pencil=পেন্সিল,pen=কলম,book=বই,notebook=খাতা,school bag=স্কুল ব্যাগ,ruler=স্কেল,eraser=রাবার,sharpener=শার্পনার,crayon=রঙ পেন্সিল,scissors=কাঁচি",
  15: "classroom=শ্রেণিকক্ষ,teacher=শিক্ষক,student=শিক্ষার্থী,desk=ডেস্ক,chair=চেয়ার,board=বোর্ড,door=দরজা,window=জানালা,lesson=পাঠ,question=প্রশ্ন",
  16: "mathematics=গণিত,English=ইংরেজি,Bengali=বাংলা,science=বিজ্ঞান,history=ইতিহাস,geography=ভূগোল,art=চারুকলা,religion=ধর্ম,physical education=শারীরশিক্ষা,subject=বিষয়",
  17: "red=লাল,blue=নীল,green=সবুজ,yellow=হলুদ,black=কালো,white=সাদা,orange=কমলা,pink=গোলাপি,purple=বেগুনি,brown=বাদামি",
  18: "country=দেশ,city=শহর,village=গ্রাম,river=নদী,mountain=পাহাড়,sea=সমুদ্র,island=দ্বীপ,desert=মরুভূমি,forest=বন,map=মানচিত্র",
  19: "star=তারা,moon=চাঁদ,sun=সূর্য,sky=আকাশ,planet=গ্রহ,telescope=দূরবীক্ষণ যন্ত্র,night=রাত,space=মহাকাশ,comet=ধূমকেতু,galaxy=ছায়াপথ",
  20: "Sun=সূর্য,Mercury=বুধ,Venus=শুক্র,Earth=পৃথিবী,Mars=মঙ্গল,Jupiter=বৃহস্পতি,Saturn=শনি,Moon=চাঁদ,orbit=কক্ষপথ,planet=গ্রহ",
  21: "spring=বসন্ত,summer=গ্রীষ্ম,rainy season=বর্ষা,autumn=শরৎ,winter=শীত,rain=বৃষ্টি,cloud=মেঘ,wind=বাতাস,hot=গরম,cold=ঠান্ডা",
  22: "football=ফুটবল,cricket=ক্রিকেট,tennis=টেনিস,swimming=সাঁতার,running=দৌড়,badminton=ব্যাডমিন্টন,basketball=বাস্কেটবল,cycling=সাইকেল চালানো,player=খেলোয়াড়,team=দল",
  23: "reading=পড়া,fishing=মাছ ধরা,gardening=বাগান করা,cooking=রান্না,painting=ছবি আঁকা,singing=গান গাওয়া,walking=হাঁটা,camping=ক্যাম্পিং,hobby=শখ,picnic=পিকনিক",
  24: "guitar=গিটার,piano=পিয়ানো,flute=বাঁশি,drum=ঢোল,violin=বেহালা,harmonium=হারমোনিয়াম,trumpet=ট্রাম্পেট,tabla=তবলা,music=সংগীত,song=গান",
  25: "swimming pool=সুইমিং পুল,swim=সাঁতার কাটা,water=পানি,towel=তোয়ালে,dive=ডুব দেওয়া,float=ভাসা,swimming cap=সাঁতারের টুপি,goggles=সাঁতারের চশমা,deep=গভীর,shallow=অগভীর",
  26: "beach=সমুদ্র সৈকত,sand=বালি,sea=সমুদ্র,wave=ঢেউ,shell=ঝিনুক,sun=সূর্য,umbrella=ছাতা,boat=নৌকা,swim=সাঁতার কাটা,towel=তোয়ালে",
  27: "build a sandcastle=বালির দুর্গ বানানো,collect shells=ঝিনুক সংগ্রহ করা,play volleyball=ভলিবল খেলা,sunbathe=রোদ পোহানো,surf=সার্ফ করা,snorkel=স্নরকেল করা,relax=বিশ্রাম নেওয়া,fly a kite=ঘুড়ি ওড়ানো,picnic=পিকনিক,shade=ছায়া",
  28: "fish=মাছ,shark=হাঙর,whale=তিমি,octopus=অক্টোপাস,crab=কাঁকড়া,shrimp=চিংড়ি,sea turtle=সামুদ্রিক কচ্ছপ,dolphin=ডলফিন,jellyfish=জেলিফিশ,seahorse=সামুদ্রিক ঘোড়া",
  29: "cow=গরু,goat=ছাগল,sheep=ভেড়া,chicken=মুরগি,duck=হাঁস,horse=ঘোড়া,pig=শূকর,buffalo=মহিষ,donkey=গাধা,rooster=মোরগ",
  30: "tiger=বাঘ,lion=সিংহ,elephant=হাতি,deer=হরিণ,monkey=বানর,bear=ভালুক,fox=শিয়াল,wolf=নেকড়ে,snake=সাপ,zebra=জেব্রা",
  31: "ant=পিঁপড়া,bee=মৌমাছি,butterfly=প্রজাপতি,mosquito=মশা,fly=মাছি,spider=মাকড়সা,grasshopper=ফড়িং,cockroach=তেলাপোকা,beetle=গুবরে পোকা,worm=কেঁচো",
  32: "sparrow=চড়ুই,crow=কাক,pigeon=কবুতর,eagle=ঈগল,owl=পেঁচা,parrot=তোতা পাখি,peacock=ময়ূর,cuckoo=কোকিল,kingfisher=মাছরাঙা,duck=হাঁস",
  33: "zoo=চিড়িয়াখানা,cage=খাঁচা,ticket=টিকিট,zookeeper=চিড়িয়াখানার রক্ষক,feed=খাওয়ানো,visit=পরিদর্শন করা,animal=প্রাণী,take a photo=ছবি তোলা,guide=গাইড,entrance=প্রবেশদ্বার",
  34: "father=বাবা,mother=মা,brother=ভাই,sister=বোন,grandfather=দাদা,grandmother=দাদি,uncle=চাচা,aunt=চাচি,cousin=চাচাতো ভাইবোন,baby=শিশু",
  35: "nephew=ভাতিজা,niece=ভাতিজি,father-in-law=শ্বশুর,mother-in-law=শাশুড়ি,brother-in-law=দুলাভাই,sister-in-law=ভাবি,grandson=নাতি,granddaughter=নাতনি,husband=স্বামী,wife=স্ত্রী",
  36: "friend=বন্ধু,best friend=সেরা বন্ধু,classmate=সহপাঠী,neighbour=প্রতিবেশী,trust=বিশ্বাস,loyal=বিশ্বস্ত,helpful=সহায়ক,play together=একসঙ্গে খেলা,share=ভাগ করা,kind=দয়ালু",
  37: "married=বিবাহিত,single=অবিবাহিত,engaged=বাগদত্ত,wedding=বিয়ে,couple=দম্পতি,relative=আত্মীয়,ancestor=পূর্বপুরুষ,generation=প্রজন্ম,grow up=বড় হওয়া,celebrate=উদযাপন করা",
  38: "shirt=শার্ট,pants=প্যান্ট,dress=জামা,skirt=স্কার্ট,sari=শাড়ি,panjabi=পাঞ্জাবি,shoes=জুতা,socks=মোজা,hat=টুপি,jacket=জ্যাকেট",
  39: "coat=কোট,sweater=সোয়েটার,jacket=জ্যাকেট,scarf=স্কার্ফ,gloves=দস্তানা,raincoat=রেইনকোট,boots=বুট,hood=হুড,warm=উষ্ণ,winter=শীতকাল",
  40: "underwear=অন্তর্বাস,vest=গেঞ্জি,undershirt=আন্ডারশার্ট,briefs=ব্রিফ,pajamas=পায়জামা,nightdress=রাতের পোশাক,socks=মোজা,cotton=সুতি,comfortable=আরামদায়ক,soft=নরম",
  41: "diaper=ডায়াপার,feeding bottle=দুধের বোতল,toy=খেলনা,stroller=শিশুর গাড়ি,blanket=কম্বল,bib=বিব,rattle=ঝুমঝুমি,crib=শিশুর খাট,pacifier=চুষনি,baby food=শিশুখাদ্য",
  42: "necklace=হার,earrings=কানের দুল,ring=আংটি,bracelet=ব্রেসলেট,gold=সোনা,silver=রূপা,diamond=হীরা,pearl=মুক্তা,bangle=চুড়ি,pendant=লকেট",
  43: "sunglasses=সানগ্লাস,wristwatch=হাতঘড়ি,belt=বেল্ট,wallet=মানিব্যাগ,handbag=হ্যান্ডব্যাগ,scarf=স্কার্ফ,gloves=দস্তানা,cap=ক্যাপ,tie=টাই,umbrella=ছাতা",
  44: "soap=সাবান,shampoo=শ্যাম্পু,toothpaste=টুথপেস্ট,toothbrush=টুথব্রাশ,perfume=সুগন্ধি,face cream=ফেস ক্রিম,body lotion=বডি লোশন,comb=চিরুনি,mirror=আয়না,nail cutter=নখ কাটার যন্ত্র",
  45: "bedroom=শোবার ঘর,kitchen=রান্নাঘর,bathroom=বাথরুম,living room=বসার ঘর,dining room=খাবার ঘর,balcony=বারান্দা,roof terrace=ছাদ,yard=উঠান,stairs=সিঁড়ি,front door=সদর দরজা",
  46: "wall=দেয়াল,floor=মেঝে,roof=ছাদ,window=জানালা,door=দরজা,stairs=সিঁড়ি,balcony=বারান্দা,gate=ফটক,pillar=খুঁটি,ceiling=সিলিং",
  47: "bed=খাট,table=টেবিল,chair=চেয়ার,sofa=সোফা,wardrobe=আলমারি,shelf=তাক,drawer=ড্রয়ার,mirror=আয়না,lamp=বাতি,study desk=পড়ার ডেস্ক",
  48: "broom=ঝাড়ু,bucket=বালতি,kettle=কেটলি,clothes iron=ইস্ত্রি,candle=মোমবাতি,wall clock=দেয়াল ঘড়ি,key=চাবি,lock=তালা,basket=ঝুড়ি,rope=দড়ি",
  49: "toilet=টয়লেট,shower=শাওয়ার,bathtub=বাথটাব,wash basin=বেসিন,water tap=পানির কল,soap=সাবান,towel=তোয়ালে,shampoo=শ্যাম্পু,mirror=আয়না,bucket=বালতি",
  50: "gas stove=গ্যাসের চুলা,fridge=ফ্রিজ,oven=ওভেন,rice cooker=রাইস কুকার,blender=ব্লেন্ডার,knife=ছুরি,spoon=চামচ,fork=কাঁটা চামচ,plate=প্লেট,frying pan=কড়াই",
  51: "dinner plate=খাবার প্লেট,bowl=বাটি,drinking glass=গ্লাস,cup=কাপ,spoon=চামচ,fork=কাঁটা চামচ,knife=ছুরি,napkin=ন্যাপকিন,tablecloth=টেবিল ক্লথ,serving tray=ট্রে",
  52: "cooked rice=ভাত,bread=রুটি,fish=মাছ,meat=মাংস,egg=ডিম,soup=স্যুপ,salad=সালাদ,curry=তরকারি,fruit=ফল,cake=কেক",
  53: "bank=ব্যাংক,hospital=হাসপাতাল,school=স্কুল,market=বাজার,mosque=মসজিদ,park=পার্ক,library=গ্রন্থাগার,police station=থানা,post office=ডাকঘর,pharmacy=ফার্মেসি",
  54: "grocery shop=মুদি দোকান,pharmacy=ফার্মেসি,bakery=বেকারি,book shop=বইয়ের দোকান,clothes shop=পোশাকের দোকান,shoe shop=জুতার দোকান,market=বাজার,tailor shop=দর্জির দোকান,barber shop=সেলুন,tea stall=চায়ের দোকান",
  55: "road=রাস্তা,bridge=সেতু,traffic light=ট্রাফিক বাতি,signboard=সাইনবোর্ড,zebra crossing=জেব্রা ক্রসিং,footpath=ফুটপাত,lamp post=বাতির খুঁটি,dustbin=ডাস্টবিন,bus stop=বাস স্টপ,street corner=রাস্তার কোণা",
  56: "shop=দোকান,buy=কেনা,sell=বিক্রি করা,price=দাম,money=টাকা,customer=ক্রেতা,shopkeeper=দোকানদার,bill=বিল,shopping bag=কেনাকাটার ব্যাগ,go shopping=কেনাকাটা করতে যাওয়া",
  57: "try on=পরে দেখা,size=মাপ,fitting room=ফিটিং রুম,too big=অনেক বড়,too small=অনেক ছোট,colour=রং,style=স্টাইল,discount=ছাড়,look good=ভালো দেখানো,choose=বেছে নেওয়া",
  58: "cheap=সস্তা,expensive=দামি,price=দাম,bargain=দরদাম করা,discount=ছাড়,too expensive=অনেক দামি,last price=শেষ দাম,afford=সামর্থ্য থাকা,cost=দাম পড়া,How much is it?=এটার দাম কত?",
  59: "rice=চাল,cooking oil=রান্নার তেল,salt=লবণ,sugar=চিনি,flour=আটা,lentils=ডাল,onion=পেঁয়াজ,potato=আলু,tea leaves=চা পাতা,soap=সাবান",
  60: "shopping list=কেনাকাটার তালিকা,need=প্রয়োজন,buy=কেনা,remember=মনে রাখা,forget=ভুলে যাওয়া,basket=ঝুড়ি,weekly=সাপ্তাহিক,fresh=তাজা,item=পণ্য,tick off=টিক দেওয়া",
  61: "mango=আম,banana=কলা,apple=আপেল,orange=কমলা লেবু,grapes=আঙুর,pineapple=আনারস,papaya=পেঁপে,watermelon=তরমুজ,coconut=নারকেল,guava=পেয়ারা",
  62: "mango=আম,lychee=লিচু,jackfruit=কাঁঠাল,banana=কলা,grapes=আঙুর,dates=খেজুর,fig=ডুমুর,plum=আলুবোখারা,cherry=চেরি,peach=পীচ",
  63: "potato=আলু,tomato=টমেটো,onion=পেঁয়াজ,carrot=গাজর,cabbage=বাঁধাকপি,cauliflower=ফুলকপি,eggplant=বেগুন,cucumber=শসা,pumpkin=কুমড়া,spinach=পালং শাক",
  64: "spinach=পালং শাক,broccoli=ব্রকলি,carrot=গাজর,green beans=শিম,peas=মটরশুঁটি,garlic=রসুন,ginger=আদা,lemon=লেবু,bitter gourd=করলা,okra=ঢেঁড়স",
  65: "turmeric=হলুদ,cumin=জিরা,coriander=ধনিয়া,red chili=শুকনো মরিচ,cardamom=এলাচ,cinnamon=দারুচিনি,bay leaf=তেজপাতা,black pepper=গোলমরিচ,mustard seeds=সরিষা,mint leaves=পুদিনা পাতা",
  66: "milk=দুধ,cheese=পনির,butter=মাখন,yogurt=দই,cream=ক্রিম,ghee=ঘি,egg=ডিম,paneer=পনির,ice cream=আইসক্রিম,curd=টক দই",
  67: "beef=গরুর মাংস,mutton=খাসির মাংস,chicken meat=মুরগির মাংস,meat=মাংস,one kilo=এক কেজি,fresh meat=তাজা মাংস,cut the meat=মাংস কাটা,bone=হাড়,fat=চর্বি,weighing scale=পাল্লা",
  68: "hilsa fish=ইলিশ মাছ,shrimp=চিংড়ি,crab=কাঁকড়া,squid=স্কুইড,oyster=ঝিনুক,fresh fish=তাজা মাছ,one kilo=এক কেজি,fish smell=মাছের গন্ধ,seafood market=সামুদ্রিক খাবারের বাজার,dry fish=শুঁটকি মাছ",
  69: "bread loaf=পাউরুটি,cake=কেক,biscuits=বিস্কুট,pastry=পেস্ট্রি,bun=বান,flour=ময়দা,bakery oven=বেকারির ওভেন,fresh bread=তাজা রুটি,sweet bun=মিষ্টি বান,bake=বেক করা",
  70: "tea=চা,coffee=কফি,milk=দুধ,fruit juice=ফলের জুস,water=পানি,lemonade=লেবুর শরবত,soda=সোডা,soft drink=কোমল পানীয়,hot chocolate=হট চকলেট,smoothie=স্মুদি",
  71: "restaurant=রেস্তোরাঁ,waiter=ওয়েটার,menu=মেনু,restaurant table=রেস্তোরাঁর টেবিল,place an order=অর্ডার দেওয়া,bill=বিল,delicious=সুস্বাদু,hungry=ক্ষুধার্ত,book a table=টেবিল বুক করা,tip=বকশিশ",
  72: "appetizer=অ্যাপেটাইজার,main course=প্রধান খাবার,dessert=মিষ্টান্ন,soup=স্যুপ,salad=সালাদ,drinks menu=পানীয়ের তালিকা,today's special=আজকের বিশেষ খাবার,spicy dish=ঝাল খাবার,sweet dish=মিষ্টি খাবার,menu price=মেনুর দাম",
  73: "wash the vegetables=সবজি ধোয়া,cut=কাটা,peel=খোসা ছাড়ানো,boil=সিদ্ধ করা,fry=ভাজা,mix=মেশানো,add salt=লবণ দেওয়া,stir=নাড়া,cook=রান্না করা,taste the food=খাবারের স্বাদ নেওয়া",
  74: "vegetarian=নিরামিষভোজী,vegan=ভেগান,allergic to nuts=বাদামে অ্যালার্জি,gluten=গ্লুটেন,halal food=হালাল খাবার,less spicy=কম ঝাল,sugar-free=চিনিমুক্ত,dairy products=দুগ্ধজাত পণ্য,I cannot eat nuts=আমি বাদাম খেতে পারি না,no onion please=অনুগ্রহ করে পেঁয়াজ দেবেন না",
  75: "delicious=সুস্বাদু,tasty=মজাদার,sour=টক,bitter=তিতা,salty=লবণাক্ত,sweet=মিষ্টি,spicy=ঝাল,bland=স্বাদহীন,fresh=তাজা,yummy=খুব মজাদার",
  76: "the bill=বিল,pay the bill=বিল পরিশোধ করা,cash=নগদ টাকা,bank card=ব্যাংক কার্ড,change=ভাংতি,receipt=রসিদ,total amount=মোট টাকা,tip=বকশিশ,wallet=মানিব্যাগ,keep the change=ভাংতি রেখে দিন",
  77: "bus=বাস,train=ট্রেন,rickshaw=রিকশা,car=গাড়ি,bicycle=সাইকেল,boat=নৌকা,airplane=বিমান,taxi=ট্যাক্সি,motorbike=মোটরবাইক,auto-rickshaw=অটোরিকশা",
  78: "left=বামে,right=ডানে,straight ahead=সোজা সামনে,north=উত্তর,south=দক্ষিণ,east=পূর্ব,west=পশ্চিম,near=কাছে,far away=অনেক দূরে,direction=দিক",
  79: "Excuse me — where is the station?=মাফ করবেন — স্টেশনটা কোথায়?,How can I go to the market?=আমি কীভাবে বাজারে যাব?,I am lost=আমি পথ হারিয়ে ফেলেছি,street map=রাস্তার মানচিত্র,address=ঠিকানা,nearby=কাছাকাছি,please help me=অনুগ্রহ করে আমাকে সাহায্য করুন,thank you for your help=আপনার সাহায্যের জন্য ধন্যবাদ,the way to…=… যাওয়ার পথ,turn left=বামে মোড় নিন",
  80: "go straight=সোজা যান,turn left=বামে মোড় নিন,turn right=ডানে মোড় নিন,cross the road=রাস্তা পার হোন,next to the bank=ব্যাংকের পাশে,opposite the park=পার্কের বিপরীতে,between the shops=দোকানগুলোর মাঝখানে,at the corner=কোণায়,in front of the school=স্কুলের সামনে,behind the hospital=হাসপাতালের পেছনে",
  81: "central market=কেন্দ্রীয় বাজার,city park=শহরের পার্ক,primary school=প্রাথমিক বিদ্যালয়,district hospital=জেলা হাসপাতাল,central bank=কেন্দ্রীয় ব্যাংক,river bridge=নদীর সেতু,central mosque=কেন্দ্রীয় মসজিদ,public library=সরকারি গ্রন্থাগার,railway station=রেল স্টেশন,city museum=শহরের জাদুঘর",
  82: "early morning=ভোরবেলা,morning=সকাল,noon=দুপুর,afternoon=বিকেল,evening=সন্ধ্যা,night=রাত,midnight=মধ্যরাত,dawn=ভোর,today=আজ,tonight=আজ রাত",
  83: "time=সময়,one hour=এক ঘণ্টা,one minute=এক মিনিট,one second=এক সেকেন্ড,wall clock=দেয়াল ঘড়ি,wristwatch=হাতঘড়ি,early=তাড়াতাড়ি,late=দেরি,What time is it?=কয়টা বাজে?,three o'clock=তিনটা",
  84: "date=তারিখ,day=দিন,week=সপ্তাহ,month=মাস,year=বছর,birthday=জন্মদিন,calendar=ক্যালেন্ডার,today=আজ,tomorrow=আগামীকাল,yesterday=গতকাল",
};

Object.assign(BANKS, {
  85: "head=মাথা,hand=হাত,leg=পা,eye=চোখ,ear=কান,nose=নাক,mouth=মুখ,hair=চুল,finger=আঙুল,foot=পায়ের পাতা",
  86: "brain=মস্তিষ্ক,heart=হৃৎপিণ্ড,bone=হাড়,muscle=পেশি,skin=ত্বক,blood=রক্ত,nerve=স্নায়ু,skeleton=কঙ্কাল,joint=অস্থিসন্ধি,vein=শিরা",
  87: "heart=হৃৎপিণ্ড,lungs=ফুসফুস,liver=যকৃৎ,kidney=কিডনি,stomach=পাকস্থলী,brain=মস্তিষ্ক,intestine=অন্ত্র,bladder=মূত্রথলি,pancreas=অগ্ন্যাশয়,spleen=প্লীহা",
  88: "thermometer=থার্মোমিটার,bandage=ব্যান্ডেজ,syringe=সিরিঞ্জ,stethoscope=স্টেথোস্কোপ,medicine=ওষুধ,face mask=মাস্ক,medical gloves=চিকিৎসা দস্তানা,wheelchair=হুইলচেয়ার,cotton wool=তুলা,ointment=মলম",
  89: "clinic=ক্লিনিক,doctor=ডাক্তার,nurse=নার্স,patient=রোগী,appointment=অ্যাপয়েন্টমেন্ট,prescription=প্রেসক্রিপশন,medicine=ওষুধ,health check-up=স্বাস্থ্য পরীক্ষা,reception desk=রিসেপশন,waiting room=অপেক্ষার ঘর",
  90: "sick=অসুস্থ,fever=জ্বর,headache=মাথাব্যথা,stomachache=পেটব্যথা,pain=ব্যথা,tired=ক্লান্ত,dizzy=মাথা ঘোরা,take rest=বিশ্রাম নেওয়া,medicine=ওষুধ,I feel sick=আমি অসুস্থ বোধ করছি",
  91: "small cut=ছোট কাটা,burn=পোড়া,broken bone=হাড় ভাঙা,sprained ankle=মচকানো গোড়ালি,bleeding=রক্তপাত,bandage=ব্যান্ডেজ,wound=ক্ষত,road accident=সড়ক দুর্ঘটনা,severe pain=তীব্র ব্যথা,hospital=হাসপাতাল",
  92: "common cold=সাধারণ সর্দি,cough=কাশি,sneeze=হাঁচি,runny nose=নাক দিয়ে পানি পড়া,sore throat=গলা ব্যথা,mild fever=হালকা জ্বর,tissue paper=টিস্যু পেপার,take rest=বিশ্রাম নেওয়া,drink warm water=কুসুম গরম পানি পান করা,cold medicine=সর্দির ওষুধ",
  93: "airport=বিমানবন্দর,flight=ফ্লাইট,plane ticket=বিমানের টিকিট,passport=পাসপোর্ট,departure=প্রস্থান,boarding gate=বোর্ডিং গেট,boarding pass=বোর্ডিং পাস,luggage=লাগেজ,check-in counter=চেক-ইন কাউন্টার,flight delay=ফ্লাইট বিলম্ব",
  94: "passport=পাসপোর্ট,visa=ভিসা,customs=কাস্টমস,immigration officer=ইমিগ্রেশন কর্মকর্তা,declare goods=পণ্য ঘোষণা করা,travel luggage=ভ্রমণের লাগেজ,officer's question=কর্মকর্তার প্রশ্ন,passport stamp=পাসপোর্টের সিল,arrival form=আগমন ফর্ম,border control=সীমান্ত নিয়ন্ত্রণ",
  95: "airplane seat=বিমানের আসন,window seat=জানালার পাশের আসন,aisle seat=আইলের পাশের আসন,seatbelt=সিটবেল্ট,pilot=পাইলট,takeoff=উড্ডয়ন,landing=অবতরণ,in-flight meal=বিমানের খাবার,cabin crew=কেবিন ক্রু,safe journey=নিরাপদ যাত্রা",
  96: "arrival hall=আগমন হল,baggage belt=লাগেজ বেল্ট,luggage trolley=লাগেজ ট্রলি,lost luggage=হারানো লাগেজ,baggage claim=লাগেজ সংগ্রহ,exit gate=প্রস্থান ফটক,taxi stand=ট্যাক্সি স্ট্যান্ড,welcome sign=স্বাগত সাইন,wait here=এখানে অপেক্ষা করুন,customs check=কাস্টমস পরীক্ষা",
  97: "hotel reservation=হোটেল বুকিং,hotel room=হোটেল রুম,book a room=রুম বুক করা,room available=রুম খালি আছে,one night=এক রাত,hotel guest=হোটেলের অতিথি,reception=রিসেপশন,room key=রুমের চাবি,room price=রুমের ভাড়া,confirm the booking=বুকিং নিশ্চিত করা",
  98: "single room=একক রুম,double room=ডাবল রুম,comfortable bed=আরামদায়ক খাট,attached bathroom=সংযুক্ত বাথরুম,air conditioning=এসি,monthly rent=মাসিক ভাড়া,rented apartment=ভাড়া ফ্ল্যাট,third floor=তৃতীয় তলা,room view=রুম থেকে দৃশ্য,small balcony=ছোট বারান্দা",
  99: "hotel checkout=হোটেল চেক আউট,final bill=চূড়ান্ত বিল,room key=রুমের চাবি,reception desk=রিসেপশন, pay the bill=বিল পরিশোধ করা,travel luggage=লাগেজ,thank you for everything=সবকিছুর জন্য ধন্যবাদ,pleasant stay=আনন্দদায়ক অবস্থান,leave the hotel=হোটেল ছেড়ে যাওয়া,payment receipt=পেমেন্ট রসিদ",
  100: "help me=আমাকে সাহায্য করুন,emergency=জরুরি অবস্থা,call an ambulance=অ্যাম্বুলেন্স ডাকুন,police=পুলিশ,fire brigade=ফায়ার সার্ভিস,danger=বিপদ,Call the police!=পুলিশ ডাকুন!,nearest hospital=নিকটতম হাসপাতাল,I need help now=আমার এখনই সাহায্য দরকার,stay calm=শান্ত থাকুন",
  101: "school teacher=স্কুল শিক্ষক,doctor=ডাক্তার,farmer=কৃষক,driver=চালক,cook=রাঁধুনি,tailor=দর্জি,barber=নাপিত,engineer=প্রকৌশলী,writer=লেখক,singer=গায়ক",
  102: "office job=অফিসের চাকরি,monthly salary=মাসিক বেতন,daily work=দৈনন্দিন কাজ,office boss=অফিসের বস,employee=কর্মচারী,small business=ছোট ব্যবসা,retired person=অবসরপ্রাপ্ত ব্যক্তি,unemployed=বেকার,career goal=পেশাগত লক্ষ্য,full-time job=পূর্ণকালীন চাকরি",
  103: "office computer=অফিসের কম্পিউটার,printer=প্রিন্টার,photocopier=ফটোকপিয়ার,scanner=স্ক্যানার,projector=প্রজেক্টর,office telephone=অফিসের টেলিফোন,calculator=ক্যালকুলেটর,office desk=অফিস ডেস্ক,office chair=অফিসের চেয়ার,document file=নথির ফাইল",
  104: "ballpoint pen=বলপয়েন্ট কলম,pencil=পেন্সিল,white paper=সাদা কাগজ,envelope=খাম,stapler=স্ট্যাপলার,exercise notebook=খাতা,file folder=ফাইল ফোল্ডার,scissors=কাঁচি,glue stick=আঠার স্টিক,ruler=স্কেল",
  105: "job application=চাকরির আবেদন,CV=জীবনবৃত্তান্ত,work experience=কাজের অভিজ্ঞতা,qualification=যোগ্যতা,job position=চাকরির পদ,apply online=অনলাইনে আবেদন করা,application form=আবেদন ফর্ম,signature=স্বাক্ষর,referee=সুপারিশকারী,vacant post=শূন্য পদ",
  106: "job interview=চাকরির সাক্ষাৎকার,interview question=সাক্ষাৎকারের প্রশ্ন,your answer=আপনার উত্তর,work experience=কাজের অভিজ্ঞতা,my strength=আমার দক্ষতা,my weakness=আমার দুর্বলতা,confident=আত্মবিশ্বাসী,a little nervous=একটু ঘাবড়ানো,expected salary=প্রত্যাশিত বেতন,thank you for your time=আপনার সময়ের জন্য ধন্যবাদ",
  107: "internet=ইন্টারনেট,website=ওয়েবসাইট,account password=অ্যাকাউন্টের পাসওয়ার্ড,download a file=ফাইল ডাউনলোড করা,upload a photo=ছবি আপলোড করা,search online=অনলাইনে খোঁজা,click the link=লিংকে ক্লিক করা,online class=অনলাইন ক্লাস,wifi connection=ওয়াইফাই সংযোগ,browser=ব্রাউজার",
  108: "browse the web=ওয়েব ব্রাউজ করা,search for information=তথ্য খোঁজা,browser tab=ব্রাউজার ট্যাব,save a bookmark=বুকমার্ক সংরক্ষণ করা,refresh the page=পেজ রিফ্রেশ করা,homepage=হোমপেজ,address bar=ঠিকানার বার,scroll down=নিচে স্ক্রল করা,zoom in=জুম করা,browsing history=ব্রাউজিং ইতিহাস",
  109: "website=ওয়েবসাইট,webpage=ওয়েবপেজ,homepage=হোমপেজ,web link=ওয়েব লিংক,personal blog=ব্যক্তিগত ব্লগ,online news=অনলাইন সংবাদ,video page=ভিডিও পেজ,log in=লগইন করা,sign up=সাইন আপ করা,website menu=ওয়েবসাইট মেনু",
  110: "keyboard=কিবোর্ড,computer mouse=কম্পিউটার মাউস,monitor=মনিটর,computer screen=কম্পিউটারের স্ক্রিন,printer=প্রিন্টার,speaker=স্পিকার,phone charger=ফোন চার্জার,laptop battery=ল্যাপটপের ব্যাটারি,hard drive=হার্ড ড্রাইভ,USB cable=ইউএসবি কেবল",
  111: "email=ইমেইল,email inbox=ইমেইল ইনবক্স,send an email=ইমেইল পাঠানো,reply to an email=ইমেইলের উত্তর দেওয়া,forward an email=ইমেইল ফরোয়ার্ড করা,file attachment=ফাইল সংযুক্তি,email subject=ইমেইলের বিষয়,spam folder=স্প্যাম ফোল্ডার,draft email=খসড়া ইমেইল,delete an email=ইমেইল মুছে ফেলা",
  112: "add to cart=কার্টে যোগ করা,online checkout=অনলাইন চেকআউট,home delivery=হোম ডেলিভারি,price discount=মূল্যছাড়,place an order=অর্ডার করা,online payment=অনলাইন পেমেন্ট,return a product=পণ্য ফেরত দেওয়া,product review=পণ্যের রিভিউ,online seller=অনলাইন বিক্রেতা,track the parcel=পার্সেল ট্র্যাক করা",
  113: "thing=জিনিস,day=দিন,time=সময়,way=উপায়,people=মানুষ,place=জায়গা,home=বাড়ি,drinking water=খাবার পানি,food=খাবার,daily work=দৈনন্দিন কাজ",
  114: "big=বড়,small=ছোট,good=ভালো,bad=খারাপ,easy=সহজ,difficult=কঠিন,fast=দ্রুত,slow=ধীর,brand new=একদম নতুন,very old=অনেক পুরনো",
  115: "hot=গরম,cold=ঠান্ডা,happy=সুখী,sad=দুঃখিত,big=বড়,small=ছোট,day=দিন,night=রাত,open=খোলা,closed=বন্ধ",
  116: "I=আমি,you=তুমি / আপনি,he=সে (ছেলে),she=সে (মেয়ে),we=আমরা,they=তারা,it=এটা,me=আমাকে,him=তাকে (ছেলে),her=তাকে (মেয়ে)",
  117: "my=আমার,your=তোমার / আপনার,his=তার (ছেলে),her (possessive)=তার (মেয়ে),our=আমাদের,their=তাদের,its=এর,mine=আমারটি,yours=তোমারটি,ours=আমাদেরটি",
  118: "what=কী,where=কোথায়,when=কখন,who=কে,why=কেন,how=কীভাবে,which=কোনটি,whose=কার,how many=কতগুলো,how much=কত",
  119: "someone=কেউ,anyone=যেকেউ,everyone=সবাই,something=কিছু,nothing=কিছুই না,and=এবং,but=কিন্তু,or=অথবা,because=কারণ,also=এছাড়াও",
  120: "in the box=বাক্সের ভিতরে,on the table=টেবিলের উপরে,at home=বাড়িতে,under the bed=খাটের নিচে,behind the door=দরজার পেছনে,between the chairs=চেয়ারগুলোর মাঝখানে,in front of the house=বাড়ির সামনে,next to me=আমার পাশে,near the school=স্কুলের কাছে,with my friend=আমার বন্ধুর সঙ্গে",
  121: "of my book=আমার বইয়ের,to the market=বাজারের দিকে,for my mother=আমার মায়ের জন্য,from Dhaka=ঢাকা থেকে,about the lesson=পাঠ সম্পর্কে,over the river=নদীর উপর দিয়ে,through the forest=বনের মধ্য দিয়ে,before lunch=দুপুরের খাবারের আগে,after school=স্কুলের পরে,during the class=ক্লাস চলাকালে",
  122: "and=এবং,but=কিন্তু,or=অথবা,so=তাই,because=কারণ,if=যদি,when=যখন,while=যখন,although=যদিও,then=তারপর",
  123: "I want a pen=আমি একটি কলম চাই,I don't want tea=আমি চা চাই না,I need help=আমার সাহায্য প্রয়োজন,I wish to travel=আমি ভ্রমণ করতে চাই,I hope to pass=আমি পাস করার আশা করি,I choose the red one=আমি লালটা বেছে নিই,I prefer rice=আমি ভাত বেশি পছন্দ করি,I want to learn English=আমি ইংরেজি শিখতে চাই,give me water=আমাকে পানি দিন,take this book=এই বইটি নিন",
  124: "I like mangoes=আমি আম পছন্দ করি,I love my family=আমি আমার পরিবারকে ভালোবাসি,I enjoy reading=আমি পড়তে উপভোগ করি,I hate lies=আমি মিথ্যা ঘৃণা করি,I dislike noise=আমি শব্দদূষণ অপছন্দ করি,my favourite colour=আমার প্রিয় রং,I prefer tea=আমি চা বেশি পছন্দ করি,fun=মজা,boring lesson=একঘেয়ে পাঠ,interesting story=আকর্ষণীয় গল্প",
  125: "I need water=আমার পানি প্রয়োজন,I don't need help=আমার সাহায্য প্রয়োজন নেই,I must study=আমাকে অবশ্যই পড়তে হবে,important work=গুরুত্বপূর্ণ কাজ,necessary documents=প্রয়োজনীয় কাগজপত্র,I need rest=আমার বিশ্রাম প্রয়োজন,I need to sleep early=আমাকে তাড়াতাড়ি ঘুমাতে হবে,I need a pen=আমার একটি কলম প্রয়োজন,I don't need this bag=আমার এই ব্যাগ প্রয়োজন নেই,I need to call my friend=আমাকে আমার বন্ধুকে ফোন করতে হবে",
});

// Part-of-speech overrides for common function words; everything else is
// classified by a documented heuristic in posOf().
const POS_OVERRIDES: Record<string, string> = {
  i: "pronoun", you: "pronoun", he: "pronoun", she: "pronoun", we: "pronoun",
  they: "pronoun", it: "pronoun", me: "pronoun", him: "pronoun", her: "pronoun",
  my: "possessive pronoun", your: "possessive pronoun", his: "possessive pronoun",
  our: "possessive pronoun", their: "possessive pronoun", its: "possessive pronoun",
  mine: "possessive pronoun", yours: "possessive pronoun", ours: "possessive pronoun",
  what: "question word", where: "question word", when: "question word",
  who: "question word", why: "question word", how: "question word",
  which: "question word", whose: "question word",
  someone: "pronoun", anyone: "pronoun", everyone: "pronoun",
  something: "pronoun", nothing: "pronoun",
  and: "conjunction", but: "conjunction", or: "conjunction", so: "conjunction",
  because: "conjunction", if: "conjunction", although: "conjunction", also: "adverb",
  please: "expression", sorry: "expression",
};

const VERB_HINTS = new Set([
  "meet", "introduce", "celebrate", "help", "share", "forgive", "count", "buy",
  "sell", "choose", "bargain", "afford", "cost", "remember", "forget", "swim",
  "dive", "float", "feed", "visit", "trust", "grow", "bake", "cook", "wash",
  "cut", "peel", "boil", "fry", "mix", "add", "stir", "taste", "pay", "apply",
  "search", "click", "browse", "scroll", "zoom", "send", "reply", "forward",
  "delete", "track", "return", "declare", "book", "confirm", "relax", "surf",
  "snorkel", "sunbathe", "play", "build", "collect", "fly", "go", "turn",
  "cross", "take", "give", "want", "need", "wish", "hope", "prefer", "like",
  "love", "enjoy", "hate", "dislike", "must", "declare goods",
]);

const ADJ_HINTS = new Set([
  "kind", "grateful", "polite", "happy", "sad", "angry", "afraid", "excited",
  "tired", "hungry", "surprised", "worried", "calm", "hot", "cold", "deep",
  "shallow", "loyal", "helpful", "married", "single", "engaged", "warm",
  "comfortable", "soft", "cheap", "expensive", "fresh", "delicious", "tasty",
  "sour", "bitter", "salty", "sweet", "spicy", "bland", "yummy", "sick",
  "dizzy", "near", "far", "early", "late", "big", "small", "good", "bad",
  "easy", "difficult", "fast", "slow", "new", "old", "open", "closed",
  "important", "necessary", "interesting", "boring", "safe", "available",
]);

function posOf(en: string): string {
  const lower = en.toLowerCase().replace(/[?.!]/g, "").trim();
  const override = POS_OVERRIDES[lower];
  if (override) return override;
  if (/^(i |i'|what|where|how|excuse|nice|my name|thank|keep|call|go |turn |cross )/.test(lower) || en.includes(" ") && /\?$/.test(en))
    return "sentence";
  if (en.trim().endsWith("?") || /^(I |My |What|Where|How|Excuse|Nice|Thank|Keep|Call)/.test(en))
    return "sentence";
  if (VERB_HINTS.has(lower)) return "verb";
  if (ADJ_HINTS.has(lower)) return "adjective";
  if (lower.endsWith("ly")) return "adverb";
  if (lower.endsWith("ing") && en.includes(" ")) return "phrase";
  if (en.includes(" ") && lower.split(" ").length >= 3) return "phrase";
  if (en.includes(" ")) return "phrase";
  return "noun";
}

function typeOf(en: string, pos: string): EntryType {
  if (pos === "sentence") return "sentence";
  if (pos === "phrase") return "phrase";
  if (en.includes(" ") && !/^[A-Z][a-z]+$/.test(en)) return "phrase";
  return "word";
}

// Sense-matched synonyms / antonyms with their own Bengali meanings.
// Keys are lowercase English headwords. Only linguistically valid pairs are
// listed; entries without a true opposite get an explanatory note instead.
const RELS: Record<string, { syn?: [string, string][]; ant?: [string, string][]; alt?: [string, string][] }> = {
  hello: { alt: [["Hi", "হাই"], ["Good morning", "শুভ সকাল"]] },
  "thank you": { alt: [["Thanks a lot", "অনেক ধন্যবাদ"]] },
  "nice to meet you": { alt: [["Pleased to meet you", "আপনার সঙ্গে পরিচিত হয়ে আনন্দিত"]] },
  kind: { syn: [["gentle", "কোমল"], ["caring", "যত্নশীল"]], ant: [["unkind", "নির্দয়"], ["cruel", "নিষ্ঠুর"]] },
  happy: { syn: [["joyful", "আনন্দিত"], ["cheerful", "হাসিখুশি"], ["glad", "খুশি"]], ant: [["sad", "দুঃখিত"], ["unhappy", "অসুখী"]] },
  sad: { syn: [["unhappy", "অসুখী"], ["sorrowful", "বিষণ্ণ"]], ant: [["happy", "সুখী"], ["cheerful", "হাসিখুশি"]] },
  angry: { syn: [["annoyed", "বিরক্ত"], ["furious", "প্রচণ্ড রাগী"]], ant: [["calm", "শান্ত"], ["pleased", "সন্তুষ্ট"]] },
  afraid: { syn: [["scared", "ভীত"], ["frightened", "আতঙ্কিত"]], ant: [["brave", "সাহসী"]] },
  excited: { syn: [["thrilled", "রোমাঞ্চিত"], ["eager", "আগ্রহী"]], ant: [["bored", "একঘেয়ে বোধ করা"]] },
  tired: { syn: [["sleepy", "ঘুমঘুম"], ["exhausted", "অবসন্ন"]], ant: [["energetic", "প্রাণবন্ত"], ["fresh", "সতেজ"]] },
  hungry: { syn: [["starving", "খুব ক্ষুধার্ত"]], ant: [["full", "পেট ভরা"]] },
  surprised: { syn: [["amazed", "বিস্মিত"], ["astonished", "হতবাক"]], ant: [] },
  worried: { syn: [["anxious", "উদ্বিগ্ন"], ["concerned", "চিন্তিত"]], ant: [["relaxed", "নিশ্চিন্ত"]] },
  calm: { syn: [["peaceful", "শান্তিপূর্ণ"], ["relaxed", "নিশ্চিন্ত"]], ant: [["angry", "রাগী"], ["worried", "চিন্তিত"]] },
  hot: { syn: [["warm", "উষ্ণ"]], ant: [["cold", "ঠান্ডা"]] },
  cold: { syn: [["chilly", "শীতল"], ["cool", "ঠান্ডা ঠান্ডা"]], ant: [["hot", "গরম"], ["warm", "উষ্ণ"]] },
  big: { syn: [["large", "বড়"], ["huge", "বিশাল"]], ant: [["small", "ছোট"], ["tiny", "খুব ছোট"]] },
  small: { syn: [["little", "ছোট"], ["tiny", "খুদে"]], ant: [["big", "বড়"], ["large", "বড়"]] },
  good: { syn: [["nice", "ভালো"], ["great", "চমৎকার"]], ant: [["bad", "খারাপ"]] },
  bad: { syn: [["poor", "খারাপ"], ["awful", "ভয়ানক"]], ant: [["good", "ভালো"], ["excellent", "চমৎকার"]] },
  easy: { syn: [["simple", "সহজ"]], ant: [["difficult", "কঠিন"], ["hard", "কঠিন"]] },
  difficult: { syn: [["hard", "কঠিন"], ["tough", "শক্ত"]], ant: [["easy", "সহজ"], ["simple", "সহজ"]] },
  fast: { syn: [["quick", "দ্রুত"], ["rapid", "দ্রুতগতি"]], ant: [["slow", "ধীর"]] },
  slow: { syn: [["unhurried", "ধীরস্থির"]], ant: [["fast", "দ্রুত"], ["quick", "দ্রুত"]] },
  cheap: { syn: [["inexpensive", "স্বল্পমূল্যের"], ["low-cost", "কম দামি"]], ant: [["expensive", "দামি"], ["costly", "ব্যয়বহুল"]] },
  expensive: { syn: [["costly", "ব্যয়বহুল"], ["pricey", "দামি"]], ant: [["cheap", "সস্তা"], ["inexpensive", "স্বল্পমূল্যের"]] },
  fresh: { syn: [["new", "নতুন"], ["freshly made", "সদ্য তৈরি"]], ant: [["stale", "বাসি"], ["rotten", "পচা"]] },
  delicious: { syn: [["tasty", "সুস্বাদু"], ["yummy", "মজাদার"]], ant: [["bland", "স্বাদহীন"]] },
  tasty: { syn: [["delicious", "সুস্বাদু"], ["flavourful", "স্বাদে ভরপুর"]], ant: [["bland", "স্বাদহীন"]] },
  sweet: { syn: [["sugary", "চিনিময়"]], ant: [["sour", "টক"], ["bitter", "তিতা"]] },
  sour: { syn: [["tangy", "ঝাঁঝালো টক"]], ant: [["sweet", "মিষ্টি"]] },
  bitter: { syn: [["sharp-tasting", "কড়া স্বাদের"]], ant: [["sweet", "মিষ্টি"]] },
  salty: { syn: [["salted", "লবণ দেওয়া"]], ant: [["bland", "লবণহীন"]] },
  spicy: { syn: [["hot", "ঝাল"], ["fiery", "খুব ঝাল"]], ant: [["mild", "হালকা ঝাল"]] },
  bland: { syn: [["tasteless", "স্বাদহীন"], ["plain", "সাদামাটা"]], ant: [["tasty", "সুস্বাদু"], ["spicy", "ঝাল"]] },
  deep: { syn: [["bottomless", "অতল"]], ant: [["shallow", "অগভীর"]] },
  shallow: { syn: [["not deep", "গভীর নয়"]], ant: [["deep", "গভীর"]] },
  near: { syn: [["close", "কাছে"]], ant: [["far", "দূরে"]] },
  far: { syn: [["distant", "দূরবর্তী"]], ant: [["near", "কাছে"], ["close", "কাছে"]] },
  early: { syn: [["before time", "সময়ের আগে"]], ant: [["late", "দেরি"]] },
  late: { syn: [["delayed", "বিলম্বিত"]], ant: [["early", "তাড়াতাড়ি"], ["on time", "সময়মতো"]] },
  sick: { syn: [["ill", "অসুস্থ"], ["unwell", "অসুস্থ"]], ant: [["healthy", "সুস্থ"], ["well", "সুস্থ"]] },
  open: { syn: [["unlocked", "খোলা"]], ant: [["closed", "বন্ধ"], ["shut", "বন্ধ"]] },
  closed: { syn: [["shut", "বন্ধ"]], ant: [["open", "খোলা"]] },
  day: { ant: [["night", "রাত"]] },
  night: { ant: [["day", "দিন"]] },
  new: { syn: [["fresh", "নতুন"], ["brand new", "একদম নতুন"]], ant: [["old", "পুরনো"]] },
  old: { syn: [["ancient", "প্রাচীন"]], ant: [["new", "নতুন"], ["young", "তরুণ"]] },
  help: { syn: [["assist", "সহায়তা করা"], ["support", "সমর্থন করা"]], ant: [["hinder", "বাধা দেওয়া"]] },
  buy: { syn: [["purchase", "ক্রয় করা"]], ant: [["sell", "বিক্রি করা"]] },
  sell: { syn: [["offer for sale", "বিক্রির জন্য দেওয়া"]], ant: [["buy", "কেনা"]] },
  friend: { syn: [["companion", "সঙ্গী"], ["mate", "বন্ধু"]], ant: [["enemy", "শত্রু"]] },
  love: { syn: [["adore", "গভীরভাবে ভালোবাসা"]], ant: [["hate", "ঘৃণা করা"]] },
  hate: { syn: [["dislike strongly", "প্রচণ্ড অপছন্দ করা"]], ant: [["love", "ভালোবাসা"]] },
  like: { syn: [["enjoy", "উপভোগ করা"], ["be fond of", "পছন্দ করা"]], ant: [["dislike", "অপছন্দ করা"], ["hate", "ঘৃণা করা"]] },
  remember: { syn: [["recall", "স্মরণ করা"]], ant: [["forget", "ভুলে যাওয়া"]] },
  forget: { syn: [["not remember", "মনে না থাকা"]], ant: [["remember", "মনে রাখা"]] },
  need: { syn: [["require", "প্রয়োজন হওয়া"]], ant: [] },
  want: { syn: [["wish for", "চাওয়া"], ["desire", "আকাঙ্ক্ষা করা"]] },
  warm: { syn: [["cosy", "আরামদায়ক উষ্ণ"]], ant: [["cool", "শীতল"], ["cold", "ঠান্ডা"]] },
  comfortable: { syn: [["cosy", "আরামদায়ক"], ["relaxing", "আরামদায়ক"]], ant: [["uncomfortable", "অস্বস্তিকর"]] },
  safe: { syn: [["secure", "নিরাপদ"], ["protected", "সুরক্ষিত"]], ant: [["dangerous", "বিপজ্জনক"]] },
  healthy: { syn: [["fit", "সুস্থ"], ["well", "ভালো"]], ant: [["sick", "অসুস্থ"], ["unhealthy", "অস্বাস্থ্যকর"]] },
  important: { syn: [["essential", "অপরিহার্য"], ["significant", "গুরুত্বপূর্ণ"]], ant: [["unimportant", "গুরুত্বহীন"]] },
  interesting: { syn: [["fascinating", "মুগ্ধকর"], ["engaging", "মনোযোগ আকর্ষণকারী"]], ant: [["boring", "একঘেয়ে"], ["dull", "নিরস"]] },
  boring: { syn: [["dull", "নিরস"], ["tedious", "একঘেয়ে"]], ant: [["interesting", "আকর্ষণীয়"], ["exciting", "রোমাঞ্চকর"]] },
  beautiful: { syn: [["lovely", "সুন্দর"], ["pretty", "মিষ্টি দেখতে"]], ant: [["ugly", "কুৎসিত"]] },
  grateful: { syn: [["thankful", "কৃতজ্ঞ"], ["appreciative", "কৃতজ্ঞতাপূর্ণ"]], ant: [["ungrateful", "অকৃতজ্ঞ"]] },
  polite: { syn: [["courteous", "শিষ্ট"], ["well-mannered", "ভদ্র আচরণসম্পন্ন"]], ant: [["rude", "অভদ্র"], ["impolite", "অশিষ্ট"]] },
  necessary: { syn: [["needed", "প্রয়োজনীয়"], ["essential", "অপরিহার্য"]], ant: [["unnecessary", "অপ্রয়োজনীয়"]] },
  emergency: { syn: [["crisis", "সংকট"], ["urgent situation", "জরুরি পরিস্থিতি"]] },
  danger: { syn: [["risk", "ঝুঁকি"], ["peril", "বিপদ"]], ant: [["safety", "নিরাপত্তা"]] },
};

// Hand-authored relations for the rest of the curriculum, merged with RELS
// above in buildEntry (RELS wins per field). Only genuine synonyms,
// near-synonyms, natural alternative expressions and true opposites are
// listed — concrete nouns with no real synonym (tiger, mango, pencil) are
// deliberately absent rather than given invented relations.
const RELS_EXTRA: Record<string, { syn?: [string, string][]; ant?: [string, string][]; alt?: [string, string][] }> = {
  hello: { ant: [["goodbye", "বিদায়"]] },
  meet: { syn: [["see", "দেখা করা"], ["get together", "একত্র হওয়া"]] },
  introduce: { syn: [["present", "পরিচয় করিয়ে দেওয়া"]] },
  welcome: { syn: [["greet", "অভ্যর্থনা জানানো"]] },
  goodbye: { syn: [["bye", "বিদায়"]], ant: [["hello", "হ্যালো"]] },
  please: { alt: [["kindly", "অনুগ্রহ করে"]] },
  "you are welcome": { alt: [["My pleasure", "আমার সৌভাগ্য"], ["No problem", "কোনো সমস্যা নেই"]] },
  sorry: { alt: [["I apologise", "আমি ক্ষমা চাই"], ["Forgive me", "আমাকে ক্ষমা করুন"]] },
  "excuse me": { alt: [["Pardon me", "মাফ করবেন"]] },
  "no problem": { alt: [["That's fine", "ঠিক আছে"], ["No worries", "চিন্তা নেই"]] },
  "after you": { alt: [["Please go first", "অনুগ্রহ করে আপনি আগে যান"]] },
  "thanks a lot": { alt: [["Thank you very much", "আপনাকে অনেক ধন্যবাদ"]] },
  "what is your name?": { alt: [["May I know your name?", "আমি কি আপনার নাম জানতে পারি?"]] },
  "my name is rafi": { alt: [["I am Rafi", "আমি রাফি"]] },
  party: { syn: [["celebration", "উদযাপন অনুষ্ঠান"]] },
  celebrate: { syn: [["observe", "পালন করা"], ["mark", "উদযাপন করা"]] },
  gift: { syn: [["present", "উপহার"]] },
  dance: { syn: [["dancing", "নৃত্য"]] },
  invitation: { syn: [["invite", "আমন্ত্রণ"]] },
  congratulations: { alt: [["Well done!", "সাবাশ!"], ["Best wishes", "শুভকামনা"]] },
  peace: { syn: [["tranquillity", "প্রশান্তি"]], ant: [["war", "যুদ্ধ"], ["conflict", "সংঘাত"]] },
  kindness: { syn: [["compassion", "মমতা"], ["generosity", "উদারতা"]], ant: [["cruelty", "নিষ্ঠুরতা"]] },
  share: { ant: [["keep everything", "সব নিজের কাছে রাখা"]] },
  forgive: { syn: [["pardon", "ক্ষমা করা"]], ant: [["punish", "শাস্তি দেওয়া"]] },
  smile: { syn: [["grin", "মৃদু হাসি"]], ant: [["frown", "ভ্রূকুটি"]] },
  gentle: { syn: [["mild", "মৃদু"], ["tender", "কোমল"]], ant: [["rough", "রুক্ষ"], ["harsh", "কঠোর"]] },
  care: { syn: [["attention", "মনোযোগ"]], ant: [["neglect", "অবহেলা"]] },
  many: { syn: [["a lot of", "অনেক"]], ant: [["few", "কয়েকটি"]] },
  count: { syn: [["calculate", "হিসাব করা"]] },
  number: { syn: [["figure", "অঙ্ক"]] },
  amount: { syn: [["quantity", "পরিমাণ"]] },
  total: { syn: [["sum", "যোগফল"]] },
  "how many?": { alt: [["How many are there?", "কয়টি আছে?"]] },
  "how much?": { alt: [["How much does it cost?", "এটার দাম কত?"]] },
  "large number": { syn: [["big number", "বড় সংখ্যা"]], ant: [["small number", "ছোট সংখ্যা"]] },
  price: { syn: [["cost", "দাম"]] },
  notebook: { syn: [["exercise book", "খাতা"]] },
  "school bag": { syn: [["backpack", "পিঠের ব্যাগ"]] },
  ruler: { alt: [["scale", "স্কেল"]] },
  eraser: { syn: [["rubber", "রাবার"]] },
  crayon: { alt: [["colour pencil", "রঙ পেন্সিল"]] },
  classroom: { alt: [["class", "ক্লাস"]] },
  teacher: { syn: [["instructor", "প্রশিক্ষক"], ["educator", "শিক্ষাবিদ"]] },
  student: { syn: [["learner", "শিক্ষার্থী"], ["pupil", "ছাত্র"]] },
  chair: { syn: [["seat", "আসন"]] },
  lesson: { syn: [["chapter", "অধ্যায়"]] },
  question: { syn: [["query", "জিজ্ঞাসা"]], ant: [["answer", "উত্তর"]] },
  mathematics: { alt: [["maths", "গণিত"]] },
  art: { syn: [["fine arts", "চারুকলা"]] },
  religion: { syn: [["faith", "ধর্মবিশ্বাস"]] },
  subject: { syn: [["topic", "প্রসঙ্গ"]] },
  country: { syn: [["nation", "জাতি"], ["land", "ভূমি"]] },
  city: { syn: [["town", "শহর"]], ant: [["village", "গ্রাম"]] },
  village: { ant: [["city", "শহর"], ["town", "শহর"]] },
  river: { syn: [["stream", "ছোট নদী"]] },
  mountain: { syn: [["hill", "ছোট পাহাড়"]] },
  sea: { syn: [["ocean", "মহাসাগর"]] },
  forest: { syn: [["jungle", "জঙ্গল"], ["woodland", "বনভূমি"]] },
  space: { syn: [["universe", "মহাবিশ্ব"]] },
  summer: { ant: [["winter", "শীতকাল"]] },
  winter: { ant: [["summer", "গ্রীষ্মকাল"]] },
  autumn: { ant: [["spring", "বসন্তকাল"]] },
  spring: { ant: [["autumn", "শরৎকাল"]] },
  rain: { syn: [["rainfall", "বৃষ্টিপাত"], ["shower", "ঝিরঝিরে বৃষ্টি"]] },
  wind: { syn: [["breeze", "মৃদু বাতাস"]] },
  football: { alt: [["soccer", "সকার"]] },
  running: { syn: [["jogging", "ধীরে দৌড়"]] },
  cycling: { alt: [["biking", "বাইক চালানো"]] },
  player: { syn: [["athlete", "ক্রীড়াবিদ"]] },
  team: { syn: [["side", "পক্ষ"], ["group", "দল"]] },
  painting: { syn: [["drawing", "ছবি আঁকা"]] },
  walking: { syn: [["strolling", "হেঁটে বেড়ানো"]] },
  hobby: { syn: [["pastime", "অবসর বিনোদন"], ["interest", "আগ্রহ"]] },
  song: { syn: [["melody", "সুর"]] },
  dive: { ant: [["float", "ভাসা"]] },
  float: { ant: [["sink", "ডুবে যাওয়া"], ["dive", "ডুব দেওয়া"]] },
  beach: { syn: [["seashore", "সমুদ্রতীর"], ["coast", "উপকূল"]] },
  boat: { syn: [["vessel", "নৌযান"]] },
  "build a sandcastle": { alt: [["make a sandcastle", "বালির দুর্গ তৈরি করা"]] },
  "collect shells": { alt: [["gather shells", "ঝিনুক কুড়ানো"]] },
  sunbathe: { syn: [["lie in the sun", "রোদে শুয়ে থাকা"]] },
  relax: { syn: [["rest", "বিশ্রাম নেওয়া"], ["unwind", "আরাম করা"]] },
  shade: { syn: [["shadow", "ছায়া"]], ant: [["sunlight", "রোদ"]] },
  cage: { syn: [["enclosure", "ঘেরা জায়গা"]] },
  visit: { syn: [["go to see", "দেখতে যাওয়া"]] },
  animal: { syn: [["creature", "প্রাণী"]] },
  "take a photo": { alt: [["take a picture", "ছবি তোলা"]] },
  entrance: { syn: [["entry", "প্রবেশ"]], ant: [["exit", "প্রস্থান"]] },
  father: { alt: [["dad", "বাবা"]] },
  mother: { alt: [["mum", "মা"]] },
  grandfather: { alt: [["grandpa", "দাদা"]] },
  grandmother: { alt: [["grandma", "দাদি"]] },
  baby: { syn: [["infant", "শিশু"]] },
  husband: { ant: [["wife", "স্ত্রী"]] },
  wife: { ant: [["husband", "স্বামী"]] },
  "best friend": { syn: [["closest friend", "সবচেয়ে ঘনিষ্ঠ বন্ধু"]] },
  classmate: { syn: [["schoolmate", "স্কুলের সঙ্গী"]] },
  trust: { syn: [["believe", "বিশ্বাস করা"], ["rely on", "নির্ভর করা"]], ant: [["doubt", "সন্দেহ করা"], ["distrust", "অবিশ্বাস করা"]] },
  loyal: { syn: [["faithful", "বিশ্বস্ত"]], ant: [["disloyal", "অবিশ্বস্ত"]] },
  helpful: { syn: [["supportive", "সহায়ক"]], ant: [["unhelpful", "অসহায়ক"]] },
  married: { ant: [["single", "অবিবাহিত"], ["unmarried", "অবিবাহিত"]] },
  single: { ant: [["married", "বিবাহিত"]] },
  engaged: { syn: [["betrothed", "বাগদত্ত"]] },
  wedding: { syn: [["marriage ceremony", "বিয়ের অনুষ্ঠান"]] },
  couple: { syn: [["pair", "জুটি"]] },
  relative: { syn: [["family member", "পরিবারের সদস্য"]] },
  ancestor: { syn: [["forefather", "পূর্বপুরুষ"]], ant: [["descendant", "বংশধর"]] },
  "grow up": { syn: [["become an adult", "প্রাপ্তবয়স্ক হওয়া"]] },
  dress: { syn: [["outfit", "পোশাক"]] },
  jacket: { syn: [["coat", "কোট"]] },
  coat: { syn: [["jacket", "জ্যাকেট"]] },
  sweater: { alt: [["jumper", "সোয়েটার"]] },
  vest: { syn: [["undershirt", "আন্ডারশার্ট"]] },
  pajamas: { syn: [["nightclothes", "রাতের পোশাক"]] },
  diaper: { alt: [["nappy", "ডায়াপার"]] },
  toy: { syn: [["plaything", "খেলনা"]] },
  crib: { syn: [["cot", "শিশুর খাট"]] },
  bangle: { syn: [["bracelet", "ব্রেসলেট"]] },
  sunglasses: { alt: [["shades", "সানগ্লাস"]] },
  wristwatch: { syn: [["watch", "ঘড়ি"]] },
  wallet: { syn: [["purse", "মানিব্যাগ"]] },
  cap: { syn: [["hat", "টুপি"]] },
  perfume: { syn: [["fragrance", "সুগন্ধি"]] },
  "living room": { alt: [["sitting room", "বসার ঘর"]] },
  yard: { syn: [["courtyard", "উঠান"]] },
  sofa: { syn: [["couch", "সোফা"]] },
  wardrobe: { syn: [["cupboard", "আলমারি"]] },
  lamp: { syn: [["light", "বাতি"]] },
  fridge: { alt: [["refrigerator", "ফ্রিজ"]] },
  cup: { syn: [["mug", "মগ"]] },
  market: { syn: [["bazaar", "বাজার"]] },
  road: { syn: [["street", "রাস্তা"]] },
  footpath: { alt: [["pavement", "ফুটপাত"], ["sidewalk", "ফুটপাত"]] },
  dustbin: { syn: [["trash bin", "ময়লার বিন"]] },
  shop: { syn: [["store", "দোকান"]] },
  money: { syn: [["cash", "নগদ টাকা"]] },
  customer: { syn: [["buyer", "ক্রেতা"]] },
  shopkeeper: { syn: [["seller", "বিক্রেতা"]] },
  bill: { syn: [["invoice", "চালান"]] },
  "go shopping": { alt: [["do the shopping", "কেনাকাটা করা"]] },
  size: { syn: [["measurement", "মাপ"]] },
  "fitting room": { alt: [["changing room", "পোশাক বদলের ঘর"]] },
  "too big": { ant: [["too small", "অনেক ছোট"]] },
  "too small": { ant: [["too big", "অনেক বড়"]] },
  colour: { alt: [["color", "রং"]] },
  style: { syn: [["fashion", "ফ্যাশন"]] },
  discount: { syn: [["price cut", "মূল্যছাড়"]] },
  "look good": { alt: [["look nice", "ভালো দেখানো"]] },
  choose: { syn: [["pick", "বেছে নেওয়া"], ["select", "নির্বাচন করা"]], ant: [["reject", "প্রত্যাখ্যান করা"]] },
  bargain: { syn: [["negotiate", "দরদাম করা"]] },
  "last price": { syn: [["final price", "চূড়ান্ত দাম"]] },
  cost: { syn: [["be priced", "দাম হওয়া"]] },
  weekly: { syn: [["every week", "প্রতি সপ্তাহ"]] },
  item: { syn: [["product", "পণ্য"], ["thing", "জিনিস"]] },
  "tick off": { syn: [["mark off", "টিক চিহ্ন দেওয়া"]] },
  yogurt: { syn: [["curd", "দই"]] },
  curd: { syn: [["yogurt", "দই"]] },
  fat: { syn: [["grease", "চর্বি"]] },
  "one kilo": { alt: [["one kilogram", "এক কিলোগ্রাম"]] },
  shrimp: { syn: [["prawn", "চিংড়ি"]] },
  "bread loaf": { syn: [["loaf of bread", "পাউরুটি"]] },
  biscuits: { alt: [["cookies", "কুকিজ"]] },
  bake: { syn: [["cook in an oven", "ওভেনে রান্না করা"]] },
  lemonade: { syn: [["lemon drink", "লেবুর পানীয়"]] },
  "soft drink": { syn: [["soda", "সোডা"]] },
  waiter: { syn: [["server", "পরিবেশনকারী"]] },
  "place an order": { alt: [["order food", "খাবার অর্ডার করা"]] },
  "book a table": { alt: [["reserve a table", "টেবিল রিজার্ভ করা"]] },
  tip: { syn: [["gratuity", "বকশিশ"]] },
  appetizer: { syn: [["starter", "শুরুর খাবার"]] },
  "main course": { syn: [["main dish", "প্রধান পদ"]] },
  dessert: { syn: [["sweet dish", "মিষ্টি পদ"]] },
  "sweet dish": { syn: [["dessert", "মিষ্টান্ন"]] },
  cut: { syn: [["slice", "টুকরো করে কাটা"]] },
  peel: { syn: [["remove the skin", "খোসা ছাড়ানো"]] },
  boil: { syn: [["cook in water", "পানিতে সিদ্ধ করা"]] },
  fry: { syn: [["cook in oil", "তেলে রান্না করা"]] },
  mix: { syn: [["combine", "মেশানো"]], ant: [["separate", "আলাদা করা"]] },
  stir: { syn: [["mix", "নাড়া"]] },
  cook: { syn: [["prepare food", "খাবার তৈরি করা"]] },
  "taste the food": { alt: [["try the food", "খাবারের স্বাদ দেখা"]] },
  "halal food": { ant: [["non-halal food", "অ-হালাল খাবার"]] },
  "less spicy": { ant: [["more spicy", "বেশি ঝাল"]] },
  "sugar-free": { ant: [["with sugar", "চিনিযুক্ত"]] },
  "allergic to nuts": { alt: [["have a nut allergy", "বাদামে অ্যালার্জি আছে"]] },
  "i cannot eat nuts": { alt: [["I must not eat nuts", "আমাকে বাদাম খাওয়া যাবে না"]] },
  "no onion please": { alt: [["Please do not add onion", "অনুগ্রহ করে পেঁয়াজ দেবেন না"]] },
  cash: { syn: [["notes and coins", "নোট ও কয়েন"]] },
  "bank card": { syn: [["debit card", "ডেবিট কার্ড"]] },
  change: { syn: [["coins", "খুচরা টাকা"]] },
  receipt: { syn: [["bill slip", "রসিদ"]] },
  "total amount": { syn: [["full amount", "মোট পরিমাণ"]] },
  "pay the bill": { alt: [["settle the bill", "বিল মিটিয়ে দেওয়া"]] },
  "keep the change": { alt: [["You can keep the change", "ভাংতিটা রেখে দিন"]] },
};

// Digit forms for number entries (an alternative written form, shown as an
// alternative expression — not a synonym).
const NUMFORM: Record<string, [string, string]> = {
  one: ["1", "১"], two: ["2", "২"], three: ["3", "৩"], four: ["4", "৪"], five: ["5", "৫"],
  six: ["6", "৬"], seven: ["7", "৭"], eight: ["8", "৮"], nine: ["9", "৯"], ten: ["10", "১০"],
  eleven: ["11", "১১"], twelve: ["12", "১২"], thirteen: ["13", "১৩"], fourteen: ["14", "১৪"],
  fifteen: ["15", "১৫"], sixteen: ["16", "১৬"], seventeen: ["17", "১৭"], eighteen: ["18", "১৮"],
  nineteen: ["19", "১৯"], twenty: ["20", "২০"], "twenty-one": ["21", "২১"], "twenty-two": ["22", "২২"],
  "twenty-three": ["23", "২৩"], "twenty-four": ["24", "২৪"], "twenty-five": ["25", "২৫"],
  "twenty-six": ["26", "২৬"], "twenty-seven": ["27", "২৭"], "twenty-eight": ["28", "২৮"],
  "twenty-nine": ["29", "২৯"], thirty: ["30", "৩০"], forty: ["40", "৪০"], fifty: ["50", "৫০"],
  sixty: ["60", "৬০"], seventy: ["70", "৭০"], eighty: ["80", "৮০"], ninety: ["90", "৯০"],
  "one hundred": ["100", "১০০"], "two hundred": ["200", "২০০"], "three hundred": ["300", "৩০০"],
  "five hundred": ["500", "৫০০"], "one thousand": ["1,000", "১,০০০"], "two thousand": ["2,000", "২,০০০"],
  "five thousand": ["5,000", "৫,০০০"], "ten thousand": ["10,000", "১০,০০০"],
  "one kilo": ["1 kg", "১ কেজি"], "one hour": ["1 hour = 60 minutes", "১ ঘণ্টা = ৬০ মিনিট"],
  "one minute": ["1 minute = 60 seconds", "১ মিনিট = ৬০ সেকেন্ড"],
  "three o'clock": ["3:00", "৩:০০"],
};

Object.assign(RELS_EXTRA, {
  car: { syn: [["automobile", "গাড়ি"]] },
  bicycle: { syn: [["bike", "সাইকেল"]] },
  airplane: { syn: [["plane", "বিমান"]] },
  taxi: { syn: [["cab", "ট্যাক্সি"]] },
  motorbike: { syn: [["motorcycle", "মোটরসাইকেল"]] },
  left: { ant: [["right", "ডানে"]] },
  right: { ant: [["left", "বামে"]] },
  "straight ahead": { syn: [["directly ahead", "সোজা সামনে"]] },
  north: { ant: [["south", "দক্ষিণ"]] },
  south: { ant: [["north", "উত্তর"]] },
  east: { ant: [["west", "পশ্চিম"]] },
  west: { ant: [["east", "পূর্ব"]] },
  "far away": { syn: [["distant", "দূরবর্তী"]], ant: [["nearby", "কাছাকাছি"]] },
  direction: { syn: [["way", "পথ"]] },
  "excuse me — where is the station?": { alt: [["Where is the station, please?", "স্টেশনটা কোথায়, অনুগ্রহ করে?"]] },
  "how can i go to the market?": { alt: [["How do I get to the market?", "আমি কীভাবে বাজারে পৌঁছাব?"]] },
  "i am lost": { alt: [["I have lost my way", "আমি পথ হারিয়েছি"]] },
  "street map": { syn: [["road map", "রাস্তার মানচিত্র"]] },
  nearby: { syn: [["close by", "কাছাকাছি"]], ant: [["far away", "অনেক দূরে"]] },
  "please help me": { alt: [["Please help", "অনুগ্রহ করে সাহায্য করুন"]] },
  "thank you for your help": { alt: [["Thanks for helping me", "আমাকে সাহায্য করার জন্য ধন্যবাদ"]] },
  "the way to…": { alt: [["the road to…", "… যাওয়ার রাস্তা"]] },
  "turn left": { ant: [["turn right", "ডানে মোড় নিন"]] },
  "turn right": { ant: [["turn left", "বামে মোড় নিন"]] },
  "go straight": { alt: [["keep going straight", "সোজা যেতে থাকুন"]] },
  "cross the road": { alt: [["go across the road", "রাস্তা পার হয়ে যান"]] },
  "next to the bank": { syn: [["beside the bank", "ব্যাংকের পাশে"]] },
  "opposite the park": { syn: [["across from the park", "পার্কের ঠিক বিপরীতে"]] },
  "at the corner": { syn: [["on the corner", "কোণায়"]] },
  "in front of the school": { ant: [["behind the school", "স্কুলের পেছনে"]] },
  "behind the hospital": { ant: [["in front of the hospital", "হাসপাতালের সামনে"]] },
  "railway station": { syn: [["train station", "ট্রেন স্টেশন"]] },
  "public library": { syn: [["government library", "সরকারি পাঠাগার"]] },
  "early morning": { syn: [["dawn", "ভোর"]] },
  morning: { ant: [["evening", "সন্ধ্যা"]] },
  noon: { syn: [["midday", "মধ্যাহ্ন"]], ant: [["midnight", "মধ্যরাত"]] },
  evening: { ant: [["morning", "সকাল"]] },
  midnight: { syn: [["twelve at night", "রাত বারোটা"]], ant: [["noon", "দুপুর"]] },
  dawn: { syn: [["daybreak", "প্রভাত"]], ant: [["dusk", "গোধূলি"]] },
  "what time is it?": { alt: [["What is the time?", "কয়টা বাজে?"]] },
  black: { ant: [["white", "সাদা"]] },
  white: { ant: [["black", "কালো"]] },
  medicine: { syn: [["drug", "ওষুধ"]] },
  "face mask": { syn: [["mask", "মাস্ক"]] },
  doctor: { syn: [["physician", "চিকিৎসক"]] },
  patient: { syn: [["sick person", "অসুস্থ ব্যক্তি"]] },
  appointment: { syn: [["booking", "পূর্বনির্ধারিত সাক্ষাৎ"]] },
  pain: { syn: [["ache", "ব্যথা"]] },
  dizzy: { syn: [["light-headed", "মাথা হালকা লাগা"]] },
  "take rest": { alt: [["have a rest", "বিশ্রাম নিন"]] },
  "i feel sick": { alt: [["I am feeling unwell", "আমি অসুস্থ বোধ করছি"]] },
  wound: { syn: [["injury", "আঘাত"]] },
  bleeding: { syn: [["blood loss", "রক্তক্ষরণ"]] },
  "severe pain": { syn: [["terrible pain", "প্রচণ্ড ব্যথা"]] },
  "sore throat": { syn: [["throat pain", "গলা ব্যথা"]] },
  "mild fever": { syn: [["light fever", "হালকা জ্বর"]] },
  flight: { syn: [["plane journey", "বিমান যাত্রা"]] },
  "plane ticket": { syn: [["air ticket", "বিমানের টিকিট"]] },
  departure: { ant: [["arrival", "আগমন"]] },
  luggage: { syn: [["baggage", "লাগেজ"]] },
  "flight delay": { syn: [["delayed flight", "বিলম্বিত ফ্লাইট"]] },
  customs: { syn: [["border check", "সীমান্ত পরীক্ষা"]] },
  "border control": { syn: [["immigration check", "ইমিগ্রেশন পরীক্ষা"]] },
  takeoff: { ant: [["landing", "অবতরণ"]] },
  landing: { ant: [["takeoff", "উড্ডয়ন"]] },
  pilot: { syn: [["captain", "ক্যাপ্টেন"]] },
  "cabin crew": { syn: [["flight crew", "বিমান কর্মী"]] },
  "safe journey": { alt: [["Have a safe trip", "নিরাপদ যাত্রা হোক"]] },
  "baggage claim": { syn: [["luggage collection", "লাগেজ সংগ্রহ"]] },
  "exit gate": { ant: [["entrance gate", "প্রবেশ ফটক"]] },
  "wait here": { alt: [["Please wait here", "অনুগ্রহ করে এখানে অপেক্ষা করুন"]] },
  "hotel reservation": { syn: [["room booking", "রুম বুকিং"]] },
  "book a room": { alt: [["reserve a room", "রুম রিজার্ভ করা"]] },
  "confirm the booking": { alt: [["confirm the reservation", "বুকিং নিশ্চিত করা"]] },
  "single room": { ant: [["double room", "ডাবল রুম"]] },
  "double room": { ant: [["single room", "একক রুম"]] },
  "monthly rent": { syn: [["rent per month", "মাসিক ভাড়া"]] },
  "hotel checkout": { syn: [["checking out", "চেক আউট করা"]] },
  "final bill": { syn: [["last bill", "চূড়ান্ত বিল"]] },
  "leave the hotel": { alt: [["check out of the hotel", "হোটেল থেকে চেক আউট করা"]] },
  "help me": { alt: [["Please help me", "অনুগ্রহ করে আমাকে সাহায্য করুন"]] },
  "call an ambulance": { alt: [["Call for an ambulance", "অ্যাম্বুলেন্সের জন্য ফোন করুন"]] },
  police: { syn: [["police officer", "পুলিশ কর্মকর্তা"]] },
  "fire brigade": { syn: [["fire service", "ফায়ার সার্ভিস"]] },
  "call the police!": { alt: [["Phone the police!", "পুলিশকে ফোন করুন!"]] },
  "nearest hospital": { syn: [["closest hospital", "সবচেয়ে কাছের হাসপাতাল"]] },
  "i need help now": { alt: [["I need help immediately", "আমার অবিলম্বে সাহায্য দরকার"]] },
  "stay calm": { alt: [["Keep calm", "শান্ত থাকুন"]] },
  farmer: { syn: [["cultivator", "চাষি"]] },
  driver: { syn: [["chauffeur", "গাড়িচালক"]] },
  cook: { syn: [["chef", "শেফ"]] },
  barber: { syn: [["hairdresser", "চুল কাটার কারিগর"]] },
  writer: { syn: [["author", "লেখক"]] },
  singer: { syn: [["vocalist", "কণ্ঠশিল্পী"]] },
  "monthly salary": { syn: [["monthly pay", "মাসিক বেতন"]] },
  "office boss": { syn: [["manager", "ব্যবস্থাপক"]] },
  employee: { syn: [["worker", "কর্মী"]], ant: [["employer", "নিয়োগকর্তা"]] },
  unemployed: { ant: [["employed", "কর্মরত"]] },
  "full-time job": { ant: [["part-time job", "খণ্ডকালীন চাকরি"]] },
  photocopier: { syn: [["copy machine", "কপি মেশিন"]] },
  "office telephone": { syn: [["office phone", "অফিসের ফোন"]] },
  "ballpoint pen": { syn: [["pen", "কলম"]] },
  "exercise notebook": { syn: [["notebook", "খাতা"]] },
  cv: { syn: [["resume", "জীবনবৃত্তান্ত"]] },
  "job position": { syn: [["post", "পদ"]] },
  "apply online": { alt: [["apply on the internet", "ইন্টারনেটে আবেদন করা"]] },
  "application form": { syn: [["form", "ফর্ম"]] },
  "vacant post": { syn: [["empty post", "শূন্য পদ"]] },
  "my weakness": { ant: [["my strength", "আমার দক্ষতা"]] },
  "my strength": { ant: [["my weakness", "আমার দুর্বলতা"]] },
  confident: { syn: [["sure of oneself", "আত্মবিশ্বাসী"]], ant: [["nervous", "ঘাবড়ানো"]] },
  "a little nervous": { syn: [["a bit worried", "একটু চিন্তিত"]], ant: [["confident", "আত্মবিশ্বাসী"]] },
  "expected salary": { syn: [["salary expectation", "প্রত্যাশিত বেতন"]] },
  "thank you for your time": { alt: [["Thanks for your time", "আপনার সময়ের জন্য ধন্যবাদ"]] },
  "download a file": { ant: [["upload a file", "ফাইল আপলোড করা"]] },
  "upload a photo": { ant: [["download a photo", "ছবি ডাউনলোড করা"]] },
  "search online": { alt: [["search on the internet", "ইন্টারনেটে খোঁজা"]] },
  "click the link": { alt: [["tap the link", "লিংকে চাপ দিন"]] },
  "wifi connection": { syn: [["wireless connection", "তারবিহীন সংযোগ"]] },
  "browse the web": { alt: [["surf the internet", "ইন্টারনেটে ঘোরাঘুরি করা"]] },
  "search for information": { alt: [["look for information", "তথ্য খোঁজা"]] },
  "refresh the page": { alt: [["reload the page", "পেজ আবার লোড করা"]] },
  "scroll down": { ant: [["scroll up", "উপরে স্ক্রল করা"]] },
  "zoom in": { ant: [["zoom out", "জুম আউট করা"]] },
  webpage: { syn: [["web page", "ওয়েবপেজ"]] },
  "web link": { syn: [["link", "লিংক"]] },
  "log in": { ant: [["log out", "লগআউট করা"]] },
  "sign up": { syn: [["register", "নিবন্ধন করা"]] },
  "computer mouse": { syn: [["mouse", "মাউস"]] },
  monitor: { syn: [["screen", "পর্দা"]] },
  "computer screen": { syn: [["monitor", "মনিটর"]] },
  "file attachment": { syn: [["attachment", "সংযুক্তি"]] },
  "draft email": { syn: [["unsent email", "অপ্রেরিত ইমেইল"]] },
  "add to cart": { alt: [["put in the cart", "কার্টে রাখা"]] },
  "home delivery": { syn: [["doorstep delivery", "দরজায় ডেলিভারি"]] },
  "price discount": { syn: [["discount", "ছাড়"]] },
  "place an order": { alt: [["order online", "অনলাইনে অর্ডার করা"]] },
  "product review": { syn: [["customer review", "ক্রেতার মতামত"]] },
  "online seller": { syn: [["online shop", "অনলাইন দোকান"]] },
  "track the parcel": { alt: [["follow the parcel", "পার্সেলের অবস্থান দেখা"]] },
  thing: { syn: [["object", "বস্তু"]] },
  way: { syn: [["method", "পদ্ধতি"]] },
  people: { syn: [["persons", "মানুষজন"]] },
  place: { syn: [["location", "স্থান"]] },
  home: { syn: [["house", "বাড়ি"]] },
  "brand new": { syn: [["completely new", "একদম নতুন"]], ant: [["second-hand", "ব্যবহৃত"]] },
  "very old": { syn: [["ancient", "প্রাচীন"]], ant: [["brand new", "একদম নতুন"]] },
  someone: { syn: [["somebody", "কেউ একজন"]] },
  anyone: { syn: [["anybody", "যেকেউ"]] },
  everyone: { syn: [["everybody", "সবাই"]] },
  nothing: { ant: [["something", "কিছু"]] },
  but: { syn: [["however", "তবে"]] },
  because: { syn: [["since", "যেহেতু"]] },
  also: { syn: [["too", "এছাড়াও"]] },
  so: { syn: [["therefore", "সুতরাং"]] },
  while: { syn: [["at the same time", "একই সময়ে"]] },
  although: { syn: [["even though", "যদিও"]] },
  then: { syn: [["after that", "তারপর"]] },
  "in the box": { ant: [["outside the box", "বাক্সের বাইরে"]] },
  "on the table": { ant: [["under the table", "টেবিলের নিচে"]] },
  "under the bed": { ant: [["on the bed", "খাটের উপরে"]] },
  "behind the door": { ant: [["in front of the door", "দরজার সামনে"]] },
  "in front of the house": { ant: [["behind the house", "বাড়ির পেছনে"]] },
  "next to me": { syn: [["beside me", "আমার পাশে"]] },
  "near the school": { syn: [["close to the school", "স্কুলের কাছে"]], ant: [["far from the school", "স্কুল থেকে দূরে"]] },
  "with my friend": { ant: [["without my friend", "আমার বন্ধু ছাড়া"]] },
  "from dhaka": { ant: [["to Dhaka", "ঢাকার দিকে"]] },
  "before lunch": { ant: [["after lunch", "দুপুরের খাবারের পরে"]] },
  "after school": { ant: [["before school", "স্কুলের আগে"]] },
  "during the class": { ant: [["after the class", "ক্লাসের পরে"]] },
  "i want a pen": { alt: [["I would like a pen", "আমি একটি কলম চাই"]], ant: [["I don't want a pen", "আমি কলম চাই না"]] },
  "i don't want tea": { ant: [["I want tea", "আমি চা চাই"]] },
  "i need help": { ant: [["I don't need help", "আমার সাহায্য প্রয়োজন নেই"]] },
  "i wish to travel": { alt: [["I hope to travel", "আমি ভ্রমণ করার আশা করি"]] },
  "i hope to pass": { alt: [["I wish to pass", "আমি পাস করতে চাই"]] },
  "i choose the red one": { alt: [["I pick the red one", "আমি লালটা বেছে নিই"]] },
  "i prefer rice": { alt: [["I like rice more", "আমি ভাত বেশি পছন্দ করি"]] },
  "i want to learn english": { alt: [["I wish to learn English", "আমি ইংরেজি শিখতে ইচ্ছুক"]] },
  "give me water": { alt: [["Please give me water", "অনুগ্রহ করে আমাকে পানি দিন"]] },
  "take this book": { alt: [["Please take this book", "অনুগ্রহ করে এই বইটি নিন"]] },
  "i like mangoes": { ant: [["I don't like mangoes", "আমি আম পছন্দ করি না"]] },
  "i love my family": { alt: [["I adore my family", "আমি আমার পরিবারকে গভীরভাবে ভালোবাসি"]] },
  "i enjoy reading": { alt: [["I like reading", "আমি পড়তে পছন্দ করি"]] },
  "i hate lies": { ant: [["I love honesty", "আমি সততা ভালোবাসি"]] },
  "i dislike noise": { ant: [["I like quiet places", "আমি শান্ত জায়গা পছন্দ করি"]] },
  "my favourite colour": { alt: [["my favorite color", "আমার প্রিয় রং"]] },
  "i prefer tea": { alt: [["I like tea more", "আমি চা বেশি পছন্দ করি"]] },
  fun: { syn: [["enjoyment", "আনন্দ"]], ant: [["boredom", "একঘেয়েমি"]] },
  "boring lesson": { ant: [["interesting lesson", "আকর্ষণীয় পাঠ"]] },
  "interesting story": { ant: [["boring story", "একঘেয়ে গল্প"]] },
  "i need water": { ant: [["I don't need water", "আমার পানি প্রয়োজন নেই"]] },
  "i don't need help": { ant: [["I need help", "আমার সাহায্য প্রয়োজন"]] },
  "i must study": { alt: [["I have to study", "আমাকে পড়তেই হবে"]] },
  "important work": { syn: [["essential work", "অপরিহার্য কাজ"]] },
  "necessary documents": { syn: [["essential documents", "অপরিহার্য কাগজপত্র"]] },
  "i need rest": { ant: [["I don't need rest", "আমার বিশ্রাম প্রয়োজন নেই"]] },
  "i need to sleep early": { alt: [["I must sleep early", "আমাকে তাড়াতাড়ি ঘুমাতে হবে"]] },
  "i need a pen": { ant: [["I don't need a pen", "আমার কলম প্রয়োজন নেই"]] },
  "i don't need this bag": { ant: [["I need this bag", "আমার এই ব্যাগ প্রয়োজন"]] },
  "i need to call my friend": { alt: [["I must call my friend", "আমাকে আমার বন্ধুকে ফোন করতেই হবে"]] },
});

Object.assign(RELS_EXTRA, {
  feed: { syn: [["give food", "খাবার দেওয়া"]] },
  soft: { syn: [["smooth", "মসৃণ"]], ant: [["hard", "শক্ত"], ["rough", "রুক্ষ"]] },
  "play together": { alt: [["play with friends", "বন্ধুদের সঙ্গে খেলা"]] },
  afford: { syn: [["have enough money", "পর্যাপ্ত টাকা থাকা"]] },
  "too expensive": { syn: [["too costly", "অনেক ব্যয়বহুল"]], ant: [["cheap", "সস্তা"]] },
  "how much is it?": { alt: [["What is the price?", "দাম কত?"]] },
  reception: { syn: [["front desk", "রিসেপশন ডেস্ক"]] },
  "reception desk": { syn: [["front desk", "রিসেপশন ডেস্ক"]] },
  "pleasant stay": { alt: [["an enjoyable stay", "আনন্দদায়ক অবস্থান"]] },
  "thank you for everything": { alt: [["Thanks for everything", "সবকিছুর জন্য ধন্যবাদ"]] },
  "payment receipt": { syn: [["receipt", "রসিদ"]] },
  "work experience": { syn: [["job experience", "কাজের অভিজ্ঞতা"]] },
  internet: { syn: [["the web", "ওয়েব"]] },
  website: { syn: [["site", "সাইট"]] },
  browser: { syn: [["web browser", "ওয়েব ব্রাউজার"]] },
  homepage: { syn: [["home page", "হোম পেজ"]] },
  email: { syn: [["electronic mail", "ইলেকট্রনিক মেইল"]] },
  "online payment": { syn: [["digital payment", "ডিজিটাল পেমেন্ট"]] },
  "daily work": { syn: [["everyday work", "দৈনন্দিন কাজ"]] },
  something: { ant: [["nothing", "কিছুই না"]] },
  "to the market": { ant: [["from the market", "বাজার থেকে"]] },
  "small cut": { syn: [["small wound", "ছোট ক্ষত"]] },
  burn: { syn: [["scald", "পোড়া"]] },
  "broken bone": { syn: [["fracture", "হাড় ভাঙা"]] },
  "road accident": { syn: [["traffic accident", "সড়ক দুর্ঘটনা"]] },
  "common cold": { syn: [["cold", "সর্দি"]] },
  "tissue paper": { syn: [["tissue", "টিস্যু"]] },
  "health check-up": { syn: [["medical check-up", "চিকিৎসা পরীক্ষা"]] },
  clinic: { syn: [["medical centre", "চিকিৎসা কেন্দ্র"]] },
  "travel luggage": { syn: [["luggage", "লাগেজ"]] },
  "window seat": { ant: [["aisle seat", "আইলের পাশের আসন"]] },
  "aisle seat": { ant: [["window seat", "জানালার পাশের আসন"]] },
  seatbelt: { syn: [["safety belt", "নিরাপত্তা বেল্ট"]] },
  "luggage trolley": { syn: [["baggage trolley", "লাগেজ ট্রলি"]] },
  "lost luggage": { syn: [["missing luggage", "হারিয়ে যাওয়া লাগেজ"]] },
  "taxi stand": { syn: [["taxi rank", "ট্যাক্সি স্ট্যান্ড"]] },
  "customs check": { syn: [["customs inspection", "কাস্টমস পরীক্ষা"]] },
  "room available": { alt: [["A room is free", "একটি রুম খালি আছে"]] },
  "hotel guest": { syn: [["guest", "অতিথি"]] },
  "room price": { syn: [["room rate", "রুমের ভাড়া"]] },
  "air conditioning": { alt: [["AC", "এসি"]] },
  "rented apartment": { syn: [["rented flat", "ভাড়া ফ্ল্যাট"]] },
  "career goal": { syn: [["career aim", "পেশাগত লক্ষ্য"]] },
  "file folder": { syn: [["folder", "ফোল্ডার"]] },
  signature: { syn: [["sign", "স্বাক্ষর"]] },
  "account password": { syn: [["password", "পাসওয়ার্ড"]] },
  "online class": { syn: [["virtual class", "ভার্চুয়াল ক্লাস"]] },
  "save a bookmark": { alt: [["bookmark the page", "পেজটি বুকমার্ক করা"]] },
  "browsing history": { syn: [["history", "ইতিহাস"]] },
  "online news": { syn: [["internet news", "ইন্টারনেট সংবাদ"]] },
  "phone charger": { syn: [["charger", "চার্জার"]] },
  "hard drive": { syn: [["hard disk", "হার্ড ডিস্ক"]] },
  "usb cable": { syn: [["USB cord", "ইউএসবি তার"]] },
  "email inbox": { syn: [["inbox", "ইনবক্স"]] },
  "reply to an email": { alt: [["answer an email", "ইমেইলের উত্তর দেওয়া"]] },
  "email subject": { syn: [["subject line", "বিষয় লাইন"]] },
  "spam folder": { syn: [["junk folder", "জাঙ্ক ফোল্ডার"]] },
  "delete an email": { alt: [["remove an email", "ইমেইল মুছে ফেলা"]] },
  "return a product": { alt: [["send back a product", "পণ্য ফেরত পাঠানো"]] },
  "send an email": { alt: [["write and send an email", "ইমেইল লিখে পাঠানো"]] },
  menu: { syn: [["food list", "খাবারের তালিকা"]] },
  "cotton wool": { syn: [["cotton", "তুলা"]] },
  ointment: { syn: [["cream", "ক্রিম"]] },
  "school teacher": { syn: [["teacher", "শিক্ষক"]] },
});

const IPA: Record<string, string> = {
  hello: "/həˈləʊ/", happy: "/ˈhæpi/", sad: "/sæd/", angry: "/ˈæŋɡri/",
  afraid: "/əˈfreɪd/", excited: "/ɪkˈsaɪtɪd/", tired: "/ˈtaɪəd/",
  hungry: "/ˈhʌŋɡri/", worried: "/ˈwʌrid/", calm: "/kɑːm/",
  friend: "/frend/", teacher: "/ˈtiːtʃə/", doctor: "/ˈdɒktə/",
  water: "/ˈwɔːtə/", food: "/fuːd/", book: "/bʊk/", school: "/skuːl/",
  family: "/ˈfæməli/", mother: "/ˈmʌðə/", father: "/ˈfɑːðə/",
  brother: "/ˈbrʌðə/", sister: "/ˈsɪstə/", morning: "/ˈmɔːnɪŋ/",
  evening: "/ˈiːvnɪŋ/", night: "/naɪt/", day: "/deɪ/", week: "/wiːk/",
  month: "/mʌnθ/", year: "/jɪə/", please: "/pliːz/", sorry: "/ˈsɒri/",
  welcome: "/ˈwelkəm/", beautiful: "/ˈbjuːtɪfl/", important: "/ɪmˈpɔːtnt/",
  different: "/ˈdɪfrənt/", colour: "/ˈkʌlə/", colour2: "", price: "/praɪs/",
  cheap: "/tʃiːp/", expensive: "/ɪkˈspensɪv/", delicious: "/dɪˈlɪʃəs/",
  hospital: "/ˈhɒspɪtl/", medicine: "/ˈmedsn/", airport: "/ˈeəpɔːt/",
  passport: "/ˈpɑːspɔːt/", hotel: "/həʊˈtel/", restaurant: "/ˈrestrɒnt/",
  computer: "/kəmˈpjuːtə/", internet: "/ˈɪntənet/", question: "/ˈkwestʃən/",
  answer: "/ˈɑːnsə/", people: "/ˈpiːpl/", country: "/ˈkʌntri/",
  river: "/ˈrɪvə/", mountain: "/ˈmaʊntɪn/", weather: "/ˈweðə/",
  rain: "/reɪn/", sun: "/sʌn/", moon: "/muːn/", star: "/stɑː/",
};

// Fully hand-written enrichment for the two showcase lessons (1 and 5):
// definitions, examples, micro-stories and grammar notes written entry by entry.
export interface RichEntry {
  defEn: string;
  defBn: string;
  exEn: string;
  exBn: string;
  microTitleEn: string;
  microTitleBn: string;
  micro: [string, string][];
  grammar?: { pattern: string; explainBn: string; more: [string, string][] };
}

const RICH: Record<number, Record<string, RichEntry>> = {
  1: {
    hello: {
      defEn: "A greeting used when you meet someone or start a conversation.",
      defBn: "কারো সঙ্গে দেখা হলে বা কথা শুরু করার সময় ব্যবহৃত সম্ভাষণ।",
      exEn: "Hello! How are you today?",
      exBn: "হ্যালো! আজ আপনি কেমন আছেন?",
      microTitleEn: "A New Neighbour",
      microTitleBn: "নতুন প্রতিবেশী",
      micro: [
        ["Rafi saw a new boy near his house.", "রাফি তার বাড়ির কাছে একটি নতুন ছেলেকে দেখল।"],
        ["He smiled and said, \"Hello!\"", "সে হেসে বলল, \"হ্যালো!\""],
        ["The boy said hello too.", "ছেলেটিও হ্যালো বলল।"],
        ["Now they are good friends.", "এখন তারা ভালো বন্ধু।"],
      ],
    },
    name: {
      defEn: "The word or words that a person, place or thing is known by.",
      defBn: "কোনো ব্যক্তি, স্থান বা জিনিস যে শব্দে পরিচিত।",
      exEn: "My name is written on my book.",
      exBn: "আমার নাম আমার বইয়ের উপর লেখা আছে।",
      microTitleEn: "The New Student",
      microTitleBn: "নতুন শিক্ষার্থী",
      micro: [
        ["A new girl came to our class.", "আমাদের ক্লাসে একটি নতুন মেয়ে এল।"],
        ["The teacher asked, \"What is your name?\"", "শিক্ষক জিজ্ঞাসা করলেন, \"তোমার নাম কী?\""],
        ["\"My name is Nusrat,\" she said.", "\"আমার নাম নুসরাত,\" সে বলল।"],
        ["Everyone remembered her name.", "সবাই তার নাম মনে রাখল।"],
      ],
    },
    "nice to meet you": {
      defEn: "A polite expression used when you meet someone for the first time.",
      defBn: "প্রথমবার কারো সঙ্গে পরিচিত হলে ব্যবহৃত ভদ্র অভিব্যক্তি।",
      exEn: "Hello, I am Karim. Nice to meet you.",
      exBn: "হ্যালো, আমি করিম। আপনার সঙ্গে পরিচিত হয়ে ভালো লাগলো।",
      microTitleEn: "At the Office",
      microTitleBn: "অফিসে",
      micro: [
        ["Suma started a new job today.", "সুমা আজ নতুন চাকরি শুরু করল।"],
        ["Her manager said, \"Welcome to our team.\"", "তার ম্যানেজার বললেন, \"আমাদের দলে স্বাগতম।\""],
        ["Suma smiled and said, \"Nice to meet you.\"", "সুমা হেসে বলল, \"আপনার সঙ্গে পরিচিত হয়ে ভালো লাগলো।\""],
        ["She felt happy and confident.", "সে খুশি ও আত্মবিশ্বাসী বোধ করল।"],
      ],
      grammar: {
        pattern: "Nice to + verb (meet) + object (you)",
        explainBn: "প্রথম পরিচয়ে আনন্দ প্রকাশ করতে \"Nice to meet you\" বলা হয়। জবাবে অন্য জনও একই বাক্য বলতে পারেন।",
        more: [
          ["Nice to see you.", "আপনাকে দেখে ভালো লাগলো।"],
          ["Nice to talk to you.", "আপনার সঙ্গে কথা বলে ভালো লাগলো।"],
        ],
      },
    },
    "what is your name?": {
      defEn: "A question used to ask someone's name.",
      defBn: "কারো নাম জানতে ব্যবহৃত প্রশ্ন।",
      exEn: "What is your name? — My name is Tanvir.",
      exBn: "আপনার নাম কী? — আমার নাম তানভীর।",
      microTitleEn: "On the Train",
      microTitleBn: "ট্রেনে",
      micro: [
        ["A young man sat beside Arif on the train.", "ট্রেনে আরিফের পাশে এক যুবক বসল।"],
        ["Arif asked, \"What is your name?\"", "আরিফ জিজ্ঞাসা করল, \"আপনার নাম কী?\""],
        ["\"I am Shakil,\" the man said.", "\"আমি শাকিল,\" লোকটি বলল।"],
        ["They talked for the whole journey.", "তারা পুরো যাত্রা জুড়ে গল্প করল।"],
      ],
      grammar: {
        pattern: "What + is + your + name?",
        explainBn: "নাম জিজ্ঞাসা করার সবচেয়ে সাধারণ প্রশ্ন। উত্তর দেওয়া হয় \"My name is…\" দিয়ে।",
        more: [
          ["What is his name?", "তার (ছেলে) নাম কী?"],
          ["What is her name?", "তার (মেয়ে) নাম কী?"],
        ],
      },
    },
    goodbye: {
      defEn: "A word used when you leave someone or someone leaves you.",
      defBn: "বিদায় নেওয়ার সময় ব্যবহৃত শব্দ।",
      exEn: "It is late. Goodbye, see you tomorrow!",
      exBn: "অনেক রাত হয়েছে। বিদায়, আগামীকাল দেখা হবে!",
      microTitleEn: "After the Class",
      microTitleBn: "ক্লাসের পরে",
      micro: [
        ["The English class finished at five o'clock.", "ইংরেজি ক্লাস পাঁচটায় শেষ হলো।"],
        ["Rina said goodbye to her teacher.", "রিনা তার শিক্ষককে বিদায় জানাল।"],
        ["Her friends also said goodbye.", "তার বন্ধুরাও বিদায় জানাল।"],
        ["They will meet again tomorrow.", "তাদের আগামীকাল আবার দেখা হবে।"],
      ],
    },
    meet: {
      defEn: "To come together with someone, by plan or by chance, and be in the same place.",
      defBn: "পরিকল্পনা করে বা হঠাৎ কারো সঙ্গে এক জায়গায় একত্র হওয়া।",
      exEn: "Let's meet at the school gate at 8 o'clock.",
      exBn: "চলুন সকাল ৮টায় স্কুলের গেটে দেখা করি।",
      microTitleEn: "Meeting at the Gate",
      microTitleBn: "গেটে দেখা",
      micro: [
        ["Rafi and Mina planned to meet at the park gate.", "রাফি ও মিনা পার্কের গেটে দেখা করার পরিকল্পনা করল।"],
        ["Rafi reached the gate at four o'clock.", "রাফি চারটায় গেটে পৌঁছাল।"],
        ["Mina came two minutes later and they met happily.", "মিনা দুই মিনিট পরে এল এবং তাদের আনন্দে দেখা হলো।"],
        ["Then they walked into the park together.", "তারপর তারা একসঙ্গে পার্কে ঢুকল।"],
      ],
    },
    friend: {
      defEn: "A person you know well, like a lot, and enjoy spending time with.",
      defBn: "যাকে ভালোভাবে চেনেন, খুব পছন্দ করেন এবং যার সঙ্গে সময় কাটাতে ভালো লাগে।",
      exEn: "Karim is my best friend from school.",
      exBn: "করিম স্কুল থেকে আমার সবচেয়ে ভালো বন্ধু।",
      microTitleEn: "A True Friend",
      microTitleBn: "এক প্রকৃত বন্ধু",
      micro: [
        ["Arif forgot his lunch at home one day.", "আরিফ একদিন বাড়িতে তার দুপুরের খাবার ভুলে গেল।"],
        ["His friend Tanvir shared his own lunch with him.", "তার বন্ধু তানভীর নিজের খাবার তার সঙ্গে ভাগ করে খেল।"],
        ["\"You are a true friend,\" Arif said.", "\"তুমি এক প্রকৃত বন্ধু,\" আরিফ বলল।"],
        ["Good friends help each other in need.", "ভালো বন্ধুরা প্রয়োজনে একে অপরকে সাহায্য করে।"],
      ],
    },
    introduce: {
      defEn: "To tell people each other's names so that they can meet and know one another.",
      defBn: "মানুষকে একে অপরের নাম জানিয়ে দেওয়া, যাতে তারা পরিচিত হতে পারে।",
      exEn: "Let me introduce my cousin to you.",
      exBn: "আমি আমার চাচাতো ভাইকে আপনার সঙ্গে পরিচয় করিয়ে দিই।",
      microTitleEn: "The New Cousin",
      microTitleBn: "নতুন চাচাতো ভাই",
      micro: [
        ["Suma's cousin came from the village for a visit.", "সুমার চাচাতো ভাই গ্রাম থেকে বেড়াতে এল।"],
        ["Suma wanted to introduce him to her friends.", "সুমা তাকে তার বন্ধুদের সঙ্গে পরিচয় করিয়ে দিতে চাইল।"],
        ["\"Friends, this is my cousin Rahat,\" she said.", "\"বন্ধুরা, এটি আমার চাচাতো ভাই রাহাত,\" সে বলল।"],
        ["Soon everyone was talking and laughing together.", "শীঘ্রই সবাই একসঙ্গে কথা বলতে ও হাসতে লাগল।"],
      ],
    },
    welcome: {
      defEn: "A friendly greeting given to someone who has just arrived.",
      defBn: "সদ্য আগত কাউকে দেওয়া বন্ধুসুলভ অভ্যর্থনা।",
      exEn: "Welcome to our home! Please come in.",
      exBn: "আমাদের বাড়িতে স্বাগতম! অনুগ্রহ করে ভেতরে আসুন।",
      microTitleEn: "Welcome Home",
      microTitleBn: "বাড়িতে স্বাগতম",
      micro: [
        ["Nusrat returned home after a long journey.", "নুসরাত দীর্ঘ যাত্রার পর বাড়ি ফিরল।"],
        ["Her whole family was waiting at the door.", "তার পুরো পরিবার দরজায় অপেক্ষা করছিল।"],
        ["\"Welcome home!\" everyone said together.", "\"বাড়িতে স্বাগতম!\" সবাই একসঙ্গে বলল।"],
        ["Nusrat felt the warmth of home at once.", "নুসরাত সঙ্গে সঙ্গে বাড়ির উষ্ণতা অনুভব করল।"],
      ],
    },
    "my name is rafi": {
      defEn: "A sentence used to tell someone your own name when you introduce yourself.",
      defBn: "নিজের পরিচয় দেওয়ার সময় নিজের নাম বলতে ব্যবহৃত বাক্য।",
      exEn: "Hello everyone. My name is Rafi, and I am from Dhaka.",
      exBn: "সবাইকে হ্যালো। আমার নাম রাফি, এবং আমি ঢাকা থেকে এসেছি।",
      microTitleEn: "The First Day",
      microTitleBn: "প্রথম দিন",
      micro: [
        ["It was Rafi's first day at his new school.", "রাফির নতুন স্কুলে প্রথম দিন ছিল।"],
        ["The teacher asked him to introduce himself.", "শিক্ষক তাকে নিজের পরিচয় দিতে বললেন।"],
        ["\"Hello, my name is Rafi,\" he said bravely.", "\"হ্যালো, আমার নাম রাফি,\" সে সাহস করে বলল।"],
        ["The class clapped and welcomed him.", "ক্লাস হাততালি দিয়ে তাকে স্বাগত জানাল।"],
      ],
      grammar: {
        pattern: "My name is + [name]",
        explainBn: "নিজের নাম পরিচয় দেওয়ার জন্য এই গঠন ব্যবহার করা হয়। \"is\"-এর পরে নিজের নাম বসে।",
        more: [
          ["My name is Mina.", "আমার নাম মিনা।"],
          ["My name is Karim Uddin.", "আমার নাম করিম উদ্দিন।"],
        ],
      },
    },
  },
  5: {
    happy: {
      defEn: "Feeling pleased or joyful.",
      defBn: "আনন্দ, সন্তুষ্টি বা সুখ অনুভব করা।",
      exEn: "I feel happy today because my friend is coming.",
      exBn: "আজ আমার খুব ভালো লাগছে কারণ আমার বন্ধু আসছে।",
      microTitleEn: "A Happy Morning",
      microTitleBn: "একটি আনন্দের সকাল",
      micro: [
        ["Mina woke up early in the morning.", "মিনা সকালে তাড়াতাড়ি ঘুম থেকে উঠল।"],
        ["The sun was shining and the birds were singing.", "সূর্য ঝলমল করছিল আর পাখিরা গান গাইছিল।"],
        ["She felt very happy.", "সে খুব সুখী বোধ করল।"],
        ["She smiled and said, \"What a happy day!\"", "সে হেসে বলল, \"কী আনন্দের দিন!\""],
      ],
    },
    sad: {
      defEn: "Feeling unhappy or sorrowful.",
      defBn: "দুঃখ বা বিষণ্ণতা অনুভব করা।",
      exEn: "He felt sad when his friend moved to another city.",
      exBn: "তার বন্ধু অন্য শহরে চলে গেলে সে দুঃখ পেল।",
      microTitleEn: "The Rainy Day",
      microTitleBn: "বৃষ্টির দিন",
      micro: [
        ["It rained all day long.", "সারাদিন বৃষ্টি হলো।"],
        ["Tanvir could not play outside with his friends.", "তানভীর বন্ধুদের সঙ্গে বাইরে খেলতে পারল না।"],
        ["He felt sad and sat near the window.", "সে দুঃখ পেয়ে জানালার পাশে বসে রইল।"],
        ["In the evening, the rain stopped and he smiled again.", "সন্ধ্যায় বৃষ্টি থামল আর সে আবার হাসল।"],
      ],
    },
    angry: {
      defEn: "Feeling strong displeasure about something wrong or unfair.",
      defBn: "কোনো অন্যায় বা ভুলের জন্য তীব্র অসন্তোষ অনুভব করা।",
      exEn: "She was angry because the bus was very late.",
      exBn: "বাস অনেক দেরি করায় সে রেগে গিয়েছিল।",
      microTitleEn: "The Broken Toy",
      microTitleBn: "ভাঙা খেলনা",
      micro: [
        ["Rahim's little brother broke his favourite toy car.", "রহিমের ছোট ভাই তার প্রিয় খেলনা গাড়িটি ভেঙে ফেলল।"],
        ["Rahim felt angry for a moment.", "রহিম মুহূর্তের জন্য রেগে গেল।"],
        ["Then his brother said sorry with tears in his eyes.", "তারপর তার ভাই চোখে পানি নিয়ে দুঃখিত বলল।"],
        ["Rahim forgave him and they fixed the car together.", "রহিম তাকে ক্ষমা করল আর তারা একসঙ্গে গাড়িটি ঠিক করল।"],
      ],
    },
    afraid: {
      defEn: "Feeling fear; frightened of something.",
      defBn: "কোনো কিছুতে ভয় পাওয়া।",
      exEn: "The child is afraid of the dark.",
      exBn: "শিশুটি অন্ধকারে ভয় পায়।",
      microTitleEn: "The Dark Room",
      microTitleBn: "অন্ধকার ঘর",
      micro: [
        ["Little Sami was afraid of the dark room.", "ছোট্ট সামি অন্ধকার ঘরটিকে ভয় পেত।"],
        ["One night, the light went off suddenly.", "এক রাতে হঠাৎ বাতি নিভে গেল।"],
        ["His mother held his hand and told him a story.", "তার মা তার হাত ধরে তাকে একটি গল্প শোনালেন।"],
        ["Soon Sami was not afraid any more.", "শীঘ্রই সামির ভয় চলে গেল।"],
      ],
    },
    excited: {
      defEn: "Feeling very happy and enthusiastic about something that is going to happen.",
      defBn: "কোনো আসন্ন বিষয় নিয়ে খুব আনন্দিত ও উত্তেজিত বোধ করা।",
      exEn: "The children are excited about the school trip.",
      exBn: "স্কুল ভ্রমণ নিয়ে শিশুরা খুব উত্তেজিত।",
      microTitleEn: "The School Trip",
      microTitleBn: "স্কুল ভ্রমণ",
      micro: [
        ["Tomorrow the class will visit the zoo.", "আগামীকাল ক্লাস চিড়িয়াখানা ঘুরতে যাবে।"],
        ["Nabil is very excited about the trip.", "নাবিল ভ্রমণটি নিয়ে খুব উত্তেজিত।"],
        ["He packed his bag in the evening.", "সে সন্ধ্যায় তার ব্যাগ গুছিয়ে রাখল।"],
        ["He could not sleep early that night!", "সে রাতে তাড়াতাড়ি ঘুমাতেই পারল না!"],
      ],
    },
    calm: {
      defEn: "Peaceful and relaxed; not worried or angry.",
      defBn: "শান্ত ও নিশ্চিন্ত; উদ্বিগ্ন বা রাগী নয়।",
      exEn: "Take a deep breath and stay calm.",
      exBn: "গভীর শ্বাস নিন এবং শান্ত থাকুন।",
      microTitleEn: "Before the Exam",
      microTitleBn: "পরীক্ষার আগে",
      micro: [
        ["Farhana had an English exam today.", "ফারহানার আজ ইংরেজি পরীক্ষা ছিল।"],
        ["At first she felt nervous.", "প্রথমে সে ঘাবড়ে গিয়েছিল।"],
        ["She drank some water and took a deep breath.", "সে কিছু পানি খেল আর গভীর শ্বাস নিল।"],
        ["Now she felt calm and ready.", "এখন সে শান্ত ও প্রস্তুত বোধ করল।"],
      ],
    },
    tired: {
      defEn: "Feeling that you need rest or sleep after work or activity.",
      defBn: "কাজ বা পরিশ্রমের পর বিশ্রাম বা ঘুমের প্রয়োজন বোধ করা।",
      exEn: "After walking for two hours, the children were tired.",
      exBn: "দুই ঘণ্টা হাঁটার পর শিশুরা ক্লান্ত হয়ে পড়ল।",
      microTitleEn: "The Long Walk",
      microTitleBn: "দীর্ঘ হাঁটা",
      micro: [
        ["Rafi walked to his uncle's village on foot.", "রাফি পায়ে হেঁটে তার চাচার গ্রামে গেল।"],
        ["The road was long and the sun was hot.", "রাস্তা লম্বা ছিল এবং রোদ ছিল প্রখর।"],
        ["When he arrived, he felt very tired.", "পৌঁছে সে খুব ক্লান্ত বোধ করল।"],
        ["He drank water and rested under a big tree.", "সে পানি খেল এবং একটি বড় গাছের নিচে বিশ্রাম নিল।"],
      ],
    },
    hungry: {
      defEn: "Feeling that you need or want food.",
      defBn: "খাবারের প্রয়োজন বা ইচ্ছা বোধ করা।",
      exEn: "The baby is crying because she is hungry.",
      exBn: "শিশুটি কাঁদছে কারণ তার ক্ষুধা পেয়েছে।",
      microTitleEn: "Hungry After School",
      microTitleBn: "স্কুলের পর ক্ষুধা",
      micro: [
        ["School finished at four o'clock.", "স্কুল চারটায় ছুটি হলো।"],
        ["Mina had not eaten since morning.", "মিনা সকাল থেকে কিছু খায়নি।"],
        ["She felt very hungry on the way home.", "বাড়ি ফেরার পথে তার খুব ক্ষুধা পেল।"],
        ["Mother had warm rice and curry ready for her.", "মা তার জন্য গরম ভাত ও তরকারি তৈরি রেখেছিলেন।"],
      ],
    },
    surprised: {
      defEn: "Feeling amazed or shocked because something unexpected happened.",
      defBn: "অপ্রত্যাশিত কিছু ঘটায় বিস্মিত বা হতবাক বোধ করা।",
      exEn: "We were surprised to see snow in the hills.",
      exBn: "পাহাড়ে বরফ দেখে আমরা অবাক হলাম।",
      microTitleEn: "The Surprise Gift",
      microTitleBn: "আশ্চর্য উপহার",
      micro: [
        ["It was Karim's birthday, but nobody said anything in the morning.", "করিমের জন্মদিন ছিল, কিন্তু সকালে কেউ কিছু বলল না।"],
        ["In the evening, he opened the door and saw all his friends.", "সন্ধ্যায় সে দরজা খুলে সব বন্ধুকে দেখল।"],
        ["\"Surprise!\" they shouted with a big cake.", "\"আশ্চর্য!\" তারা বড় একটি কেক নিয়ে চিৎকার করল।"],
        ["Karim was surprised and very happy.", "করিম অবাক ও খুব খুশি হলো।"],
      ],
    },
    worried: {
      defEn: "Feeling anxious or troubled about something that might happen.",
      defBn: "ঘটতে পারে এমন কিছু নিয়ে উদ্বিগ্ন বা চিন্তিত বোধ করা।",
      exEn: "Mother was worried because the rain was very heavy.",
      exBn: "মা চিন্তিত ছিলেন কারণ বৃষ্টি খুব জোরে হচ্ছিল।",
      microTitleEn: "The Heavy Rain",
      microTitleBn: "প্রবল বৃষ্টি",
      micro: [
        ["Dark clouds covered the sky in the afternoon.", "বিকেলে কালো মেঘ আকাশ ঢেকে ফেলল।"],
        ["Suma's father had not returned from the market yet.", "সুমার বাবা এখনো বাজার থেকে ফেরেননি।"],
        ["The family felt worried about him.", "পরিবার তার জন্য চিন্তিত বোধ করল।"],
        ["Soon he came home safely, and everyone felt calm again.", "শীঘ্রই তিনি নিরাপদে বাড়ি ফিরলেন, এবং সবাই আবার নিশ্চিন্ত হলো।"],
      ],
    },
  },
  2: {
    please: {
      defEn: "A polite word added to a request to make it kind and respectful.",
      defBn: "অনুরোধকে ভদ্র ও সম্মানজনক করতে ব্যবহৃত শব্দ।",
      exEn: "Please sit down and have some tea.",
      exBn: "অনুগ্রহ করে বসুন এবং চা খান।",
      microTitleEn: "At the Tea Stall",
      microTitleBn: "চায়ের দোকানে",
      micro: [
        ["Rafi went to a small tea stall near his school.", "রাফি তার স্কুলের কাছে একটি ছোট চায়ের দোকানে গেল।"],
        ["\"One cup of tea, please,\" he said with a smile.", "\"এক কাপ চা দিন, অনুগ্রহ করে,\" সে হেসে বলল।"],
        ["The old shopkeeper liked his polite words.", "বৃদ্ধ দোকানদার তার ভদ্র কথা পছন্দ করলেন।"],
        ["\"You are a good boy,\" he said kindly.", "\"তুমি ভালো ছেলে,\" তিনি স্নেহভরে বললেন।"],
      ],
      grammar: {
        pattern: "Please + verb … / … , please",
        explainBn: "অনুরোধের শুরুতে বা শেষে \"please\" যোগ করলে বাক্যটি ভদ্র শোনায়।",
        more: [
          ["Please help me.", "অনুগ্রহ করে আমাকে সাহায্য করুন।"],
          ["Come in, please.", "ভেতরে আসুন, অনুগ্রহ করে।"],
        ],
      },
    },
    "thank you": {
      defEn: "Words used to show gratitude when someone helps you or gives you something.",
      defBn: "কেউ সাহায্য করলে বা কিছু দিলে কৃতজ্ঞতা প্রকাশের শব্দ।",
      exEn: "Thank you for your help yesterday.",
      exBn: "গতকালের সাহায্যের জন্য ধন্যবাদ।",
      microTitleEn: "The Heavy Bag",
      microTitleBn: "ভারী ব্যাগ",
      micro: [
        ["An old woman was carrying a very heavy bag.", "এক বৃদ্ধা খুব ভারী একটি ব্যাগ বয়ে নিয়ে যাচ্ছিলেন।"],
        ["Mina ran to her and carried the bag to her home.", "মিনা দৌড়ে গিয়ে ব্যাগটি তার বাড়ি পর্যন্ত পৌঁছে দিল।"],
        ["\"Thank you, my child,\" the woman said warmly.", "\"ধন্যবাদ, বাছা,\" বৃদ্ধা আন্তরিকভাবে বললেন।"],
        ["Mina felt happy all day.", "মিনা সারাদিন খুশি থাকল।"],
      ],
      grammar: {
        pattern: "Thank you for + noun / verb-ing",
        explainBn: "কোন কাজের জন্য ধন্যবাদ জানাতে \"Thank you for …\" বলা হয়।",
        more: [
          ["Thank you for coming.", "আসার জন্য ধন্যবাদ।"],
          ["Thank you for the gift.", "উপহারের জন্য ধন্যবাদ।"],
        ],
      },
    },
    "you are welcome": {
      defEn: "The polite reply when someone says \"thank you\" to you.",
      defBn: "কেউ ধন্যবাদ জানালে উত্তরে বলা ভদ্র বাক্য।",
      exEn: "\"Thank you for the book.\" — \"You are welcome.\"",
      exBn: "\"বইটির জন্য ধন্যবাদ।\" — \"আপনাকে স্বাগতম।\"",
      microTitleEn: "In the Library",
      microTitleBn: "লাইব্রেরিতে",
      micro: [
        ["Arif could not find his favourite story book.", "আরিফ তার প্রিয় গল্পের বইটি খুঁজে পাচ্ছিল না।"],
        ["The librarian found it for him in a minute.", "লাইব্রেরিয়ান এক মিনিটে বইটি খুঁজে দিলেন।"],
        ["\"Thank you so much,\" Arif said.", "\"অনেক ধন্যবাদ,\" আরিফ বলল।"],
        ["\"You are welcome,\" she replied with a smile.", "\"আপনাকে স্বাগতম,\" তিনি হেসে উত্তর দিলেন।"],
      ],
    },
    sorry: {
      defEn: "A word used to apologise when you make a mistake or cause a problem.",
      defBn: "ভুল করলে বা কারো অসুবিধা হলে ক্ষমা চাইতে ব্যবহৃত শব্দ।",
      exEn: "I am sorry I am late. The bus did not come on time.",
      exBn: "দেরি হওয়ার জন্য দুঃখিত। বাস সময়মতো আসেনি।",
      microTitleEn: "The Spilled Water",
      microTitleBn: "ছিটকে পড়া পানি",
      micro: [
        ["Karim was running with a glass of water.", "করিম এক গ্লাস পানি নিয়ে দৌড়াচ্ছিল।"],
        ["The water spilled on his sister's book.", "পানি ছিটকে তার বোনের বইয়ের উপর পড়ল।"],
        ["\"I am very sorry,\" Karim said at once.", "\"আমি খুব দুঃখিত,\" করিম সঙ্গে সঙ্গে বলল।"],
        ["His sister smiled and said, \"It is okay.\"", "তার বোন হেসে বলল, \"ঠিক আছে।\""],
      ],
    },
    "excuse me": {
      defEn: "A polite expression used to get attention, to pass by someone, or to apologise for a small mistake.",
      defBn: "কারো মনোযোগ পেতে, পাশ কাটিয়ে যেতে, বা ছোট ভুলের জন্য ব্যবহৃত ভদ্র অভিব্যক্তি।",
      exEn: "Excuse me, is this seat free?",
      exBn: "মাফ করবেন, এই আসনটি কি খালি?",
      microTitleEn: "On the Bus",
      microTitleBn: "বাসে",
      micro: [
        ["The bus was full of people.", "বাসটি লোকে ভরা ছিল।"],
        ["Nusrat wanted to get down at the next stop.", "নুসরাত পরের স্টপে নামতে চাইল।"],
        ["\"Excuse me, I need to get off here,\" she said politely.", "\"মাফ করবেন, আমাকে এখানে নামতে হবে,\" সে ভদ্রভাবে বলল।"],
        ["People moved aside and she got down easily.", "লোকজন সরে দাঁড়াল আর সে সহজে নেমে গেল।"],
      ],
    },
    grateful: {
      defEn: "Feeling thankful for something good that someone has done for you.",
      defBn: "কারো উপকারের জন্য কৃতজ্ঞ বোধ করা।",
      exEn: "I am grateful to my teacher for her guidance.",
      exBn: "আমি আমার শিক্ষকের প্রতি তার দিকনির্দেশনার জন্য কৃতজ্ঞ।",
      microTitleEn: "A Grateful Student",
      microTitleBn: "এক কৃতজ্ঞ শিক্ষার্থী",
      micro: [
        ["Suma could not pay for her exam books.", "সুমা তার পরীক্ষার বইয়ের টাকা দিতে পারছিল না।"],
        ["Her neighbour quietly bought the books for her.", "তার প্রতিবেশী চুপচাপ বইগুলো কিনে দিলেন।"],
        ["Suma was deeply grateful to him.", "সুমা তার প্রতি গভীরভাবে কৃতজ্ঞ হলো।"],
        ["She promised to help others one day, just like him.", "সে প্রতিজ্ঞা করল, একদিন সেও তার মতো অন্যদের সাহায্য করবে।"],
      ],
    },
    polite: {
      defEn: "Behaving in a respectful and considerate way towards other people.",
      defBn: "অন্যের প্রতি সম্মানজনক ও বিবেচনাপূর্ণ আচরণ করা।",
      exEn: "He is always polite to his teachers and elders.",
      exBn: "সে সবসময় তার শিক্ষক ও বড়দের প্রতি ভদ্র আচরণ করে।",
      microTitleEn: "The Polite Guest",
      microTitleBn: "ভদ্র অতিথি",
      micro: [
        ["Tanvir visited his friend's home for the first time.", "তানভীর প্রথমবার তার বন্ধুর বাড়ি গেল।"],
        ["He greeted everyone politely and took off his shoes at the door.", "সে সবাইকে ভদ্রভাবে সালাম দিল এবং দরজায় জুতা খুলল।"],
        ["He said please and thank you at the table.", "সে খাবার টেবিলে অনুগ্রহ করে ও ধন্যবাদ বলল।"],
        ["Everyone said, \"What a polite boy!\"", "সবাই বলল, \"কী ভদ্র ছেলে!\""],
      ],
    },
    "no problem": {
      defEn: "A friendly reply meaning something is not a trouble at all; often used after \"thank you\" or \"sorry\".",
      defBn: "বন্ধুসুলভ উত্তর, যার অর্থ কোনো অসুবিধাই নয়; \"ধন্যবাদ\" বা \"দুঃখিত\"-এর পরে প্রায়ই ব্যবহৃত হয়।",
      exEn: "\"Sorry for the delay.\" — \"No problem at all.\"",
      exBn: "\"দেরির জন্য দুঃখিত।\" — \"কোনো সমস্যাই নেই।\"",
      microTitleEn: "The Wrong Bus",
      microTitleBn: "ভুল বাস",
      micro: [
        ["Rahim took the wrong bus and reached his friend's home late.", "রহিম ভুল বাসে উঠে বন্ধুর বাড়ি দেরি করে পৌঁছাল।"],
        ["\"I am sorry I am late,\" he said.", "\"দেরি হওয়ার জন্য দুঃখিত,\" সে বলল।"],
        ["His friend laughed and said, \"No problem! Come in.\"", "তার বন্ধু হেসে বলল, \"কোনো সমস্যা নেই! ভেতরে এসো।\""],
        ["They had a wonderful evening together.", "তারা একসঙ্গে চমৎকার একটি সন্ধ্যা কাটাল।"],
      ],
    },
    "after you": {
      defEn: "A polite expression used to let another person go through a door or pass first.",
      defBn: "দরজা দিয়ে বা পথে অন্যকে আগে যেতে দিতে ব্যবহৃত ভদ্র অভিব্যক্তি।",
      exEn: "At the door, the gentleman smiled and said, \"After you.\"",
      exBn: "দরজায় ভদ্রলোক হেসে বললেন, \"আপনি আগে যান।\"",
      microTitleEn: "At the Hospital Door",
      microTitleBn: "হাসপাতালের দরজায়",
      micro: [
        ["Rafi and an elderly man reached the hospital door together.", "রাফি ও এক বৃদ্ধ একসঙ্গে হাসপাতালের দরজায় পৌঁছালেন।"],
        ["Rafi opened the door and said, \"After you, please.\"", "রাফি দরজা খুলে বলল, \"আপনি আগে যান, অনুগ্রহ করে।\""],
        ["The old man thanked him with a warm smile.", "বৃদ্ধ আন্তরিক হাসি দিয়ে তাকে ধন্যবাদ জানালেন।"],
        ["Small polite words make a big difference.", "ছোট ছোট ভদ্র কথা বড় পার্থক্য গড়ে দেয়।"],
      ],
    },
    "thanks a lot": {
      defEn: "A warmer, stronger way of saying thank you.",
      defBn: "\"ধন্যবাদ\" বলার আরও আন্তরিক ও জোরালো রূপ।",
      exEn: "Thanks a lot for helping me with my homework.",
      exBn: "আমার বাড়ির কাজে সাহায্য করার জন্য অনেক অনেক ধন্যবাদ।",
      microTitleEn: "The Bicycle Repair",
      microTitleBn: "সাইকেল মেরামত",
      micro: [
        ["Mina's bicycle chain broke on the way to school.", "স্কুলে যাওয়ার পথে মিনার সাইকেলের চেইন ছিঁড়ে গেল।"],
        ["A mechanic nearby fixed it in five minutes.", "কাছের এক মিস্ত্রি পাঁচ মিনিটে তা ঠিক করে দিলেন।"],
        ["\"Thanks a lot!\" Mina said happily.", "\"অনেক ধন্যবাদ!\" মিনা খুশি হয়ে বলল।"],
        ["She reached school just before the bell.", "সে ঘণ্টা বাজার ঠিক আগেই স্কুলে পৌঁছাল।"],
      ],
    },
  },
  30: {
    tiger: {
      defEn: "A large wild cat with orange fur and black stripes; the national animal of Bangladesh.",
      defBn: "কমলা লোম ও কালো ডোরাকাটা বড় বন্য বিড়ালজাতীয় প্রাণী; বাংলাদেশের জাতীয় পশু।",
      exEn: "The Royal Bengal tiger lives in the Sundarbans.",
      exBn: "রয়েল বেঙ্গল টাইগার সুন্দরবনে বাস করে।",
      microTitleEn: "The Tiger of the Sundarbans",
      microTitleBn: "সুন্দরবনের বাঘ",
      micro: [
        ["Deep inside the Sundarbans, a tiger walked silently between the trees.", "সুন্দরবনের গভীরে একটি বাঘ গাছের ফাঁকে নীরবে হাঁটছিল।"],
        ["Its orange coat had bold black stripes.", "তার কমলা গায়ে ছিল গাঢ় কালো ডোরা।"],
        ["The forest animals became quiet when the tiger passed.", "বাঘটি যাওয়ার সময় বনের প্রাণীরা চুপ হয়ে গেল।"],
        ["The tiger is strong, but it needs our protection.", "বাঘ শক্তিশালী, কিন্তু তার আমাদের সুরক্ষা প্রয়োজন।"],
      ],
    },
    lion: {
      defEn: "A large wild cat with a golden mane, often called the king of the jungle.",
      defBn: "সোনালি কেশরওয়ালা বড় বন্য প্রাণী, যাকে জঙ্গলের রাজা বলা হয়।",
      exEn: "The lion roared loudly in the morning.",
      exBn: "সিংহটি সকালে জোরে গর্জন করল।",
      microTitleEn: "The Lion's Roar",
      microTitleBn: "সিংহের গর্জন",
      micro: [
        ["At the zoo, a big lion slept under a tree.", "চিড়িয়াখানায় একটি বড় সিংহ গাছের নিচে ঘুমাচ্ছিল।"],
        ["Suddenly it woke up and roared.", "হঠাৎ সে জেগে উঠে গর্জন করল।"],
        ["The children stepped back in surprise.", "শিশুরা বিস্ময়ে পিছিয়ে গেল।"],
        ["\"The lion is truly the king,\" Rafi whispered.", "\"সিংহ সত্যিই রাজা,\" রাফি ফিসফিস করে বলল।"],
      ],
    },
    elephant: {
      defEn: "The largest land animal, with a long trunk and big ears.",
      defBn: "স্থলের সবচেয়ে বড় প্রাণী, যার লম্বা শুঁড় ও বড় কান আছে।",
      exEn: "The elephant sprayed water with its trunk.",
      exBn: "হাতিটি তার শুঁড় দিয়ে পানি ছিটাল।",
      microTitleEn: "The Gentle Elephant",
      microTitleBn: "শান্ত হাতি",
      micro: [
        ["A huge elephant walked slowly through the forest.", "একটি বিশাল হাতি ধীরে ধীরে বনের মধ্য দিয়ে হাঁটছিল।"],
        ["It picked up grass with its long trunk.", "সে তার লম্বা শুঁড় দিয়ে ঘাস তুলল।"],
        ["A baby elephant followed its mother closely.", "একটি হাতির বাচ্চা তার মায়ের পেছন পেছন চলল।"],
        ["Elephants are gentle and very intelligent.", "হাতি শান্ত ও খুব বুদ্ধিমান প্রাণী।"],
      ],
    },
    deer: {
      defEn: "A graceful wild animal with long legs; the male often has antlers.",
      defBn: "লম্বা পা-ওয়ালা সুদৃশ্য বন্য প্রাণী; পুরুষটির প্রায়ই শিং থাকে।",
      exEn: "A spotted deer was drinking water by the river.",
      exBn: "একটি চিত্রা হরিণ নদীর ধারে পানি খাচ্ছিল।",
      microTitleEn: "Deer by the River",
      microTitleBn: "নদীর ধারে হরিণ",
      micro: [
        ["Early in the morning, a deer came to the river.", "ভোরে একটি হরিণ নদীর কাছে এল।"],
        ["It looked around carefully before drinking.", "পানি খাওয়ার আগে সে সাবধানে চারদিকে তাকাল।"],
        ["A small sound made it run into the forest.", "একটি ছোট শব্দে সে বনের ভেতর দৌড়ে গেল।"],
        ["Deer are fast and always alert.", "হরিণ দ্রুতগামী এবং সবসময় সতর্ক থাকে।"],
      ],
    },
    monkey: {
      defEn: "A clever animal with a long tail that climbs trees and loves fruit.",
      defBn: "লম্বা লেজওয়ালা চালাক প্রাণী, যা গাছে ওঠে এবং ফল পছন্দ করে।",
      exEn: "The monkey jumped from one branch to another.",
      exBn: "বানরটি এক ডাল থেকে আরেক ডালে লাফ দিল।",
      microTitleEn: "The Clever Monkey",
      microTitleBn: "চালাক বানর",
      micro: [
        ["A monkey sat on a mango tree near the village.", "গ্রামের কাছে একটি আম গাছে একটি বানর বসেছিল।"],
        ["It saw a ripe mango and picked it quickly.", "সে একটি পাকা আম দেখে দ্রুত ছিঁড়ে নিল।"],
        ["Then it shared pieces with a smaller monkey.", "তারপর সে ছোট একটি বানরের সঙ্গে আমের টুকরো ভাগ করে খেল।"],
        ["The villagers smiled at the clever monkey.", "গ্রামবাসী চালাক বানরটিকে দেখে হাসল।"],
      ],
    },
    bear: {
      defEn: "A large, heavy wild animal with thick fur and strong claws.",
      defBn: "ঘন লোম ও শক্ত নখওয়ালা বড়, ভারী বন্য প্রাণী।",
      exEn: "The bear was looking for honey in the forest.",
      exBn: "ভালুকটি বনে মধু খুঁজছিল।",
      microTitleEn: "The Bear and the Honey",
      microTitleBn: "ভালুক ও মধু",
      micro: [
        ["A big bear smelled something sweet in the forest.", "একটি বড় ভালুক বনে মিষ্টি কিছুর গন্ধ পেল।"],
        ["High on a tree, bees had made a honeycomb.", "গাছের উঁচুতে মৌমাছিরা মধুচাক বানিয়েছিল।"],
        ["The bear climbed up slowly and carefully.", "ভালুকটি ধীরে ও সাবধানে গাছে উঠল।"],
        ["At last, it tasted the sweet honey.", "অবশেষে সে মিষ্টি মধুর স্বাদ পেল।"],
      ],
    },
    fox: {
      defEn: "A small wild animal with a bushy tail, known for being clever.",
      defBn: "ঝোপসা লেজওয়ালা ছোট বন্য প্রাণী, চালাক হিসেবে পরিচিত।",
      exEn: "A fox ran across the field at dusk.",
      exBn: "সন্ধ্যাবেলা একটি শিয়াল মাঠ পেরিয়ে দৌড়ে গেল।",
      microTitleEn: "The Clever Fox",
      microTitleBn: "চালাক শিয়াল",
      micro: [
        ["One evening, a fox came near a farmer's house.", "এক সন্ধ্যায় একটি শিয়াল এক কৃষকের বাড়ির কাছে এল।"],
        ["It heard the hens and stopped quietly.", "সে মুরগির শব্দ শুনে চুপচাপ থামল।"],
        ["The farmer's dog barked loudly.", "কৃষকের কুকুর জোরে ঘেউ ঘেউ করল।"],
        ["The clever fox ran away into the dark field.", "চালাক শিয়ালটি অন্ধকার মাঠে দৌড়ে পালিয়ে গেল।"],
      ],
    },
    wolf: {
      defEn: "A wild animal like a large dog that lives and hunts in groups called packs.",
      defBn: "বড় কুকুরের মতো বন্য প্রাণী, যা দল বেঁধে থাকে ও শিকার করে।",
      exEn: "The wolf howled at the moon at night.",
      exBn: "নেকড়েটি রাতে চাঁদের দিকে তাকিয়ে ডাক দিল।",
      microTitleEn: "The Wolf Pack",
      microTitleBn: "নেকড়ের দল",
      micro: [
        ["Far away in the hills, a wolf lived with its pack.", "দূরের পাহাড়ে একটি নেকড়ে তার দল নিয়ে বাস করত।"],
        ["At night, the wolves howled together under the moon.", "রাতে নেকড়েগুলো চাঁদের নিচে একসঙ্গে ডাক দিল।"],
        ["They always stayed close and helped one another.", "তারা সবসময় কাছাকাছি থাকত এবং একে অপরকে সাহায্য করত।"],
        ["A pack is a wolf's family.", "দলই হলো নেকড়ের পরিবার।"],
      ],
    },
    snake: {
      defEn: "A long, thin reptile with no legs that moves by sliding on the ground.",
      defBn: "পা-বিহীন লম্বা, সরু সরীসৃপ, যা মাটিতে গড়িয়ে চলে।",
      exEn: "A green snake was hiding in the grass.",
      exBn: "একটি সবুজ সাপ ঘাসের মধ্যে লুকিয়ে ছিল।",
      microTitleEn: "The Snake in the Grass",
      microTitleBn: "ঘাসের মধ্যে সাপ",
      micro: [
        ["A long snake moved silently through the tall grass.", "একটি লম্বা সাপ লম্বা ঘাসের মধ্য দিয়ে নীরবে চলল।"],
        ["It had no legs, but it moved very fast.", "তার পা ছিল না, কিন্তু সে খুব দ্রুত চলত।"],
        ["The children watched it from a safe distance.", "শিশুরা নিরাপদ দূরত্ব থেকে তা দেখল।"],
        ["\"Never go near a wild snake,\" their teacher said.", "\"বন্য সাপের কাছে কখনো যেও না,\" তাদের শিক্ষক বললেন।"],
      ],
    },
    zebra: {
      defEn: "A wild animal like a horse with black and white stripes.",
      defBn: "ঘোড়ার মতো বন্য প্রাণী, যার গায়ে কালো-সাদা ডোরা আছে।",
      exEn: "Every zebra has a different pattern of stripes.",
      exBn: "প্রতিটি জেব্রার ডোরার নকশা আলাদা।",
      microTitleEn: "Stripes in the Sun",
      microTitleBn: "রোদে ডোরাকাটা",
      micro: [
        ["A zebra stood in the warm sun at the zoo.", "চিড়িয়াখানায় একটি জেব্রা গরম রোদে দাঁড়িয়ে ছিল।"],
        ["Its black and white stripes shone brightly.", "তার কালো-সাদা ডোরাগুলো উজ্জ্বলভাবে ঝলমল করছিল।"],
        ["Mina counted the stripes but lost count again and again.", "মিনা ডোরা গুনতে গিয়ে বারবার হিসাব হারিয়ে ফেলল।"],
        ["No two zebras have exactly the same stripes.", "কোনো দুটি জেব্রার ডোরা হুবহু এক রকম নয়।"],
      ],
    },
  },
  85: {
    head: {
      defEn: "The top part of the body, containing the brain, eyes, ears, nose and mouth.",
      defBn: "শরীরের সবচেয়ে উপরের অংশ, যেখানে মস্তিষ্ক, চোখ, কান, নাক ও মুখ থাকে।",
      exEn: "He nodded his head and smiled.",
      exBn: "সে মাথা নেড়ে হাসল।",
      microTitleEn: "The New Cap",
      microTitleBn: "নতুন টুপি",
      micro: [
        ["The sun was very hot at noon.", "দুপুরে রোদ খুব তীব্র ছিল।"],
        ["Rafi put a cap on his head before going out.", "বাইরে যাওয়ার আগে রাফি মাথায় টুপি পরল।"],
        ["The cap kept his head cool in the sun.", "টুপিটি রোদে তার মাথা ঠান্ডা রাখল।"],
        ["\"Always protect your head in strong sun,\" his father said.", "\"প্রখর রোদে সবসময় মাথা রক্ষা করো,\" তার বাবা বললেন।"],
      ],
    },
    hand: {
      defEn: "The part at the end of the arm, used for holding and touching things.",
      defBn: "বাহুর শেষের অংশ, যা দিয়ে জিনিস ধরা ও স্পর্শ করা হয়।",
      exEn: "Wash your hands before eating.",
      exBn: "খাওয়ার আগে হাত ধুয়ে নিন।",
      microTitleEn: "Helping Hands",
      microTitleBn: "সাহায্যের হাত",
      micro: [
        ["Grandmother was carrying a basket of vegetables.", "দাদী এক ঝুড়ি সবজি বয়ে নিয়ে যাচ্ছিলেন।"],
        ["Mina held the basket with both hands and helped her.", "মিনা দুই হাতে ঝুড়িটি ধরে তাকে সাহায্য করল।"],
        ["\"Your hands are small but strong,\" grandmother smiled.", "\"তোমার হাত ছোট কিন্তু শক্তিশালী,\" দাদী হেসে বললেন।"],
        ["Mina felt proud to help.", "সাহায্য করতে পেরে মিনা গর্ব বোধ করল।"],
      ],
    },
    leg: {
      defEn: "One of the two long parts of the body used for standing and walking.",
      defBn: "শরীরের দুটি লম্বা অংশের একটি, যা দাঁড়ানো ও হাঁটার কাজে লাগে।",
      exEn: "Football players have strong legs.",
      exBn: "ফুটবল খেলোয়াড়দের পা শক্তিশালী হয়।",
      microTitleEn: "The Race",
      microTitleBn: "দৌড় প্রতিযোগিতা",
      micro: [
        ["Arif ran in the school race on sports day.", "ক্রীড়া দিবসে আরিফ স্কুলের দৌড়ে অংশ নিল।"],
        ["His legs moved faster and faster.", "তার পা আরও দ্রুত চলতে লাগল।"],
        ["He finished second and everyone clapped.", "সে দ্বিতীয় হলো এবং সবাই হাততালি দিল।"],
        ["Running every morning makes the legs strong.", "প্রতিদিন সকালে দৌড়ালে পা শক্তিশালী হয়।"],
      ],
    },
    eye: {
      defEn: "One of the two organs on the face used for seeing.",
      defBn: "মুখের দুটি অঙ্গের একটি, যা দিয়ে দেখা হয়।",
      exEn: "She has beautiful brown eyes.",
      exBn: "তার সুন্দর বাদামি চোখ আছে।",
      microTitleEn: "Eyes on the Sky",
      microTitleBn: "আকাশের দিকে চোখ",
      micro: [
        ["At night, Nusrat looked at the sky with wide eyes.", "রাতে নুসরাত বড় বড় চোখে আকাশের দিকে তাকাল।"],
        ["Hundreds of stars were shining above.", "উপরে শত শত তারা জ্বলজ্বল করছিল।"],
        ["\"Our eyes are a wonderful gift,\" her mother said.", "\"আমাদের চোখ এক অসাধারণ উপহার,\" তার মা বললেন।"],
        ["Nusrat promised to take care of her eyes.", "নুসরাত তার চোখের যত্ন নেওয়ার প্রতিজ্ঞা করল।"],
      ],
    },
    ear: {
      defEn: "One of the two organs on the sides of the head used for hearing.",
      defBn: "মাথার দুই পাশের অঙ্গ, যা দিয়ে শোনা হয়।",
      exEn: "We hear music with our ears.",
      exBn: "আমরা কান দিয়ে গান শুনি।",
      microTitleEn: "Listening Ears",
      microTitleBn: "শোনার কান",
      micro: [
        ["The classroom was noisy in the morning.", "সকালে শ্রেণিকক্ষটি কোলাহলপূর্ণ ছিল।"],
        ["The teacher said, \"Open your ears and listen carefully.\"", "শিক্ষক বললেন, \"কান খুলে মনোযোগ দিয়ে শোনো।\""],
        ["Karim listened with both ears and heard every word.", "করিম দুই কান দিয়ে শুনল এবং প্রতিটি শব্দ শুনতে পেল।"],
        ["Good listeners learn faster.", "ভালো শ্রোতারা দ্রুত শেখে।"],
      ],
    },
    nose: {
      defEn: "The part of the face used for breathing and smelling.",
      defBn: "মুখের সেই অংশ, যা দিয়ে শ্বাস নেওয়া ও গন্ধ শোঁকা হয়।",
      exEn: "The baby has a small nose.",
      exBn: "শিশুটির ছোট একটি নাক আছে।",
      microTitleEn: "The Nose Knows",
      microTitleBn: "নাক জানে",
      micro: [
        ["A sweet smell came from the kitchen.", "রান্নাঘর থেকে একটি মিষ্টি গন্ধ এল।"],
        ["Suma's nose told her that mother was cooking payesh.", "সুমার নাক তাকে জানিয়ে দিল যে মা পায়েস রাঁধছেন।"],
        ["She ran to the kitchen happily.", "সে খুশি হয়ে রান্নাঘরে দৌড়ে গেল।"],
        ["Her nose was right — the payesh was ready!", "তার নাক ঠিকই বলেছিল — পায়েস তৈরি!"],
      ],
    },
    mouth: {
      defEn: "The opening in the face used for eating, drinking and speaking.",
      defBn: "মুখের সেই ছিদ্র, যা দিয়ে খাওয়া, পান করা ও কথা বলা হয়।",
      exEn: "Open your mouth and say \"ah\".",
      exBn: "মুখ খুলে \"আ\" বলুন।",
      microTitleEn: "At the Dentist",
      microTitleBn: "দাঁতের ডাক্তারের কাছে",
      micro: [
        ["Tanvir sat on the dentist's chair nervously.", "তানভীর ঘাবড়ে দাঁতের ডাক্তারের চেয়ারে বসল।"],
        ["\"Open your mouth, please,\" the dentist said gently.", "\"মুখ খুলুন, অনুগ্রহ করে,\" ডাক্তার কোমলভাবে বললেন।"],
        ["The check-up finished in two minutes.", "দুই মিনিটে পরীক্ষা শেষ হলো।"],
        ["\"Brush twice a day to keep your mouth healthy,\" the dentist smiled.", "\"মুখ সুস্থ রাখতে দিনে দুবার ব্রাশ করুন,\" ডাক্তার হেসে বললেন।"],
      ],
    },
    hair: {
      defEn: "The thin strands that grow on the head and parts of the body.",
      defBn: "মাথা ও শরীরের অংশে গজানো সরু সুতোর মতো অংশ।",
      exEn: "She combs her hair every morning.",
      exBn: "সে প্রতিদিন সকালে চুল আঁচড়ায়।",
      microTitleEn: "Grandmother's Hair",
      microTitleBn: "দাদীর চুল",
      micro: [
        ["Grandmother's long hair had turned silver.", "দাদীর লম্বা চুল রুপালি হয়ে গিয়েছিল।"],
        ["Every evening, little Rina combed her hair gently.", "প্রতিদিন সন্ধ্যায় ছোট্ট রিনা কোমলভাবে তার চুল আঁচড়ে দিত।"],
        ["Grandmother told stories while Rina combed.", "রিনা চুল আঁচড়ানোর সময় দাদী গল্প বলতেন।"],
        ["Those evenings were Rina's favourite time of day.", "সেই সন্ধ্যাগুলো ছিল রিনার দিনের প্রিয় সময়।"],
      ],
    },
    finger: {
      defEn: "One of the five long thin parts at the end of each hand.",
      defBn: "প্রতিটি হাতের শেষের পাঁচটি লম্বা সরু অংশের একটি।",
      exEn: "Count on your fingers: one, two, three.",
      exBn: "আঙুলে গুনুন: এক, দুই, তিন।",
      microTitleEn: "Counting Fingers",
      microTitleBn: "আঙুলে গোনা",
      micro: [
        ["Little Sami was learning to count at school.", "ছোট্ট সামি স্কুলে গুনতে শিখছিল।"],
        ["He counted the apples on his fingers: one, two, three, four, five.", "সে আঙুলে আপেল গুনল: এক, দুই, তিন, চার, পাঁচ।"],
        ["\"My fingers are my first calculator!\" he laughed.", "\"আমার আঙুলই আমার প্রথম ক্যালকুলেটর!\" সে হেসে বলল।"],
        ["The teacher clapped for him.", "শিক্ষক তার জন্য হাততালি দিলেন।"],
      ],
    },
    foot: {
      defEn: "The flat part at the end of the leg that touches the ground when standing or walking.",
      defBn: "পায়ের শেষের চ্যাপ্টা অংশ, যা দাঁড়ানো বা হাঁটার সময় মাটি স্পর্শ করে।",
      exEn: "His feet were tired after the long walk.",
      exBn: "দীর্ঘ হাঁটার পর তার পা ক্লান্ত হয়ে গিয়েছিল।",
      microTitleEn: "Bare Feet on the Grass",
      microTitleBn: "ঘাসে খালি পা",
      micro: [
        ["In the morning, the grass was wet with dew.", "সকালে ঘাস শিশিরে ভেজা ছিল।"],
        ["Rafi walked on it with bare feet.", "রাফি খালি পায়ে তার উপর হাঁটল।"],
        ["The cold grass felt wonderful under his feet.", "ঠান্ডা ঘাস তার পায়ের নিচে চমৎকার লাগছিল।"],
        ["Walking barefoot on grass is good for health, people say.", "লোকে বলে, ঘাসে খালি পায়ে হাঁটা স্বাস্থ্যের জন্য ভালো।"],
      ],
    },
  },
  125: {
    "i need water": {
      defEn: "A sentence used to say that you require water, usually because you are thirsty.",
      defBn: "পানির প্রয়োজন বোঝাতে ব্যবহৃত বাক্য, সাধারণত তৃষ্ণা পেলে।",
      exEn: "It is very hot today. I need water.",
      exBn: "আজ খুব গরম। আমার পানি প্রয়োজন।",
      microTitleEn: "After the Game",
      microTitleBn: "খেলার পরে",
      micro: [
        ["Rafi played football for one hour in the sun.", "রাফি রোদে এক ঘণ্টা ফুটবল খেলল।"],
        ["He came home tired and thirsty.", "সে ক্লান্ত ও তৃষ্ণার্ত হয়ে বাড়ি ফিরল।"],
        ["\"Mother, I need water, please,\" he said.", "\"মা, আমার পানি প্রয়োজন, অনুগ্রহ করে,\" সে বলল।"],
        ["He drank two glasses of cool water happily.", "সে খুশি হয়ে দুই গ্লাস ঠান্ডা পানি খেল।"],
      ],
      grammar: {
        pattern: "I need + noun",
        explainBn: "কোনো জিনিসের প্রয়োজন বোঝাতে \"I need\"-এর পরে জিনিসটির নাম বসে।",
        more: [
          ["I need food.", "আমার খাবার প্রয়োজন।"],
          ["I need a rest.", "আমার বিশ্রাম প্রয়োজন।"],
        ],
      },
    },
    "i don't need help": {
      defEn: "A polite sentence used to say that you can manage something by yourself.",
      defBn: "নিজে নিজে কোনো কাজ সামলাতে পারবেন বোঝাতে ব্যবহৃত ভদ্র বাক্য।",
      exEn: "Thank you, but I don't need help with this box.",
      exBn: "ধন্যবাদ, কিন্তু এই বাক্সটির জন্য আমার সাহায্য প্রয়োজন নেই।",
      microTitleEn: "I Can Do It",
      microTitleBn: "আমি পারব",
      micro: [
        ["Mina was tying her shoelaces slowly.", "মিনা ধীরে ধীরে তার জুতার ফিতা বাঁধছিল।"],
        ["Her brother came and said, \"Let me help you.\"", "তার ভাই এসে বলল, \"আমি সাহায্য করি।\""],
        ["\"Thank you, but I don't need help. I can do it,\" Mina said.", "\"ধন্যবাদ, কিন্তু আমার সাহায্য লাগবে না। আমি পারব,\" মিনা বলল।"],
        ["Soon her laces were tied perfectly.", "শীঘ্রই তার ফিতা সুন্দরভাবে বাঁধা হয়ে গেল।"],
      ],
      grammar: {
        pattern: "I don't need + noun",
        explainBn: "প্রয়োজন নেই বোঝাতে \"don't need\" ব্যবহার করা হয়; এটি \"do not need\"-এর সংক্ষিপ্ত রূপ।",
        more: [
          ["I don't need money now.", "আমার এখন টাকা প্রয়োজন নেই।"],
          ["I don't need an umbrella today.", "আমার আজ ছাতা প্রয়োজন নেই।"],
        ],
      },
    },
    "i must study": {
      defEn: "A sentence expressing a strong duty or necessity to study.",
      defBn: "পড়াশোনা করার কঠোর প্রয়োজন বা দায়িত্ব বোঝানো বাক্য।",
      exEn: "The exam is tomorrow, so I must study tonight.",
      exBn: "আগামীকাল পরীক্ষা, তাই আজ রাতে আমাকে অবশ্যই পড়তে হবে।",
      microTitleEn: "The Night Before the Exam",
      microTitleBn: "পরীক্ষার আগের রাত",
      micro: [
        ["Tomorrow is Arif's English exam.", "আগামীকাল আরিফের ইংরেজি পরীক্ষা।"],
        ["His friends called him to play outside.", "তার বন্ধুরা তাকে বাইরে খেলতে ডাকল।"],
        ["\"I must study tonight,\" Arif told them.", "\"আজ রাতে আমাকে অবশ্যই পড়তে হবে,\" আরিফ তাদের বলল।"],
        ["He studied for two hours and slept early.", "সে দুই ঘণ্টা পড়ল এবং তাড়াতাড়ি ঘুমিয়ে পড়ল।"],
      ],
      grammar: {
        pattern: "I must + base verb",
        explainBn: "\"must\"-এর পরে ক্রিয়ার মূল রূপ বসে; এটি \"need to\"-এর চেয়ে শক্তিশালী বাধ্যবাধকতা বোঝায়।",
        more: [
          ["I must go now.", "আমাকে এখন অবশ্যই যেতে হবে।"],
          ["I must finish this work.", "আমাকে অবশ্যই এই কাজ শেষ করতে হবে।"],
        ],
      },
    },
    "important work": {
      defEn: "Work that matters a lot and needs care and attention.",
      defBn: "এমন কাজ যা খুব গুরুত্বপূর্ণ এবং যত্ন ও মনোযোগ দরকার।",
      exEn: "Please do not disturb him; he is doing important work.",
      exBn: "অনুগ্রহ করে তাকে বিরক্ত করবেন না; সে গুরুত্বপূর্ণ কাজ করছে।",
      microTitleEn: "Father's Important Work",
      microTitleBn: "বাবার গুরুত্বপূর্ণ কাজ",
      micro: [
        ["Father was writing a report at his desk.", "বাবা তার ডেস্কে একটি প্রতিবেদন লিখছিলেন।"],
        ["\"This is important work, so I need quiet,\" he said.", "\"এটি গুরুত্বপূর্ণ কাজ, তাই আমার নিরিবিলি দরকার,\" তিনি বললেন।"],
        ["The children played softly in the other room.", "শিশুরা অন্য ঘরে আস্তে আস্তে খেলল।"],
        ["In one hour, the important work was finished.", "এক ঘণ্টায় গুরুত্বপূর্ণ কাজটি শেষ হলো।"],
      ],
    },
    "necessary documents": {
      defEn: "Official papers that are needed for a particular purpose, such as travel or a job application.",
      defBn: "কোনো নির্দিষ্ট কাজের জন্য প্রয়োজনীয় সরকারি কাগজপত্র, যেমন ভ্রমণ বা চাকরির আবেদনের জন্য।",
      exEn: "Keep all necessary documents in one folder before your journey.",
      exBn: "যাত্রার আগে সব প্রয়োজনীয় কাগজপত্র একটি ফোল্ডারে রাখুন।",
      microTitleEn: "Before the Journey",
      microTitleBn: "যাত্রার আগে",
      micro: [
        ["Karim was going abroad for the first time.", "করিম প্রথমবার বিদেশ যাচ্ছিল।"],
        ["His elder sister checked his necessary documents one by one.", "তার বড় বোন একে একে তার প্রয়োজনীয় কাগজপত্র যাচাই করলেন।"],
        ["Passport, ticket and visa — everything was ready.", "পাসপোর্ট, টিকিট ও ভিসা — সব তৈরি ছিল।"],
        ["\"Keep the documents in your hand bag,\" she advised.", "\"কাগজপত্র হাতের ব্যাগে রেখো,\" তিনি পরামর্শ দিলেন।"],
      ],
    },
    "i need rest": {
      defEn: "A sentence used to say that your body or mind needs to relax and recover.",
      defBn: "শরীর বা মনের বিশ্রাম ও পুনরুদ্ধার প্রয়োজন বোঝানো বাক্য।",
      exEn: "After the long journey, I need rest.",
      exBn: "দীর্ঘ যাত্রার পর আমার বিশ্রাম প্রয়োজন।",
      microTitleEn: "A Tired Traveller",
      microTitleBn: "এক ক্লান্ত যাত্রী",
      micro: [
        ["Suma travelled all night by bus from her village.", "সুমা সারা রাত বাসে করে গ্রাম থেকে যাত্রা করল।"],
        ["She reached Dhaka early in the morning.", "সে ভোরে ঢাকায় পৌঁছাল।"],
        ["\"I need rest now,\" she said and lay down.", "\"আমার এখন বিশ্রাম প্রয়োজন,\" সে বলল এবং শুয়ে পড়ল।"],
        ["After two hours of sleep, she felt fresh again.", "দুই ঘণ্টা ঘুমের পর সে আবার সতেজ বোধ করল।"],
      ],
      grammar: {
        pattern: "I need + noun (rest / sleep / help / time)",
        explainBn: "বিশ্রাম, ঘুম, সাহায্য বা সময়ের মতো জিনিসের প্রয়োজন সরাসরি \"I need + noun\" দিয়ে বলা যায়।",
        more: [
          ["I need sleep.", "আমার ঘুম প্রয়োজন।"],
          ["I need more time.", "আমার আরও সময় প্রয়োজন।"],
        ],
      },
    },
    "i need to sleep early": {
      defEn: "A sentence used to say that you must go to bed early, often because of an early start next day.",
      defBn: "তাড়াতাড়ি ঘুমানো প্রয়োজন বোঝানো বাক্য, প্রায়ই পরদিন ভোরে ওঠার কারণে।",
      exEn: "My train is at 5 a.m., so I need to sleep early.",
      exBn: "আমার ট্রেন ভোর ৫টায়, তাই আমাকে তাড়াতাড়ি ঘুমাতে হবে।",
      microTitleEn: "Early to Bed",
      microTitleBn: "তাড়াতাড়ি ঘুম",
      micro: [
        ["Nusrat has a school picnic tomorrow at six in the morning.", "নুসরাতের আগামীকাল সকাল ছয়টায় স্কুল পিকনিক আছে।"],
        ["\"I need to sleep early tonight,\" she told her mother.", "\"আজ রাতে আমাকে তাড়াতাড়ি ঘুমাতে হবে,\" সে তার মাকে বলল।"],
        ["She packed her bag and went to bed at nine.", "সে ব্যাগ গুছিয়ে নয়টায় ঘুমাতে গেল।"],
        ["In the morning, she woke up fresh and happy.", "সকালে সে সতেজ ও খুশি হয়ে জাগল।"],
      ],
      grammar: {
        pattern: "I need to + base verb",
        explainBn: "কোনো কাজ করা প্রয়োজন বোঝাতে \"need to\"-এর পরে ক্রিয়ার মূল রূপ বসে।",
        more: [
          ["I need to study.", "আমাকে পড়তে হবে।"],
          ["I need to call my friend.", "আমাকে আমার বন্ধুকে ফোন করতে হবে।"],
        ],
      },
    },
    "i need a pen": {
      defEn: "A sentence used to ask for or state the need for a pen.",
      defBn: "একটি কলমের প্রয়োজন বলতে বা চাইতে ব্যবহৃত বাক্য।",
      exEn: "I need a pen to write my name here.",
      exBn: "এখানে আমার নাম লিখতে একটি কলম প্রয়োজন।",
      microTitleEn: "The Missing Pen",
      microTitleBn: "হারানো কলম",
      micro: [
        ["The teacher asked everyone to write their names.", "শিক্ষক সবাইকে তাদের নাম লিখতে বললেন।"],
        ["Rafi looked in his bag, but his pen was missing.", "রাফি তার ব্যাগে খুঁজল, কিন্তু কলমটি ছিল না।"],
        ["\"Excuse me, I need a pen,\" he told his friend.", "\"মাফ করবেন, আমার একটি কলম প্রয়োজন,\" সে তার বন্ধুকে বলল।"],
        ["His friend gave him a pen with a smile.", "তার বন্ধু হেসে তাকে একটি কলম দিল।"],
      ],
      grammar: {
        pattern: "I need a / an + singular noun",
        explainBn: "একটি মাত্র জিনিসের প্রয়োজন হলে \"need\"-এর পরে a/an বসে।",
        more: [
          ["I need a book.", "আমার একটি বই প্রয়োজন।"],
          ["I need an umbrella.", "আমার একটি ছাতা প্রয়োজন।"],
        ],
      },
    },
    "i don't need this bag": {
      defEn: "A sentence used to say that a particular bag is not necessary for you.",
      defBn: "নির্দিষ্ট একটি ব্যাগ প্রয়োজন নেই বোঝাতে ব্যবহৃত বাক্য।",
      exEn: "I don't need this bag; I have a smaller one.",
      exBn: "আমার এই ব্যাগ প্রয়োজন নেই; আমার ছোট একটি আছে।",
      microTitleEn: "Packing Light",
      microTitleBn: "হালকা গোছগাছ",
      micro: [
        ["Tanvir was packing for a two-day trip.", "তানভীর দুই দিনের ভ্রমণের জন্য গোছগাছ করছিল।"],
        ["His mother brought a big heavy bag.", "তার মা একটি বড় ভারী ব্যাগ নিয়ে এলেন।"],
        ["\"I don't need this bag, Mother. A small one is enough,\" he said.", "\"আমার এই ব্যাগ লাগবে না, মা। ছোট একটিই যথেষ্ট,\" সে বলল।"],
        ["He travelled light and felt free.", "সে হালকা ভ্রমণ করল এবং মুক্ত বোধ করল।"],
      ],
      grammar: {
        pattern: "I don't need this / that + noun",
        explainBn: "কাছের জিনিসের জন্য \"this\", দূরের জন্য \"that\" ব্যবহার করে নির্দিষ্ট জিনিসের অপ্রয়োজন বোঝানো হয়।",
        more: [
          ["I don't need this book now.", "আমার এখন এই বই প্রয়োজন নেই।"],
          ["I don't need that chair.", "আমার ওই চেয়ার প্রয়োজন নেই।"],
        ],
      },
    },
    "i need to call my friend": {
      defEn: "A sentence used to say that you have to phone your friend.",
      defBn: "বন্ধুকে ফোন করা প্রয়োজন বোঝানো বাক্য।",
      exEn: "I need to call my friend about tomorrow's class.",
      exBn: "আগামীকালের ক্লাস সম্পর্কে আমার বন্ধুকে ফোন করতে হবে।",
      microTitleEn: "The Important Call",
      microTitleBn: "গুরুত্বপূর্ণ ফোন",
      micro: [
        ["The class time changed suddenly in the evening.", "সন্ধ্যায় হঠাৎ ক্লাসের সময় বদলে গেল।"],
        ["Rina remembered her friend did not know about it.", "রিনার মনে পড়ল তার বন্ধু এ সম্পর্কে জানে না।"],
        ["\"I need to call my friend right now,\" she said.", "\"আমাকে এখনই আমার বন্ধুকে ফোন করতে হবে,\" সে বলল।"],
        ["Her friend thanked her for the call.", "ফোনের জন্য তার বন্ধু তাকে ধন্যবাদ জানাল।"],
      ],
      grammar: {
        pattern: "I need to + verb + object",
        explainBn: "\"need to\"-এর পরে কাজটি ও তারপরে কাজের লক্ষ্য (object) বসে।",
        more: [
          ["I need to meet my teacher.", "আমাকে আমার শিক্ষকের সঙ্গে দেখা করতে হবে।"],
          ["I need to buy a ticket.", "আমাকে একটি টিকিট কিনতে হবে।"],
        ],
      },
    },
  },
  3: {
    party: {
      defEn: "A social gathering of people for enjoyment, with food, music and conversation.",
      defBn: "খাবার, গান ও আড্ডাসহ আনন্দের জন্য মানুষের সামাজিক জমায়েত।",
      exEn: "We had a small party at home on Friday evening.",
      exBn: "শুক্রবার সন্ধ্যায় আমাদের বাড়িতে ছোট একটি পার্টি হয়েছিল।",
      microTitleEn: "The Surprise Party",
      microTitleBn: "আশ্চর্য পার্টি",
      micro: [
        ["It was Grandmother's seventieth birthday.", "দাদির সত্তরতম জন্মদিন ছিল।"],
        ["The family planned a secret party for her.", "পরিবার তার জন্য গোপনে একটি পার্টির পরিকল্পনা করল।"],
        ["When she entered the room, everyone shouted, \"Surprise!\"", "তিনি ঘরে ঢুকতেই সবাই চিৎকার করল, \"আশ্চর্য!\""],
        ["Grandmother laughed with tears of joy in her eyes.", "দাদি আনন্দের অশ্রু চোখে হাসলেন।"],
      ],
    },
    celebrate: {
      defEn: "To do something special or enjoyable to mark an important day or event.",
      defBn: "কোনো গুরুত্বপূর্ণ দিন বা ঘটনা উপলক্ষে বিশেষ আনন্দ করা।",
      exEn: "We celebrate Eid with our whole family.",
      exBn: "আমরা পুরো পরিবার নিয়ে ঈদ উদযাপন করি।",
      microTitleEn: "The Exam Result",
      microTitleBn: "পরীক্ষার ফল",
      micro: [
        ["Nusrat passed her exam with very good marks.", "নুসরাত খুব ভালো নম্বর পেয়ে পরীক্ষায় পাস করল।"],
        ["Her family wanted to celebrate the happy news.", "তার পরিবার সুখবরটি উদযাপন করতে চাইল।"],
        ["Mother cooked special food and father brought sweets.", "মা বিশেষ খাবার রাঁধলেন আর বাবা মিষ্টি আনলেন।"],
        ["They celebrated together till late evening.", "তারা সন্ধ্যা পর্যন্ত একসঙ্গে উদযাপন করল।"],
      ],
    },
    birthday: {
      defEn: "The day each year that marks the date when a person was born.",
      defBn: "প্রতি বছর যে দিনটি কোনো ব্যক্তির জন্মতারিখ স্মরণ করে।",
      exEn: "My birthday is on the fifth of June.",
      exBn: "আমার জন্মদিন জুন মাসের পাঁচ তারিখে।",
      microTitleEn: "Rafi's Birthday",
      microTitleBn: "রাফির জন্মদিন",
      micro: [
        ["Today is Rafi's birthday.", "আজ রাফির জন্মদিন।"],
        ["He is ten years old now.", "তার বয়স এখন দশ বছর।"],
        ["His friends came with a big cake in the afternoon.", "বিকেলে তার বন্ধুরা বড় একটি কেক নিয়ে এল।"],
        ["Rafi cut the cake and thanked everyone.", "রাফি কেক কেটে সবাইকে ধন্যবাদ জানাল।"],
      ],
    },
    cake: {
      defEn: "A sweet baked food made from flour, sugar, eggs and butter.",
      defBn: "আটা, চিনি, ডিম ও মাখন দিয়ে তৈরি মিষ্টি বেক করা খাবার।",
      exEn: "Mother made a chocolate cake for the party.",
      exBn: "মা পার্টির জন্য চকলেট কেক বানালেন।",
      microTitleEn: "The First Cake",
      microTitleBn: "প্রথম কেক",
      micro: [
        ["Mina wanted to bake a cake for the first time.", "মিনা প্রথমবারের মতো কেক বানাতে চাইল।"],
        ["She mixed flour, sugar and eggs in a big bowl.", "সে একটি বড় বাটিতে আটা, চিনি ও ডিম মেশাল।"],
        ["The cake came out soft and golden.", "কেকটি নরম ও সোনালি হলো।"],
        ["Everyone said it was delicious.", "সবাই বলল এটি খুব সুস্বাদু।"],
      ],
    },
    gift: {
      defEn: "Something you give to someone freely, without asking for payment, to show love or thanks.",
      defBn: "ভালোবাসা বা কৃতজ্ঞতা দেখাতে কাউকে বিনামূল্যে দেওয়া জিনিস।",
      exEn: "He gave his sister a book as a gift.",
      exBn: "সে তার বোনকে উপহার হিসেবে একটি বই দিল।",
      microTitleEn: "A Gift for Mother",
      microTitleBn: "মায়ের জন্য উপহার",
      micro: [
        ["Arif saved his pocket money for two months.", "আরিফ দুই মাস ধরে তার হাতখরচের টাকা জমাল।"],
        ["He bought a beautiful scarf as a gift for his mother.", "সে তার মায়ের জন্য উপহার হিসেবে একটি সুন্দর স্কার্ফ কিনল।"],
        ["Mother hugged him and said, \"This is the best gift.\"", "মা তাকে জড়িয়ে ধরে বললেন, \"এটিই সেরা উপহার।\""],
        ["Arif felt happier giving than receiving.", "আরিফ পাওয়ার চেয়ে দিতেই বেশি খুশি হলো।"],
      ],
    },
    balloon: {
      defEn: "A thin rubber bag filled with air or gas, used as a decoration or toy.",
      defBn: "বাতাস বা গ্যাস ভরা পাতলা রাবারের থলি, সাজসজ্জা বা খেলনা হিসেবে ব্যবহৃত হয়।",
      exEn: "The children played with red and blue balloons.",
      exBn: "শিশুরা লাল ও নীল বেলুন নিয়ে খেলল।",
      microTitleEn: "The Flying Balloon",
      microTitleBn: "উড়ে যাওয়া বেলুন",
      micro: [
        ["Little Tanisha bought a yellow balloon at the fair.", "ছোট্ট তানিশা মেলায় একটি হলুদ বেলুন কিনল।"],
        ["Suddenly the string slipped from her hand.", "হঠাৎ সুতোটি তার হাত থেকে ফসকে গেল।"],
        ["The balloon flew up into the blue sky.", "বেলুনটি নীল আকাশে উড়ে গেল।"],
        ["Her brother bought her another one, and she held it tightly.", "তার ভাই তাকে আরেকটি কিনে দিল, আর সে এটি শক্ত করে ধরল।"],
      ],
    },
    music: {
      defEn: "Sounds arranged in a pleasant way, made by voices or instruments, that people enjoy listening to.",
      defBn: "কণ্ঠ বা বাদ্যযন্ত্রে তৈরি সাজানো সুর, যা শুনতে মানুষ উপভোগ করে।",
      exEn: "Soft music was playing at the celebration.",
      exBn: "উদযাপনে মৃদু সংগীত বাজছিল।",
      microTitleEn: "Music in the Rain",
      microTitleBn: "বৃষ্টিতে সংগীত",
      micro: [
        ["It was raining outside, and the house was quiet.", "বাইরে বৃষ্টি হচ্ছিল, আর বাড়ি ছিল নীরব।"],
        ["Grandfather played his old harmonium softly.", "দাদা তার পুরনো হারমোনিয়াম মৃদু সুরে বাজালেন।"],
        ["The music made the rainy evening feel warm.", "সংগীত বৃষ্টিভেজা সন্ধ্যাটিকে উষ্ণ করে তুলল।"],
        ["Everyone sat together and listened happily.", "সবাই একসঙ্গে বসে আনন্দে শুনল।"],
      ],
    },
    dance: {
      defEn: "Moving your body to music in a rhythmic and enjoyable way.",
      defBn: "সংগীতের তালে তালে শরীর নাড়িয়ে আনন্দ করা।",
      exEn: "The girls performed a traditional dance at the school function.",
      exBn: "মেয়েরা স্কুলের অনুষ্ঠানে ঐতিহ্যবাহী নাচ পরিবেশন করল।",
      microTitleEn: "The School Dance",
      microTitleBn: "স্কুলের নাচ",
      micro: [
        ["Suma loved to dance since she was five.", "সুমা পাঁচ বছর বয়স থেকেই নাচ ভালোবাসত।"],
        ["She practised her dance every evening for a month.", "সে এক মাস ধরে প্রতিদিন সন্ধ্যায় নাচ অনুশীলন করল।"],
        ["On the stage, she danced with a bright smile.", "মঞ্চে সে উজ্জ্বল হাসি নিয়ে নাচল।"],
        ["The audience clapped loudly at the end.", "শেষে দর্শকরা জোরে হাততালি দিল।"],
      ],
    },
    invitation: {
      defEn: "A spoken or written request asking someone to come to an event or visit a place.",
      defBn: "কাউকে কোনো অনুষ্ঠানে আসতে বা কোথাও যেতে বলা মৌখিক বা লিখিত অনুরোধ।",
      exEn: "We received an invitation to their wedding.",
      exBn: "আমরা তাদের বিয়ের আমন্ত্রণ পেয়েছি।",
      microTitleEn: "The Invitation Card",
      microTitleBn: "আমন্ত্রণ কার্ড",
      micro: [
        ["Karim's cousin was getting married next month.", "করিমের চাচাতো বোনের আগামী মাসে বিয়ে।"],
        ["An invitation card arrived at their home today.", "আজ তাদের বাড়িতে একটি আমন্ত্রণ কার্ড এল।"],
        ["The whole family was invited to the wedding.", "পুরো পরিবার বিয়েতে আমন্ত্রিত হলো।"],
        ["Karim was excited to wear his new panjabi.", "করিম তার নতুন পাঞ্জাবি পরতে উত্তেজিত হলো।"],
      ],
    },
    congratulations: {
      defEn: "Words used to praise someone for an achievement or good luck.",
      defBn: "কারো সাফল্য বা সৌভাগ্যের জন্য প্রশংসা জানাতে ব্যবহৃত শব্দ।",
      exEn: "Congratulations on passing your exam!",
      exBn: "পরীক্ষায় পাস করার জন্য অভিনন্দন!",
      microTitleEn: "The Prize",
      microTitleBn: "পুরস্কার",
      micro: [
        ["Farhan won the first prize in the drawing competition.", "ফারহান ছবি আঁকার প্রতিযোগিতায় প্রথম পুরস্কার পেল।"],
        ["His teachers and friends said, \"Congratulations!\"", "তার শিক্ষক ও বন্ধুরা বলল, \"অভিনন্দন!\""],
        ["Farhan thanked everyone with a shy smile.", "ফারহান লাজুক হেসে সবাইকে ধন্যবাদ জানাল।"],
        ["He gave the prize to his mother at home.", "বাড়িতে গিয়ে সে পুরস্কারটি তার মাকে দিল।"],
      ],
    },
  },
  4: {
    peace: {
      defEn: "A state of calm and quiet, without war, fighting or worry.",
      defBn: "যুদ্ধ, ঝগড়া বা দুশ্চিন্তা ছাড়া শান্ত ও নীরব অবস্থা।",
      exEn: "People in the village live in peace.",
      exBn: "গ্রামের মানুষ শান্তিতে বাস করে।",
      microTitleEn: "The Quiet Village",
      microTitleBn: "শান্ত গ্রাম",
      micro: [
        ["There is a small village beside the river.", "নদীর পাশে একটি ছোট গ্রাম আছে।"],
        ["People there help each other and never fight.", "সেখানকার মানুষ একে অপরকে সাহায্য করে এবং কখনো ঝগড়া করে না।"],
        ["The village is full of peace.", "গ্রামটি শান্তিতে ভরা।"],
        ["Visitors say it is the happiest place they know.", "অতিথিরা বলে এটি তাদের জানা সবচেয়ে সুখী জায়গা।"],
      ],
    },
    love: {
      defEn: "A strong, deep feeling of care and affection for someone or something.",
      defBn: "কারো বা কোনো কিছুর প্রতি গভীর যত্ন ও স্নেহের অনুভূতি।",
      exEn: "A mother's love is like no other.",
      exBn: "মায়ের ভালোবাসার তুলনা হয় না।",
      microTitleEn: "The Old Tree",
      microTitleBn: "পুরনো গাছ",
      micro: [
        ["An old mango tree stood in Rahim's yard.", "রহিমের উঠানে একটি পুরনো আমগাছ ছিল।"],
        ["His grandfather planted it with love many years ago.", "তার দাদা অনেক বছর আগে ভালোবেসে এটি লাগিয়েছিলেন।"],
        ["Every summer the family eats mangoes under its shade.", "প্রতি গ্রীষ্মে পরিবার এর ছায়ায় বসে আম খায়।"],
        ["The tree is a gift of love from the past.", "গাছটি অতীত থেকে পাওয়া ভালোবাসার উপহার।"],
      ],
    },
    kindness: {
      defEn: "The quality of being gentle, caring and helpful to others.",
      defBn: "অন্যের প্রতি কোমল, যত্নশীল ও সহায়ক হওয়ার গুণ।",
      exEn: "Her kindness to strangers made everyone respect her.",
      exBn: "অপরিচিতদের প্রতি তার দয়া সবাইকে তাকে সম্মান করতে শেখাল।",
      microTitleEn: "The Rickshaw Puller",
      microTitleBn: "রিকশাওয়ালা",
      micro: [
        ["An old man could not cross the busy road.", "এক বৃদ্ধ ব্যস্ত রাস্তা পার হতে পারছিলেন না।"],
        ["A young rickshaw puller stopped and helped him cross.", "এক তরুণ রিকশাওয়ালা থেমে তাকে রাস্তা পার করে দিল।"],
        ["His small kindness made the old man smile.", "তার ছোট্ট দয়া বৃদ্ধকে হাসাল।"],
        ["Kindness costs nothing but means everything.", "দয়ার কোনো দাম নেই, কিন্তু অর্থ সবকিছু।"],
      ],
    },
    help: {
      defEn: "To do something useful for someone who needs support.",
      defBn: "সাহায্য প্রয়োজন এমন কারো জন্য উপকারী কিছু করা।",
      exEn: "Can you help me carry this bag?",
      exBn: "তুমি কি আমাকে এই ব্যাগটি বইতে সাহায্য করতে পারো?",
      microTitleEn: "Help in the Field",
      microTitleBn: "মাঠে সাহায্য",
      micro: [
        ["Farmer Jamal was cutting paddy alone in the field.", "কৃষক জামাল মাঠে একা ধান কাটছিলেন।"],
        ["His neighbours came to help him before the rain.", "বৃষ্টির আগে তার প্রতিবেশীরা তাকে সাহায্য করতে এল।"],
        ["Together they finished the work in one day.", "একসঙ্গে তারা একদিনেই কাজ শেষ করল।"],
        ["\"Many hands make work light,\" Jamal said.", "\"অনেক হাতে কাজ হালকা হয়,\" জামাল বললেন।"],
      ],
    },
    share: {
      defEn: "To divide something and give part of it to others, or to use something together.",
      defBn: "কোনো জিনিস ভাগ করে অন্যদের দেওয়া, বা একসঙ্গে ব্যবহার করা।",
      exEn: "Please share your lunch with your friend.",
      exBn: "অনুগ্রহ করে তোমার দুপুরের খাবার বন্ধুর সঙ্গে ভাগ করে খাও।",
      microTitleEn: "The Last Orange",
      microTitleBn: "শেষ কমলা",
      micro: [
        ["There was only one orange left in the basket.", "ঝুড়িতে মাত্র একটি কমলা বাকি ছিল।"],
        ["Mina wanted to share it with her little brother.", "মিনা এটি তার ছোট ভাইয়ের সঙ্গে ভাগ করে খেতে চাইল।"],
        ["She cut it into two equal halves.", "সে এটি দুটি সমান ভাগে কাটল।"],
        ["Shared food always tastes sweeter.", "ভাগ করে খাওয়া খাবার সবসময় মিষ্টি লাগে।"],
      ],
    },
    forgive: {
      defEn: "To stop being angry with someone for a mistake they made.",
      defBn: "কারো ভুলের জন্য তার প্রতি রাগ করা বন্ধ করা।",
      exEn: "Please forgive me for breaking your pen.",
      exBn: "তোমার কলম ভাঙার জন্য অনুগ্রহ করে আমাকে ক্ষমা করো।",
      microTitleEn: "The Broken Cup",
      microTitleBn: "ভাঙা কাপ",
      micro: [
        ["Sami broke his mother's favourite cup by accident.", "সামি ভুল করে তার মায়ের প্রিয় কাপটি ভেঙে ফেলল।"],
        ["He said sorry with a sad face.", "সে দুঃখী মুখে দুঃখিত বলল।"],
        ["Mother forgave him and hugged him warmly.", "মা তাকে ক্ষমা করে আন্তরিকভাবে জড়িয়ে ধরলেন।"],
        ["To forgive is a sign of a big heart.", "ক্ষমা করা বড় মনের লক্ষণ।"],
      ],
    },
    smile: {
      defEn: "An expression on your face that shows happiness, with the corners of your mouth turned up.",
      defBn: "মুখের এমন ভাব যা আনন্দ প্রকাশ করে, ঠোঁটের কোণা উপরে ওঠে।",
      exEn: "Her warm smile made the child stop crying.",
      exBn: "তার উষ্ণ হাসি শিশুটির কান্না থামিয়ে দিল।",
      microTitleEn: "The Power of a Smile",
      microTitleBn: "হাসির শক্তি",
      micro: [
        ["A new student stood alone in the school yard.", "এক নতুন শিক্ষার্থী স্কুলের মাঠে একা দাঁড়িয়ে ছিল।"],
        ["Rafi went to him with a friendly smile.", "রাফি বন্ধুসুলভ হাসি নিয়ে তার কাছে গেল।"],
        ["\"Hello, I am Rafi,\" he said.", "\"হ্যালো, আমি রাফি,\" সে বলল।"],
        ["One smile started a new friendship.", "একটি হাসি নতুন বন্ধুত্বের শুরু করল।"],
      ],
    },
    gentle: {
      defEn: "Soft, kind and careful; not rough or violent.",
      defBn: "কোমল, দয়ালু ও সতর্ক; রুক্ষ বা হিংস্র নয়।",
      exEn: "Be gentle with the baby bird.",
      exBn: "শিশু পাখিটির সঙ্গে কোমল আচরণ করো।",
      microTitleEn: "The Baby Bird",
      microTitleBn: "শিশু পাখি",
      micro: [
        ["Nabil found a baby bird under the tree.", "নাবিল গাছের নিচে একটি শিশু পাখি পেল।"],
        ["He picked it up with gentle hands.", "সে কোমল হাতে এটি তুলল।"],
        ["He kept it in a soft box and fed it carefully.", "সে এটি নরম বাক্সে রেখে যত্নে খাওয়াল।"],
        ["After a week, the bird flew back to its mother.", "এক সপ্তাহ পর পাখিটি তার মায়ের কাছে উড়ে গেল।"],
      ],
    },
    care: {
      defEn: "Looking after someone or something with attention and love.",
      defBn: "মনোযোগ ও ভালোবাসা দিয়ে কারো বা কিছুর দেখাশোনা করা।",
      exEn: "We must take care of our grandparents.",
      exBn: "আমাদের দাদা-দাদির যত্ন নিতে হবে।",
      microTitleEn: "Care for Grandfather",
      microTitleBn: "দাদার যত্ন",
      micro: [
        ["Grandfather was sick and stayed in bed.", "দাদা অসুস্থ হয়ে বিছানায় ছিলেন।"],
        ["Little Rina took care of him all day.", "ছোট্ট রিনা সারাদিন তার যত্ন নিল।"],
        ["She gave him water, medicine and warm soup on time.", "সে সময়মতো তাকে পানি, ওষুধ ও গরম স্যুপ দিল।"],
        ["\"You are my best doctor,\" Grandfather smiled.", "\"তুমি আমার সেরা ডাক্তার,\" দাদা হেসে বললেন।"],
      ],
    },
  },
};

// Hand-written entries for the remaining lessons live in rich-extra.ts
// (written lesson by lesson in the same format as RICH above) and are
// merged here, before any lesson is built, so HANDWRITTEN_LESSONS and the
// Coverage page always reflect exactly which lessons are hand-written.
Object.assign(RICH, RICH_EXTRA);

// Story scene openers per category: [English, Bengali] sentence templates.
// {w} = English item, {b} = its Bengali meaning, {L} = lesson title (English),
// {Lb} = lesson title (Bengali).
const SCENES: Record<string, [string, string][]> = {
  "Foundations & Numbers": [
    ["One fine morning, Rafi started learning about {L}.", "এক সুন্দর সকালে রাফি {Lb} সম্পর্কে শিখতে শুরু করল।"],
    ["First, he learned the word \"{w}\", which means {b}.", "প্রথমে সে \"{w}\" শব্দটি শিখল, যার অর্থ {b}।"],
    ["Then his teacher taught him \"{w}\" — in Bengali, {b}.", "তারপর তার শিক্ষক তাকে \"{w}\" শেখালেন — বাংলায় {b}।"],
    ["Rafi also practised \"{w}\" ({b}) with his friend Mina.", "রাফি তার বন্ধু মিনার সঙ্গে \"{w}\" ({b}) অনুশীলনও করল।"],
    ["At home, he wrote \"{w}\" in his notebook and said it aloud.", "বাড়িতে সে তার খাতায় \"{w}\" লিখল এবং জোরে জোরে বলল।"],
    ["His mother smiled and asked him the meaning of \"{w}\".", "তার মা হেসে তাকে \"{w}\" শব্দের অর্থ জিজ্ঞাসা করলেন।"],
    ["\"It means {b}!\" Rafi answered proudly.", "\"এর অর্থ {b}!\" রাফি গর্বের সঙ্গে উত্তর দিল।"],
    ["Day by day, his English became stronger and clearer.", "দিনে দিনে তার ইংরেজি আরও শক্তিশালী ও স্পষ্ট হয়ে উঠল।"],
  ],
  default: [
    ["Last week, Rafi and his sister Mina learned about {L}.", "গত সপ্তাহে রাফি ও তার বোন মিনা {Lb} সম্পর্কে শিখল।"],
    ["Their teacher first showed them \"{w}\", which means {b} in Bengali.", "তাদের শিক্ষক প্রথমে তাদের \"{w}\" দেখালেন, যার বাংলা অর্থ {b}।"],
    ["Then they learned \"{w}\" ({b}) and used it in a sentence.", "তারপর তারা \"{w}\" ({b}) শিখল এবং একটি বাক্যে ব্যবহার করল।"],
    ["Mina wrote \"{w}\" — {b} — in her notebook with a red pen.", "মিনা তার খাতায় লাল কলমে \"{w}\" — {b} — লিখল।"],
    ["Rafi practised saying \"{w}\" again and again until it felt easy.", "রাফি \"{w}\" বারবার বলে অনুশীলন করল যতক্ষণ না সহজ মনে হলো।"],
    ["In the afternoon, they taught their little brother the word \"{w}\".", "বিকেলে তারা তাদের ছোট ভাইকে \"{w}\" শব্দটি শেখাল।"],
    ["Their mother was happy to hear them speaking English at home.", "বাড়িতে তাদের ইংরেজি বলতে শুনে তাদের মা খুশি হলেন।"],
    ["Before dinner, they revised all the new words one more time.", "রাতের খাবারের আগে তারা সব নতুন শব্দ আরও একবার ঝালিয়ে নিল।"],
  ],
};

const NAMES = ["Rafi", "Mina", "Arif", "Nusrat", "Karim", "Suma"];
const PLACES = ["at home", "in the classroom", "at the market", "in the village", "at school", "in the park"];

function fill(tpl: string, w: string, b: string, L: string, Lb: string): string {
  return tpl.replaceAll("{w}", w).replaceAll("{b}", b).replaceAll("{L}", L).replaceAll("{Lb}", Lb);
}

function parseBank(s: string): [string, string][] {
  return s
    .split(",")
    .map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()] as [string, string];
    })
    .filter(([en, bn]) => en.length > 0 && bn.length > 0);
}

// Generated micro-stories rotate through several narrative frames (classroom,
// home, two friends, evening revision) so consecutive entries in a lesson do
// not all read identically. Lessons with hand-written RICH data never use
// these; the frames are a learning-context story about meeting the word,
// written originally for this app.
function buildMicro(
  lessonTitleEn: string,
  lessonTitleBn: string,
  en: string,
  bn: string,
  idx: number,
  total: number,
): { titleEn: string; titleBn: string; lines: { en: string; bn: string }[] } {
  const name = NAMES[idx % NAMES.length] ?? "Rafi";
  const friend = NAMES[(idx + 2) % NAMES.length] ?? "Mina";
  const place = PLACES[idx % PLACES.length] ?? "at home";
  const display = en.replace(/\?$/, "");
  const frame = idx % 8;
  let titleEn = `Learning "${display}"`;
  let titleBn = `"${display}" শেখা`;
  let lines: { en: string; bn: string }[] = [];
  if (frame === 0) {
    titleEn = `A New Word ${place === "in the classroom" ? "in Class" : "for " + name}`;
    titleBn = `${name}-এর নতুন শব্দ`;
    lines = [
      { en: `${name} was ${place} one day, learning about ${lessonTitleEn.toLowerCase()}.`, bn: `একদিন ${name} একটি জায়গায় ছিল এবং ${lessonTitleBn} সম্পর্কে শিখছিল।` },
      { en: `The teacher said, "Today we learn '${display}'."`, bn: `শিক্ষক বললেন, "আজ আমরা '${display}' শিখব।"` },
      { en: `In Bengali, '${display}' means ${bn}.`, bn: `বাংলায় '${display}' মানে ${bn}।` },
      { en: `${name} wrote it in a notebook and practised it ${idx + 2} times.`, bn: `${name} শব্দটি খাতায় লিখল এবং ${idx + 2} বার অনুশীলন করল।` },
      { en: idx === total - 1 ? `"Now I can use '${display}' in my own sentence!" ${name} said happily.` : `"I will remember '${display}' — ${bn}," ${name} said with a smile.`, bn: idx === total - 1 ? `"এখন আমি নিজের বাক্যে '${display}' ব্যবহার করতে পারি!" ${name} খুশি হয়ে বলল।` : `"আমি '${display}' মনে রাখব — ${bn}," ${name} হেসে বলল।` },
    ];
  } else if (frame === 1) {
    titleEn = `${name} and ${friend} Practise Together`;
    titleBn = `${name} ও ${friend} একসঙ্গে অনুশীলন করে`;
    lines = [
      { en: `After school, ${name} met ${friend} in the park.`, bn: `স্কুলের পর ${name} পার্কে ${friend}-এর সঙ্গে দেখা করল।` },
      { en: `They opened their English book at the lesson "${lessonTitleEn}".`, bn: `তারা ইংরেজি বই খুলল "${lessonTitleBn}" পাঠে।` },
      { en: `${friend} pointed at a word and asked, "What does '${display}' mean?"`, bn: `${friend} একটি শব্দের দিকে ইশারা করে জিজ্ঞাসা করল, "'${display}' মানে কী?"` },
      { en: `"It means ${bn}," ${name} answered. "Say it with me: ${display}."`, bn: `"এর মানে ${bn}," ${name} উত্তর দিল। "আমার সঙ্গে বলো: ${display}।"` },
      { en: `They said '${display}' together three times and laughed.`, bn: `তারা একসঙ্গে তিনবার '${display}' বলল এবং হাসল।` },
    ];
  } else if (frame === 2) {
    titleEn = `Evening Revision at Home`;
    titleBn = `বাড়িতে সন্ধ্যার ঝালাই`;
    lines = [
      { en: `In the evening, ${name} sat with mother to revise the day's English lesson.`, bn: `সন্ধ্যায় ${name} মায়ের সঙ্গে বসে দিনের ইংরেজি পাঠ ঝালিয়ে নিল।` },
      { en: `Mother asked, "What did you learn about ${lessonTitleEn.toLowerCase()} today?"`, bn: `মা জিজ্ঞাসা করলেন, "আজ ${lessonTitleBn} সম্পর্কে কী শিখলে?"` },
      { en: `"I learned '${display}'. In our language it means ${bn}," ${name} said.`, bn: `"আমি '${display}' শিখেছি। আমাদের ভাষায় এর অর্থ ${bn}," ${name} বলল।` },
      { en: `Mother smiled and repeated the word slowly: "${display}."`, bn: `মা হেসে ধীরে ধীরে শব্দটি বললেন: "${display}।"` },
      { en: `"Very good, Mother!" ${name} said. "Tomorrow I will teach you one more."`, bn: `"খুব ভালো, মা!" ${name} বলল। "আগামীকাল আরও একটি শেখাব।"` },
    ];
  } else if (frame === 3) {
    titleEn = `The Word on the Wall`;
    titleBn = `দেয়ালের শব্দ`;
    lines = [
      { en: `${name} sticks one new word card on the bedroom wall every day.`, bn: `${name} প্রতিদিন শোবার ঘরের দেয়ালে একটি করে নতুন শব্দের কার্ড লাগায়।` },
      { en: `Today's card says "${display}" in big letters.`, bn: `আজকের কার্ডে বড় অক্ষরে লেখা "${display}"।` },
      { en: `Under it, ${name} wrote the Bengali meaning: ${bn}.`, bn: `তার নিচে ${name} বাংলা অর্থ লিখল: ${bn}।` },
      { en: `Every time ${name} passes the wall, the word "${display}" is practised once more.`, bn: `যতবার ${name} দেয়ালের পাশ দিয়ে যায়, "${display}" শব্দটি আরও একবার ঝালাই হয়।` },
      { en: `Small steps every day — that is how ${name} learns English.`, bn: `প্রতিদিন ছোট ছোট পদক্ষেপ — এভাবেই ${name} ইংরেজি শেখে।` },
    ];
  } else if (frame === 4) {
    titleEn = `On the Way to the Market`;
    titleBn = `বাজারে যাওয়ার পথে`;
    lines = [
      { en: `${name} and ${friend} were walking to the market together.`, bn: `${name} ও ${friend} একসঙ্গে বাজারে হেঁটে যাচ্ছিল।` },
      { en: `On the road, they talked about the lesson "${lessonTitleEn}".`, bn: `রাস্তায় তারা "${lessonTitleBn}" পাঠ নিয়ে কথা বলল।` },
      { en: `${friend} said the new word aloud: "${display}".`, bn: `${friend} নতুন শব্দটি জোরে বলল: "${display}"।` },
      { en: `"It means ${bn}," ${name} replied, and used it in a short sentence.`, bn: `"এর অর্থ ${bn}," ${name} উত্তর দিল এবং একটি ছোট বাক্যে ব্যবহার করল।` },
      { en: `By the time they reached the market, both of them knew the word well.`, bn: `বাজারে পৌঁছাতে পৌঁছাতে দুজনেই শব্দটি ভালোভাবে শিখে ফেলল।` },
    ];
  } else if (frame === 5) {
    titleEn = `Teaching the Little Brother`;
    titleBn = `ছোট ভাইকে শেখানো`;
    lines = [
      { en: `${name}'s little brother wanted to learn English too.`, bn: `${name}-এর ছোট ভাইও ইংরেজি শিখতে চাইল।` },
      { en: `"Teach me one word from ${lessonTitleEn}," he said.`, bn: `"${lessonTitleBn} থেকে আমাকে একটি শব্দ শেখাও," সে বলল।` },
      { en: `${name} taught him "${display}", which means ${bn}.`, bn: `${name} তাকে "${display}" শেখাল, যার অর্থ ${bn}।` },
      { en: `The little brother repeated it five times without a mistake.`, bn: `ছোট ভাই ভুল ছাড়াই পাঁচবার শব্দটি বলল।` },
      { en: `"Tomorrow I will teach you one more," ${name} promised.`, bn: `"আগামীকাল আরও একটি শেখাব," ${name} প্রতিশ্রুতি দিল।` },
    ];
  } else if (frame === 6) {
    titleEn = `The Picture Card Game`;
    titleBn = `ছবির কার্ডের খেলা`;
    lines = [
      { en: `${name} and ${friend} played a picture card game after lunch.`, bn: `দুপুরের খাবারের পর ${name} ও ${friend} ছবির কার্ডের খেলা খেলল।` },
      { en: `One card showed a picture about ${lessonTitleEn.toLowerCase()}.`, bn: `একটি কার্ডে ${lessonTitleBn} নিয়ে ছবি ছিল।` },
      { en: `"What is this in English?" ${friend} asked.`, bn: `"এটি ইংরেজিতে কী?" ${friend} জিজ্ঞাসা করল।` },
      { en: `"${display}!" ${name} answered. "It means ${bn}."`, bn: `"${display}!" ${name} উত্তর দিল। "এর অর্থ ${bn}।"` },
      { en: `${name} won the card and put it proudly on the table.`, bn: `${name} কার্ডটি জিতে গর্বের সঙ্গে টেবিলে রাখল।` },
    ];
  } else {
    titleEn = `A Question at Breakfast`;
    titleBn = `সকালের নাশতায় প্রশ্ন`;
    lines = [
      { en: `At breakfast, father asked ${name} about school.`, bn: `সকালের নাশতায় বাবা ${name}-কে স্কুলের কথা জিজ্ঞাসা করলেন।` },
      { en: `"What new English did you learn in ${lessonTitleEn}?" he asked.`, bn: `"${lessonTitleBn} পাঠে কী নতুন ইংরেজি শিখলে?" তিনি জিজ্ঞাসা করলেন।` },
      { en: `"I learned '${display}'. In Bengali it means ${bn}," ${name} said.`, bn: `"আমি '${display}' শিখেছি। বাংলায় এর অর্থ ${bn}," ${name} বলল।` },
      { en: `Father repeated the word slowly and smiled.`, bn: `বাবা ধীরে ধীরে শব্দটি বললেন এবং হাসলেন।` },
      { en: `Learning together at home makes every word stronger.`, bn: `বাড়িতে একসঙ্গে শিখলে প্রতিটি শব্দ আরও মজবুত হয়।` },
    ];
  }
  return { titleEn, titleBn, lines };
}

// A short bilingual story for one synonym / antonym / alternative, so the
// learner meets the related word inside a real little scene — not as a bare
// list item. Frames rotate deterministically by word, and every Bengali line
// is a full translation of its English line, carrying the related word's own
// Bengali meaning.
function buildRelStory(
  headEn: string,
  headBn: string,
  relEn: string,
  relBn: string,
  kind: "syn" | "ant" | "alt",
  lessonEn: string,
  lessonBn: string,
): RelStory {
  let h = 0;
  const seed = `${headEn}|${relEn}|${kind}`;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const v = Math.abs(h) % 3;
  const name = NAMES[Math.abs(h) % NAMES.length] ?? "Rafi";
  const friend = NAMES[(Math.abs(h) + 2) % NAMES.length] ?? "Mina";
  const topic = lessonEn.toLowerCase();
  if (kind === "syn") {
    const titles: [string, string][] = [
      [`Two Words, One Meaning`, `দুটি শব্দ, একই অর্থ`],
      [`Say It Another Way`, `অন্যভাবে বলুন`],
      [`${name} Learns "${relEn}"`, `${name} শেখে "${relEn}"`],
    ];
    const bodies: { en: string; bn: string }[][] = [
      [
        { en: `${name} was talking about ${topic} with ${friend}.`, bn: `${name} ${friend}-এর সঙ্গে ${lessonBn} নিয়ে কথা বলছিল।` },
        { en: `"For '${headEn}' we can also say '${relEn}'," ${friend} said.`, bn: `"${headEn}"-এর বদলে আমরা "${relEn}"-ও বলতে পারি," ${friend} বলল।` },
        { en: `"${relEn} means ${relBn} — the same as ${headBn}!" ${name} repeated happily.`, bn: `"${relEn}" মানে ${relBn} — ঠিক ${headBn}-এর মতোই!" ${name} খুশি হয়ে আবার বলল।` },
        { en: `Now ${name} knows two ways to say the same thing.`, bn: `এখন ${name} একই কথা দুইভাবে বলতে পারে।` },
      ],
      [
        { en: `In the evening, ${name} read a story about ${topic}.`, bn: `সন্ধ্যায় ${name} ${lessonBn} নিয়ে একটি গল্প পড়ল।` },
        { en: `In the story, the word "${relEn}" came again and again.`, bn: `গল্পে "${relEn}" শব্দটি বারবার এল।` },
        { en: `${name} understood it at once: "${relEn}" means ${relBn}, just like "${headEn}".`, bn: `${name} সঙ্গে সঙ্গে বুঝল: "${relEn}" মানে ${relBn}, ঠিক "${headEn}"-এর মতো।` },
        { en: `${name} wrote both words in the notebook, side by side.`, bn: `${name} দুটি শব্দই খাতায় পাশাপাশি লিখে রাখল।` },
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
  if (kind === "ant") {
    const titles: [string, string][] = [
      [`The Opposite Word`, `বিপরীত শব্দ`],
      [`Two Different Pictures`, `দুটি আলাদা ছবি`],
      [`${headEn} or ${relEn}?`, `${headEn} নাকি ${relEn}?`],
    ];
    const bodies: { en: string; bn: string }[][] = [
      [
        { en: `${name} asked ${friend}, "What is the opposite of '${headEn}'?"`, bn: `${name} ${friend}-কে জিজ্ঞাসা করল, "'${headEn}'-এর বিপরীত শব্দ কী?"` },
        { en: `"${relEn}," ${friend} answered. "It means ${relBn} — completely different from ${headBn}."`, bn: `"${relEn}," ${friend} উত্তর দিল। "এর অর্থ ${relBn} — ${headBn} থেকে সম্পূর্ণ আলাদা।"` },
        { en: `${name} made two sentences, one with each word.`, bn: `${name} দুটি শব্দ দিয়ে দুটি বাক্য বানাল।` },
        { en: `Now the difference is clear and easy to remember.`, bn: `এখন পার্থক্যটি স্পষ্ট এবং মনে রাখা সহজ।` },
      ],
      [
        { en: `${name} drew two pictures about ${topic}.`, bn: `${name} ${lessonBn} নিয়ে দুটি ছবি আঁকল।` },
        { en: `Under the first picture, ${name} wrote "${headEn}" — ${headBn}.`, bn: `প্রথম ছবির নিচে ${name} লিখল "${headEn}" — ${headBn}।` },
        { en: `Under the second picture, ${name} wrote the opposite: "${relEn}" — ${relBn}.`, bn: `দ্বিতীয় ছবির নিচে ${name} বিপরীত শব্দটি লিখল: "${relEn}" — ${relBn}।` },
        { en: `Side by side, the two words are impossible to forget.`, bn: `পাশাপাশি রাখলে দুটি শব্দ ভোলা অসম্ভব।` },
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
  const titles: [string, string][] = [
    [`Another Way to Say It`, `বলার আরেকটি উপায়`],
    [`${name} Says It Politely`, `${name} ভদ্রভাবে বলে`],
    [`The Same Message`, `একই বার্তা`],
  ];
  const bodies: { en: string; bn: string }[][] = [
    [
      { en: `${name} wanted to say "${headEn}" to a new friend.`, bn: `${name} নতুন এক বন্ধুকে "${headEn}" বলতে চাইল।` },
      { en: `${friend} said, "You can also say it this way: '${relEn}'."`, bn: `${friend} বলল, "তুমি এভাবেও বলতে পারো: '${relEn}'।"` },
      { en: `Both sentences mean the same: ${relBn}.`, bn: `দুটি বাক্যের অর্থই এক: ${relBn}।` },
      { en: `${name} tried the new sentence, and the friend smiled.`, bn: `${name} নতুন বাক্যটি বলল, আর বন্ধুটি হাসল।` },
    ],
    [
      { en: `At home, ${name} practised polite English with mother.`, bn: `বাড়িতে ${name} মায়ের সঙ্গে ভদ্র ইংরেজি অনুশীলন করল।` },
      { en: `Mother said "${headEn}", and ${name} answered with "${relEn}".`, bn: `মা বললেন "${headEn}", আর ${name} উত্তর দিল "${relEn}" দিয়ে।` },
      { en: `"${relEn}" means ${relBn} — a natural way to say it.`, bn: `"${relEn}" মানে ${relBn} — বলার একটি স্বাভাবিক উপায়।` },
      { en: `Practice like this makes speaking easy.`, bn: `এমন অনুশীলনে কথা বলা সহজ হয়ে যায়।` },
    ],
    [
      { en: `The class was learning about ${topic}.`, bn: `ক্লাসে ${lessonBn} শেখানো হচ্ছিল।` },
      { en: `The teacher said, "'${headEn}' — or, in other words, '${relEn}'."`, bn: `শিক্ষক বললেন, "'${headEn}' — অথবা অন্যভাবে বললে, '${relEn}'।"` },
      { en: `The meaning stays the same: ${headBn}.`, bn: `অর্থ একই থাকে: ${headBn}।` },
      { en: `${name} noted both forms in the notebook.`, bn: `${name} দুটি রূপই খাতায় লিখে রাখল।` },
    ],
  ];
  const title = titles[v] ?? titles[0] ?? ["", ""];
    return { titleEn: title[0] ?? "", titleBn: title[1] ?? "", lines: bodies[v] ?? bodies[0] ?? [] };
}

function buildEntry(lessonN: number, lessonEn: string, lessonBn: string, en: string, bn: string, idx: number, total: number): VocabEntry {
  const pos = posOf(en);
  const type = typeOf(en, pos);
  const relKey = en.toLowerCase();
  const relA = RELS[relKey];
  const relB = RELS_EXTRA[relKey];
  const pickRel = (field: "syn" | "ant" | "alt"): [string, string][] => {
    const a = relA?.[field];
    if (a && a.length > 0) return a;
    const b = relB?.[field];
    if (b && b.length > 0) return b;
    return RELS_MORE[relKey]?.[field] ?? b ?? a ?? [];
  };
  const rich = RICH[lessonN]?.[en.toLowerCase()];
  const base: VocabEntry = {
    key: `L${lessonN}-${idx}`,
    lesson: lessonN,
    en,
    bn,
    type,
    pos: pos === "sentence" ? "sentence" : pos === "phrase" ? "phrase" : pos,
    ipa: IPA[en.toLowerCase()],
    defEn: rich?.defEn ?? (type === "word" ? `"${en}" means "${bn}" in Bengali. It is a useful ${pos} for the topic "${lessonEn}".` : `This ${type} is used for the topic "${lessonEn}". Its Bengali meaning is: ${bn}.`),
    defBn: rich?.defBn ?? `বাংলায় "${en}" মানে ${bn}। "${lessonEn}" (${lessonBn}) বিষয়ে কথা বলতে এটি ব্যবহৃত হয়।`,
    exEn: rich?.exEn ?? (type === "word" ? (pos === "verb"
      ? [`We ${en.toLowerCase()} together on Fridays.`, `${NAMES[idx % NAMES.length] ?? "Rafi"} can ${en.toLowerCase()} very well.`, `They ${en.toLowerCase()} at home in the evening.`][idx % 3] ?? `We use the word "${en.toLowerCase()}" when we talk about ${lessonEn.toLowerCase()}.`
      : pos === "adjective"
        ? [`It was a ${en.toLowerCase()} day, and everyone noticed it.`, `She felt ${en.toLowerCase()} after the long day.`, `He looked ${en.toLowerCase()} but tried to smile.`][idx % 3] ?? `We use the word "${en.toLowerCase()}" when we talk about ${lessonEn.toLowerCase()}.`
        : `We use the word "${en.toLowerCase()}" when we talk about ${lessonEn.toLowerCase()}.`) : en.endsWith(".") || en.endsWith("?") || en.endsWith("!") ? en : `Teacher: "Please say it with me — ${en}."`),
    exBn: rich?.exBn ?? (type === "word" ? `আমরা যখন ${lessonBn} নিয়ে কথা বলি, তখন "${en}" শব্দটি ব্যবহার করি।` : bn),
    synonyms: pickRel("syn").map(([rEn, rBn]) => ({ en: rEn, bn: rBn, story: buildRelStory(en, bn, rEn, rBn, "syn", lessonEn, lessonBn) })),
    antonyms: pickRel("ant").map(([rEn, rBn]) => ({ en: rEn, bn: rBn, story: buildRelStory(en, bn, rEn, rBn, "ant", lessonEn, lessonBn) })),
    alternatives: (pickRel("alt").length > 0 ? pickRel("alt") : (NUMFORM[relKey] ? [NUMFORM[relKey]] as [string, string][] : [])).map(([rEn, rBn]) => ({ en: rEn, bn: rBn, story: buildRelStory(en, bn, rEn, rBn, "alt", lessonEn, lessonBn) })),
    micro: rich
      ? { titleEn: rich.microTitleEn, titleBn: rich.microTitleBn, lines: rich.micro.map(([mEn, mBn]) => ({ en: mEn, bn: mBn })) }
      : buildMicro(lessonEn, lessonBn, en, bn, idx, total),
  };
  if (base.antonyms.length === 0) {
    base.noAntonymNote = type === "word"
      ? "No natural antonym for this meaning — English has no true opposite for this word, so none is invented here."
      : "No natural antonym for this meaning.";
  }
  if (rich?.grammar) {
    base.grammar = {
      pattern: rich.grammar.pattern,
      explainBn: rich.grammar.explainBn,
      more: rich.grammar.more.map(([mEn, mBn]) => ({ en: mEn, bn: mBn })),
    };
  }
  return base;
}

function buildStory(meta: (typeof META)[number], entries: VocabEntry[]): LessonStory {
  const [, enTitle, bnTitle, catIdx] = meta;
  const cat = CATEGORIES[catIdx] ?? "Foundations & Numbers";
  const scene = SCENES[cat] ?? SCENES["default"] ?? [];
  const lines = scene.map((tpl, i) => {
    const e = entries[i % Math.max(entries.length, 1)];
    const w = e ? e.en : enTitle;
    const b = e ? e.bn : bnTitle;
    return { en: fill(tpl[0], w, b, enTitle, bnTitle), bn: fill(tpl[1], w, b, enTitle, bnTitle) };
  });
  const qEntries = entries.slice(0, 3);
  const questions = qEntries.map((e, qi) => {
    const wrong = entries.filter((x) => x.key !== e.key).slice(qi, qi + 2).map((x) => x.bn);
    const options = [e.bn, ...wrong];
    // rotate correct answer position deterministically
    const pos = qi % options.length;
    const rotated = [...options.slice(pos), ...options.slice(0, pos)];
    return {
      qEn: `In the story, what does "${e.en}" mean?`,
      qBn: `গল্পে "${e.en}" শব্দের অর্থ কী?`,
      options: rotated,
      answer: rotated.indexOf(e.bn),
    };
  });
  return {
    titleEn: `Rafi Learns: ${enTitle}`,
    titleBn: `রাফি শেখে: ${bnTitle}`,
    lines,
    questions,
  };
}

const OBJECTIVES: Record<string, string[]> = {
  default: [
    "Learn the core English words and phrases for this topic with their Bengali meanings.",
    "Use each new word in a correct English sentence.",
    "Read a short bilingual story and answer questions about it.",
    "Score at least 70% in the lesson quiz to complete the lesson.",
  ],
};

export const LESSONS: Lesson[] = META.map((meta) => {
  const [n, en, bn, catIdx, icon] = meta;
  const pairs = parseBank(BANKS[n] ?? "");
  const entries = pairs.map(([eEn, eBn], i) => buildEntry(n, en, bn, eEn, eBn, i, pairs.length));
  return {
    n,
    en,
    bn,
    cat: CATEGORIES[catIdx] ?? "Foundations & Numbers",
    icon,
    minutes: 15 + entries.length * 2,
    objectives: OBJECTIVES["default"] ?? [],
    entries,
    story: buildStory(meta, entries),
  };
});

export const TOTAL_ENTRIES = LESSONS.reduce((s, l) => s + l.entries.length, 0);

// Lessons whose entries carry fully hand-written definitions, examples,
// micro-stories and (where relevant) grammar notes.
export const HANDWRITTEN_LESSONS: number[] = Object.keys(RICH)
  .map(Number)
  .sort((a, b) => a - b);

export function getLesson(n: number): Lesson {
  return LESSONS[n - 1] ?? (LESSONS[0] as Lesson);
}

export interface SearchHit {
  entry: VocabEntry;
  lessonEn: string;
  lessonBn: string;
  matchedIn: string;
}

export function searchEntries(q: string): SearchHit[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const hits: SearchHit[] = [];
  for (const lesson of LESSONS) {
    for (const e of lesson.entries) {
      let matchedIn = "";
      if (e.en.toLowerCase().includes(query)) matchedIn = "word";
      else if (e.bn.includes(q.trim())) matchedIn = "meaning";
      else if (e.synonyms.some((s) => s.en.toLowerCase().includes(query))) matchedIn = "synonym";
      else if (e.antonyms.some((s) => s.en.toLowerCase().includes(query))) matchedIn = "antonym";
      else if (lesson.en.toLowerCase().includes(query)) matchedIn = "lesson topic";
      if (matchedIn) hits.push({ entry: e, lessonEn: lesson.en, lessonBn: lesson.bn, matchedIn });
      if (hits.length >= 60) return hits;
    }
  }
  return hits;
}
