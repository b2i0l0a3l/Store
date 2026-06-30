"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderStatusBadgeString, OrderTypeBadgeString } from "@/features/Orders/components/OrderStatusBadge";
import { useUpdateOrder, useDeleteOrder } from "@/features/Orders/hooks/useOrders";
import type { OrderCardModel } from "@/features/Orders/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Printer, Trash2 } from "lucide-react";

interface OrderHeaderProps {
  order: OrderCardModel;
}

const statusOptions = [
  { value: "Paid", label: "Paid" },
  { value: "NotPaid", label: "Not Paid" },
  { value: "Partial", label: "Partial" },
];

export default function OrderHeader({ order }: OrderHeaderProps) {
  const router = useRouter();
  const updateOrderMutation = useUpdateOrder();
  const deleteOrderMutation = useDeleteOrder();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    const statusMap: Record<string, number> = {
      Paid: 0,
      NotPaid: 1,
      Partial: 2,
    };
    const statusNum = statusMap[newStatus];
    if (statusNum === undefined) return;

    const typeMap: Record<string, number> = {
      Sell: 0,
      Debt: 1,
    };
    const typeNum = typeMap[order.orderType] ?? 0;

    updateOrderMutation.mutate({
      orderId: order.id,
      orderStatus: statusNum as 0 | 1 | 2,
      orderType: typeNum as 0 | 1,
    });
  };

  const handleDelete = () => {
    deleteOrderMutation.mutate(order.id, {
      onSuccess: (result) => {
        if (result.isSuccess) {
          setDeleteOpen(false);
          router.push("/orders");
        }
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Order #{order.id}</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Edit Status <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statusOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => handleStatusChange(opt.value)}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Order</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete order #{order.id}? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteOrderMutation.isPending}
                  >
                    {deleteOrderMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" /> Print Invoice
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Client</p>
            <p className="font-medium">{order.clientName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-medium">{order.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="font-medium">{order.remaining.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <OrderTypeBadgeString type={order.orderType} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <OrderStatusBadgeString status={order.orderStatus} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Updated</p>
            <p className="font-medium">{new Date(order.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
