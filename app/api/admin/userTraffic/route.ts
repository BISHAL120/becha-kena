import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body.startDate, "aa");

    const result = await db.user.findMany({
      where: {
        createdAt: {
          gte: body.startDate,
        },
      },
      select: {
        createdAt: true,
        role: true,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });

    return NextResponse.json(
      { message: "success", Data: result },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("User_Traffic_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
