import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, type, saveId } = body;

    if (!id && !saveId) {
      return new NextResponse("Save Id & User id is required", { status: 400 });
    }

    const findUser = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    let finalData = [];
    const SaveProducts = findUser?.saveProducts || [];
    if (type === "save") {
      finalData = Array.from(new Set([...SaveProducts, saveId]));
    } else {
      finalData = SaveProducts.filter((item) => item !== saveId);
    }

    const res = await db.user.update({
      where: {
        id: id,
      },
      data: {
        saveProducts: finalData,
      },
    });

    return NextResponse.json(
      { message: "Updated Successfully", Data: res },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Save_Product]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
