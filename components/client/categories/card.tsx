import Image from "next/image";

import { cn } from "@/lib/utils";
import { MapPinnedIcon, Star, User } from "lucide-react";
import Buttons from "./buttons";
import Link from "next/link";
import { Category, Product, User as TUser } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

/* interface ProductCardProps {
  data: Product;
}

interface ExtendProduct extends ProductCardProps {
  Category?: Category;
  merchant?: TUser;
} */

interface ExtendedProduct extends Product {
  merchant?: TUser;
  Category?: Category;
}

interface ProductListProps {
  data: ExtendedProduct;
  currentUser: {
    isActive: boolean;
  } | null;
}

export function ProductCard({ data, currentUser }: ProductListProps) {
  return (
    <>
      <div className="group relative border flex flex-col overflow-hidden rounded-lg bg-background shadow-md transition-all">
        {/* Image container with zoom effect */}
        {data.standardEndDate && data.standardEndDate > new Date() && (
          <Badge className="absolute top-2 left-2 z-20" variant={"destructive"}>
            Promoted
          </Badge>
        )}
        <Link
          href={`/products/${data.productSlug}/?id=${data.id}`}
          prefetch={true}
          className="relative aspect-square overflow-hidden group"
        >
          <Image
            src={data.image[0]}
            alt={data.productName || "Product"}
            fill
            loading="lazy"
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-110 bg-gray-200 dark:bg-slate-800"
            )}
          />
        </Link>
        <Buttons data={data} merchant={data?.merchant?.name} />

        {/* Content */}
        <div className="flex flex-col justify-between p-4 flex-1">
          <div>
            <Link
              href={`/products/${data.productSlug}/?id=${data.id}`}
              prefetch={true}
              className="flex items-center justify-between group-hover:underline"
            >
              <h3
                title={data.productName || ""}
                className="text-lg font-semibold"
              >
                {data.productName && data.productName.slice(0, 15)}
                {data.productName && data.productName.length > 15 && "..."}
              </h3>
            </Link>
            <p className="pb-2 text-[13px] md:text-sm font-medium text-muted-foreground">
              {data?.Category?.name}
            </p>
          </div>
          {currentUser && currentUser.isActive ? (
            <div>
              <div className="flex items-center gap-2 py-0.5 md:py-1 mt-3 md:mb-0">
                <div className="md:w-8 md:h-8 w-7 h-7 flex justify-center items-center rounded-full border border-gray-300 dark:bg-gray-600">
                  {data.merchant?.image ? (
                    <Image
                      src={data?.merchant?.image}
                      alt={data.merchant.name}
                      width={20}
                      height={20}
                      quality={95}
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <User className="min-h-5 min-w-5 max-h-5 max-w-5 dark:stroke-slate-200" />
                  )}
                </div>
                <p className="hidden md:flex text-base font-medium text-primary/85">
                  {data.merchant?.name?.slice(0, 16)}
                  {data.merchant?.name &&
                    data.merchant.name.length > 16 &&
                    "..."}
                </p>
                <p className="flex md:hidden text-sm md:text-base font-medium text-primary/85">
                  {data.merchant?.name?.slice(0, 10)}
                  {data.merchant?.name &&
                    data.merchant.name.length > 10 &&
                    "..."}
                </p>
              </div>
              <div className="flex items-center gap-2 py-0.5 md:py-1">
                <div className="p-1 md:w-8 md:h-8  flex justify-center items-center rounded-full border border-gray-300 dark:bg-gray-600">
                  <MapPinnedIcon className="min-h-5 min-w-5 max-h-5 max-w-5 dark:stroke-slate-200" />
                </div>
                <p className="text-xs md:text-base font-medium text-primary/85">
                  {data?.merchant?.division?.slice(0, 10)}
                  {data.merchant?.division &&
                    data.merchant.division.length > 10 &&
                    "..."}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-base md:text-lg font-bold">
                  {Intl.NumberFormat("bn-BD", {
                    style: "currency",
                    currency: "BDT",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(data?.sellPrice || 0)}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-300 stroke-yellow-500" />
                  <span className="text-sm">
                    {isNaN(data.ratingTotal / data.ratingCount)
                      ? 0
                      : data.ratingTotal / data.ratingCount}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href={`/products/${data.productSlug}/?id=${data.id}`}
              className="text-base md:text-lg font-bold"
            >
              প্রাইস/ডিটেলস দেখতে এখানে ক্লিক করুন
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
