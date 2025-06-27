import { auth } from "@/auth";
import ProductForm from "@/components/client/products/productForm";
import db from "@/prisma/db";
import React from "react";

const NewProduct = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    categoryId: string;
  }>;
}) => {
  const id = (await params).id;
  const { categoryId } = await searchParams;
  const session = await auth();
  const user = session && session.user;
  const userId = user?.id;

  const allCategories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  let product = null;

  if (id !== "new") {
    product = await db.product.findUnique({
      where: {
        id: id,
      },
      /* include: {
        merchant: true,
      }, */
    });
  }

  const allTags = await db.tags.findMany({
    where: {
      categoryId: categoryId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <ProductForm
        initialData={product}
        userId={userId}
        categories={allCategories}
        allTags={allTags}
      />
    </div>
  );
};

export default NewProduct;
