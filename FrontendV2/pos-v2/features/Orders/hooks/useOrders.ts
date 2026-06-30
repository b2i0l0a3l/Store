"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResult, PagedResult } from "@/lib/api/fetch";
import {
  getOrdersPagination,
  getAllOrders,
  getOrderById,
  getOrderItemsByOrderId,
  getAllReturns,
  updateOrder,
  deleteOrder,
  updateOrderItem,
  deleteOrderItem,
  returnItems,
  printInvoice,
} from "@/features/Orders/actions";
import type {
  OrderModel,
  OrderCardModel,
  OrderItemFunctionModel,
  ReturnModel,
  UpdateOrderModel,
  UpdateOrderItemModel,
  ReturnWithItemModel,
} from "@/features/Orders/types";
import { toast } from "sonner";

export function useOrdersPagination(pageNumber: number, pageSize: number = 10, search?: string) {
  return useQuery<ApiResult<PagedResult<OrderModel>>>({
    queryKey: ["orders", "pagination", pageNumber, pageSize, search],
    queryFn: () => getOrdersPagination(pageNumber, pageSize, search),
  });
}

export function useAllOrders() {
  return useQuery<ApiResult<OrderCardModel[]>>({
    queryKey: ["orders", "all"],
    queryFn: () => getAllOrders(),
  });
}

export function useOrderById(id: number) {
  return useQuery<ApiResult<OrderCardModel>>({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),
    enabled: id > 0,
  });
}

export function useOrderItems(orderId: number) {
  return useQuery<ApiResult<OrderItemFunctionModel[]>>({
    queryKey: ["orders", orderId, "items"],
    queryFn: () => getOrderItemsByOrderId(orderId),
    enabled: orderId > 0,
  });
}

export function useAllReturns() {
  return useQuery<ApiResult<ReturnModel[]>>({
    queryKey: ["returns", "all"],
    queryFn: () => getAllReturns(),
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation<ApiResult<void>, Error, UpdateOrderModel>({
    mutationFn: (data: UpdateOrderModel) => updateOrder(data),
    onSuccess: (result) => {
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success("Order updated successfully");
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("Failed to update order");
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation<ApiResult<void>, Error, number>({
    mutationFn: (id: number) => deleteOrder(id),
    onSuccess: (result) => {
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success("Order deleted successfully");
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });
}

export function useUpdateOrderItem() {
  const queryClient = useQueryClient();

  return useMutation<ApiResult<void>, Error, UpdateOrderItemModel>({
    mutationFn: (data: UpdateOrderItemModel) => updateOrderItem(data),
    onSuccess: (result, variables) => {
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["orders", variables.orderId, "items"] });
        queryClient.invalidateQueries({ queryKey: ["orders", variables.orderId] });
        toast.success("Order item updated successfully");
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("Failed to update order item");
    },
  });
}

export function useDeleteOrderItem() {
  const queryClient = useQueryClient();

  return useMutation<ApiResult<void>, Error, number>({
    mutationFn: (id: number) => deleteOrderItem(id),
    onSuccess: (result) => {
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success("Order item deleted successfully");
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("Failed to delete order item");
    },
  });
}

export function useReturnItems(orderId: number) {
  const queryClient = useQueryClient();

  return useMutation<ApiResult<void>, Error, ReturnWithItemModel>({
    mutationFn: (data: ReturnWithItemModel) => returnItems(data),
    onSuccess: (result) => {
      if (result.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["orders", orderId, "items"] });
        queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
        queryClient.invalidateQueries({ queryKey: ["returns"] });
        toast.success("Items returned successfully");
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("Failed to return items");
    },
  });
}

export function usePrintInvoice() {
  return useMutation<ApiResult<string>, Error, {
    id: number;
    clientId?: number;
    items: { productName: string; quantity: number; price: number }[];
    date: string;
    total: number;
  }>({
    mutationFn: (body) => printInvoice(body),
  });
}
