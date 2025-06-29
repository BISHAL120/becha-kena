import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { search } = body;

    /* if (!search) {
      return new NextResponse("Search query is required", { status: 400 });
    } */

    search = search.split("-").join(" ");

    console.log(search);

    const result = await db.product.findMany({
      where: {
        OR: [
          {
            tags: {
              has: search.toLowerCase(),
              // mode: "insensitive"
            },
          },
          {
            productSlug: {
              contains: search.split(" ").join("-"),
              mode: "insensitive",
            },
          },
          {
            productName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            categoryName: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return NextResponse.json(
      { message: "Product found successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("Product_Search_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
