import { LowStockAlert } from "../types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function LowStockAlertsTable({ data }: { data: LowStockAlert[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full min-h-[300px] flex items-center justify-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl text-emerald-400">
        All products are well stocked!
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
      <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
            <ExclamationTriangleIcon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">Low Stock Alerts</h3>
        </div>
        <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded-full">
          {data.length} Critical
        </span>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs uppercase text-slate-500 border-b border-white/5">
              <th className="px-4 py-3 font-medium">Product Name</th>
              <th className="px-4 py-3 font-medium text-right">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.slice(0, 5).map((item) => (
              <tr key={item.productId} className="hover:bg-white/5 transition-colors group">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.productName}</p>
                  <p className="text-xs text-slate-500">Threshold: {item.threshold}</p>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.quantity === 0 ? "bg-rose-500/20 text-rose-400" : "bg-orange-500/20 text-orange-400"}`}>
                    {item.quantity} left
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 5 && (
            <div className="p-3 text-center text-sm text-slate-400 border-t border-white/5 mt-2">
                + {data.length - 5} more items low on stock
            </div>
        )}
      </div>
    </div>
  );
}
