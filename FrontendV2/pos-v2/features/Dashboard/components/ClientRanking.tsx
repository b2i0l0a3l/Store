"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useClientRanking } from "../hooks/useDashboard";

const RANK_COLORS = [
  "text-amber-500",
  "text-gray-400",
  "text-orange-600",
];

export default function ClientRanking() {
  const { data, isLoading } = useClientRanking();

  return (
    <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Client Ranking</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No client data available</p>
        ) : (
          <div className="space-y-2">
            {data.map((client) => (
              <div
                key={client.clientId}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold",
                    RANK_COLORS[client.rank - 1],
                  )}
                >
                  {client.rank}
                </span>
                <span className="flex-1 truncate font-medium">{client.clientName}</span>
                <span className="text-sm text-muted-foreground">
                  ${client.totalPurchases.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
