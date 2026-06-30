"use server";

import { apiFetch, type ApiResult } from "@/lib/api/fetch";
import type {
  DashboardSummary,
  ClientRanking,
  LowStockAlert,
  TopSellingProduct,
  SalesOverTimeRecord,
  RecentActivities,
  CashVsDebtRatio,
} from "../types";

export async function getDashboardSummary(): Promise<ApiResult<DashboardSummary>> {
  return apiFetch<DashboardSummary>("/Dashboard/Summary");
}

export async function getClientRanking(): Promise<ApiResult<ClientRanking[]>> {
  return apiFetch<ClientRanking[]>("/Dashboard/ClientRanking");
}

export async function getLowStockAlerts(): Promise<ApiResult<LowStockAlert[]>> {
  return apiFetch<LowStockAlert[]>("/Dashboard/LowStockAlerts");
}

export async function getTopSellingProducts(): Promise<ApiResult<TopSellingProduct[]>> {
  return apiFetch<TopSellingProduct[]>("/Dashboard/TopSellingProducts");
}

export async function getSalesOverTime(days: number): Promise<ApiResult<SalesOverTimeRecord[]>> {
  return apiFetch<SalesOverTimeRecord[]>(`/Dashboard/SalesOverTime?days=${days}`);
}

export async function getRecentActivities(): Promise<ApiResult<RecentActivities>> {
  return apiFetch<RecentActivities>("/Dashboard/RecentActivities");
}

export async function getCashVsDebtRatio(): Promise<ApiResult<CashVsDebtRatio>> {
  return apiFetch<CashVsDebtRatio>("/Dashboard/CashVsDebtRatio");
}
