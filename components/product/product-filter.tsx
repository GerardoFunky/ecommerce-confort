// components/product/product-filters.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function ProductFilter() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const categories = [
    { id: "ropa", name: "Ropa" },
    { id: "calzado", name: "Calzado" },
    { id: "accesorios", name: "Accesorios" },
    { id: "deportes", name: "Deportes" },
    { id: "tecnologia", name: "Tecnología" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-3">Categorías</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2">{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium text-lg mb-3">Precio</h3>
        <div className="flex items-center space-x-4">
          <div>
            <label className="text-sm text-gray-600">Min</label>
            <Input
              type="number"
              min={0}
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: Number(e.target.value) })
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Max</label>
            <Input
              type="number"
              min={0}
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: Number(e.target.value) })
              }
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium text-lg mb-3">Valoración</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="ml-2 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 01.773.37l2.197 2.902 3.086.446a1 1 0 01.555 1.705l-2.246 2.194.53 3.095a1 1 0 01-1.450 1.054L10 12.51 6.555 14.31a1 1 0 01-1.45-1.054l.53-3.095-2.246-2.194a1 1 0 01.555-1.705l3.086-.446L9.227 2.37A1 1 0 0110 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">y más</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium text-lg mb-3">Disponibilidad</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="ml-2">En stock</span>
        </label>
      </div>

      <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
        Aplicar Filtros
      </button>
    </div>
  );
}

export default ProductFilter;
