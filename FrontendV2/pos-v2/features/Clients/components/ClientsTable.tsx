"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataPagination } from "@/components/shared/data-pagination";
import { Pencil, Trash2 } from "lucide-react";
import type { ClientModel } from "../types";
import type { PagedResult } from "@/lib/api/fetch";

interface ClientsTableProps {
  data: PagedResult<ClientModel> | undefined;
  isLoading: boolean;
  error: Error | null;
  pageNumber: number;
  onPageChange: (page: number) => void;
  onEdit: (client: ClientModel) => void;
  onDelete: (id: number) => void;
  deleteConfirmId: number | null;
}

export function ClientsTable({
  data,
  isLoading,
  error,
  pageNumber,
  onPageChange,
  onEdit,
  onDelete,
  deleteConfirmId,
}: ClientsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <p className="text-sm text-destructive">{error.message}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageNumber)}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <p className="text-sm text-muted-foreground">No clients found</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.phoneNumber || "-"}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {client.address || "-"}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(client)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {deleteConfirmId === client.id ? (
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => onDelete(client.id)}
                    >
                      Confirm
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDelete(client.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataPagination
        pageNumber={data.pageNumber}
        totalPages={data.totalPages}
        totalItems={data.totalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}
