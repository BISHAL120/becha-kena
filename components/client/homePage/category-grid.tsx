import db from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";

/* const categories = [
  {
    name: "Apple iPhone",
    image: "/categories/iPhone.png",
    href: "/categories/phones",
  },
  {
    name: "Apple MacBook",
    image: "/categories/macbook.webp",
    href: "/categories/laptops",
  },
  {
    name: "Digital Products",
    image: "/categories/digital-products.jpg",
    href: "/categories/components",
  },
  {
    name: "Cameras",
    image: "/categories/cameras.jpg",
    href: "/categories/monitors",
  },
  {
    name: "phone Cases",
    image: "/categories/phone-case.png",
    href: "/categories/drones",
  },
  {
    name: "Apple iPhone",
    image: "/categories/iPhone.png",
    href: "/categories/phones",
  },
  {
    name: "Apple MacBook",
    image: "/categories/macbook.webp",
    href: "/categories/laptops",
  },
  {
    name: "Digital Products",
    image: "/categories/digital-products.jpg",
    href: "/categories/components",
  },
  {
    name: "Cameras",
    image: "/categories/cameras.jpg",
    href: "/categories/monitors",
  },
  {
    name: "phone Cases",
    image: "/categories/phone-case.png",
    href: "/categories/drones",
  },
  {
    name: "Apple iPhone",
    image: "/categories/iPhone.png",
    href: "/categories/phones",
  },
  {
    name: "Apple MacBook",
    image: "/categories/macbook.webp",
    href: "/categories/laptops",
  },
  {
    name: "Digital Products",
    image: "/categories/digital-products.jpg",
    href: "/categories/components",
  },
  {
    name: "Cameras",
    image: "/categories/cameras.jpg",
    href: "/categories/monitors",
  },
  {
    name: "phone Cases",
    image: "/categories/phone-case.png",
    href: "/categories/drones",
  },
]; */

export async function CategoryGrid() {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="my-12 ">
      <h2 className="text-2xl font-semibold mb-6">All Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {categories.map((category, idx) => (
          <Link
            key={idx}
            href={`/categories/${category.id}?page=1&per_page=10&division=all`}
            className="group flex flex-col items-center gap-2 p-4 border group rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="relative w-32 h-32">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-sm dark:group-hover:text-slate-800 text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
