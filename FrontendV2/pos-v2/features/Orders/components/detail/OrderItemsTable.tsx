"use client";

import { useState } from "react";
import type { ApiResult } from "@/lib/api/fetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useOrderItems,
  useUpdateOrderItem,
  useDeleteOrderItem,
} from "@/features/Orders/hooks/useOrders";
import type { OrderItemFunctionModel } from "@/features/Orders/types";
import { ReturnItemDialog } from "@/features/Orders/components/detail/ReturnItemDialog";
import { Pencil, Trash2, Save, X, Undo2 } from "lucide-react";

interface OrderItemsTableProps {
  orderId: number;
}

export default function OrderItemsTable({ orderId }: OrderItemsTableProps) {
  const { data, isLoading, isError } = useOrderItems(orderId);
  const itemsResult = data as ApiResult<OrderItemFunctionModel[]> | undefined;
  const updateOrderItem = useUpdateOrderItem();
  const deleteOrderItem = useDeleteOrderItem();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError || (itemsResult && !itemsResult.isSuccess)) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-destructive">Failed to load order items</p>
      </div>
    );
  }

  if (!itemsResult) return null;

  const items = itemsResult.value;

  const startEditing = (item: OrderItemFunctionModel) => {
    setEditingId(item.id);
    setEditQuantity(item.quantity);
    setEditPrice(item.price);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (item: OrderItemFunctionModel) => {
    if (editQuantity < 0 || editPrice < 0) return;
    updateOrderItem.mutate({
      orderItemId: item.id,
      quantity: editQuantity,
      orderId,
      price: editPrice,
      productId: item.productId,
    });
    setEditingId(null);
  };

  const handleDeleteItem = () => {
    if (deleteItemId === null) return;
    deleteOrderItem.mutate(deleteItemId);
    setDeleteItemId(null);
  };

  const itemsForReturn = items.map((item) => ({
    productId: item.productId,
    productName: item.productName,
    orderItemId: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Order Items</h3>
        <Button variant="outline" size="sm" onClick={() => setReturnDialogOpen(true)}>
          <Undo2 className="h-4 w-4 mr-1" /> Return Items
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.productName}</TableCell>
                <TableCell>
                  {isEditing ? (
                    <Input
                      type="number"
                      className="h-8 w-20"
                      value={editQuantity}
                      min={0}
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                    />
                  ) : (
                    item.quantity
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Input
                      type="number"
                      className="h-8 w-24"
                      value={editPrice}
                      min={0}
                      step={0.01}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                    />
                  ) : (
                    item.price.toFixed(2)
                  )}
                </TableCell>
                <TableCell>{(item.quantity * item.price).toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => saveEditing(item)}
                          disabled={updateOrderItem.isPending}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={cancelEditing}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => startEditing(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Dialog
                          open={deleteItemId === item.id}
                          onOpenChange={(open) => {
                            if (!open) setDeleteItemId(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => setDeleteItemId(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Item</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete {item.productName} from this order?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setDeleteItemId(null)}>
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={handleDeleteItem}
                                disabled={deleteOrderItem.isPending}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ReturnItemDialog
        orderId={orderId}
        items={itemsForReturn}
        open={returnDialogOpen}
        onOpenChange={setReturnDialogOpen}
      />
    </div>
  );
}
