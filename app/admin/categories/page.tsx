import { Separator } from "@/components/ui/separator";
import React from "react";
import AllCategoryTable from "./comonents/allCategory";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import db from "@/prisma/db";

const Categories = async () => {
  const allCategories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-5">
      <div className="mb-1 flex justify-between items-center">
        <div className="">
          <div className="text-3xl font-semibold">
            Categories ({allCategories.length})
          </div>
          <div className="text-base text-gray-600 font-semibold">
            Manage Categories for Your Store
          </div>
        </div>
        <div>
          <Link href="/admin/categories/new">
            <Button size={"lg"}>
              <Plus /> Add New
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="bg-slate-700" />
      <div>
        <AllCategoryTable initialData={allCategories} />
      </div>
    </div>
  );
};

export default Categories;
