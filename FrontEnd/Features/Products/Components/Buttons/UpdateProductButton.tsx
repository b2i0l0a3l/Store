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
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

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
      if (!navigator.onLine) {
        // Serialize FormData to a plain object for IndexedDB
        const serialized: Record<string, any> = {};
        payload.forEach((value: any, key: string) => {
          if (value instanceof File) {
            // We skip the image for offline — it will be re-uploaded on sync
          } else {
            serialized[key] = value;
          }
        });
        await db.syncQueue.add({
          type: 'UPDATE_PRODUCT',
          payload: serialized,
          createdAt: new Date(),
          status: 'pending'
        });
        
        await db.products.update(data.id, formData);
        useProductStore.getState().recordUpdate({ ...data, ...formData });
        toast.success("Saved offline. Will sync when online.");
        setOpen(false);
        return;
      }

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
