import { fetchApi } from "@/util/Api/Api";

import { MyResponse } from "@/util/types";

export async function pay({
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
  return await fetchApi<string>("/Payment/Add", {
    method: "POST",
    body: JSON.stringify({ debtId, amount, paymentMethod, notes }),
  });
}
