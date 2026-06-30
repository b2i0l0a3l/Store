"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSignalRHub } from "@/lib/realtime/useSignalRHub";

export function DashboardLiveSync() {
  const queryClient = useQueryClient();

  useSignalRHub(
    "/hubs/dashboard",
    {
      ReceiveDashboardUpdate: () => {
        queryClient.invalidateQueries({ queryKey: ["dashboard-"] });
      },
    },
    true,
  );

  return null;
}
