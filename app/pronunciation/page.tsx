"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type BlankOption = {
  id: string;
  text: string;
  correct: boolean;
};

type Blank = {
  id: string;
  options: BlankOption[];
  selectedOptionId: string | null;
};

type Sentence = {
  id: number;
  english: string;
  native: string;
  translit?: string; // Roman transliteration
  sentenceWithBlanks: string; // e.g., "Thank you for ___, I am ___."
  blanks: Blank[];
};

const pashtoSentences: Sentence[] = [
  {
    id: 1,
    english: "",
    native: "د پوښتنې نه مننه، زه ښه یم.",
    translit: "Da poṣtanay na manana, za kha yam.",
    sentenceWithBlanks: "Thank you for ___, I am ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "asking", correct: true },
          { id: "opt2", text: "telling", correct: false },
          { id: "opt3", text: "saying", correct: false },
          { id: "opt4", text: "hearing", correct: false },
        ],
        selectedOptionId: null,
      },
      {
        id: "blank2",
        options: [
          { id: "opt5", text: "fine", correct: true },
          { id: "opt6", text: "not good", correct: false },
          { id: "opt7", text: "hurting", correct: false },
          { id: "opt8", text: "poor", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 2,
    english: "",
    native: "له تاسو سره لیدل خوشحال شوم!",
    translit: "La taso sara lidal khushhal shwum!",
    sentenceWithBlanks: "Nice to have ___ you!",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "met", correct: true },
          { id: "opt2", text: "heard", correct: false },
          { id: "opt3", text: "talked to", correct: false },
          { id: "opt4", text: "seen", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 3,
    english: "",
    native: "آیا تاسو انګلیسي خبرې کوئ؟",
    translit: "Aya taso angrezi khabare kaway?",
    sentenceWithBlanks: "Do you ___ English?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "speak", correct: true },
          { id: "opt2", text: "write", correct: false },
          { id: "opt3", text: "read", correct: false },
          { id: "opt4", text: "see", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 4,
    english: "",
    native: "ستا نوم څه دی؟",
    translit: "Sta nom sa de?",
    sentenceWithBlanks: "What is your ___?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "name", correct: true },
          { id: "opt2", text: "age", correct: false },
          { id: "opt3", text: "country", correct: false },
          { id: "opt4", text: "language", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 5,
    english: "",
    native: "زه د پاکستان نه یم.",
    translit: "Za da Pakistan na yam.",
    sentenceWithBlanks: "I am ___ Pakistan.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "from", correct: true },
          { id: "opt2", text: "in", correct: false },
          { id: "opt3", text: "to", correct: false },
          { id: "opt4", text: "at", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 6,
    english: "",
    native: "څنگه یې؟",
    translit: "Tsanga ye?",
    sentenceWithBlanks: "How are ___?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "you", correct: true },
          { id: "opt2", text: "they", correct: false },
          { id: "opt3", text: "we", correct: false },
          { id: "opt4", text: "he", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 7,
    english: "",
    native: "زه ښه یم، مننه.",
    translit: "Za kha yam, manana.",
    sentenceWithBlanks: "I am ___, thanks.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "fine", correct: true },
          { id: "opt2", text: "sick", correct: false },
          { id: "opt3", text: "tired", correct: false },
          { id: "opt4", text: "angry", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 8,
    english: "",
    native: "ته د کوم خا یې؟",
    translit: "Ta da kom kha ye?",
    sentenceWithBlanks: "Where are you ___?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "from", correct: true },
          { id: "opt2", text: "going", correct: false },
          { id: "opt3", text: "coming", correct: false },
          { id: "opt4", text: "staying", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 9,
    english: "",
    native: "زه د پاکستان نه یم.",
    translit: "Za da Pakistan na yam.",
    sentenceWithBlanks: "I am from ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "Pakistan", correct: true },
          { id: "opt2", text: "India", correct: false },
          { id: "opt3", text: "America", correct: false },
          { id: "opt4", text: "England", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 10,
    english: "",
    native: "ستا عمر څو کاله دی؟",
    translit: "Sta umr tso kala de?",
    sentenceWithBlanks: "How ___ are you?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "old", correct: true },
          { id: "opt2", text: "tall", correct: false },
          { id: "opt3", text: "young", correct: false },
          { id: "opt4", text: "big", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 11,
    english: "",
    native: "زه بیست کلن یم.",
    translit: "Za bist kalan yam.",
    sentenceWithBlanks: "I am ___ years old.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "twenty", correct: true },
          { id: "opt2", text: "ten", correct: false },
          { id: "opt3", text: "thirty", correct: false },
          { id: "opt4", text: "fifteen", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 12,
    english: "",
    native: "دخداي په امان",
    translit: "Da khuday pa aman",
    sentenceWithBlanks: "Goodbye / ___ be with you.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "God", correct: true },
          { id: "opt2", text: "peace", correct: false },
          { id: "opt3", text: "luck", correct: false },
          { id: "opt4", text: "blessing", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 13,
    english: "",
    native: "ستا د کور پته څه ده؟",
    translit: "Sta da kor pata tsə da?",
    sentenceWithBlanks: "What is your ___ address?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "home", correct: true },
          { id: "opt2", text: "work", correct: false },
          { id: "opt3", text: "email", correct: false },
          { id: "opt4", text: "phone", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 14,
    english: "",
    native: "زه د پوهنتون زده کړیال یم.",
    translit: "Za da pohaneton zda karayal yam.",
    sentenceWithBlanks: "I am a university ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "student", correct: true },
          { id: "opt2", text: "teacher", correct: false },
          { id: "opt3", text: "doctor", correct: false },
          { id: "opt4", text: "engineer", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 15,
    english: "",
    native: "زه د پښتو ژبې زده کړه کوم.",
    translit: "Za da Pashto zhabe zda kara kawum.",
    sentenceWithBlanks: "I am ___ Pashto language.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "learning", correct: true },
          { id: "opt2", text: "teaching", correct: false },
          { id: "opt3", text: "speaking", correct: false },
          { id: "opt4", text: "writing", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 16,
    english: "",
    native: "ستا د کورنۍ غړي څوک دي؟",
    translit: "Sta da koranay ghri tsok de?",
    sentenceWithBlanks: "Who are your family ___?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "members", correct: true },
          { id: "opt2", text: "friends", correct: false },
          { id: "opt3", text: "neighbors", correct: false },
          { id: "opt4", text: "colleagues", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 17,
    english: "",
    native: "زه د خپلې مور سره خبرې کوم.",
    translit: "Za da khpale mor sara khabare kawum.",
    sentenceWithBlanks: "I am talking ___ my mother.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "with", correct: true },
          { id: "opt2", text: "to", correct: false },
          { id: "opt3", text: "about", correct: false },
          { id: "opt4", text: "for", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 18,
    english: "",
    native: "زه د ورځې لومړی ډوډۍ خورم.",
    translit: "Za da warzhe lomrai doday khawram.",
    sentenceWithBlanks: "I eat ___ in the morning.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "breakfast", correct: true },
          { id: "opt2", text: "lunch", correct: false },
          { id: "opt3", text: "dinner", correct: false },
          { id: "opt4", text: "snack", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 19,
    english: "",
    native: "زه د کتابونو لوستل خوښوم.",
    translit: "Za da kitabuno lwastel khokhawum.",
    sentenceWithBlanks: "I like ___ books.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "reading", correct: true },
          { id: "opt2", text: "writing", correct: false },
          { id: "opt3", text: "buying", correct: false },
          { id: "opt4", text: "selling", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 20,
    english: "",
    native: "زه د فوټبال لوبه کوم.",
    translit: "Za da football loba kawum.",
    sentenceWithBlanks: "I play ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "football", correct: true },
          { id: "opt2", text: "cricket", correct: false },
          { id: "opt3", text: "tennis", correct: false },
          { id: "opt4", text: "basketball", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 21,
    english: "",
    native: "زه د سهار وخت پاکیږم.",
    translit: "Za da sahar waqt pakayegam.",
    sentenceWithBlanks: "I wake up in the ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "morning", correct: true },
          { id: "opt2", text: "evening", correct: false },
          { id: "opt3", text: "night", correct: false },
          { id: "opt4", text: "afternoon", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 22,
    english: "",
    native: "زه د کور کار کوم.",
    translit: "Za da kor kar kawum.",
    sentenceWithBlanks: "I do house ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "work", correct: true },
          { id: "opt2", text: "cleaning", correct: false },
          { id: "opt3", text: "cooking", correct: false },
          { id: "opt4", text: "gardening", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 23,
    english: "",
    native: "زه د بازار نه لیکۍ پیرم.",
    translit: "Za da bazar na leekay piram.",
    sentenceWithBlanks: "I buy vegetables from the ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "market", correct: true },
          { id: "opt2", text: "shop", correct: false },
          { id: "opt3", text: "store", correct: false },
          { id: "opt4", text: "restaurant", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 24,
    english: "",
    native: "زه د پښتو ژبې خبرې کول زده کوم.",
    translit: "Za da Pashto zhabe khabare kawul zda kawum.",
    sentenceWithBlanks: "I am learning to ___ Pashto.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "speak", correct: true },
          { id: "opt2", text: "read", correct: false },
          { id: "opt3", text: "write", correct: false },
          { id: "opt4", text: "understand", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 25,
    english: "",
    native: "زه د خپل ملګري سره لیدل کوم.",
    translit: "Za da khpal malgari sara lidal kawum.",
    sentenceWithBlanks: "I meet with my ___.",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "friend", correct: true },
          { id: "opt2", text: "teacher", correct: false },
          { id: "opt3", text: "brother", correct: false },
          { id: "opt4", text: "sister", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
];

// const sindhiSentences: Sentence[] = [
//   {
//     id: 1,
//     english: "",
//     native: "مان توهان کي ٻڌي نٿو سگهان",
//     sentenceWithBlanks: "I can't ___ you",
//     blanks: [
//       {
//         id: "blank1",
//         options: [
//           { id: "opt1", text: "hear", correct: true },
//           { id: "opt2", text: "see", correct: false },
//           { id: "opt3", text: "touch", correct: false },
//           { id: "opt4", text: "listen to", correct: false },
//         ],
//         selectedOptionId: null,
//       },
//     ],
//   },
//   {
//     id: 2,
//     english: "",
//     native: "توهان دير ڪري رهيا آهيو",
//     sentenceWithBlanks: "You are ___",
//     blanks: [
//       {
//         id: "blank1",
//         options: [
//           { id: "opt1", text: "late", correct: true },
//           { id: "opt2", text: "early", correct: false },
//           { id: "opt3", text: "coming", correct: false },
//           { id: "opt4", text: "going", correct: false },
//         ],
//         selectedOptionId: null,
//       },
//     ],
//   },
//   {
//     id: 3,
//     english: "",
//     native: "اهو ماڻهو ڪير آهي؟",
//     sentenceWithBlanks: "Who is that ___?",
//     blanks: [
//       {
//         id: "blank1",
//         options: [
//           { id: "opt1", text: "man", correct: true },
//           { id: "opt2", text: "men", correct: false },
//           { id: "opt3", text: "woman", correct: false },
//           { id: "opt4", text: "person", correct: false },
//         ],
//         selectedOptionId: null,
//       },
//     ],
//   },
// ];

export default function PronunciationPage() {
  // const [lang, setLang] = useState<"pashto" | "sindhi">("pashto"); // Only Pashto used now
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState<Sentence[]>(
    pashtoSentences.map((s) => ({ ...s, blanks: s.blanks.map((b) => ({ ...b, selectedOptionId: null })) }))
  );

  // const handleLanguageChange = (newLang: "pashto" | "sindhi") => {
  //   setLang(newLang);
  //   setCurrentSentenceIndex(0);
  //   const newSentences = newLang === "pashto" ? pashtoSentences : sindhiSentences;
  //   setSentences(newSentences.map((s) => ({ ...s, blanks: s.blanks.map((b) => ({ ...b, selectedOptionId: null })) })));
  // };

  const handleOptionSelect = (blankId: string, optionId: string) => {
    setSentences((prev) =>
      prev.map((sentence, sIdx) => {
        if (sIdx !== currentSentenceIndex) return sentence;
        return {
          ...sentence,
          blanks: sentence.blanks.map((blank) =>
            blank.id === blankId ? { ...blank, selectedOptionId: optionId } : blank
          ),
        };
      })
    );
  };

  const isCurrentSentenceComplete = () => {
    const currentSentence = sentences[currentSentenceIndex];
    return currentSentence.blanks.every((blank) => blank.selectedOptionId !== null);
  };

  const handleNext = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex((prev) => prev - 1);
    }
  };

  const currentSentence = sentences[currentSentenceIndex];
  const isComplete = isCurrentSentenceComplete();

  // Render sentence with blanks
  const renderSentenceWithBlanks = () => {
    const parts = currentSentence.sentenceWithBlanks.split("___");

    return (
      <div className="text-2xl font-semibold text-center mb-8 flex flex-wrap items-center justify-center gap-2">
        {parts.map((part, index) => {
          const isLast = index === parts.length - 1;
          const blankIndex = index; // Each blank corresponds to the part index
          const currentBlank = !isLast && blankIndex < currentSentence.blanks.length 
            ? currentSentence.blanks[blankIndex] 
            : null;
          
          return (
            <span key={index}>
              {part && <span>{part}</span>}
              {!isLast && (
                <span className="inline-block min-w-[120px] mx-2 px-3 py-2 border-b-2 border-green-500 font-bold text-green-600">
                  {currentBlank?.selectedOptionId
                    ? currentBlank.options.find(
                        (opt) => opt.id === currentBlank.selectedOptionId
                      )?.text || "___"
                    : "___"}
                </span>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        {/* Language selector commented out - only Pashto used
        <div className="flex items-center gap-3">
          <Button
            variant={lang === "pashto" ? "default" : "outline"}
            onClick={() => handleLanguageChange("pashto")}
          >
            Pashto
          </Button>
          <Button
            variant={lang === "sindhi" ? "default" : "outline"}
            onClick={() => handleLanguageChange("sindhi")}
          >
            Sindhi
          </Button>
        </div>
        */}
        <div className="text-sm text-neutral-600">
          Sentence {currentSentenceIndex + 1} of {sentences.length}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">Pronunciation Analysis</h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSentenceIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow p-8"
        >
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg text-neutral-700">{currentSentence.english}</p>
              <p className="text-2xl font-semibold text-neutral-900">{currentSentence.native}</p>
              {currentSentence.translit && (
                <p className="text-lg italic text-neutral-600">{currentSentence.translit}</p>
              )}
            </div>

            {renderSentenceWithBlanks()}

            <div className="space-y-4">
              {currentSentence.blanks.map((blank, blankIdx) => (
                <div key={blank.id} className="space-y-2">
                  <p className="text-sm font-medium text-neutral-600">Fill blank {blankIdx + 1}:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {blank.options.map((option) => {
                      const isSelected = blank.selectedOptionId === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionSelect(blank.id, option.id)}
                          disabled={isSelected}
                          className={`
                            p-4 rounded-lg border-2 transition-all
                            ${isSelected
                              ? option.correct
                                ? "bg-green-100 border-green-500 text-green-700"
                                : "bg-red-100 border-red-500 text-red-700"
                              : "bg-neutral-50 border-neutral-200 hover:border-green-400 hover:bg-green-50"
                            }
                            ${isSelected ? "cursor-not-allowed" : "cursor-pointer"}
                          `}
                        >
                          {option.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="primaryOutline"
                onClick={handlePrevious}
                disabled={currentSentenceIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isComplete || currentSentenceIndex === sentences.length - 1}
                className="bg-green-500 hover:bg-green-600"
              >
                {currentSentenceIndex === sentences.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

