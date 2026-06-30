"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardSummary,
  getClientRanking,
  getLowStockAlerts,
  getTopSellingProducts,
  getSalesOverTime,
  getRecentActivities,
  getCashVsDebtRatio,
} from "../actions";
import type {
  DashboardSummary,
  ClientRanking,
  LowStockAlert,
  TopSellingProduct,
  SalesOverTimeRecord,
  RecentActivities,
  CashVsDebtRatio,
} from "../types";

export function useDashboardSummary() {
  return useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const result = await getDashboardSummary();
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}

export function useClientRanking() {
  return useQuery<ClientRanking[]>({
    queryKey: ["dashboard-client-ranking"],
    queryFn: async () => {
      const result = await getClientRanking();
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}

export function useLowStockAlerts() {
  return useQuery<LowStockAlert[]>({
    queryKey: ["dashboard-low-stock-alerts"],
    queryFn: async () => {
      const result = await getLowStockAlerts();
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}

export function useTopSellingProducts() {
  return useQuery<TopSellingProduct[]>({
    queryKey: ["dashboard-top-selling-products"],
    queryFn: async () => {
      const result = await getTopSellingProducts();
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}

export function useSalesOverTime(days: number) {
  return useQuery<SalesOverTimeRecord[]>({
    queryKey: ["dashboard-sales-over-time", days],
    queryFn: async () => {
      const result = await getSalesOverTime(days);
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}

export function useRecentActivities() {
  return useQuery<RecentActivities>({
    queryKey: ["dashboard-recent-activities"],
    queryFn: async () => {
      const result = await getRecentActivities();
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}

export function useCashVsDebtRatio() {
  return useQuery<CashVsDebtRatio>({
    queryKey: ["dashboard-cash-vs-debt-ratio"],
    queryFn: async () => {
      const result = await getCashVsDebtRatio();
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}
