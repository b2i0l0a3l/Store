"use client";

import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import AddButton from "./AddButton";
import { product } from "../Products/types";
import { useMemo } from "react";
import GetImageFromBackEnd from "@/app/util/GetImageFromBackEnd";

export default function SellTable({ data }: { data: product[] }) {
  const columns = useMemo<Column<product>[]>(
    () => [
      {key: "imagePath", label: "Image", render: (item) => <img className="rounded-2xl" src={GetImageFromBackEnd(item.imagePath || "")} alt={item.name} width={45} height={45} />},
      { key: "name", label: "Name" },
      { key: "categoryName", label: "Category" },
      { key: "price", label: "Price" , render: (item) => item.price.toFixed(2) },
      { 
        key: "quantity", 
        label: "Quantity",
        render: (item) => {
          let color = "";
          let label = "";
          if (item.quantity < 5) {
            color = "bg-red-500/20 text-red-500";
            label = "Low";
          } else if (item.quantity <= 10) {
            color = "bg-yellow-500/20 text-yellow-500";
            label = "Medium";
          } else {
            color = "bg-green-500/20 text-green-500";
            label = "High";
          }
          return (
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-200">{item.quantity}</span>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${color}`}>
                {label}
              </span>
            </div>
          );
        }
      },
      { key: "barCode", label: "BarCode" },
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