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
  sentenceWithBlanks: string; // e.g., "Thank you for ___, I am ___."
  blanks: Blank[];
};

const pashtoSentences: Sentence[] = [
  {
    id: 1,
    english: "",
    native: "د پوښتنې نه مننه، زه ښه یم.",
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
];

const sindhiSentences: Sentence[] = [
  {
    id: 1,
    english: "",
    native: "مان توهان کي ٻڌي نٿو سگهان",
    sentenceWithBlanks: "I can't ___ you",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "hear", correct: true },
          { id: "opt2", text: "see", correct: false },
          { id: "opt3", text: "touch", correct: false },
          { id: "opt4", text: "listen to", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 2,
    english: "",
    native: "توهان دير ڪري رهيا آهيو",
    sentenceWithBlanks: "You are ___",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "late", correct: true },
          { id: "opt2", text: "early", correct: false },
          { id: "opt3", text: "coming", correct: false },
          { id: "opt4", text: "going", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
  {
    id: 3,
    english: "",
    native: "اهو ماڻهو ڪير آهي؟",
    sentenceWithBlanks: "Who is that ___?",
    blanks: [
      {
        id: "blank1",
        options: [
          { id: "opt1", text: "man", correct: true },
          { id: "opt2", text: "men", correct: false },
          { id: "opt3", text: "woman", correct: false },
          { id: "opt4", text: "person", correct: false },
        ],
        selectedOptionId: null,
      },
    ],
  },
];

export default function PronunciationPage() {
  const [lang, setLang] = useState<"pashto" | "sindhi">("pashto");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState<Sentence[]>(
    pashtoSentences.map((s) => ({ ...s, blanks: s.blanks.map((b) => ({ ...b, selectedOptionId: null })) }))
  );

  const handleLanguageChange = (newLang: "pashto" | "sindhi") => {
    setLang(newLang);
    setCurrentSentenceIndex(0);
    const newSentences = newLang === "pashto" ? pashtoSentences : sindhiSentences;
    setSentences(newSentences.map((s) => ({ ...s, blanks: s.blanks.map((b) => ({ ...b, selectedOptionId: null })) })));
  };

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
        <div className="flex items-center gap-3">
          <Button
            variant={lang === "pashto" ? "default" : "primaryOutline"}
            onClick={() => handleLanguageChange("pashto")}
          >
            Pashto
          </Button>
          <Button
            variant={lang === "sindhi" ? "default" : "primaryOutline"}
            onClick={() => handleLanguageChange("sindhi")}
          >
            Sindhi
          </Button>
        </div>
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

