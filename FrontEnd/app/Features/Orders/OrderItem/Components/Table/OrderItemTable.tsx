import { formatDate } from "@/app/util/dateFormat";
import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { OrderItem } from "../../types";
import ReturnItemButton from "../Buttons/ReturnItemButton";
import DeleteItemButton from "../Buttons/DeleteItemButton";
import UpdateItemButton from "../Buttons/UpdateItemButton";
import { useOrderItemStore } from "../../store/orderItem";
import { useMemo } from "react";

const columns: Column<OrderItem>[] = [
  { key: "productName", label: "Product Name" },
  { key: "quantity", label: "Quantity" },
  { key: "price", label: "Price", render: (item) => item.price.toFixed(2) },
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
  const updatedOrderItems = useOrderItemStore(
    (state) => state.updatedOrderItems,
  );
  const deletedOrderItemIds = useOrderItemStore(
    (state) => state.deletedOrderItemIds,
  );

  const displayData = useMemo(() => {
    return data
      .filter((item) => !deletedOrderItemIds.has(item.id))
      .map((item) => updatedOrderItems[item.id] || item);
  }, [data, updatedOrderItems, deletedOrderItemIds]);

  return (
    <>
      <MyTable
        columns={columns}
        data={displayData}
        totalCount={displayData.length}
      />
    </>
  );
}
