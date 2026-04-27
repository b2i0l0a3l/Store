import Dexie, { Table } from 'dexie';
import { product } from '../Features/Products/types';
import { category } from '../Features/Categories/types';
import { client } from '../Features/clients/types';
import { order } from '../Features/Orders/types';
import { Debt } from '../Features/Debts/types';
import { Payment } from '../Features/Payments/types';
import { OrderItem } from '../Features/Orders/OrderItem/types';

export interface SyncOperation {
  id?: number;
  type: 'BUY' | 'CREDIT' | 'ADD_CLIENT' | 'UPDATE_CLIENT' | 'DELETE_CLIENT' | 'DELETE_ORDER' | 'ADD_PAYMENT' | 'UPDATE_PAYMENT' | 'DELETE_PAYMENT' | 'ADD_CATEGORY' | 'UPDATE_CATEGORY' | 'DELETE_CATEGORY' | 'ADD_PRODUCT' | 'UPDATE_PRODUCT' | 'DELETE_PRODUCT';
  payload: any;
  createdAt: Date;
  status: 'pending' | 'failed';
  error?: string;
}

export class StoreDB extends Dexie {
  products!: Table<product, number>;
  categories!: Table<category, number>;
  clients!: Table<client, number>;
  orders!: Table<order, number>;
  orderItems!: Table<OrderItem, number>;
  debts!: Table<Debt, number>;
  payments!: Table<Payment, number>;
  syncQueue!: Table<SyncOperation, number>;

  constructor() {
    super('StorePOSDB');
    this.version(3).stores({
      products: 'id, name, barCode, categoryName', // Primary key and indexed props
      categories: 'id, name',
      clients: 'id, name, phoneNumber',
      orders: 'id, clientName, orderType, orderStatus, createdAt',
      orderItems: '++id, orderId, productId, productName',
      debts: 'id, clientName, orderId',
      payments: 'id, debtId, clientName, paidAt',
      syncQueue: '++id, type, status, createdAt' // ++ means auto-increment
    });
  }
}

export const db = new StoreDB();
