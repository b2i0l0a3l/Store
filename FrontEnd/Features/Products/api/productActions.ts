"use server";

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
  return addProduct(productData);
}

export async function updateProductAction(productData: any) {
  return updateProduct(productData);
}

export async function deleteProductAction(id: number) {
  return deleteProduct({ id });
}
