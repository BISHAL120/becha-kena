import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId, comment, rating, userName } = body;

    const findProduct = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!findProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const ratingCount = findProduct?.ratingCount + Number(1);
    const ratingTotal = findProduct?.ratingTotal + Number(rating);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ratingCount: ratingCount,
        ratingTotal: ratingTotal,
      },
    });

    const result = await db.review.create({
      data: {
        rating,
        comment,
        userId,
        productId,
        userName,
      },
    });

    const findUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (findUser) {
      const userRatingCount = findUser?.ratingCount + Number(1);
      const userRatingTotal = findUser?.ratingTotal + Number(rating);

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          ratingCount: userRatingCount,
          ratingTotal: userRatingTotal,
        },
      });
    }

    return NextResponse.json(
      { message: "Review created successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Product_Review_Post]", error);
    return NextResponse.json(
      { message: "Failed to create Review", Data: error },
      { status: 500 }
    );
  }
}
