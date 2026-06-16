import { Product } from "../types/productType";

export enum OrderType {
    Sell = 0,
    Debt = 1
}
export type Order = { 
    items: Product[];
    orderType: OrderType; 
    clientId?: number;
}

export async function SellOrder(order: Order) {
    try {

        const response = await fetch(`${process.env.Next_Public_Api_Url}/Order/SellOrder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.Api_Key}`
            },
            body: JSON.stringify(order),
        });
        if(!response.ok) return { isSuccess: false, value: null };
        const r = await response.json();
        return { isSuccess: true, value: null };
    } catch (e) {
        console.error(`Sell Order Error : ${e}`);
        return { isSuccess: false, value: null };
    }
}