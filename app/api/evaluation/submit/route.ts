import { NextResponse } from "next/server";
import { evaluationResults, lessons, lessonProgress } from "@/db/schema";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { score } = await req.json();
  const { userId } = await auth();
  console.log("[EVALUATION SUBMIT] score:", score, "userId:", userId);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Store the evaluation result
  await db.insert(evaluationResults).values({ userId, score });

  // Determine how many lessons to unlock
  let lessonsToUnlock = 0;
  if (score >= 50) lessonsToUnlock = 10;
  else if (score >= 25) lessonsToUnlock = 5;

  if (lessonsToUnlock > 0) {
    // Get the first N lessons (ordered by id)
    const lessonsList = await db.query.lessons.findMany({
      orderBy: (lessons, { asc }) => [asc(lessons.id)],
      limit: lessonsToUnlock,
    });
    console.log("[EVALUATION SUBMIT] Unlocking lessons:", lessonsList.map(l => l.id));
    // Mark these lessons as completed for the user
    for (const lesson of lessonsList) {
      await db.insert(lessonProgress).values({
        userId,
        lessonId: lesson.id,
        completed: true,
      }).onConflictDoNothing();
      console.log(`[EVALUATION SUBMIT] Inserted lessonProgress for userId=${userId}, lessonId=${lesson.id}`);
    }
  }

  return NextResponse.json({ success: true });
} 