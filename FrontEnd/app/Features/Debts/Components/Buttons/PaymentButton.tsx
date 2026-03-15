"use client";
import { memo, useState } from "react";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import PaymentModal from "../Modal/PaymentModal";
import { pay } from "@/app/Features/Debts/api/paymentApi";
import { useDebtStore } from "@/app/Features/Debts/store/debt";

function PaymentButton({
  debtId,
  disabled,
}: {
  debtId: number;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const debtStore = useDebtStore();

  const handleSubmit = async (data: any) => {
    const model = {
      debtId: data.OrderId,
      amount: data.Amount,
    };
    const r = await pay(model);
    if (r) {
      debtStore.recordUpdate({ ...data, id: debtId });
    }
    setOpen(false);
  };
  return (
    <>
      <CustomButton
        disabled={disabled}
        onClick={handleOpen}
        className="px-4 py-2"
        color=""
        hoverColor="hover:opacity-80"
        text=""
        icon={CurrencyDollarIcon}
      />
      {open && (
        <PaymentModal
          handleClose={handleClose}
          OrderId={debtId}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default memo(PaymentButton);
