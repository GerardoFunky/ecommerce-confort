"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCart } from "../../providers/cart-provider";
import { useWishlist } from "../../providers/wishlist-provider";
import { Product } from "../../types/product.types";
import { formatCurrency } from "../../lib/utils/format-currency";
import { RatingStars } from "../shared/rating-stars";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Utilizamos la variante predeterminada o la primera disponible
    const variant = product.variants[0];

    addItem({
      id: product.id,
      name: product.name,
      price: variant.price || product.price,
      quantity: 1,
      image: product.images[0]?.url || "",
      slug: product.slug,
      variantId: variant.id,
      variantName: variant.name,
    });

    // Simular un tiempo para mostrar el feedback de la acción
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountPercentage = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge para productos nuevos o con descuento */}
      {product.isNew && !discountPercentage && (
        <span className="absolute top-2 right-2 z-10 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          NUEVO
        </span>
      )}

      {discountPercentage > 0 && (
        <span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discountPercentage}%
        </span>
      )}

      {/* Imagen del producto */}
      <Link
        href={`/products/${product.slug}`}
        className="block aspect-square relative overflow-hidden"
      >
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">
            Imagen: {product.images[0]?.alt}
          </span>
        </div>
      </Link>

      {/* Botón para wishlist */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 left-2 z-10 p-2 rounded-full bg-white/70 hover:bg-white transition-colors"
        aria-label={
          isInWishlist(product.id)
            ? "Eliminar de favoritos"
            : "Añadir a favoritos"
        }
      >
        {isInWishlist(product.id) ? (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>

      {/* Contenido del producto */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-base font-medium text-gray-900 truncate mb-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <RatingStars rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center mb-3">
          <span className="font-medium text-primary text-lg">
            {formatCurrency(product.price)}
          </span>

          {product.compareAtPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full"
          variant={isAddingToCart ? "secondary" : "default"}
        >
          {isAddingToCart ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Añadiendo...
            </span>
          ) : (
            "Añadir al carrito"
          )}
        </Button>
      </div>
    </div>
  );
}
