import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
//  @ts-ignore
const db = drizzle(sql, {schema});

const main = async () => {
    try{
        console.log("Seeding database");
        //Delete all existing data
        await Promise.all([
            db.delete(schema.userProgress),
            db.delete(schema.challenges),
            db.delete(schema.units),
            db.delete(schema.lessons),
            db.delete(schema.courses),
            db.delete(schema.challengeOptions),
            db.delete(schema.userSubscription),
        ]);

        //insert courses
        const courses = await db.insert(schema.courses).values([{title: "Pashto", imageSrc:"/pashtoflag.png"}]).returning();

        //for each course, insert units
         for (const course of courses) {
            const units = await db.insert(schema.units).values([
                {
                    courseId: course.id,
                    title: "Unit 1",
                    description: `Learn the basics of ${course.title}`,
                    order: 1,

                },
                {
                    courseId: course.id,
                    title: "Unit 2",
                    description: `Learn Intermediate ${course.title}`,
                    order: 2,

                },
            ]).returning();

            //for each unit, insert lessons
            for(const unit of units){
                const lessons = await db.insert(schema.lessons).values([
                    { unitId: unit.id, title: "Nouns", order:1},
                    { unitId: unit.id, title: "Verbs", order:2},
                    { unitId: unit.id, title: "Adjectives", order:3},
                    { unitId: unit.id, title: "Phrases", order:4},
                    { unitId: unit.id, title: "Sentences", order:5},
                ]).returning();

                //for each lesson, insert challenges
                for (const lesson of lessons) {
                    const challenges = await db.insert(schema.challenges).values([
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the man"?',
                            order: 1,   
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: '"the man"?',
                            order: 2,   
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the robot"?',
                            order: 3,   
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: '"the man"?',
                            order: 4,   
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the boy"?',
                            order: 5,   
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the girl"?',
                            order: 6,   
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: '"the girl"?',
                            order: 7,   
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: '"the woman"?',
                            order: 8,   
                        },
                    ]).returning();

                    //for each challenge, insert challengeOptions
                    for (const challenge of challenges) {
                        if(challenge.order===1) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true, 
                                    text: "سړی",
                                    imageSrc: "/man.png",
                                    audioSrc: "/pashto_man.mp3"
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false, 
                                    text: "ښځه",
                                    imageSrc: "/woman.png",
                                    audioSrc: "/pashto_woman.mp3"
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false, 
                                    text: "روبوټ",
                                    imageSrc: "/robot.png",
                                    audioSrc: "/pashto_robot.mp3"
                                },
                            ]);
                        }
                        if(challenge.order===2) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false, 
                                    text: "سړی",
                                    imageSrc: "/man.png",
                                    audioSrc: "/pashto_man.mp3"
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true, 
                                    text: "ښځه",
                                    imageSrc: "/woman.png",
                                    audioSrc: "/pashto_woman.mp3"
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false, 
                                    text: "روبوټ",
                                    imageSrc: "/robot.png",
                                    audioSrc: "/pashto_robot.mp3"
                                },
                            ]);
                        }
                        
                        if(challenge.order===3) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false, 
                                    text: "سړی",
                                    imageSrc: "/man.png",
                                    audioSrc: "/pashto_man.mp3"
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false, 
                                    text: "ښځه",
                                    imageSrc: "/woman.png",
                                    audioSrc: "/pashto_woman.mp3"
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true, 
                                    text: "روبوټ",
                                    imageSrc: "/robot.png",
                                    audioSrc: "/pashto_robot.mp3"
                                },
                            ]);
                        };
                    };
                };
            };
         };
    };
};