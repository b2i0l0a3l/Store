import OrderSection from "@/app/Features/Orders/Components/OrderSection";
import { getOrders } from "@/app/Features/Orders/api/orderApi";
import Loading from "@/app/components/Ui/Loading/Loading";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const Orders = await getOrders();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <Suspense fallback={<Loading />}>
        <OrderSection data={Orders} />
      </Suspense>
    </div>
  );
}
