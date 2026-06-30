"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Loader2,
  Search,
} from "lucide-react";
import { usePosStore } from "../../Store/PosCartStore";
import { SellOrder } from "../../actions/pay";
import { OrderType } from "../../types/orderTypes";
import { getClients, type Client } from "../../actions/getClients.actions";

import { toast } from "sonner";

export default function BuyButton() {
  const cart = usePosStore((s) => s.cart);
  const Total = usePosStore((s) => s.Total);
  const clearCart = usePosStore((s) => s.clearCart);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentType, setPaymentType] = useState<OrderType>(OrderType.Sell);
  const [clientId, setClientId] = useState<number | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open && paymentType === OrderType.Debt) {
      fetchClients();
    }
  }, [open, paymentType]);

  async function fetchClients() {
    const result = await getClients();
    if (result.isSuccess) {
      setClients(result.value);
    }
  }

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function handlePay() {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (paymentType === OrderType.Debt && !clientId) {
      toast.error("Please select a client for debt order");
      return;
    }

    setSubmitting(true);
    const result = await SellOrder({
      clientId: clientId || 1,
      orderType: paymentType,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    setSubmitting(false);

    if (result.isSuccess) {
      toast.success(
        paymentType === OrderType.Debt
          ? "Debt order placed successfully"
          : "Order completed successfully",
      );
      clearCart();
      setOpen(false);
    } else {
      toast.error(result.message || "Failed to place order");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={cart.length === 0}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:pointer-events-none group"
        >
          <CreditCard className="size-4 group-hover:scale-110 transition-transform" />
          Pay (${Total.toFixed(2)})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Order</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex gap-2">
            <Button
              variant={paymentType === OrderType.Sell ? "default" : "outline"}
              className="flex-1"
              onClick={() => setPaymentType(OrderType.Sell)}
            >
              Cash
            </Button>
            <Button
              variant={paymentType === OrderType.Debt ? "default" : "outline"}
              className="flex-1"
              onClick={() => setPaymentType(OrderType.Debt)}
            >
              Debt
            </Button>
          </div>

          {paymentType === OrderType.Debt && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Select Client</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="max-h-48 overflow-y-auto border rounded-md divide-y">
                {filteredClients.length === 0 ? (
                  <div className="p-3 text-sm text-muted-foreground text-center">
                    No clients found
                  </div>
                ) : (
                  filteredClients.map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => setClientId(client.id)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-accent ${
                        clientId === client.id
                          ? "bg-primary/10 font-medium"
                          : ""
                      }`}
                    >
                      {client.name}
                      {client.phoneNumber && (
                        <span className="text-muted-foreground ml-2 text-xs">
                          {client.phoneNumber}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="border-t pt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal</span>
              <span>${Total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total</span>
              <span>${Total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={handlePay}
            disabled={submitting}
            className="w-full h-11 rounded-xl"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="h-4 w-4" />
            )}
            {submitting
              ? "Processing..."
              : `Confirm ${paymentType === OrderType.Debt ? "Debt" : "Payment"}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
