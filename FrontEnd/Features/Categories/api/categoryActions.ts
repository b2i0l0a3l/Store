"use server";

import { revalidateTag } from "next/cache";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./categoryApi";
import { category } from "../types";
import { MyResponse } from "@/util/types";

export async function fetchCategories(): Promise<category[]> {
  return getCategories();
}

export async function createCategoryAction({
  name,
}: {
  name: string;
}): Promise<MyResponse<category>> {
  const res = await addCategory({ name });
  if (res.succeeded) {
    revalidateTag("categories", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}

export async function updateCategoryAction({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<MyResponse<category>> {
  const res = await updateCategory({ id, name });
  if (res.succeeded) {
    revalidateTag("categories", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}

export async function deleteCategoryAction({
  id,
}: {
  id: number;
}): Promise<MyResponse<string>> {
  const res = await deleteCategory({ id });
  if (res.succeeded) {
    revalidateTag("categories", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}
