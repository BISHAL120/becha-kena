import ProductList from "@/components/client/categories/list";
import db from "@/prisma/db";
import ProductsFilter from "./filter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    per_page: string;
    category: string;
    district: string;
    // sort: string;
  }>;
}) => {
  const searchParamsValues = await searchParams;
  const { page = "1", per_page = "10", category = "all" } = searchParamsValues;

  const totalStandardProductCount = await db.product.count({
    where: {
      isDeleted: false,
      published: true,
      standardPromote: true,
      standardEndDate: { gt: new Date() },
      categoryId: category !== "all" ? category : undefined,
    },
  });

  const getStandardProduct = await db.product.findMany({
    where: {
      isDeleted: false,
      published: true,
      standardPromote: true,
      standardEndDate: { gt: new Date() },
      categoryId: category !== "all" ? category : undefined,
    },
    include: {
      merchant: true,
      Category: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });

  const otherProductCount = await db.product.count({
    where: {
      published: true,
      isDeleted: false,
      categoryId: category !== "all" ? category : undefined,

      standardEndDate: { lt: new Date() },
    },
  });

  const skip =
    (Number(page) - 1) * Number(per_page) - totalStandardProductCount;
  const take = Number(page) * Number(per_page) - totalStandardProductCount;

  const otherProduct = await db.product.findMany({
    where: {
      published: true,
      isDeleted: false,
      categoryId: category !== "all" ? category : undefined,

      standardEndDate: { lt: new Date() },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      merchant: true,
      Category: true,
    },
    skip: skip > 0 ? skip : 0,
    take: take - (skip > 0 ? skip : 0),
  });

  const total = otherProductCount + totalStandardProductCount;
  const allCategories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="container mx-auto px-2 md:px-4 py-8">
        <ProductsFilter
          allProducts={otherProduct.length}
          page={page}
          per_page={per_page}
          // district={district}
          category={category}
          // sort={sort}
          allCategories={allCategories}
        />

        <ProductList allProducts={[...getStandardProduct, ...otherProduct]} />
      </div>
      <div className="wrapper my-2 mt-0 md:mt-10">
        <Pagination className="pb-10 md:mb-0 md:justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${
                  Number(page) <= 1 || !page
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                href={`?page=${Number(page) - 1}&per_page=${Number(
                  per_page
                )}&category=${category}`}
              />
            </PaginationItem>
            {Number(page) >= 4 ? <PaginationEllipsis /> : ""}
            {Number(page) > 1 && Number(page) < 3 && (
              <PaginationItem>
                <PaginationLink
                  href={`?page=${Number(page) - 1}&per_page=${Number(
                    per_page
                  )}&category=${category}`}
                >
                  {Number(page) - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {Number(page) > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={`?page=${Number(page) - 2}&per_page=${Number(
                    per_page
                  )}&category=${category}`}
                >
                  {Number(page) - 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {Number(page) > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={`?page=${Number(page) - 1}&per_page=${Number(
                    per_page
                  )}&category=${category}`}
                >
                  {Number(page) - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {Number(page)}
              </PaginationLink>
            </PaginationItem>
            {Number(page) * Number(per_page) >= total ? (
              ""
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={`?page=${Number(page) + 1}&per_page=${Number(
                      per_page
                    )}&category=${category}`}
                  >
                    {Number(page) + 1}
                  </PaginationLink>
                </PaginationItem>
                {(Number(page) + 1) * Number(per_page) >= total ? (
                  ""
                ) : (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}
            <PaginationItem>
              <PaginationNext
                className={`${
                  Number(page) * Number(per_page) >= total
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                href={`?page=${Number(page) + 1}&per_page=${Number(
                  per_page
                )}&category=${category}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
