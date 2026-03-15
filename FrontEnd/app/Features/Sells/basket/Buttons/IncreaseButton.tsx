import { memo } from "react";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useStore } from "@/app/Features/Sells/store/store";

const IncreaseButton = memo(({ item }: { item: any }) => {
  const updateQuantity = useStore((state: any) => state.updateQuantity);
  const className =
    "p-1.5 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors";
  return (
    <CustomButton
      icon={PlusIcon}
      text=""
      className={className}
      onClick={() => updateQuantity(item.productId, (item.quantity || 1) + 1)}
    />
  );
});
export default IncreaseButton;
