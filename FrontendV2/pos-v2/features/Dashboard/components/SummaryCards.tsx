"use client";

import { ShoppingCart, Package, DollarSign, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardSummary } from "../hooks/useDashboard";

function StatCard({
  title,
  value,
  icon: Icon,
  prefix,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  prefix?: string;
}) {
  return (
    <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}{value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SummaryCards() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Orders" value={data.totalOrders} icon={ShoppingCart} />
      <StatCard title="Total Products" value={data.totalProducts} icon={Package} />
      <StatCard title="Total Revenue" value={data.totalRevenue} icon={DollarSign} prefix="$" />
      <StatCard title="Remaining Debt" value={data.totalRemainingDebt} icon={CreditCard} prefix="$" />
    </div>
  );
}
