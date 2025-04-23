// components/product/add-to-wishlist-button.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useWishlistContext } from "@/app/providers/wishlist-provider";
import { Product } from "@/types/product.types";
import { useToast } from "@/app/providers/toast-provider";
import { cn } from "@/lib/utils/cn";

interface AddToWishlistButtonProps {
  product: Product;
  variant?: "default" | "outline" | "icon";
  className?: string;
}

export function AddToWishlistButton({
  product,
  variant = "icon",
  className,
}: AddToWishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlistContext();
  const { showToast } = useToast();

  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    toggleWishlist(product);

    showToast(
      isWishlisted
        ? `${product.name} eliminado de tu lista de deseos`
        : `${product.name} añadido a tu lista de deseos`,
      isWishlisted ? "info" : "success"
    );
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggleWishlist}
        className={cn(
          "p-2 rounded-full hover:bg-gray-100 transition-colors",
          isWishlisted ? "text-red-500" : "text-gray-500",
          className
        )}
        aria-label={
          isWishlisted
            ? "Quitar de lista de deseos"
            : "Añadir a lista de deseos"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={isWishlisted ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <Button
      onClick={handleToggleWishlist}
      variant={variant}
      className={cn(
        isWishlisted && variant === "default"
          ? "bg-red-600 hover:bg-red-700"
          : "",
        className
      )}
    >
      {isWishlisted ? "Quitar de lista de deseos" : "Añadir a lista de deseos"}
    </Button>
  );
}
