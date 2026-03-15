import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "../../(auth)/util/session";
import { AuthResponse, Logout, refresh } from "@/app/(auth)/api/authApi";
import { CurrentUser } from "../currentUser";
import { redirect } from "next/navigation";

async function handleLogout(email: string, refreshToken: string) {
  await clearTokens();
  await Logout({ email: email, refreshToken: refreshToken });
}

async function updateTokens(ref: AuthResponse) {
  await setAccessToken(ref.accessToken!);
  await setRefreshToken(ref.refreshToken!);
}

export async function handleRefreshToken(): Promise<string | null> {
  try {
    const r = await CurrentUser();
    if (r === null) redirect("/login");
    const rt = await getRefreshToken();
    if (rt === null) redirect("/login");

    const ref: AuthResponse = await refresh({
      email: r.email,
      refreshToken: rt!,
    });

    if (ref.isSuccess) {
      await updateTokens(ref);
      return ref.accessToken!;
    } else {
      await handleLogout(r.email, rt!);
      redirect("/login");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Refresh token error:", error);
    redirect("/login");
  }
}
