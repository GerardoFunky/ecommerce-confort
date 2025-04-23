// components/product/product-sort.tsx
"use client";

import { useState } from "react";

export function ProductSort() {
  const [sortOption, setSortOption] = useState("featured");

  const sortOptions = [
    { value: "featured", label: "Destacados" },
    { value: "newest", label: "Más recientes" },
    { value: "price_asc", label: "Precio: menor a mayor" },
    { value: "price_desc", label: "Precio: mayor a menor" },
    { value: "rating", label: "Mejor valorados" },
  ];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Ordenar por:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="rounded-md border-gray-300 py-1 pl-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-primary"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
