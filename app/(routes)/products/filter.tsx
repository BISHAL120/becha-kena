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
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsFilter = ({
  allProducts,
  allCategories,
  page,
  per_page,
  division = "all",
  category = "all",
}: //   district,
//   sort,
{
  allCategories: Category[] | null;
  allProducts: number;
  page: string;
  per_page: string;
  division: string;
  category: string;

  //   district: string;
  //   sort: string;
}) => {
  const [categoryName, setCategoryName] = useState(
    allCategories?.find((c) => c.id === category)?.name || "all"
  );
  const router = useRouter();

  const changeCategory = (key: string, value: string) => {
    router.push(
      `?page=${1}&per_page=${per_page}&${key}=${value}&division=${division}`
    );
  };
  /*   const changeDistrict = (key: string, value: string) => {
    router.push(
      `?page=${page}&per_page=${per_page}&category=${category}&division=${division}&${key}=${value}`
    );
  }; */
  const changeDivision = (key: string, value: string) => {
    router.push(
      `?page=${1}&per_page=${per_page}&category=${category}&${key}=${value}`
    );
  };
  /*   const changePricing = (key: string, value: string) => {
    router.push(
      `?page=${page}&per_page=${per_page}&category=${category}&division=${division}&${key}=${value}`
    );
  }; */

  useEffect(() => {
    if (allProducts === 0) {
      router.push(
        `?page=${page}&per_page=${per_page}&category=${category}&division=${division}`
      );
    }
  }, [category, division, page, per_page, router, allProducts]);

  return (
    <div className="flex items-center pb-5 px-2">
      <div className="hidden md:flex items-center gap-3 w-1/2">
        {division === "all" ? null : (
          <h2 className="text-xl font-semibold border rounded-md px-3 py-1">
            {division === "all" ? "All Division" : division}
          </h2>
        )}
        {categoryName === "all" || division === "all" ? null : (
          <ChevronRight className="h-6 w-6" />
        )}
        {categoryName === "all" ? null : (
          <Link
            href={`categories/${categoryName}?page=1&per_page=10&division=${division}`}
            className="text-xl font-semibold border rounded-md px-3 py-1"
          >
            {categoryName === "all" ? "All Category" : categoryName}
          </Link>
        )}
      </div>
      <div className="w-full flex justify-between md:justify-end items-center gap-4">
        {/* <Select
          defaultValue="all"
          onValueChange={(value) => changePricing("sort", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>Sort</SelectItem>
            <SelectItem value="hightToLow">High To Low</SelectItem>
            <SelectItem value="lowToHigh">Low To High</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select> */}
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

        <Select
          //   defaultValue="all"
          onValueChange={(value) => changeDivision("division", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Division" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>All</SelectItem>
            <SelectItem value="Barishal">Barishal</SelectItem>
            <SelectItem value="Dhaka">Dhaka</SelectItem>
            <SelectItem value="Rajshahi">Rajshahi</SelectItem>
            <SelectItem value="Chattogram">Chattogram</SelectItem>
            <SelectItem value="Khulna">Khulna</SelectItem>
            <SelectItem value="Rangpur">Rangpur</SelectItem>
            <SelectItem value="Mymensingh">Mymensingh</SelectItem>
            <SelectItem value="Sylhet">Sylhet</SelectItem>
          </SelectContent>
        </Select>
        {/* <Select onValueChange={(value) => changeDistrict("district", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>All</SelectItem>
            {Districts?.map((district) => {
              return (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
};

export default ProductsFilter;
