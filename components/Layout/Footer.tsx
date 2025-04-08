import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Tapiceria Confort</h3>
            <p className="text-gray-600 mb-4">
              Tu tienda online de confianza para encontrar los mejores
              productos.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Tienda</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/productos"
                  className="text-gray-600 hover:text-primary"
                >
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link
                  href="/ofertas"
                  className="text-gray-600 hover:text-primary"
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  href="/novedades"
                  className="text-gray-600 hover:text-primary"
                >
                  Novedades
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="text-gray-600 hover:text-primary"
                >
                  Categorías
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Atención al cliente</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-600 hover:text-primary"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="text-gray-600 hover:text-primary"
                >
                  Envíos y devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-gray-600 hover:text-primary"
                >
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: edwin1612palacios@gmail.com</li>
              <li>Teléfono: +57 322-470-5153</li>
              <li>Dirección: Cll 4 N25-21 Barrio Magdalena </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Derechos de autor.</p>
        </div>
      </div>
    </footer>
  );
}
