import { useCallback, useState } from "react";
import CustomModal from "@/components/Ui/Modal/Modal";
import { Payment } from "@/Features/Payments/types";

export default function PaymentModal({
  title,
  icon,
  data,
  onClose,
  onClick,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  data?: Payment;
  onClose: () => void;
  onClick: (
    debtId: number,
    amount: number,
    paymentMethod: number,
    notes: string,
  ) => void;
}) {
  const [debtId, setDebtId] = useState(data?.debtId || 0);
  const [amount, setAmount] = useState(data?.amount || 0);
  const [paymentMethod, setPaymentMethod] = useState(data?.paymentMethod || 1);
  const [notes, setNotes] = useState(data?.notes || "");

  const handleSubmit = useCallback(() => {
    onClick(debtId, amount, paymentMethod, notes);
  }, [onClick, debtId, amount, paymentMethod, notes]);

  return (
    <CustomModal title={title} icon={icon} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-slate-300">Debt ID</label>
          <input
            onChange={(e) => setDebtId(Number(e.target.value))}
            value={debtId || ""}
            disabled={!!data}
            type="number"
            placeholder="Debt ID"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-slate-300">Amount</label>
          <input
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount || ""}
            type="number"
            placeholder="Amount"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-slate-300">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(Number(e.target.value))}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <option value={1}>Cash</option>
            <option value={2}>Credit Card</option>
            <option value={3}>Mobile Payment</option>
            <option value={4}>Bank Transfer</option>
            <option value={5}>Cheque</option>
            <option value={6}>Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-slate-300">Notes</label>
          <input
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            type="text"
            placeholder="Notes (Optional)"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          type="button"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>
    </CustomModal>
  );
}
