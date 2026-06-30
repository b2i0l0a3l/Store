export type DashboardSummary = {
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  totalRemainingDebt: number;
}

export type ClientRanking = {
  clientId: number;
  clientName: string;
  totalPurchases: number;
  rank: number;
}

export type LowStockAlert = {
  productId: number;
  productName: string;
  quantity: number;
}

export type TopSellingProduct = {
  productId: number;
  productName: string;
  totalSoldAmount: number;
  totalSoldQuantity: number;
}

export type SalesOverTimeRecord = {
  saleDate: string;
  totalSales: number;
  totalDebt: number;
}

export type RecentOrderItem = {
  orderId: number;
  clientName: string;
  totalPrice: number;
  insertedDate: string;
}

export type RecentPaymentItem = {
  paymentId: number;
  clientName: string;
  amount: number;
  insertDate: string;
}

export type RecentActivities = {
  recentOrders: RecentOrderItem[];
  recentPayments: RecentPaymentItem[];
}

export type CashVsDebtRatio = {
  totalCash: number;
  totalDebt: number;
}
