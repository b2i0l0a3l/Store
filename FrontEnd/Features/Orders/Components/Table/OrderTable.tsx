import { formatDate } from "@/util/dateFormat";
import MyTable, { Column } from "@/components/Ui/customtable/MyTable";
import { order } from "@/Features/Orders/types";
import ShowCardButton from "../Buttons/ShowCardButton";
import DeleteOrderButton from "../Buttons/DeleteOrderButton";

const ORDER_STATUS_STYLES: Record<string, string> = {
  Completed: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  Pending: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  Cancelled: "bg-rose-500/15 text-rose-400 border border-rose-500/25",
};

const ORDER_TYPE_STYLES: Record<string, string> = {
  Cash: "bg-sky-500/15 text-sky-400 border border-sky-500/25",
  Credit: "bg-violet-500/15 text-violet-400 border border-violet-500/25",
};

const columns: Column<order>[] = [
  {
    key: "clientName",
    label: "Client Name",
    render: (item) =>
      !item.clientName || item.clientName === "No Client"
        ? "Walk-in Customer"
        : item.clientName,
  },
  {
    key: "total",
    label: "Total",
    render: (item) => (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
        {item.total.toFixed(2)} DA
      </span>
    ),
  },
  {
    key: "orderType",
    label: "Order Type",
    render: (item) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${ORDER_TYPE_STYLES[item.orderType] ?? "bg-slate-700/50 text-slate-300 border border-slate-600/50"}`}
      >
        {item.orderType}
      </span>
    ),
  },
  {
    key: "orderStatus",
    label: "Order Status",
    render: (item) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${ORDER_STATUS_STYLES[item.orderStatus] ?? "bg-slate-700/50 text-slate-300 border border-slate-600/50"}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.orderStatus === "Completed" ? "bg-emerald-400" : item.orderStatus === "Pending" ? "bg-amber-400" : item.orderStatus === "Cancelled" ? "bg-rose-400" : "bg-slate-400"}`}
        />
        {item.orderStatus}
      </span>
    ),
  },
  {
    key: "updatedAt",
    label: "Last Update",
    render: (item) => (
      <span className="text-slate-400 text-xs">
        {formatDate(item.updatedAt)}
      </span>
    ),
  },
  {
    key: "action",
    label: "Action",
    render: (item) => (
      <div className="flex gap-2">
        <ShowCardButton id={item.id} />
        <DeleteOrderButton id={item.id} />
      </div>
    ),
  },
];

export default function OrderTable({ data }: { data: order[] }) {
  return (
    <>
      <MyTable columns={columns} data={data} totalCount={data.length} />
    </>
  );
}
