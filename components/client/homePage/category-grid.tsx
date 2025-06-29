import Image from "next/image";
import Link from "next/link";

const demoData = [
  {
    id: "1",
    name: "Category1",
    image: "/assets/products/product1.jpg",
  },
  {
    id: "2",
    name: "Category2",
    image: "/assets/products/product2.jpg",
  },
  {
    id: "3",
    name: "Category3",
    image: "/assets/products/product3.jpg",
  },
  {
    id: "4",
    name: "Category4",
    image: "/assets/products/product4.jpg",
  },
  {
    id: "5",
    name: "Category5",
    image: "/assets/products/product5.jpg",
  },
  {
    id: "6",
    name: "Category6",
    image: "/assets/products/product6.jpg",
  },
  {
    id: "7",
    name: "Category7",
    image: "/assets/products/product7.jpg",
  },
  {
    id: "8",
    name: "Category8",
    image: "/assets/products/product8.jpg",
  },
  {
    id: "9",
    name: "Category9",
    image: "/assets/products/product9.jpg",
  },
  {
    id: "10",
    name: "Category10",
    image: "/assets/products/product10.jpg",
  },
  {
    id: "11",
    name: "Category11",
    image: "/assets/products/product11.jpg",
  },
  {
    id: "12",
    name: "Category12",
    image: "/assets/products/product12.jpg",
  },
  {
    id: "13",
    name: "Category13",
    image: "/assets/products/product13.jpg",
  },
  {
    id: "14",
    name: "Category14",
    image: "/assets/products/product14.jpg",
  },
  {
    id: "15",
    name: "Category15",
    image: "/assets/products/product15.jpg",
  },
  {
    id: "16",
    name: "Category16",
    image: "/assets/products/product16.jpg",
  },
  {
    id: "17",
    name: "Category17",
    image: "/assets/products/product1.jpg",
  },
  {
    id: "18",
    name: "Category18",
    image: "/assets/products/product2.jpg",
  },
  {
    id: "19",
    name: "Category19",
    image: "/assets/products/product3.jpg",
  },
  {
    id: "20",
    name: "Category20",
    image: "/assets/products/product4.jpg",
  },
  {
    id: "21",
    name: "Category21",
    image: "/assets/products/product5.jpg",
  },
  {
    id: "22",
    name: "Category22",
    image: "/assets/products/product6.jpg",
  },
  {
    id: "23",
    name: "Category23",
    image: "/assets/products/product7.jpg",
  },
  {
    id: "24",
    name: "Category24",
    image: "/assets/products/product8.jpg",
  },
  {
    id: "25",
    name: "Category25",
    image: "/assets/products/product9.jpg",
  },
];

export async function CategoryGrid() {
  return (
    <div className=" ">
      <h2 className="text-2xl font-semibold mb-6">All Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {demoData.map((category, idx) => (
          <Link
            key={idx}
            href={`/categories/${category.id}?page=1&per_page=10&division=all`}
            className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-none"
          >
            <div className="relative border-none w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover sm:group-hover:scale-105 transition-transform duration-300 ease-out"
              />
              <div className="absolute inset-0 bg-black/[0.03] sm:group-hover:bg-black/0 transition-colors duration-300" />
            </div>
            <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm p-3 sm:transform sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300 translate-y-0">
              <span className="block text-center font-medium text-gray-800">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
