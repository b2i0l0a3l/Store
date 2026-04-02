import React, { Suspense } from "react";
import SummaryCards from "../../Features/Dashboard/components/SummaryCards";
import SalesChart from "../../Features/Dashboard/components/SalesChart";
import LowStockAlertsTable from "../../Features/Dashboard/components/LowStockAlertsTable";
import TopSellingProductsList from "../../Features/Dashboard/components/TopSellingProductsList";
import RecentActivitiesFeed from "../../Features/Dashboard/components/RecentActivitiesFeed";
import CashVsDebtWidget from "../../Features/Dashboard/components/CashVsDebtWidget";
import TopClientList from "../../Features/Dashboard/components/TopClientList";
import Loading from "../../components/Ui/Loading/Loading";

import {
  fetchDashboardSummary,
  fetchSalesOverTime,
  fetchLowStockAlerts,
  fetchTopSellingProducts,
  fetchRecentActivities,
  fetchCashVsDebtRatio,
  fetchClientRanking
} from "../../Features/Dashboard/api/dashboardActions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch data concurrently for fast rendering
  const [
    summary,
    sales,
    lowStock,
    topSelling,
    recent,
    cashVsDebt,
    clientRanking
  ] = await Promise.all([
    fetchDashboardSummary(),
    fetchSalesOverTime(30),
    fetchLowStockAlerts(),
    fetchTopSellingProducts(),
    fetchRecentActivities(),
    fetchCashVsDebtRatio(),
    fetchClientRanking(),
  ]);

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-400">Welcome back. Here is what's happening with your store today.</p>
      </div>

      <Suspense fallback={<Loading />}>
        {/* Row 1: KPI Cards */}
        {summary && <SummaryCards data={summary} />}

        {/* Row 2: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart data={sales} />
          </div>
          <div className="lg:col-span-1">
            <CashVsDebtWidget data={cashVsDebt} />
          </div>
        </div>

        {/* Row 3: Lists & Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
          <div className="lg:col-span-1 h-[400px]">
            <LowStockAlertsTable data={lowStock} />
          </div>
          <div className="lg:col-span-1 h-[400px]">
            <TopSellingProductsList data={topSelling} />
          </div>
          <div className="lg:col-span-1 h-[400px]">
            <TopClientList data={clientRanking} />
          </div>
          <div className="lg:col-span-1 h-[400px]">
            <RecentActivitiesFeed data={recent} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
