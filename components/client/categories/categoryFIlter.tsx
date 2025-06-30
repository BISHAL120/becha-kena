"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CategoryFilter({
  page,
  per_page,
  total,
  category,
}: {
  page: string;
  per_page: string;
  category: string;

  total: number;
}) {
  const router = useRouter();

  const changePerPage = (value: string) => {
    router.push(`?page=${1}&per_page=${value}`);
  };

  useEffect(() => {
    if (total === 0) {
      router.push(`?page=${page}&per_page=${per_page}&category=${category}`);
    }
  }, [category, page, per_page, router, total]);

  return (
    <div className="flex items-center pb-5">
      <div className="hidden md:flex items-center gap-3 w-1/2">
        {/* Home */}
        <Link
          href={"/"}
          className="text-xl font-semibold border rounded-md px-3 py-1"
        >
          Home
        </Link>

        {/* Category */}
        {category === "all" ? null : <ChevronRight className="h-6 w-6" />}
        {category === "all" ? null : (
          <Link
            href={`categories/${category}?page=1&per_page=10`}
            className="text-xl font-semibold border rounded-md px-3 py-1"
          >
            {category === "all" ? "All Category" : "Category"}
          </Link>
        )}
      </div>

      <div className="w-full flex justify-between md:justify-end items-center gap-4">
        <Select
          defaultValue={per_page}
          onValueChange={(value) => changePerPage(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Per Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 Per Page</SelectItem>
            <SelectItem value="20">20 Per Page</SelectItem>
            <SelectItem value="40">40 Per Page</SelectItem>
            <SelectItem value="60">60 Per Page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
