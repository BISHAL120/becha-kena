import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const findUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      return new NextResponse("User Does Not Exist", { status: 400 });
    }

    const GenerateRandomSixDigitNumber = Math.floor(
      100000 + Math.random() * 900000
    )
      .toString()
      .split(",")
      .join("");

    // TODO: Send OTP to user

    // Generate a random 6 digit OTP and save it to the database
    // expiry is set to 5 minutes
    const result = await db.resetPassword.create({
      data: {
        email: email,
        code: GenerateRandomSixDigitNumber.toLocaleString(),
        expiryDate: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    return NextResponse.json(
      { message: "OTP Sent Successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("Reset_Password_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new NextResponse("Id is required", { status: 400 });
    }
    const findCode = await db.resetPassword.findUnique({
      where: {
        id: id,
      },
    });

    if (!findCode) {
      return NextResponse.json({ message: "Invalid Id" }, { status: 400 });
    }

    const GenerateRandomSixDigitNumber = Math.floor(
      100000 + Math.random() * 900000
    )
      .toString()
      .split(",")
      .join("");

    // TODO: Send OTP to user

    // Generate a random 6 digit OTP and save it to the database
    // expiry is set to 5 minutes
    const result = await db.resetPassword.update({
      where: {
        id: id,
      },
      data: {
        code: GenerateRandomSixDigitNumber.toLocaleString(),
        expiryDate: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    return NextResponse.json(
      { message: "OTP Sent Successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("Reset_Password_Patch", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
