"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState, useCallback } from "react";
import CategoryModal from "../Modal/CategoryModal";
import { updateCategory } from "@/app/Features/Categories/api/categoryApi";
import { useCategoryStore } from "@/app/Features/Categories/store/category";
import { toast } from "@/app/store/useToastStore";

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
      const res = await updateCategory({ id: data.id, name });
      if (res.succeeded) {
        useCategoryStore
          .getState()
          .recordUpdate({ id: data.id, name, totalCount: data.totalCount });
        toast.success(res.message || "تم تعديل التصنيف بنجاح");
        setOpen(false);
      } else {
        toast.error(res.message || "حدث خطأ أثناء تعديل التصنيف");
      }
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
