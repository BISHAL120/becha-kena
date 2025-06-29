import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.blog.count();

    return NextResponse.json(
      { message: "Blog count retrieved successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[BLOG_COUNT_RETRIEVED]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
