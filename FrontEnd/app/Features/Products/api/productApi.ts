import { fetchApi } from "@/app/util/Api/Api";
import { product } from "../types";

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

export async function addProduct(productData: FormData): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: product[] }>(`/Product/Add`, {
      method: "POST",
      body: productData,
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

export async function updateProduct(productData: FormData): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: product[] }>(`/Product/Update`, {
      method: "PUT",
      body: productData,
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

export async function deleteProduct({ id }: { id: number }): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: product[] }>(
      `/Product/Delete/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!result.succeeded || !result.value) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
