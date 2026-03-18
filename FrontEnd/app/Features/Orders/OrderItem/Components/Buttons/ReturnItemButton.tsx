import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";

export default function ReturnItemButton({ itemId }: { itemId: number }) {
  return (
    <CustomButton
      onClick={() => {
        // TODO: Handle item return
        console.log("Return item", itemId);
      }}
      text=""
      hoverColor=""
      hoverTextColor="text-white"
      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-amber-500/80 transition-all duration-200"
      icon={ArrowUturnLeftIcon}
    />
  );
}
