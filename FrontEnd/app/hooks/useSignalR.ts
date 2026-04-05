import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useNotificationStore, AppNotification } from '../store/useNotificationStore';
import { getAccessToken } from '../(auth)/util/session';
import { useToastStore } from '../store/useToastStore';
import { fetchApi } from '../util/Api/Api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "");

export const useSignalR = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const { addNotification, setNotifications, setLoading } = useNotificationStore();
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    let hubConnection: signalR.HubConnection | null = null;
    let isMounted = true;

    const setupConnection = async () => {
      const token = await getAccessToken();
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchApi<AppNotification[]>('/api/v1/Notification/All');
        if (response.succeeded && response.value && isMounted) {
          setNotifications(response.value);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        if (isMounted) setLoading(false);
      }

      hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/hubs/notifications`, {
          accessTokenFactory: () => token,
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

      hubConnection.on('ReceiveNotification', (notification: AppNotification) => {
        if (isMounted) {
          addNotification(notification);
          addToast({ message: notification.title, type: notification.type === 1 ? "warning" : "info" });
        }
      });

      try {
        await hubConnection.start();
        if (isMounted) {
          setConnection(hubConnection);
        }
      } catch (err) {
        console.error('SignalR Connection Error: ', err);
      }
    };

    setupConnection();

    return () => {
      isMounted = false;
      if (hubConnection) {
        hubConnection.stop();
      }
    };
  }, [addNotification, setNotifications, addToast, setLoading]);

  return connection;
};
