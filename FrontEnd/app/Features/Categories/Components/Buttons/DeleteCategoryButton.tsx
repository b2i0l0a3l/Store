"use client";
import { deleteCategory } from "@/app/Features/Categories/api/categoryApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback, useState } from "react";
import { useCategoryStore } from "@/app/Features/Categories/store/category";
import { toast } from "@/app/store/useToastStore";
import ConfirmDeleteModal from "@/app/components/Ui/Modal/ConfirmDeleteModal";

const DeleteCategoryButton = memo(function DeleteCategoryButton({
  dataId,
}: {
  dataId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    const success = await deleteCategory({ id: dataId });
    setIsDeleting(false);
    setIsModalOpen(false);

    if (success) {
      useCategoryStore.getState().recordDelete(dataId);
      toast.success("تم حذف التصنيف بنجاح");
    } else {
      toast.error("حدث خطأ أثناء حذف التصنيف");
    }
  }, [dataId]);

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
          title="حذف التصنيف"
          message="هل أنت متأكد من أنك تريد حذف هذا التصنيف؟ لا يمكن التراجع عن هذا الإجراء."
        />
      )}
    </>
  );
});

export default DeleteCategoryButton;
