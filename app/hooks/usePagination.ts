// hooks/usePagination.ts
import { useMemo } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  siblingCount?: number;
}

export function usePagination({
  totalItems,
  itemsPerPage,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps) {
  const paginationRange = useMemo(() => {
    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Pages count is determined by siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount * 2 + 5;

    // If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Don't show dots if there is only one position left after/before
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    // Special case: only show dots on right side
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);

      return [...leftRange, "DOTS", totalPages];
    }

    // Special case: only show dots on left side
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );

      return [1, "DOTS", ...rightRange];
    }

    // Show dots on both sides
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );

      return [1, "DOTS", ...middleRange, "DOTS", totalPages];
    }

    return [];
  }, [totalItems, itemsPerPage, currentPage, siblingCount]);

  return {
    paginationRange,
    totalPages: Math.ceil(totalItems / itemsPerPage),
    currentPage,
    hasNextPage: currentPage < Math.ceil(totalItems / itemsPerPage),
    hasPreviousPage: currentPage > 1,
  };
}
