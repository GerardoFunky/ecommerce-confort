// app/(shop)/products/page.tsx
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilters } from "@/components/product/product-filter";
import { ProductSort } from "@/components/product/product-sort";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // En una implementación real, aquí obtendrías los productos del backend
  // basados en los searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/products" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Todos los Productos</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilters />
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Mostrando <span className="font-medium">X</span> productos
            </p>
            <ProductSort />
          </div>

          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
