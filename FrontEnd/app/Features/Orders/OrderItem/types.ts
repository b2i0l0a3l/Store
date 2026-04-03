export interface OrderItem {
    id: number;
    productName: string;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
}