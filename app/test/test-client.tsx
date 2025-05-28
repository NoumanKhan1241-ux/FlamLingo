"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  question: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "How would you rate your overall fluency in this language?",
    options: ["Beginner", "Intermediate", "Advanced", "Native-like"]
  },
  {
    id: 2,
    question: "In what context have you used this language before?",
    options: ["Home", "School", "Work", "Travel", "Never"]
  },
  {
    id: 3,
    question: "Which skills are you most comfortable with?",
    options: ["Speaking", "Listening", "Reading", "Writing"]
  },
  {
    id: 4,
    question: "Have you taken any formal classes in this language?",
    options: ["Yes", "No"]
  },
  {
    id: 5,
    question: "How often do you use this language in your daily life?",
    options: ["Every day", "Occasionally", "Rarely", "Never"]
  },
  {
    id: 6,
    question: "What's your main goal in learning this language?",
    options: ["For school", "For work", "For travel", "To speak with family", "Personal interest"]
  }
];

export const TestClient = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleStartLearning = () => {
    router.push("/learn");
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[600px] text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Image
            src="/flamingo_logo_bg.png"
            alt="Flamingo Mascot"
            width={150}
            height={150}
            className="rounded-full"
          />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-4"
        >
          Thank You for Your Evaluation!
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8 max-w-[500px]"
        >
          We've received your responses and will personalize your learning experience accordingly. Let's begin your language learning journey!
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-6"
            onClick={handleStartLearning}
          >
            Start Learning
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] relative">
      {/* Progress bar */}
      <div className="w-full max-w-[600px] h-2 bg-gray-200 rounded-full mb-8">
        <motion.div
          className="h-full bg-green-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question counter */}
      <div className="text-sm text-muted-foreground mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[600px]"
        >
          {/* Flamingo mascot */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/flamingo_logo_bg.png"
                alt="Flamingo Mascot"
                width={120}
                height={120}
                className="rounded-full"
              />
            </motion.div>
          </div>

          {/* Question */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-center mb-8"
          >
            {questions[currentQuestion].question}
          </motion.h2>

          {/* Options */}
          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Button
                  variant="primaryOutline"
                  className="w-full h-14 text-lg hover:bg-green-100 hover:text-green-700 hover:border-green-300 transition-colors"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 