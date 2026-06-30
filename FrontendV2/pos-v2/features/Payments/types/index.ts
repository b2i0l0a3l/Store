export interface PaymentModel {
  id: number;
  debtID: number;
  amount: number;
  paidAt: string;
}

export interface GetAllPaymentModel {
  id: number;
  debtId: number;
  clientName: string;
  amount: number;
  paidAt: string;
  paymentMethod: number;
  notes?: string;
}
