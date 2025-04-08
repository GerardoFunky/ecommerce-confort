import Link from "next/link";
import { ShoppingCart, Heart, User, Search, Menu } from "lucide-react";
import { Button } from "../ui/button";
import SearchBar from "@/components/ui/SearchBar";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Tapiceria Confort
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/productos"
              className="font-medium text-gray-600 hover:text-primary"
            >
              Productos
            </Link>
            <Link
              href="/categorias"
              className="font-medium text-gray-600 hover:text-primary"
            >
              Categorías
            </Link>
            <Link
              href="/ofertas"
              className="font-medium text-gray-600 hover:text-primary"
            >
              Ofertas
            </Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block w-1/3">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart size={20} className="text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/carrito">
                <ShoppingCart size={20} className="text-gray-600" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Link href="/mi-cuenta">
                <User size={20} className="text-gray-600" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
