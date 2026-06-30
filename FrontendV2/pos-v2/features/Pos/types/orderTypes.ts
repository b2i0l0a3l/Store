export enum OrderType {
  Sell = 0,
  Debt = 1,
}

export type SellOrderInput = {
  clientId: number;
  orderType: OrderType;
  items: Array<{ productId: number; quantity: number; price: number }>;
};
