import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import PaymentButton from "../Buttons/PaymentButton";
import { Debt } from "../../types";

const columns: Column<Debt>[] = [
  { key: "clientName", label: "Name" },
  {
    key: "remaining",
    label: "Remaining",
    render: (item) => {
      const isPaid = item.remaining === 0;
      return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${isPaid ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" : "bg-rose-500/15 text-rose-400 border border-rose-500/25"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? "bg-emerald-400" : "bg-rose-400"}`} />
          {item.remaining?.toFixed(2)} DA
        </span>
      );
    },
  },
  {
    key: "updatedAt",
    label: "Last Update",
    render: (item) => (
      <span className="text-slate-400 text-xs">{formatDate(item.updatedAt)}</span>
    ),
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (item) => (
      <span className="text-slate-400 text-xs">{formatDate(item.createdAt)}</span>
    ),
  },
  {
    key: "action",
    label: "Action",
    render: (item) => (
      <div className="flex gap-2">
        <PaymentButton debtId={item.id} disabled={item.remaining === 0} />
      </div>
    ),
  },
];

export default function DebtTable({ data }: { data: Debt[] }) {
  return (
    <>
      <MyTable columns={columns} data={data} totalCount={data.length} />
    </>
  );
}
