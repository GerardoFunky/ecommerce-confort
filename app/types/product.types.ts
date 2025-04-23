// types/product.types.ts
/**
 * Interfaz que define una categoría de producto
 */
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
}

/**
 * Interfaz que define un atributo de producto
 * (por ejemplo: color, tamaño, material)
 */
export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
}

/**
 * Interfaz que define una variante de producto
 * (por ejemplo: una camisa en talla S, color rojo)
 */
export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null; // Precio anterior (para mostrar descuentos)
  inventory: number; // Cantidad disponible
  attributes: ProductAttribute[]; // Atributos específicos de esta variante
  image?: string; // Imagen específica de la variante
}

/**
 * Interfaz que define una reseña de producto
 */
export interface ProductReview {
  id: string;
  rating: number; // Por ejemplo, de 1 a 5 estrellas
  title?: string;
  comment: string;
  authorName: string;
  createdAt: string; // Fecha en formato ISO
  verified: boolean; // Si es una compra verificada
}

/**
 * Interfaz que define una especificación técnica de producto
 */
export interface ProductSpecification {
  name: string;
  value: string;
}

/**
 * Estados posibles para un producto
 */
export enum ProductStatus {
  ACTIVE = "active",
  DRAFT = "draft",
  ARCHIVED = "archived",
  OUT_OF_STOCK = "out_of_stock",
  COMING_SOON = "coming_soon",
}

/**
 * Interfaz principal para productos
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number | null; // Precio anterior (para mostrar descuentos)
  images: string[]; // URLs de las imágenes
  thumbnail?: string; // URL de la miniatura

  // Categorización
  categoryId: string;
  categoryName?: string;
  tags?: string[];
  collections?: string[]; // IDs de colecciones a las que pertenece

  // Inventario y SKU
  sku?: string;
  barcode?: string;
  inventory?: number;
  lowInventoryThreshold?: number;

  // Características del producto
  attributes?: ProductAttribute[];
  specifications?: ProductSpecification[];
  variants?: ProductVariant[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Reseñas
  rating?: {
    average: number;
    count: number;
  };
  reviews?: ProductReview[];

  // Fechas
  createdAt: string;
  updatedAt: string;

  // Estado
  status: ProductStatus;
  featured?: boolean;

  // Envío
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingRequired?: boolean;
  freeShipping?: boolean;

  // Relacionados
  relatedProducts?: string[]; // IDs de productos relacionados

  // Información adicional
  manufacturer?: string;
  warrantyInfo?: string;
  downloadable?: boolean;
  downloadFiles?: Array<{
    name: string;
    url: string;
    size?: number;
  }>;
}

/**
 * Opciones para ordenar productos
 */
export enum ProductSortOption {
  FEATURED = "featured",
  NEWEST = "newest",
  PRICE_LOW = "price_low",
  PRICE_HIGH = "price_high",
  BEST_SELLING = "best_selling",
  TOP_RATED = "top_rated",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
}

/**
 * Parámetros para filtrar productos
 */
export interface ProductFilterParams {
  categoryId?: string;
  collectionId?: string;
  search?: string;
  tags?: string[];
  priceRange?: {
    min: number;
    max: number | null;
  };
  attributes?: Record<string, string[]>; // Por atributos (ej: color: ['red', 'blue'])
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
  sortBy?: ProductSortOption;
  page?: number;
  limit?: number;
}

/**
 * Respuesta paginada para listados de productos
 */
export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
