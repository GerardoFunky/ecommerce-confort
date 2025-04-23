// app/(shop)/wishlist/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useWishlistContext } from "../../providers/wishlist-provider";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlistItems, clearWishlist, isInitialized } = useWishlistContext();

  if (!isInitialized) {
    return <div className="container py-12">Cargando...</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <h1 className="text-2xl font-bold">Tu lista de deseos está vacía</h1>
          <p className="text-gray-600">
            Aún no has añadido productos a tu lista de deseos.
          </p>
          <Link href="/products" passHref>
            <Button>Ver productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mi lista de deseos</h1>
        <Button variant="outline" onClick={clearWishlist}>
          Vaciar lista
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
