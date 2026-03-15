import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";
import UpdateProductButton from "../Buttons/UpdateProductButton";
import DeleteProductButton from "../Buttons/DeleteProductButton";
import { useMemo } from "react";

export default function ProductTable({
  data,
  categories,
}: {
  data: product[];
  categories: category[];
}) {
  const columns: Column<product>[] = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "categoryName", label: "Category" },
      { key: "price", label: "Price" },
      { key: "cost", label: "Cost" },
      { key: "quantity", label: "Quantity" },
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
