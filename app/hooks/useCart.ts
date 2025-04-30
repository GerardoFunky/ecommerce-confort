// hooks/useCart.ts
import { useState, useEffect, useCallback, useContext } from "react";
import { CartContext } from "../providers/cart-provider";
import { cartService } from "@/lib/services/cart-service";

export function useCart() {
  // Obtenemos el estado del carrito del context
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  const { cart, setCart } = cartContext;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Cargar el carrito al iniciar
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      fetchCart();
    }
  }, []);

  // Obtener carrito
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cartService.getCart();
      setCart(data);
    } catch (err) {
      setError(err as Error);
      console.error("Error al obtener el carrito:", err);
    } finally {
      setLoading(false);
    }
  }, [setCart]);

  // Añadir item al carrito
  const addItem = useCallback(
    async (productId: string, quantity = 1, variantId?: string) => {
      try {
        setLoading(true);
        setError(null);
        const updatedCart = await cartService.addToCart(
          productId,
          quantity,
          variantId
        );
        setCart(updatedCart);
        return true;
      } catch (err) {
        setError(err as Error);
        console.error("Error al añadir item al carrito:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setCart]
  );

  // Actualizar cantidad de un item
  const updateItemQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      try {
        setLoading(true);
        setError(null);
        const updatedCart = await cartService.updateCartItem(itemId, quantity);
        setCart(updatedCart);
        return true;
      } catch (err) {
        setError(err as Error);
        console.error("Error al actualizar cantidad:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setCart]
  );

  // Eliminar item del carrito
  const removeItem = useCallback(
    async (itemId: string) => {
      try {
        setLoading(true);
        setError(null);
        const updatedCart = await cartService.removeFromCart(itemId);
        setCart(updatedCart);
        return true;
      } catch (err) {
        setError(err as Error);
        console.error("Error al eliminar item:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setCart]
  );

  // Limpiar carrito
  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const emptyCart = await cartService.clearCart();
      setCart(emptyCart);
      return true;
    } catch (err) {
      setError(err as Error);
      console.error("Error al limpiar carrito:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setCart]);

  // Aplicar cupón
  const applyCoupon = useCallback(
    async (couponCode: string) => {
      try {
        setLoading(true);
        setError(null);
        const updatedCart = await cartService.applyCoupon(couponCode);
        setCart(updatedCart);
        return true;
      } catch (err) {
        setError(err as Error);
        console.error("Error al aplicar cupón:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setCart]
  );

  // Eliminar cupón
  const removeCoupon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const updatedCart = await cartService.removeCoupon();
      setCart(updatedCart);
      return true;
    } catch (err) {
      setError(err as Error);
      console.error("Error al eliminar cupón:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setCart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    isEmpty: !cart || cart.items.length === 0,
    totalItems: cart?.itemCount || 0,
    subtotal: cart?.subtotal || 0,
    total: cart?.total || 0,
    discount: cart?.discount || 0,
    couponCode: cart?.couponCode || null,
  };
}
