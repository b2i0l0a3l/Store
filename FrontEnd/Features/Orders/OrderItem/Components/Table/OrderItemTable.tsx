import { formatDate } from "@/util/dateFormat";
import MyTable, { Column } from "@/components/Ui/customtable/MyTable";
import { OrderItem } from "../../types";
import ReturnItemButton from "../Buttons/ReturnItemButton";
import DeleteItemButton from "../Buttons/DeleteItemButton";
import UpdateItemButton from "../Buttons/UpdateItemButton";
import { useOrderItemStore } from "../../store/orderItem";
import { useMemo } from "react";

export default function OrderItemTable({
  data,
  orderId,
}: {
  data: OrderItem[];
  orderId: number;
}) {
  const columns: Column<OrderItem>[] = [
    { key: "productName", label: "Product Name" },
    {
      key: "quantity",
      label: "Quantity",
      render: (item) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/25">
          ×{item.quantity}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (item) => (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
          {item.price.toFixed(2)} DA
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (item) => (
        <span className="text-slate-400 text-xs">
          {formatDate(item.createdAt)}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (item) => (
        <div className="flex gap-2">
          <DeleteItemButton itemId={item.id} />
          <UpdateItemButton orderItem={item} />
          <ReturnItemButton orderItem={item} orderId={orderId} />
        </div>
      ),
    },
  ];
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
