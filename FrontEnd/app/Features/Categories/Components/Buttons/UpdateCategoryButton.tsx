"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PencilIcon } from "@heroicons/react/24/solid";
import { memo, useState, useCallback } from "react";
import CategoryModal from "../Modal/CategoryModal";
import { updateCategory } from "@/app/Features/Categories/api/categoryApi";
import { useCategoryStore } from "@/app/Features/Categories/store/category";

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
      await updateCategory({ id: data.id, name });
      useCategoryStore
        .getState()
        .recordUpdate({ id: data.id, name, totalCount: data.totalCount });
      setOpen(false);
    },
    [data.id, data.totalCount],
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
        <CategoryModal
          title="Update Category"
          icon={PencilIcon}
          onClose={handleClose}
          data={data}
          onClick={handleSubmit}
        />
      )}
    </>
  );
});

export default UpdateCategoryButton;
