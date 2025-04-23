// lib/services/cart-service.ts
import { apiClient } from "./api-client";
import { CartItem, Cart } from "@/types/cart.types";

export const cartService = {
  /**
   * Obtiene el contenido actual del carrito
   */
  getCart: async () => {
    return apiClient.get<Cart>("/cart");
  },

  /**
   * Añade un item al carrito
   */
  addToCart: async (
    productId: string,
    quantity: number,
    variantId?: string
  ) => {
    return apiClient.post<Cart>("/cart", { productId, quantity, variantId });
  },

  /**
   * Actualiza la cantidad de un item en el carrito
   */
  updateCartItem: async (itemId: string, quantity: number) => {
    return apiClient.put<Cart>(`/cart/${itemId}`, { quantity });
  },

  /**
   * Elimina un item del carrito
   */
  removeFromCart: async (itemId: string) => {
    return apiClient.delete<Cart>(`/cart/${itemId}`);
  },

  /**
   * Limpia todo el carrito
   */
  clearCart: async () => {
    return apiClient.delete<Cart>("/cart");
  },

  /**
   * Aplica un código de cupón al carrito
   */
  applyCoupon: async (couponCode: string) => {
    return apiClient.post<Cart>("/cart/coupon", { couponCode });
  },

  /**
   * Elimina un cupón del carrito
   */
  removeCoupon: async () => {
    return apiClient.delete<Cart>("/cart/coupon");
  },
};
