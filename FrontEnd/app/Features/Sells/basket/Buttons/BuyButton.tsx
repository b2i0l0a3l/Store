"use client";

import { CartItem, useStore } from "@/app/Features/Sells/store/store";
import { useProductStore } from "@/app/Features/Products/store/product";
import { useState, useMemo, useCallback } from "react";
import { buy } from "@/app/Features/Orders/api/orderApi";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { toast } from "@/app/store/useToastStore";

export default function BuyButton() {
  const [loading, setLoading] = useState(false);

  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const recordSale = useProductStore((state) => state.recordSale);

  const request = useMemo(
    () => ({
      orderType: 0,
      items: cart.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    }),
    [cart],
  );

  const handleBuy = useCallback(async () => {
    const copy : CartItem[] = cart;
    try {
      if (!cart || !request) return;
      setLoading(true); 
      clearCart();
      await buy(request);
      recordSale(
        cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      );
      toast.success("تم الشراء بنجاح");
    } catch {
      useStore.getState().copy(copy);
      toast.error("فشل في الشراء");
    } finally {
      setLoading(false);
    }
  }, [request, clearCart, recordSale]);

  return (
    <CustomButton
      className={`py-2.5 px-4  active:scale-[0.98] ${
        loading || cart.length === 0
          ? "bg-slate-700 text-slate-400 cursor-not-allowed shadow-none"
          : "bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/25 text-white"
      } cursor-pointer`}
      hoverColor="hover:bg-blue-500"
      text={loading ? "Processing..." : "Complete Purchase"}
      icon={ShoppingBagIcon}
      onClick={() => handleBuy()}
      disabled={loading || cart.length === 0}
    />
  );
}
