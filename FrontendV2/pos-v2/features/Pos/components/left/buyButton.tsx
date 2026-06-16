"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { usePosStore } from "../../Store/PosCartStore";

export default function BuyButton() {
  const cart = usePosStore((s) => s.cart);
  const Total = usePosStore((s) => s.Total);
  const clearCart = usePosStore((s) => s.clearCart);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={cart.length === 0}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:pointer-events-none group"
        >
          <CreditCard className="size-4 group-hover:scale-110 transition-transform" />
          Pay (${Total.toFixed(2)})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Payment Type</DialogTitle>
        </DialogHeader>
        <DialogPortal>
          <div className="flex items-center gap-2">
            <Button>cash</Button>
            <Button>Debt</Button>
          </div>
        </DialogPortal>
      </DialogContent>
    </Dialog>
  );
}
