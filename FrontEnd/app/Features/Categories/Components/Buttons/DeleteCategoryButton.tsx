"use client";
import { deleteCategory } from "@/app/Features/Categories/api/categoryApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback } from "react";
import { useCategoryStore } from "@/app/Features/Categories/store/category";

const DeleteCategoryButton = memo(function DeleteCategoryButton({
  dataId,
}: {
  dataId: number;
}) {
  const handleDelete = useCallback(async () => {
    await deleteCategory({ id: dataId });
    useCategoryStore.getState().recordDelete(dataId);
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
