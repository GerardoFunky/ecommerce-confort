import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        className="hidden sm:flex"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </Button>

      {pages.map((page) => {
        // If it's the current page, show selected button
        if (page === currentPage) {
          return (
            <Button key={page} size="sm">
              {page}
            </Button>
          );
        }

        // For far pages, only show those near current and extremes
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <Button
              key={page}
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          );
        }

        // For intermediate pages, show ellipsis
        if (page === currentPage - 2 || page === currentPage + 2) {
          return (
            <span key={page} className="px-2">
              ...
            </span>
          );
        }

        // Hide other pages
        return null;
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        className="hidden sm:flex"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
