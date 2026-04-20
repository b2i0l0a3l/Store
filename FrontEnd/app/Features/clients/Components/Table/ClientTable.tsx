import MyTable, { Column } from "@/app/components/Ui/customtable/MyTable";
import { client } from "@/app/Features/clients/types";
import UpdateClientButton from "../Buttons/updateClientButton";
import DeleteClientButton from "../Buttons/DeleteClientButton";

const columns: Column<client>[] = [
  { key: "name", label: "Name" },
  {
    key: "phoneNumber",
    label: "Phone",
    render: (item) => (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/25">
        📞 {item.phoneNumber}
      </span>
    ),
  },
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
