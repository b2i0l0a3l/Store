import { TrashIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { useOrderItemStore } from "../../store/orderItem";

export default function DeleteItemButton({ itemId }: { itemId: number }) {
  return (
    <CustomButton
      onClick={() => {
        // TODO: Handle item delete API call
        console.log("Delete item", itemId);
        useOrderItemStore.getState().recordDelete(itemId);
      }}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/80 transition-all duration-200"
      icon={TrashIcon}
    />
  );
}
