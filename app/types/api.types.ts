/**
 * api.types.ts
 * Definiciones de tipos para interacción con API y respuestas
 */

// Respuesta genérica de API
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

// Respuesta paginada
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// Opciones de paginación para solicitudes
export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  offset?: number;
  limit?: number;
}

// Opciones de ordenamiento
export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

// Filtros genéricos
export interface FilterOptions {
  [key: string]: string | number | boolean | string[] | number[] | null;
}

// Parámetros completos para consulta
export interface QueryParams {
  pagination?: PaginationOptions;
  sort?: SortOptions | SortOptions[];
  filter?: FilterOptions;
  include?: string[];
  fields?: string[];
  search?: string;
}

// Error de API estructurado
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  status: number;
  path?: string;
}

// Estado de carga (para hooks)
export type LoadingState = "idle" | "loading" | "success" | "error";

// Respuesta base para hooks que usan API
export interface ApiHookState<T, E = ApiError> {
  data: T | null;
  loading: boolean;
  error: E | null;
  status: LoadingState;
}

// Opciones para el cliente de API
export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}

// Respuesta de webhook
export interface WebhookResponse {
  id: string;
  success: boolean;
  message?: string;
  processedAt: string;
}

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
