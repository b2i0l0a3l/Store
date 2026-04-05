"use client";

import { usePathname } from "next/navigation";
import { user } from "@/app/util/types";
import GetImageFromBackEnd from "@/app/util/GetImageFromBackEnd";
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
      className="hidden md:flex items-center justify-between sticky top-0 z-30 px-6 py-3 
        bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50"
    >
      <div className="flex items-center gap-3">
        <div
          style={{
            width: "4px",
            height: "24px",
            borderRadius: "9999px",
            background: "linear-gradient(to bottom, #3b82f6, #22d3ee)",
          }}
        />
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {pageMeta.title}
        </h2>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <NotificationBell />
          
          <div className="flex items-center gap-3">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "1px",
              }}
            >
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "white",
                lineHeight: 1.3,
              }}
            >
              {user.fullName || user.email}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "#94a3b8",
                textTransform: "capitalize",
                lineHeight: 1.3,
              }}
            >
              {user.role}
            </span>
          </div>

          <div
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              padding: "2px",
              flexShrink: 0,
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={user.fullName || "User avatar"}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #0f172a",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#1e293b",
                  border: "2px solid #0f172a",
                  color: "#93c5fd",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {initials}
              </div>
            )}

            <div
              style={{
                position: "absolute",
                bottom: "1px",
                right: "1px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#22c55e",
                border: "2px solid #0f172a",
              }}
            />
          </div>
        </div>
        </div>
      )}
    </header>
  );
}
