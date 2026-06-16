"use client";
import { usePosStore } from "../../Store/PosCartStore";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function BucketHeader() {
  const  clearCart  = usePosStore((s)=>s.clearCart);
  const cart = usePosStore((s)=>s.cart);
  return (
    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/80 flex flex-row items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/10 shrink-0">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <ShoppingCart className="size-4" />
        </div>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          Cart Items
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </CardTitle>
      </div>
      {cart.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs gap-1.5 h-8 px-2 rounded-lg"
        >
          <Trash2 className="size-3.5" />
          Clear Cart
        </Button>
      )}
    </div>
  );
}
