import OrderSection from "@/app/Features/Orders/Components/OrderSection";
import { getOrders } from "@/app/Features/Orders/api/orderApi";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const Orders = await getOrders();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <OrderSection data={Orders} />
    </div>
  );
}
