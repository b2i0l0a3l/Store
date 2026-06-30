"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentMethod } from "../types";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  debtId: number | null;
  remaining: number;
  onSubmit: (data: {
    debtId: number;
    amount: number;
    notes?: string;
    paymentMethod: number;
  }) => void;
  isPending: boolean;
}

const paymentMethodOptions = [
  { value: String(PaymentMethod.Cash), label: "Cash" },
  { value: String(PaymentMethod.CreditCard), label: "Credit Card" },
  { value: String(PaymentMethod.MobilePayment), label: "Mobile Payment" },
  { value: String(PaymentMethod.BankTransfer), label: "Bank Transfer" },
  { value: String(PaymentMethod.Cheque), label: "Cheque" },
  { value: String(PaymentMethod.Other), label: "Other" },
];

export function PaymentDialog({
  open,
  onOpenChange,
  debtId,
  remaining,
  onSubmit,
  isPending,
}: PaymentDialogProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setAmount("");
      setPaymentMethod("");
      setNotes("");
    }
  }, [open]);

  const parsedAmount = parseFloat(amount);
  const amountValid = !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= remaining;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtId || !amountValid || !paymentMethod) return;
    onSubmit({
      debtId,
      amount: parsedAmount,
      notes: notes.trim() || undefined,
      paymentMethod: Number(paymentMethod),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Payment</DialogTitle>
          <DialogDescription>
            Remaining balance: ${remaining.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount <span className="text-destructive">*</span>
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              max={remaining}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="method" className="text-sm font-medium">
              Payment Method <span className="text-destructive">*</span>
            </label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              required
            >
              <SelectTrigger id="method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethodOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
              placeholder="Optional notes"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !amountValid || !paymentMethod}
            >
              {isPending ? "Processing..." : "Pay"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
