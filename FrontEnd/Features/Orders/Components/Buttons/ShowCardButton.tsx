"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { EyeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import OrderModal from "../Modals/OrderModal";
import { order } from "@/Features/Orders/types";
import { getOrderById } from "@/Features/Orders/api/orderApi";

export default function ShowCardButton({ id }: { id: number }) {
  const [showCard, setShowCard] = useState(false);
  const [order, setOrder] = useState<order | null>(null);

  const openModal = async () => {
    if (!order) {
      const order = await getOrderById(id);
      setOrder(order);
    }
    setShowCard(true);
  };

  const closeModal = () => {
    setShowCard(false);
  };

  return (
    <>
      <CustomButton
        onClick={openModal}
        text=""
        hoverColor=""
        hoverTextColor="text-white"
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-500/80 transition-all duration-200"
        icon={EyeIcon}
      />
      {showCard && (
        <OrderModal
          title=""
          OrderId={id}
          onClose={closeModal}
          icon={ShoppingBagIcon}
        />
      )}
    </>
  );
}
