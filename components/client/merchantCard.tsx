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
    whatsAppNumber: string | null;
    shopName: string | null;
    address: string | null;
    businessCategory: string | null;
    ratingCount: number;
    ratingTotal: number;
    productCount: number;
    createdAt: Date;
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
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        {/* Banner and Profile Section */}
        <div className="relative h-56 md:h-64 bg-muted">
          <Image
            src={merchant.bannerImage || "/demoImage/placeholder.svg"}
            alt={merchant.name}
            fill
            className="object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Profile Image */}
          <div className="flex justify-center items-center overflow-hidden bg-background w-20 h-20 md:w-24 md:h-24 rounded-full absolute -bottom-10 left-4 ring-4 ring-background shadow-xl">
            <Image
              src={merchant.image || "/demoImage/placeholder.svg"}
              alt={merchant.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Save Button */}
          {current && (
            <div className="absolute top-4 right-4">
              {current?.saveMerchant.includes(merchant.id) ? (
                <Button
                  onClick={handleRemoveMerchant}
                  variant="destructive"
                  className="rounded-full px-4 py-2 text-sm font-medium"
                >
                  <BookmarkMinus className="mr-2 h-4 w-4" />
                  Saved
                </Button>
              ) : (
                <Button
                  onClick={handleSaveMerchant}
                  className="rounded-full px-4 py-2 text-sm font-medium bg-white/90 text-black hover:bg-white"
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save Store
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 pt-12">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{merchant.name}</h3>
              {merchant.shopName && (
                <p className="text-sm text-muted-foreground mt-1">
                  {merchant.shopName}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-500" />
                <span className="font-medium">
                  {isNaN(merchant.ratingTotal / merchant.ratingCount)
                    ? "0.0"
                    : (merchant.ratingTotal / merchant.ratingCount).toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({merchant.ratingCount} reviews)
              </span>
            </div>
          </div>

          {/* Business Details */}
          {merchant.businessCategory && (
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">
              {merchant.businessCategory}
            </div>
          )}

          {/* Store Details */}
          {current ? (
            <div>
              {current.isActive && current.idDeactivationDate >= new Date() ? (
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-full space-y-2">
                      {merchant.address && (
                        <p className="text-muted-foreground flex items-center">
                          <span className="inline-block w-4 h-4 mr-2">📍</span>
                          {merchant.address}
                        </p>
                      )}
                      {merchant.number && (
                        <p className="text-muted-foreground flex items-center">
                          <span className="inline-block w-4 h-4 mr-2">📞</span>
                          {merchant.number}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-3">
                        {merchant.productCount > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {merchant.productCount} products
                          </span>
                        )}
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          Since {new Date(merchant.createdAt).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center text-muted-foreground">
                  Activate your account to view store details
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="block mt-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center text-muted-foreground hover:bg-muted transition-colors">
                Sign in to view store details
              </div>
            </Link>
          )}
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="p-6 pt-0 gap-4">
        <Link
          href={`/users/profile`}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-2.5 text-center font-medium transition-colors"
        >
          Visit Store
        </Link>
        {merchant.whatsAppNumber && (
          <Link
            href={`https://wa.me/${merchant.whatsAppNumber}`}
            target="_blank"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 text-center font-medium transition-colors"
          >
            WhatsApp
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
