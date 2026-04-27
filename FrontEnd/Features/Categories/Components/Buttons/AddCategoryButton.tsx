"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";
import CategoryModal from "../Modal/CategoryModal";
import { addCategory } from "@/Features/Categories/api/categoryApi";
import { useCategoryStore } from "@/Features/Categories/store/category";
import { toast } from "@/store/useToastStore";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

export default function AddCategoryButton() {
  const [openModal, setOpenModal] = useState(false);
  const recordAdd = useCategoryStore((state) => state.recordAdd);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleSubmit = useCallback(
    async (name: string) => {
      await executeOfflineMutation({
        type: 'ADD_CATEGORY',
        payload: { name },
        apiCall: addCategory,
        localDbUpdate: async () => {
          // Optimistically add to local DB if offline. ID will be random/temporary.
          if (!navigator.onLine) {
            const tempId = Date.now();
            await db.categories.add({ id: tempId, name, totalCount: 0 });
            recordAdd({ id: tempId, name, totalCount: 0 });
          }
        },
        onSuccess: (data) => {
          if (data) recordAdd(data);
          setOpenModal(false);
        }
      });
    },
    [recordAdd],
  );

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
