import { TopSellingProduct } from "../types";
import { StarIcon } from "@heroicons/react/24/solid";

export default function TopSellingProductsList({ data }: { data: TopSellingProduct[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full min-h-[300px] flex items-center justify-center text-slate-500 bg-white/5 rounded-2xl border border-white/10 p-6">
        No sales data available to determine top products.
      </div>
    );
  }
  const maxSold = Math.max(...data.map(d => d.totalSoldAmount));
  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg shadow-lg shadow-yellow-500/10">
          <StarIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">Top Selling Products</h3>
      </div>

      <div className="flex flex-col gap-5 flex-1 pr-1 overflow-y-auto">
        {data.slice(0, 5).map((product, idx) => {
          const widthPercentage = Math.max((product.totalSoldAmount / maxSold) * 100, 5);
          return (
            <div key={product.productId} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-mono text-sm">#{idx + 1}</span>
                  <span className="text-sm font-medium text-slate-200">{product.productName}</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  ${product.totalSoldAmount.toFixed(2)}
                </div>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-linear-to-r from-blue-500 to-indigo-400"
                  style={{ width: `${widthPercentage}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 text-right">
                {product.totalSoldQuantity} units sold
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
