import { fetchApi } from "@/app/util/Api/Api";
import { client } from "../types";
import { MyResponse } from "@/app/util/types";

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
}: {
  name: string;
  phoneNumber: string;
}): Promise<MyResponse<client>> {
  return await fetchApi<client>(`/Client/Add`, {
    method: "POST",
    body: JSON.stringify({ name, phoneNumber }),
  });
}

export async function updateClient({
  id,
  name,
  phoneNumber,
}: {
  id: string;
  name: string;
  phoneNumber: string;
}): Promise<MyResponse<client>> {
  return await fetchApi<client>(`/Client/Update`, {
    method: "PUT",
    body: JSON.stringify({ id, name, phoneNumber }),
  });
}

export async function deleteClient({ id }: { id: Number }): Promise<MyResponse<string>> {
  return await fetchApi<string>(`/Client/Delete/${id}`, {
    method: "DELETE",
  });
}
