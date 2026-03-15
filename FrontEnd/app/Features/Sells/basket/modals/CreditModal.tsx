"use client";
import CustomComboBox from "@/app/components/Ui/inputs/CustomComboBox";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useClientStore } from "@/app/Features/clients/store/client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { CartItem, useStore } from "../../store/store";
import { buy } from "@/app/Features/Orders/api/orderApi";
import { useProductStore } from "@/app/Features/Products/store/product";

function CreditModal({cart ,onClose}: { cart: CartItem[]; onClose: () => void}) {
  
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{
      value: string | number;
      label: string;
    } | null>(null);
    const recordSale = useProductStore((state) => state.recordSale);
    const clearCart = useStore((state) => state.clearCart);


  const request = useMemo(
        () => ({
          request: {
            orderType: 1,
            client_id: selectedClient?.value,
            items: cart.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        }),
        [cart,selectedClient],
      );


  const handleBuy = useCallback(async () => {
          try {
            setLoading(true);
            if (!cart) return;
            await buy(request);
            recordSale(
              cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            );
            clearCart();
    
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
            onClose();
          }
        }, [request, clearCart, recordSale]);

  
  const clients = useClientStore((state) => state.clients);
  const fetchClients = useClientStore((state) => state.fetchClients);
   useEffect(() => {
     fetchClients();
  }, [fetchClients]);

  
   

  const clientOptions = useMemo(
    () => Object.values(clients).map((c) => ({ value: c.id, label: c.name })),
    [clients],
  );
    
  return (
    <CustomModal title="Credit" icon={CurrencyDollarIcon} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-300" htmlFor="client">Client</label>
        <CustomComboBox
          options={clientOptions}
          placeholder="Select customer" 
          value={selectedClient}
          onChange={setSelectedClient}          
        />
      </div>
      <div className="flex flex-col gap-2">
        
        <CustomButton 
        text={loading ? "Loading..." : "Add"}
        icon={CurrencyDollarIcon}
        onClick={handleBuy}
        className="bg-linear-to-r from-red-500 to-pink-500"
        disabled={loading}
        />
      </div>
    </CustomModal>
  );
}

export default memo(CreditModal);
