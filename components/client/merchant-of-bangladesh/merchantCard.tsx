"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { BookmarkMinus, BookmarkPlus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MerchantCardProps {
  merchant: {
    number: string | null;
    name: string;
    id: string;
    address: string | null;
    ratingCount: number;
    ratingTotal: number;
    image: string | null;
    bannerImage: string | null;
  };
  current: {
    id: string;
    saveMerchant: string[];
    isActive: boolean;
    idDeactivationDate: Date;
  } | null;
}

export function MerchantCard({ merchant, current }: MerchantCardProps) {
  const router = useRouter();

  const handleSaveMerchant = async () => {
    toast.loading("Saving...");
    try {
      await axios
        .patch("/api/user/saveMerchant", {
          id: current?.id,
          saveId: merchant.id,
          type: "save",
        })
        .then(() => {
          toast.dismiss();
          router.refresh();
          toast.success("Merchant Saved");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveMerchant = async () => {
    toast.loading("Removing...");
    try {
      await axios
        .patch("/api/user/saveMerchant", {
          id: current?.id,
          saveId: merchant.id,
          type: "remove",
        })
        .then(() => {
          toast.dismiss();
          router.refresh();
          toast.success("Merchant Removed");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 bg-muted">
          <Image
            src={merchant.bannerImage || "/demoImage/placeholder.svg"}
            alt={merchant.name}
            fill
            className="object-cover"
          />
          {/* TODO: Replace the name with user name */}
          <div className="flex justify-center items-center overflow-hidden bg-background w-16 h-16 rounded-full absolute bottom-2 left-2 ring-2 ring-offset-2 ring-offset-background">
            <Image
              src={merchant.image || "/demoImage/placeholder.svg"}
              alt={merchant.name}
              fill
              className="object-cover"
            />
          </div>
          {current && (
            <div>
              {current?.saveMerchant.includes(merchant.id) ? (
                <Button
                  onClick={() => {
                    handleRemoveMerchant();
                  }}
                  className="absolute top-4 right-4 text-sm dark:text-white bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 dark:bg-red-600"
                >
                  <BookmarkMinus className="mr-2 h-4 w-4" /> Removed
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleSaveMerchant();
                  }}
                  className="absolute top-4 right-4 text-sm bg-blue-500 hover:bg-blue-600 dark:text-white"
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" /> Save Seller
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold">{merchant.name}</h3>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(merchant.ratingTotal / merchant.ratingCount)
                    ? "fill-yellow-400 stroke-yellow-500 text-primary"
                    : "fill-muted text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {isNaN(merchant.ratingTotal / merchant.ratingCount)
                ? 0
                : (merchant.ratingTotal / merchant.ratingCount).toFixed(1)}
            </span>
          </div>
          {current ? (
            <div>
              {current.isActive && current.idDeactivationDate >= new Date() ? (
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>{merchant.address}</p>
                  <p>{merchant.number}</p>
                </div>
              ) : (
                <div className="text-muted-foreground py-4">
                  Active Account for store details
                </div>
              )}
            </div>
          ) : (
            <Link href={"/login"}>
              <div className="text-muted-foreground py-4">
                Please login to view store details
              </div>
            </Link>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          href={`/users/profile`}
          className="w-full text-center bg-slate-600 hover:bg-slate-800 dark:hover:bg-slate-900 dark:bg-slate-400 dark:text-slate-800 dark:hover:text-slate-200 rounded-lg py-2 text-white"
        >
          Visit Store
        </Link>
      </CardFooter>
    </Card>
  );
}
