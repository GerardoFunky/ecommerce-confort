// hooks/useProducts.ts
import { useState, useEffect, useCallback } from "react";
import { Product, ProductFilter } from "@/types/product.types";
import { productService } from "@/lib/services/product-service";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  fetchProducts: (filters?: ProductFilter) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  fetchFeaturedProducts: (limit?: number) => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = useCallback(async (filters?: ProductFilter) => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getProducts(filters);

      setProducts(response.products);
      setTotalProducts(response.total);
      setCurrentPage(filters?.page || 1);
      setTotalPages(Math.ceil(response.total / (filters?.limit || 10)));

      return response.products;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(
    async (id: string): Promise<Product | null> => {
      try {
        setLoading(true);
        setError(null);

        const product = await productService.getProductById(id);
        return product;
      } catch (err) {
        setError(err as Error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchFeaturedProducts = useCallback(async (limit = 8) => {
    try {
      setLoading(true);
      setError(null);

      const featuredProducts = await productService.getFeaturedProducts(limit);
      setProducts(featuredProducts);

      return featuredProducts;
    } catch (err) {
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    totalProducts,
    currentPage,
    totalPages,
    fetchProducts,
    fetchProductById,
    fetchFeaturedProducts,
  };
}
