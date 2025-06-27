import { auth } from "@/auth";
import ProductDetails from "@/components/client/products/singleProduct";
import db from "@/prisma/db";

const ProductPage = async ({
  params,
  searchParams,
}: {
  searchParams: Promise<{
    id: string;
  }>;
  params: Promise<{
    name: string;
  }>;
}) => {
  const { id } = await searchParams;
  const { name } = await params;
  console.log(name);

  const session = await auth();
  const user = session?.user;

  let currentUser = null;

  if (user?.id) {
    currentUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        isActive: true,
        idDeactivationDate: true,
      },
    });
  }

  const product = await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      merchant: true,
    },
  });

  const allReview = await db.review.findMany({
    where: {
      productId: id,
    },
    take: 100,
  });

  const similarProduct = await db.product.findMany({
    where: {
      categoryId: product?.categoryId,
    },
    take: 8,
  });

  return (
    <div>
      <ProductDetails
        currentUser={currentUser}
        session={user?.id}
        allReview={allReview}
        product={product}
        similarProduct={similarProduct}
      />
    </div>
  );
};

export default ProductPage;
