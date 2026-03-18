"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState, useCallback } from "react";
import ProductModal from "../Modal/ProductModal";
import { updateProduct } from "@/app/Features/Products/api/productApi";
import { useProductStore } from "@/app/Features/Products/store/product";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";
import { toast } from "@/app/store/useToastStore";

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
      const success = await updateProduct(updatedData);
      if (success) {
        useProductStore.getState().recordUpdate({ ...data, ...formData });
        toast.success("تم تعديل المنتج بنجاح");
        setOpen(false);
      } else {
        toast.error("حدث خطأ أثناء تعديل المنتج");
      }
    },
    [data],
  );

  return (
    <>
      <CustomButton
        onClick={handleOpen}
        text=""
        hoverColor=""
        hoverTextColor="text-white"
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-blue-500/80 transition-all duration-200"
        icon={PencilSquareIcon}
      />
      {open && (
        <ProductModal
          title="Update Product"
          icon={PencilSquareIcon}
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
