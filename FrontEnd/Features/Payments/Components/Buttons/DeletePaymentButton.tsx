"use client";
import { memo, useState } from "react";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DeletePayment } from "@/Features/Payments/api/paymentApi";
import { usePaymentStore } from "@/Features/Payments/store/paymentStore";
import { toast } from "@/store/useToastStore";
import ConfirmDeleteModal from "@/components/Ui/Modal/ConfirmDeleteModal";
import { db } from "@/util/db";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";

function DeletePaymentButton({ id }: { id: number }) {
  const recordDelete = usePaymentStore((state) => state.recordDelete);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await executeOfflineMutation({
      type: 'DELETE_PAYMENT',
      payload: { id },
      apiCall: () => DeletePayment(id),
      localDbUpdate: async () => {
        await db.payments.delete(id);
      },
      onSuccess: () => {
        recordDelete(id);
      }
    });
    setIsDeleting(false);
    setIsModalOpen(false);
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
