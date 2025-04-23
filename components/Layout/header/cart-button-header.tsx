import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "@/components/cart/cart-drawer";
import CartCountBadge from "@/components/cart/cart-count-badge";

const CartButton = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="relative p-2 rounded-full hover:bg-gray-100"
        aria-label="Ver carrito"
      >
        <ShoppingCart className="h-6 w-6" />
        <CartCountBadge />
      </button>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartButton;
