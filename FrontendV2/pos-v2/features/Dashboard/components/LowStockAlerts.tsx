"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLowStockAlerts } from "../hooks/useDashboard";

export default function LowStockAlerts() {
  const { data, isLoading } = useLowStockAlerts();

  return (
    <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">All products are well stocked</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((alert) => (
                <TableRow
                  key={alert.productId}
                  className={alert.quantity === 0 ? "bg-destructive/5" : undefined}
                >
                  <TableCell>
                    <Link
                      href={`/product/${alert.productId}`}
                      className="font-medium hover:underline"
                    >
                      {alert.productName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    {alert.quantity === 0 ? (
                      <Badge variant="destructive">Out of stock</Badge>
                    ) : (
                      <Badge variant="warning">{alert.quantity}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
