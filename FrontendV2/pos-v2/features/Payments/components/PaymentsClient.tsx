"use client";

import { usePayments } from "../hooks/usePayments";
import { PaymentsTable } from "./PaymentsTable";

export default function PaymentsClient() {
  const {
    payments,
    isLoading,
    error,
    pageNumber,
    totalPages,
    totalItems,
    setPageNumber,
  } = usePayments();

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Payments</h1>
      </div>

      <PaymentsTable
        payments={payments}
        isLoading={isLoading}
        error={error}
        pageNumber={pageNumber}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setPageNumber}
      />
    </div>
  );
}
