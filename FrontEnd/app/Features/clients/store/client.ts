import { create } from "zustand";
import { client } from "../types";

interface clientState {
  addedClients: client[];
  updatedClients: Record<number, client>;
  deletedClientIds: Set<number>;
  recordAdd: (client: client) => void;
  recordUpdate: (client: client) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useClientStore = create<clientState>((set) => ({
  addedClients: [],
  updatedClients: {},
  deletedClientIds: new Set(),
  recordAdd: (client) =>
    set((state) => ({
      addedClients: [...state.addedClients, client],
    })),
  recordUpdate: (client) =>
    set((state) => ({
      updatedClients: { ...state.updatedClients, [client.id]: client },
    })),
  recordDelete: (id) =>
    set((state) => {
      const newDeleted = new Set(state.deletedClientIds);
      newDeleted.add(id);
      return { deletedClientIds: newDeleted };
    }),
  reset: () =>
    set({
      addedClients: [],
      updatedClients: {},
      deletedClientIds: new Set(),
    }),
}));
