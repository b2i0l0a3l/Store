import { fetchApi } from "@/util/Api/Api";
import { MyResponse } from "@/util/types";
import {
  DashboardSummary,
  LowStockAlert,
  TopSellingProduct,
  SalesOverTime,
  RecentActivities,
  CashVsDebtRatio,
  ClientRanking,
  UserModel,
} from "../types";

export async function getDashboardSummary(): Promise<DashboardSummary | null> {
  const res = await fetchApi<DashboardSummary>(`/Dashboard/Summary`, {
    next: { tags: ["dashboard"] },
  });
  return res.succeeded && res.value ? res.value : null;
}

export async function getClientRanking(): Promise<ClientRanking[]> {
  const res = await fetchApi<ClientRanking[]>(`/Dashboard/ClientRanking`, {
    next: { tags: ["dashboard"] },
  });
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getLowStockAlerts(): Promise<LowStockAlert[]> {
  const res = await fetchApi<LowStockAlert[]>(`/Dashboard/LowStockAlerts`, {
    next: { tags: ["dashboard"] },
  });
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getTopSellingProducts(): Promise<TopSellingProduct[]> {
  const res = await fetchApi<TopSellingProduct[]>(
    `/Dashboard/TopSellingProducts`,
    { next: { tags: ["dashboard"] } },
  );
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getSalesOverTime(
  days: number = 30,
): Promise<SalesOverTime[]> {
  const res = await fetchApi<SalesOverTime[]>(
    `/Dashboard/SalesOverTime?days=${days}`,
    { next: { tags: ["dashboard"] } },
  );
  return res.succeeded && res.value ? res.value || [] : [];
}

export async function getRecentActivities(): Promise<RecentActivities | null> {
  const res = await fetchApi<RecentActivities>(`/Dashboard/RecentActivities`, {
    next: { tags: ["dashboard"] },
  });
  return res.succeeded && res.value ? res.value : null;
}

export async function getCashVsDebtRatio(): Promise<CashVsDebtRatio | null> {
  const res = await fetchApi<CashVsDebtRatio>(`/Dashboard/CashVsDebtRatio`, {
    next: { tags: ["dashboard"] },
  });
  return res.succeeded && res.value ? res.value : null;
}

export async function getUsers(): Promise<UserModel[]> {
  const res = await fetchApi<UserModel[]>(`/User/GetUsers`, {
    next: { tags: ["users"] },
  });
  return res.succeeded && res.value ? res.value : [];
}

export async function changeUserRole(
  userId: string,
  role: string,
): Promise<MyResponse<string>> {
  return await fetchApi<string>(`/User/ChangeRole`, {
    method: "POST",
    body: JSON.stringify({ userId, role }),
  });
}
