"use server";

import { apiFetch, type ApiResult, type PagedResult } from "@/lib/api/fetch";
import type { ClientModel } from "../types";

export async function getClientsPaginated(
  pageNumber: number,
  pageSize: number,
): Promise<ApiResult<PagedResult<ClientModel>>> {
  return apiFetch<PagedResult<ClientModel>>(
    `/Client/GetAllClientsPagination?PageNumber=${pageNumber}&PageSize=${pageSize}`,
  );
}

export async function getAllClients(): Promise<ApiResult<ClientModel[]>> {
  return apiFetch<ClientModel[]>("/Client/GetAll");
}

export async function addClient(data: {
  name: string;
  phoneNumber?: string;
  address?: string;
}): Promise<ApiResult<number>> {
  return apiFetch<number>("/Client/Add", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateClient(data: {
  id: number;
  name: string;
  phoneNumber?: string;
  address?: string;
}): Promise<ApiResult<boolean>> {
  return apiFetch<boolean>("/Client/Update", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteClient(id: number): Promise<ApiResult<boolean>> {
  return apiFetch<boolean>(`/Client/Delete/${id}`, {
    method: "DELETE",
  });
}
