"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";
import CategoryModal from "../Modal/CategoryModal";
import { addCategory } from "@/app/Features/Categories/api/categoryApi";
import { useCategoryStore } from "@/app/Features/Categories/store/category";
import { toast } from "@/app/store/useToastStore";

export default function AddCategoryButton() {
  const [openModal, setOpenModal] = useState(false);
  const recordAdd = useCategoryStore((state) => state.recordAdd);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleSubmit = useCallback(async (name: string) => {
    const addedCategory = await addCategory({ name });
    if (addedCategory) {
      recordAdd(addedCategory);
      toast.success("تمت إضافة التصنيف بنجاح");
      setOpenModal(false);
    } else {
      toast.error("حدث خطأ أثناء إضافة التصنيف");
    }
  }, [recordAdd]);

  return (
    <>
      <CustomButton
        className="px-4 py-2 shadow-md shadow-blue-500/20"
        color="bg-linear-to-r from-blue-600 to-cyan-600"
        hoverColor="hover:from-blue-700 hover:to-cyan-700 hover:shadow-cyan-500/40"
        text="Add Category"
        icon={PlusIcon}
        onClick={handleOpen}
      />
      {openModal && (
        <CategoryModal
          title="Add Category"
          icon={PlusIcon}
          onClose={handleClose}
          onClick={handleSubmit}
        />
      )}
    </>
  );
}
