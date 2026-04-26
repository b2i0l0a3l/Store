export interface Payment {
  id: number;
  debtId: number;
  clientName: string;
  amount: number;
  paidAt: string;
  notes?: string;
  paymentMethod?: number;
}
