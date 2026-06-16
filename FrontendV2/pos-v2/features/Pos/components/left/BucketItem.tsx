"use client";
import React, { useState } from "react";
import { usePosStore } from "../../Store/PosCartStore";
import { Minus, Package, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { isValidImageUrl } from "@/lib/utils";


export default function BucketItem() {
  const cart = usePosStore((s) => s.cart);
  const updateQuantity = usePosStore((s) => s.updateQuantity);
  const removeItem = usePosStore((s) => s.removeItem);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImgError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      {cart.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3">
          <div className="size-16 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-300 dark:text-zinc-700 shadow-inner">
            <ShoppingCart className="size-8 stroke-[1.5]" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
              Empty Cart
            </h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-[200px]">
              Add items to cart
            </p>
          </div>
        </div>
      ) : (
        cart.map((item) => {
          const hasError =
            imgErrors[item.id] ||
            !isValidImageUrl(item.imageUrl);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/5 hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors duration-200 group"
            >
              <div className="relative size-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0 border border-zinc-200/20">
                {hasError ? (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                    <Package className="size-5" />
                  </div>
                ) : (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                    onError={() => handleImgError(item.id)}
                  />
                )}
              </div>

              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-xs text-zinc-800 dark:text-zinc-200 line-clamp-1 leading-tight group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg shrink-0">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="size-6 rounded-md bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-primary transition-colors shadow-sm"
                >
                  <Minus className="size-3" strokeWidth={2.5} />
                </button>
                <span className="w-6 text-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="size-6 rounded-md bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-primary transition-colors shadow-sm"
                >
                  <Plus className="size-3" strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex flex-col items-end gap-1.5 pl-1 shrink-0">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-destructive transition-all duration-200 rounded-md hover:bg-destructive/10"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
