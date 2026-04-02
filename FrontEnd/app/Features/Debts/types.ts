export interface Debt {
    id: number;
    clientName: string;
    orderId: number;
    remaining: number;
    createdAt: Date;
    updatedAt: Date;
}