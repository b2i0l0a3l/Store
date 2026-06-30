"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReturnItems } from "@/features/Orders/hooks/useOrders";

interface ReturnItemEntry {
  productId: number;
  productName: string;
  orderItemId: number;
  quantity: number;
  price: number;
}

interface ReturnItemDialogProps {
  orderId: number;
  items: ReturnItemEntry[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReturnItemDialog({ orderId, items, open, onOpenChange }: ReturnItemDialogProps) {
  const returnItemsMutation = useReturnItems(orderId);
  const [returnQuantities, setReturnQuantities] = useState<Record<number, number>>({});

  const resetQuantities = () => {
    const initial: Record<number, number> = {};
    items.forEach((item) => {
      initial[item.orderItemId] = 0;
    });
    setReturnQuantities(initial);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetQuantities();
    }
    onOpenChange(newOpen);
  };

  const selectedItems = items.filter((item) => (returnQuantities[item.orderItemId] ?? 0) > 0);

  const handleSubmit = () => {
    if (selectedItems.length === 0) return;

    returnItemsMutation.mutate(
      {
        orderId,
        items: selectedItems.map((item) => ({
          productId: item.productId,
          quantity: returnQuantities[item.orderItemId],
          price: item.price,
          orderItemId: item.orderItemId,
        })),
      },
      {
        onSuccess: (result) => {
          if (result.isSuccess) {
            handleOpenChange(false);
          }
        },
      },
    );
  };

  useEffect(() => {
    if (open) {
      resetQuantities();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Return Items</DialogTitle>
          <DialogDescription>
            Select items and quantities to return from order #{orderId}.
          </DialogDescription>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Original Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Return Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.orderItemId}>
                <TableCell className="font-medium">{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    className="h-8 w-20"
                    min={0}
                    max={item.quantity}
                    value={returnQuantities[item.orderItemId] ?? 0}
                    onChange={(e) => {
                      const val = Math.min(
                        Math.max(0, Number(e.target.value)),
                        item.quantity,
                      );
                      setReturnQuantities((prev) => ({
                        ...prev,
                        [item.orderItemId]: val,
                      }));
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedItems.length === 0 || returnItemsMutation.isPending}
          >
            {returnItemsMutation.isPending ? "Processing..." : "Return Selected Items"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
