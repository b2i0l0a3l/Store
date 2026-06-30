import { Badge } from "@/components/ui/badge";
import type { OrderStatus, OrderType } from "@/features/Orders/types";

const statusConfig: Record<OrderStatus, { label: string; variant: "success" | "destructive" | "warning" }> = {
  0: { label: "Paid", variant: "success" },
  1: { label: "Not Paid", variant: "destructive" },
  2: { label: "Partial", variant: "warning" },
};

const typeConfig: Record<OrderType, { label: string; variant: "default" | "info" }> = {
  0: { label: "Sell", variant: "default" },
  1: { label: "Debt", variant: "info" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function OrderTypeBadge({ type }: { type: OrderType }) {
  const config = typeConfig[type];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function OrderStatusBadgeString({ status }: { status: string }) {
  const lower = status.toLowerCase();
  const variant = lower === "paid" ? "success" : lower === "notpaid" || lower === "not paid" ? "destructive" : "warning";
  return <Badge variant={variant}>{status}</Badge>;
}

export function OrderTypeBadgeString({ type }: { type: string }) {
  const lower = type.toLowerCase();
  const variant = lower === "sell" ? "default" : "info";
  return <Badge variant={variant}>{type}</Badge>;
}
