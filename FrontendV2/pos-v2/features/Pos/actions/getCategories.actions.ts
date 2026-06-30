"use server";

import { apiFetch } from "@/lib/api/fetch";

export type Category = {
  id: number;
  name: string;
};

export async function getCategories() {
  const result = await apiFetch<Category[]>("/Category/GetAllCategories");

  if (!result.isSuccess) {
    return { isSuccess: false, value: [] as Category[] };
  }

  return { isSuccess: true, value: result.value };
}
