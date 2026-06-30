"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bell, BellDot, CheckCheck, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSignalRHub } from "@/lib/realtime/useSignalRHub";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Notification = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  type: number;
  createdAt: string;
  relatedEntityId?: number;
  relatedEntityType?: string;
};

type UnreadCount = { count: number };

async function fetchNotifications(): Promise<Notification[]> {
  const res = await fetch("/api/notifications");
  if (!res.ok) return [];
  return res.json();
}

async function fetchUnreadCount(): Promise<number> {
  const res = await fetch("/api/notifications/unread");
  if (!res.ok) return 0;
  const data: UnreadCount = await res.json();
  return data.count;
}

export default function Notifictaion() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: open,
    staleTime: 1000 * 30,
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications-unread"],
    queryFn: fetchUnreadCount,
    refetchInterval: 30000,
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/notifications/mark-all-read", {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread"] });
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/notifications/mark-read/${id}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread"] });
    },
  });

  useSignalRHub(
    "/hubs/notifications",
    {
      ReceiveNotification: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        queryClient.invalidateQueries({ queryKey: ["notifications-unread"] });
      },
    },
    true,
  );

  const getEntityLink = (notif: Notification): string | null => {
    if (notif.relatedEntityType === "Order" && notif.relatedEntityId) {
      return `/orders/${notif.relatedEntityId}`;
    }
    return null;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 ? (
            <>
              <BellDot className="h-[1.2rem] w-[1.2rem] text-primary" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </>
          ) : (
            <Bell className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96" align="end">
        <div className="flex items-center justify-between px-2 py-1.5 border-b">
          <span className="text-sm font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
            >
              {markAllRead.isPending ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <CheckCheck className="h-3 w-3 mr-1" />
              )}
              Mark all read
            </Button>
          )}
        </div>

        <div className="overflow-y-auto max-h-72">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notif) => {
              const link = getEntityLink(notif);
              const content = (
                <DropdownMenuItem
                  key={notif.id}
                  className={cn(
                    "flex flex-col items-start gap-0.5 py-3 cursor-pointer",
                    !notif.isRead && "bg-muted/50",
                  )}
                  onClick={() => {
                    if (!notif.isRead) markRead.mutate(notif.id);
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        !notif.isRead && "font-semibold",
                      )}
                    >
                      {notif.title}
                    </span>
                    {!notif.isRead && (
                      <span className="size-1.5 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2">
                    {notif.message}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </DropdownMenuItem>
              );

              return link ? (
                <Link key={notif.id} href={link}>
                  {content}
                </Link>
              ) : (
                <div key={notif.id}>{content}</div>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
