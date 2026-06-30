export enum OrderStatus {
  Paid = 0,
  NotPaid = 1,
  Partial = 2,
}

export enum OrderType {
  Sell = 0,
  Debt = 1,
}

export interface OrderModel {
  id: number;
  clientId: number;
  clientName: string;
  total: number;
  orderStatus: OrderStatus;
  orderType: OrderType;
  createdAt: string;
  updatedAt: string;
}

export interface OrderCardModel {
  id: number;
  clientName: string;
  clientId?: number;
  total: number;
  remaining: number;
  orderType: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemList {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderItemFunctionModel {
  id: number;
  quantity: number;
  price: number;
  productName: string;
  productId: number;
  createdAt: string;
}

export interface ReturnItemList {
  productId: number;
  quantity: number;
  price: number;
  orderItemId: number;
}

export interface ReturnWithItemModel {
  orderId: number;
  items: ReturnItemList[];
}

export interface ReturnModel {
  id: number;
  orderId: number;
  totalRefund: number;
  createdAt: string;
}

export interface ReturnItemModel {
  id: number;
  returnId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface UpdateOrderModel {
  orderId: number;
  clientId?: number;
  orderType: OrderType;
  orderStatus: OrderStatus;
}

export interface UpdateOrderItemModel {
  orderItemId: number;
  quantity: number;
  orderId: number;
  price: number;
  productId: number;
}
