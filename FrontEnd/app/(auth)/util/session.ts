"use server";
import { cookies } from "next/headers";

export async function setAccessToken(accessToken: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    // Ignore error if we are in a server component
  }
}

export async function setRefreshToken(refreshToken: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    // Ignore error if we are in a server component
  }
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}
export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("refreshToken")?.value;
}

export async function clearTokens(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error) {
    // Ignore error if we are in a server component
  }
}
