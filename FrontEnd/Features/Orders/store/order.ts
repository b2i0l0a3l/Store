import { create } from "zustand";
import { order } from "../types";

interface orderState {
  updatedOrders: Record<number, order>;
  deletedOrderIds: Set<number>;
  recordUpdate: (order: order) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useOrderStore = create<orderState>((set) => ({
  updatedOrders: {},
  deletedOrderIds: new Set(),
  recordUpdate: (order) =>
    set((state) => ({
      updatedOrders: {
        ...state.updatedOrders,
        [order.id]: order,
      },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedOrderIds);
      newDeleted.add(id);
      return { deletedOrderIds: newDeleted };
    }),
  reset: () => set({ updatedOrders: {}, deletedOrderIds: new Set() }),
}));
