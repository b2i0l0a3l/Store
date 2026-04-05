import { useCallback, useEffect, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import OrderItemTable from "../../OrderItem/Components/Table/OrderItemTable";
import { getOrderItems } from "../../api/orderApi";
import { OrderItem } from "../../OrderItem/types";
import { toast } from "@/app/store/useToastStore";

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
      try{
        setLoading(true);
        const orderItems = await getOrderItems(OrderId);
        setOrderItems(orderItems);
      }catch(error){
        toast.error("حدث خطأ أثناء تحميل عناصر الطلب");
      }finally{
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
