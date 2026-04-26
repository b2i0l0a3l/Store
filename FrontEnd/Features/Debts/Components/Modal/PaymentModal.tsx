import { memo, useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import CustomModal from "@/components/Ui/Modal/Modal";
import CustomInput from "@/components/Ui/inputs/CustomInput";
import CustomButton from "@/components/Ui/buttons/CustomButton";

function PaymentModal({
  handleClose,
  debtId,
  handleSubmit,
}: {
  handleClose: () => void;
  debtId: number;
  handleSubmit: (data: any) => void;
}) {
  const [Amount, setAmount] = useState(0);
  const [PaymentMethod, setPaymentMethod] = useState(1);
  const [Notes, setNotes] = useState("");

  return (
    <CustomModal
      title="Payment"
      icon={CurrencyDollarIcon}
      onClose={handleClose}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="debtId">Debt Id</label>
          <CustomInput
            disabled={true}
            value={debtId}
            placeholder="Debt Id"
            type="text"
            name="debtId"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount">Amount</label>
          <CustomInput
            value={Amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
            type="number"
            name="amount"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            name="paymentMethod"
            value={PaymentMethod}
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
          <label htmlFor="notes">Notes</label>
          <CustomInput
            value={Notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (Optional)"
            type="text"
            name="notes"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <CustomButton
          text="Pay"
          className="px-6 py-4 mt-4"
          hoverColor="hover:opacity-80"
          onClick={() =>
            handleSubmit({
              debtId: debtId,
              amount: Amount,
              paymentMethod: PaymentMethod,
              notes: Notes,
            })
          }
          icon={CurrencyDollarIcon}
        />
      </div>
    </CustomModal>
  );
}

export default memo(PaymentModal);
