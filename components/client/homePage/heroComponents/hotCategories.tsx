import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const demoCategories = [
  { id: "1", name: "Appliances", icon: "/assets/products/product1.jpg" },
  { id: "2", name: "Consoles", icon: "/assets/products/product2.jpg" },
  { id: "3", name: "Fridges", icon: "/assets/products/product3.jpg" },
  { id: "4", name: "Games", icon: "/assets/products/product4.jpg" },
  { id: "5", name: "Irons", icon: "/assets/products/product5.jpg" },
  { id: "6", name: "Laptops", icon: "/assets/products/product6.jpg" },
  { id: "7", name: "Phones", icon: "/assets/products/product7.jpg" },
  { id: "8", name: "TVs", icon: "/assets/products/product8.jpg" },
];

const HotCategories = () => {
  return (
    <div className="">
      {/* Categories Section */}
      <div className="">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
            Hot categories
          </h2>
          <Link
            href="/categories"
            className="text-base text-gray-500 dark:text-slate-100 hover:text-green-600 flex items-center"
          >
            Shop More <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {demoCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="flex flex-col items-center group"
            >
              <div className="relative w-32 h-32 mb-3 rounded-full overflow-hidden transition-all duration-300">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={130}
                  height={130}
                  className="object-cover w-full h-full group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <span className="text-base text-gray-700 dark:text-slate-100 group-hover:text-green-600 transition-colors duration-300">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotCategories;
