// components/layout/header/navigation.tsx
import Link from "next/link";
import { routes } from "@/lib/constants/routes";

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link
        href={routes.home}
        className="text-gray-900 hover:text-primary transition-colors"
      >
        Inicio
      </Link>
      <Link
        href={routes.products}
        className="text-gray-900 hover:text-primary transition-colors"
      >
        Productos
      </Link>
      <Link
        href={routes.categories}
        className="text-gray-900 hover:text-primary transition-colors"
      >
        Categorías
      </Link>
      <Link
        href={routes.collections}
        className="text-gray-900 hover:text-primary transition-colors"
      >
        Colecciones
      </Link>
      <Link
        href={routes.about}
        className="text-gray-900 hover:text-primary transition-colors"
      >
        Nosotros
      </Link>
      <Link
        href={routes.contact}
        className="text-gray-900 hover:text-primary transition-colors"
      >
        Contacto
      </Link>
    </nav>
  );
}
