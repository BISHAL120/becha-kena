import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../sectionTittle";

// Demo data for featured products
const featuredProducts = [
  {
    id: "1",
    productName: "Oculus Quest 2",
    price: "$449.00",
    originalPrice: "$499.00",
    rating: 5,
    image: "/assets/products/product1.jpg",
    productSlug: "oculus-quest-2",
  },
  {
    id: "2",
    productName: "PlayStation 5",
    price: "$800.00",
    originalPrice: null,
    rating: 5,
    image: "/assets/products/product2.jpg",
    productSlug: "playstation-5",
  },
  {
    id: "3",
    productName: "Fossil Gen 6",
    price: "$440.00",
    originalPrice: null,
    rating: 4,
    image: "/assets/products/product3.jpg",
    productSlug: "fossil-gen-6",
  },
  {
    id: "4",
    productName: "Apple MacBook Air",
    price: "$880.00",
    originalPrice: null,
    rating: 5,
    image: "/assets/products/product4.jpg",
    productSlug: "apple-macbook-air",
  },
];

const TopProducts = () => {
  return (
    <div className="">
      {/* Best Picks Section */}
      <div className="mt-12">
        <div>
          <SectionTitle title="Top Products" href="/products" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.productSlug}/?id=${product.id}`}
              className="group relative block"
            >
              <div className="bg-white border border-gray-200 dark:border-none rounded-lg transition-all duration-300 hover:border-green-500 overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.productName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white  text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {product.productName}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
