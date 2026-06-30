"use server";

import { apiFetch } from "@/lib/api/fetch";

export type Client = {
  id: number;
  name: string;
  phoneNumber?: string;
  address?: string;
};

export async function getClients() {
  const result = await apiFetch<Client[]>("/Client/GetAll");
  if (!result.isSuccess) {
    return { isSuccess: false, value: [] as Client[] };
  }
  return { isSuccess: true, value: result.value };
}
