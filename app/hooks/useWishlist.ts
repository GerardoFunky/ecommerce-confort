// hooks/useWishlist.ts
import { useState, useEffect } from "react";
import { Product } from "@/types/product.types";

const WISHLIST_STORAGE_KEY = "ecommerce-wishlist";

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error("Error loading wishlist from storage:", error);
        setWishlistItems([]);
      } finally {
        setIsInitialized(true);
      }
    };

    if (typeof window !== "undefined") {
      loadWishlist();
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error saving wishlist to storage:", error);
    }
  }, [wishlistItems, isInitialized]);

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // Add a product to the wishlist
  const addToWishlist = (product: Product): void => {
    if (!isInWishlist(product.id)) {
      setWishlistItems((prev) => [...prev, product]);
    }
  };

  // Remove a product from the wishlist
  const removeFromWishlist = (productId: string): void => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Toggle a product in the wishlist
  const toggleWishlist = (product: Product): void => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Clear the entire wishlist
  const clearWishlist = (): void => {
    setWishlistItems([]);
  };

  return {
    wishlistItems,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInitialized,
  };
}
