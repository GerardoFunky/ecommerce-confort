// components/layout/sidebar/filter-sidebar.tsx
import React, { useState } from "react";
import { useFilterContext } from "@/providers/filter-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils/format-currency";
import { cn } from "@/lib/utils/cn";

interface FilterSidebarProps {
  className?: string;
  mobile?: boolean;
}

export function FilterSidebar({
  className,
  mobile = false,
}: FilterSidebarProps) {
  const {
    filters,
    setCategory,
    setPriceRange,
    resetFilters,
    availableCategories,
  } = useFilterContext();

  const [localPriceRange, setLocalPriceRange] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max || "",
  });

  const [isOpen, setIsOpen] = useState(!mobile);

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPriceRange(
      Number(localPriceRange.min),
      localPriceRange.max ? Number(localPriceRange.max) : null
    );
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm p-4",
        mobile ? "lg:hidden" : "hidden lg:block",
        className
      )}
    >
      {mobile && (
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between mb-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Filtros</span>
          <span>{isOpen ? "▲" : "▼"}</span>
        </Button>
      )}

      <div className={cn(mobile && !isOpen ? "hidden" : "block")}>
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Categorías</h3>
          <div className="space-y-2">
            {availableCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  className="mr-2 h-4 w-4"
                  checked={filters.categories.includes(category.id)}
                  onChange={(e) => setCategory(category.id, e.target.checked)}
                />
                <label htmlFor={`category-${category.id}`} className="text-sm">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Precio</h3>
          <form onSubmit={handlePriceSubmit} className="space-y-3">
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Mín."
                min="0"
                value={localPriceRange.min}
                onChange={(e) =>
                  setLocalPriceRange((prev) => ({
                    ...prev,
                    min: e.target.value,
                  }))
                }
                className="w-1/2"
              />
              <span>a</span>
              <Input
                type="number"
                placeholder="Máx."
                min="0"
                value={localPriceRange.max}
                onChange={(e) =>
                  setLocalPriceRange((prev) => ({
                    ...prev,
                    max: e.target.value,
                  }))
                }
                className="w-1/2"
              />
            </div>
            <Button type="submit" size="sm" className="w-full">
              Aplicar
            </Button>
          </form>

          {(filters.priceRange.min > 0 || filters.priceRange.max) && (
            <div className="mt-2 text-sm">
              Precio: {formatCurrency(filters.priceRange.min)}
              {filters.priceRange.max &&
                ` - ${formatCurrency(filters.priceRange.max)}`}
            </div>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="w-full"
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
}
