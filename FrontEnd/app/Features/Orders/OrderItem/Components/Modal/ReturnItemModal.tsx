import { useCallback, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { OrderItem } from "../../types";
import { returnOrderItems } from "@/app/Features/Return/Api/ReturnApi";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { toast } from "@/app/store/useToastStore";

export default function ReturnItemModal({
  setOpen,
  orderItem,
  orderId,
}: {
  setOpen: (open: boolean) => void;
  orderItem: OrderItem;
  orderId: number;
}) {
  const [quantity, setQuantity] = useState(1);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleSubmit = useCallback(async () => {
    if (quantity <= 0 || quantity > orderItem.quantity) {
      toast.error("كمية الارجاع غير صالحة");
      return;
    }

    const payload = {
        orderId: orderId || 0,
        items: [
          {
            productId: orderItem.productId || 0,
            quantity: quantity,
            price: orderItem.price,
            orderItemId: orderItem.id,
          },
        ],
    };

    const success = await returnOrderItems(payload);

    if (success) {
      toast.success(
        "Item returned successfully (please refresh the page to view changes if necessary)",
      );
      setOpen(false);
    } else {
      toast.error("An error occurred while returning the item");
    }
  }, [quantity, orderItem, setOpen]);

  return (
    <CustomModal
      title="Return Item Details"
      icon={ArrowUturnLeftIcon}
      onClose={handleClose}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Product Name (Read Only)
          </label>
          <input
            type="text"
            readOnly
            value={orderItem.productName}
            className="w-full px-4 py-2 bg-slate-900/30 border border-slate-700/50 rounded-lg text-slate-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Return Quantity (Max: {orderItem.quantity})
          </label>
          <input
            name="quantity"
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
            type="number"
            min={1}
            max={orderItem.quantity}
            placeholder="Quantity to return"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <button
          onClick={handleClose}
          type="button"
          className="px-4 py-2 rounded-lg bg-transparent text-slate-300 font-medium hover:bg-slate-800 transition-colors"
        >
          Close
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="px-5 py-2 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-500 transition-colors"
        >
          Confirm Return
        </button>
      </div>
    </CustomModal>
  );
}
