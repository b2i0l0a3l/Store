"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataPagination } from "@/components/shared/data-pagination";
import type { GetAllPaymentModel } from "../types";

interface PaymentsTableProps {
  payments: GetAllPaymentModel[];
  isLoading: boolean;
  error: Error | null;
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const paymentMethodConfig: Record<
  number,
  { label: string; variant: "success" | "info" | "warning" | "secondary" | "outline" | "default" }
> = {
  1: { label: "Cash", variant: "success" },
  2: { label: "Credit Card", variant: "info" },
  3: { label: "Mobile Payment", variant: "warning" },
  4: { label: "Bank Transfer", variant: "secondary" },
  5: { label: "Cheque", variant: "outline" },
  6: { label: "Other", variant: "default" },
};

export function PaymentsTable({
  payments,
  isLoading,
  error,
  pageNumber,
  totalPages,
  totalItems,
  onPageChange,
}: PaymentsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <p className="text-sm text-destructive">{error.message}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageNumber)}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <p className="text-sm text-muted-foreground">No payments found</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const config = paymentMethodConfig[payment.paymentMethod] ?? {
              label: "Unknown",
              variant: "default" as const,
            };
            return (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  {payment.clientName}
                </TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {payment.notes || "-"}
                </TableCell>
                <TableCell>
                  {new Date(payment.paidAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <DataPagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}
