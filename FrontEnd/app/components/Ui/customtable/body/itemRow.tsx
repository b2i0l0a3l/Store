import { memo } from "react";
import { Column } from "../MyTable";

function ItemRow<T> (
  { row, columns }: { row: T; columns: Column<T>[] }) {
    return (
      <tr className="border-b border-slate-700/30 transition-colors duration-200 hover:bg-slate-700/30 even:bg-slate-800/30">
        {columns.map((col: Column<T>) => (
          <td
            key={String(col.key)}
            className="px-5 py-4 text-slate-300 whitespace-nowrap"
          >
            {col.render ? col.render(row) : String((row as any)[col.key] ?? "")}
          </td>
        ))}
      </tr>
    );
  }

export default memo(ItemRow) as typeof ItemRow;
