import db from "@/prisma/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // Access query parameters using searchParams
    const Id = url.searchParams.get("id");

    const getPromotion = await db.promoting.findUnique({
      where: {
        id: Id || "",
      },
    });

    const formData = new FormData();
    formData.append("order_id", getPromotion?.orderId || "");

    const { data: verifyToken } = await axios.post(
      "https://sandbox.shurjopayment.com/api/verification",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getPromotion?.token,
        },
      }
    );

    console.log(verifyToken[0]);

    if (verifyToken[0].sp_message === "Success") {
      const getPromotion = await db.promoting.update({
        where: {
          id: Id || "",
        },
        data: {
          isPayed: true,
          status: "SUCCESSFUL",
        },
      });

      if (getPromotion?.type === "STANDARD") {
        await db.product.update({
          where: {
            id: getPromotion?.productId,
          },
          data: {
            isPromoted: true,
            standardPromote: true,
            standardStartDate: getPromotion?.startDate,
            standardEndDate: getPromotion?.endDate,
            promoteType: getPromotion?.type,
            startDate: getPromotion?.startDate,
            endDate: getPromotion?.endDate,
          },
        });
      }
      if (getPromotion?.type === "PREMIUM") {
        await db.product.update({
          where: {
            id: getPromotion?.productId,
          },
          data: {
            isPromoted: true,
            premiumPromote: true,
            premiumStartDate: getPromotion?.startDate,
            premiumEndDate: getPromotion?.endDate,
            promoteType: getPromotion?.type,
            startDate: getPromotion?.startDate,
            endDate: getPromotion?.endDate,
          },
        });
      }
      return NextResponse.json(
        { message: "Payment successful", Data: getPromotion },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Payment failed", Data: getPromotion },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Payment_Success_Post", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
