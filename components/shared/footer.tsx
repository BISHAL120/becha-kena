import Image from "next/image";
import Link from "next/link";
import React from "react";
import db from "@/prisma/db";
import { Separator } from "../ui/separator";

const Footer = async () => {
  const promoteProduct = await db.product.findMany({
    where: {
      isPromoted: true,
    },
    select: {
      id: true,
      productName: true,
      price: true,
      image: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 2,
  });

  return (
    <div className="hidden md:block bg-black/90 mt-auto">
      <div className="py-10 xl:max-w-[1350px] md:mx-auto text-white">
        <div className="flex items-start gap-5">
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold ">
              Empowering Your Online Business Success!
            </h2>

            <p className="text-sm font-normal max-w-[550px] mt-7">
              bechakena.com is a B2B & B2C platform in Bangladesh. Start selling
              product with zero investment: Product sourcing, Marketing, Order
              management all in this No 1 multipurpose business platform.
            </p>
            <div>
              <div className="mt-10 space-y-2">
                <Link
                  href="mailto: info@bechakena.com"
                  className="flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@bechakena.com
                </Link>
                <Link
                  href="https://maps.app.goo.gl/mKAPwnn6kn4QtqfT6"
                  className="flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Dhaka 1202 Bangladesh
                </Link>
                <Link
                  href="tel:+8801819-948872"
                  className="flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +8801819-948872
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <h2 className="text-2xl font-semibold ">Sponsored Products</h2>
            </div>
            <div className="space-y-3 mt-7">
              {promoteProduct.map((product) => (
                <div key={product.id} className="flex items-start gap-3">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={product.image[0]}
                      alt={product.productName || "Product Name"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {product.productName}
                    </h3>
                    <p className="text-sm font-normal">{product.price} BDT</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="xl:max-w-[1350px] md:mx-auto">
        <p className="text-center text-sm font-light py-5 text-white">
          &copy; {new Date().getFullYear()} bechakena v1.4 All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
