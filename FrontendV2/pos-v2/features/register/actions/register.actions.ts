"use server";

export default async function handleRegister(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  if (!email || !password || !fullName) {
    return { isSuccess: false, error: "All fields are required" };
  }

  try {
    const body = new FormData();
    body.append("Email", email);
    body.append("Password", password);
    body.append("FullName", fullName);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Auth/Register`,
      {
        method: "POST",
        body,
        cache: "no-store",
      },
    );

    if (res.ok) {
      return { isSuccess: true };
    }

    const text = await res.text();
    let message = "Registration failed";
    try {
      const parsed = JSON.parse(text);
      message = parsed.detail || parsed.title || message;
    } catch {}
    return { isSuccess: false, error: message };
  } catch (err) {
    console.log(err);
    return { isSuccess: false, error: "Something went wrong" };
  }
}
