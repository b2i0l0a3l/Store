"use client";

import { CashVsDebtRatio } from "../types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export default function CashVsDebtWidget({ data }: { data: CashVsDebtRatio | null }) {
  if (!data || (data.totalCash === 0 && data.totalDebt === 0)) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-slate-500 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
        Insufficient financial data.
      </div>
    );
  }

  const chartData = [
    { name: "Cash Revenue", value: data.totalCash, color: "#10b981" }, // emerald-500
    { name: "Unpaid Debt", value: data.totalDebt, color: "#f43f5e" }   // rose-500
  ];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shadow-lg shadow-emerald-500/10">
          <BanknotesIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">Cash vs Debt</h3>
      </div>
      
      <div className="flex-1 w-full min-h-[200px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#ffffff20", borderRadius: "12px", color: "#fff" }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: any) => `$${Number(value).toFixed(2)}`}
            />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }}/>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
          <span className="text-xs text-slate-500">Total</span>
          <span className="text-lg font-bold text-white">${(data.totalCash + data.totalDebt).toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}
