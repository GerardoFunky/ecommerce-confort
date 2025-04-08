import ProductGrid from "@/components/Product/ProductGrid";
import ProductFilter from "@/components/Product/ProductFilter";
import ProductSort from "@/components/Product/ProductSort";
import Breadcrumbs from "@/components/Layout/Breadcrumbs";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos" },
        ]}
      />

      <h1 className="text-3xl font-bold mt-4 mb-8">Todos los productos</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar con filtros (en móvil estará oculto inicialmente) */}
        <div className="w-full md:w-64 shrink-0">
          <ProductFilter />
        </div>

        {/* Área principal de productos */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Mostrando 24 de 120 productos</p>
            <ProductSort />
          </div>

          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
