"use client";

import { useState } from "react";
import { useDebts, useAddPayment } from "../hooks/useDebts";
import { DebtsTable } from "./DebtsTable";
import { PaymentDialog } from "./PaymentDialog";
import type { GetDebtModel } from "../types";

export default function DebtsClient() {
  const {
    debts,
    isLoading,
    error,
    pageNumber,
    totalPages,
    totalItems,
    setPageNumber,
  } = useDebts();

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<GetDebtModel | null>(null);

  const paymentMutation = useAddPayment();

  const handlePay = (debt: GetDebtModel) => {
    setSelectedDebt(debt);
    setPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = (data: {
    debtId: number;
    amount: number;
    notes?: string;
    paymentMethod: number;
  }) => {
    paymentMutation.mutate(data, {
      onSuccess: (result) => {
        if (result.isSuccess) {
          setPaymentDialogOpen(false);
          setSelectedDebt(null);
        }
      },
    });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Debts</h1>
      </div>

      <DebtsTable
        debts={debts}
        isLoading={isLoading}
        error={error}
        pageNumber={pageNumber}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setPageNumber}
        onPay={handlePay}
      />

      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={(open) => {
          setPaymentDialogOpen(open);
          if (!open) setSelectedDebt(null);
        }}
        debtId={selectedDebt?.id ?? null}
        remaining={selectedDebt?.remaining ?? 0}
        onSubmit={handlePaymentSubmit}
        isPending={paymentMutation.isPending}
      />
    </div>
  );
}
