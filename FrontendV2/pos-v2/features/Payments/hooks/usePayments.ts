"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getAllPayments } from "../actions";

const PAGE_SIZE = 10;

export function usePayments() {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const result = await getAllPayments();
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
    payments: pagedData,
    allPayments: data,
    isLoading,
    error,
    pageNumber,
    totalPages,
    totalItems,
    setPageNumber,
  };
}
