export interface DebtModel {
  id: number;
  orderId: number;
  clientId: number;
  remaining: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetDebtModel {
  id: number;
  clientId: number;
  clientName: string;
  orderId: number;
  remaining: number;
  createdAt: string;
  updatedAt: string;
}

export enum PaymentMethod {
  Cash = 1,
  CreditCard = 2,
  MobilePayment = 3,
  BankTransfer = 4,
  Cheque = 5,
  Other = 6,
}
