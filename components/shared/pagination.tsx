// components/shared/pagination.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/app/hooks/usePagination";
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) {
  const { paginationRange, hasNextPage, hasPreviousPage } = usePagination({
    totalItems,
    itemsPerPage,
    currentPage,
  });

  // If there is only 1 page, don't render pagination
  if (paginationRange.length <= 1) {
    return null;
  }

  return (
    <nav
      className={cn("flex justify-center items-center space-x-1", className)}
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        &lt;
      </Button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "DOTS") {
          return (
            <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <Button
            key={`page-${pageNumber}`}
            variant={pageNumber === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(pageNumber as number)}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            className="w-10 h-10"
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Página siguiente"
      >
        &gt;
      </Button>
    </nav>
  );
}
