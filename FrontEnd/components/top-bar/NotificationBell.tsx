"use client";

import { useState, useRef, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useSignalR } from "@/app/hooks/useSignalR";
import { useNotificationStore } from "@/store/useNotificationStore";
import { fetchApi } from "@/util/Api/Api";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useSignalR();

  const { notifications, unreadCount, markAsRead, markAllAsRead, isLoading } =
    useNotificationStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    if (isRead) return;
    try {
      const resp = await fetchApi(`/Notification/MarkAsRead/${id}`, {
        method: "PUT",
      });
      if (resp.succeeded) {
        markAsRead(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const resp = await fetchApi("/Notification/MarkAllAsRead", {
        method: "PUT",
      });
      if (resp.succeeded) {
        markAllAsRead();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (dateString: string) => {
    const d = new Date(dateString);
    return (
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
      " " +
      d.toLocaleDateString()
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition"
      >
        <BellIcon className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border border-slate-800 transform translate-x-1/4 -translate-y-1/4">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/50 bg-slate-800/50">
            <h3 className="font-semibold text-slate-100">الإشعارات</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-400 hover:text-blue-300 transition"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto w-full custom-scrollbar">
            {isLoading ? (
              <div className="p-4 text-center text-slate-400 text-sm">
                جاري التحميل...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-sm">
                لا توجد إشعارات حالياً
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleMarkAsRead(notif.id, notif.isRead)}
                    className={`flex flex-col p-3 border-b border-slate-700/30 cursor-pointer hover:bg-slate-800/80 transition ${notif.isRead ? "opacity-60" : "bg-slate-800/30"}`}
                  >
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <span
                        className={`text-sm font-semibold ${notif.type === 1 ? "text-rose-400" : "text-blue-400"}`}
                      >
                        {notif.title}
                      </span>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                      )}
                    </div>
                    <p
                      className="text-xs text-slate-300 leading-relaxed text-right"
                      dir="rtl"
                    >
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-slate-500 mt-2 text-right">
                      {formatTime(notif.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
