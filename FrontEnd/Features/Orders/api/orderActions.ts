"use server";

import { revalidateTag } from "next/cache";
import { buy, getOrders, getOrderById, deleteOrder, getOrderItems } from "./orderApi";
import { order } from "../types";
import { OrderItem } from "../OrderItem/types";
import { MyResponse } from "@/util/types";

export async function buyAction(body: any): Promise<MyResponse<string>> {
  const res = await buy(body);
  if (res.succeeded) {
    revalidateTag("orders", "max");
    revalidateTag("products", "max");
    revalidateTag("dashboard", "max");
    revalidateTag("clients", "max");
  }
  return res;
}

export async function fetchOrders(): Promise<order[]> {
  return getOrders();
}

export async function fetchOrderById(id: number): Promise<order | null> {
  return getOrderById(id);
}

export async function deleteOrderAction(id: number): Promise<MyResponse<string>> {
  const res = await deleteOrder(id);
  if (res.succeeded) {
    revalidateTag("orders", "max");
    revalidateTag("products", "max");
    revalidateTag("dashboard", "max");
    revalidateTag("clients", "max");
  }
  return res;
}

export async function fetchOrderItems(id: number): Promise<OrderItem[] | null> {
  return getOrderItems(id);
}
