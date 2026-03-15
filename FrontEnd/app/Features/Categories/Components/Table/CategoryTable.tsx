import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { category } from "@/app/Features/Categories/types";
import UpdateCategoryButton from "../Buttons/UpdateCategoryButton";
import DeleteCategoryButton from "../Buttons/DeleteCategoryButton";

const columns: Column<category>[] = [
  { key: "name", label: "Name" },
  {
    key: "action",
    label: "Action",
    render: (item) => (
      <div className="flex gap-2">
        <UpdateCategoryButton key={`update-${item.id}`} data={item} />
        <DeleteCategoryButton key={`delete-${item.id}`} dataId={item.id} />
      </div>
    ),
  },
];

export default function CategoryTable({ data }: { data: category[] }) {
  return (
    <>
      <MyTable columns={columns} data={data} totalCount={data.length} />
    </>
  );
}
