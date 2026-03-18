import { PencilSquareIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";

export default function UpdateItemButton({ itemId }: { itemId: number }) {
  return (
    <CustomButton
      onClick={() => {
        // TODO: Handle item update
        console.log("Update item", itemId);
      }}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-blue-500/80 transition-all duration-200"
      icon={PencilSquareIcon}
    />
  );
}
