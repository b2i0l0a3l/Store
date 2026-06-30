"use client";

import { useState } from "react";
import { useProducts, useCategories } from "../hooks/useProducts";
import ProductCard from "./productCard";
import ProductFormDialog from "./productFormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon, SearchIcon } from "lucide-react";

type ProductListClientProps = {
  searchParams?: { ProductName?: string };
}

export default function ProductListClient({ searchParams }: ProductListClientProps) {
  const [search, setSearch] = useState(searchParams?.ProductName || "");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const pageSize = 12;

  const { data, isLoading, isError } = useProducts({
    ProductName: search || undefined,
    PageNumber: page,
    PageSize: pageSize,
  });

  const { data: categoriesData } = useCategories();

  const products = data?.isSuccess ? data.value.items : [];
  const totalPages = data?.isSuccess ? data.value.totalPages : 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-destructive py-8">Failed to load products</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <PlusIcon className="size-4" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="flex items-center text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={categoriesData?.isSuccess ? categoriesData.value : []}
      />
    </div>
  );
}
