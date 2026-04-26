"use server";

import {
  getDashboardSummary,
  getClientRanking,
  getLowStockAlerts,
  getTopSellingProducts,
  getSalesOverTime,
  getRecentActivities,
  getCashVsDebtRatio,
  getUsers,
  changeUserRole,
} from "./dashboardApi";

export async function fetchDashboardSummary() {
  return getDashboardSummary();
}

export async function fetchClientRanking() {
  return getClientRanking();
}

export async function fetchLowStockAlerts() {
  return getLowStockAlerts();
}

export async function fetchTopSellingProducts() {
  return getTopSellingProducts();
}

export async function fetchSalesOverTime(days: number = 30) {
  return getSalesOverTime(days);
}

export async function fetchRecentActivities() {
  return getRecentActivities();
}

export async function fetchCashVsDebtRatio() {
  return getCashVsDebtRatio();
}

export async function fetchUsers() {
  return getUsers();
}

export async function changeUserRoleAction(userId: string, role: string) {
  return changeUserRole(userId, role);
}
