import ProductCard from "./ProductCard";

// Datos de ejemplo para productos relacionados
const relatedProducts = [
  {
    id: "101",
    name: "Producto Relacionado 1",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
  {
    id: "102",
    name: "Producto Relacionado 2",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
  {
    id: "103",
    name: "Producto Relacionado 3",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
  {
    id: "104",
    name: "Producto Relacionado 4",
    price: 0,
    image: "/api/placeholder/300/300",
    category: "Categoría 2",
    rating: 0,
  },
];

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({
  currentProductId,
}: RelatedProductsProps) {
  // En una app real filtraríamos para excluir el producto actual
  const filteredProducts = relatedProducts.filter(
    (p) => p.id !== currentProductId
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
