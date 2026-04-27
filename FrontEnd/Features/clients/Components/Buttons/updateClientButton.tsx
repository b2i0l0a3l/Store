"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState, useCallback } from "react";
import ClientModal from "../Modal/clientModal";
import { updateClient } from "@/Features/clients/api/clientApi";
import { useClientStore } from "@/Features/clients/store/client";
import { toast } from "@/store/useToastStore";
import { client } from "../../types";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

const UpdateClientButton = memo(function UpdateClientButton({
  data,
}: {
  data: any;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const recordUpdate = useClientStore((state) => state.recordUpdate);

  const handleSubmit = useCallback(
    async (
      name: string,
      phoneNumber: string,
      address: string,
    ): Promise<client | null> => {
      await executeOfflineMutation({
        type: 'UPDATE_CLIENT',
        payload: { id: data.id, name, phoneNumber, address },
        apiCall: updateClient,
        localDbUpdate: async () => {
          await db.clients.update(data.id, { name, phoneNumber, address });
        },
        onSuccess: () => {
          recordUpdate({ id: data.id, name, phoneNumber, address });
          setOpen(false);
        }
      });
      return null;
    },
    [data.id, recordUpdate],
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
        <ClientModal
          title="Update Client"
          icon={PencilSquareIcon}
          onClose={handleClose}
          data={data}
          onClick={handleSubmit}
        />
      )}
    </>
  );
});

export default UpdateClientButton;
