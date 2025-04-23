import { ProductVariant } from "./product.types";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; variant?: any } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: string; quantity: number; variant?: any };
    }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: Cart };

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  variantId?: string;
  variantName?: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}
