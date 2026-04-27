"use client";
import { useEffect, useState } from 'react';
import { useSyncDownlink } from '@/app/hooks/useSyncDownlink';
import { useSyncUplink } from '@/app/hooks/useSyncUplink';
import { WifiIcon } from '@heroicons/react/24/solid';

export default function OfflineManager() {
  const [isOffline, setIsOffline] = useState(false);

  // Initialize sync hooks globally
  useSyncDownlink();
  useSyncUplink();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-red-600/90 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 text-sm font-medium backdrop-blur-sm border border-red-500/50">
      <WifiIcon className="w-4 h-4" />
      You are currently offline. Changes are saved locally and will sync when reconnected.
    </div>
  );
}
