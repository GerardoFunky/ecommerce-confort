// components/product/product-gallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Usar imágenes de ejemplo si las del producto no están disponibles
  const galleryImages =
    images.length > 0 ? images : ["/images/products/placeholder.jpg"];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Imagen no disponible</p>
        </div>
        {galleryImages[selectedImage] && (
          <Image
            src={galleryImages[selectedImage]}
            alt="Product image"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-md ${
                selectedImage === index
                  ? "ring-2 ring-primary"
                  : "ring-1 ring-gray-200"
              }`}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
