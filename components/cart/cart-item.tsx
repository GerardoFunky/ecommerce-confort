import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/app/hooks/useCart";
import { CartItem as CartItemType } from "@/types/cart.types";
import { formatCurrency } from "@/lib/utils/format-currency";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(item.id, newQuantity, item.selectedVariant);
  };

  const handleRemove = () => {
    removeItem(item.id, item.selectedVariant);
  };

  // Display variant information if available
  const variantLabel = item.selectedVariant
    ? `${item.selectedVariant.type}: ${item.selectedVariant.value}`
    : "";

  return (
    <div className="flex gap-4 py-3 border-b last:border-b-0">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm truncate">{item.name}</h3>
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 flex-shrink-0"
            aria-label="Eliminar producto"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Variant info if available */}
        {variantLabel && (
          <p className="text-xs text-gray-500 mt-1">{variantLabel}</p>
        )}

        <div className="flex justify-between items-end mt-2">
          {/* Quantity controls */}
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-2 py-1 hover:bg-gray-100"
              aria-label="Disminuir cantidad"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 text-sm">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-2 py-1 hover:bg-gray-100"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
