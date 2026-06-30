"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllReturns } from "@/features/Orders/hooks/useOrders";

interface OrderReturnsHistoryProps {
  orderId: number;
}

export default function OrderReturnsHistory({ orderId }: OrderReturnsHistoryProps) {
  const { data, isLoading } = useAllReturns();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  const returns = (data?.isSuccess ? data.value : []).filter(
    (r) => r.orderId === orderId,
  );

  if (returns.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-medium mb-2">Returns</h3>
        <p className="text-sm text-muted-foreground">No returns for this order.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Returns</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Return ID</TableHead>
            <TableHead>Total Refund</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.slice(0, 5).map((ret) => (
            <TableRow key={ret.id}>
              <TableCell className="font-medium">{ret.id}</TableCell>
              <TableCell>{ret.totalRefund.toFixed(2)}</TableCell>
              <TableCell>{new Date(ret.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
