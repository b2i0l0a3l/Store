"use client";

import { useRouter } from "next/navigation";
import type { ApiResult, PagedResult } from "@/lib/api/fetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/shared/data-pagination";
import { useOrdersPagination } from "@/features/Orders/hooks/useOrders";
import { OrderStatusBadge, OrderTypeBadge } from "@/features/Orders/components/OrderStatusBadge";
import type { OrderModel, OrderStatus, OrderType } from "@/features/Orders/types";

interface OrdersListTableProps {
  page: number;
  searchQuery?: string;
}

export default function OrdersListTable({ page, searchQuery }: OrdersListTableProps) {
  const router = useRouter();
  const { data, isLoading, isError, error } = useOrdersPagination(page, 10, searchQuery);
  const result = data as ApiResult<PagedResult<OrderModel>> | undefined;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError || (result && !result.isSuccess)) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-destructive font-medium">Failed to load orders</p>
        <p className="text-sm text-muted-foreground mt-1">
          {result && !result.isSuccess ? result.message : error?.message}
        </p>
        <Button variant="outline" className="mt-4" onClick={() => router.refresh()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!result) return null;

  const { value } = result;

  if (value.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {value.items.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.clientName}</TableCell>
              <TableCell>{order.total.toFixed(2)}</TableCell>
              <TableCell>
                <OrderTypeBadge type={order.orderType as OrderType} />
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.orderStatus as OrderStatus} />
              </TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/orders/${order.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DataPagination
        pageNumber={value.pageNumber}
        totalPages={value.totalPages}
        totalItems={value.totalItems}
        onPageChange={(p) => router.push(`/orders?page=${p}${searchQuery ? `&search=${searchQuery}` : ""}`)}
      />
    </div>
  );
}
