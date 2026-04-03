"use client";
import { memo, useState } from "react";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import PaymentModal from "../Modal/PaymentModal";
import { pay } from "@/app/Features/Debts/api/paymentApi";
import { useDebtStore } from "@/app/Features/Debts/store/debt";
import { toast } from "@/app/store/useToastStore";

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
    console.log(data);
    
    const success = await pay(data);
    if (success) {
      debtStore.recordUpdate({ ...data, id: debtId });
      toast.success("تم تسجيل الدفعة بنجاح");
    } else {
      toast.error("حدث خطأ أثناء تسجيل الدفعة");
    }
    setOpen(false);
  };
  return (
    <>
      <CustomButton
        disabled={disabled}
        onClick={handleOpen}
        text=""
        hoverColor=""
        hoverTextColor="text-white"
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-500/80 transition-all duration-200 disabled:opacity-50"
        icon={CurrencyDollarIcon}
      />
      {open && (
        <PaymentModal
          handleClose={handleClose}
          debtId={debtId}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default memo(PaymentButton);
