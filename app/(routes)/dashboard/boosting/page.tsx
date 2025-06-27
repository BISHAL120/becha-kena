import { auth } from "@/auth";
import BoostingForm from "@/components/client/boosting/boostingForm";
import db from "@/prisma/db";
import React from "react";

const Boosting = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const userId = await auth().then((res) => res?.user?.id);

  return (
    <div>
      <BoostingForm categories={categories} userId={userId} />
    </div>
  );
};

export default Boosting;
