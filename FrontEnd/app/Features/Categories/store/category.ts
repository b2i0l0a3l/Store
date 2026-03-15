import { create } from "zustand";
import { category } from "../types";

interface categoryState {
  updatedCategories: Record<number, category>;
  deletedCategoryIds: Set<number>;
  recordUpdate: (category: category) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useCategoryStore = create<categoryState>((set) => ({
  updatedCategories: {},
  deletedCategoryIds: new Set(),
  recordUpdate: (category) =>
    set((state) => ({
      updatedCategories: {
        ...state.updatedCategories,
        [category.id]: category,
      },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedCategoryIds);
      newDeleted.add(id);
      return { deletedCategoryIds: newDeleted };
    }),
  reset: () => set({ updatedCategories: {}, deletedCategoryIds: new Set() }),
}));
