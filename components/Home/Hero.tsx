import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className="relative bg-gray-900 text-white py-24 rounded-lg overflow-hidden my-8">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubre Nuestra Nueva Colección
          </h1>
          <p className="text-lg mb-8">
            Productos de calidad al mejor precio. Encuentra todo lo que
            necesitas en un solo lugar.
          </p>
          <div className="flex space-x-4">
            <Button asChild size="lg">
              <Link href="/productos">Ver productos</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/ofertas">Ofertas especiales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
