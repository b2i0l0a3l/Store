import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { CurrentTokenId } from "./app/util/currentUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const routePermissions = [
  { path: "/Dashboard", allowedRoles: ["Admin"] },
  { path: "/Products", allowedRoles: ["Admin", "Staff", "Viewer"] },
  { path: "/Clients", allowedRoles: ["Admin", "Staff"] },
  { path: "/Categories", allowedRoles: ["Admin", "Staff", "Viewer"] },
  { path: "/Orders", allowedRoles: ["Admin", "Staff"] },
  { path: "/Debts", allowedRoles: ["Admin", "Staff"] },
  { path: "/Payments", allowedRoles: ["Admin", "Staff"] },
  { path: "/", allowedRoles: ["Admin"], exact: true },
];

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

function getRoleAccessRedirect(token: string, pathname: string): string | null {
  try {
    const decoded = decodeJwt(token);
    const role = decoded[ROLE_CLAIM] as string;

    let isAllowed = false;
    if (pathname === "/") {
      isAllowed = routePermissions.find(r => r.path === "/")?.allowedRoles?.includes(role) ?? false;
    } else {
      const permission = routePermissions.find((r) => !r.exact && pathname.startsWith(r.path));
      if (permission) {
        isAllowed = permission.allowedRoles?.includes(role) ?? false;
      } else {
        isAllowed = true;
      }
    }
    if (!isAllowed) {
      const fallbackPath = role === "Admin" ? "/" : "/Products";
      if (pathname !== fallbackPath) return fallbackPath;
    }
    return null;
  } catch {
    return "/login";
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const TokenID = await CurrentTokenId();
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if(pathname === "/login" || pathname === "/register"){
    if(accessToken && refreshToken){
      request.cookies.clear();
    }
  }

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isTokenExpired(accessToken)) {
    const redirectPath = getRoleAccessRedirect(accessToken, pathname);
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
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
      body: JSON.stringify({ email, refreshToken, TokenID }),
    });

    if (!refreshResponse.ok) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    const data = await refreshResponse.json();
    const newAccessToken = data.accessToken;

    const redirectPath = getRoleAccessRedirect(newAccessToken, pathname);
    let finalResponse = NextResponse.next();
    
    if (redirectPath) {
       finalResponse = NextResponse.redirect(new URL(redirectPath, request.url));
    }

    finalResponse.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    finalResponse.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return finalResponse;
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
