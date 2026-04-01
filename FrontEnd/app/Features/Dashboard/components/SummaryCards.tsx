import { DashboardSummary } from "../types";
import {
  ShoppingCartIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from "@heroicons/react/24/outline";

export default function SummaryCards({ data }: { data: DashboardSummary }) {
  if (!data) return null;

  const cards = [
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCartIcon,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400",
      trend: "+12.5%",
      isPositive: true
    },
    {
      title: "Total Revenue",
      value: `$${data.totalRevenue?.toFixed(2) || "0.00"}`,
      icon: CurrencyDollarIcon,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
      trend: "+18.2%",
      isPositive: true
    },
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: ArchiveBoxIcon,
      color: "from-purple-500/20 to-fuchsia-500/20 text-purple-400",
      trend: "Low stock (3)",
      isPositive: false
    },
    {
      title: "Remaining Debt",
      value: `$${data.totalRemainingDebt?.toFixed(2) || "0.00"}`,
      icon: CreditCardIcon,
      color: "from-rose-500/20 to-orange-500/20 text-rose-400",
      trend: "-2.4%",
      isPositive: true
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-4 group hover:bg-white/10 transition-all duration-300 shadow-xl"
        >
          {/* Subtle gradient blob on hover */}
          <div className={`absolute top-0 right-0 -m-8 w-24 h-24 rounded-full bg-linear-to-br ${card.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`} />
          
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold tracking-tight text-white">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-linear-to-br ${card.color} backdrop-blur-md border border-white/5`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            {card.isPositive ? (
              <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-400" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4 text-rose-400" />
            )}
            <span className={`text-xs font-medium ${card.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
              {card.trend}
            </span>
            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
