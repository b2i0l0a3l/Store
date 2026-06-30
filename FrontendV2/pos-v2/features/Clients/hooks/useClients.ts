"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getClientsPaginated,
  addClient,
  updateClient,
  deleteClient,
} from "../actions";

const PAGE_SIZE = 10;

export function useClients(pageNumber: number) {
  return useQuery({
    queryKey: ["clients", pageNumber],
    queryFn: async () => {
      const result = await getClientsPaginated(pageNumber, PAGE_SIZE);
      if (!result.isSuccess) throw new Error(result.message);
      return result.value;
    },
  });
}

export function useAddClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      phoneNumber?: string;
      address?: string;
    }) => addClient(data),
    onSuccess: (result) => {
      if (!result.isSuccess) {
        toast.error(result.message);
        return;
      }
      toast.success("Client added successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: number;
      name: string;
      phoneNumber?: string;
      address?: string;
    }) => updateClient(data),
    onSuccess: (result) => {
      if (!result.isSuccess) {
        toast.error(result.message);
        return;
      }
      toast.success("Client updated successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteClient(id),
    onSuccess: (result) => {
      if (!result.isSuccess) {
        toast.error(result.message);
        return;
      }
      toast.success("Client deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
