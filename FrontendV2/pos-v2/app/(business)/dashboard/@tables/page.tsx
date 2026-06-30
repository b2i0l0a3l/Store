import TopSellingProducts from "@/features/Dashboard/components/TopSellingProducts";
import LowStockAlerts from "@/features/Dashboard/components/LowStockAlerts";
import ClientRanking from "@/features/Dashboard/components/ClientRanking";

export default function TablesSlot() {
  return (
    <div className="space-y-4">
      <TopSellingProducts />
      <LowStockAlerts />
      <ClientRanking />
    </div>
  );
}
