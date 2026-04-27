import { useEffect } from 'react';
import { db } from '../../util/db';
import { getProducts } from '../../Features/Products/api/productApi';
import { getCategories } from '../../Features/Categories/api/categoryApi';
import { getClients } from '../../Features/clients/api/clientApi';
import { getOrders } from '../../Features/Orders/api/orderApi';
import { GetDebts } from '../../Features/Debts/api/DebtApi';
import { GetPayments } from '../../Features/Payments/api/paymentApi';

export function useSyncDownlink() {
  useEffect(() => {
    const syncData = async () => {
      if (navigator.onLine) {
        try {
          // Fetch from server
          const [products, categories, clients, orders, debts, payments] = await Promise.all([
            getProducts(),
            getCategories(),
            getClients(),
            getOrders(),
            GetDebts(),
            GetPayments()
          ]);

          // Update local DB in a transaction
          await db.transaction('rw', [db.products, db.categories, db.clients, db.orders, db.debts, db.payments], async () => {
            // Bulk add/put overwrites existing entries with the same primary key
            if (products && products.length > 0) await db.products.bulkPut(products);
            if (categories && categories.length > 0) await db.categories.bulkPut(categories);
            if (clients && clients.length > 0) await db.clients.bulkPut(clients);
            if (orders && orders.length > 0) await db.orders.bulkPut(orders);
            if (debts && debts.length > 0) await db.debts.bulkPut(debts);
            if (payments && payments.length > 0) await db.payments.bulkPut(payments);
          });
          console.log('Downlink sync complete: Local DB updated from server.');
        } catch (error) {
          console.error('Downlink sync failed:', error);
        }
      }
    };

    // Initial sync
    syncData();

    // Listen for online event to sync again
    window.addEventListener('online', syncData);

    return () => {
      window.removeEventListener('online', syncData);
    };
  }, []);
}
