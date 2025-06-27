import CategoryFilter from "@/components/client/categories/categoryFIlter";
import ProductList from "@/components/client/categories/list";
import db from "@/prisma/db";

const Products = async ({
  params,
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    per_page: string;
    division: string;
  }>;
  params: Promise<{
    id: string;
  }>;
}) => {
  const { page = "1", per_page = "5", division = "all" } = await searchParams;
  const { id } = await params;

  // const total = await db.product.count({
  //   where: {
  //     published: true,
  //     isDeleted: false,
  //     categoryId: category !== "all" ? category : undefined,
  //     merchant: {
  //       division: division !== "all" ? division : undefined,
  //     },
  //   },
  // });

  const standardProductCount = await db.product.count({
    where: {
      published: true,
      isDeleted: false,
      standardPromote: true,
      standardEndDate: { gt: new Date() },
      categoryId: {
        equals: id,
      },
      merchant: {
        division: division !== "all" ? division : undefined,
      },
    },
  });
  const standardProduct = await db.product.findMany({
    where: {
      published: true,
      isDeleted: false,
      standardPromote: true,
      standardEndDate: { gt: new Date() },
      categoryId: {
        equals: id,
      },
      merchant: {
        division: division !== "all" ? division : undefined,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      merchant: true,
      Category: true,
    },
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });

  const otherProductCount = await db.product.count({
    where: {
      published: true,
      isDeleted: false,
      categoryId: {
        equals: id,
      },
      merchant: {
        division: division !== "all" ? division : undefined,
      },
      standardEndDate: { lt: new Date() },
    },
  });

  const skip = (Number(page) - 1) * Number(per_page) - standardProductCount;
  const take = Number(page) * Number(per_page) - standardProductCount;

  const otherProducts = await db.product.findMany({
    where: {
      published: true,
      isDeleted: false,
      categoryId: {
        equals: id,
      },
      merchant: {
        division: division !== "all" ? division : undefined,
      },
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

  const total = otherProductCount + standardProductCount;

  return (
    <div>
      <div className="container mx-auto px-1 md:px-4 py-8">
        <CategoryFilter
          category={id}
          page={page}
          per_page={per_page}
          total={total}
          division={division}
        />
        <ProductList allProducts={[...standardProduct, ...otherProducts]} />
      </div>
    </div>
  );
};

export default Products;
