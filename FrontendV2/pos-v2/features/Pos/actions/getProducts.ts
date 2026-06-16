import { Product } from "../types/productType";

export async function getProducts(
  pageNumber: number = 1,
  pageSize: number = 10,
  Category?: string,
  Barcode?: string,
  ProductName?: string,
) {
  try {
    const uri = new URLSearchParams();
    uri.set("PageNumber", pageNumber.toString());
    uri.set("PageSize", pageSize.toString());
    if (Category) uri.set("CategoryName", Category);
    if (Barcode) uri.set("BarCode", Barcode);
    if (ProductName) uri.set("ProductName", ProductName);
    const url = `${process.env.Next_Public_Api_Url}/Product/GetAll?${uri.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.Api_Key}`,
      },
    });
    if (!response.ok) return { isSuccess: false, value: [] };

    const r = await response.json();
    const data: Product[] = r.value.items;
    const nextPage =
      r.value.pageNumber < r.value.totalPages
        ? r.value.pageNumber + 1
        : undefined;

    return { isSuccess: true, value: data, NextPage: nextPage };
  } catch (e) {
    console.error(`Product Error : ${e}`);
    return { isSuccess: false, value: [] };
  }
}
