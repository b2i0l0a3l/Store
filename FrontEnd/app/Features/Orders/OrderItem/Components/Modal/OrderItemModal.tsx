import { useCallback, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { OrderItem } from "../../types";
import { updateOrderItem } from "../../Api/OrderItemApi";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { toast } from "@/app/store/useToastStore";

export default function OrderItemModal({
  setOpen,
  orderItem,
}: {
  setOpen: (open: boolean) => void;
  orderItem: OrderItem;
}) {
  const [formData, setFormData] = useState({
    quantity: orderItem.quantity,
    price: orderItem.price,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  }, []);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleSubmit = useCallback(async () => {
    const payload = {
      orderItemId: orderItem.id,
      quantity: formData.quantity,
      price: formData.price,
      productId: (orderItem as any).productId || 0,
      orderId: (orderItem as any).orderId || 0,
    };

    const success = await updateOrderItem(payload);

    if (success) {
      toast.success(
        "Item updated successfully (please refresh the page to view changes if necessary)",
      );
      setOpen(false);
    } else {
      toast.error("an error occurred while updating the item");
    }
  }, [formData, orderItem, setOpen]);

  return (
    <CustomModal
      title="Update Item Details"
      icon={PencilSquareIcon}
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
            Price
          </label>
          <input
            name="price"
            onChange={handleChange}
            value={formData.price || ""}
            type="number"
            placeholder="Price"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Quantity
          </label>
          <input
            name="quantity"
            onChange={handleChange}
            value={formData.quantity || ""}
            min={1}
            type="number"
            placeholder="Quantity"
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
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>
    </CustomModal>
  );
}
