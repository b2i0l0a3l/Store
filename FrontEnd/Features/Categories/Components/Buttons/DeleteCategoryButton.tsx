"use client";
import { deleteCategory } from "@/Features/Categories/api/categoryApi";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback, useState } from "react";
import { useCategoryStore } from "@/Features/Categories/store/category";
import { toast } from "@/store/useToastStore";
import ConfirmDeleteModal from "@/components/Ui/Modal/ConfirmDeleteModal";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

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
    await executeOfflineMutation({
      type: 'DELETE_CATEGORY',
      payload: { id: dataId },
      apiCall: () => deleteCategory({ id: dataId }),
      localDbUpdate: async () => {
        await db.categories.delete(dataId);
      },
      onSuccess: () => {
        useCategoryStore.getState().recordDelete(dataId);
      }
    });
    setIsDeleting(false);
    setIsModalOpen(false);
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
