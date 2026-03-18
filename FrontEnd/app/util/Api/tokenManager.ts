import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "../../(auth)/util/session";
import { AuthResponse, Logout, refresh } from "@/app/(auth)/api/authApi";
import { CurrentUser } from "../currentUser";

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
    if (r === null) return null;
    const rt = await getRefreshToken();
    if (rt === undefined || rt === null) return null;
    const ref: AuthResponse = await refresh({
      email: r.email,
      refreshToken: rt,
    });
    if (ref.isSuccess) {
      await updateTokens(ref);
      return ref.accessToken!;
    } else {
      await handleLogout(r.email, rt);
      return null;
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
}
