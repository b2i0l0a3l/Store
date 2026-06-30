import Container from "@/components/layout/container";
import { DashboardLiveSync } from "./DashboardLiveSync";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  getDashboardSummary,
  getClientRanking,
  getLowStockAlerts,
  getTopSellingProducts,
  getSalesOverTime,
  getRecentActivities,
  getCashVsDebtRatio,
} from "@/features/Dashboard/actions";

export default async function DashboardLayout({
  summary,
  charts,
  tables,
  activity,
}: {
  summary: React.ReactNode;
  charts: React.ReactNode;
  tables: React.ReactNode;
  activity: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["dashboard-summary"],
      queryFn: async () => {
        const r = await getDashboardSummary();
        if (!r.isSuccess) throw new Error(r.message);
        return r.value;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard-client-ranking"],
      queryFn: async () => {
        const r = await getClientRanking();
        if (!r.isSuccess) throw new Error(r.message);
        return r.value;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard-low-stock-alerts"],
      queryFn: async () => {
        const r = await getLowStockAlerts();
        if (!r.isSuccess) throw new Error(r.message);
        return r.value;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard-top-selling-products"],
      queryFn: async () => {
        const r = await getTopSellingProducts();
        if (!r.isSuccess) throw new Error(r.message);
        return r.value;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard-sales-over-time", 7],
      queryFn: async () => {
        const r = await getSalesOverTime(7);
        if (!r.isSuccess) throw new Error(r.message);
        return r.value;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard-recent-activities"],
      queryFn: async () => {
        const r = await getRecentActivities();
        if (!r.isSuccess) throw new Error(r.message);
        return r.value;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["dashboard-cash-vs-debt-ratio"],
      queryFn: async () => {
        const r = await getCashVsDebtRatio();
        if (!r.isSuccess) throw new Error(r.message);
        return r.value;
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardLiveSync />
      <div className="w-full min-h-[calc(100vh-56px)] bg-zinc-50/50 dark:bg-zinc-950/20">
        <Container className="py-4 space-y-4">
          {summary}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">{charts}</div>
            <div className="lg:col-span-1">{tables}</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activity}
          </div>
        </Container>
      </div>
    </HydrationBoundary>
  );
}
