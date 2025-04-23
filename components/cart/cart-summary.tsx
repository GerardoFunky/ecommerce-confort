import { Cart } from "@/types/cart.types";
import { formatCurrency } from "@/lib/utils/format-currency";

interface CartSummaryProps {
  cart: Cart;
}

const CartSummary = ({ cart }: CartSummaryProps) => {
  // Calculate subtotal
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Hardcoded shipping cost for demo purposes
  // In a real application, this might come from an API or be calculated based on location
  const shippingCost = subtotal > 100 ? 0 : 10;

  // Calculate total
  const total = subtotal + shippingCost;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span>
          {shippingCost === 0 ? "Gratis" : formatCurrency(shippingCost)}
        </span>
      </div>

      {shippingCost > 0 && (
        <div className="text-xs text-gray-500">
          Añade {formatCurrency(100 - subtotal)} más para envío gratis
        </div>
      )}

      <div className="h-px bg-gray-200 my-2"></div>

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
