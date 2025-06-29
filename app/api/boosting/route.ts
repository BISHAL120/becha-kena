import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await db.boosting.create({
      data: {
        type: body.type,
        category: body.category,
        productLink: body.productLink,
        number: body.number,
        description: body.description,
        userId: body.userId,
      },
    });

    return NextResponse.json(
      { message: "Boosting Order Placed Successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Boosting_create_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
