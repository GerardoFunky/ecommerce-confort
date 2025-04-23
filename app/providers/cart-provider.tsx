import { createContext, useReducer, useEffect, ReactNode } from "react";
import { Cart, CartAction, CartItem } from "../types/cart.types";

// Initial cart state
const initialState: Cart = {
  items: [],
};

// Define reducer for cart actions
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedVariant) ===
            JSON.stringify(action.payload.selectedVariant)
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: updatedItems };
      } else {
        // New item, add to cart
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            JSON.stringify(item.selectedVariant) ===
              JSON.stringify(action.payload.variant)
          )
      );
      return { ...state, items: updatedItems };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) => {
        if (
          item.id === action.payload.id &&
          JSON.stringify(item.selectedVariant) ===
            JSON.stringify(action.payload.variant)
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return { ...state, items: updatedItems };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Create context for cart
export const CartContext = createContext<
  | {
      state: Cart;
      addItem: (item: CartItem) => void;
      removeItem: (id: string, variant?: any) => void;
      updateItemQuantity: (id: string, quantity: number, variant?: any) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

// Storage key for cart
const CART_STORAGE_KEY = "ecommerce-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Only load cart if it has the expected structure
        if (parsedCart && Array.isArray(parsedCart.items)) {
          dispatch({ type: "SET_CART", payload: parsedCart });
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [state]);

  // Cart actions
  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: string, variant?: any) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, variant } });
  };

  const updateItemQuantity = (id: string, quantity: number, variant?: any) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity, variant },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
