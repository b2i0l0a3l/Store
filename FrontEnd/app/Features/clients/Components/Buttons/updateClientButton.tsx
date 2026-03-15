"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PencilIcon } from "@heroicons/react/24/solid";
import { memo, useState, useCallback } from "react";
import ClientModal from "../Modal/clientModal";
import { updateClient } from "@/app/Features/clients/api/clientApi";
import { useClientStore } from "@/app/Features/clients/store/client";

const UpdateClientButton = memo(function UpdateClientButton({
  data,
}: {
  data: any;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSubmit = useCallback(
    async (name: string, phoneNumber: string) => {
      await updateClient({ id: data.id, name, phoneNumber });
      useClientStore
        .getState()
        .recordUpdate({ id: data.id, name, phoneNumber });
      setOpen(false);
    },
    [data.id],
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
        <ClientModal
          title="Update Client"
          icon={PencilIcon}
          onClose={handleClose}
          data={data}
          onClick={handleSubmit}
        />
      )}
    </>
  );
});

export default UpdateClientButton;
