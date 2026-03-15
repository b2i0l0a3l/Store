"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { EyeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import OrderModal from "../Modals/OrderModal";
import { order } from "@/app/Features/Orders/types";
import { getOrderById } from "@/app/Features/Orders/api/orderApi";

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
        className=" text-white px-4 py-2 bg-transparent rounded-md"
        text=""
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
