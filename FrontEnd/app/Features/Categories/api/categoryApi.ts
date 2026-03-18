import { fetchApi } from "@/app/util/Api/Api";
import { category } from "../types";

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
}): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: category[] }>(`/Category/Add`, {
      method: "POST",
      body: JSON.stringify({ name }),
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

export async function updateCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: category[] }>(`/Category/Update`, {
      method: "PUT",
      body: JSON.stringify({ id, name }),
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

export async function deleteCategory({ id }: { id: number }): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: category[] }>(
      `/Category/Delete/${id}`,
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
