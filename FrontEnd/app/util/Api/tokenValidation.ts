import { decodeJwt } from "jose";

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJwt(token);
    if (!decoded.exp) return false;

    // Add a 10 second buffer
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime + 10;
  } catch (error) {
    return true; // If we can't decode it, consider it expired to force a refresh/login
  }
}
