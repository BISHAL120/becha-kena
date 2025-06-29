import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const skip = Number(searchParams.get("skip"));
    const take = Number(searchParams.get("take"));

    const data = await db.product.findMany({
      take: take,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include: {
        reviews: true,
      },
    });
    const count = await db.product.count();

    return NextResponse.json({
      message: "Successful",
      data: data,
      count: count,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get the Data", Error: error },
      { status: 500 }
    );
  }
}
