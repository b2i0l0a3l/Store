"use client";

import { useStore } from "@/Features/Sells/store/store";
import { useMemo } from "react";

export default function BasketInfo() {
  const cart = useStore((state: any) => state.cart);
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc: number, item: any) => acc + item.price * (item.quantity || 1),
      0,
    );
  }, [cart]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-400">Total Items</span>
        <span className="text-sm font-bold text-white bg-slate-700 px-2.5 py-0.5 rounded-full">
          {cart.reduce(
            (acc: number, item: any) => acc + (item.quantity || 1),
            0,
          )}
        </span>
      </div>
      <div className="flex items-center justify-between ">
        <span className="text-sm font-medium text-slate-400">Total Price</span>
        <span className="text-lg font-bold text-blue-400">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </>
  );
}
