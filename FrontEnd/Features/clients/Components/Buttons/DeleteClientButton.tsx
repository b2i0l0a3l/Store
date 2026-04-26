"use client";
import { deleteClient } from "@/Features/clients/api/clientApi";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback, useState } from "react";
import { useClientStore } from "@/Features/clients/store/client";
import { toast } from "@/store/useToastStore";
import ConfirmDeleteModal from "@/components/Ui/Modal/ConfirmDeleteModal";

const DeleteClientButton = memo(function DeleteClientButton({
  dataId,
}: {
  dataId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const recordDelete = useClientStore((state) => state.recordDelete);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    const res = await deleteClient({ id: dataId });
    setIsDeleting(false);
    setIsModalOpen(false);

    if (res.succeeded) {
      recordDelete(dataId);
      toast.success(res.message || "تم حذف العميل بنجاح");
    } else {
      toast.error(res.message || "حدث خطأ أثناء الحذف");
    }
  }, [dataId, recordDelete]);

  return (
    <>
      <CustomButton
        onClick={handleDeleteClick}
        text=""
        hoverColor=""
        hoverTextColor="text-white"
        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/80 transition-all duration-200"
        icon={TrashIcon}
      />
      {isModalOpen && (
        <ConfirmDeleteModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
          title="حذف العميل"
          message="هل أنت متأكد من أنك تريد حذف هذا العميل؟ لا يمكن التراجع عن هذا الإجراء."
        />
      )}
    </>
  );
});

export default DeleteClientButton;
