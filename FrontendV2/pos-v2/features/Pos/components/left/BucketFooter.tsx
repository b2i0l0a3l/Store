"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Percent, Receipt } from "lucide-react";
import { usePosStore } from "../../Store/PosCartStore";
import BuyButton from "./buyButton";

export default function BucketFooter() {
  const Total  = usePosStore((s)=> s.Total);

  return (
    <div className="w-full p-4 flex flex-col gap-3 shrink-0">
      <div className="w-full flex flex-col gap-2 text-xs">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-zinc-800 dark:text-zinc-200">
            Total
          </span>
          <span className="font-black text-primary text-base drop-shadow-sm">
            ${Total.toFixed(2)}
          </span>
        </div>
        <BuyButton/>
      </div>
      
    </div>
  );
}
