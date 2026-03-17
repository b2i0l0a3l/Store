import { decodeJwt } from "jose";

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJwt(token);
    if (!decoded.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime + 10;
  } catch (error) {
    return true;
  }
}
