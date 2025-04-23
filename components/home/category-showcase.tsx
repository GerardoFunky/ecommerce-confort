// components/home/category-showcase.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCategory } from "@/types/product.types";
import { cn } from "@/lib/utils/cn";

interface CategoryShowcaseProps {
  categories: ProductCategory[];
  title?: string;
  className?: string;
}

export function CategoryShowcase({
  categories,
  title = "Explora nuestras categorías",
  className,
}: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-medium text-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
