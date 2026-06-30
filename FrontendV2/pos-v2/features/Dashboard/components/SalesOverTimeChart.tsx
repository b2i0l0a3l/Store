"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSalesOverTime } from "../hooks/useDashboard";

const DAY_OPTIONS = [7, 30, 90] as const;

export default function SalesOverTimeChart() {
  const [days, setDays] = useState<number>(7);
  const { data, isLoading } = useSalesOverTime(days);

  const maxSales = data ? Math.max(...data.map((r) => r.totalSales), 1) : 1;

  return (
    <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">Sales Over Time</CardTitle>
        <div className="flex gap-1">
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={cn(
                "px-3 py-1 text-xs rounded-md transition-colors",
                days === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {d}d
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="flex items-end gap-1 h-40">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="flex-1 h-20 rounded-sm" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
            No sales data available
          </div>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {data.map((record, i) => {
              const height = (record.totalSales / maxSales) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                  title={`${record.saleDate}: $${record.totalSales}`}
                >
                  <div
                    className="w-full rounded-t-sm bg-primary/80 hover:bg-primary transition-colors min-h-[4px]"
                    style={{ height: `${Math.max(height, 1)}%` }}
                  />
                  {data.length <= 31 && (
                    <span className="text-[10px] text-muted-foreground mt-1 truncate w-full text-center">
                      {new Date(record.saleDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
