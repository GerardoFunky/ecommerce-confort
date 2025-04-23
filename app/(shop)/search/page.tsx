// app/(shop)/search/page.tsx
import React from "react";
import { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import { FilterSidebar } from "@/components/layout/sidebar/filter-sidebar";
import { Pagination } from "@/components/shared/pagination";
import { ProductSortOption } from "@/types/product.types";

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  };
}

export const metadata: Metadata = {
  title: "Búsqueda | Tu E-Commerce",
  description: "Resultados de búsqueda para productos en nuestra tienda",
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q || "";

  // En una implementación real, estos datos vendrían de la API
  // Este es un ejemplo estático para la propuesta
  const mockProducts = [];
  const totalProducts = 0;
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = 0;
  const productsPerPage = 12;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {searchQuery
          ? `Resultados para "${searchQuery}"`
          : "Todos los productos"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar para filtros en dispositivos grandes */}
        <div className="lg:w-1/4">
          <FilterSidebar />
        </div>

        {/* Contenido principal */}
        <div className="lg:w-3/4">
          {/* Mobile Filters - sólo visible en móvil */}
          <FilterSidebar mobile />

          {/* Información de resultados y ordenamiento */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <p className="text-gray-600">
              {totalProducts > 0 ? (
                <>
                  Mostrando{" "}
                  {Math.min(
                    (currentPage - 1) * productsPerPage + 1,
                    totalProducts
                  )}{" "}
                  - {Math.min(currentPage * productsPerPage, totalProducts)} de{" "}
                  {totalProducts} productos
                </>
              ) : (
                "No se encontraron productos"
              )}
            </p>

            <div className="mt-4 sm:mt-0">
              <label className="mr-2">Ordenar por:</label>
              <select
                className="border rounded px-2 py-1"
                defaultValue={searchParams.sort || ProductSortOption.FEATURED}
                // En una implementación real, esto cambiaría la URL
              >
                <option value={ProductSortOption.FEATURED}>Destacados</option>
                <option value={ProductSortOption.NEWEST}>Más recientes</option>
                <option value={ProductSortOption.PRICE_LOW}>
                  Precio: Menor a mayor
                </option>
                <option value={ProductSortOption.PRICE_HIGH}>
                  Precio: Mayor a menor
                </option>
                <option value={ProductSortOption.NAME_ASC}>Nombre: A-Z</option>
                <option value={ProductSortOption.NAME_DESC}>Nombre: Z-A</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          {totalProducts > 0 ? (
            <>
              <ProductGrid products={mockProducts} />

              <div className="mt-8">
                <Pagination
                  totalItems={totalProducts}
                  itemsPerPage={productsPerPage}
                  currentPage={currentPage}
                  onPageChange={() => {}} // En la implementación real, cambiaría la URL
                />
              </div>
            </>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                No se encontraron productos que coincidan con tu búsqueda
              </h2>
              <p className="text-gray-600 mb-6">
                Intenta con otros términos o explora nuestras categorías.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/products" className="text-blue-600 hover:underline">
                  Ver todos los productos
                </a>
                <a href="/categories" className="text-blue-600 hover:underline">
                  Explorar categorías
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
