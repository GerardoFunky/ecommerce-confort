// lib/services/product-service.ts
import { apiClient } from "./api-client";
import { Product, ProductFilter } from "@/types/product.types";

export const productService = {
  /**
   * Obtiene una lista de productos con filtros opcionales
   */
  getProducts: async (filters?: ProductFilter) => {
    // Construir query params si hay filtros
    let queryParams = "";

    if (filters) {
      const params = new URLSearchParams();

      if (filters.category) params.append("category", filters.category);
      if (filters.search) params.append("search", filters.search);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());
      if (filters.minPrice)
        params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice)
        params.append("maxPrice", filters.maxPrice.toString());

      queryParams = `?${params.toString()}`;
    }

    return apiClient.get<{ products: Product[]; total: number }>(
      `/products${queryParams}`
    );
  },

  /**
   * Obtiene un producto por su ID
   */
  getProductById: async (id: string) => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  /**
   * Obtiene productos por categoría
   */
  getProductsByCategory: async (categorySlug: string, page = 1, limit = 10) => {
    return apiClient.get<{ products: Product[]; total: number }>(
      `/products?category=${categorySlug}&page=${page}&limit=${limit}`
    );
  },

  /**
   * Obtiene productos relacionados
   */
  getRelatedProducts: async (productId: string, limit = 4) => {
    return apiClient.get<Product[]>(
      `/products/${productId}/related?limit=${limit}`
    );
  },

  /**
   * Busca productos
   */
  searchProducts: async (query: string, page = 1, limit = 10) => {
    return apiClient.get<{ products: Product[]; total: number }>(
      `/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
  },

  /**
   * Obtiene productos destacados
   */
  getFeaturedProducts: async (limit = 8) => {
    return apiClient.get<Product[]>(`/products/featured?limit=${limit}`);
  },
};
