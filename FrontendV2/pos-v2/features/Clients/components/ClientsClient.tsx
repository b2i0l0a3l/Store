"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  useClients,
  useAddClient,
  useUpdateClient,
  useDeleteClient,
} from "../hooks/useClients";
import { ClientsTable } from "./ClientsTable";
import { ClientFormDialog } from "./ClientFormDialog";
import type { ClientModel } from "../types";

export default function ClientsClient() {
  const [pageNumber, setPageNumber] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientModel | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const { data, isLoading, error } = useClients(pageNumber);
  const addMutation = useAddClient();
  const updateMutation = useUpdateClient();
  const deleteMutation = useDeleteClient();

  const handleAdd = () => {
    setEditingClient(null);
    setDialogOpen(true);
  };

  const handleEdit = (client: ClientModel) => {
    setEditingClient(client);
    setDialogOpen(true);
  };

  const handleSubmit = (formData: {
    name: string;
    phoneNumber?: string;
    address?: string;
  }) => {
    if (editingClient) {
      updateMutation.mutate(
        { id: editingClient.id, ...formData },
        {
          onSuccess: (result) => {
            if (result.isSuccess) setDialogOpen(false);
          },
        },
      );
    } else {
      addMutation.mutate(formData, {
        onSuccess: (result) => {
          if (result.isSuccess) setDialogOpen(false);
        },
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    if (deleteConfirmId === id) {
      deleteMutation.mutate(id);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clients</h1>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <ClientsTable
        data={data}
        isLoading={isLoading}
        error={error}
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        deleteConfirmId={deleteConfirmId}
      />

      <ClientFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingClient(null);
        }}
        client={editingClient}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
}
