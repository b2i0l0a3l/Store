import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  );
}
export function getJwtExpiry(token: string | undefined | null): number | null {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    if (!base64Payload) return null;
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedPayload = JSON.parse(payloadBuffer.toString());
    return updatedPayload.exp || null;

  } catch (error) {
    console.error("failed to get jwt expiry", error);
    return null;
  }
}

export async function isTokenValid({token}:{token:string | undefined}):Promise<Boolean>{
  if(!token){
    return Promise.resolve(false);
  }
  const expiry = getJwtExpiry(token); 
  if(!expiry){
    return Promise.resolve(false);
  }
  const now = Date.now() / 1000;
  if(now > expiry){
    return false;
  }
  return true;
}
