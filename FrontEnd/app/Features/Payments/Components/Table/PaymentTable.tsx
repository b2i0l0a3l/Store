import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import UpdatePaymentButton from "../Buttons/UpdatePaymentButton";
import DeletePaymentButton from "../Buttons/DeletePaymentButton";
import { Payment } from "../../types";

const columns: Column<Payment>[] = [
  { key: "id", label: "ID" },
  { key: "debtID", label: "Debt ID" },
  {
    key: "amount",
    label: "Amount",
    render: (item) => <span>{item.amount.toFixed(2)}</span>,
  },
  {
    key: "paidAt",
    label: "Paid At",
    render: (item) => formatDate(new Date(item.paidAt)),
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
