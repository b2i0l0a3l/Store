"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState, useCallback } from "react";
import ProductModal from "../Modal/ProductModal";
import { updateProduct } from "@/Features/Products/api/productApi";
import { useProductStore } from "@/Features/Products/store/product";
import { category } from "@/Features/Categories/types";
import { product } from "@/Features/Products/types";
import { toast } from "@/store/useToastStore";

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
      const res = await updateProduct(payload);
      if (res.succeeded) {
        useProductStore.getState().recordUpdate({ ...data, ...formData });
        toast.success(res.message || "تم تعديل المنتج بنجاح");
        setOpen(false);
      } else {
        toast.error(res.message || "حدث خطأ أثناء تعديل المنتج");
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
