"use client";

const PASHTO_PHRASES = [
  { phrase: "څنگه يې؟", translation: "How are you?" },
  { phrase: "دیړوخت وشو نہ خکاری", translation: "Long time no see" },
  { phrase: "ستا نون څه", translation: "What's your name?" },
  { phrase: "ته د كوم خاى يې؟", translation: "Where are you from?" },
  { phrase: "دخداى په امان", translation: "Goodbye" },
  { phrase: "ايا ته په پښتو خبرې کولى شې؟", translation: "Do you speak Pashto?" },
];

const SINDHI_PHRASES = [
  { phrase: "توهان جا ڪهڙا حال آهن؟", translation: "How are you?" },
  { phrase: "ڏِسَڻَ من ئيِ نَٿا اَچو", translation: "Long time no see" },
  { phrase: "تُنهِجو نالو ڇا آهي؟", translation: "What's your name?" },
  { phrase: "توهان ڪٿان جا آهيو؟", translation: "Where are you from?" },
  { phrase: "توهان ملي ڏاڍو سٺو لڳو", translation: "Pleased to meet you" },
  { phrase: "ڇا توهان سنڌي آهيو؟", translation: "Do you speak Sindhi?" },
];

const PASHTO_IDIOMS = [
  { expression: "په خپل مېده کې لوېدل", translit: "Pa khpal meyda ke lwaydal", meaning: "To drown in one’s own soup (to be trapped in your own mistake)", context: "Used when someone suffers due to their own actions" },
  { expression: "غر څکول", translit: "Ghar tsakawal", meaning: "To move a mountain", context: "Doing something very difficult" },
  { expression: "پیشو ته غوښه ور ښودل", translit: "Pishu ta goshta war showdal", meaning: "Showing meat to a cat", context: "Tempting someone with something they can’t have" },
  { expression: "له چا نه شپه پټه نه ده", translit: "La cha na shpa patta na da", meaning: "The night isn’t hidden from someone", context: "Used when someone knows all the details or secrets" },
  { expression: "په خپله مېوه ونه پېژندل کېږي", translit: "Pa khpala mewa wuna pejandl kege", meaning: "A tree is known by its fruit", context: "People are judged by their actions, not words" },
  { expression: "خفه مه شه", translit: "Khafa ma sha", meaning: "Don’t be upset / chill", context: "Casual slang, friendly reassurance" },
  { expression: "مړوند مه وهه", translit: "Mrwand ma waha", meaning: "Don’t overreact", context: "Used to calm someone being dramatic" },
  { expression: "ته خو نمبر ون يې", translit: "Ta kho number one ye", meaning: "You’re number one / You’re the best", context: "Playful compliment or sarcasm depending on tone" },
  { expression: "دا خو ډرامه جوړوي", translit: "Da kho drama jorawi", meaning: "He/She is making drama", context: "Used for someone being overly emotional or fake" },
  { expression: "زړونه خوري", translit: "Zruna khori", meaning: "Eats hearts", context: "Describes someone very charming or attractive" }
];

const SINDHI_IDIOMS = [
  { expression: "پاڻيءَ ۾ مڇي وانگر", translit: "Paani mein machhi wangar", meaning: "Like a fish in water", context: "Feeling comfortable in one’s environment" },
  { expression: "ڀت سان ٽڪرائڻ", translit: "Bhitt saan takraayun", meaning: "To hit the wall", context: "Facing a hard obstacle or failure" },
  { expression: "ڪنن ۾ تيل وجھڻ", translit: "Kannan mein teil wjhun", meaning: "To ignore someone", context: "When someone doesn’t listen at all" },
  { expression: "ٻه ٿالهه هڪ چمچو", translit: "Be thaalah hik chamcho", meaning: "Two plates, one spoon", context: "Inseparable people (always together)" },
  { expression: "آسمان تان ڪيرا نه ٿا پون", translit: "Aasman taan kira na tha pun", meaning: "Stars don’t fall from the sky", context: "Nothing special happened / relax" },
  { expression: "چريا ٿي ويو آهين؟", translit: "Chariya thi wiyo aahin?", meaning: "Have you gone crazy?", context: "Friendly slang for 'are you mad?'" },
  { expression: "ڏٺو نه ٿو وڃي", translit: "Ditho na tho wajeh", meaning: "Can’t even stand to see", context: "Used when someone really dislikes someone/something" },
  { expression: "تو مهربان، اسي غلام", translit: "To mehrban, asi ghulaam", meaning: "As you wish, boss", context: "Sarcastic for when someone acts bossy" },
  { expression: "دل تي لاهي ويٺو", translit: "Dil te laahi wey tho", meaning: "Took it to heart", context: "When someone feels hurt emotionally" },
  { expression: "ٽائيم پاس ڪر", translit: "Time pass kar", meaning: "Chill / hang out", context: "Common casual slang among youth" }
];

