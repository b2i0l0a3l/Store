import { TrashIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { useOrderStore } from "../../store/order";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/Ui/Modal/ConfirmDeleteModal";
import { deleteOrder } from "../../api/orderApi";
import { invalidateCache } from "@/util/Api/revalidate";
import { toast } from "@/hooks/useToastStore";
import { db } from "@/util/db";
import { executeOfflineMutation } from "@/hooks/useOfflineMutation";

export default function DeleteOrderButton({ id }: { id: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await executeOfflineMutation({
      type: 'DELETE_ORDER',
      payload: { id },
      apiCall: () => deleteOrder(id),
      localDbUpdate: async () => {
        await db.orders.delete(id);
      },
      onSuccess: () => {
        useOrderStore.getState().recordDelete(id);
        invalidateCache("orders", "products", "dashboard", "clients");
      },
      onError: () => {
        useOrderStore.getState().deletedOrderIds.delete(id);
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
          title="حذف الطلب"
          message="هل أنت متأكد من أنك تريد حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء."
        />
      )}
    </>
  );
}
