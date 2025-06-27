import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const POPULAR_ARTICLES = [
  {
    id: 1,
    title: "Best Strategy to Achieve Profitable Harvest",
    excerpt:
      "Optimal strategies for achieving profitable harvests include a comprehensive approach to farm management, selection of appropriate crop varieties...",
    date: "October 23, 2023",
    image: "/demoImage/placeholder.svg",
  },
  {
    id: 2,
    title: "Abundant Harvest from Agricultural Farm Land Shows Success",
    date: "October 20, 2023",
    image: "/demoImage/placeholder.svg",
  },
  {
    id: 3,
    title: "Latest Innovations Increasing Milk Production and Quality",
    date: "October 18, 2023",
    image: "/demoImage/placeholder.svg",
  },
];

const LATEST_ARTICLES = [
  {
    id: 1,
    title: "Exploring Potential and Challenges in Global Agriculture",
    excerpt:
      "Discovering the Vast Potential and Complex Challenges in the World of Global Agriculture",
    date: "October 23, 2023",
    image: "/demoImage/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Bringing Change in the Livestock Industry",
    excerpt:
      "Revealing Innovations, Challenges and Transformation Patterns in the Industry",
    date: "October 19, 2023",
    image: "/demoImage/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Potential and Constraints Faced in Production Quality",
    excerpt:
      "Discusses Challenges and Opportunities in Achieving High Production Standards",
    date: "October 18, 2023",
    image: "/demoImage/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Bringing Change in the Livestock Industry",
    excerpt:
      "Revealing Innovations, Challenges and Transformation Patterns in the Industry",
    date: "October 19, 2023",
    image: "/demoImage/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Potential and Constraints Faced in Production Quality",
    excerpt:
      "Discusses Challenges and Opportunities in Achieving High Production Standards",
    date: "October 18, 2023",
    image: "/demoImage/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: "Bringing Change in the Livestock Industry",
    excerpt:
      "Revealing Innovations, Challenges and Transformation Patterns in the Industry",
    date: "October 19, 2023",
    image: "/demoImage/placeholder.svg?height=300&width=400",
  },
  {
    id: 7,
    title: "Potential and Constraints Faced in Production Quality",
    excerpt:
      "Discusses Challenges and Opportunities in Achieving High Production Standards",
    date: "October 18, 2023",
    image: "/demoImage/placeholder.svg?height=300&width=400",
  },
  // Add more articles as needed
];

const Blogs = () => {
  return (
    <div>
      {" "}
      <div>
        {/* Hero Section */}
        <div className="relative h-[600px]">
          <Image
            src="/demoImage/image.png"
            alt="Agricultural field"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
            <h1 className="max-w-4xl text-center text-4xl font-bold leading-normal tracking-tight md:text-5xl lg:text-6xl">
              <span>Search for </span> <br /> Article, Success Stroy, Business
              Journey and more!
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <section className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">Success Story</h2>
            <div className="grid gap-2 md:grid-cols-2">
              <article className="col-span-2 md:col-span-1">
                <Link
                  href={`/article/${POPULAR_ARTICLES[0].id}`}
                  className="group"
                >
                  <Image
                    src={POPULAR_ARTICLES[0].image}
                    alt={POPULAR_ARTICLES[0].title}
                    width={600}
                    height={400}
                    className="mb-4 rounded-lg object-cover"
                  />
                  <p className="mb-2 text-sm text-gray-600">
                    {POPULAR_ARTICLES[0].date}
                  </p>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
                    {POPULAR_ARTICLES[0].title}
                  </h3>
                  <p className="text-gray-600">{POPULAR_ARTICLES[0].excerpt}</p>
                </Link>
              </article>
              <div className="col-span-2 space-y-6 md:col-span-1">
                {POPULAR_ARTICLES.map((article) => (
                  <article key={article.id} className="flex gap-4">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={180}
                      height={180}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="mb-1 text-sm text-gray-600">
                        {article.date}
                      </p>
                      <Link href={`/article/${article.id}`}>
                        <h3 className="font-semibold hover:text-primary">
                          {article.title}
                        </h3>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">Latest Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {LATEST_ARTICLES.map((article) => (
                <article key={article.id}>
                  <Link href={`/article/${article.id}`} className="group">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={300}
                      className="mb-4 rounded-lg object-cover"
                    />
                    <p className="mb-2 text-sm text-gray-600">{article.date}</p>
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </section>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="?page=1">Previous</Link>
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                asChild
              >
                <Link href={`?page=${page}`}>{page}</Link>
              </Button>
            ))}
            <Button variant="outline" size="sm" asChild>
              <Link href="?page=2">Next</Link>
            </Button>
          </div>
        </div>
        {/* Newsletter Section */}
        <section className="relative py-24">
          <Image
            src="/demoImage/placeholder.svg"
            alt="Agricultural field"
            fill
            className="object-cover brightness-50"
          />
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center text-white">
            <h2 className="mb-8 text-4xl font-bold">
              Get Newsletter Blog and article news
            </h2>
            <div className="flex w-full max-w-md items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/90 text-black"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Join Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
