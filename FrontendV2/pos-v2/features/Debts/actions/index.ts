"use server";

import { apiFetch, type ApiResult } from "@/lib/api/fetch";
import type { GetDebtModel } from "../types";

export async function getAllDebts(): Promise<ApiResult<GetDebtModel[]>> {
  return apiFetch<GetDebtModel[]>("/Debt/All");
}

export async function addPayment(data: {
  debtId: number;
  amount: number;
  notes?: string;
  paymentMethod: number;
}): Promise<ApiResult<number>> {
  return apiFetch<number>("/Payment/Add", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
