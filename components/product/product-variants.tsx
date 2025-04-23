// components/product/product-variants.tsx
"use client";

import { useState } from "react";

interface Variant {
  name: string;
  options: string[];
}

interface ProductVariantsProps {
  variants: Variant[];
}

export function ProductVariants({ variants }: ProductVariantsProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleSelectOption = (variantName: string, option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [variantName]: option,
    });
  };

  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.name}>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {variant.name}: {selectedOptions[variant.name] || "Seleccionar"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selectedOptions[variant.name] === option;

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(variant.name, option)}
                  className={`px-3 py-1 rounded border ${
                    isSelected
                      ? "border-primary bg-primary bg-opacity-10 text-primary"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
