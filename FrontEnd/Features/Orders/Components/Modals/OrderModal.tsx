import { useCallback, useEffect, useState } from "react";
import CustomModal from "@/components/Ui/Modal/Modal";
import OrderItemTable from "../../OrderItem/Components/Table/OrderItemTable";
import { getOrderItems } from "../../api/orderApi";
import { OrderItem } from "../../OrderItem/types";
import { toast } from "@/store/useToastStore";
import { db } from "@/util/db";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setLoading(true);
        if (!navigator.onLine) {
          // Read from local DB
          const localItems = await db.orderItems.where('orderId').equals(OrderId).toArray();
          setOrderItems(localItems);
        } else {
          // Fetch from API
          const orderItemsData = await getOrderItems(OrderId);
          if (orderItemsData) {
            setOrderItems(orderItemsData);
            // Save to local DB for offline access
            // Delete old items for this order first
            const existingIds = await db.orderItems.where('orderId').equals(OrderId).primaryKeys();
            await db.orderItems.bulkDelete(existingIds);
            await db.orderItems.bulkAdd(orderItemsData);
          } else {
            setOrderItems([]);
          }
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء تحميل عناصر الطلب");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderItems();
  }, [OrderId]);

  return (
    <CustomModal
      title={title}
      icon={icon}
      onClose={onClose}
      className="max-w-4xl!"
    >
      <div className="flex flex-col gap-6 w-full mt-2">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/20">
          {loading ? (
            <div className="p-8 text-center text-slate-400 animate-pulse font-medium">
              جاري تحميل العناصر...
            </div>
          ) : orderItems && orderItems.length > 0 ? (
            <OrderItemTable data={orderItems} orderId={OrderId} />
          ) : (
            <div className="p-8 text-center text-slate-400 animate-pulse font-medium">
              لا توجد عناصر للطلب
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
}
