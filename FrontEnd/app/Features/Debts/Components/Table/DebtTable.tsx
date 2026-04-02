import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import PaymentButton from "../Buttons/PaymentButton";
import { Debt } from "../../types";

const columns: Column<Debt>[] = [
  { key: "clientName", label: "Name" },
  { key: "remaining", label: "Remaining", render: (item) => item.remaining?.toFixed(2)  },
  {
    key: "updatedAt",
    label: "Last Update",
    render: (item) => formatDate(item.updatedAt),
  },
   {
    key: "createdAt",
    label: "Created At",
    render: (item) => formatDate(item.createdAt),
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
