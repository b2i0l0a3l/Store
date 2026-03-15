import { fetchApi } from "@/app/util/Api/Api";
import { order } from "../types";

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

export async function getOrderItems(id: number): Promise<order | null> {
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
