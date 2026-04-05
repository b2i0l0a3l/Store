import { fetchApi } from "@/app/util/Api/Api";
import { order } from "@/app/Features/Orders/types";
import { MyResponse } from "@/app/util/types";

export async function pay({ debtId, amount }: { debtId: number; amount: number }): Promise<MyResponse<string>> {
  return await fetchApi<string>("/Payment/Add", {
    method: "POST",
    body: JSON.stringify({ debtId, amount }),
  });
}
