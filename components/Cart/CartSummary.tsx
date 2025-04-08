import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CartSummaryProps {
  items: {
    id: string;
    price: number;
    quantity: number;
  }[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>
          <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-end space-x-2">
            <div className="flex-grow">
              <label
                htmlFor="coupon"
                className="text-sm font-medium block mb-1"
              >
                Código de descuento
              </label>
              <Input
                id="coupon"
                type="text"
                placeholder="Introduce el código"
              />
            </div>
            <Button variant="outline">Aplicar</Button>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href="/checkout">Finalizar compra</Link>
        </Button>

        <Button variant="outline" asChild className="w-full">
          <Link href="/productos">Seguir comprando</Link>
        </Button>
      </div>
    </div>
  );
}
