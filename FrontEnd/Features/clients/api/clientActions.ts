"use server";

import { revalidateTag } from "next/cache";
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
} from "./clientApi";
import { client } from "../types";
import { MyResponse } from "@/util/types";

export async function fetchClients(): Promise<client[]> {
  return getClients();
}

export async function createClientAction({
  name,
  phoneNumber,
  address,
}: {
  name: string;
  phoneNumber: string;
  address?: string;
}): Promise<MyResponse<client>> {
  const res = await addClient({ name, phoneNumber, address });
  if (res.succeeded) {
    revalidateTag("clients", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}

export async function updateClientAction({
  id,
  name,
  phoneNumber,
  address,
}: {
  id: number;
  name: string;
  phoneNumber: string;
  address?: string;
}): Promise<MyResponse<client>> {
  const res = await updateClient({ id, name, phoneNumber, address });
  if (res.succeeded) {
    revalidateTag("clients", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}

export async function deleteClientAction({
  id,
}: {
  id: Number;
}): Promise<MyResponse<string>> {
  const res = await deleteClient({ id });
  if (res.succeeded) {
    revalidateTag("clients", "max");
    revalidateTag("dashboard", "max");
  }
  return res;
}
