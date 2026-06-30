import { setRefreshToken, setToken } from "@/lib/cookie";
import { redirect } from "next/navigation";

export default async function handleSignIn(fromData: FormData) {
  const email = fromData.get("email") as string;
  const password = fromData.get("password") as string;
  if (!email || !password) {
    return {
      isSuccess: false,
      error: "Email or Password is required",
    };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Auth/Login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      },
    );
    if (res.ok) {
      const data = await res.json();
      await setToken(data.token);
      await setRefreshToken(data.refreshToken);
      redirect("/pos");
    }
    return { isSuccess: false, error: "Invalid credentials" };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, error: "Something went wrong" };
  }
}