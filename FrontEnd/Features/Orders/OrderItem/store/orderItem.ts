import { create } from "zustand";
import { OrderItem } from "../types";

interface orderItemState {
  updatedOrderItems: Record<number, OrderItem>;
  deletedOrderItemIds: Set<number>;
  recordUpdate: (orderItem: OrderItem) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useOrderItemStore = create<orderItemState>((set) => ({
  updatedOrderItems: {},
  deletedOrderItemIds: new Set(),
  recordUpdate: (orderItem) =>
    set((state) => ({
      updatedOrderItems: {
        ...state.updatedOrderItems,
        [orderItem.id]: orderItem,
      },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedOrderItemIds);
      newDeleted.add(id);
      return { deletedOrderItemIds: newDeleted };
    }),
  reset: () => set({ updatedOrderItems: {}, deletedOrderItemIds: new Set() }),
}));
