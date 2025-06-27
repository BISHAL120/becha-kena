"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface CarouselProps {
  images: string[];
  aspectRatio?: "square" | "portrait" | "video";
  className?: string;
}

export function ImageCarousel({
  images,
  aspectRatio = "square",
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      const currentIndexElement = thumbnailsRef.current.children[
        currentIndex
      ] as HTMLElement;
      const scrollLeft =
        currentIndexElement.offsetLeft - thumbnailsRef.current.offsetWidth / 2;
      thumbnailsRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [currentIndex]);

  return (
    <div className={cn("relative group", className)}>
      <div className="hidden md:block">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg border">
          <div
            className={cn(
              "relative",
              aspectRatio === "square" && "aspect-square",
              aspectRatio === "portrait" && "aspect-[3/4]",
              aspectRatio === "video" && "aspect-video"
            )}
          >
            <Image
              src={images[currentIndex]}
              alt={images[currentIndex]}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-700 backdrop-blur-sm border"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-700 backdrop-blur-sm border"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Thumbnails */}
        <div
          ref={thumbnailsRef}
          className="flex gap-2 my-4 overflow-x-auto hide-scrollBar hide-scrollBar px-2 py-2 snap-x"
        >
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => goToIndex(index)}
              className={cn(
                "relative flex-shrink-0 cursor-pointer rounded-md overflow-hidden snap-start border",
                "w-16 h-16 md:w-20 md:h-20",
                currentIndex === index && "ring-2 ring-primary"
              )}
            >
              <Image src={image} alt={image} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="md:hidden ">
        <Carousel className="w-full">
          <CarouselContent className="w-96 h-96">
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        width={500}
                        height={500}
                        alt={image}
                        className="object-cover w-full h-full transition-opacity duration-300"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
