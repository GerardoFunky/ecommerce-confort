// providers/filter-provider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useFilters } from "@/app/hooks/useFilters";
import { ProductCategory } from "../types/product.types";

interface FilterContextProps {
  filters: {
    categories: string[];
    priceRange: {
      min: number;
      max: number | null;
    };
    sortBy: string;
    search: string;
    page: number;
  };
  setCategory: (category: string, isSelected: boolean) => void;
  setPriceRange: (min: number, max: number | null) => void;
  setSortBy: (sortValue: string) => void;
  setSearchQuery: (query: string) => void;
  setPage: (pageNumber: number) => void;
  resetFilters: () => void;
  availableCategories: ProductCategory[];
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  initialFilters?: any;
  availableCategories: ProductCategory[];
}

export function FilterProvider({
  children,
  initialFilters,
  availableCategories,
}: FilterProviderProps) {
  const filterUtils = useFilters({
    initialFilters,
    availableCategories,
  });

  return (
    <FilterContext.Provider value={filterUtils}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
