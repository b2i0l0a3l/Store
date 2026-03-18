import { TrashIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { useOrderStore } from "../../store/order";

export default function DeleteOrderButton({ id }: { id: number }) {
  return (
    <CustomButton
      onClick={() => {
        // useOrderStore.getState().recordDelete(id);
      }}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/80 transition-all duration-200"
      icon={TrashIcon}
    />
  );
}
