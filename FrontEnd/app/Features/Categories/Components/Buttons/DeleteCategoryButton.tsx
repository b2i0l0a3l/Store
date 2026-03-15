"use client";
import { deleteCategory } from "@/app/Features/Categories/api/categoryApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/solid";
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
      className="px-4 py-2"
      color=""
      hoverColor="hover:opacity-80"
      text=""
      icon={TrashIcon}
      onClick={handleDelete}
    />
  );
});

export default DeleteCategoryButton;
