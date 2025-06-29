import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userId = body.userId;

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });

    const draftAllProduct = await db.product.updateMany({
      where: {
        merchantId: userId,
      },
      data: {
        published: false,
      },
    });

    return NextResponse.json(
      { message: "update success", Data: draftAllProduct },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Product_Draft_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
