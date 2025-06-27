import { AllUserTable } from "@/components/client/users/allUserTable";
import db from "@/prisma/db";
import React from "react";

const AllMerchants = async ({
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
  const users = await db.user.findMany({
    where: {
      number: {
        contains: search,
      },
      role: {
        has: "MERCHANT",
      },
    },
    select: {
      id: true,
      image: true,
      name: true,
      number: true,
      isActive: true,
      createdAt: true,
      role: true,
      division: true,
      productCount: true,
      supportMember: true,
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
      <AllUserTable
        users={users}
        count={count}
        page={page}
        per_page={per_page}
      />
    </div>
  );
};

export default AllMerchants;
