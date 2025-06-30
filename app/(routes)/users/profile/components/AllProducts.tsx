import { Product } from "@prisma/client";
import { Boxes, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AllProductProps {
  products: Product[] | null;
}

export function AllProducts({ products }: AllProductProps) {
  if (products?.length === 0) {
    return (
      <div>
        <div className="mt-20 text-center text-lg font-semibold text-gray-500">
          {" "}
          No products added. Stay tuned for updates!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-2">
      <div className="flex justify-center items-center gap-5 text-center text-4xl font-semibold border-spacing-1 border-b border-dashed">
        <span>All Products </span>
        <Boxes size={28} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {products?.map((product, index) => {
          const rating = (
            Number(product.ratingTotal) / Number(product.ratingCount)
          ).toFixed(1);
          const stars = rating.split(".");
          const starLength = Number(stars[0]) + (Number(stars[1]) > 5 ? 1 : 0);
          return (
            <Link
              href={`/products/${product.productSlug}?id=${product.id}`}
              key={index}
              className="aspect-square group rounded-md md:overflow-hidden relative border"
            >
              <Image
                src={product.image[0] || ""}
                width={250}
                height={250}
                alt={`Photo ${index + 1}`}
                className="w-[320px] h-[320px] object-cover hover:opacity-90 transition-opacity"
              />
              <div className="md:hidden group-hover:block w-full -space-y-1 static md:absolute bottom-0 left-0 p-1 text-sm backdrop-blur-lg backdrop-brightness-75">
                <p className="text-sm font-semibold text-white ">
                  {product?.productName?.slice(0, 30)}
                  {product.productName &&
                    product.productName.length > 30 &&
                    "..."}
                </p>
                <div className="flex items-center justify-between text-white pt-2">
                  <p className="text-sm  ">
                    {product.categoryName?.slice(0, 15)}
                  </p>
                  <p>
                    {Intl.NumberFormat("bn-BD", {
                      style: "currency",
                      currency: "BDT",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.sellPrice || 0)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-white pt-1">
                  <p className="text-base flex items-center">
                    {isNaN(Number(rating)) ? "Rating:" : null}
                    {Array.from({ length: starLength }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-300 stroke-yellow-500"
                      />
                    ))}
                    {starLength < 5 && <Star className="w-4 h-4 " />}
                  </p>
                  <p>
                    {isNaN(Number(rating)) ? 0 : rating} ({product.ratingCount}){" "}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
