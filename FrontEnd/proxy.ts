import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { CurrentTokenId } from "./app/util/currentUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJwt(token);
    if (!decoded.exp) return false;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime + 10;
  } catch {
    return true;
  }
}

function getEmailFromToken(token: string): string | null {
  try {
    const decoded = decodeJwt(token);
    return (
      (decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ] as string) || null
    );
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const TokenID = await CurrentTokenId();
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!accessToken || !refreshToken ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isTokenExpired(accessToken)) {
    return NextResponse.next();
  }

  const email = getEmailFromToken(accessToken);
  if (!email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const refreshResponse = await fetch(`${API_URL}/Auth/Refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email, refreshToken, TokenID}),
    });

    if (!refreshResponse.ok) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    const data = await refreshResponse.json();

    const response = NextResponse.next();
    response.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Proxy refresh error:", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
