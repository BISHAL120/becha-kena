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
import { useEffect } from "react";

const MerchantFilters = ({
  allCategories,
  total,
  page = "1",
  per_page = "5",
  division = "all",
  category = "all",
}: //   district,
//   sort,
{
  allCategories: Category[] | null;
  total: number;
  page?: string;
  per_page?: string;
  division?: string;
  category?: string;
  //   district: string;
  //   sort: string;
}) => {
  const router = useRouter();

  const changeCategory = (key: string, value: string) => {
    router.push(
      `?page=${1}&per_page=${per_page}&${key}=${value}&division=${division}`
    );
  };

  const changeDivision = (key: string, value: string) => {
    router.push(
      `?page=${1}&per_page=${per_page}&category=${category}&${key}=${value}`
    );
  };

  useEffect(() => {
    if (Number(page) > Math.ceil(total / Number(per_page))) {
      router.push(
        `?page=${
          Math.ceil(total / Number(per_page)) === 0
            ? 1
            : Math.ceil(total / Number(per_page))
        }&per_page=${per_page}&category=${category}&division=${division}`
      );
    }

    if (Number(page) * Number(per_page) > total) {
      router.push(
        `?page=${
          Math.ceil(total / 5) === 0 ? 1 : Math.ceil(total / 5)
        }&per_page=10&category=${category}&division=${division}&aa=s`
      );
    }
  }, [category, division, page, per_page, router, total]);

  return (
    <div className="flex items-center pb-5 w-full">
      <div className="w-full flex justify-between md:justify-end items-center gap-4">
        <Select
          defaultValue={category}
          onValueChange={(value) => {
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
      </div>
    </div>
  );
};

export default MerchantFilters;
