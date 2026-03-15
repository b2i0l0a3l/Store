import { fetchApi } from "@/app/util/Api/Api";
import { order } from "@/app/Features/Orders/types";

export async function pay(body: { debtId: number; amount: number }) {
  try {
    await fetchApi("/Payment/Add", {
      method: "POST",
      body: JSON.stringify({ model: body }),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
