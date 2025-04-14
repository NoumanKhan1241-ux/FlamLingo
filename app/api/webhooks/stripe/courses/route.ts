// app/api/courses/route.ts
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

// GET: Fetch all courses
export const GET = async () => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    console.log("Unauthorized access - GET");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const data = await db.query.courses.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// POST: Create a new course
export const POST = async (req: Request) => {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) {
    console.log("Unauthorized access - POST");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Received body for POST:", body);

    if (!body.title || !body.ImageSrc) {
      console.log("Missing required fields:", body);
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const data = await db.insert(courses).values({
      ...body,
    }).returning();

    console.log("Course created:", data);
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error inserting course:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
