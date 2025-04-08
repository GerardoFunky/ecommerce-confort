export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  summary: CartSummary;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}
