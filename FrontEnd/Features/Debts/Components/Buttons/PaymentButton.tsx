"use client";
import { memo, useState } from "react";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import PaymentModal from "../Modal/PaymentModal";
import { pay } from "@/Features/Debts/api/paymentApi";
import { useDebtStore } from "@/Features/Debts/store/debt";
import { toast } from "@/store/useToastStore";

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

    const res = await pay(data);
    if (res.succeeded) {
      debtStore.recordUpdate({ ...data, id: debtId });
      toast.success(res.message || "تم تسجيل الدفعة بنجاح");
    } else {
      toast.error(res.message || "حدث خطأ أثناء تسجيل الدفعة");
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
