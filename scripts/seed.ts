import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const main = async () => {
    try {
     console.log("Seeding database...");
      await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        // Insert course
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Pashto",
                imageSrc: "/pashtoflag.png",
            },
        ]);

        // Insert unit
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Pashto Alphabet",
                description: "Learn Pashto alphabet letters",
                order: 1,
            },
        ]);

        // Create 11 lessons (10 with 3 questions, 1 with 2 questions = 32 questions total for alphabet)
        const lessons = [];
        for (let i = 1; i <= 11; i++) {
            lessons.push({
                id: i,
                unitId: 1,
                order: i,
                title: `Lesson ${i}`,
            });
        }
        await db.insert(schema.lessons).values(lessons);

        // Additional units for higher levels (12–50)
        await db.insert(schema.units).values([
            {
                id: 2,
                courseId: 1,
                title: "Everyday Basics",
                description: "Numbers, colors, weather, routine, health",
                order: 2,
            },
            {
                id: 3,
                courseId: 1,
                title: "Daily Life & Movement",
                description: "Directions, shopping, transport, politeness, time",
                order: 3,
            },
            {
                id: 4,
                courseId: 1,
                title: "Reasons & Descriptions",
                description: "Future tense, reasons, comparisons, people, house",
                order: 4,
            },
            {
                id: 5,
                courseId: 1,
                title: "Modern Life & Communication",
                description: "Technology, education, work, social talk, complex sentences",
                order: 5,
            },
            {
                id: 6,
                courseId: 1,
                title: "Stories & Social Norms",
                description: "Passive voice, storytelling, opinions, idioms, norms",
                order: 6,
            },
            {
                id: 7,
                courseId: 1,
                title: "Culture & Emotions",
                description: "Culture, emotions, conflict, media, formal language",
                order: 7,
            },
            {
                id: 8,
                courseId: 1,
                title: "Academic & Professional",
                description: "Professional talk, academic language, literature, dialects, proverbs",
                order: 8,
            },
            {
                id: 9,
                courseId: 1,
                title: "Society & Ideas",
                description: "Society, history, abstract ideas, real-life use",
                order: 9,
            },
        ]);

        // Lessons for levels 12–50 (each level is one lesson with 2 questions)
        const extraLessons = [
            // Unit 2 – Everyday Basics (levels 12–16)
            { id: 12, unitId: 2, order: 1, title: "Level 12 – Numbers" },
            { id: 13, unitId: 2, order: 2, title: "Level 13 – Colors" },
            { id: 14, unitId: 2, order: 3, title: "Level 14 – Weather" },
            { id: 15, unitId: 2, order: 4, title: "Level 15 – Daily Routine" },
            { id: 16, unitId: 2, order: 5, title: "Level 16 – Health" },
            // Unit 3 – Daily Life & Movement (levels 17–21)
            { id: 17, unitId: 3, order: 1, title: "Level 17 – Directions" },
            { id: 18, unitId: 3, order: 2, title: "Level 18 – Shopping" },
            { id: 19, unitId: 3, order: 3, title: "Level 19 – Transport" },
            { id: 20, unitId: 3, order: 4, title: "Level 20 – Politeness" },
            { id: 21, unitId: 3, order: 5, title: "Level 21 – Past Tense" },
            // Unit 4 – Reasons & Descriptions (levels 22–26)
            { id: 22, unitId: 4, order: 1, title: "Level 22 – Future Tense" },
            { id: 23, unitId: 4, order: 2, title: "Level 23 – Reasons" },
            { id: 24, unitId: 4, order: 3, title: "Level 24 – Comparisons" },
            { id: 25, unitId: 4, order: 4, title: "Level 25 – Describing People" },
            { id: 26, unitId: 4, order: 5, title: "Level 26 – House" },
            // Unit 5 – Modern Life & Communication (levels 27–31)
            { id: 27, unitId: 5, order: 1, title: "Level 27 – Technology" },
            { id: 28, unitId: 5, order: 2, title: "Level 28 – Education" },
            { id: 29, unitId: 5, order: 3, title: "Level 29 – Work" },
            { id: 30, unitId: 5, order: 4, title: "Level 30 – Social Talk" },
            { id: 31, unitId: 5, order: 5, title: "Level 31 – Complex Sentences" },
            // Unit 6 – Stories & Social Norms (levels 32–36)
            { id: 32, unitId: 6, order: 1, title: "Level 32 – Passive Voice" },
            { id: 33, unitId: 6, order: 2, title: "Level 33 – Storytelling" },
            { id: 34, unitId: 6, order: 3, title: "Level 34 – Opinions" },
            { id: 35, unitId: 6, order: 4, title: "Level 35 – Idioms" },
            { id: 36, unitId: 6, order: 5, title: "Level 36 – Social Norms" },
            // Unit 7 – Culture & Emotions (levels 37–41)
            { id: 37, unitId: 7, order: 1, title: "Level 37 – Culture" },
            { id: 38, unitId: 7, order: 2, title: "Level 38 – Emotions" },
            { id: 39, unitId: 7, order: 3, title: "Level 39 – Conflict" },
            { id: 40, unitId: 7, order: 4, title: "Level 40 – Media" },
            { id: 41, unitId: 7, order: 5, title: "Level 41 – Formal Language" },
            // Unit 8 – Academic & Professional (levels 42–46)
            { id: 42, unitId: 8, order: 1, title: "Level 42 – Professional Talk" },
            { id: 43, unitId: 8, order: 2, title: "Level 43 – Academic Language" },
            { id: 44, unitId: 8, order: 3, title: "Level 44 – Literature" },
            { id: 45, unitId: 8, order: 4, title: "Level 45 – Dialects" },
            { id: 46, unitId: 8, order: 5, title: "Level 46 – Proverbs" },
            // Unit 9 – Society & Ideas (levels 47–50)
            { id: 47, unitId: 9, order: 1, title: "Level 47 – Society" },
            { id: 48, unitId: 9, order: 2, title: "Level 48 – History" },
            { id: 49, unitId: 9, order: 3, title: "Level 49 – Abstract Ideas" },
            { id: 50, unitId: 9, order: 4, title: "Level 50 – Real-Life Use" },
        ];

        await db.insert(schema.lessons).values(extraLessons);

        // Insert challenges directly with id, lessonId, type, order, question
        await db.insert(schema.challenges).values([
            // Lesson 1 (3 questions)
            {
                id: 1,
                lessonId: 1,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with ا?",
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ب?",
            },
            {
                id: 3,
                lessonId: 1,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with پ?",
            },
            // Lesson 2 (3 questions)
            {
                id: 4,
                lessonId: 2,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with ت?",
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ټ?",
            },
            {
                id: 6,
                lessonId: 2,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ث?",
            },
            // Lesson 3 (3 questions)
            {
                id: 7,
                lessonId: 3,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with ج?",
            },
            {
                id: 8,
                lessonId: 3,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with چ?",
            },
            {
                id: 9,
                lessonId: 3,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ح?",
            },
            // Lesson 4 (3 questions)
            {
                id: 10,
                lessonId: 4,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with خ?",
            },
            {
                id: 11,
                lessonId: 4,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with د?",
            },
            {
                id: 12,
                lessonId: 4,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ذ?",
            },
            // Lesson 5 (3 questions)
            {
                id: 13,
                lessonId: 5,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with ر?",
            },
            {
                id: 14,
                lessonId: 5,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ز?",
            },
            {
                id: 15,
                lessonId: 5,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ژ?",
            },
            // Lesson 6 (3 questions)
            {
                id: 16,
                lessonId: 6,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with س?",
            },
            {
                id: 17,
                lessonId: 6,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ش?",
            },
            {
                id: 18,
                lessonId: 6,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ص?",
            },
            // Lesson 7 (3 questions)
            {
                id: 19,
                lessonId: 7,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with ط?",
            },
            {
                id: 20,
                lessonId: 7,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ظ?",
            },
            {
                id: 21,
                lessonId: 7,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ع?",
            },
            // Lesson 8 (3 questions)
            {
                id: 22,
                lessonId: 8,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with غ?",
            },
            {
                id: 23,
                lessonId: 8,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ف?",
            },
            {
                id: 24,
                lessonId: 8,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ق?",
            },
            // Lesson 9 (3 questions)
            {
                id: 25,
                lessonId: 9,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with ک?",
            },
            {
                id: 26,
                lessonId: 9,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ګ?",
            },
            {
                id: 27,
                lessonId: 9,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ل?",
            },
            // Lesson 10 (3 questions)
            {
                id: 28,
                lessonId: 10,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with م?",
            },
            {
                id: 29,
                lessonId: 10,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ن?",
            },
            {
                id: 30,
                lessonId: 10,
                type: "ASSIST" as const,
                order: 3,
                question: "Which word starts with ه?",
            },
            // Lesson 11 (2 questions)
            {
                id: 31,
                lessonId: 11,
                type: "ASSIST" as const,
                order: 1,
                question: "Which word starts with و?",
            },
            {
                id: 32,
                lessonId: 11,
                type: "ASSIST" as const,
                order: 2,
                question: "Which word starts with ی?",
            },
        ]);

        // Insert challenge options explicitly with audio sources for each option (alphabet)
        await db.insert(schema.challengeOptions).values([
            // Challenge 1 - ا (alif)
            { challengeId: 1, text: "کور", correct: false, audioSrc: "/alif1.m4a" },
            { challengeId: 1, text: "کتاب", correct: false, audioSrc: "/alif2.m4a" },
            { challengeId: 1, text: "اوبه", correct: true, audioSrc: "/alif3.m4a" },
            { challengeId: 1, text: "بازار", correct: false, audioSrc: "/alif4.m4a" },
            // Challenge 2 - ب (bay)
            { challengeId: 2, text: "ماشوم", correct: false, audioSrc: "/bay1.m4a" },
            { challengeId: 2, text: "بازار", correct: true, audioSrc: "/bay2.m4a" },
            { challengeId: 2, text: "کور", correct: false, audioSrc: "/bay3.m4a" },
            { challengeId: 2, text: "سړک", correct: false, audioSrc: "/bay4.m4a" },
            // Challenge 3 - پ (Pay)
            { challengeId: 3, text: "کتاب", correct: false, audioSrc: "/Pay1.m4a" },
            { challengeId: 3, text: "پلار", correct: true, audioSrc: "/Pay2.m4a" },
            { challengeId: 3, text: "ښوونځی", correct: false, audioSrc: "/Pay3.m4a" },
            { challengeId: 3, text: "ملګری", correct: false, audioSrc: "/Pay4.m4a" },
            // Challenge 4 - ت (Tay)
            { challengeId: 4, text: "کور", correct: false, audioSrc: "/Tay1.m4a" },
            { challengeId: 4, text: "تاريخ", correct: true, audioSrc: "/Tay2.m4a" },
            { challengeId: 4, text: "اوبه", correct: false, audioSrc: "/Tay3.m4a" },
            { challengeId: 4, text: "بازار", correct: false, audioSrc: "/Tay4.m4a" },
            // Challenge 5 - ټ (Ttay)
            { challengeId: 5, text: "سړی", correct: false, audioSrc: "/Ttay1.m4a" },
            { challengeId: 5, text: "ټوپک", correct: true, audioSrc: "/Ttay2.m4a" },
            { challengeId: 5, text: "کتاب", correct: false, audioSrc: "/Ttay3.m4a" },
            { challengeId: 5, text: "ښوونځی", correct: false, audioSrc: "/Ttay4.m4a" },
            // Challenge 6 - ث (Say)
            { challengeId: 6, text: "ماشوم", correct: false, audioSrc: "/Say1.m4a" },
            { challengeId: 6, text: "کتاب", correct: false, audioSrc: "/Say2.m4a" },
            { challengeId: 6, text: "ثواب", correct: true, audioSrc: "/Say3.m4a" },
            { challengeId: 6, text: "بازار", correct: false, audioSrc: "/Say4.m4a" },
            // Challenge 7 - ج (Jeem)
            { challengeId: 7, text: "کتاب", correct: false, audioSrc: "/Jeem1.m4a" },
            { challengeId: 7, text: "جرګه", correct: true, audioSrc: "/Jeem2.m4a" },
            { challengeId: 7, text: "کور", correct: false, audioSrc: "/Jeem3.m4a" },
            { challengeId: 7, text: "اوبه", correct: false, audioSrc: "/Jeem4.m4a" },
            // Challenge 8 - چ (Chay)
            { challengeId: 8, text: "سړک", correct: false, audioSrc: "/Chay1.m4a" },
            { challengeId: 8, text: "چای", correct: true, audioSrc: "/Chay2.m4a" },
            { challengeId: 8, text: "بازار", correct: false, audioSrc: "/Chay3.m4a" },
            { challengeId: 8, text: "ښوونځی", correct: false, audioSrc: "/Chay4.m4a" },
            // Challenge 9 - ح (Hay)
            { challengeId: 9, text: "کتاب", correct: false, audioSrc: "/Hay1.m4a" },
            { challengeId: 9, text: "ماشوم", correct: false, audioSrc: "/Hay2.m4a" },
            { challengeId: 9, text: "حوصله", correct: true, audioSrc: "/Hay3.m4a" },
            { challengeId: 9, text: "کور", correct: false, audioSrc: "/Hay4.m4a" },
            // Challenge 10 - خ (Khay)
            { challengeId: 10, text: "بازار", correct: false, audioSrc: "/Khay1.m4a" },
            { challengeId: 10, text: "ښوونځی", correct: false, audioSrc: "/Khay2.m4a" },
            { challengeId: 10, text: "خوب", correct: true, audioSrc: "/Khay3.m4a" },
            { challengeId: 10, text: "کتاب", correct: false, audioSrc: "/Khay4.m4a" },
            // Challenge 11 - د (Daal)
            { challengeId: 11, text: "ماشوم", correct: false, audioSrc: "/Daal1.m4a" },
            { challengeId: 11, text: "دفتر", correct: true, audioSrc: "/Daal2.m4a" },
            { challengeId: 11, text: "کتاب", correct: false, audioSrc: "/Daal3.m4a" },
            { challengeId: 11, text: "کور", correct: false, audioSrc: "/Daal4.m4a" },
            // Challenge 12 - ذ (Zaal)
            { challengeId: 12, text: "بازار", correct: false, audioSrc: "/Zaal1.m4a" },
            { challengeId: 12, text: "کتاب", correct: false, audioSrc: "/Zaal2.m4a" },
            { challengeId: 12, text: "ذهن", correct: true, audioSrc: "/Zaal3.m4a" },
            { challengeId: 12, text: "کور", correct: false, audioSrc: "/Zaal4.m4a" },
            // Challenge 13 - ر (Raay)
            { challengeId: 13, text: "سړک", correct: false, audioSrc: "/Raay1.m4a" },
            { challengeId: 13, text: "کتاب", correct: false, audioSrc: "/Raay2.m4a" },
            { challengeId: 13, text: "رڼا", correct: true, audioSrc: "/Raay3.m4a" },
            { challengeId: 13, text: "ماشوم", correct: false, audioSrc: "/Raay4.m4a" },
            // Challenge 14 - ز (Zay)
            { challengeId: 14, text: "بازار", correct: false, audioSrc: "/Zay1.m4a" },
            { challengeId: 14, text: "ژوند", correct: true, audioSrc: "/Zay2.m4a" },
            { challengeId: 14, text: "کور", correct: false, audioSrc: "/Zay3.m4a" },
            { challengeId: 14, text: "کتاب", correct: false, audioSrc: "/Zay4.m4a" },
            // Challenge 15 - ژ (Zhay)
            { challengeId: 15, text: "سړی", correct: false, audioSrc: "/Zhay1.m4a" },
            { challengeId: 15, text: "ژبه", correct: true, audioSrc: "/Zhay2.m4a" },
            { challengeId: 15, text: "کتاب", correct: false, audioSrc: "/Zhay3.m4a" },
            { challengeId: 15, text: "بازار", correct: false, audioSrc: "/Zhay4.m4a" },
            // Challenge 16 - س (Seen)
            { challengeId: 16, text: "ښوونځی", correct: false, audioSrc: "/Seen1.m4a" },
            { challengeId: 16, text: "سړی", correct: true, audioSrc: "/Seen2.m4a" },
            { challengeId: 16, text: "کور", correct: false, audioSrc: "/Seen3.m4a" },
            { challengeId: 16, text: "کتاب", correct: false, audioSrc: "/Seen4.m4a" },
            // Challenge 17 - ش (Sheen)
            { challengeId: 17, text: "بازار", correct: false, audioSrc: "/Sheen1.m4a" },
            { challengeId: 17, text: "ښوونځی", correct: true, audioSrc: "/Sheen2.m4a" },
            { challengeId: 17, text: "کتاب", correct: false, audioSrc: "/Sheen3.m4a" },
            { challengeId: 17, text: "کور", correct: false, audioSrc: "/Sheen4.m4a" },
            // Challenge 18 - ص (Suaad)
            { challengeId: 18, text: "کور", correct: false, audioSrc: "/Suaad1.m4a" },
            { challengeId: 18, text: "صبر", correct: true, audioSrc: "/Suaad2.m4a" },
            { challengeId: 18, text: "بازار", correct: false, audioSrc: "/Suaad3.m4a" },
            { challengeId: 18, text: "کتاب", correct: false, audioSrc: "/Suaad4.m4a" },
            // Challenge 19 - ض (Zuaad)
            { challengeId: 19, text: "کتاب", correct: false, audioSrc: "/Toay1.m4a" },
            { challengeId: 19, text: "بازار", correct: false, audioSrc: "/Toay2.m4a" },
            { challengeId: 19, text: "ضمير", correct: true, audioSrc: "/Toay3.m4a" },
            { challengeId: 19, text: "کور", correct: false, audioSrc: "/Toay4.m4a" },
            // Challenge 20 - ظ (Zoay)
            { challengeId: 20, text: "ظلم", correct: true, audioSrc: "/Zoay1.m4a" },
            { challengeId: 20, text: "موټر", correct: false, audioSrc: "/Zoay2.m4a" },
            { challengeId: 20, text: "نوم", correct: false, audioSrc: "/Zoay3.m4a" },
            { challengeId: 20, text: "اوبه", correct: false, audioSrc: "/Zoay4.m4a" },
            // Challenge 21 - ع (Ain)
            { challengeId: 21, text: "علم", correct: true, audioSrc: "/Ain1.m4a" },
            { challengeId: 21, text: "کور", correct: false, audioSrc: "/Ain2.m4a" },
            { challengeId: 21, text: "بازار", correct: false, audioSrc: "/Ain3.m4a" },
            { challengeId: 21, text: "سړک", correct: false, audioSrc: "/Ain4.m4a" },
            // Challenge 22 - غ (Ghain)
            { challengeId: 22, text: "غږ", correct: true, audioSrc: "/Ghain1.m4a" },
            { challengeId: 22, text: "کلي", correct: false, audioSrc: "/Ghain2.m4a" },
            { challengeId: 22, text: "ښوونځی", correct: false, audioSrc: "/Ghain3.m4a" },
            { challengeId: 22, text: "ماشوم", correct: false, audioSrc: "/Ghain4.m4a" },
            // Challenge 23 - ف (Fay)
            { challengeId: 23, text: "فصل", correct: true, audioSrc: "/Fay1.m4a" },
            { challengeId: 23, text: "غر", correct: false, audioSrc: "/Fay2.m4a" },
            { challengeId: 23, text: "وطن", correct: false, audioSrc: "/Fay3.m4a" },
            { challengeId: 23, text: "ملګری", correct: false, audioSrc: "/Fay4.m4a" },
            // Challenge 24 - ق (Qaf)
            { challengeId: 24, text: "قوم", correct: true, audioSrc: "/Qaf1.m4a" },
            { challengeId: 24, text: "کور", correct: false, audioSrc: "/Qaf2.m4a" },
            { challengeId: 24, text: "بازار", correct: false, audioSrc: "/Qaf3.m4a" },
            { challengeId: 24, text: "اوبه", correct: false, audioSrc: "/Qaf4.m4a" },
            // Challenge 25 - ک (Kaaf)
            { challengeId: 25, text: "کتاب", correct: true, audioSrc: "/Kaaf1.m4a" },
            { challengeId: 25, text: "غر", correct: false, audioSrc: "/Kaaf2.m4a" },
            { challengeId: 25, text: "هوا", correct: false, audioSrc: "/Kaaf3.m4a" },
            { challengeId: 25, text: "نوم", correct: false, audioSrc: "/Kaaf4.m4a" },
            // Challenge 26 - ګ (Gaf)
            { challengeId: 26, text: "ګل", correct: true, audioSrc: "/Gaf1.m4a" },
            { challengeId: 26, text: "بازار", correct: false, audioSrc: "/Gaf2.m4a" },
            { challengeId: 26, text: "موټر", correct: false, audioSrc: "/Gaf3.m4a" },
            { challengeId: 26, text: "سړک", correct: false, audioSrc: "/Gaf4.m4a" },
            // Challenge 27 - ل (Lam)
            { challengeId: 27, text: "لار", correct: true, audioSrc: "/Lam1.m4a" },
            { challengeId: 27, text: "کور", correct: false, audioSrc: "/Lam2.m4a" },
            { challengeId: 27, text: "ماشوم", correct: false, audioSrc: "/Lam3.m4a" },
            { challengeId: 27, text: "غر", correct: false, audioSrc: "/Lam4.m4a" },
            // Challenge 28 - م (Meem)
            { challengeId: 28, text: "مېز", correct: true, audioSrc: "/Meem1.m4a" },
            { challengeId: 28, text: "وطن", correct: false, audioSrc: "/Meem2.m4a" },
            { challengeId: 28, text: "کتاب", correct: false, audioSrc: "/Meem3.m4a" },
            { challengeId: 28, text: "اوبه", correct: false, audioSrc: "/Meem4.m4a" },
            // Challenge 29 - ن (Nun)
            { challengeId: 29, text: "نوم", correct: true, audioSrc: "/Nun1.m4a" },
            { challengeId: 29, text: "غر", correct: false, audioSrc: "/Nun2.m4a" },
            { challengeId: 29, text: "ښوونځی", correct: false, audioSrc: "/Nun3.m4a" },
            { challengeId: 29, text: "بازار", correct: false, audioSrc: "/Nun4.m4a" },
            // Challenge 30 - ه (Ha)
            { challengeId: 30, text: "هوا", correct: true, audioSrc: "/Ha1.m4a" },
            { challengeId: 30, text: "کور", correct: false, audioSrc: "/Ha2.m4a" },
            { challengeId: 30, text: "ملګری", correct: false, audioSrc: "/Ha3.m4a" },
            { challengeId: 30, text: "کتاب", correct: false, audioSrc: "/Ha4.m4a" },
            // Challenge 31 - و (Wow)
            { challengeId: 31, text: "وطن", correct: true, audioSrc: "/Wow1.m4a" },
            { challengeId: 31, text: "غر", correct: false, audioSrc: "/Wow2.m4a" },
            { challengeId: 31, text: "ماشوم", correct: false, audioSrc: "/Wow3.m4a" },
            { challengeId: 31, text: "سړک", correct: false, audioSrc: "/Wow4.m4a" },
            // Challenge 32 - ی (Ya)
            { challengeId: 32, text: "یار", correct: true, audioSrc: "/Ya1.m4a" },
            { challengeId: 32, text: "کتاب", correct: false, audioSrc: "/Ya2.m4a" },
            { challengeId: 32, text: "موټر", correct: false, audioSrc: "/Ya3.m4a" },
            { challengeId: 32, text: "کور", correct: false, audioSrc: "/Ya4.m4a" },
        ]);

        // Higher-level questions (Levels 12–50), each level has 2 questions (ASSIST)
        const advancedLevels = [
            // Level 12 – Numbers
            {
                level: 12,
                questions: [
                    {
                        prompt: 'What is the meaning of "درې"?',
                        options: ["One", "Two", "Three", "Four"],
                        correctIndex: 2, // Three
                    },
                    {
                        prompt: "Which word means ten?",
                        options: ["پنځه", "لس", "اوه", "اته"],
                        correctIndex: 1, // لس
                    },
                ],
            },
            // Level 13 – Colors
            {
                level: 13,
                questions: [
                    {
                        prompt: '"سور" means:',
                        options: ["Blue", "Red", "Green", "Black"],
                        correctIndex: 1, // Red
                    },
                    {
                        prompt: "Which word means white?",
                        options: ["تور", "ژېړ", "شين", "سپين"],
                        correctIndex: 3, // سپين
                    },
                ],
            },
            // Level 14 – Weather
            {
                level: 14,
                questions: [
                    {
                        prompt: '"باران" means:',
                        options: ["Wind", "Snow", "Rain", "Cloud"],
                        correctIndex: 2, // Rain
                    },
                    {
                        prompt: "Which word means cold?",
                        options: ["ګرم", "يخ", "لوند", "وچ"],
                        correctIndex: 1, // يخ
                    },
                ],
            },
            // Level 15 – Daily Routine
            {
                level: 15,
                questions: [
                    {
                        prompt: '"زه سهار پاڅېږم" means:',
                        options: [
                            "I sleep at night",
                            "I wake up in the morning",
                            "I eat food",
                            "I go home",
                        ],
                        correctIndex: 1,
                    },
                    {
                        prompt: "Which word means sleep?",
                        options: ["کار", "لوبه", "خوب", "تګ"],
                        correctIndex: 2, // خوب
                    },
                ],
            },
            // Level 16 – Health
            {
                level: 16,
                questions: [
                    {
                        prompt: '"سر" means:',
                        options: ["Hand", "Head", "Leg", "Eye"],
                        correctIndex: 1, // Head
                    },
                    {
                        prompt: "Which word means fever?",
                        options: ["درد", "ټوخی", "تبه", "زخم"],
                        correctIndex: 2, // تبه
                    },
                ],
            },
            // Level 17 – Directions
            {
                level: 17,
                questions: [
                    {
                        prompt: '"ښي" means:',
                        options: ["Left", "Right", "Front", "Back"],
                        correctIndex: 1, // Right
                    },
                    {
                        prompt: "Which word means near?",
                        options: ["لرې", "نږدې", "پورته", "ښکته"],
                        correctIndex: 1, // نږدې
                    },
                ],
            },
            // Level 18 – Shopping
            {
                level: 18,
                questions: [
                    {
                        prompt: '"قيمت" means:',
                        options: ["Color", "Money", "Price", "Shop"],
                        correctIndex: 2, // Price
                    },
                    {
                        prompt: "Which word means cheap?",
                        options: ["ګران", "ارزانه", "لوی", "وړوکی"],
                        correctIndex: 1, // ارزانه
                    },
                ],
            },
            // Level 19 – Transport
            {
                level: 19,
                questions: [
                    {
                        prompt: '"موټر" means:',
                        options: ["Train", "Bus", "Car", "Bike"],
                        correctIndex: 2, // Car
                    },
                    {
                        prompt: "Which word means road?",
                        options: ["سړک", "کور", "پل", "دروازه"],
                        correctIndex: 0, // سړک
                    },
                ],
            },
            // Level 20 – Politeness
            {
                level: 20,
                questions: [
                    {
                        prompt: '"مهرباني وکړئ" means:',
                        options: ["Sorry", "Please", "Thanks", "Hello"],
                        correctIndex: 1, // Please
                    },
                    {
                        prompt: "Which word means thank you?",
                        options: ["سلام", "بخښنه", "مننه", "خداى پامان"],
                        correctIndex: 2, // مننه
                    },
                ],
            },
            // Level 21 – Past Tense
            {
                level: 21,
                questions: [
                    {
                        prompt: '"ما وخوړه" means:',
                        options: ["I will eat", "I eat", "I ate", "I am eating"],
                        correctIndex: 2, // I ate
                    },
                    {
                        prompt: "Which word shows past?",
                        options: ["کوم", "کومه", "وکړل", "کوي"],
                        correctIndex: 2, // وکړل
                    },
                ],
            },
            // Level 22 – Future Tense
            {
                level: 22,
                questions: [
                    {
                        prompt: '"زه به ځم" means:',
                        options: ["I went", "I go", "I will go", "I am going"],
                        correctIndex: 2, // I will go
                    },
                    {
                        prompt: "Which word indicates future?",
                        options: ["وو", "به", "دی", "ووایم"],
                        correctIndex: 1, // به
                    },
                ],
            },
            // Level 23 – Reasons
            {
                level: 23,
                questions: [
                    {
                        prompt: '"ځکه چې" means:',
                        options: ["But", "Because", "Although", "And"],
                        correctIndex: 1, // Because
                    },
                    {
                        prompt: "Choose the correct reason sentence:",
                        options: [
                            "زه خوشحاله يم ځکه چې بريالی شوم",
                            "زه ځم بازار",
                            "دا کتاب دی",
                            "هوا ګرمه ده",
                        ],
                        correctIndex: 0,
                    },
                ],
            },
            // Level 24 – Comparisons
            {
                level: 24,
                questions: [
                    {
                        prompt: '"لوی" means:',
                        options: ["Small", "Big", "Fast", "New"],
                        correctIndex: 1, // Big
                    },
                    {
                        prompt: "Which word means better?",
                        options: ["ښه", "بد", "ورو", "لرې"],
                        correctIndex: 0, // ښه
                    },
                ],
            },
            // Level 25 – Describing People
            {
                level: 25,
                questions: [
                    {
                        prompt: '"ښه سړی" means:',
                        options: ["Bad man", "Old man", "Good man", "Tall man"],
                        correctIndex: 2, // Good man
                    },
                    {
                        prompt: "Which word means honest?",
                        options: ["ريښتونی", "غوسه", "سست", "تيز"],
                        correctIndex: 0, // ريښتونی
                    },
                ],
            },
            // Level 26 – House
            {
                level: 26,
                questions: [
                    {
                        prompt: '"کوټه" means:',
                        options: ["Door", "Roof", "Room", "Wall"],
                        correctIndex: 2, // Room
                    },
                    {
                        prompt: "Which word means kitchen?",
                        options: ["تشناب", "پخلنځی", "کوټه", "دهلېز"],
                        correctIndex: 1, // پخلنځی
                    },
                ],
            },
            // Level 27 – Technology
            {
                level: 27,
                questions: [
                    {
                        prompt: '"موبايل" means:',
                        options: ["TV", "Laptop", "Mobile phone", "Radio"],
                        correctIndex: 2, // Mobile phone
                    },
                    {
                        prompt: "Which word means internet?",
                        options: ["برېښنا", "شبکه", "انټرنېټ", "کمپيوټر"],
                        correctIndex: 2, // انټرنېټ
                    },
                ],
            },
            // Level 28 – Education
            {
                level: 28,
                questions: [
                    {
                        prompt: '"ښوونکی" means:',
                        options: ["Student", "Teacher", "Doctor", "Worker"],
                        correctIndex: 1, // Teacher
                    },
                    {
                        prompt: "Which word means exam?",
                        options: ["سبق", "کتاب", "امتحان", "ښوونځی"],
                        correctIndex: 2, // امتحان
                    },
                ],
            },
            // Level 29 – Work
            {
                level: 29,
                questions: [
                    {
                        prompt: '"دفتر" means:',
                        options: ["School", "Office", "Shop", "Home"],
                        correctIndex: 1, // Office
                    },
                    {
                        prompt: "Which word means job?",
                        options: ["لوبه", "کار", "سفر", "درس"],
                        correctIndex: 1, // کار
                    },
                ],
            },
            // Level 30 – Social Talk
            {
                level: 30,
                questions: [
                    {
                        prompt: '"زه موافق يم" means:',
                        options: ["I disagree", "I am angry", "I agree", "I refuse"],
                        correctIndex: 2, // I agree
                    },
                    {
                        prompt: "Which word means disagree?",
                        options: ["موافق", "مخالف", "خوشحال", "غمجن"],
                        correctIndex: 1, // مخالف
                    },
                ],
            },
            // Level 31 – Complex Sentences
            {
                level: 31,
                questions: [
                    {
                        prompt: '"که څه هم" means:',
                        options: ["Because", "Although", "And", "Therefore"],
                        correctIndex: 1, // Although
                    },
                    {
                        prompt: "Identify a complex sentence:",
                        options: [
                            "زه خوشحاله يم",
                            "زه ځم",
                            "که څه هم باران و، موږ ولاړو",
                            "دا کتاب دی",
                        ],
                        correctIndex: 2,
                    },
                ],
            },
            // Level 32 – Passive Voice
            {
                level: 32,
                questions: [
                    {
                        prompt: '"کار وشو" means:',
                        options: [
                            "I did work",
                            "Work is done",
                            "Work will be done",
                            "Doing work",
                        ],
                        correctIndex: 1, // Work is done
                    },
                    {
                        prompt: "Passive sentence is:",
                        options: [
                            "زه کتاب لولم",
                            "کتاب ولوستل شو",
                            "زه کتاب اخلم",
                            "کتاب واخله",
                        ],
                        correctIndex: 1,
                    },
                ],
            },
            // Level 33 – Storytelling
            {
                level: 33,
                questions: [
                    {
                        prompt: "Which word shows sequence?",
                        options: ["ناڅاپه", "بيا", "ولې", "که"],
                        correctIndex: 1, // بيا
                    },
                    {
                        prompt: "Story sentences usually use:",
                        options: ["Commands", "Questions", "Past tense", "Future tense"],
                        correctIndex: 2, // Past tense
                    },
                ],
            },
            // Level 34 – Opinions
            {
                level: 34,
                questions: [
                    {
                        prompt: '"زما په اند" means:',
                        options: ["I think", "I know", "I see", "I hear"],
                        correctIndex: 0, // I think
                    },
                    {
                        prompt: "Opinion sentence is:",
                        options: [
                            "دا کتاب دی",
                            "زما په اند دا ښه دی",
                            "دروازه خلاصه ده",
                            "زه ځم",
                        ],
                        correctIndex: 1,
                    },
                ],
            },
            // Level 35 – Idioms
            {
                level: 35,
                questions: [
                    {
                        prompt: '"لاس پښې کېدل" means:',
                        options: ["To help", "To panic", "To work", "To relax"],
                        correctIndex: 1, // To panic
                    },
                    {
                        prompt: "Idioms are:",
                        options: ["Literal", "Formal", "Figurative", "Scientific"],
                        correctIndex: 2, // Figurative
                    },
                ],
            },
            // Level 36 – Social Norms
            {
                level: 36,
                questions: [
                    {
                        prompt: "Respect word for elders:",
                        options: ["ته", "تاسو", "دی", "دا"],
                        correctIndex: 1, // تاسو
                    },
                    {
                        prompt: "Greeting elders shows:",
                        options: ["Speed", "Respect", "Fear", "Anger"],
                        correctIndex: 1, // Respect
                    },
                ],
            },
            // Level 37 – Culture
            {
                level: 37,
                questions: [
                    {
                        prompt: '"جرګه" means:',
                        options: ["Party", "Council", "School", "Shop"],
                        correctIndex: 1, // Council
                    },
                    {
                        prompt: "Which is a cultural event?",
                        options: ["واده", "درس", "لوبه", "کار"],
                        correctIndex: 0, // واده
                    },
                ],
            },
            // Level 38 – Emotions
            {
                level: 38,
                questions: [
                    {
                        prompt: '"خوشحال" means:',
                        options: ["Angry", "Sad", "Happy", "Tired"],
                        correctIndex: 2, // Happy
                    },
                    {
                        prompt: "Which word means sad?",
                        options: ["غمجن", "قوي", "تيز", "ښکلی"],
                        correctIndex: 0, // غمجن
                    },
                ],
            },
            // Level 39 – Conflict
            {
                level: 39,
                questions: [
                    {
                        prompt: '"بخښنه غواړم" means:',
                        options: ["Thank you", "Sorry", "Goodbye", "Welcome"],
                        correctIndex: 1, // Sorry
                    },
                    {
                        prompt: "Conflict resolution needs:",
                        options: ["Anger", "Silence", "Apology", "Speed"],
                        correctIndex: 2, // Apology
                    },
                ],
            },
            // Level 40 – Media
            {
                level: 40,
                questions: [
                    {
                        prompt: '"خبر" means:',
                        options: ["Story", "News", "Song", "Letter"],
                        correctIndex: 1, // News
                    },
                    {
                        prompt: "News is found in:",
                        options: ["کتاب", "ورځپاڼه", "دفتر", "ښوونځی"],
                        correctIndex: 1, // ورځپاڼه
                    },
                ],
            },
            // Level 41 – Formal Language
            {
                level: 41,
                questions: [
                    {
                        prompt: "Formal word for request:",
                        options: ["راکړه", "ورکړه", "مهرباني وکړئ", "راځه"],
                        correctIndex: 2, // مهرباني وکړئ
                    },
                    {
                        prompt: "Formal language is used in:",
                        options: ["Friends", "Office", "Games", "Home"],
                        correctIndex: 1, // Office
                    },
                ],
            },
            // Level 42 – Professional Talk
            {
                level: 42,
                questions: [
                    {
                        prompt: '"غونډه" means:',
                        options: ["Class", "Meeting", "Party", "Game"],
                        correctIndex: 1, // Meeting
                    },
                    {
                        prompt: "Workplace language should be:",
                        options: ["Casual", "Polite", "Loud", "Funny"],
                        correctIndex: 1, // Polite
                    },
                ],
            },
            // Level 43 – Academic Language
            {
                level: 43,
                questions: [
                    {
                        prompt: '"تحقيق" means:',
                        options: ["Test", "Research", "Homework", "Lesson"],
                        correctIndex: 1, // Research
                    },
                    {
                        prompt: "Academic language is:",
                        options: ["Simple", "Emotional", "Formal", "Slang"],
                        correctIndex: 2, // Formal
                    },
                ],
            },
            // Level 44 – Literature
            {
                level: 44,
                questions: [
                    {
                        prompt: '"شعر" means:',
                        options: ["Essay", "Poem", "Story", "News"],
                        correctIndex: 1, // Poem
                    },
                    {
                        prompt: "Poetry uses:",
                        options: ["Numbers", "Emotion", "Orders", "Facts"],
                        correctIndex: 1, // Emotion
                    },
                ],
            },
            // Level 45 – Dialects
            {
                level: 45,
                questions: [
                    {
                        prompt: "Dialects are:",
                        options: [
                            "Same everywhere",
                            "Regional variations",
                            "Errors",
                            "New languages",
                        ],
                        correctIndex: 1, // Regional variations
                    },
                    {
                        prompt: "Standard Pashto is used in:",
                        options: ["Education", "Slang", "Jokes", "Songs"],
                        correctIndex: 0, // Education
                    },
                ],
            },
            // Level 46 – Proverbs
            {
                level: 46,
                questions: [
                    {
                        prompt: "Proverbs teach:",
                        options: ["Games", "Lessons", "Science", "Math"],
                        correctIndex: 1, // Lessons
                    },
                    {
                        prompt: "Proverbs are:",
                        options: ["Long", "Short & wise", "Formal", "New"],
                        correctIndex: 1, // Short & wise
                    },
                ],
            },
            // Level 47 – Society
            {
                level: 47,
                questions: [
                    {
                        prompt: '"ټولنه" means:',
                        options: ["Family", "Society", "Country", "Group"],
                        correctIndex: 1, // Society
                    },
                    {
                        prompt: "ټولنه is made of:",
                        options: ["Buildings", "People", "Roads", "Laws"],
                        correctIndex: 1, // People
                    },
                ],
            },
            // Level 48 – History
            {
                level: 48,
                questions: [
                    {
                        prompt: '"تاريخ" means:',
                        options: ["Story", "History", "Culture", "Future"],
                        correctIndex: 1, // History
                    },
                    {
                        prompt: "تاريخ helps us:",
                        options: ["Sleep", "Learn lessons", "Forget", "Play"],
                        correctIndex: 1, // Learn lessons
                    },
                ],
            },
            // Level 49 – Abstract Ideas
            {
                level: 49,
                questions: [
                    {
                        prompt: '"ازادي" means:',
                        options: ["Law", "Freedom", "Power", "Order"],
                        correctIndex: 1, // Freedom
                    },
                    {
                        prompt: "ازادي ideas are:",
                        options: ["Visible", "Physical", "Conceptual", "Measurable"],
                        correctIndex: 2, // Conceptual
                    },
                ],
            },
            // Level 50 – Real-Life Use
            {
                level: 50,
                questions: [
                    {
                        prompt: "Best response to greeting:",
                        options: ["مننه", "سلام", "بخښنه", "خداى پامان"],
                        correctIndex: 1, // سلام
                    },
                    {
                        prompt: "Correct conversation ending:",
                        options: ["سلام", "مننه", "خداى پامان", "مهرباني يار"],
                        correctIndex: 2, // خداى پامان
                    },
                ],
            },
        ];

        // Build challenges and options for levels 12–50
        const advancedChallenges: {
            id: number;
            lessonId: number;
            type: typeof schema.challenges.$inferSelect["type"];
            order: number;
            question: string;
        }[] = [];

        const advancedChallengeOptions: {
            challengeId: number;
            text: string;
            correct: boolean;
            audioSrc: string;
        }[] = [];

        let nextChallengeId = 33; // continue after alphabet challenges (1–32)
        const optionLetters = ["A", "B", "C", "D"];

        for (const level of advancedLevels) {
            level.questions.forEach((q, questionIndex) => {
                const challengeId = nextChallengeId++;
                advancedChallenges.push({
                    id: challengeId,
                    lessonId: level.level,
                    type: "ASSIST",
                    order: questionIndex + 1,
                    question: q.prompt,
                });

                q.options.forEach((optText, optionIndex) => {
                    const letter = optionLetters[optionIndex];
                    const audioSrc = `/Q${level.level}-${questionIndex + 1}${letter}.m4a`;

                    advancedChallengeOptions.push({
                        challengeId,
                        text: optText,
                        correct: optionIndex === q.correctIndex,
                        audioSrc,
                    });
                });
            });
        }

        await db.insert(schema.challenges).values(advancedChallenges);
        await db.insert(schema.challengeOptions).values(advancedChallengeOptions);

        console.log("Seeding finished successfully!");
        console.log(
            `Created ${lessons.length + extraLessons.length} lessons with ${
                32 + advancedChallenges.length
            } challenges and ${
                (32 * 4) + advancedChallengeOptions.length
            } challenge options`,
        );

    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();


