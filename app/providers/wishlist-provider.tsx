// providers/wishlist-provider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useWishlist } from "@/app/hooks/useWishlist";
import { Product } from "@/types/product.types";

interface WishlistContextProps {
  wishlistItems: Product[];
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  isInitialized: boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const wishlistUtils = useWishlist();

  return (
    <WishlistContext.Provider value={wishlistUtils}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider"
    );
  }
  return context;
}
