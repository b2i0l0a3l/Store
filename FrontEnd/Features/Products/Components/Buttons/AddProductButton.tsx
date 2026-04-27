"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";
import ProductModal from "../Modal/ProductModal";
import { addProduct } from "@/Features/Products/api/productApi";
import { category } from "@/Features/Categories/types";
import { useProductStore } from "@/Features/Products/store/product";
import { product } from "../../types";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

export default function AddProductButton({
  categories,
}: {
  categories: category[];
}) {
  const [openModal, setOpenModal] = useState(false);
  const recordAdd = useProductStore((state) => state.recordAdd);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleSubmit = useCallback(
    async (payload: FormData, formData: product) => {
      if (!navigator.onLine) {
        // Serialize FormData to a plain object for IndexedDB
        const serialized: Record<string, any> = {};
        payload.forEach((value, key) => {
          if (value instanceof File) {
            // We skip the image for offline — it will be re-uploaded on sync
          } else {
            serialized[key] = value;
          }
        });
        await db.syncQueue.add({
          type: 'ADD_PRODUCT',
          payload: serialized,
          createdAt: new Date(),
          status: 'pending'
        });
        // Add to local DB for instant feedback
        await db.products.add(formData);
        recordAdd(formData);
        setOpenModal(false);
        return;
      }

      const res = await addProduct(payload);
      if (res.succeeded) {
        recordAdd(formData);
        setOpenModal(false);
      }
    },
    [recordAdd],
  );

  return (
    <>
      <CustomButton
        className="px-4 py-2 shadow-md shadow-blue-500/20"
        color="bg-linear-to-r from-blue-600 to-cyan-600"
        hoverColor="hover:from-blue-700 hover:to-cyan-700 hover:shadow-cyan-500/40"
        text="Add Product"
        icon={PlusIcon}
        onClick={handleOpen}
      />
      {openModal && (
        <ProductModal
          title="Add Product"
          icon={PlusIcon}
          onClose={handleClose}
          onClick={handleSubmit}
          categories={categories}
        />
      )}
    </>
  );
}
