import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    await db.product.update({
      where: {
        id: id,
      },
      data: {
        views: { increment: 1 },
      },
    });
    return NextResponse.json(
      { message: "View count updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Product View Increase Internal error", {
      status: 500,
    });
  }
}
