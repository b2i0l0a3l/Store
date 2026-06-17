"use client";
import { Product } from "@/features/Pos/types/productType";
import Image from "next/image";
import { Minus, Package, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { isValidImageUrl } from "@/lib/utils";
import { usePosStore } from "../../Store/PosCartStore";
import { Button } from "@/components/ui/button";

export default function BucketItemCart({ item }: { item: Product }) {
  const [imgError, setImgError] = useState(false);
  const updateQuantity = usePosStore((s) => s.updateQuantity);
  const removeItem = usePosStore((s) => s.removeItem);

  const hasError = imgError || !isValidImageUrl(item.imageUrl);

  return (
    <div className="group flex items-center gap-3 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200">
      
      <div className="relative size-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-500">
            <Package className="size-5" />
          </div>
        ) : (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            unoptimized
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-1 leading-tight group-hover:text-primary transition-colors">
          {item.name}
        </p>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 block">
          ${item.price.toFixed(2)} / unit
        </span>
      </div>

      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 shrink-0">
        <Button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="size-6 rounded-md bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-colors shadow-sm"
        >
          <Minus className="size-3" strokeWidth={2.5} />
        </Button>
        <span className="w-6 text-center text-xs font-bold text-zinc-800 dark:text-zinc-100 select-none">
          {item.quantity}
        </span>
        <Button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="size-6 rounded-md bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-colors shadow-sm"
        >
          <Plus className="size-3" strokeWidth={2.5} />
        </Button>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0 min-w-[52px]">
        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <Button
          onClick={() => removeItem(item.id)}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}