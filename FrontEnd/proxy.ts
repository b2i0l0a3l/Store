import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { CurrentTokenId } from "./util/currentUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const routePermissions = [
  { path: "/Dashboard", allowedRoles: ["Admin"] },
  { path: "/Products", allowedRoles: ["Admin"] },
  { path: "/Clients", allowedRoles: ["Admin"] },
  { path: "/Categories", allowedRoles: ["Admin"] },
  { path: "/Orders", allowedRoles: ["Admin", "Staff"] },
  { path: "/Debts", allowedRoles: ["Admin"] },
  { path: "/Payments", allowedRoles: ["Admin"] },
  { path: "/unauthorized", allowedRoles: ["User", "Admin", "Staff"] },
  { path: "/", allowedRoles: ["Admin", "Staff"], exact: true },
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
    return (decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] as string) || null;
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
      isAllowed = routePermissions.find((r) => r.path === "/")?.allowedRoles?.includes(role) ?? false;
    } else {
      const permission = routePermissions.find((r) => !r.exact && pathname.startsWith(r.path));
      if (permission) {
        isAllowed = permission.allowedRoles?.includes(role) ?? false;
      } else {
        isAllowed = true;
      }
    }
    
    if (!isAllowed) {
      let fallbackPath;
      if (role === "User") {
        fallbackPath = "/unauthorized";
      } else if (role === "Admin") {
        fallbackPath = "/Dashboard";
      } else {
        fallbackPath = "/";
      }
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
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/landing";

  if (!accessToken || !refreshToken) {
    if (isAuthPage) {
      return NextResponse.next(); 
    }
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  if (!isTokenExpired(accessToken)) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const redirectPath = getRoleAccessRedirect(accessToken, pathname);
    if (redirectPath) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    return NextResponse.next();
  }

  const email = getEmailFromToken(accessToken);
  if (!email) {
    if (isAuthPage) return NextResponse.next();
    const response = NextResponse.redirect(new URL("/landing", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  try {
    const TokenID = await CurrentTokenId();
    const refreshResponse = await fetch(`${API_URL}/Auth/Refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email, refreshToken, TokenID }),
    });

    if (!refreshResponse.ok) {
      if (isAuthPage) return NextResponse.next();
      const response = NextResponse.redirect(new URL("/landing", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    const data = await refreshResponse.json();
    const newAccessToken = data.accessToken;

    if (isAuthPage) {
       const response = NextResponse.redirect(new URL("/", request.url));
       response.cookies.set("accessToken", newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
       response.cookies.set("refreshToken", data.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
       return response;
    }

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
    if (isAuthPage) return NextResponse.next();
    const response = NextResponse.redirect(new URL("/landing", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
