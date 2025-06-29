import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Id is Required" }, { status: 400 });
    }
    console.log(id);

    const getLimit = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!getLimit) {
      return NextResponse.json(
        { message: "User Not Found", data: true },
        { status: 403 }
      );
    }
    if (getLimit) {
      if (getLimit.productCount >= getLimit.productLimit) {
        return NextResponse.json(
          { message: "Product Limit Reached", data: true },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { message: "Successfully get Product Limit" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Product_Limit_Get", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
