"use client";

import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import AddButton from "./AddButton";
import { product } from "../Products/types";
import { useMemo } from "react";

export default function SellTable({ data }: { data: product[] }) {
  const columns = useMemo<Column<product>[]>(
    () => [
      { key: "name", label: "Name" },
      { key: "categoryName", label: "Category" },
      { key: "price", label: "Price" },
      { key: "quantity", label: "Quantity" , render: (item) => item.quantity > 0 ? item.quantity : <span className="text-red-500">Out of Stock</span>},
      { key: "cost", label: "Cost" },
      {
        key: "action",
        label: "Action",
        render: (item) => <AddButton item={item} />,
      },
    ],
    []
  );

  return <MyTable columns={columns} totalCount={data.length} data={data} />;
}