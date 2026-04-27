"use client";
import CustomComboBox from "@/components/Ui/inputs/CustomComboBox";
import CustomModal from "@/components/Ui/Modal/Modal";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import CustomButton from "@/components/Ui/buttons/CustomButton";
import { CartItem, useStore } from "../../store/store";
import { buy } from "@/Features/Orders/api/orderApi";
import { useProductStore } from "@/Features/Products/store/product";
import { getClients } from "@/Features/clients/api/clientApi";
import { client } from "@/Features/clients/types";
import { toast } from "@/store/useToastStore";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/util/db";

function CreditModal({
  cart,
  onClose,
}: {
  cart: CartItem[];
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{
    value: string | number;
    label: string;
  } | null>(null);
  const recordSale = useProductStore((state) => state.recordSale);
  const clearCart = useStore((state) => state.clearCart);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const request = useMemo(
    () => ({
      orderType: 1,
      clientId: selectedClient?.value,
      items: cart.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    }),
    [cart, selectedClient],
  );

  const handleBuy = useCallback(async () => {
    if (!selectedClient) {
      toast.error("الرجاء اختيار العميل");
      return;
    }
    try {
      setLoading(true);
      if (!cart) return;

      if (!navigator.onLine) {
        await db.syncQueue.add({
          type: 'CREDIT',
          payload: request,
          createdAt: new Date(),
          status: 'pending'
        });
        
        recordSale(
          cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        );
        clearCart();
        toast.success("Saved offline. Will sync when online.");
        return;
      }

      const res = await buy(request);
      if (res.succeeded) {
        recordSale(
          cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        );
        clearCart();
        toast.success(res.message || "تم تسجيل الدين بنجاح");
      } else {
        toast.error(res.message || "حدث خطأ أثناء تسجيل الدين");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تسجيل الدين");
    } finally {
      setLoading(false);
      onClose();
    }
  }, [request, clearCart, recordSale, selectedClient, cart, onClose]);

  const localClients = useLiveQuery(() => db.clients.toArray()) || [];
  const [serverClients, setServerClients] = useState<client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      if (navigator.onLine) {
        const data = await getClients();
        setServerClients(data);
      }
    };
    fetchClients();
  }, []);

  const clients = localClients.length > 0 ? localClients : serverClients;

  const clientOptions = useMemo(
    () => Object.values(clients).map((c) => ({ value: c.id, label: c.name })),
    [clients],
  );

  return (
    <CustomModal
      title="Credit Sale"
      icon={CurrencyDollarIcon}
      onClose={onClose}
    >
      {/* Cart Summary */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingCartIcon className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Cart Summary
          </span>
        </div>
        <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
          {cart.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-slate-300 truncate max-w-[60%]">
                {item.name}{" "}
                <span className="text-slate-500">×{item.quantity}</span>
              </span>
              <span className="text-slate-200 font-medium">
                {(item.price * item.quantity).toFixed(2)} د.ج
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-400">Total</span>
          <span className="text-lg font-bold text-emerald-400">
            {total.toFixed(2)} د.ج
          </span>
        </div>
      </div>

      {/* Client Selection */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-slate-400" />
          <label
            className="text-sm font-medium text-slate-300"
            htmlFor="client"
          >
            Select Client
          </label>
        </div>
        <CustomComboBox
          options={clientOptions}
          placeholder="Search for a client..."
          value={selectedClient}
          onChange={setSelectedClient}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <CustomButton
          text={loading ? "Processing..." : "Confirm Credit"}
          icon={CurrencyDollarIcon}
          onClick={handleBuy}
          className="w-full py-2.5 bg-linear-to-r from-amber-600 to-orange-500 shadow-lg shadow-amber-500/15"
          hoverColor="hover:from-amber-500 hover:to-orange-400"
          disabled={loading || !selectedClient}
        />
      </div>
    </CustomModal>
  );
}

export default memo(CreditModal);