const today = new Date().getDate();
const pashtoPhrasesToday = PASHTO_PHRASES.slice((today % PASHTO_PHRASES.length), (today % PASHTO_PHRASES.length) + 2);
const sindhiPhrasesToday = SINDHI_PHRASES.slice((today % SINDHI_PHRASES.length), (today % SINDHI_PHRASES.length) + 2);

export default function PhrasebookPage() {
  return (
    <div className="flex flex-col items-center min-h-[80vh] justify-center bg-gradient-to-br from-amber-50 to-white py-8">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-center text-amber-700 mb-6 tracking-tight">
          📓 Phrasebook
        </h1>
        <div className="mt-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pashto */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 text-center">Pashto Phrases</h3>
              {pashtoPhrasesToday.map((item, idx) => (
                <div key={idx} className="bg-blue-50 rounded-lg shadow p-4 mb-2 flex flex-col items-center">
                  <p className="text-xl font-bold text-blue-900 mb-1">{item.phrase}</p>
                  <p className="text-green-800 italic">{item.translation}</p>
                </div>
              ))}
            </div>
            {/* Sindhi */}
            <div>
              <h3 className="text-lg font-semibold text-pink-700 mb-2 text-center">Sindhi Phrases</h3>
              {sindhiPhrasesToday.map((item, idx) => (
                <div key={idx} className="bg-pink-50 rounded-lg shadow p-4 mb-2 flex flex-col items-center">
                  <p className="text-xl font-bold text-pink-900 mb-1">{item.phrase}</p>
                  <p className="text-green-800 italic">{item.translation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-amber-600 text-center mb-6">
            🟩 Pashto Idioms & Slangs
          </h2>
          <div className="overflow-x-auto rounded-xl shadow mb-10">
            <table className="w-full text-sm bg-green-50">
              <thead className="bg-green-200">
                <tr>
                  <th className="p-3 text-left">Expression</th>
                  <th className="p-3 text-left">Transliteration</th>
                  <th className="p-3 text-left">Meaning</th>
                  <th className="p-3 text-left">Context/Usage</th>
                </tr>
              </thead>
              <tbody>
                {PASHTO_IDIOMS.map((item, idx) => (
                  <tr key={idx} className="border-b border-green-100">
                    <td className="p-3 font-bold text-green-800">{item.expression}</td>
                    <td className="p-3 italic text-green-700">{item.translit}</td>
                    <td className="p-3">{item.meaning}</td>
                    <td className="p-3 text-slate-600">{item.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            🟦 Sindhi Idioms & Slangs
          </h2>
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="w-full text-sm bg-blue-50">
              <thead className="bg-blue-200">
                <tr>
                  <th className="p-3 text-left">Expression</th>
                  <th className="p-3 text-left">Transliteration</th>
                  <th className="p-3 text-left">Meaning</th>
                  <th className="p-3 text-left">Context/Usage</th>
                </tr>
              </thead>
              <tbody>
                {SINDHI_IDIOMS.map((item, idx) => (
                  <tr key={idx} className="border-b border-blue-100">
                    <td className="p-3 font-bold text-blue-800">{item.expression}</td>
                    <td className="p-3 italic text-blue-700">{item.translit}</td>
                    <td className="p-3">{item.meaning}</td>
                    <td className="p-3 text-slate-600">{item.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
