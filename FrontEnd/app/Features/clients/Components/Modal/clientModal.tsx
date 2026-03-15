import { useCallback, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { client } from "@/app/Features/clients/types";

export default function ClientModal({
  title,
  icon,
  data,
  onClose,
  onClick,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  data?: client;
  onClose: () => void;
  onClick: (name: string, phone: string) => void;
}) {
  const [name, setName] = useState(data?.name || "");
  const [phone, setPhone] = useState(data?.phoneNumber || "");

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    onClick(name, phone);
  }, [onClick, name, phone]);

  return (
    <CustomModal title={title} icon={icon} onClose={onClose}>
      <input
        onChange={handleNameChange}
        value={name}
        type="text"
        placeholder="Client Name"
        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
      />
      <input
        onChange={handlePhoneChange}
        value={phone}
        type="text"
        placeholder="Client Phone"
        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          type="button"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>
    </CustomModal>
  );
}
