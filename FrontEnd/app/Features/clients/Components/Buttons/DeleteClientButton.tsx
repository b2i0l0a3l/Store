"use client";
import { deleteClient } from "@/app/Features/clients/api/clientApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { memo, useCallback } from "react";
import { useClientStore } from "@/app/Features/clients/store/client";

const DeleteClientButton = memo(function DeleteClientButton({
  dataId,
}: {
  dataId: number;
}) {
  const handleDelete = useCallback(async () => {
    await deleteClient({ id: dataId });
    useClientStore.getState().recordDelete(dataId);
  }, [dataId]);

  return (
    <CustomButton
      onClick={handleDelete}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/80 transition-all duration-200"
      icon={TrashIcon}
    />
  );
});

export default DeleteClientButton;
