import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { client } from "@/app/Features/clients/types";
import UpdateClientButton from "../Buttons/updateClientButton";
import DeleteClientButton from "../Buttons/DeleteClientButton";

const columns: Column<client>[] = [
  { key: "name", label: "Name" },
  { key: "phoneNumber", label: "Phone" },
  {
    key: "action",
    label: "Action",
    render: (item) => (
      <div className="flex gap-2">
        <UpdateClientButton key={`update-${item.id}`} data={item} />
        <DeleteClientButton key={`delete-${item.id}`} dataId={item.id} />
      </div>
    ),
  },
];

export default function ClientTable({ data }: { data: client[] }) {
 
  return (
    <>
      <MyTable columns={columns} data={data} totalCount={data.length} />
    </>
  );
}
