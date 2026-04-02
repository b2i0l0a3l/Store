import { fetchApi } from "@/app/util/Api/Api";
import {
  DashboardSummary,
  LowStockAlert,
  TopSellingProduct,
  SalesOverTime,
  RecentActivities,
  CashVsDebtRatio,
  ClientRanking,
} from "../types";

export async function getDashboardSummary(): Promise<DashboardSummary | null> {
  const res = await fetchApi<DashboardSummary>(`/Dashboard/Summary`, { cache: "no-store" });
  return res.succeeded && res.value ? res.value : null;
}

export async function getClientRanking(): Promise<ClientRanking[]> {
  const res = await fetchApi<ClientRanking[]>(`/Dashboard/ClientRanking`, { cache: "no-store" });
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getLowStockAlerts(): Promise<LowStockAlert[]> {
  const res = await fetchApi<LowStockAlert[]>(`/Dashboard/LowStockAlerts`, { cache: "no-store" });
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getTopSellingProducts(): Promise<TopSellingProduct[]> {
  const res = await fetchApi<TopSellingProduct[]>(`/Dashboard/TopSellingProducts`, { cache: "no-store" });
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getSalesOverTime(days: number = 30): Promise<SalesOverTime[]> {
  const res = await fetchApi<SalesOverTime[]>(`/Dashboard/SalesOverTime?days=${days}`, { cache: "no-store" });
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getRecentActivities(): Promise<RecentActivities | null> {
  const res = await fetchApi<RecentActivities>(`/Dashboard/RecentActivities`, { cache: "no-store" });
  return res.succeeded && res.value ? res.value : null;
}

export async function getCashVsDebtRatio(): Promise<CashVsDebtRatio | null> {
  const res = await fetchApi<CashVsDebtRatio>(`/Dashboard/CashVsDebtRatio`, { cache: "no-store" });
  return res.succeeded && res.value ? res.value : null;
}