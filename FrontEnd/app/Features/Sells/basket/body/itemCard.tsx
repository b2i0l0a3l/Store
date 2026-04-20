import { XMarkIcon } from "@heroicons/react/20/solid";

import { useStore, CartItem as item } from "@/app/Features/Sells/store/store";
import IncreaseButton from "../Buttons/IncreaseButton";
import DecreaseButton from "../Buttons/DecreaseButton";
import QuantityInput from "../input/quantityInput";

export default function ItemCard({ item, idx }: { item: item; idx: number }) {
  const removeFromCart = useStore((state: any) => state.removeFromCart);
  const updatePrice = useStore((state: any) => state.updatePrice);

  return (
    <div>
      <div
        key={`${item.productId}-${idx}`}
        className="group flex flex-col gap-3 p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/50 transition-all hover:border-slate-600 hover:shadow-lg hover:shadow-black/20"
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-500 mb-1">
              ID: {item.productId}
            </p>
            <h3 className="text-sm font-medium text-slate-200 line-clamp-2">
              {item.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm font-bold text-blue-400">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.price === 0 ? "" : item.price}
                onChange={(e) => updatePrice(item.productId, parseFloat(e.target.value) || 0)}
                className="w-20 bg-slate-900/50 text-sm font-bold text-blue-400 p-0.5 border border-slate-700/50 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.productId)}
            className="p-1.5 rounded-md text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            title="Remove item"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-700/50">
            <DecreaseButton item={item} />
            <QuantityInput item={item} />
            <IncreaseButton item={item} />
          </div>

          <span className="text-sm font-bold text-white">
            ${(item.price * (item.quantity || 1)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
