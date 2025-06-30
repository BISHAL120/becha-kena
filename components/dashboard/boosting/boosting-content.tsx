"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { BoostPackageSelector } from "./boost-package-selector";
import { ProductCard } from "./product-card";

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

interface BoostingContentProps {
  products: Product[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export function BoostingContent({ products }: BoostingContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "boosted" && product.currentBoost) ||
      (statusFilter === "not-boosted" && !product.currentBoost);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Filters and Search */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 min-w-fit">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-xl font-bold">
                Find Products to Boost
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Discover and promote products
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="flex-1 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-white dark:bg-slate-950 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-11 w-[180px] bg-white dark:bg-slate-950 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <SelectValue placeholder="Select Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11 w-[180px] bg-white dark:bg-slate-950 rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <SelectValue placeholder="Boost Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="boosted">Currently Boosted</SelectItem>
                  <SelectItem value="not-boosted">Not Boosted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBoostClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search terms or filters to find the products
              you&apos;re looking for.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Boost Package Selector Modal */}
      {selectedProduct && (
        <BoostPackageSelector
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={(packageType, duration) => {
            console.log(
              "Boosting product:",
              selectedProduct.id,
              "Package:",
              packageType,
              "Duration:",
              duration
            );
            // Handle boost confirmation here
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
