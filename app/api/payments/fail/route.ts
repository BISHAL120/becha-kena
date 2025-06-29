import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const body = await req.json();
    const url = new URL(req.url);

    // Access query parameters using searchParams
    const Id = url.searchParams.get("id");

    await db.promoting.update({
      where: {
        id: Id || "",
      },
      data: {
        isPayed: false,
        status: "FAILED",
      },
    });

    return NextResponse.redirect(
      new URL(`/payments/fail?id=${Id}`, req.url),
      303
    );
  } catch (error) {
    console.log("Payment_Fail", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
