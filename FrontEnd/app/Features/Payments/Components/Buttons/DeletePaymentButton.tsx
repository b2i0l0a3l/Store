"use client";
import { memo, useState } from "react";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DeletePayment } from "@/app/Features/Payments/api/paymentApi";
import { usePaymentStore } from "@/app/Features/Payments/store/paymentStore";
import { toast } from "@/app/store/useToastStore";
import ConfirmDeleteModal from "@/app/components/Ui/Modal/ConfirmDeleteModal";

function DeletePaymentButton({ id }: { id: number }) {
  const recordDelete = usePaymentStore((state) => state.recordDelete);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const success = await DeletePayment(id);
    setIsDeleting(false);
    setIsModalOpen(false);

    if (success) {
      toast.success("تم حذف الدفعة بنجاح");
      recordDelete(id);
    } else {
      toast.error("فشل في حذف الدفعة");
    }
  };

  return (
    <>
      <CustomButton
        onClick={handleDeleteClick}
        text=""
        hoverColor=""
        hoverTextColor="text-white"
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/80 transition-all duration-200"
        icon={TrashIcon}
      />
      {isModalOpen && (
        <ConfirmDeleteModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
          title="حذف الدفعة"
          message="هل أنت متأكد من أنك تريد حذف هذه الدفعة؟ لا يمكن التراجع عن هذا الإجراء."
        />
      )}
    </>
  );
}

export default memo(DeletePaymentButton);
