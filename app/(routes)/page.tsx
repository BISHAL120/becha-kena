import { CategoryGrid } from "@/components/client/homePage/category-grid";
import { HeroSection } from "@/components/client/homePage/heroSection";
import db from "@/prisma/db";

export default async function Home() {
  const Premium = await db.product.findMany({
    where: {
      isDeleted: false,
      premiumPromote: true,
      premiumEndDate: { gt: new Date() },
    },
    select: {
      id: true,
      image: true,
      productName: true,
      description: true,
      productSlug: true,
    },
  });

  console.log(Premium);

  return (
    <main className="container mx-auto px-2 md:px-4 py-5">
      <HeroSection products={Premium} />
      <CategoryGrid />
    </main>
  );
}
