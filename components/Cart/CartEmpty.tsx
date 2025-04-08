import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

export default function CartEmpty() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
        <ShoppingBag size={32} className="text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Parece que aún no has añadido ningún producto a tu carrito de compra.
      </p>
      <Button asChild>
        <Link href="/productos">Explorar productos</Link>
      </Button>
    </div>
  );
}
