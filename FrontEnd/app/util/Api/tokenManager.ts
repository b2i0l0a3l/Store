import {
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
  console.log("inside update ref",ref);
  await clearTokens();
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
    console.log("ref",ref);
    if (ref.isSuccess) {
      await updateTokens(ref);
      return ref.accessToken!;
    } 
    return null;
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
}
