
import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id } = body;

    const user = await db.user.findUnique({
      where: {
        id: id || "",
      },
    });

    const settings = await db.idActiveSettings.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    await db.newIdActive.create({
      data: {
        UserId: id,
        // TODO: Change this to the user's email
        email: "example@gmail.com",
        number: user?.number || "",
        isPayed: true,
        query: true,
        price: settings?.price,
      },
    });

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const result = await db.user.update({
      where: {
        id: id || "",
      },
      data: {
        isActive: true,
        idDeactivationDate: expirationDate,
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
