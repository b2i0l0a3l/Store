"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";
import ProductModal from "../Modal/ProductModal";
import { addProduct } from "@/app/Features/Products/api/productApi";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";
import { useProductStore } from "@/app/Features/Products/store/product";

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
    async (payload: any, formData: any) => {
      const newProduct = await addProduct(payload);
      if (newProduct) {
        recordAdd(formData);
      }
      setOpenModal(false);
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
