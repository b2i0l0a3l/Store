"use server";

import { revalidateTag } from "next/cache";
import { GetPayments, UpdatePayment, DeletePayment } from "./paymentApi";
import { Payment } from "../types";
import { MyResponse } from "@/util/types";

export async function fetchPayments(): Promise<Payment[]> {
  return GetPayments();
}

export async function updatePaymentAction(
  body: Omit<Payment, "paidAt">,
): Promise<MyResponse<string>> {
  const res = await UpdatePayment(body);
  if (res.succeeded) {
    revalidateTag("payments", "max");
    revalidateTag("debts", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}

export async function deletePaymentAction(id: number): Promise<MyResponse<string>> {
  const res = await DeletePayment(id);
  if (res.succeeded) {
    revalidateTag("payments", "max");
    revalidateTag("debts", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}
