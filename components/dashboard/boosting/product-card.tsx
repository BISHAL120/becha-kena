"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Package, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  sales: number;
  isActive: boolean;
  currentBoost?: {
    type: "standard" | "premium";
    daysLeft: number;
    expiresAt: Date;
  } | null;
}

interface ProductCardProps {
  product: Product;
  onBoostClick: () => void;
}

export function ProductCard({ product, onBoostClick }: ProductCardProps) {
  const isCurrentlyBoosted = !!product.currentBoost;

  return (
    <Card
      className={`p-0 relative overflow-hidden transition-all hover:shadow-lg max-w-[350px] max-h-[450px] ${
        isCurrentlyBoosted
          ? "ring-1 ring-blue-400 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10"
          : ""
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/20 to-transparent z-10" />

      {isCurrentlyBoosted && (
        <div className="absolute top-3 left-3 z-20">
          <Badge
            variant={
              product.currentBoost?.type === "premium" ? "default" : "secondary"
            }
            className="gap-1 px-2 py-1"
          >
            <Zap className="h-3 w-3" />
            {product.currentBoost?.type === "premium" ? "Premium" : "Standard"}
          </Badge>
        </div>
      )}

      <div className="relative h-40 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5 text-muted-foreground" />
            <span
              className={product.stock < 10 ? "text-red-500" : "text-green-500"}
            >
              {product.stock} in stock
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{product.sales} sold</span>
          </div>
        </div>

        {isCurrentlyBoosted && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-2 text-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-medium">
                  {product.currentBoost?.daysLeft} days left
                </span>
              </div>
              <span className="text-muted-foreground">
                {Math.round(
                  ((15 - (product.currentBoost?.daysLeft || 0)) / 15) * 100
                )}
                % complete
              </span>
            </div>
            <Progress
              value={((15 - (product.currentBoost?.daysLeft || 0)) / 15) * 100}
              className="h-1"
            />
          </div>
        )}

        <Button
          onClick={onBoostClick}
          className={`w-full py-2 text-sm ${
            isCurrentlyBoosted
              ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          }`}
          disabled={!product.isActive}
        >
          <Zap className="h-3.5 w-3.5 mr-1" />
          {isCurrentlyBoosted ? "Extend Boost" : "Boost Now"}
        </Button>

        {!product.isActive && (
          <p className="text-[10px] text-muted-foreground text-center">
            Product is inactive and cannot be boosted
          </p>
        )}
      </CardContent>
    </Card>
  );
}
