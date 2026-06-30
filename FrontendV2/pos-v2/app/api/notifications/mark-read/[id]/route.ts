import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Notification/MarkAsRead/${id}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed" }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
