import db from "@/prisma/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "Unknown IP";

    console.log(ip);
    const body = await req.json();

    const user = await db.user.findUnique({
      where: {
        id: body.userId,
      },
    });

    const settings = await db.merchantSettings.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    const price = settings?.price.toLocaleString() || "299";

    const generateToken = await axios.post(
      "https://sandbox.shurjopayment.com/api/get_token",
      {
        username: process.env.SP_USERNAME,
        password: process.env.SP_PASSWORD,
      }
    );

    const formData = new FormData();

    formData.append("prefix", process.env.SP_PREFIX || "");
    formData.append(
      "return_url",
      `${process.env.NEXT_PUBLIC_APP_URL}/payments/merchant/success/${body.orderID}`
    );
    formData.append(
      "cancel_url",
      `${process.env.NEXT_PUBLIC_APP_URL}/payments/cancel`
    );
    formData.append("token", generateToken.data.token || "");
    formData.append("store_id", generateToken.data.store_id || "");
    formData.append("amount", price || "");
    formData.append("order_id", body.orderID);
    formData.append("currency", "BDT");
    formData.append("customer_name", user?.name || "");
    formData.append("customer_address", user?.address || "");
    formData.append("customer_email", `${body.number}@gmail.com`);
    formData.append("customer_phone", body.number);
    /* TODO: For Production remove this */
    formData.append("client_ip", `${ip}`);

    const { data: checkOut } = await axios.post(
      "https://sandbox.shurjopayment.com/api/secret-pay",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + generateToken.data.token,
        },
      }
    );

    return NextResponse.json(
      {
        message: "Success",
        data: { ...checkOut, token: generateToken.data.token },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Payments_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
