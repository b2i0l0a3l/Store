import { fetchApi } from "@/app/util/Api/Api";
import { order } from "../types";
import { OrderItem } from "../OrderItem/types";

export async function buy(body: any) {
  try {
    await fetchApi("/Order/AddOrderWithItems", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getOrders(): Promise<order[]> {
  try {
    const result = await fetchApi<{ value: order[] }>(`/Order/All`, {
      cache: "no-store",
    });

    if (!result.succeeded || !result.value) {
      return [];
    }

    return result.value.value || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getOrderById(id: number): Promise<order | null> {
  try {
    const result = await fetchApi<order>(`/Order/GetById/${id}`, {
      cache: "no-store",
    });

    if (!result.succeeded || !result.value) {
      return null;
    }
    return result.value || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getOrderItems(id: number): Promise<OrderItem[] | null> {
  try {
    const result = await fetchApi<{ value: OrderItem[] }>(`/Order/GetOrderItemsByOrderId?OrderId=${id}`, {
      cache: "no-store",
    });

    if (!result.succeeded || !result.value) {
      return null;
    }
    console.log(result);
    return result.value.value || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
