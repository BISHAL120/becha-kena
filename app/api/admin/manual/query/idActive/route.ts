import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    const result = await db.newIdActive.update({
      where: {
        id: id,
      },
      data: {
        query: true,
        isPayed: true,
      },
    });

    return NextResponse.json(
      {
        message: "Tags updated successfully",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Query_Post_IdActive", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
