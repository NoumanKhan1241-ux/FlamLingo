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

        // Create 11 lessons (10 with 3 questions, 1 with 2 questions = 32 questions total)
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
                question: "Which word starts with ض?",
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

        // Insert challenge options explicitly with audio sources for each option
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

        console.log("Seeding finished successfully!");
        console.log(`Created 11 lessons with 32 challenges and 128 challenge options`);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();


