// Opciones para búsqueda
export interface SearchOptions extends PaginationOptions {
  query: string;
  categories?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  inStock?: boolean;
  sortBy?: "relevance" | "price_asc" | "price_desc" | "newest" | "popular";
}
