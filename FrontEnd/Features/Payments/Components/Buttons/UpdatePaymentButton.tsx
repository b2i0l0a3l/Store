"use client";
import { useCallback, useState, memo } from "react";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import PaymentModal from "../Modal/PaymentModal";
import { UpdatePayment } from "@/Features/Payments/api/paymentApi";
import { usePaymentStore } from "@/Features/Payments/store/paymentStore";
import { toast } from "@/store/useToastStore";
import { Payment } from "@/Features/Payments/types";
import { db } from "@/util/db";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";

function UpdatePaymentButton({ data }: { data: Payment }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const recordUpdate = usePaymentStore((state) => state.recordUpdate);

  const handleSubmit = useCallback(
    async (
      debtId: number,
      amount: number,
      paymentMethod: number,
      notes: string,
    ) => {
      const payload = {
        id: data.id,
        debtId: debtId,
        amount,
        clientName: data.clientName,
        paymentMethod,
        notes,
      };

      await executeOfflineMutation({
        type: 'UPDATE_PAYMENT',
        payload: payload,
        apiCall: UpdatePayment,
        localDbUpdate: async () => {
          await db.payments.update(data.id, { debtId, amount, paymentMethod, notes });
        },
        onSuccess: () => {
          recordUpdate({ ...data, debtId: debtId, amount, paymentMethod, notes });
          setOpen(false);
        }
      });
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
