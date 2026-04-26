import { fetchApi } from "@/util/Api/Api";
import { Payment } from "../types";
import { MyResponse } from "@/util/types";

export async function GetPayments(): Promise<Payment[]> {
  try {
    const data = await fetchApi<MyResponse<Payment[]>>("/Payment/All");
    return data.value?.value ?? [];
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
}

// export async function AddPayment(
//   body: Omit<Payment, "id" | "paidAt">,
// ): Promise<MyResponse<string>> {
//   return await fetchApi<string>("/Payment/Add", {
//     method: "POST",
//     body: JSON.stringify({ model: body }),
//   });
// }

export async function UpdatePayment(
  body: Omit<Payment, "paidAt">,
): Promise<MyResponse<string>> {
  return await fetchApi<string>("/Payment/Update", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function DeletePayment(id: number): Promise<MyResponse<string>> {
  return await fetchApi<string>(`/Payment/Delete/${id}`, {
    method: "DELETE",
  });
}
