"use server";

import { apiFetch, type ApiResult } from "@/lib/api/fetch";

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}): Promise<ApiResult<unknown>> {
  return apiFetch("/User/ChangePassword", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
