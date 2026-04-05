import { useCallback, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { category } from "@/app/Features/Categories/types";
import { toast } from "@/app/store/useToastStore";

export default function CategoryModal({
  title,
  icon,
  data,
  onClose,
  onClick,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  data?: category;
  onClose: () => void;
  onClick: (name: string) => void;
}) {
  const [name, setName] = useState(data?.name || "");
  const [loading,setLoading]=useState(false)
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await onClick(name);
    } finally {
      setLoading(false);
    }
  }, [onClick, name]);

  return (
    <CustomModal title={title} icon={icon} onClose={onClose}>
      <input
        onChange={handleNameChange}
        value={name}
        type="text"
        placeholder="Category Name"
        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
      />
      <div className="flex justify-end mt-4">
        <button
          disabled={loading}
          onClick={handleSubmit}
          type="button"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </CustomModal>
  );
}
