import React from "react";
import CategoryForm from "./comonents/categoryForm";
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
      <CategoryForm initialData={category} />
    </div>
  );
};

export default Category;
