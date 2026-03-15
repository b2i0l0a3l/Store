"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PencilIcon } from "@heroicons/react/24/solid";
import { memo, useState, useCallback } from "react";
import ProductModal from "../Modal/ProductModal";
import { updateProduct } from "@/app/Features/Products/api/productApi";
import { useProductStore } from "@/app/Features/Products/store/product";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";

const UpdateProductButton = memo(function UpdateProductButton({
  data,
  categories,
}: {
  data: product;
  categories: category[];
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSubmit = useCallback(
    async (payload: any, formData: any) => {
      const updatedData = { ...payload, id: data.id };
      const r = await updateProduct(updatedData);
      if (r) {
        useProductStore.getState().recordUpdate({ ...data, ...formData });
      }
      setOpen(false);
    },
    [data],
  );

  return (
    <>
      <CustomButton
        className="px-4 py-2"
        color=""
        hoverColor="hover:opacity-80"
        text=""
        icon={PencilIcon}
        onClick={handleOpen}
      />
      {open && (
        <ProductModal
          title="Update Product"
          icon={PencilIcon}
          onClose={handleClose}
          data={data}
          onClick={handleSubmit}
          categories={categories}
        />
      )}
    </>
  );
});

export default UpdateProductButton;
