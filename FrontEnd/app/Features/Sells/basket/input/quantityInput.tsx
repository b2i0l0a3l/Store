import { memo } from "react";
import { useStore } from "@/app/Features/Sells/store/store";

function QuantityInput({ item }: { item: any }) {
  const updateQuantity = useStore((state: any) => state.updateQuantity);
  return (
    <input
      type="number"
      min="1"
      value={item.quantity || 1}
      onChange={(e) =>
        updateQuantity(item.productId, parseInt(e.target.value) || 1)
      }
      className="w-10 text-center bg-transparent text-sm font-medium text-white focus:outline-none appearance-none"
    />
  );
}
export default memo(QuantityInput);
