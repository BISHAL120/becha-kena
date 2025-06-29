import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const result = await db.user.update({
      where: {
        id: id,
      },
      data: {
        supportMember: true,
      },
    });

    console.log(result);

    return NextResponse.json(
      { message: "success", Data: result },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Add_To_Support_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const result = await db.user.update({
      where: {
        id: id,
      },
      data: {
        supportMember: false,
      },
    });

    console.log(result);

    return NextResponse.json(
      { message: "success", Data: result },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Add_To_Support_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
