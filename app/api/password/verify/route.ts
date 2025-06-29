import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, finalCode } = body;
    if (!id) {
      return new NextResponse("Id is required", { status: 400 });
    }

    if (!finalCode) {
      throw new Error("Code is required");
    }

    const findCode = await db.resetPassword.findUnique({
      where: {
        id: id,
      },
    });

    if (!findCode) {
      return NextResponse.json({ message: "Invalid Id" }, { status: 400 });
    }

    if (findCode?.expiryDate < new Date(Date.now())) {
      await db.resetPassword.delete({
        where: {
          id: id,
        },
      });

      return NextResponse.json(
        { message: "OTP Expired", Data: findCode },
        { status: 400 }
      );
    }

    const verify = findCode?.code === finalCode;

    if (verify) {
      const result = await db.resetPassword.update({
        where: {
          id: id,
        },
        data: {
          isVerified: true,
        },
      });
      return NextResponse.json(
        { message: "OTP Verified Successfully", Data: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "OTP Is Invalid", Data: findCode },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Password_Verify_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
