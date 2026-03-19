import { fetchApi } from "@/app/util/Api/Api";
import { Payment } from "../types";
import { MyResponse } from "@/app/util/types";

export async function GetPayments(): Promise<Payment[]> {
  try {
    const data = await fetchApi<MyResponse<Payment[]>>("/Payment/All");
    return data.value?.value ?? [];
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
}

export async function AddPayment(body: Omit<Payment, "id" | "paidAt">) {
  try {
    const response = await fetchApi("/Payment/Add", {
      method: "POST",
      body: JSON.stringify({ model: body }),
    });
    return response;
  } catch (error) {
    console.error("Error adding payment:", error);
    return false;
  }
}

export async function UpdatePayment(body: Omit<Payment, "paidAt">) {
  try {
    const response = await fetchApi("/Payment/Update", {
      method: "PUT",
      body: JSON.stringify({ model: body }),
    });
    return response;
  } catch (error) {
    console.error("Error updating payment:", error);
    return false;
  }
}

export async function DeletePayment(id: number) {
  try {
    await fetchApi(`/Payment/Delete/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    console.error("Error deleting payment:", error);
    return false;
  }
}
