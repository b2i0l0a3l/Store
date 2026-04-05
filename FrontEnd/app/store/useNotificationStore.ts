import { create } from 'zustand';

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  type: number; // 0=NewOrder, 1=LowStock, etc...
  createdAt: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  isLoading: boolean;
  setNotifications: (tasks: AppNotification[]) => void;
  addNotification: (notification: AppNotification) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  setLoading: (val: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: true,

  setNotifications: (notifications) => set({
    notifications,
    unreadCount: notifications.filter(n => !n.isRead).length
  }),

  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
    unreadCount: state.unreadCount + 1
  })),

  markAsRead: (id) => set((state) => {
    const updated = state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    return {
      notifications: updated,
      unreadCount: updated.filter(n => !n.isRead).length
    };
  }),

  markAllAsRead: () => set((state) => {
    const updated = state.notifications.map(n => ({ ...n, isRead: true }));
    return {
      notifications: updated,
      unreadCount: 0
    };
  }),

  setLoading: (isLoading) => set({ isLoading }),
}));
