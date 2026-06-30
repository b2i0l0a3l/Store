"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataPagination } from "@/components/shared/data-pagination";
import { DollarSign } from "lucide-react";
import type { GetDebtModel } from "../types";

interface DebtsTableProps {
  debts: GetDebtModel[];
  isLoading: boolean;
  error: Error | null;
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPay: (debt: GetDebtModel) => void;
}

export function DebtsTable({
  debts,
  isLoading,
  error,
  pageNumber,
  totalPages,
  totalItems,
  onPageChange,
  onPay,
}: DebtsTableProps) {
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

  if (debts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <p className="text-sm text-muted-foreground">No debts found</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debts.map((debt) => (
            <TableRow key={debt.id}>
              <TableCell className="font-medium">{debt.clientName}</TableCell>
              <TableCell>{debt.orderId}</TableCell>
              <TableCell>${debt.remaining.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(debt.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(debt.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPay(debt)}
                >
                  <DollarSign className="h-4 w-4" />
                  Pay
                </Button>
              </TableCell>
            </TableRow>
          ))}
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
