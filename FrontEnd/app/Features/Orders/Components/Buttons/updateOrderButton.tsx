import { PencilSquareIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { order } from "../../types";
import { useOrderStore } from "../../store/order";

export default function UpdateOrderButton({ order }: { order: order }) {
  return (
    <CustomButton
      onClick={() => {
        // TODO: Open update modal or handle API
        // useOrderStore.getState().recordUpdate(updatedOrder);
      }}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-blue-500/80 transition-all duration-200"
      icon={PencilSquareIcon}
    />
  );
}
