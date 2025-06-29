import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(
      { message: "Categories fetched successfully", Data: categories },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Category_Get]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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
    // save the category to the database
    const result = await db.category.create({
      data: {
        name: name,
        image,
      },
    });
    return NextResponse.json(
      { message: "Category created successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Category_Create_Post]", error);
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
    // Update the category to the database
    const result = await db.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        image,
      },
    });
    return NextResponse.json(
      { message: "Category created successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Category_Create_Post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
