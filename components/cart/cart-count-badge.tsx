import { useCart } from "@/app/hooks/useCart";

interface CartCountBadgeProps {
  className?: string;
}

const CartCountBadge = ({ className = "" }: CartCountBadgeProps) => {
  const { cart } = useCart();

  interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    // otras propiedades...
  }

  // Calculate total number of items
  const itemCount = cart.items.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0
  );
  // Don't show badge if cart is empty
  if (itemCount === 0) return null;

  return (
    <span
      className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${className}`}
    >
      {itemCount > 99 ? "99+" : itemCount}
    </span>
  );
};

export default CartCountBadge;
