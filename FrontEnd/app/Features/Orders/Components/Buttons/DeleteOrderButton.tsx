import { TrashIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { useOrderStore } from "../../store/order";
import { useState } from "react";
import ConfirmDeleteModal from "@/app/components/Ui/Modal/ConfirmDeleteModal";

export default function DeleteOrderButton({ id }: { id: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    // TODO: implement actual delete logic
    useOrderStore.getState().recordDelete(id);
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
