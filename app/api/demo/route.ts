import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await db.newMerchants.updateMany({
      data: {
        query: false,
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
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
