import { CategoryGrid } from "./category-grid";
import { CarouselAndCards } from "./heroComponents/carusel&Cards";
import FeaturedProducts from "./heroComponents/featuredProducts";
import FooterBanner from "./heroComponents/footerBanner";
import HomePageBlog from "./heroComponents/homePageBlog";
import HotCategories from "./heroComponents/hotCategories";
import NewsLetter from "./heroComponents/newsLatter";
import TopProducts from "./heroComponents/topProducts";
import VideoSection from "./heroComponents/videoSection";

export function HeroSectionV2() {
  return (
    <div className="px-2 py-6 space-y-16 md:space-y-20">
      {/* Main Hero Section - Split Layout */}
      <CarouselAndCards />

      {/* Categories Section */}
      <HotCategories />

      {/* Top Products */}
      <TopProducts />

      {/* All Categories */}
      <CategoryGrid />

      {/* Video Section */}
      <VideoSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Home Page Blog */}
      <HomePageBlog />

      {/* NewsLetter Section */}
      <NewsLetter />

      {/* Footer Banner */}
      <FooterBanner />
    </div>
  );
}
