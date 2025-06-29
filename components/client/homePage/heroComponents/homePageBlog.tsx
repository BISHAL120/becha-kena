import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Sample blog data - you can replace this with actual data from your API
const FEATURED_BLOGS = [
  {
    id: 1,
    title: "Best Strategy to Achieve Profitable Harvest",
    excerpt:
      "Optimal strategies for achieving profitable harvests include a comprehensive approach to farm management...",
    date: "October 23, 2023",
    image: "/assets/blogs/blog1.jpg",
  },
  {
    id: 2,
    title: "Abundant Harvest from Agricultural Farm Land Shows Success",
    excerpt:
      "Discovering the vast potential and complex challenges in modern farming techniques...",
    date: "October 20, 2023",
    image: "/assets/blogs/blog2.jpg",
  },
  {
    id: 3,
    title: "Latest Innovations Increasing Milk Production and Quality",
    excerpt:
      "New technologies and methods that are revolutionizing dairy farming and production...",
    date: "October 18, 2023",
    image: "/assets/blogs/blog3.jpg",
  },
];

const HomePageBlog = () => {
  return (
    <div className=" ">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-100">
            Latest from Our Blog
          </h2>
          <Link
            href="/blogs"
            className="text-primary hover:underline mt-2 md:mt-0"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_BLOGS.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-4"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-all duration-400 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <Link href={`/blogs/article/${blog.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <Link
                  href={`/blogs/article/${blog.id}`}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View - Show More Button */}
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/blogs">View All Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePageBlog;
