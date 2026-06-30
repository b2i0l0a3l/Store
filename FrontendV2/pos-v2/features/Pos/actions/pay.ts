"use server";

import { apiFetch } from "@/lib/api/fetch";
import { revalidatePath } from "next/cache";
import type { SellOrderInput } from "../types/orderTypes";

export async function SellOrder(input: SellOrderInput) {
  const result = await apiFetch<string>("/Order/sell", {
    method: "POST",
    body: JSON.stringify({
      clientId: input.clientId,
      orderType: input.orderType,
      items: input.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    }),
  });

  if (result.isSuccess) {
    revalidatePath("/pos");
    revalidatePath("/orders");
    revalidatePath("/dashboard");
  }

  return result;
}
