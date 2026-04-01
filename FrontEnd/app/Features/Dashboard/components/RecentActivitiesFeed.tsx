import { RecentActivities } from "../types";
import { SparklesIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

export default function RecentActivitiesFeed({ data }: { data: RecentActivities | null }) {
  if (!data || (!data.recentOrders?.length && !data.recentPayments?.length)) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-slate-500 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
        No recent activity.
      </div>
    );
  }

  // Combine and sort activities by date
  type Activity = { id: string; type: "ORDER" | "PAYMENT"; client: string; amount: number; date: Date };
  const combinedActivities: Activity[] = [];

  if (data.recentOrders) {
    data.recentOrders.forEach(o => {
      combinedActivities.push({
        id: `o-${o.orderId}`,
        type: "ORDER",
        client: o.clientName,
        amount: o.totalPrice,
        date: new Date(o.insertedDate)
      });
    });
  }

  if (data.recentPayments) {
    data.recentPayments.forEach(p => {
      combinedActivities.push({
        id: `p-${p.paymentId}`,
        type: "PAYMENT",
        client: p.clientName,
        amount: p.amount,
        date: new Date(p.insertDate)
      });
    });
  }

  // Sort by date descending (newest first)
  combinedActivities.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Function to format relative time (e.g. "2 hours ago")
  const getRelativeTime = (date: Date) => {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.round(diffMs / 60000);
      if (diffMins < 60) return `${diffMins} min ago`;
      const diffHrs = Math.round(diffMins / 60);
      if (diffHrs < 24) return `${diffHrs} hours ago`;
      return `${Math.round(diffHrs / 24)} days ago`;
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
      <div className="p-5 border-b border-white/10 bg-white/5 flex items-center gap-3">
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg shadow-lg shadow-indigo-500/10">
          <SparklesIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <div className="relative border-l border-white/10 ml-3 space-y-6">
          {combinedActivities.slice(0, 7).map((activity) => (
            <div key={activity.id} className="relative pl-6">
              {/* Timeline dot */}
              <span className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 ${activity.type === "ORDER" ? "bg-emerald-400" : "bg-purple-400"}`} />
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    <span className="font-semibold text-white">{activity.client}</span> 
                    {activity.type === "ORDER" ? " placed a new order." : " made a payment."}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{getRelativeTime(activity.date)}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white/5 backdrop-blur-md border border-white/5 ${activity.type === "ORDER" ? "text-emerald-400" : "text-purple-400"}`}>
                  ${activity.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
