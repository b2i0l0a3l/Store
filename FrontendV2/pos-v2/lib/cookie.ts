"use server"
import { cookies } from "next/headers";
import { getJwtExpiry } from "./utils";

export async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get("refreshToken")?.value;
}

export async function deleteToken() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
}

export async function deleteRefreshToken() {
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");
}

export async function setToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set("token", token,{httpOnly: true,secure: true,sameSite: "strict",maxAge: getJwtExpiry(token) || 0});
} 

export async function setRefreshToken(refreshToken: string) {
    const cookieStore = await cookies();
    cookieStore.set("refreshToken", refreshToken,{httpOnly: true,secure: true,sameSite: "strict",maxAge: getJwtExpiry(refreshToken) || 0});
}

export async function clearAuth() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");
}