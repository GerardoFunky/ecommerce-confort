import Link from "next/link";
import Image from "next/image";

// Datos de ejemplo para categorías
const categories = [
  {
    id: "1",
    name: "Categoría 1",
    image: "/api/placeholder/500/300",
    count: 0,
  },
  {
    id: "2",
    name: "Categoría 2",
    image: "/api/placeholder/500/300",
    count: 0,
  },
  {
    id: "3",
    name: "Categoría 3",
    image: "/api/placeholder/500/300",
    count: 0,
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explora Nuestras Categorías
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              href={`/productos/categorias/${category.id}`}
              key={category.id}
              className="group relative rounded-lg overflow-hidden h-64"
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors z-10"></div>
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm">{category.count} Productos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
