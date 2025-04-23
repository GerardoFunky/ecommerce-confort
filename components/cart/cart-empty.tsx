import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartEmptyProps {
  onClose: () => void;
}

const CartEmpty = ({ onClose }: CartEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <ShoppingBag className="h-10 w-10 text-gray-400" />
      </div>

      <h3 className="text-lg font-medium mb-2">Tu carrito está vacío</h3>

      <p className="text-gray-500 mb-6">
        Parece que aún no has añadido ningún producto a tu carrito.
      </p>

      <Link href="/products" passHref>
        <Button onClick={onClose} className="w-full max-w-xs">
          Explorar productos
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
