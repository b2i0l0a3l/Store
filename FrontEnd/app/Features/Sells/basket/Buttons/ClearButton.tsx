"use client";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useStore } from "@/app/Features/Sells/store/store";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";

export default function ClearButton() {
  const clearCart = useStore((state: any) => state.clearCart);
  return (
    <CustomButton
      className="w-full h-full cursor-pointer"
      hoverColor="hover:bg-red-500"
      hoverTextColor="hover:text-white"
      color="bg-slate-700/80"
      text="Clear Cart"
      icon={TrashIcon}
      onClick={() => clearCart()}
      disabled={false}
    />
  );
}
