import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ count: 0 }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Notification/Unread`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return NextResponse.json({ count: 0 });
  }

  const text = await res.text();
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object" && "isSuccess" in parsed) {
      return NextResponse.json(parsed.isSuccess ? parsed.value : { count: 0 });
    }
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
