"use client";
import { deleteProduct } from "@/app/Features/Products/api/productApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback, useState } from "react";
import { useProductStore } from "@/app/Features/Products/store/product";
import { toast } from "@/app/store/useToastStore";
import ConfirmDeleteModal from "@/app/components/Ui/Modal/ConfirmDeleteModal";

const DeleteProductButton = memo(function DeleteProductButton({
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
    const res = await deleteProduct({ id: dataId });
    setIsDeleting(false);
    setIsModalOpen(false);

    if (res.succeeded) {
      useProductStore.getState().recordDelete(dataId);
      toast.success(res.message || "تم حذف المنتج بنجاح");
    } else {
      toast.error(res.message || "حدث خطأ أثناء حذف المنتج");
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
          title="حذف المنتج"
          message="هل أنت متأكد من أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء."
        />
      )}
    </>
  );
});

export default DeleteProductButton;
