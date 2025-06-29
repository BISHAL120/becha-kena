import db from "@/prisma/db";
import { NextResponse } from "next/server";


export async function POST() {
  try {
    const settings = await db.merchantSettings.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = await db.merchantSettings.create({
      data: {
        price: settings?.price,
        productLimit: settings?.productLimit,
      },
    });

    return NextResponse.json(
      {
        message: "Successful",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET() {
  try {
    const result = await db.merchantSettings.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Successful",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
