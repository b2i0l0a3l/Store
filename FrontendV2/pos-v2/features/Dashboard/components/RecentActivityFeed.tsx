"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentActivities } from "../hooks/useDashboard";

function TimelineItem({
  title,
  subtitle,
  amount,
  date,
  type,
}: {
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  type: "order" | "payment";
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`h-2.5 w-2.5 rounded-full mt-1.5 ${
            type === "order" ? "bg-blue-500" : "bg-emerald-500"
          }`}
        />
        <div className="w-px flex-1 bg-border" />
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <span className="text-sm font-semibold">{amount}</span>
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

export default function RecentActivityFeed() {
  const { data, isLoading } = useRecentActivities();

  return (
    <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-2.5 w-2.5 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : data.recentOrders.length === 0 && data.recentPayments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No recent activity</p>
        ) : (
          <div>
            {data.recentOrders.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Orders</p>
                {data.recentOrders.map((order) => (
                  <TimelineItem
                    key={order.orderId}
                    title={`Order #${order.orderId}`}
                    subtitle={order.clientName}
                    amount={`$${order.totalPrice.toLocaleString()}`}
                    date={new Date(order.insertedDate).toLocaleString()}
                    type="order"
                  />
                ))}
              </div>
            )}
            {data.recentPayments.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Payments</p>
                {data.recentPayments.map((payment) => (
                  <TimelineItem
                    key={payment.paymentId}
                    title={`Payment #${payment.paymentId}`}
                    subtitle={payment.clientName}
                    amount={`$${payment.amount.toLocaleString()}`}
                    date={new Date(payment.insertDate).toLocaleString()}
                    type="payment"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
