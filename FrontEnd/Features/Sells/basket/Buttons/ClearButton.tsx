"use client";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useStore } from "@/Features/Sells/store/store";
import CustomButton from "@/components/Ui/buttons/CustomButton";

export default function ClearButton() {
  const clearCart = useStore((state) => state.clearCart);
  const cart = useStore((state) => state.cart);
  return (
    <CustomButton
      className="w-full py-1.5 px-3 text-xs"
      hoverColor="hover:bg-red-500/90"
      hoverTextColor="hover:text-white"
      color="bg-slate-800/80"
      text="Clear"
      icon={TrashIcon}
      onClick={() => clearCart()}
      disabled={cart.length === 0}
    />
  );
}
