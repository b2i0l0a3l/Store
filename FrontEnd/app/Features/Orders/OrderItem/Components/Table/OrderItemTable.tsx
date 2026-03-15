import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { OrderItem } from "../../types";

const columns: Column<OrderItem>[] = [
  { key: "productName", label: "Product Name" },
  { key: "quantity", label: "Quantity" },
  { key: "price", label: "Price" },
  { key: "createdAt", label: "Created At" },
  {
    key: "action",
    label: "Action",
    render: (item) => (
      <div className="flex gap-2">
      </div>
    ),
  },
];

export default function OrderItemTable({ data }: { data: OrderItem[] }) {
  return (
    <>
      <MyTable columns={columns} data={data} totalCount={data.length} />
    </>
  );
}
