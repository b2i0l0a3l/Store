import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { OrderItem } from "../../types";
import ReturnItemButton from "../Buttons/ReturnItemButton";
import DeleteItemButton from "../Buttons/DeleteItemButton";
import UpdateItemButton from "../Buttons/UpdateItemButton";

const columns: Column<OrderItem>[] = [
  { key: "productName", label: "Product Name" },
  { key: "quantity", label: "Quantity" },
  { key: "price", label: "Price" },
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
        <DeleteItemButton itemId={item.id} />
        <UpdateItemButton orderItem={item} />
        <ReturnItemButton orderItem={item} />
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
