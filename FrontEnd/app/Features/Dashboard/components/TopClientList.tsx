import { ClientRanking } from "../types";
import { UsersIcon, TrophyIcon } from "@heroicons/react/24/solid";

export default function TopClientList({ data }: { data: ClientRanking[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full min-h-[300px] flex items-center justify-center text-slate-500 bg-white/5 rounded-2xl border border-white/10 p-6 shadow-xl">
        No client data available to determine top clients.
      </div>
    );
  }

  // Find the max purchases to calculate progress bar percentages safely
  const maxPurchases = Math.max(...data.map(d => Number(d.totalPurchases) || 0), 1);

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-500/20 text-pink-500 rounded-lg shadow-lg shadow-pink-500/10">
          <TrophyIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">Top Clients</h3>
      </div>

      <div className="flex flex-col gap-5 flex-1 pr-1 overflow-y-auto custom-scrollbar">
        {data.slice(0, 5).map((client, idx) => {
          const widthPercentage = Math.max((Number(client.totalPurchases) / maxPurchases) * 100, 5); // at least 5% visual representation
          
          return (
            <div key={client.clientId} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold flex items-center justify-center w-5 h-5 rounded-full ${idx === 0 ? "bg-amber-500/20 text-amber-500" : idx === 1 ? "bg-slate-300/20 text-slate-300" : idx === 2 ? "bg-amber-700/30 text-amber-600" : "text-slate-500"}`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-200">{client.clientName}</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  ${Number(client.totalPurchases).toFixed(2)}
                </div>
              </div>
              {/* Progress bar container */}
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                {/* Colored progress bar */}
                <div 
                  className="h-full rounded-full bg-linear-to-r from-pink-500 to-rose-400"
                  style={{ width: `${widthPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
