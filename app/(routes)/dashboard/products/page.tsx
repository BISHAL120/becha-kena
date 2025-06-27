import { auth } from "@/auth";
import { ProductTable } from "@/components/client/products/productTable";
import db from "@/prisma/db";
import React from "react";

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    per_page: string;
    search: string;
  }>;
}) => {
  const searchParamsValues = await searchParams;
  const { page = "1", per_page = "10", search } = searchParamsValues;
  const userId = await auth().then((res) => res?.user?.id);
  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const Products = await db.product.findMany({
    where: {
      merchantId: userId,
      productName: {
        contains: search,
      },
    },
    orderBy: { createdAt: "desc" },
    take: Number(per_page),
    skip: (Number(page) - 1) * Number(per_page),
  });
  const ProductCount = await db.product.count({
    where: {
      merchantId: userId,
    },
  });

  return (
    <div>
      <ProductTable
        page={page}
        per_page={per_page}
        products={Products}
        count={ProductCount}
      />
    </div>
  );
};

export default Products;
