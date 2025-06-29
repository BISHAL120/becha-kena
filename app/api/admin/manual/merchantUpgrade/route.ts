
import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id } = body;

    const settings = await db.merchantSettings.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    const findUser = await db.user.findUnique({
      where: {
        id: id || "",
      },
      select: {
        name: true,
        email: true,
        role: true,
        address: true,
      },
    });

    await db.newMerchants.create({
      data: {
        UserId: id,
        isPayed: true,
        query: true,
        address: findUser?.address || "",
        name: findUser?.name || "",
        email: findUser?.email || "",
        price: settings?.price.toLocaleString() || "",
        productLimit: settings?.productLimit.toLocaleString() || "",
      },
    });

    const finalRole = findUser?.role
      ? [...findUser.role, "MERCHANT"]
      : ["MERCHANT"];

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const result = await db.user.update({
      where: {
        id: id || "",
      },
      data: {
        productLimit: Number(settings?.productLimit),
        role: finalRole,
        isActive: true,
        merchantDeactivationDate: expirationDate,
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
