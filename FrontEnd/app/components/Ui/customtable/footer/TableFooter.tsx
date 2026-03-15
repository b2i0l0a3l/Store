import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface TableFooterProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function TableFooter({
  totalCount,
  pageSize,
  currentPage,
  setCurrentPage,
}: TableFooterProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalCount);

  function getPageNumbers(): (number | "...")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];

    pages.push(1);
    if (currentPage <= 3) {
      pages.push(2, 3, 4);
      pages.push("...");
    } else if (currentPage >= totalPages - 2) {
      pages.push("...");
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
    }
    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-700/50 bg-slate-900/50">
      <p className="text-xs text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-300">
          {totalCount > 0 ? startIdx + 1 : 0}
        </span>
        {" – "}
        <span className="font-semibold text-slate-300">{endIdx}</span>
        {" of "}
        <span className="font-semibold text-slate-300">{totalCount}</span>
        {" items"}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-600/40 bg-slate-700/40 text-slate-400 transition-all duration-200
                       hover:bg-linear-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blue-500/25
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-700/40 disabled:hover:text-slate-400 disabled:hover:border-slate-600/40 disabled:hover:shadow-none"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-slate-500 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200
                  ${
                    currentPage === page
                      ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-400 hover:bg-slate-700/60 hover:text-white border border-transparent hover:border-slate-600/40"
                  }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-600/40 bg-slate-700/40 text-slate-400 transition-all duration-200
                       hover:bg-linear-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blue-500/25
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-700/40 disabled:hover:text-slate-400 disabled:hover:border-slate-600/40 disabled:hover:shadow-none"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
