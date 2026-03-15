"use client";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

import { useStore, CartItem as item } from "@/app/Features/Sells/store/store";
import ItemCard from "./itemCard";
import { useEffect, useRef } from "react";

export default function BasketBody() {
  const cart = useStore((state: any) => state.cart);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [cart]);

  return (
    <>
      {cart.length === 0 ? (
        <div className="flex flex-col h-full items-center justify-center text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mb-2">
            <ShoppingCartIcon className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 font-medium">Your cart is empty</p>
          <p className="text-slate-500 text-sm max-w-[200px]">
            Click the + button on an item to add it here.
          </p>
        </div>
      ) : (
        cart.map((item: item, idx: number) => (
          <ItemCard key={item.productId} item={item} idx={idx} />
        ))
      )}
      <div ref={endRef} />
    </>
  );
}
