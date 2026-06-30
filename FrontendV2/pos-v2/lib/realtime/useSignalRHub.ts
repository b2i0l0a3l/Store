"use client";

import { useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

type HubEventHandlers = Record<string, (...args: unknown[]) => void>;

export function useSignalRHub(
  hubUrl: string,
  eventHandlers: HubEventHandlers,
  enabled = true,
) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const handlersRef = useRef(eventHandlers);
  handlersRef.current = eventHandlers;

  const startConnection = useCallback(async () => {
    if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
      return;
    }

    const token = await getAccessToken();
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${hubUrl}?access_token=${token}`)
      .withAutomaticReconnect()
      .build();

    Object.keys(handlersRef.current).forEach((event) => {
      connection.on(event, (...args) => {
        handlersRef.current[event]?.(...args);
      });
    });

    try {
      await connection.start();
      connectionRef.current = connection;
    } catch (err) {
      console.error("SignalR connection error:", err);
    }
  }, [hubUrl]);

  useEffect(() => {
    if (!enabled) return;
    startConnection();

    return () => {
      connectionRef.current?.stop();
    };
  }, [enabled, startConnection]);

  return connectionRef;
}

async function getAccessToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token");
    if (res.ok) {
      const data = await res.json();
      return data.token;
    }
  } catch {}
  return null;
}
