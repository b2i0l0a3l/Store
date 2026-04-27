"use client";
import { deleteClient } from "@/Features/clients/api/clientApi";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback, useState } from "react";
import { useClientStore } from "@/Features/clients/store/client";
import { toast } from "@/store/useToastStore";
import ConfirmDeleteModal from "@/components/Ui/Modal/ConfirmDeleteModal";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

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
    await executeOfflineMutation({
      type: 'DELETE_CLIENT',
      payload: { id: dataId },
      apiCall: () => deleteClient({ id: dataId }),
      localDbUpdate: async () => {
        await db.clients.delete(dataId);
      },
      onSuccess: () => {
        recordDelete(dataId);
      }
    });
    setIsDeleting(false);
    setIsModalOpen(false);
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
