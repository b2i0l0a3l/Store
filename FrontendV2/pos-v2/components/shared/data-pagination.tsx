"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataPaginationProps {
  pageNumber: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function DataPagination({
  pageNumber,
  totalPages,
  totalItems,
  onPageChange,
}: DataPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        {totalItems} total items
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={pageNumber <= 1}
          onClick={() => onPageChange(pageNumber - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          Page {pageNumber} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={pageNumber >= totalPages}
          onClick={() => onPageChange(pageNumber + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
