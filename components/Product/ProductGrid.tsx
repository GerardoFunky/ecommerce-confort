import ProductCard from "./ProductCard";
import Pagination from "@/components/ui/Pagination";

// Datos de ejemplo para productos
const products = [
  {
    id: "1",
    name: "Producto 1",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 1",
    rating: 0,
  },
  {
    id: "2",
    name: "Producto 2",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
  {
    id: "3",
    name: "Producto 3",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 1",
    rating: 0,
  },
  {
    id: "4",
    name: "Producto 4",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 3",
    rating: 0,
  },
  {
    id: "5",
    name: "Producto 5",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
  {
    id: "6",
    name: "Producto 6",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 1",
    rating: 0,
  },
  {
    id: "7",
    name: "Producto 7",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 3",
    rating: 0,
  },
  {
    id: "8",
    name: "Producto 8",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
  {
    id: "9",
    name: "Producto 9",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 1",
    rating: 0,
  },
];

export default function ProductGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12">
        <Pagination currentPage={1} totalPages={5} />
      </div>
    </div>
  );
}
