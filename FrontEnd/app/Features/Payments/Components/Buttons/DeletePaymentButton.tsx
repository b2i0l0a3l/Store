"use client";
import { memo } from "react";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DeletePayment } from "@/app/Features/Payments/api/paymentApi";
import { usePaymentStore } from "@/app/Features/Payments/store/paymentStore";
import { toast } from "@/app/store/useToastStore";

function DeletePaymentButton({ id }: { id: number }) {
  const recordDelete = usePaymentStore((state) => state.recordDelete);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this payment?")) {
      const success = await DeletePayment(id);
      if (success) {
        toast.success("Payment deleted successfully");
        recordDelete(id);
      } else {
        toast.error("Failed to delete payment");
      }
    }
  };

  return (
    <CustomButton
      onClick={handleDelete}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/80 transition-all duration-200"
      icon={TrashIcon}
    />
  );
}

export default memo(DeletePaymentButton);
