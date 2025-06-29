import db from "@/prisma/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    /* This is User Id */
    const Id = body.id;

    const user = await db.user.findUnique({
      where: {
        id: Id || "",
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const settings = await db.merchantSettings.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    const newMerchant = await db.newMerchants.create({
      data: {
        name: user?.name,
        address: user?.address || "",
        email: user?.email,
        price: settings?.price.toLocaleString() || "299",
        productLimit: settings?.productLimit.toLocaleString() || "500",
        UserId: user?.id,
      },
    });

    const payment = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/merchant`,
      {
        userId: user.id,
        price: settings?.price,
        number: user.number,
        orderID: newMerchant.id,
      }
    );

    await db.newMerchants.update({
      where: {
        id: newMerchant.id,
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
        message: "Promotion created successfully aaaaaaaa",
        url: payment.data.data.checkout_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("New_Merchant_Initiate", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
