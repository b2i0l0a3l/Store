import { useEffect } from "react";
import { Table } from "dexie";
import { db } from "@/util/db";

export function useSyncToLocalDb<T>(data: T[], table: Table<T, any>) {
  useEffect(() => {
    const syncData = async () => {
      // Only sync if we are online and have valid data from the server
      if (data && data.length > 0 && navigator.onLine) {
        try {
          const pendingSyncs = await db.syncQueue.count();
          if (pendingSyncs === 0) {
            // Safe to clear and replace with fresh server data to remove deleted items
            await table.clear();
            await table.bulkPut(data);
          } else {
            // Just update existing ones, don't clear so we don't lose pending optimistic items
            await table.bulkPut(data);
          }
        } catch (error) {
          console.error(`Error syncing to local DB table ${table.name}:`, error);
        }
      }
    };
    
    syncData();
  }, [data, table]);
}
