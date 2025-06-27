"use client";

import { useState } from "react";
import { Eye, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Product } from "@prisma/client";

const Buttons = ({
  data,
  merchant,
}: {
  data: Product;
  merchant: string | undefined;
}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  return (
    <div>
      <div className="hidden md:flex flex-col gap-2 absolute right-2 top-2">
        <button
          onClick={() => setShowQuickView(true)}
          className="rounded-full bg-white/80 dark:bg-slate-700 p-2 transition-colors border border-black/60 dark:border-gray-500 hover:bg-white"
        >
          <Eye className="h-5 w-5 stroke-gray-600 dark:stroke-gray-200 " />
        </button>
      </div>
      {/* Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>
              {data?.productName?.slice(0, 20)}{" "}
              {data.productName && data?.productName?.length > 20 ? "..." : ""}
            </DialogTitle>
          </DialogHeader>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {data.image.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${data.productName} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary stroke-primary" />
                <span>4.3 rating</span>
              </div>
              <span className="font-bold">${data?.price?.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground">{merchant}</p>
            {/* <p className="text-sm text-muted-foreground">{pros.description}</p> */}
            <Button onClick={() => setShowQuickView(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Buttons;
