import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/hooks/useCart";
import { Product, ProductVariant } from "@/types/product.types";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  onSuccess?: () => void;
}

const AddToCartButton = ({
  product,
  quantity,
  selectedVariant,
  onSuccess,
}: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    // Add to cart
    // 1. Define el tipo CartItem que corresponda con lo que espera addItem
    interface CartItem {
      id: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
      selectedVariant?: ProductVariant | null; // Asumiendo que este es el tipo correcto
    }

    // 2. Asegúrate de que el objeto que pasas coincida con CartItem
    function addToCart(
      product: Product,
      quantity: number,
      selectedVariant?: ProductVariant | null
    ) {
      // Verifica que product.images[0] existe antes de usarlo
      const image =
        product.images && product.images.length > 0
          ? product.images[0]
          : "/placeholder-image.jpg"; // Imagen por defecto

      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: image,
        quantity: quantity,
        // Solo incluye selectedVariant si existe
        ...(selectedVariant ? { selectedVariant } : {}),
      };

      // Ahora llama a la función con el objeto correctamente tipado
      // Si addItem espera solo el ID del producto como string
      addItem(product.id); // Pasamos solo el ID en lugar del objeto completo
    }
    // Show success state temporarily
    setIsAdding(false);
    setIsAdded(true);

    // Reset state after delay
    setTimeout(() => {
      setIsAdded(false);
      if (onSuccess) onSuccess();
    }, 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className="w-full"
    >
      {isAdding ? (
        <span>Añadiendo...</span>
      ) : isAdded ? (
        <span className="flex items-center justify-center">
          <Check className="mr-2 h-4 w-4" /> Añadido al carrito
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
        </span>
      )}
    </Button>
  );
};

export default AddToCartButton;
