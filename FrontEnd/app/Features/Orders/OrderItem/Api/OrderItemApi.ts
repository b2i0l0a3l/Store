import { fetchApi } from "@/app/util/Api/Api";

export async function updateOrderItem(orderItemData: {
  orderItemId: number;
  productId: number;
  quantity: number;
  price: number;
  orderId: number;
}): Promise<boolean> {
  try {
    const result = await fetchApi(`/OrderItem/Update`, {
      method: "PUT",
      body: JSON.stringify(orderItemData),
    });
    if (!result.succeeded || !result.value) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}