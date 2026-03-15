"use client";
import { useStore } from "@/app/Features/Sells/store/store";
import { PlusIcon } from "@heroicons/react/16/solid";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";

export default function AddButton({ item }: { item: any }) {
  const addToCart = useStore((state: any) => state.addToCart);

  function handleClick() {
    const request = {
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    };
    addToCart(request);
  }
  return (
    <CustomButton
      data-id={`${item?.productId ?? 0}`}
      className="px-4 py-2 cursor-pointer "
      hoverColor="hover:bg-red-500"
      hoverTextColor="hover:text-white"
      color="bg-linear-to-r from-blue-600 to-cyan-600"
      text=""
      icon={PlusIcon}
      onClick={() => handleClick()}
      disabled={item.quantity <= 0}
    />
  );
}
