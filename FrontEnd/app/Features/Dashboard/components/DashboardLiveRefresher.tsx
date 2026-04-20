"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as signalR from "@microsoft/signalr";
import { getAccessToken } from "@/app/(auth)/util/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "");

export default function DashboardLiveRefresher() {
  const router = useRouter();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    let hubConnection: signalR.HubConnection | null = null;
    let isMounted = true;

    const setupConnection = async () => {
      const token = await getAccessToken();
      
      if (!token) return;

      hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/hubs/dashboard`, {
          accessTokenFactory: () => token,
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

      hubConnection.on("ReceiveDashboardUpdate", () => {
        if (isMounted) {
          router.refresh(); // Refresh server components natively
        }
      });

      try {
        await hubConnection.start();
        if (isMounted) {
          setConnection(hubConnection);
        }
      } catch (err) {
        console.error("Dashboard SignalR Connection Error: ", err);
      }
    };

    setupConnection();

    return () => {
      isMounted = false;
      if (hubConnection) {
        hubConnection.stop();
      }
    };
  }, [router]);

  // Hidden component that manages background connection
  return null;
}
