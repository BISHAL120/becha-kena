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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsFilter = ({
  allCategories,
  page,
  per_page,
  category = "all",
  total,
}: {
  allCategories: Category[] | null;
  page: string;
  per_page: string;
  category?: string;
  total: number;
}) => {
  const [categoryName, setCategoryName] = useState(
    allCategories?.find((c) => c.id === category)?.name || "all"
  );
  const router = useRouter();

  const changeCategory = (key: string, value: string) => {
    router.push(`?page=${1}&per_page=${per_page}&${key}=${value}`);
  };

  useEffect(() => {
    if (Number(page) > Math.ceil(total / Number(per_page))) {
      router.push(
        `?page=${
          Math.ceil(total / Number(per_page)) === 0
            ? 1
            : Math.ceil(total / Number(per_page))
        }&per_page=${per_page}&category=${category}`
      );
    }

    if (Number(page) * Number(per_page) > total) {
      router.push(
        `?page=${
          Math.ceil(total / 5) === 0 ? 1 : Math.ceil(total / 5)
        }&per_page=10&category=${category}`
      );
    }
  }, [category, page, per_page, router, total]);

  return (
    <div className="flex items-center pb-5">
      <div className="hidden md:flex items-center gap-3 w-1/2">
        <h2 className="text-xl font-semibold border rounded-md px-3 py-1">
          {categoryName === "all" ? "All Category" : categoryName}
        </h2>
      </div>
      <div className="w-full flex justify-between md:justify-end items-center gap-4">
        <Select
          defaultValue={category}
          onValueChange={(value) => {
            setCategoryName(
              allCategories?.find((c) => c.id === value)?.name || "All"
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
