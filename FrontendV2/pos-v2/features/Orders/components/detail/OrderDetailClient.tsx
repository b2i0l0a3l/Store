"use client";

import type { ApiResult } from "@/lib/api/fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderById } from "@/features/Orders/hooks/useOrders";
import type { OrderCardModel } from "@/features/Orders/types";
import OrderHeader from "@/features/Orders/components/detail/OrderHeader";
import OrderItemsTable from "@/features/Orders/components/detail/OrderItemsTable";
import OrderReturnsHistory from "@/features/Orders/components/detail/OrderReturnsHistory";
import { Separator } from "@/components/ui/separator";

interface OrderDetailClientProps {
  orderId: number;
}

export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const { data, isLoading, isError } = useOrderById(orderId);
  const result = data as ApiResult<OrderCardModel> | undefined;

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError || (result && !result.isSuccess)) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-destructive text-lg">
          {result && !result.isSuccess ? result.message : "Failed to load order"}
        </p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-6">
      <OrderHeader order={result.value} />
      <Separator />
      <OrderItemsTable orderId={orderId} />
      <Separator />
      <OrderReturnsHistory orderId={orderId} />
    </div>
  );
}
