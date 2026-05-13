"use server";

import { revalidateTag } from "next/cache";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./productApi";
import { product } from "../types";

export async function fetchProducts(): Promise<product[]> {
  return getProducts();
}

export async function createProductAction(productData: any) {
  const res = await addProduct(productData);
  if (res.succeeded) {
    revalidateTag("products", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}

export async function updateProductAction(productData: any) {
  const res = await updateProduct(productData);
  if (res.succeeded) {
    revalidateTag("products", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}

export async function deleteProductAction(id: number) {
  const res = await deleteProduct({ id });
  if (res.succeeded) {
    revalidateTag("products", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}
