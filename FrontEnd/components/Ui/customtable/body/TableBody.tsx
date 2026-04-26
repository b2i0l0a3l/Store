import { memo } from "react";
import { Column } from "../MyTable";
import ItemRow from "./itemRow";

export default function TableBody<T>({
  data,
  columns,
}: {
  data: T[];
  columns: Column<T>[];
}) {

  return (
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="px-5 py-12 text-center text-slate-500"
          >
            No data available
          </td>
        </tr>
      ) : (
        data.map((row, rowIdx) => (
          <ItemRow
            key={(row as any).id ?? rowIdx}
            row={row}
            columns={columns}
          />
        ))
      )}
    </tbody>
  );
}

