import { fetchApi } from "@/util/Api/Api";
import { client } from "../types";
import { MyResponse } from "@/util/types";

export async function getClients(): Promise<client[]> {
  try {
    const result = await fetchApi<{ value: client[] }>(`/Client/GetAll`, {
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

export async function addClient({
  name,
  phoneNumber,
  address,
}: {
  name: string;
  phoneNumber: string;
  address?: string;
}): Promise<MyResponse<client>> {
  return await fetchApi<client>(`/Client/Add`, {
    method: "POST",
    body: JSON.stringify({ name, phoneNumber, address }),
  });
}

export async function updateClient({
  id,
  name,
  phoneNumber,
  address,
}: {
  id: string;
  name: string;
  phoneNumber: string;
  address?: string;
}): Promise<MyResponse<client>> {
  return await fetchApi<client>(`/Client/Update`, {
    method: "PUT",
    body: JSON.stringify({ id, name, phoneNumber, address }),
  });
}

export async function deleteClient({
  id,
}: {
  id: Number;
}): Promise<MyResponse<string>> {
  return await fetchApi<string>(`/Client/Delete/${id}`, {
    method: "DELETE",
  });
}
