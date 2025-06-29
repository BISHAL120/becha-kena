"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Sample featured products data
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Cotton Soft Sun Stick",
    description:
      "Protective moisturizing flow for lips and cheeks with a matting effect",
    price: 1299,
    rating: 4.8,
    reviewCount: 124,
    image: "/assets/products/product11.jpg",
    category: "Beauty",
    brand: "TOCOBO",
  },
  {
    id: "2",
    name: "Heartleaf 77% Clear Pad",
    description:
      "Soothing toning pads with glutinous extract for the face for every day",
    price: 1899,
    rating: 4.7,
    reviewCount: 98,
    image: "/assets/products/product12.jpg",
    category: "Skincare",
    brand: "APIEU",
  },
  {
    id: "3",
    name: "I'm Mute Lipstick",
    description:
      "Lip tint of an intense pink-beige and shade texture, stable not smear",
    price: 999,
    rating: 4.9,
    reviewCount: 156,
    image: "/assets/products/product13.jpg",
    category: "Makeup",
    brand: "KAJA",
  },
];
const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === FEATURED_PRODUCTS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? FEATURED_PRODUCTS.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-xl md:text-xl font-semibold text-gray-900 dark:text-slate-100">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-primary hover:underline mt-2 md:mt-0 flex items-center gap-1"
          >
            View all products
            <span className="text-xs">→</span>
          </Link>
        </div>

        {/* Mobile Carousel View */}
        <div className="block lg:hidden relative">
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {FEATURED_PRODUCTS.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow-md hover:bg-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow-md hover:bg-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Grid View with Image Carousel */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({
  product,
}: {
  product: (typeof FEATURED_PRODUCTS)[0];
}) => {
  return (
    <Card className="h-full max-h-[500px] group relative overflow-hidden p-0">
      <div className="relative pt-[100%] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <h3 className="text-2xl font-bold text-white text-center mb-2">
            {product.name}
          </h3>
          <p className="text-white text-center text-sm max-w-[80%] mb-4">
            {product.description}
          </p>
          <Button
            size="lg"
            className="rounded-full bg-white text-black hover:bg-white/90"
          >
            Shop Now
          </Button>
        </div>
      </div>

      <CardContent className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <div className="flex flex-col text-white">
          <span className="text-sm opacity-80 mb-1">{product.category}</span>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
          </Link>
          <div className="flex items-center justify-between">
            <div className="font-semibold">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "BDT",
                minimumFractionDigits: 0,
              }).format(product.price)}
            </div>
            {/* <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedProducts;
