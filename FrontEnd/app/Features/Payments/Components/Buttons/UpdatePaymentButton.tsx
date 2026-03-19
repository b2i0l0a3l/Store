"use client";
import { useCallback, useState, memo } from "react";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import PaymentModal from "../Modal/PaymentModal";
import { UpdatePayment } from "@/app/Features/Payments/api/paymentApi";
import { usePaymentStore } from "@/app/Features/Payments/store/paymentStore";
import { toast } from "@/app/store/useToastStore";
import { Payment } from "@/app/Features/Payments/types";

function UpdatePaymentButton({ data }: { data: Payment }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const recordUpdate = usePaymentStore((state) => state.recordUpdate);

  const handleSubmit = useCallback(
    async (debtId: number, amount: number) => {
      const success = await UpdatePayment({
        id: data.id,
        debtID: debtId,
        amount,
      });
      if (success) {
        toast.success("Payment updated successfully");
        recordUpdate({ ...data, debtID: debtId, amount });
        setOpen(false);
      } else {
        toast.error("Failed to update payment");
      }
    },
    [data, recordUpdate],
  );

  return (
    <>
      <CustomButton
        onClick={handleOpen}
        text=""
        hoverColor=""
        hoverTextColor="text-white"
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-blue-500/80 transition-all duration-200"
        icon={PencilSquareIcon}
      />
      {open && (
        <PaymentModal
          title="Update Payment"
          icon={PencilSquareIcon as any}
          data={data}
          onClose={handleClose}
          onClick={handleSubmit}
        />
      )}
    </>
  );
}

export default memo(UpdatePaymentButton);
