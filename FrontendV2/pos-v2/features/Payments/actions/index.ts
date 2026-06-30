"use server";

import { apiFetch, type ApiResult } from "@/lib/api/fetch";
import type { GetAllPaymentModel, PaymentModel } from "../types";

export async function getAllPayments(): Promise<ApiResult<GetAllPaymentModel[]>> {
  return apiFetch<GetAllPaymentModel[]>("/Payment/All");
}

export async function getPaymentById(id: number): Promise<ApiResult<PaymentModel>> {
  return apiFetch<PaymentModel>(`/Payment/GetById/${id}`);
}
