"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { getAllDebts, addPayment } from "../actions";

const PAGE_SIZE = 10;

export function useDebts() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["debts"],
    queryFn: async () => {
      const result = await getAllDebts();
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });

  const totalItems = data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const pagedData = useMemo(() => {
    if (!data) return [];
    const start = (pageNumber - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, pageNumber]);

  return {
    debts: pagedData,
    allDebts: data,
    isLoading,
    error,
    pageNumber,
    totalPages,
    totalItems,
    setPageNumber,
  };
}

export function useAddPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      debtId: number;
      amount: number;
      notes?: string;
      paymentMethod: number;
    }) => addPayment(data),
    onSuccess: (result) => {
      if (!result.isSuccess) {
        toast.error(result.message);
        return;
      }
      toast.success("Payment registered successfully");
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });
}
