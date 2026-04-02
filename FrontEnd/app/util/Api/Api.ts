import { getAccessToken } from "../../(auth)/util/session";
import { MyResponse } from "../types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function buildHeaders(options: RequestInit) {
  const token = await getAccessToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

async function makeRequest(
  endpoint: string,
  options: RequestInit,
  headers: Headers,
) {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

async function parseResponse<T>(res: Response): Promise<MyResponse<T>> {
  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    return {
      message: errorText,
      succeeded: false,
      statusCode: res.status,
      value: null,
    } as MyResponse<T>;
  }

  if (res.status === 204) {
    return {
      message: "Success",
      succeeded: true,
      statusCode: res.status,
      value: null,
    } as MyResponse<T>;
  }

  try {
    const data = await res.json();
    return {
      message: "Success",
      succeeded: true,
      statusCode: res.status,
      value: data,
    } as MyResponse<T>;
  } catch (error) {
    console.error("Fetch API Parse Error:", error);
    return {
      message: "Parse Error",
      succeeded: false,
      statusCode: 500,
      value: null,
    } as MyResponse<T>;
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<MyResponse<T>> {
  let res: Response;

  try {
    const headers = await buildHeaders(options);
    res = await makeRequest(endpoint, options, headers);
  } catch (error) {
    console.error("Fetch API Network Error:", error);
    return {
      message: "Network Error",
      succeeded: false,
      statusCode: 500,
      value: null,
    } as MyResponse<T>;
  }

  if (res.status === 401) {
    return {
      message: "Unauthorized",
      succeeded: false,
      statusCode: 401,
      value: null,
    } as MyResponse<T>;
  }

  return parseResponse<T>(res);
}
