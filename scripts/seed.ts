import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

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

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Pashto",
                imageSrc: "/pashtoflag.png",

            },
            {
                id: 2,
                title: "Sindhi",
                imageSrc: "/sindhiflag.png",
            },
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,  //pashto
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Pashto",
                order: 1,
            },
            {
                id: 2,
                courseId: 1,
                title: "Unit 2",
                description: "Learn intermediate Pashto",
                order: 2,
            },
            {
                id: 3,
                courseId: 1,
                title: "Unit 3",
                description: "Learn advanced Pashto",
                order: 3,
            },
            // Sindhi units mirroring Pashto
            {
                id: 4,  //sindhi
                courseId: 2,
                title: "Unit 1",
                description: "Learn the basics of Sindhi",
                order: 1,
            },
            {
                id: 5,
                courseId: 2,
                title: "Unit 2",
                description: "Learn intermediate Sindhi",
                order: 2,
            },
            {
                id: 6,
                courseId: 2,
                title: "Unit 3",
                description: "Learn advanced Sindhi",
                order: 3,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1, //pashto
                unitId: 1,        // unit 1
                order: 1,
                title: "alphabets",
            },
            {
                id: 2, //pashto
                unitId: 1,        // unit 1
                order: 2,
                title: "words",
            },
            {
                id: 3, //pashto
                unitId: 1,        // unit 1
                order: 3,
                title: "sentences",
            },
            {
                id: 4, //pashto
                unitId: 1,        // unit 1
                order: 4,
                title: "paragraphs",
            },
            {
                id: 5, //pashto
                unitId: 1,        // unit 1
                order: 5,
                title: "alphabets",
            },
            {
                id: 6,
                unitId: 2,
                order: 1,
                title: "Common Phrases",
            },
            {
                id: 7,
                unitId: 2,
                order: 2,
                title: "Greetings",
            },
            {
                id: 8,
                unitId: 2,
                order: 3,
                title: "Numbers",
            },
            {
                id: 9,
                unitId: 2,
                order: 4,
                title: "Days of Week",
            },
            {
                id: 10,
                unitId: 2,
                order: 5,
                title: "Months",
            },
            {
                id: 11,
                unitId: 3,
                order: 1,
                title: "Family Members",
            },
            {
                id: 12,
                unitId: 3,
                order: 2,
                title: "Professions",
            },
            {
                id: 13,
                unitId: 3,
                order: 3,
                title: "Weather",
            },
            {
                id: 14,
                unitId: 3,
                order: 4,
                title: "Food Items",
            },
            {
                id: 15,
                unitId: 3,
                order: 5,
                title: "Directions",
            },
            // Sindhi lessons mirroring Pashto (use unique ids and Sindhi unitIds 4..6)
            {
                id: 16,
                unitId: 4,        // sindhi unit 1
                order: 1,
                title: "alphabets",
            },
            {
                id: 17,
                unitId: 4,
                order: 2,
                title: "words",
            },
            {
                id: 18,
                unitId: 4,
                order: 3,
                title: "sentences",
            },
            {
                id: 19,
                unitId: 4,
                order: 4,
                title: "paragraphs",
            },
            {
                id: 20,
                unitId: 4,
                order: 5,
                title: "alphabets",
            },
            {
                id: 21,
                unitId: 5,
                order: 1,
                title: "Common Phrases",
            },
            {
                id: 22,
                unitId: 5,
                order: 2,
                title: "Greetings",
            },
            {
                id: 23,
                unitId: 5,
                order: 3,
                title: "Numbers",
            },
            {
                id: 24,
                unitId: 5,
                order: 4,
                title: "Days of Week",
            },
            {
                id: 25,
                unitId: 5,
                order: 5,
                title: "Months",
            },
            {
                id: 26,
                unitId: 6,
                order: 1,
                title: "Family Members",
            },
            {
                id: 27,
                unitId: 6,
                order: 2,
                title: "Professions",
            },
            {
                id: 28,
                unitId: 6,
                order: 3,
                title: "Weather",
            },
            {
                id: 29,
                unitId: 6,
                order: 4,
                title: "Food Items",
            },
            {
                id: 30,
                unitId: 6,
                order: 5,
                title: "Directions",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1, //pashto
                lessonId: 1,   //alphabets
                type: "SELECT",
                order: 1,
                question: 'ا',
            },
            {
                id: 2, //pashto
                lessonId: 1,   //nouns
                type: "SELECT",
                order: 2,
                question: 'آ',
            },
            {
                id: 3, //pashto
                lessonId: 1,   //nouns
                type: "SELECT",
                order: 3,
                question: 'ب',
            },
            {
                id: 4, //pashto
                lessonId: 1,   //nouns
                type: "SELECT",
                order: 4,
                question: 'پ',
            },
            {
                id: 5, //pashto
                lessonId: 1,   //nouns
                type: "SELECT",
                order: 5,
                question: 'ت',
            },
            {
                id: 6,
                lessonId: 6,
                type: "SELECT",
                order: 1,
                question: "How do you say 'Hello' in Pashto?",
            },
            {
                id: 7,
                lessonId: 6,
                type: "SELECT",
                order: 2,
                question: "How do you say 'Thank you' in Pashto?",
            },
            {
                id: 8,
                lessonId: 7,
                type: "SELECT",
                order: 1,
                question: "How do you say 'Good morning' in Pashto?",
            },
            {
                id: 9,
                lessonId: 7,
                type: "SELECT",
                order: 2,
                question: "How do you say 'Good night' in Pashto?",
            },
            {
                id: 10,
                lessonId: 8,
                type: "SELECT",
                order: 1,
                question: "What is '1' in Pashto?",
            },
            {
                id: 11,
                lessonId: 8,
                type: "SELECT",
                order: 2,
                question: "What is '2' in Pashto?",
            },
            {
                id: 12,
                lessonId: 9,
                type: "SELECT",
                order: 1,
                question: "How do you say 'Monday' in Pashto?",
            },
            {
                id: 13,
                lessonId: 9,
                type: "SELECT",
                order: 2,
                question: "How do you say 'Tuesday' in Pashto?",
            },
            {
                id: 14,
                lessonId: 10,
                type: "SELECT",
                order: 1,
                question: "How do you say 'January' in Pashto?",
            },
            {
                id: 15,
                lessonId: 10,
                type: "SELECT",
                order: 2,
                question: "How do you say 'February' in Pashto?",
            },
            {
                id: 16, //pashto
                lessonId: 2,   //verbs
                type: "ASSIST",
                order: 2,
                question: '"Drinking water"',
            },
            {
                id: 17, //pashto
                lessonId: 2,   //verbs
                type: "SELECT",
                order: 3,
                question: 'Which one of these is" not driving"?',
            },
            {
                id: 18, //pashto
                lessonId: 3,   //verbs
                type: "SELECT",
                order: 1,
                question: 'Which one of them is"Running"?',
            },
            {
                id: 19, //pashto
                lessonId: 3,   //verbs
                type: "ASSIST",
                order: 2,
                question: '"Drinking water"',
            },
            {
                id: 20, //pashto
                lessonId: 3,   //verbs
                type: "SELECT",
                order: 3,
                question: 'Which one of these is" not driving"?',
            },
            // --- Sindhi Lesson 1 (unitId: 4, lesson id: 16) mirror with 5 SELECT challenges ---
            {
                id: 21, // sindhi
                lessonId: 16,   // alphabets (sindhi)
                type: "SELECT",
                order: 1,
                question: 'ا',
            },
            {
                id: 22, // sindhi
                lessonId: 16,
                type: "SELECT",
                order: 2,
                question: 'ب',
            },
            {
                id: 23, // sindhi
                lessonId: 16,
                type: "SELECT",
                order: 3,
                question: 'ت',
            },
            {
                id: 24, // sindhi
                lessonId: 16,
                type: "SELECT",
                order: 4,
                question: 'ج',
            },
            {
                id: 25, // sindhi
                lessonId: 16,
                type: "SELECT",
                order: 5,
                question: 'خ',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1, //ا
                imageSrc: "/angoor.png",
                correct: true,
                text: "انګور",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 1, //ا
                imageSrc: "/anar.png",
                correct: true,
                text: "انار",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 1, //ا
                imageSrc: "/obe.png",
                correct: true,
                text: "اوبه",
                audioSrc: "/pashto_robot.mp3",
            },
            {
                challengeId: 2, //آری
                imageSrc:"/awaz.png",
                correct: true,
                text: "آواز",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 2, // آ
                imageSrc:"/aas.png",
                correct: true,
                text: "آس",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 2, // آ
                imageSrc:"/aari.png",
                correct: true,
                text: "آری",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 3, //ب
                imageSrc: "/baagh.png",
                correct: true,
                text: "باغ",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 3, //ب
                imageSrc: "/baran.png",
                correct: true,
                text: "باران",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 3, //ب
                imageSrc: "/bicycle.png",
                correct: true,
                text: "بايسکل",
                audioSrc: "/pashto_robot.mp3",
            },
            {
                challengeId: 4, //پ
                imageSrc: "/park.png",
                correct: true,
                text: "پارک",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 4, //پ
                imageSrc: "/paak.png",
                correct: true,
                text: "پاک",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 4, //پ
                imageSrc: "/pesho.png",
                correct: true,
                text: "پیشو",
                audioSrc: "/pashto_robot.mp3",
            },
            {
                challengeId: 5, //ت
                imageSrc: "/toot.png",
                correct: true,
                text: "توت",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 5, //ت
                imageSrc: "/trazu.png",
                correct: true,
                text: "ترازو",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 5, //ت
                imageSrc: "/taaj.png",
                correct: true,
                text: "تاج",
                audioSrc: "/pashto_robot.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 6, //which one of them is Running
                imageSrc: "/driving_1.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 6, //which one of them is Running
                imageSrc: "/running.png",
                correct: true,
                text: "منډه",
                audioSrc: "/pashto_running.mp3",
            },
            {
                challengeId: 6, //which one of them is Running
                imageSrc: "/cycling.png",
                correct: false,
                text: "سایکل چلول",
                audioSrc: "/cycling_pashto.mp3",
            },
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 16, // drinking water
                correct: true,
                text: "اوبه څکل",
                audioSrc: "/pashto_drinking_water.mp3",
            },
            {
                challengeId: 16, // drinking water
                correct: false,
                text: "منډه",
                audioSrc: "/pashto_running.mp3",
            },
            {
                challengeId: 16, // drinking water
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 17, //which one of these is not driving
                imageSrc: "/driving_1.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 17, //which one of these is not driving
                imageSrc: "/driving_2.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 17, //which one of these is not driving
                imageSrc: "/cycling.png",
                correct: true,
                text: "سایکل چلول",
                audioSrc: "/pashto_cycling.mp3",
            },
            
            
        ]);

        // Sindhi Lesson 1 (challengeId: 21) options
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 21, // Sindhi lesson 1 - ا
                imageSrc: "/mango.png",
                correct: true,
                text: "انبُ",
                audioSrc: "/pashto_cycling.mp3",
            },
            {
                challengeId: 21, // Sindhi lesson 1 - ا
                imageSrc: "/eye.png",
                correct: true,
                text: "اک",
                audioSrc: "/pashto_cycling.mp3",
            },
            {
                challengeId: 21, // Sindhi lesson 1 - ا
                imageSrc: "/anar.png",
                correct: true,
                text: "انار",
                audioSrc: "/pashto_cycling.mp3",
            },
        ]);
        
        console.log("Seeding finished.");

    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");

    }
    
};

main();
