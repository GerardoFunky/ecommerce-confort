// components/shared/wishlist-empty.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function WishlistEmpty() {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="mb-6 text-gray-400">
        {/* Icono de corazón o wishlist vacía */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto"
          fill="none"
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
      </div>

      <h2 className="text-2xl font-semibold mb-2">
        Tu lista de deseos está vacía
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        Guarda tus productos favoritos para verlos más tarde o compartirlos con
        amigos.
      </p>

      <Button asChild>
        <Link href="/products">Explorar productos</Link>
      </Button>
    </div>
  );
}
