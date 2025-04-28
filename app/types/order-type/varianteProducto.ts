export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  options?: Record<string, string>;
}
