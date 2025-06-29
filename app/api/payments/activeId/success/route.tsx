import db from "@/prisma/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const Id = url.searchParams.get("id");

    const newIdActive = await db.newIdActive.findUnique({
      where: {
        id: Id || "",
      },
    });

    const formData = new FormData();
    formData.append("order_id", newIdActive?.orderId || "");

    const { data: verifyToken } = await axios.post(
      "https://sandbox.shurjopayment.com/api/verification",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + newIdActive?.token,
        },
      }
    );

    if (verifyToken[0].sp_message === "Success") {
      await db.newIdActive.update({
        where: {
          id: newIdActive?.id || "",
        },
        data: {
          isPayed: true,
          query: true,
        },
      });

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      const result = await db.user.update({
        where: {
          id: newIdActive?.UserId || "",
        },
        data: {
          isActive: true,
          idDeactivationDate: expirationDate,
        },
      });

      return NextResponse.json(
        { message: "Payment successful", Data: result },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Payment failed", Data: verifyToken[0] },
      { status: 200 }
    );
  } catch (error) {
    console.log("Payment_Success", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
