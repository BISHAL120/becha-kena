"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
// import { Product } from "@prisma/client";
import Link from "next/link";

interface HeroSectionProps {
  products:
    | {
        id: string;
        image: string[];
        productName: string | null;
        description: string | null;
        productSlug: string | null;
      }[]
    | null;
}

export function HeroSection({ products }: HeroSectionProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className=" mb-8">
      {/* Main Banner */}
      <div className="relative h-[520px] my-auto rounded-lg overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            loop: true,
            active: true,
          }}
          className="cursor-grab h-full"
        >
          <div className="relative">
            <CarouselContent className="min-h-[500px] h-full flex-1 ">
              {products &&
                products.map((product, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={product.image[0]}
                        alt={product.productName || "Product Name"}
                        quality={95}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-neutral-100 mb-4">
                          {product.productName?.slice(0, 25)}
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          {`${product.description?.slice(0, 100)}`}
                        </p>
                        <Link
                          href={`/products/${product.productSlug}/?id=${product.id}`}
                        >
                          <Button variant="secondary" className="w-fit">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              {products?.length && products?.length == 0 && (
                <>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                </>
              )}
              {!products?.length && (
                <>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                </>
              )}
              {products?.length && products?.length == 1 && (
                <>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative h-full w-full">
                      <Image
                        src={"/demoImage/placeholder.svg"}
                        alt={"Product Name"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                        <h1 className="text-4xl font-bold text-white mb-4">
                          Boost Your Product
                        </h1>
                        <p className="text-neutral-100 mb-6">
                          One Slot Available for your Product
                        </p>
                        {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                      </div>
                    </div>
                  </CarouselItem>
                </>
              )}
              {products?.length && products?.length == 2 && (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative h-full w-full">
                    <Image
                      src={"/demoImage/placeholder.svg"}
                      alt={"Product Name"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent p-8 flex flex-col pt-[20%]">
                      <h1 className="text-4xl font-bold text-white mb-4">
                        Boost Your Product
                      </h1>
                      <p className="text-neutral-100 mb-6">
                        One Slot Available for your Product
                      </p>
                      {/* <Link href={`/dashboard/products`}>
                        <Button variant="secondary" className="w-fit">
                          Add Product
                        </Button>
                      </Link> */}
                    </div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-x-2 cursor-default bg-white/60 px-2 py-1 rounded-xl">
              {Array.from({ length: count }).map((c, i) => {
                return (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => api && api.scrollTo(i)}
                    className={`${
                      current === i + 1 ? "bg-white/50" : ""
                    } w-4 h-4  rounded-full bg-black/50`}
                  />
                );
              })}
            </div>
          </div>
        </Carousel>
      </div>

      {/* Right Side Grid */}
    </div>
  );
}
