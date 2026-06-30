"use server";

import { cookies } from "next/headers";

export type ApiResult<T> =
  | { isSuccess: true; value: T }
  | { isSuccess: false; status: number; message: string };

export type PagedResult<T> = {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

async function getTokens() {
  const cookieStore = await cookies();
  return {
    token: cookieStore.get("token")?.value,
    refreshToken: cookieStore.get("refreshToken")?.value,
  };
}

async function setTokens(token: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResult<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    return { isSuccess: false, status: 500, message: "API_URL not configured" };
  }

  const url = `${baseUrl}${endpoint}`;
  const { token, refreshToken } = await getTokens();

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let response = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options?.headers as Record<string, string>) },
  });

  if (response.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${baseUrl}/Auth/Refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json();
      await setTokens(refreshData.token, refreshData.refreshToken);
      headers["Authorization"] = `Bearer ${refreshData.token}`;
      response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...(options?.headers as Record<string, string>),
        },
      });
    } else {
      const cookieStore = await cookies();
      cookieStore.delete("token");
      cookieStore.delete("refreshToken");
      return { isSuccess: false, status: 401, message: "Session expired" };
    }
  }

  if (!response.ok) {
    let message = response.statusText;
    try {
      const errorBody = await response.json();
      message = errorBody.detail || errorBody.title || message;
    } catch {}
    return { isSuccess: false, status: response.status, message };
  }

  const text = await response.text();
  if (!text) {
    return { isSuccess: true, value: undefined as T };
  }

  try {
    const parsed = JSON.parse(text);
    if (parsed !== null && typeof parsed === "object" && "isSuccess" in parsed) {
      if (parsed.isSuccess) {
        return { isSuccess: true, value: parsed.value };
      }
      return {
        isSuccess: false,
        status: response.status,
        message: parsed.error || "Unknown error",
      };
    }
    return { isSuccess: true, value: parsed };
  } catch {
    return { isSuccess: true, value: text as T };
  }
}
