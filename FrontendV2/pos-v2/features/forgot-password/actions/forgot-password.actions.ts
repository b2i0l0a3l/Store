"use server";

export default async function handleForgotPassword(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { isSuccess: false, error: "Email is required" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Auth/ForgotPassword`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        cache: "no-store",
      },
    );

    if (res.ok) {
      return { isSuccess: true };
    }

    return {
      isSuccess: false,
      error:
        "Password reset is not available yet. Please contact support.",
    };
  } catch {
    return {
      isSuccess: false,
      error:
        "Password reset is not available yet. Please contact support.",
    };
  }
}
