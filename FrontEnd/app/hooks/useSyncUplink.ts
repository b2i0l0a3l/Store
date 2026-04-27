import { useEffect } from 'react';
import { db } from '../../util/db';
import { toast } from '../../store/useToastStore';
import { syncHandlers } from '../../util/syncRegistry';

export function useSyncUplink() {
  useEffect(() => {
    const processQueue = async () => {
      if (!navigator.onLine) return;

      const pendingItems = await db.syncQueue.where('status').equals('pending').toArray();
      if (pendingItems.length === 0) return;

      toast.info(`Syncing ${pendingItems.length} offline actions...`);

      for (const item of pendingItems) {
        try {
          const handler = syncHandlers[item.type];
          if (handler) {
            const res = await handler(item.payload);
            if (res.succeeded) {
              await db.syncQueue.delete(item.id!);
            } else {
              await db.syncQueue.update(item.id!, { status: 'failed', error: res.message });
            }
          } else {
            console.warn(`No sync handler found for type: ${item.type}`);
            await db.syncQueue.update(item.id!, { status: 'failed', error: 'No handler found' });
          }
        } catch (error: any) {
          console.error(`Failed to sync item ${item.id}:`, error);
          await db.syncQueue.update(item.id!, { status: 'failed', error: error.message });
        }
      }

      const remaining = await db.syncQueue.where('status').equals('pending').count();
      if (remaining === 0) {
        toast.success("All offline actions synchronized.");
      } else {
        toast.error("Some offline actions failed to synchronize.");
      }
    };

    // Initial check
    processQueue();

    // Listen for online event to process queue
    window.addEventListener('online', processQueue);

    return () => {
      window.removeEventListener('online', processQueue);
    };
  }, []);
}
