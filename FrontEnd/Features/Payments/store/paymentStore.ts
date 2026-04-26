import { create } from "zustand";
import { Payment } from "../types";

interface paymentState {
  addedPayments: Record<number, Payment>;
  updatedPayments: Record<number, Payment>;
  deletedPaymentIds: Set<number>;
  recordAdd: (payment: Payment) => void;
  recordUpdate: (payment: Payment) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const usePaymentStore = create<paymentState>((set) => ({
  addedPayments: {},
  updatedPayments: {},
  deletedPaymentIds: new Set(),
  recordAdd: (payment) =>
    set((state) => ({
      addedPayments: { ...state.addedPayments, [payment.id]: payment },
    })),
  recordUpdate: (payment) =>
    set((state) => ({
      updatedPayments: {
        ...state.updatedPayments,
        [payment.id]: { ...state.updatedPayments[payment.id], ...payment },
      },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedPaymentIds);
      newDeleted.add(id);
      return { deletedPaymentIds: newDeleted };
    }),
  reset: () =>
    set({
      addedPayments: {},
      updatedPayments: {},
      deletedPaymentIds: new Set(),
    }),
}));
