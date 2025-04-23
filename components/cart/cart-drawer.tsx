import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useCart } from "@/app/hooks/useCart";
import CartItem from "./cart-item";
import CartSummary from "./cart-summary";
import CartEmpty from "./cart-empty";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when drawer is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Tu carrito</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Cerrar carrito"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <CartEmpty onClose={onClose} />
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.selectedVariant}`}
                    item={item}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <CartSummary cart={cart} />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={onClose} className="w-full">
                  Seguir comprando
                </Button>
                <Button onClick={handleCheckout} className="w-full">
                  Proceder al pago
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
