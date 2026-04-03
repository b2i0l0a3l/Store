"use client";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { useState } from "react";
import { OrderItem } from "../../types";
import ReturnItemModal from "../Modal/ReturnItemModal";

export default function ReturnItemButton({
  orderItem,
  orderId,
}: {
  orderItem: OrderItem;
  orderId: number;
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
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-amber-500/80 transition-all duration-200"
        icon={ArrowUturnLeftIcon}
      />
      {open && <ReturnItemModal setOpen={setOpen} orderItem={orderItem} orderId={orderId} />}
    </>
  );
}
