import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
    return (
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
    );
}