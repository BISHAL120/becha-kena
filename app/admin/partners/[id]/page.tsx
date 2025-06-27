import React from "react";
import PartnerForm from "./comonents/PartnerForm";
import db from "@/prisma/db";

const Category = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  let category = null;

  if (id !== "new") {
    category = await db.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  return (
    <div className="container mx-auto py-10">
      <PartnerForm initialData={category} />
    </div>
  );
};

export default Category;
