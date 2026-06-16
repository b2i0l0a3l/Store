"use client";

import { useEffect, useRef } from "react";
import { getProducts } from "../../actions/getProducts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

import { Product } from "../../actions/productType";
import React from "react";
import ProductCard from "./ProductCard";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface ProductInfinitProps {
  initialProducts: Product[];
}

export default function ProductInfinit({
  initialProducts,
}: ProductInfinitProps) {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const barcode = searchParams.get("barcode") || "";
  const productName = searchParams.get("productName") || "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite-virtual-products",category,barcode,productName],
      queryFn: ({ pageParam = 1 }) => getProducts(pageParam, 10,category,barcode,productName),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.NextPage ?? undefined,
      initialData: {
        pages: [
          {
            isSuccess: true,
            value: initialProducts,
            NextPage: 2,
          },
        ],
        pageParams: [1],
      },
      staleTime: 1000 * 60 * 5,
    });

  const allProducts: Product[] = data
    ? data.pages.flatMap((page) => page.value)
    : [];

    if(allProducts.length === 0) toast.error("no products found");
    
  const parentRef = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = React.useState(3);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w < 400) setColumns(1);
        else if (w < 600) setColumns(2);
        else if (w < 900) setColumns(3);
        else setColumns(4);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ROW_HEIGHT = 250;
  const rowCount = Math.ceil(allProducts.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rowCount + 1 : rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
    gap: 12,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (
      lastItem &&
      lastItem.index >= rowCount - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    allProducts.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <div className="w-full h-full translate-y-2">
      <div
        ref={parentRef}  
        className="overflow-y-auto h-full scrollbar-hide"
        style={{ height: "calc(100vh - 80px)",}}>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualItem) => {
            const isLoaderRow = virtualItem.index >= rowCount;
            const startIdx = virtualItem.index * columns;
            const rowProducts = allProducts.slice(startIdx, startIdx + columns);

            return (
              <React.Fragment key={virtualItem.key}>
                <div
                  className="absolute top-0 left-0 w-full px-4"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {isLoaderRow ? (
                    <div className="flex items-center justify-center gap-3 h-full rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 text-sm bg-zinc-50/50 dark:bg-zinc-900/30">
                      {isFetchingNextPage ? (
                        <>
                          <span className="size-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          <span className="font-medium">جاري تحميل المزيد...</span>
                        </>
                      ) : (
                        <span className="font-medium">↓ انزل للمزيد</span>
                      )}
                    </div>
                  ) : (
                    <div
                      className="grid gap-3 h-full"
                      style={{
                        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                      }}
                    >
                      {rowProducts.map((product) => (
                        <ProductCard key={product.id} Product={product} />
                      ))}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
