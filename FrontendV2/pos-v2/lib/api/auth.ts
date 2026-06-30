"use server";

import { apiFetch } from "./fetch";

export type UserInfo = {
  role: string;
  email: string;
  fullName: string;
};

export async function getCurrentUser(): Promise<UserInfo | null> {
  const result = await apiFetch<UserInfo>("/User/Me");
  if (result.isSuccess) {
    return result.value;
  }
  return null;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "Admin";
}

export async function isStaffOrAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "Admin" || user?.role === "Staff";
}
