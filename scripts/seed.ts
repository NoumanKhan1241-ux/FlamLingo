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
         /*   {
               id:2,
               title: "Sindhi",
               imageSrc: "/sindhiflag.png",
            },

            */

        ]);

        await db.insert(schema.units).values([
            {
                id: 1,  //pashto
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Pashto",
                order: 1,
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
                title: "alphabets",
            },
            {
                id: 3, //pashto
                unitId: 1,        // unit 1
                order: 3,
                title: "alphabets",
            },
            {
                id: 4, //pashto
                unitId: 1,        // unit 1
                order: 4,
                title: "alphabets",
            },
            {
                id: 5, //pashto
                unitId: 1,        // unit 1
                order: 5,
                title: "alphabets",
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
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
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
         
            
        ]);

        await db.insert(schema.challengeOptions).values([
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
            
            
        ]);
         await db.insert(schema.challengeOptions).values([
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
            
            
        ]);
         await db.insert(schema.challengeOptions).values([
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
        await db.insert(schema.challenges).values([
            {
                id: 6, //pashto
                lessonId: 2,   //verbs
                type: "SELECT",
                order: 1,
                question: 'Which one of them is"Running"?',
            },
            {
                id: 7, //pashto
                lessonId: 2,   //verbs
                type: "ASSIST",
                order: 2,
                question: '"Drinking water"',
            },
            {
                id: 8, //pashto
                lessonId: 2,   //verbs
                type: "SELECT",
                order: 3,
                question: 'Which one of these is" not driving"?',
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
                challengeId: 7, // drinking water
                correct: true,
                text: "اوبه څکل",
                audioSrc: "/pashto_drinking_water.mp3",
            },
            {
                challengeId: 7, // drinking water
                correct: false,
                text: "منډه",
                audioSrc: "/pashto_running.mp3",
            },
            {
                challengeId: 7, // drinking water
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 8, //which one of these is not driving
                imageSrc: "/driving_1.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 8
                , //which one of these is not driving
                imageSrc: "/driving_2.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 8, //which one of these is not driving
                imageSrc: "/cycling.png",
                correct: true,
                text: "سایکل چلول",
                audioSrc: "/pashto_cycling.mp3",
            },
            
            
        ]);
        await db.insert(schema.challenges).values([
            {
                id: 9, //pashto
                lessonId: 3,   //verbs
                type: "SELECT",
                order: 1,
                question: 'Which one of them is"Running"?',
            },
            {
                id: 10, //pashto
                lessonId: 3,   //verbs
                type: "ASSIST",
                order: 2,
                question: '"Drinking water"',
            },
            {
                id: 11, //pashto
                lessonId: 3,   //verbs
                type: "SELECT",
                order: 3,
                question: 'Which one of these is" not driving"?',
            },
            
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 9, //which one of them is Running
                imageSrc: "/driving_1.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 9, //which one of them is Running
                imageSrc: "/running.png",
                correct: true,
                text: "منډه",
                audioSrc: "/pashto_running.mp3",
            },
            {
                challengeId: 9, //which one of them is Running
                imageSrc: "/cycling.png",
                correct: false,
                text: "سایکل چلول",
                audioSrc: "/cycling_pashto.mp3",
            },
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 10, // drinking water
                correct: true,
                text: "اوبه څکل",
                audioSrc: "/pashto_drinking_water.mp3",
            },
            {
                challengeId: 10, // drinking water
                correct: false,
                text: "منډه",
                audioSrc: "/pashto_running.mp3",
            },
            {
                challengeId: 10, // drinking water
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 11, //which one of these is not driving
                imageSrc: "/driving_1.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 11, //which one of these is not driving
                imageSrc: "/driving_2.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 11, //which one of these is not driving
                imageSrc: "/cycling.png",
                correct: true,
                text: "سایکل چلول",
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
