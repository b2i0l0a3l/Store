"use client";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";
import ClientModal from "../Modal/clientModal";
import { addClient } from "@/Features/clients/api/clientApi";
import { toast } from "@/store/useToastStore";
import { client } from "../../types";
import { useClientStore } from "@/Features/clients/store/client";
import { executeOfflineMutation } from "@/app/hooks/useOfflineMutation";
import { db } from "@/util/db";

export default function AddClientButton() {
  const [openModal, setOpenModal] = useState(false);
  const recordAdd = useClientStore((state) => state.recordAdd);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleSubmit = useCallback(
    async (
      name: string,
      phoneNumber: string,
      address: string,
    ): Promise<client | null> => {
      await executeOfflineMutation({
        type: 'ADD_CLIENT',
        payload: { name, phoneNumber, address },
        apiCall: addClient,
        localDbUpdate: async () => {
          if (!navigator.onLine) {
            const tempId = Date.now();
            await db.clients.add({ id: tempId, name, phoneNumber, address });
            recordAdd({ id: tempId, name, phoneNumber, address });
          }
        },
        onSuccess: (data) => {
          if (data) recordAdd(data);
          setOpenModal(false);
        }
      });
      return null;
    },
    [recordAdd],
  );

  return (
    <>
      <CustomButton
        className="px-4 py-2 shadow-md shadow-blue-500/20"
        color="bg-linear-to-r from-blue-600 to-cyan-600"
        hoverColor="hover:from-blue-700 hover:to-cyan-700 hover:shadow-cyan-500/40"
        text="Add Client"
        icon={PlusIcon}
        onClick={handleOpen}
      />
      {openModal && (
        <ClientModal
          title="Add Client"
          icon={PlusIcon}
          onClose={handleClose}
          onClick={handleSubmit}
        />
      )}
    </>
  );
}
