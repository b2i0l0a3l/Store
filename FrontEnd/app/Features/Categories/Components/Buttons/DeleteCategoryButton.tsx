"use client";
import { deleteCategory } from "@/app/Features/Categories/api/categoryApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback } from "react";
import { useCategoryStore } from "@/app/Features/Categories/store/category";
import { toast } from "@/app/store/useToastStore";

const DeleteCategoryButton = memo(function DeleteCategoryButton({
  dataId,
}: {
  dataId: number;
}) {
  const handleDelete = useCallback(async () => {
    const success = await deleteCategory({ id: dataId });
    if (success) {
      useCategoryStore.getState().recordDelete(dataId);
      toast.success("تم حذف التصنيف بنجاح");
    } else {
      toast.error("حدث خطأ أثناء حذف التصنيف");
    }
  }, [dataId]);

  return (
    <CustomButton
      onClick={handleDelete}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/80 transition-all duration-200"
      icon={TrashIcon}
    />
  );
});

export default DeleteCategoryButton;
