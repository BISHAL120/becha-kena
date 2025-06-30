import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function HotProducts() {
  const stories = [
    {
      title: "Short Movie",
      image:
        "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=500&h=500&fit=crop",
    },
    {
      title: "Summer Season",
      image:
        "https://images.unsplash.com/photo-1517495306984-f84210f9daa8?w=500&h=500&fit=crop",
    },
    {
      title: "Robin's Story",
      image:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&h=500&fit=crop",
    },
    {
      title: "Love Myself",
      image:
        "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&h=500&fit=crop",
    },
    {
      title: "Paradise City",
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&h=500&fit=crop",
    },
    {
      title: "Short Movie",
      image:
        "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=500&h=500&fit=crop",
    },
    {
      title: "Summer Season",
      image:
        "https://images.unsplash.com/photo-1517495306984-f84210f9daa8?w=500&h=500&fit=crop",
    },
    {
      title: "Robin's Story",
      image:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&h=500&fit=crop",
    },
    {
      title: "Love Myself",
      image:
        "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&h=500&fit=crop",
    },
    {
      title: "Paradise City",
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&h=500&fit=crop",
    },
    {
      title: "Short Movie",
      image:
        "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=500&h=500&fit=crop",
    },
    {
      title: "Summer Season",
      image:
        "https://images.unsplash.com/photo-1517495306984-f84210f9daa8?w=500&h=500&fit=crop",
    },
    {
      title: "Robin's Story",
      image:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&h=500&fit=crop",
    },
    {
      title: "Love Myself",
      image:
        "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&h=500&fit=crop",
    },
    {
      title: "Paradise City",
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&h=500&fit=crop",
    },
    {
      title: "Short Movie",
      image:
        "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=500&h=500&fit=crop",
    },
    {
      title: "Summer Season",
      image:
        "https://images.unsplash.com/photo-1517495306984-f84210f9daa8?w=500&h=500&fit=crop",
    },
    {
      title: "Robin's Story",
      image:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&h=500&fit=crop",
    },
    {
      title: "Love Myself",
      image:
        "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=500&h=500&fit=crop",
    },
    {
      title: "Paradise City",
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&h=500&fit=crop",
    },
  ];

  return (
    <div className="">
      <h3 className="text-2xl px-2 pb-4 font-semibold">Hot Products</h3>
      <div className="">
        <Carousel className="w-full">
          <CarouselContent className="">
            {stories.map((story, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/5 lg:basis-[200px] xl:basis-[180px] basis-2/6"
              >
                <div className="w-[110px] px-2 py-2 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-lg overflow-hidden ring-2 p-1">
                    <Image
                      src={story.image}
                      width={100}
                      height={100}
                      alt={story.title}
                      className="w-full h-full rounded-md object-cover"
                    />
                  </div>
                  <span className="text-sm mt-2 block">
                    {story.title.slice(0, 10)}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
