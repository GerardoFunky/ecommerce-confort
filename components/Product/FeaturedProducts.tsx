import ProductCard from "./ProductCard";

// Datos de ejemplo para productos destacados
const featuredProducts = [
  {
    id: "1",
    name: "Producto Destacado 1",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 1",
    rating: 0,
  },
  {
    id: "2",
    name: "Producto Destacado 2",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
  {
    id: "3",
    name: "Producto Destacado 3",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 1",
    rating: 0,
  },
  {
    id: "4",
    name: "Producto Destacado 4",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 3",
    rating: 0,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Productos Destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
