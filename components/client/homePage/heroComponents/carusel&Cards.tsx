"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

// Demo data for products
const demoProducts = [
  {
    id: "1",
    productName: "Inborn Nordic Chair Collection",
    description: "Nordic inspiration for decor",
    productSlug: "nordic-chair-collection",
    price: "$199",
    specialOffer: null,
    image: ["/assets/products/product1.jpg"],
  },
  {
    id: "2",
    productName: "Washing Machine",
    description: "Special Offer",
    productSlug: "washing-machine",
    price: "$799",
    specialOffer: "$799 Special Offer",
    image: ["/assets/products/product2.jpg"],
  },
];

interface HeroSectionV2Props {
  products?:
    | {
        id: string;
        image: string[];
        productName: string | null;
        description: string | null;
        productSlug: string | null;
      }[]
    | null;
}

export function CarouselAndCards({ products = null }: HeroSectionV2Props) {
  // Use demo products if no products are provided
  const displayProducts = products || demoProducts;

  // Main carousel state
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [mainCurrent, setMainCurrent] = React.useState(0);
  const [mainCount, setMainCount] = React.useState(0);

  // Setup main carousel
  React.useEffect(() => {
    if (!mainApi) return;

    setMainCount(mainApi.scrollSnapList().length);
    setMainCurrent(mainApi.selectedScrollSnap());

    mainApi.on("select", () => {
      setMainCurrent(mainApi.selectedScrollSnap());
    });
  }, [mainApi]);

  return (
    <div className="px-2 py-2 space-y-6">
      {/* Main Hero Section - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 my-auto">
        {/* Main Carousel - Takes 2/3 on large screens */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden">
          <Carousel
            setApi={setMainApi}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
            opts={{
              loop: true,
              active: true,
            }}
            className="w-full"
          >
            <CarouselContent className="">
              {displayProducts.map((product, idx) => (
                <CarouselItem
                  key={idx}
                  className="relative h-[300px] sm:h-[400px] md:h-[450px]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src={product.image[0]}
                      alt={product.productName || "Product"}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center p-8">
                      <div className="max-w-md space-y-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                          {product.productName}
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base">
                          {product.description}
                        </p>
                        {/* {product?.specialOffer && (
                          <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {product?.specialOffer}
                          </div>
                        )} */}
                        <div className="pt-2">
                          <Link
                            href={`/products/${product.productSlug}/?id=${product.id}`}
                          >
                            <Button className="bg-white text-black hover:bg-white/90 hover:text-black transition-all duration-300 transform hover:scale-105">
                              Buy Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-x-2 z-10">
              {Array.from({ length: mainCount }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => mainApi?.scrollTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    mainCurrent === i ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </div>

        {/* Special Offers - Takes 1/3 on large screens */}
        <div className="flex flex-col gap-4">
          {/* First Special Offer */}
          <div className="relative h-[200px] md:h-[220px] border rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-green-800 to-green-600">
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white">
              Special Offer
            </div>
            <div className="relative h-full">
              <Image
                src="/assets/products/product8.jpg"
                alt="Washing Machine"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="space-y-1">
                  <h3 className="text-xl font-medium text-white">
                    Washing Machine
                  </h3>
                  <p className="text-white/80 text-sm">$799 Special Offer</p>
                </div>
                <div className="flex justify-start items-end">
                  <Link href="/products/washing-machine">
                    <Button
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-green-700 transition-all duration-300"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Second Special Offer */}
          <div className="relative h-[200px] md:h-[220px] border rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-slate-100 to-green-50">
            <div className="absolute top-4 right-4 bg-gray-800/20 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-gray-800">
              New Arrival
            </div>
            <div className="relative h-full">
              <Image
                src="/assets/products/product6.jpg"
                alt="Nordic Chair"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-t from-gray-100/70 via-gray-50/30 to-transparent">
                <div className="space-y-1">
                  <h3 className="text-xl font-medium text-gray-800">
                    Nordic inspiration for decor
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Inborn Nordic Chair Collection
                  </p>
                </div>
                <div className="flex justify-start items-end">
                  <Link href="/products/nordic-chair-collection">
                    <Button
                      variant="outline"
                      className="bg-transparent border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300"
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
