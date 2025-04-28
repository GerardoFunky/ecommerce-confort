export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image?: string;
  variant?: ProductVariant;
  metadata?: Record<string, any>;
}
