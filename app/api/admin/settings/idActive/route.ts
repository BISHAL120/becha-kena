import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pricing } = body;

    const result = await db.idActiveSettings.create({
      data: {
        price: Number(pricing),
      },
    });
    return NextResponse.json(
      { message: "success", Data: result },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Id_Active_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
