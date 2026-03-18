import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { order } from "@/app/Features/Orders/types";
import ShowCardButton from "../Buttons/ShowCardButton";
import UpdateOrderButton from "../Buttons/updateOrderButton";
import DeleteOrderButton from "../Buttons/DeleteOrderButton";

const columns: Column<order>[] = [
  { key: "clientName", label: "Client Name" },
  { key: "total", label: "Total" },
  { key: "orderType", label: "Order Type" },
  { key: "orderStatus", label: "Order Status" },
  {
    key: "updatedAt",
    label: "Last Update",
    render: (item) => formatDate(item.updatedAt),
  },
  {
    key: "action",
    label: "Action",
    render: (item) => (
      <div className="flex gap-2">
        <ShowCardButton id={item.id} />
        <UpdateOrderButton order={item} />
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
