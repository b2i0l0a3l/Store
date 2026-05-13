"use client";

import { Suspense, ReactNode, useState, useMemo, useEffect } from "react";
import Loading from "../Loading/Loading";
import TableFooter from "./footer/TableFooter";
import TableBody from "./body/TableBody";

export interface Column<T> {
  key: Extract<keyof T, string> | string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface MyTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  pageSize?: number;
}

export default function MyTable<T>({
  columns,
  data,
  totalCount,
  pageSize = 5,
}: MyTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalCount]);

  const currentData = useMemo(() => {
    if (data.length > pageSize) {
      const startIdx = (currentPage - 1) * pageSize;
      return data.slice(startIdx, startIdx + pageSize);
    }
    return data;
  }, [data, currentPage, pageSize]);

  return (
    <div className="w-full min-h-[40vh] flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-slate-900/60 shadow-lg">
      <div className="flex-1 overflow-x-auto">
        <Suspense fallback={<Loading />}>
          <table className="w-full h-full text-sm text-left">
            <thead>
              <tr className="bg-[#0a1120] border-b border-white/10">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <TableBody data={currentData} columns={columns} />
          </table>
        </Suspense>
      </div>

      <div className="mt-auto">
        <TableFooter
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
