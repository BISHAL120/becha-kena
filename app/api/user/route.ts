import db from "@/prisma/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      password,
    } = body;

    if (!fullName) {
      return new NextResponse("FullName is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return new NextResponse("Email already in use", { status: 409 });
    }

    const hashPassword = await hash(password, 10);

    // create user
    const user = await db.user.create({
      data: {
        name: fullName,
        email: email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { message: "Account Created Successfully", Data: { user } },
      { status: 200 }
    );
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const res = await db.user.update({
      where: {
        id: id,
      },
      data: {
        isActive: body.isPaid,
        address: body.address,
        bannerImage: body.bannerImage,
        image: body.image,
        name: body.name,
        number: body.number,
        shopName: body.shopName,
        role: body.role,
        businessCategory: body.businessCategory,
        deliveryPartner: body.deliveryPartner,
        policy: body.policy,
        companySize: body.companySize,
        groupLink: body.groupLink,
        division: body.division,
        district: body.district,
        fbAccount: body.fbAccount,
        fbBnsPage: body.fbBnsPage,
        instagram: body.instagram,
        email: body.email,
        tikTok: body.tikTok,
        website: body.website,
        whatsAppNumber: body.whatsAppNumber,
        youtube: body.youtube,
        interested: body.interested,
      },
    });

    return NextResponse.json(
      { message: "Updated Successfully", Data: res },
      { status: 200 }
    );
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
