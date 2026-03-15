import { create } from "zustand";
import { client } from "../types";
import { getClients } from "../api/clientApi";

interface clientState {
  clients: Record<number, client>;
  addClient: (client: client) => void;
  fetchClients: () => Promise<void>;
  loading: boolean;
  updatedClients: Record<number, client>;
  deletedClientIds: Set<number>;
  recordUpdate: (client: client) => void;
  recordDelete: (id: number) => void;
  reset: () => void;
}

export const useClientStore = create<clientState>((set) => ({
  clients: {},
  loading: false,
  addClient: (client: client) =>
    set((state) => ({ ...state.clients, [client.id]: client })),

  fetchClients: async () => {
    set({ loading: true });

    const data : client[]= await getClients();
    const normalized = Object.fromEntries(
        data.map((c) => [c.id, c])
      );

    set( (state)=>({
      clients: {...state.clients, ...normalized},
      loading: false,
    }));
  },

  updatedClients: {},
  deletedClientIds: new Set(),
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
  reset: () => set({ updatedClients: {}, deletedClientIds: new Set() }),
}));


