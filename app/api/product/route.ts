// eslint-disable

import { storage } from "@/lib/firebase";
import db from "@/prisma/db";
import { Tags } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

const transliterationMap = {
  " ": "-",
  অ: "o",
  আ: "a",
  ই: "i",
  ঈ: "ee",
  উ: "u",
  ঊ: "oo",
  এ: "e",
  ঐ: "oi",
  ও: "o",
  ঔ: "ou",
  ক: "k",
  খ: "kh",
  গ: "g",
  ঘ: "gh",
  ঙ: "ng",
  চ: "ch",
  ছ: "chh",
  জ: "j",
  ঝ: "jh",
  ঞ: "ng",
  ট: "t",
  ঠ: "th",
  ড: "d",
  ঢ: "dh",
  ণ: "n",
  ত: "t",
  থ: "th",
  দ: "d",
  ধ: "dh",
  ন: "n",
  প: "p",
  ফ: "ph",
  ব: "b",
  ভ: "bh",
  ম: "m",
  য: "y",
  র: "r",
  ল: "l",
  শ: "sh",
  ষ: "sh",
  স: "s",
  হ: "h",
  ড়: "r",
  ঢ়: "rh",
  য়: "y",
  ৎ: "t",
  "ং": "ng",
  "ঃ": "h",
  "ঁ": "n",
  "়": "r",
  "া": "a",
  "ি": "i",
  "ী": "ee",
  "ু": "u",
  "ূ": "oo",
  "ৃ": "ri",
  "ৄ": "ree",
  "ে": "e",
  "ৈ": "oi",
  "ো": "o",
  "ৌ": "ou",
  "ৗ": "r",
  ক্ত: "kt",
  গ্ন: "gn",
  ঙ্ক: "nk",
  ঙ্ঘ: "ngh",
  চ্চ: "cc",
  চ্ছ: "cch",
  জ্ঞ: "gg",
  ঞ্চ: "nc",
  ঞ্ছ: "nch",
  ট্ট: "tt",
  ড্ড: "dd",
  ন্ড: "nd",
  ন্ত: "nt",
  ন্ধ: "ndh",
  ম্ব: "mb",
  ম্প: "mp",
  ম্ফ: "mph",
  স্ব: "sw",
  হ্ন: "hn",
  হ্ম: "hm",
  হ্ল: "hl",
  স্থ: "sth",
  ষ্ট: "st",
  ষ্ক: "sk",
  ষ্ঠ: "sth",
  ষ্ণ: "sn",
  ক্ষ: "kkh",
  ত্র: "tr",
  দ্ব: "dv",
  শ্র: "shr",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      productName,
      number,
      sellPrice,
      userId,
      description,
      price,
      quantity,
      category,
      images,
      tags,
    } = body;

    // Validate the data
    if (
      !productName ||
      !number ||
      !userId ||
      !description ||
      !price ||
      !sellPrice ||
      !quantity ||
      !category ||
      !images ||
      !tags
    ) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 }
      );
    }
    // Check Product Upload Limit
    console.log(body)

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      if (user.isActive === false) {
        for (const image of images) {
          const imageRef = ref(storage, image);

          // Delete the file
          deleteObject(imageRef);
        }
        return NextResponse.json(
          { message: "Please Active Your Id First" },
          { status: 403 }
        );
      }
    }

    if (user) {
      if (user.productCount >= user.productLimit) {
        for (const image of images) {
          const imageRef = ref(storage, image);

          // Delete the file
          deleteObject(imageRef);
        }

        return NextResponse.json(
          { message: "Product Limit Reached" },
          { status: 403 }
        );
      }
    }

    if (user) {
      if (user.idDeactivationDate <= new Date()) {
        for (const image of images) {
          const imageRef = ref(storage, image);

          // Delete the file
          deleteObject(imageRef);
        }
        await db.product.updateMany({
          where: {
            merchantId: user.id,
          },
          data: {
            published: false,
          },
        });

        return NextResponse.json(
          { message: "Subscription Expired" },
          { status: 403 }
        );
      }
    }

    // save the product to the database
    const getProductCount = await db.product.count();

    const tagData = [];
    for (let i = 0; i < tags.length; i++) {
      tagData.push(`${tags[i].name.toLowerCase()}`);
    }

    function isBangla(text: string) {
      const banglaRegex = /[\u0980-\u09FF]/;
      return banglaRegex.test(text);
    }

    function convertToEnglish(banglaText: string) {
      // Convert each Bangla character to Banglish
      let banglishText = "";
      for (const char of banglaText) {
        banglishText +=
          transliterationMap[char as keyof typeof transliterationMap] || char; // Use the mapped value or keep the character as is
      }

      return banglishText;
    }

    // Main function to check and convert
    const processName = (name: string) => {
      if (isBangla(name)) {
        return convertToEnglish(name);
      }
      return name; // Return as is if not Bangla
    };

    const convertSlug = processName(productName);
    const nameSlug = convertSlug.replace(/\s+/g, "-");

    const result = await db.product.create({
      data: {
        productName: productName,
        productSlug: nameSlug,
        number: number,
        price: Number(price),
        sellPrice: Number(sellPrice),
        description: description,
        quantity: Number(quantity),
        merchantId: userId,
        image: images,
        tags: tagData,
        categoryId: category,
        isDeleted: false,
        sku: `${getProductCount + 1}`,
        published: body.published,
        categoryName: body.categoryName,
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        productCount: {
          increment: 1,
        },
      },
    });

    await Promise.all(
      tags.map(async (tag: Tags) => {
        await db.tags.upsert({
          where: {
            name: tag.name,
          },
          update: {},
          create: {
            name: tag.name,
            categoryId: tag.categoryId,
            productId: result.id,
          },
        });
      })
    );

    return NextResponse.json(
      { message: "Product Created Successfully", Data: result },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Product_Create_Post]", error);
    return NextResponse.json(
      { message: "Failed to create product", Data: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, tags } = body;

    const product = await db.product.findUnique({
      where: {
        id: id,
      },
    });

    const user = await db.user.findUnique({
      where: {
        id: product?.merchantId,
      },
    });

    if (user) {
      if (user.idDeactivationDate <= new Date()) {
        await db.product.updateMany({
          where: {
            merchantId: user.id,
          },
          data: {
            published: false,
          },
        });

        return NextResponse.json(
          { message: "Subscription Expired" },
          { status: 403 }
        );
      }
    }

    if (!id) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const tagData = [];
    for (let i = 0; i < tags.length; i++) {
      tagData.push(`${tags[i].name}`);
    }

    function isBangla(text: string) {
      const banglaRegex = /[\u0980-\u09FF]/;
      return banglaRegex.test(text);
    }

    function convertToEnglish(banglaText: string) {
      // Convert each Bangla character to Banglish
      let banglishText = "";
      for (const char of banglaText) {
        banglishText +=
          transliterationMap[char as keyof typeof transliterationMap] || char; // Use the mapped value or keep the character as is
      }

      return banglishText;
    }

    // Main function to check and convert
    const processName = (name: string) => {
      if (isBangla(name)) {
        return convertToEnglish(name);
      }
      return name.split(" ").join("-"); // Return as is if not Bangla
    };

    const nameSlug = processName(body.productName);

    const res = await db.product.update({
      where: {
        id: id,
      },
      data: {
        productName: body.productName,
        productSlug: nameSlug,
        number: body.number,
        price: Number(body.price),
        sellPrice: Number(body.sellPrice),
        categoryId: body.categoryId,
        categoryName: body.categoryName,
        quantity: Number(body.quantity),
        description: body.description,
        published: body.published,
        image: body.image,
        tags: tagData,
        isDeleted: body.isDeleted,
      },
    });

    await Promise.all(
      tags.map(async (tag: Tags) => {
        await db.tags.upsert({
          where: {
            name: tag.name,
          },
          update: {},
          create: {
            name: tag.name,
            categoryId: tag.categoryId,
            productId: body.id,
          },
        });
      })
    );

    return NextResponse.json(
      { message: "Updated Successfully", Data: res },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Product_Update_Patch]", error);
    return NextResponse.json(
      { message: "Internal Server Error! Failed to update.", Data: error },
      { status: 500 }
    );
  }
}
