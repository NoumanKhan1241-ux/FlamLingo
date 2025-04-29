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
               id:2,
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
            }
        ]);

        await db.insert(schema.lessons).values([

            {
                id: 1, //pashto
                unitId: 1,        // unit 1
                order: 1,
                title: "Nouns",
            },
            {
                id: 2, //pashto
                unitId: 1,        // unit 1
                order: 2,
                title: "Verbs",
            },
            {
                id: 3, //pashto
                unitId: 1,        // unit 1
                order: 3,
                title: "Nouns",
            },
            {
                id: 4, //pashto
                unitId: 1,        // unit 1
                order: 4,
                title: "Nouns",
            },
            {
                id: 5, //pashto
                unitId: 1,        // unit 1
                order: 5,
                title: "Nouns",
            },
            
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1, //pashto
                lessonId: 1,   //nouns
                type: "SELECT",
                order: 1,
                question: 'Which one of these is"the man"?',
            },
            {
                id: 2, //pashto
                lessonId: 1,   //nouns
                type: "ASSIST",
                order: 2,
                question: '"the man"',
            },
            {
                id: 3, //pashto
                lessonId: 1,   //nouns
                type: "SELECT",
                order: 3,
                question: 'Which one of these is"the robot"?',
            },
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1, //which one of these is the man
                imageSrc: "/man.png",
                correct: true,
                text: "سړی",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 1, //which one of these is the man
                imageSrc: "/woman.png",
                correct: false,
                text: "ښځه",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 1, //which one of these is the man
                imageSrc: "/robot.png",
                correct: false,
                text: "روبوټ",
                audioSrc: "/pashto_robot.mp3",
            },
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2, // the man
                correct: true,
                text: "سړی",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 2, // the man
                correct: false,
                text: "ښځه",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 2, // the man
                correct: false,
                text: "روبوټ",
                audioSrc: "/pashto_robot.mp3",
            },
            
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3, //which one of these is the man
                imageSrc: "/man.png",
                correct: false,
                text: "سړی",
                audioSrc: "/pashto_man.mp3",
            },
            {
                challengeId: 3, //which one of these is the man
                imageSrc: "/woman.png",
                correct: false,
                text: "ښځه",
                audioSrc: "/pashto_woman.mp3",
            },
            {
                challengeId: 3, //which one of these is the man
                imageSrc: "/robot.png",
                correct: true,
                text: "روبوټ",
                audioSrc: "/pashto_robot.mp3",
            },
            
            
        ]);
        await db.insert(schema.challenges).values([
            {
                id: 4, //pashto
                lessonId: 2,   //verbs
                type: "SELECT",
                order: 1,
                question: 'Which one of them is"Running"?',
            },
            {
                id: 5, //pashto
                lessonId: 2,   //verbs
                type: "ASSIST",
                order: 2,
                question: '"Drinking water"',
            },
            {
                id: 6, //pashto
                lessonId: 2,   //verbs
                type: "SELECT",
                order: 3,
                question: 'Which one of these is" not driving"?',
            },
            
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 4, //which one of them is Running
                imageSrc: "/driving_1.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 4, //which one of them is Running
                imageSrc: "/running.png",
                correct: true,
                text: "منډه",
                audioSrc: "/pashto_running.mp3",
            },
            {
                challengeId: 4, //which one of them is Running
                imageSrc: "/cycling.png",
                correct: false,
                text: "سایکل چلول",
                audioSrc: "/cycling_pashto.mp3",
            },
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 5, // drinking water
                correct: true,
                text: "اوبه څکل",
                audioSrc: "/pashto_drinking_water.mp3",
            },
            {
                challengeId: 5, // drinking water
                correct: false,
                text: "منډه",
                audioSrc: "/pashto_running.mp3",
            },
            {
                challengeId: 5, // drinking water
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            
            
            
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 6, //which one of these is not driving
                imageSrc: "/driving_1.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 6, //which one of these is not driving
                imageSrc: "/driving_2.png",
                correct: false,
                text: "موټر چلول",
                audioSrc: "/pashto_driving.mp3",
            },
            {
                challengeId: 6, //which one of these is not driving
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
