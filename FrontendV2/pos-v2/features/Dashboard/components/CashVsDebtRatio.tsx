"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCashVsDebtRatio } from "../hooks/useDashboard";

export default function CashVsDebtRatio() {
  const { data, isLoading } = useCashVsDebtRatio();

  if (isLoading || !data) {
    return (
      <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <CardHeader>
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  const total = data.totalCash + data.totalDebt;
  const cashPct = total > 0 ? (data.totalCash / total) * 100 : 0;
  const debtPct = total > 0 ? (data.totalDebt / total) * 100 : 0;

  return (
    <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Cash vs Debt Ratio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div
            className="h-3 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${cashPct}%` }}
          />
          <div
            className="h-3 rounded-full bg-rose-500 transition-all"
            style={{ width: `${debtPct}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3">
            <p className="text-xs text-muted-foreground">Cash</p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              ${data.totalCash.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{cashPct.toFixed(1)}%</p>
          </div>
          <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 p-3">
            <p className="text-xs text-muted-foreground">Debt</p>
            <p className="text-lg font-bold text-rose-700 dark:text-rose-400">
              ${data.totalDebt.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{debtPct.toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
