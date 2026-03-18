"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useCallback } from "react";
import ClientModal from "../Modal/clientModal";
import { addClient } from "@/app/Features/clients/api/clientApi";
import { toast } from "@/app/store/useToastStore";

export default function AddClientButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleSubmit = useCallback(
    async (name: string, phoneNumber: string) => {
      const success = await addClient({ name, phoneNumber });
      if (success) {
        toast.success("تمت إضافة العميل بنجاح");
        setOpenModal(false);
      } else {
        toast.error("حدث خطأ أثناء إضافة العميل");
      }
    },
    [],
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
