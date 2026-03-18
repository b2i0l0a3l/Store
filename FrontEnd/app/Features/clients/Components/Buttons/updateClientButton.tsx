"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState, useCallback } from "react";
import ClientModal from "../Modal/clientModal";
import { updateClient } from "@/app/Features/clients/api/clientApi";
import { useClientStore } from "@/app/Features/clients/store/client";
import { toast } from "@/app/store/useToastStore";

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
      const success = await updateClient({ id: data.id, name, phoneNumber });
      if (success) {
        useClientStore
          .getState()
          .recordUpdate({ id: data.id, name, phoneNumber });
        toast.success("تم تعديل بيانات العميل بنجاح");
        setOpen(false);
      } else {
        toast.error("حدث خطأ أثناء التعديل");
      }
    },
    [data.id],
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
