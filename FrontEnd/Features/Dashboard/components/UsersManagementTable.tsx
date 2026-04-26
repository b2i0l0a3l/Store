"use client";

import { useState, useTransition } from "react";
import { UserModel } from "../types";
import { changeUserRoleAction } from "../api/dashboardActions";
import { toast } from "@/store/useToastStore";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import MyTable, { Column } from "@/components/Ui/customtable/MyTable";

const ROLES = ["Admin", "Staff"];

const ROLE_STYLES: Record<string, string> = {
  Admin: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Staff: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UsersManagementTable({
  initialUsers,
  currentUserId,
}: {
  initialUsers: UserModel[];
  currentUserId?: string;
}) {
  const [users, setUsers] = useState<UserModel[]>(initialUsers);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleRoleChange(userId: string, newRole: string) {
    const user = users.find((u) => u.userId === userId);
    if (!user || user.role === newRole) return;

    setPendingUserId(userId);

    startTransition(async () => {
      const res = await changeUserRoleAction(userId, newRole);

      if (res.succeeded) {
        setUsers((prev) =>
          prev.map((u) => (u.userId === userId ? { ...u, role: newRole } : u)),
        );
        toast.success(
          `Role updated to "${newRole}" for ${user.fullName || user.email}`,
        );
      } else {
        toast.error(
          res.message ||
            `Failed to update role for ${user.fullName || user.email}`,
        );
      }

      setPendingUserId(null);
    });
  }

  const columns: Column<UserModel>[] = [
    {
      key: "fullName",
      label: "User",
      render: (user) => (
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            {getInitials(user.fullName || user.email)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-white truncate max-w-[160px]">
              {user.fullName || "—"}
            </span>
            {user.userId === currentUserId && (
              <span className="text-[10px] text-blue-400 font-semibold">
                You
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (user) => (
        <span className="text-slate-300 truncate">{user.email}</span>
      ),
    },
    {
      key: "role",
      label: "Current Role",
      render: (user) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
            ROLE_STYLES[user.role] ?? "bg-slate-700 text-slate-300"
          }`}
        >
          {user.role}
        </span>
      ),
    },
    {
      key: "userId",
      label: "Change Role",
      render: (user) => {
        const isCurrentUser = user.userId === currentUserId;
        const isLoading = isPending && pendingUserId === user.userId;

        return (
          <div className="relative w-36">
            <select
              value={user.role}
              disabled={isLoading || isCurrentUser}
              onChange={(e) => handleRoleChange(user.userId, e.target.value)}
              className={`w-full appearance-none text-sm px-3 py-2 pr-8 rounded-lg border transition-all duration-200 outline-none focus:ring-2 focus:ring-violet-500/50
                ${
                  isCurrentUser
                    ? "bg-slate-800/40 border-slate-700/40 text-slate-500 cursor-not-allowed"
                    : "bg-slate-800 border-slate-600 text-white hover:border-violet-500/60 cursor-pointer"
                }
                ${isLoading ? "opacity-60 cursor-wait" : ""}
              `}
              title={
                isCurrentUser ? "You cannot change your own role" : undefined
              }
            >
              {ROLES.map((r) => (
                <option key={r} value={r} className="bg-slate-800">
                  {r}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              {isLoading ? (
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-violet-500/20 text-violet-400 rounded-lg shadow-lg shadow-violet-500/10">
          <ShieldCheckIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">User Management</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {users.length} registered user{users.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <MyTable<UserModel>
        columns={columns}
        data={users}
        totalCount={users.length}
        pageSize={8}
      />
    </div>
  );
}
