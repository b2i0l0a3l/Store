"use client";

import { SalesOverTime } from "../types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ data }: { data: SalesOverTime[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-slate-500 bg-white/5 rounded-2xl border border-white/10">
        No sales data available.
      </div>
    );
  }

  const chartData = data.map(d => ({
    ...d,
    dateValue: new Date(d.saleDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }));

  return (
    <div className="w-full h-96 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Revenue Over Time</h3>
        <p className="text-sm text-slate-400">Last 30 days performance</p>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="dateValue" 
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff" }}
              itemStyle={{ color: "#3b82f6" }}
            />
            <Area 
              type="monotone" 
              dataKey="totalSales" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
