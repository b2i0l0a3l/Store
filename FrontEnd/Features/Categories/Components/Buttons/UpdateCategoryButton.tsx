"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState, useCallback } from "react";
import CategoryModal from "../Modal/CategoryModal";
import { updateCategory } from "@/Features/Categories/api/categoryApi";
import { useCategoryStore } from "@/Features/Categories/store/category";
import { toast } from "@/store/useToastStore";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

const UpdateCategoryButton = memo(function UpdateCategoryButton({
  data,
}: {
  data: any;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSubmit = useCallback(
    async (name: string) => {
      await executeOfflineMutation({
        type: 'UPDATE_CATEGORY',
        payload: { id: data.id, name },
        apiCall: updateCategory,
        localDbUpdate: async () => {
          await db.categories.update(data.id, { name });
        },
        onSuccess: () => {
          useCategoryStore
            .getState()
            .recordUpdate({ id: data.id, name, totalCount: data.totalCount });
          setOpen(false);
        }
      });
    },
    [data.id, data.totalCount],
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
        <CategoryModal
          title="Update Category"
          icon={PencilSquareIcon}
          onClose={handleClose}
          data={data}
          onClick={handleSubmit}
        />
      )}
    </>
  );
});

export default UpdateCategoryButton;
