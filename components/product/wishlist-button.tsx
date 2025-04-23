// components/product/wishlist-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useWishlistContext } from "@/app/providers/wishlist-provider";
import { Product } from "@/types/product.types";
import { cn } from "@/lib/utils/cn";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "icon";
  size?: "default" | "sm" | "lg" | "icon";
}

export function WishlistButton({
  product,
  className,
  variant = "ghost",
  size = "icon",
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlistContext();
  const isActive = isInWishlist(product.id);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "transition-colors duration-200",
        isActive && "text-red-500",
        className
      )}
      onClick={() => toggleWishlist(product)}
      aria-label={isActive ? "Eliminar de favoritos" : "Añadir a favoritos"}
      title={isActive ? "Eliminar de favoritos" : "Añadir a favoritos"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </Button>
  );
}
