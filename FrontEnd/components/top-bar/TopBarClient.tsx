"use client";

import { usePathname } from "next/navigation";
import { user } from "@/util/types";
import GetImageFromBackEnd from "@/util/GetImageFromBackEnd";
import NotificationBell from "./NotificationBell";

interface TopBarClientProps {
  user: user | null;
}

const PAGE_META: Record<string, { title: string }> = {
  "/": { title: "Home" },
  "/Dashboard": { title: "Dashboard" },
  "/Products": { title: "Products" },
  "/Clients": { title: "Clients" },
  "/Categories": { title: "Categories" },
  "/Orders": { title: "Orders" },
  "/Debts": { title: "Debts" },
  "/Payments": { title: "Payments" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TopBarClient({ user }: TopBarClientProps) {
  const pathname = usePathname();

  const pageMeta = PAGE_META[pathname] ?? {
    title: pathname.replace("/", ""),
  };

  const initials = user?.fullName ? getInitials(user.fullName) : "?";

  const imageUrl = GetImageFromBackEnd(user?.imagePath || "");

  return (
    <header
      id="top-bar"
      className="hidden md:flex items-center justify-between sticky top-0 z-30 px-5 py-2.5 bg-[#0a1120]/95 backdrop-blur-md border-b border-white/5 shadow-sm"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400" />
        <h2 className="text-xl font-bold text-white tracking-tight m-0">
          {pageMeta.title}
        </h2>
      </div>

      {user && (
        <div className="flex items-center gap-5">
          <NotificationBell />

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[13px] font-semibold text-white leading-none">
                {user.fullName || user.email}
              </span>
              <span className="text-[11px] font-medium text-slate-400 capitalize leading-none">
                {user.role}
              </span>
            </div>

            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[2px] shrink-0 shadow-sm">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={user.fullName || "User avatar"}
                  className="w-full h-full rounded-full object-cover border-[1.5px] border-slate-900"
                />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center bg-slate-800 border-[1.5px] border-slate-900 text-blue-300 text-xs font-bold tracking-wide">
                  {initials}
                </div>
              )}

              <div className="absolute bottom-[1px] right-[1px] w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-slate-900" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
