export interface DashboardSummary {
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  totalRemainingDebt: number;
}

export interface LowStockAlert {
  productId: number;
  productName: string;
  quantity: number;
  threshold: number;
}

export interface TopSellingProduct {
  productId: number;
  productName: string;
  totalSoldAmount: number;
  totalSoldQuantity: number;
}

export interface SalesOverTime {
  saleDate: string;
  totalSales: number;
}

export interface RecentOrder {
  orderId: number;
  clientName: string;
  totalPrice: number;
  insertedDate: string;
}

export interface RecentPayment {
  paymentId: number;
  clientName: string;
  amount: number;
  insertDate: string;
}

export interface RecentActivities {
  recentOrders: RecentOrder[];
  recentPayments: RecentPayment[];
}

export interface CashVsDebtRatio {
  totalCash: number;
  totalDebt: number;
}

export interface ClientRanking {
  clientId: number;
  clientName: string;
  totalPurchases: number;
  rank: number;
}
