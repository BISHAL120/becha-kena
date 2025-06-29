import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, image } = body;
    // Validate the data
    if (!name && !image) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 }
      );
    }
    // save the partner to the database
    const result = await db.partner.create({
      data: {
        name: name,
        image,
      },
    });
    return NextResponse.json(
      { message: "Partner created successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Partner_Create_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, image, id } = body;

    // Validate the data
    if (!name && !image && !id) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 }
      );
    }
    // Update the partner to the database
    const result = await db.partner.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        image,
      },
    });
    return NextResponse.json(
      { message: "Partner created successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Partner_Create_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
