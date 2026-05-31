import { useEffect } from "react";
import { Table } from "dexie";
import { db } from "@/util/db";

export function useSyncToLocalDb<T>(data: T[], table: Table<T, any>) {
  useEffect(() => {
    const syncData = async () => {
      if (data && data.length > 0 && navigator.onLine) {
        try {
          const pendingSyncs = await db.syncQueue.count();
          if (pendingSyncs === 0) {
            await table.clear();
            await table.bulkPut(data);
          } else {
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
