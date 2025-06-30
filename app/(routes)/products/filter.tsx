"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Districts } from "@/lib/placeList";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsFilter = ({
  allProducts,
  allCategories,
  page,
  per_page,
  category = "all",
}: {
  allCategories: Category[] | null;
  allProducts: number;
  page: string;
  per_page: string;
  category: string;
}) => {
  const [categoryName, setCategoryName] = useState(
    allCategories?.find((c) => c.id === category)?.name || "all"
  );
  const router = useRouter();

  const changeCategory = (key: string, value: string) => {
    router.push(`?page=${1}&per_page=${per_page}&${key}=${value}`);
  };

  useEffect(() => {
    if (allProducts === 0) {
      router.push(`?page=${page}&per_page=${per_page}&category=${category}`);
    }
  }, [category, page, per_page, router, allProducts]);

  return (
    <div className="flex items-center pb-5 px-2">
      <div className="hidden md:flex items-center gap-3 w-1/2">
        {categoryName === "all" ? null : (
          <Link
            href={`categories/${categoryName}?page=1&per_page=10`}
            className="text-xl font-semibold border rounded-md px-3 py-1"
          >
            {categoryName === "all" ? "All Category" : categoryName}
          </Link>
        )}
      </div>
      <div className="w-full flex justify-between md:justify-end items-center gap-4">
        <Select
          defaultValue={category}
          onValueChange={(value) => {
            setCategoryName(
              allCategories?.find((c) => c.id === value)?.name || "all"
            );
            changeCategory("category", value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Product Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>All</SelectItem>
            {allCategories?.map((Category) => {
              return (
                <SelectItem key={Category.id} value={Category.id}>
                  {Category.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductsFilter;
