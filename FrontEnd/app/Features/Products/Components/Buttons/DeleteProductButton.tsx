"use client";
import { deleteProduct } from "@/app/Features/Products/api/productApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/solid";
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
      className="px-4 py-2"
      color=""
      hoverColor="hover:opacity-80"
      text=""
      icon={TrashIcon}
      onClick={handleDelete}
    />
  );
});

export default DeleteProductButton;
