"use client";
import { deleteClient } from "@/app/Features/clients/api/clientApi";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { TrashIcon } from "@heroicons/react/24/solid";
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
      className="px-4 py-2"
      color=""
      hoverColor="hover:opacity-80"
      text=""
      icon={TrashIcon}
      onClick={handleDelete}
    />
  );
});

export default DeleteClientButton;
