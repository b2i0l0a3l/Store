"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";
import CategoryModal from "../Modal/CategoryModal";
import { addCategory } from "@/app/Features/Categories/api/categoryApi";

export default function AddCategoryButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleSubmit = useCallback(async (name: string) => {
    await addCategory({ name });
    setOpenModal(false);
  }, []);

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
