import { create } from "zustand";
import { product } from "../types";

interface productState {
  soldQuantities: Record<number, number>;
  updatedProducts: Record<number, product>;
  addedProducts: product[];
  deletedProductIds: Set<number>;
  recordSale: (items: { productId: number; quantity: number }[]) => void;
  recordAdd: (product: product) => void;
  recordUpdate: (product: product) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useProductStore = create<productState>((set) => ({
  soldQuantities: {},
  updatedProducts: {},
  addedProducts: [],
  deletedProductIds: new Set(),
  recordSale: (items) =>
    set((state) => {
      const updated = { ...state.soldQuantities };
      for (const item of items) {
        updated[item.productId] =
          (updated[item.productId] || 0) + item.quantity;
      }
      return { soldQuantities: updated };
    }),
  recordAdd: (product) =>
    set((state) => ({
      addedProducts: [...state.addedProducts, product],
    })),
  recordUpdate: (product) =>
    set((state) => ({
      updatedProducts: { ...state.updatedProducts, [product.id]: product },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedProductIds);
      newDeleted.add(id);
      return { deletedProductIds: newDeleted };
    }),
  reset: () =>
    set({
      soldQuantities: {},
      updatedProducts: {},
      addedProducts: [],
      deletedProductIds: new Set(),
    }),
}));
