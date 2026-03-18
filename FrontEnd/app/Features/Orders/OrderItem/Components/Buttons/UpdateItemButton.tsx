"use client";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { useState } from "react";
import { OrderItem } from "../../types";
import OrderItemModal from "../Modal/OrderItemModal";

export default function UpdateItemButton({
  orderItem,
}: {
  orderItem: OrderItem;
}) {
  const [open, setOpen] = useState(false);  
  return (
    <>
      <CustomButton
        onClick={() => {
          setOpen(true);
        }}
        text=""
        hoverColor=""
        hoverTextColor="text-white"
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-blue-500/80 transition-all duration-200"
        icon={PencilSquareIcon}
      />
      {open && (
        <OrderItemModal  setOpen={setOpen} orderItem={orderItem} />
      )}
    </>
  );
}
