import { MerchantTable } from "@/components/admin/aceternity Ui/users/mercantTable";
import db from "@/prisma/db";
import React from "react";

const Merchants = async ({
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
  const allMerchants = await db.user.findMany({
    where: {
      role: {
        has: "MERCHANT",
      },
      number: { contains: search },
    },
    select: {
      id: true,
      name: true,
      image: true,
      number: true,
      createdAt: true,
      role: true,
      division: true,
      productCount: true,
    },
    orderBy: { createdAt: "desc" },
    take: Number(per_page),
    skip: (Number(page) - 1) * Number(per_page),
  });
  const count = await db.user.count({
    where: {
      role: {
        has: "MERCHANT",
      },
    },
  });

  return (
    <div>
      <MerchantTable
        page={page}
        per_page={per_page}
        count={count}
        merchants={allMerchants}
      />
    </div>
  );
};

export default Merchants;
