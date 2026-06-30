import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json([], { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Notification/All`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    try {
      const parsed = JSON.parse(text);
      if (parsed.isSuccess) {
        return NextResponse.json(parsed.value);
      }
    } catch {}
    return NextResponse.json([], { status: res.status });
  }

  const text = await res.text();
  if (!text) return NextResponse.json([]);

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object" && "isSuccess" in parsed) {
      return NextResponse.json(parsed.isSuccess ? parsed.value : []);
    }
    return NextResponse.json(Array.isArray(parsed) ? parsed : []);
  } catch {
    return NextResponse.json([]);
  }
}
