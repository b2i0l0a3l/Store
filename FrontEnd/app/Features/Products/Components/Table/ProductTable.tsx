import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";
import UpdateProductButton from "../Buttons/UpdateProductButton";
import DeleteProductButton from "../Buttons/DeleteProductButton";
import { useMemo } from "react";
import Image from "next/image";
import GetImageFromBackEnd from "@/app/util/GetImageFromBackEnd";

export default function ProductTable({
  data,
  categories,
}: {
  data: product[];
  categories: category[];
}) {
  const columns: Column<product>[] = useMemo(
    () => [ 
      {key: "imagePath", label: "Image", render: (item) => <img className="rounded-2xl" src={GetImageFromBackEnd(item.imagePath || "")} alt={item.name} width={45} height={45} />},
      { key: "name", label: "Name" },
      { key: "categoryName", label: "Category" },
      { key: "price", label: "Price" , render: (item) => item.price.toFixed(2) },
      { key: "cost", label: "Cost" , render: (item) => item.cost.toFixed(2) },
      { key: "quantity", label: "Quantity" },
      { key: "barCode", label: "BarCode" },
      {
        key: "action",
        label: "Action",
        render: (item) => (
          <div className="flex gap-2">
            <UpdateProductButton
              key={`update-${item.id}`}
              data={item}
              categories={categories}
            />
            <DeleteProductButton key={`delete-${item.id}`} dataId={item.id} />
          </div>
        ),
      },
    ],
    [categories],
  );

  return (
    <>
      <MyTable columns={columns} data={data} totalCount={data.length} />
    </>
  );
}
