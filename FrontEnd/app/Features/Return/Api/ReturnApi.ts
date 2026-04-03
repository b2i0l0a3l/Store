import { fetchApi } from "@/app/util/Api/Api";

export async function returnOrderItems(payload: {
    orderId: number;
    items: {
      productId: number;
      quantity: number;
      price: number;
    orderItemId: number;
  }[];
}): Promise<boolean> {
  try {
    const result = await fetchApi(`/Return/ReturnItems`, {
      method: "POST",
      body: JSON.stringify({returnWithItemModel: payload}),
    });

    if (!result.succeeded) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
