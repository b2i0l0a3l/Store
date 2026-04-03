import { create } from "zustand";
import { category } from "../types";

interface categoryState {
  addedCategories: category[];
  updatedCategories: Record<number, category>;
  deletedCategoryIds: Set<number>;
  recordAdd: (category: category) => void;
  recordUpdate: (category: category) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useCategoryStore = create<categoryState>((set) => ({
  addedCategories: [],
  updatedCategories: {},
  deletedCategoryIds: new Set(),
  recordAdd: (category) =>
    set((state) => ({
      addedCategories: [...state.addedCategories, category],
    })),
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
  reset: () =>
    set({
      addedCategories: [],
      updatedCategories: {},
      deletedCategoryIds: new Set(),
    }),
}));
