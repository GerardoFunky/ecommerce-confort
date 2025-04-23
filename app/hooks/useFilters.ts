// hooks/useFilters.ts
import { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCategory } from "../types/product.types";
import { ProductFilter } from "@/components/product/product-filter";
export function useFilters(p0: {
  initialFilters: any;
  availableCategories: ProductCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Inicializar filtros desde los query params
  4;
  const [filters, setFilters] = useState<ProductFilter>({
    category: searchParams.get("category") || undefined,
    search: searchParams.get("search") || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
    limit: searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 12,
    minPrice: searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined,
  });

  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    if (filters.search) params.set("search", filters.search);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.page && filters.page > 1)
      params.set("page", filters.page.toString());
    if (filters.limit && filters.limit !== 12)
      params.set("limit", filters.limit.toString());
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(url);
  }, [filters, pathname, router]);

  // Funciones para manipular filtros
  const setCategory = useCallback((category: string | undefined) => {
    setFilters((prev: any) => ({ ...prev, category, page: 1 }));
  }, []);

  const setSearch = useCallback((search: string | undefined) => {
    setFilters((prev: any) => ({ ...prev, search, page: 1 }));
  }, []);

  const setSortBy = useCallback((sortBy: string | undefined) => {
    setFilters((prev: any) => ({ ...prev, sortBy }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev: any) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setFilters((prev: any) => ({ ...prev, limit, page: 1 }));
  }, []);

  const setPriceRange = useCallback((minPrice?: number, maxPrice?: number) => {
    setFilters((prev: any) => ({ ...prev, minPrice, maxPrice, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 12,
    });
  }, []);

  return {
    filters,
    setCategory,
    setSearch,
    setSortBy,
    setPage,
    setLimit,
    setPriceRange,
    resetFilters,
  };
}
