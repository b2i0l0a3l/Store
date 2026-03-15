import { decodeJwt } from "jose";
import { getAccessToken } from "../(auth)/util/session";
import { user } from "./types";

type JwtPayload = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
};

export async function CurrentUser(): Promise<user | null> {
  const token = await getAccessToken();

  if (token === null || token === undefined) return null;
  const decoded = decodeJwt<JwtPayload>(token);

  const email =
    decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];
  const role = decoded[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ] as string;

  return { email, role };
}
