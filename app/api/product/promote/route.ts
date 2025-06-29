import db from "@/prisma/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await db.promoting.create({
      data: {
        name: body.name,
        type: body.type,
        duration: body.duration,
        price: body.price,
        number: body.number,
        startDate: body.startDate,
        endDate: body.endTime,
        productId: body.productId,
        userId: body.userId,
      },
    });

    const payment = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/payments`,
      {
        userId: body.userId,
        price: body.price,
        number: body.number,
        orderID: result.id,
      }
    );

    await db.promoting.update({
      where: {
        id: result.id,
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
    console.log("Product_Promote_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
