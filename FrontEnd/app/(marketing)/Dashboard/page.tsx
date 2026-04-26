import { Suspense } from "react";
import SummaryCards from "../../../Features/Dashboard/components/SummaryCards";
import SalesChart from "../../../Features/Dashboard/components/SalesChart";
import LowStockAlertsTable from "../../../Features/Dashboard/components/LowStockAlertsTable";
import TopSellingProductsList from "../../../Features/Dashboard/components/TopSellingProductsList";
import RecentActivitiesFeed from "../../../Features/Dashboard/components/RecentActivitiesFeed";
import CashVsDebtWidget from "../../../Features/Dashboard/components/CashVsDebtWidget";
import TopClientList from "../../../Features/Dashboard/components/TopClientList";
import UsersManagementTable from "../../../Features/Dashboard/components/UsersManagementTable";
import Loading from "../../../components/Ui/Loading/Loading";
import { CurrentUser } from "../../../util/currentUser";
import DashboardLiveRefresher from "../../../Features/Dashboard/components/DashboardLiveRefresher";

import {
  fetchDashboardSummary,
  fetchSalesOverTime,
  fetchLowStockAlerts,
  fetchTopSellingProducts,
  fetchRecentActivities,
  fetchCashVsDebtRatio,
  fetchClientRanking,
  fetchUsers,
} from "../../../Features/Dashboard/api/dashboardActions";

export const dynamic = "force-dynamic";

function CardSkeleton({ heightClass = "h-[400px]" }) {
  return (
    <div
      className={`w-full ${heightClass} bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center animate-pulse`}
    >
      <Loading />
    </div>
  );
}

async function SummaryCardsSection() {
  const data = await fetchDashboardSummary();
  return data ? <SummaryCards data={data} /> : null;
}

async function SalesChartSection() {
  const data = await fetchSalesOverTime(30);
  return <SalesChart data={data} />;
}

async function CashVsDebtSection() {
  const data = await fetchCashVsDebtRatio();
  return <CashVsDebtWidget data={data} />;
}

async function LowStockSection() {
  const data = await fetchLowStockAlerts();
  return <LowStockAlertsTable data={data} />;
}

async function TopSellingSection() {
  const data = await fetchTopSellingProducts();
  return <TopSellingProductsList data={data} />;
}

async function TopClientSection() {
  const data = await fetchClientRanking();
  return <TopClientList data={data} />;
}

async function RecentActivitiesSection() {
  const data = await fetchRecentActivities();
  return <RecentActivitiesFeed data={data} />;
}

async function UsersManagementSection() {
  const data = await fetchUsers();
  const currentUser = await CurrentUser();

  return (
    <UsersManagementTable
      initialUsers={data}
      currentUserId={currentUser?.userId}
    />
  );
}

export default async function DashboardPage() {
  const currentUser = await CurrentUser();
  const isAdmin = currentUser?.role === "Admin";

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <DashboardLiveRefresher />
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-400">
          Welcome back. Here is what&apos;s happening with your store today.
        </p>
      </div>

      <Suspense fallback={<CardSkeleton heightClass="h-32" />}>
        <SummaryCardsSection />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<CardSkeleton />}>
            <SalesChartSection />
          </Suspense>
        </div>
        <div className="lg:col-span-1">
          <Suspense fallback={<CardSkeleton />}>
            <CashVsDebtSection />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 h-[400px]">
          <Suspense fallback={<CardSkeleton />}>
            <LowStockSection />
          </Suspense>
        </div>
        <div className="lg:col-span-1 h-[400px]">
          <Suspense fallback={<CardSkeleton />}>
            <TopSellingSection />
          </Suspense>
        </div>
        <div className="lg:col-span-1 h-[400px]">
          <Suspense fallback={<CardSkeleton />}>
            <TopClientSection />
          </Suspense>
        </div>
        <div className="lg:col-span-1 h-[400px]">
          <Suspense fallback={<CardSkeleton />}>
            <RecentActivitiesSection />
          </Suspense>
        </div>
      </div>

      {isAdmin && (
        <div className="pb-12">
          <Suspense fallback={<CardSkeleton />}>
            <UsersManagementSection />
          </Suspense>
        </div>
      )}
    </div>
  );
}
