import { fetchApi } from "@/app/util/Api/Api";
import { category } from "../types";
import { MyResponse } from "@/app/util/types";

export async function getCategories(): Promise<category[]> {
  try {
    const result = await fetchApi<{ value: category[] }>(`/Category/GetAllCategories`, {
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

export async function addCategory({
  name,
}: {
  name: string;
}): Promise<MyResponse<category>> {
  return await fetchApi<category>(`/Category/Add`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function updateCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<MyResponse<category>> {
  return await fetchApi<category>(`/Category/Update`, {
    method: "PUT",
    body: JSON.stringify({ id, name }),
  });
}

export async function deleteCategory({ id }: { id: number }): Promise<MyResponse<string>> {
  return await fetchApi<string>(`/Category/Delete/${id}`, {
    method: "DELETE",
  });
}
