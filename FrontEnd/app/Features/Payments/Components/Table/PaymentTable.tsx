import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import UpdatePaymentButton from "../Buttons/UpdatePaymentButton";
import DeletePaymentButton from "../Buttons/DeletePaymentButton";
import { Payment } from "../../types";

const columns: Column<Payment>[] = [
  { key: "clientName", label: "Client Name" },
  {
    key: "amount",
    label: "Amount",
    render: (item) => (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
        {item.amount.toFixed(2)} DA
      </span>
    ),
  },
  {
    key: "paidAt",
    label: "Paid At",
    render: (item) => (
      <span className="text-slate-400 text-xs">{formatDate(new Date(item.paidAt))}</span>
    ),
  },
  {
    key: "action",
    label: "Action",
    render: (item) => (
      <div className="flex gap-2">
        <UpdatePaymentButton key={`update-${item.id}`} data={item} />
        <DeletePaymentButton key={`delete-${item.id}`} id={item.id} />
      </div>
    ),
  },
];

export default function PaymentTable({ data }: { data: Payment[] }) {
  return (
    <>
      <MyTable columns={columns} data={data} totalCount={data.length} />
    </>
  );
}
