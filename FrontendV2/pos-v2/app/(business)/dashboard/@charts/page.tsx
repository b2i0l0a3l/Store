import SalesOverTimeChart from "@/features/Dashboard/components/SalesOverTimeChart";
import CashVsDebtRatio from "@/features/Dashboard/components/CashVsDebtRatio";

export default function ChartsSlot() {
  return (
    <>
      <SalesOverTimeChart />
      <div className="mt-4">
        <CashVsDebtRatio />
      </div>
    </>
  );
}
