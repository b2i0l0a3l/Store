"use client";

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
import { useTopSellingProducts } from "../hooks/useDashboard";

export default function TopSellingProducts() {
  const { data, isLoading } = useTopSellingProducts();

  return (
    <Card className="rounded-xl bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No products sold yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Qty Sold</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell className="font-medium">{product.productName}</TableCell>
                  <TableCell className="text-right">{product.totalSoldQuantity.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${product.totalSoldAmount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
