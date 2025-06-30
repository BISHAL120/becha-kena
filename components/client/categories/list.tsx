import { Category, Product, User } from "@prisma/client";

import { ProductCard } from "./card";

interface ExtendedProduct extends Product {
  merchant: User | null;
  Category: Category | null;
}

// Update Props Interface
interface ProductListProps {
  allProducts: ExtendedProduct[] | null;
}

const ProductList = async ({ allProducts }: ProductListProps) => {
  if (allProducts?.length === 0) {
    return <p className="text-center mt-8 text-gray-600">No products found.</p>;
  }
  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {allProducts?.map((product: Product, idx) => (
          <ProductCard key={idx} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
