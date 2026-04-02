import { fetchApi } from "@/app/util/Api/Api";
import { client } from "../types";

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
}): Promise<client | null> {
  try {
    const result = await fetchApi< client >(`/Client/Add`, {
      method: "POST",
      body: JSON.stringify({ name, phoneNumber }),
    });
    if (!result.succeeded || !result) {
      return null;
    }
    return result.value;
  } catch (error) {
    console.error(error); 
    return null;
  }
}

export async function updateClient({
  id,
  name,
  phoneNumber,
}: {
  id: string;
  name: string;
  phoneNumber: string;
}): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: client[] }>(`/Client/Update`, {
      method: "PUT",
      body: JSON.stringify({ id, name, phoneNumber }),
    });

    if (!result.succeeded || !result.value) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteClient({ id }: { id: Number }): Promise<boolean> {
  try {
    const result = await fetchApi<{ value: client[] }>(`/Client/Delete/${id}`, {
      method: "DELETE",
    });

    if (!result.succeeded || !result.value) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
