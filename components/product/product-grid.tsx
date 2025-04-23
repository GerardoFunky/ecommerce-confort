// components/product/product-grid.tsx
import { ProductCard } from "./product-card";
import { Product } from "@/types/product.types";

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
}

export function ProductGrid({
  products = [],
  isLoading = false,
}: ProductGridProps) {
  // Productos de ejemplo para desarrollo (en una implementación real vendrían de una API)
  const demoProducts: Product[] =
    products.length > 0
      ? products
      : [
          {
            id: "1",
            name: "Camiseta Básica",
            description: "Camiseta 100% algodón",
            price: 19.99,
            images: ["/images/products/tshirt-1.jpg"],
            rating: 4.5,
            reviews: 120,
            category: "ropa",
            slug: "camiseta-basica",
            stock: 50,
          },
          {
            id: "2",
            name: "Pantalón Vaquero",
            description: "Pantalón vaquero slim fit",
            price: 49.99,
            images: ["/images/products/jeans-1.jpg"],
            rating: 4.2,
            reviews: 85,
            category: "ropa",
            slug: "pantalon-vaquero",
            stock: 30,
          },
          {
            id: "3",
            name: "Zapatillas Deportivas",
            description: "Zapatillas para running",
            price: 89.99,
            images: ["/images/products/shoes-1.jpg"],
            rating: 4.8,
            reviews: 230,
            category: "calzado",
            slug: "zapatillas-deportivas",
            stock: 15,
          },
          {
            id: "4",
            name: "Bolso de Cuero",
            description: "Bolso de cuero genuino",
            price: 129.99,
            images: ["/images/products/bag-1.jpg"],
            rating: 4.7,
            reviews: 65,
            category: "accesorios",
            slug: "bolso-cuero",
            stock: 10,
          },
          {
            id: "5",
            name: "Reloj Analógico",
            description: "Reloj clásico con correa de cuero",
            price: 199.99,
            images: ["/images/products/watch-1.jpg"],
            rating: 4.9,
            reviews: 42,
            category: "accesorios",
            slug: "reloj-analogico",
            stock: 8,
          },
          {
            id: "6",
            name: "Gafas de Sol",
            description: "Gafas de sol polarizadas",
            price: 59.99,
            images: ["/images/products/sunglasses-1.jpg"],
            rating: 4.3,
            reviews: 110,
            category: "accesorios",
            slug: "gafas-sol",
            stock: 25,
          },
        ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {demoProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
