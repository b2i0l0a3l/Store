export interface Debt {
    id: number;
    clientName: string;
    orderId: number;
    remainingAmount: number;
    createdAt: Date;
    updatedAt: Date;
}