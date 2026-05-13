"use server";

import { revalidateTag } from "next/cache";
import { pay } from "./paymentApi";
import { MyResponse } from "@/util/types";

export async function payAction({
  debtId,
  amount,
  paymentMethod,
  notes,
}: {
  debtId: number;
  amount: number;
  paymentMethod: number;
  notes?: string;
}): Promise<MyResponse<string>> {
  const res = await pay({ debtId, amount, paymentMethod, notes });
  if (res.succeeded) {
    revalidateTag("debts", "max");
    revalidateTag("payments", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}
