import { create } from "zustand";
import { ReturnOrder } from "../types";

interface returnState {
  updatedReturns: Record<number, ReturnOrder>;
  deletedReturnIds: Set<number>;
  recordUpdate: (returnOrder: ReturnOrder) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useReturnStore = create<returnState>((set) => ({
  updatedReturns: {},
  deletedReturnIds: new Set(),
  recordUpdate: (returnOrder) =>
    set((state) => ({
      updatedReturns: {
        ...state.updatedReturns,
        [returnOrder.id]: returnOrder,
      },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedReturnIds);
      newDeleted.add(id);
      return { deletedReturnIds: newDeleted };
    }),
  reset: () => set({ updatedReturns: {}, deletedReturnIds: new Set() }),
}));
