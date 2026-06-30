"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as actions from "../actions";
import type { PagedResult, ApiResult } from "@/lib/api/fetch";
import type { ProductsModel, ProductDetail, Category } from "../types";

export function useProducts(params: {
  ProductName?: string;
  CategoryName?: string;
  BarCode?: string;
  PageNumber?: number;
  PageSize?: number;
}) {
  return useQuery<ApiResult<PagedResult<ProductsModel>>>({
    queryKey: ["products", params],
    queryFn: () => actions.getProductsPagination(params),
  });
}

export function useProduct(id: number) {
  return useQuery<ApiResult<ProductDetail>>({
    queryKey: ["product", id],
    queryFn: () => actions.getProductById(id),
    enabled: id > 0,
  });
}

export function useCategories() {
  return useQuery<ApiResult<Category[]>>({
    queryKey: ["categories"],
    queryFn: () => actions.getAllCategories(),
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<number>, Error, FormData>({
    mutationFn: (formData: FormData) => actions.addProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<number>, Error, FormData>({
    mutationFn: (formData: FormData) => actions.updateProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<boolean>, Error, number>({
    mutationFn: (id: number) => actions.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
