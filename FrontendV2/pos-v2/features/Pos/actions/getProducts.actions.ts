"use server";

import { apiFetch, type PagedResult } from "@/lib/api/fetch";
import { Product } from "../types/productType";

export async function getProducts(
  pageNumber: number = 1,
  pageSize: number = 10,
  Category?: string,
  Barcode?: string,
  ProductName?: string,
) {
  const uri = new URLSearchParams();
  uri.set("PageNumber", pageNumber.toString());
  uri.set("PageSize", pageSize.toString());
  if (Category) uri.set("CategoryName", Category);
  if (Barcode) uri.set("BarCode", Barcode);
  if (ProductName) uri.set("ProductName", ProductName);

  const result = await apiFetch<PagedResult<Product>>(
    `/Product/Pagination?${uri.toString()}`,
  );

  if (!result.isSuccess) {
    return { isSuccess: false, value: [] as Product[], NextPage: undefined };
  }

  const data = result.value;
  const nextPage =
    data.pageNumber < data.totalPages ? data.pageNumber + 1 : undefined;

  return { isSuccess: true, value: data.items, NextPage: nextPage };
}
