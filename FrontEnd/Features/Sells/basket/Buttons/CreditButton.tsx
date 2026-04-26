"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";
import { memo, useState } from "react";
import { useStore } from "../../store/store";
import dynamic from "next/dynamic";

const CreditModal = dynamic(() => import("../modals/CreditModal"), {
  loading: () => <div>Loading...</div>,
});
function CreditButton() {
  const [open, setOpen] = useState(false);
  const cart = useStore((state) => state.cart);

  return (
    <>
      <CustomButton
        disabled={cart.length === 0}
        text="Credit"
        className="py-1.5 px-3 text-xs bg-linear-to-r from-amber-600 to-orange-500"
        icon={CurrencyDollarIcon}
        onClick={() => {
          setOpen(true);
        }}
      />
      {open && (
        <CreditModal
          cart={cart}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

export default memo(CreditButton);
