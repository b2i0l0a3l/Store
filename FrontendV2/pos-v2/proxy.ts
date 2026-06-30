import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "./lib/utils";

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/forgot-password"];


export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_ROUTES.some((route) => pathname.includes(route))) {
    return handleAuthRoute(request);
  }
  return handleProtectedRoutes(request);
}

async function handleAuthRoute(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (token && refreshToken && (await isTokenValid({ token }))) {
    return NextResponse.redirect(new URL("/pos", request.url));
  }

  return NextResponse.next();
}

async function handleTokenRefresh(
  request: NextRequest,
  currentRefreshToken: string,
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Auth/Refresh`,
      {
        method: "POST",
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const data = await res.json();
    const response = NextResponse.next();

    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    response.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    request.cookies.set("token", data.token);
    request.cookies.set("refreshToken", data.refreshToken);

    return response;
  } catch (error) {
    console.error("error while refreshing token", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

async function handleProtectedRoutes(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!token || !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (!(await isTokenValid({ token }))) {
    return await handleTokenRefresh(request, refreshToken);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pos/:path*",
    "/product/:path*",
    "/orders/:path*",
    "/clients/:path*",
    "/debts/:path*",
    "/payments/:path*",
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
  ],
};
