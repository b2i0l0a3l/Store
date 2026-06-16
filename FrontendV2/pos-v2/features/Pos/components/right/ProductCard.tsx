"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "../../types/productType";
import Image from "next/image";
import { useState } from "react";
import { Package, Plus } from "lucide-react";

function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  );
}

import { usePosStore } from "../../Store/PosCartStore";

export default function ProductCard({ Product }: { Product: Product }) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !isValidImageUrl(Product.imageUrl) || imgError;
  const { addItem } = usePosStore();

  return (
    <Card
      onClick={() => addItem(Product)}
      className="group relative overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 w-full h-full bg-white dark:bg-zinc-950/80 backdrop-blur-sm border-zinc-200/80 dark:border-zinc-800/80 rounded-xl"
    >
      <div className="relative h-[120px] w-full bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-900/50 overflow-hidden shrink-0">
        {showFallback ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-300 dark:text-zinc-600">
            <Package className="size-10 stroke-[1.5]" />
            <span className="text-[10px] font-medium tracking-wider uppercase">
              No Image
            </span>
          </div>
        ) : (
          <Image
            src={Product.imageUrl}
            alt={Product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}

        <div className="absolute top-2.5 left-2.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-sm text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
          {Product.categoryName}
        </div>

        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-200">
            <Plus className="size-4" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <CardContent className="p-3 pb-1.5 flex-grow ">
        <h3 className="font-semibold text-[13px] leading-snug line-clamp-2 text-zinc-800 dark:text-zinc-200 group-hover:text-primary transition-colors duration-300">
          {Product.name}
        </h3>
        <span className="text-lg font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {Product.price.toFixed(2)}
          <span className="text-xs font-bold ml-0.5">$</span>
        </span>
      </CardContent>
    </Card>
  );
}
