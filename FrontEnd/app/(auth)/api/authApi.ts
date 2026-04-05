import { getAccessToken, getRefreshToken } from "@/app/(auth)/util/session";
import { API_URL, fetchApi } from "@/app/util/Api/Api";
import { CurrentTokenId, CurrentUser } from "@/app/util/currentUser";
import { MyResponse } from "@/app/util/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}
export interface RefreshTokenRequest {
  email: string;
  refreshToken: string;
}
export interface LogoutRequest {
  email: string;
  refreshToken: string;
}

export interface AuthResponse {
  isSuccess: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  errors?: string[];
}

export async function login(body: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/Auth/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return {
      isSuccess: true,
      accessToken: data.accessToken,
      message: "Login successful",
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "Network error. Please try again." };
  }
}

export async function register(formData: FormData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/Auth/Register`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return { isSuccess: true, message: "Register successful" };
  } catch (error) {
    console.error("Register error:", error);
    return { isSuccess: false, message: "Network error. Please try again." };
  }
}

export async function refresh(
  body: RefreshTokenRequest,
): Promise<AuthResponse> {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_URL}/Auth/Refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      return { isSuccess: false, message: "Refresh failed" };
    }

    const data = await response.json();
    return {
      isSuccess: true,
      message: "Refresh successful",
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    return { isSuccess: false, message: "Network error. Please try again." };
  }
}

export async function Logout(): Promise<AuthResponse> {
  try {
    const user = await CurrentUser();
    const refreshToken = await getRefreshToken();
    const TokenId = await CurrentTokenId();
    const response = await fetch(`${API_URL}/Auth/Logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify({email:user?.email,tokenId :TokenId,refreshToken: refreshToken}),
    });
    await response.json();
    return { isSuccess: true, message: "Logout successful" };
  } catch (error) {
    return { isSuccess: false, message: "Network error. Please try again." };
  }
}
