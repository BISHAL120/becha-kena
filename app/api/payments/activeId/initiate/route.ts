import db from "@/prisma/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    /* This User Id */
    const Id = body.id;

    const user = await db.user.findUnique({
      where: {
        id: Id || "",
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const settings = await db.idActiveSettings.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(settings);

    const newActive = await db.newIdActive.create({
      data: {
        UserId: user.id,
        email: user.email,
        number: user?.number,
        price: settings?.price,
      },
    });

    const payment = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/activeId`,
      {
        userId: user.id,
        price: settings?.price,
        number: user.number,
        orderID: newActive.id,
      }
    );

    await db.newIdActive.update({
      where: {
        id: newActive.id,
      },
      data: {
        orderId:
          payment.data.data.sp_order_id ||
          payment.data.data.order_id ||
          payment.data.data.customer_order_id,
        token: payment.data.data.token,
      },
    });

    return NextResponse.json(
      {
        message: "Promotion created successfully",
        url: payment.data.data.checkout_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("New_Merchant_Initiate", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
