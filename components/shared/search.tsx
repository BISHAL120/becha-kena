"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = ({ className }: { className?: string }) => {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const router = useRouter();
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .post("/api/product/search", { search })
        .then((res) => {
          setProducts(res.data.Data);
        })
        .catch((err) => console.log(err));
    };

    getProducts();
  }, [search]);

  useEffect(() => {
    setDebouncedQuery(searchQuery);
  }, [searchQuery]);

  // Fetch search results when debouncedQuery changes
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery) return;
      router.push(`?search=${debouncedQuery.split(" ").join("-")}`);
    };

    fetchData();
  }, [debouncedQuery, router]);

  if (!products) return null;

  return (
    <div className={`w-[60%] ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" />
        {products.length > 0 && searchQuery.length > 0 && (
          <div className="absolute top-[45px] bg-background p-4 rounded-lg shadow-lg z-50 border w-full">
            <ScrollArea className="h-96">
              {products.map((product) => (
                <div
                  onClick={() => {
                    setSearchQuery("");
                    router.push(
                      `/products/${product.productSlug}/?id=${product.id}`
                    );
                  }}
                  className="flex items-center justify-start gap-3 border-b h-20 cursor-default"
                  key={product.id}
                >
                  <div className="w-16 h-16">
                    <Image
                      src={product.image[0]}
                      alt="Product Image"
                      width={80}
                      height={80}
                      className="object-cover h-16 my-auto"
                    />
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div>
                    <p className="font-semibold truncate text-clip w-[600px]">
                      {product.productName + "..."}
                    </p>
                    <p className="font-medium text-sm text-muted-foreground">
                      {product.categoryName}
                    </p>
                    <p className="text-base font-semibold">
                      {Intl.NumberFormat("bn-BD", {
                        style: "currency",
                        currency: "BDT",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(Number(product.price))}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
