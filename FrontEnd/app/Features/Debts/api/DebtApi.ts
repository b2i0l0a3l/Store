import { fetchApi } from "@/app/util/Api/Api";
import { Debt } from "../types";

export async function GetDebts() {
  try {
    const response = await fetchApi<{
      value: Debt[];
      isSuccess: boolean;
      error: string | null;
    }>("/Debt/All", {
      method: "GET",
    });
    return response.value?.value || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
