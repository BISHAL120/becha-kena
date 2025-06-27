import { Product, User, Category } from "@prisma/client";

import { ProductCard } from "./card";
import { auth } from "@/auth";
import db from "@/prisma/db";

interface ExtendedProduct extends Product {
  merchant: User | null;
  Category: Category | null;
}

// Update Props Interface
interface ProductListProps {
  allProducts: ExtendedProduct[] | null;
}

const ProductList = async ({ allProducts }: ProductListProps) => {
  const session = await auth();
  const user = session?.user;

  let currentUser = null;

  if (user?.id) {
    currentUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        isActive: true,
      },
    });
  }

  if (allProducts?.length === 0) {
    return <p className="text-center mt-8 text-gray-600">No products found.</p>;
  }
  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {allProducts?.map((product: Product, idx) => (
          <ProductCard key={idx} data={product} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
