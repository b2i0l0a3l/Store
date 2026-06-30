"use server";

import { apiFetch, PagedResult, ApiResult } from "@/lib/api/fetch";
import type { ProductsModel, ProductDetail, Category } from "../types";

export async function getProductsPagination(params: {
  ProductName?: string;
  CategoryName?: string;
  BarCode?: string;
  PageNumber?: number;
  PageSize?: number;
}): Promise<ApiResult<PagedResult<ProductsModel>>> {
  const searchParams = new URLSearchParams();
  if (params.ProductName) searchParams.set("ProductName", params.ProductName);
  if (params.CategoryName) searchParams.set("CategoryName", params.CategoryName);
  if (params.BarCode) searchParams.set("BarCode", params.BarCode);
  if (params.PageNumber) searchParams.set("PageNumber", String(params.PageNumber));
  if (params.PageSize) searchParams.set("PageSize", String(params.PageSize));
  const qs = searchParams.toString();
  return apiFetch<PagedResult<ProductsModel>>(`/Product/Pagination${qs ? `?${qs}` : ""}`);
}

export async function getProductById(id: number): Promise<ApiResult<ProductDetail>> {
  return apiFetch<ProductDetail>(`/Product/GetById/${id}`);
}

export async function addProduct(formData: FormData): Promise<ApiResult<number>> {
  return apiFetch<number>("/Product/Add", { method: "POST", body: formData });
}

export async function updateProduct(formData: FormData): Promise<ApiResult<number>> {
  return apiFetch<number>("/Product/Update", { method: "PUT", body: formData });
}

export async function deleteProduct(id: number): Promise<ApiResult<boolean>> {
  return apiFetch<boolean>(`/Product/Delete/${id}`, { method: "DELETE" });
}

export async function getAllCategories(): Promise<ApiResult<Category[]>> {
  return apiFetch<Category[]>("/Category/GetAllCategories");
}
