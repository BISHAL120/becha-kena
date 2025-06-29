import db from "@/prisma/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, password } = body;

    if (!id) {
      console.log("aaaaaa");
      return new NextResponse("Id is required", { status: 400 });
    }

    if (!password) {
      console.log("bbbbbbb");
      return new NextResponse("Password is required", { status: 400 });
    }

    const getDocument = await db.resetPassword.findUnique({
      where: {
        id: id,
      },
    });

    if (!getDocument) {
      console.log("ccccccc");
      return new NextResponse("Invalid Id", { status: 400 });
    }

    if (getDocument.isVerified === false) {
      return new NextResponse("OTP is not verified", { status: 400 });
    }
    if (getDocument.expiryDate < new Date()) {
      return new NextResponse("OTP is expired", { status: 400 });
    }

    const hashPassword = await hash(password, 10);
    const findUser = await db.user.findUnique({
      where: {
        email: getDocument.email,
      },
    });
    console.log(findUser);
    const result = await db.user.update({
      where: {
        email: getDocument.email,
      },
      data: {
        password: hashPassword,
      },
    });
    console.log(result);

    await db.resetPassword.deleteMany({
      where: {
        email: getDocument?.email,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("New_Password_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
