import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Layout/Breadcrumbs";
import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import CartEmpty from "@/components/Cart/CartEmpty";

// Datos de ejemplo para el carrito
const cartItems = [
  {
    id: "1",
    name: "Producto 1",
    price: 0,
    image: "/api/placeholder/100/100",
    quantity: 0,
  },
  {
    id: "2",
    name: "Producto 2",
    price: 0,
    image: "/api/placeholder/100/100",
    quantity: 0,
  },
];

export default function CartPage() {
  const isEmpty = cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Carrito", href: "/carrito" },
        ]}
      />

      <h1 className="text-3xl font-bold mt-4 mb-8">Carrito de compra</h1>

      {isEmpty ? (
        <CartEmpty />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Resumen del carrito */}
          <div className="lg:col-span-1">
            <CartSummary items={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
}
