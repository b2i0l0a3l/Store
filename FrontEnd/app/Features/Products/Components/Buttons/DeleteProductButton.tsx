"use client";
import { deleteProduct } from "@/app/Features/Products/api/productApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback } from "react";
import { useProductStore } from "@/app/Features/Products/store/product";

const DeleteProductButton = memo(function DeleteProductButton({
  dataId,
}: {
  dataId: number;
}) {
  const handleDelete = useCallback(async () => {
    const r = await deleteProduct({ id: dataId });
    if (r) {
      useProductStore.getState().recordDelete(dataId);
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

export default DeleteProductButton;
