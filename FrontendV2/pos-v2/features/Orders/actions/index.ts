"use server";

import { apiFetch, type PagedResult, type ApiResult } from "@/lib/api/fetch";
import type {
  OrderModel,
  OrderCardModel,
  OrderItemFunctionModel,
  ReturnModel,
  UpdateOrderModel,
  UpdateOrderItemModel,
  ReturnWithItemModel,
} from "@/features/Orders/types";
import { revalidatePath } from "next/cache";

export async function getOrdersPagination(
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
) {
  const uri = new URLSearchParams();
  uri.set("PageNumber", pageNumber.toString());
  uri.set("PageSize", pageSize.toString());
  if (search) uri.set("Search", search);

  return apiFetch<PagedResult<OrderModel>>(
    `/Order/Pagination?${uri.toString()}`,
  );
}

export async function getAllOrders() {
  return apiFetch<OrderCardModel[]>("/Order/All");
}

export async function getOrderById(id: number) {
  return apiFetch<OrderCardModel>(`/Order/GetById/${id}`);
}

export async function updateOrder(data: UpdateOrderModel) {
  const result = await apiFetch<void>("/Order/Update", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (result.isSuccess) {
    revalidatePath("/orders");
  }

  return result;
}

export async function deleteOrder(id: number) {
  const result = await apiFetch<void>(`/Order/Delete/${id}`, {
    method: "DELETE",
  });

  if (result.isSuccess) {
    revalidatePath("/orders");
  }

  return result;
}

export async function getOrderItemsByOrderId(orderId: number) {
  return apiFetch<OrderItemFunctionModel[]>(
    `/Order/GetOrderItemsByOrderId?OrderId=${orderId}`,
  );
}

export async function updateOrderItem(data: UpdateOrderItemModel) {
  const result = await apiFetch<void>("/OrderItem/Update", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (result.isSuccess) {
    revalidatePath("/orders");
  }

  return result;
}

export async function deleteOrderItem(id: number) {
  const result = await apiFetch<void>(`/OrderItem/Delete/${id}`, {
    method: "DELETE",
  });

  if (result.isSuccess) {
    revalidatePath("/orders");
  }

  return result;
}

export async function returnItems(data: ReturnWithItemModel) {
  const result = await apiFetch<void>("/Return/ReturnItems", {
    method: "POST",
    body: JSON.stringify({ returnWithItemModel: data }),
  });

  if (result.isSuccess) {
    revalidatePath("/orders");
  }

  return result;
}

export async function getAllReturns() {
  return apiFetch<ReturnModel[]>("/Return/All");
}

export async function printInvoice(body: {
  id: number;
  clientId?: number;
  items: { productName: string; quantity: number; price: number }[];
  date: string;
  total: number;
}) {
  return apiFetch<string>("/Ivoice/html-invoice", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
