import DashboardPage from "@/components/admin/dashboard";
import db from "@/prisma/db";
import React from "react";

const Admin = async () => {
  const activeAccount = await db.user.count({
    where: {
      isActive: true,
    },
  });

  const paidPromotion = await db.promoting.findMany({
    where: {
      isPayed: true,
    },
    select: {
      price: true,
    },
  });

  const price = paidPromotion.reduce(
    (acc, curr) => acc + Number(curr.price),
    0
  );

  const totalAccount = await db.user.count();
  const totalMerchant = await db.user.count({
    where: {
      role: {
        has: "MERCHANT",
      },
    },
  });

  return (
    <div>
      <DashboardPage
        activeAccount={activeAccount}
        paidPromotion={price}
        totalAccount={totalAccount}
        totalMerchant={totalMerchant}
      />
    </div>
  );
};

export default Admin;
