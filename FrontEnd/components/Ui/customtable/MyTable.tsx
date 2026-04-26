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
    <div className="w-full min-h-[60vh] flex flex-col rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/60 backdrop-blur-xl shadow-2xl">
      <div className="flex-1 overflow-x-auto">
        <Suspense fallback={<Loading />}>
          <table className="w-full h-full text-sm text-left">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-700/60">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400"
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
