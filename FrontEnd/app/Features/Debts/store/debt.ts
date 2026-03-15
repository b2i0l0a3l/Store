import { create } from "zustand";
import { order } from "@/app/Features/Orders/types";

export interface DebtUpdate extends Partial<order> {
  id: number;
}

interface debtState {
  updatedDebts: Record<number, DebtUpdate>;
  deletedDebtIds: Set<number>;
  recordUpdate: (debt: DebtUpdate) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useDebtStore = create<debtState>((set) => ({
  updatedDebts: {},
  deletedDebtIds: new Set(),
  recordUpdate: (debt) =>
    set((state) => ({
      updatedDebts: {
        ...state.updatedDebts,
        [debt.id]: { ...state.updatedDebts[debt.id], ...debt },
      },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedDebtIds);
      newDeleted.add(id);
      return { deletedDebtIds: newDeleted };
    }),
  reset: () => set({ updatedDebts: {}, deletedDebtIds: new Set() }),
}));
