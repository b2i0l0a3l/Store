import { fetchApi } from "@/app/util/Api/Api";
import { product } from "../types";
import { MyResponse } from "@/app/util/types";

export async function getProducts(): Promise<product[]> {
  try {
    const result = await fetchApi<{ value: product[] }>(`/Product/All`, {
      cache: "no-store",
    });

    if (!result.succeeded || !result.value) {
      return [];
    }

    return result.value.value || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addProduct(productData: FormData): Promise<MyResponse<product>> {
  return await fetchApi<product>(`/Product/Add`, {
    method: "POST",
    body: productData,
  });
}

export async function updateProduct(productData: FormData): Promise<MyResponse<product>> {
  return await fetchApi<product>(`/Product/Update`, {
    method: "PUT",
    body: productData,
  });
}

export async function deleteProduct({ id }: { id: number }): Promise<MyResponse<string>> {
  return await fetchApi<string>(`/Product/Delete/${id}`, {
    method: "DELETE",
  });
}
