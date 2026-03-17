import { useCallback, useEffect, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { order } from "@/app/Features/Orders/types";
import OrderItemTable from "../../OrderItem/Components/Table/OrderItemTable";
import { getOrderItems } from "../../api/orderApi";
import { OrderItem } from "../../OrderItem/types";

export default function OrderModal({
  title,
  icon,
  OrderId,
  onClose,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  OrderId: number;
  onClose: () => void;
}) {
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>(null);
  useEffect(() => {
    const fetchOrderItems = async () => {
      const orderItems = await getOrderItems(OrderId);
      setOrderItems(orderItems);
    };
    fetchOrderItems();
  }, [OrderId]);

  return (
    <CustomModal
      title={title}
      icon={icon}
      onClose={onClose}
    >
      <div className="flex flex-col gap-6 w-full mt-2">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/20">
          {orderItems === null ? (
            <div className="p-8 text-center text-slate-400 animate-pulse font-medium">
              جاري تحميل العناصر...
            </div>
          ) : (
            <OrderItemTable data={orderItems} />
          )}
        </div>
      </div>
    </CustomModal>
  );
}
