import { TrashIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { useOrderItemStore } from "../../store/orderItem";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/Ui/Modal/ConfirmDeleteModal";

export default function DeleteItemButton({ itemId }: { itemId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    // TODO: Handle item delete API call
    console.log("Delete item", itemId);
    useOrderItemStore.getState().recordDelete(itemId);
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
          title="حذف العنصر"
          message="هل أنت متأكد من أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء."
        />
      )}
    </>
  );
}
