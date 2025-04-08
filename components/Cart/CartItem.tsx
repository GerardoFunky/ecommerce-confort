"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const subtotal = item.price * quantity;

  return (
    <div className="flex items-center py-4 border-b border-gray-200 last:border-0">
      {/* Imagen del producto */}
      <div className="w-20 h-20 relative bg-gray-100 rounded">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover rounded"
        />
      </div>

      {/* Información del producto */}
      <div className="ml-4 flex-grow">
        <Link
          href={`/producto/${item.id}`}
          className="font-medium hover:text-primary transition-colors"
        >
          {item.name}
        </Link>
        <div className="text-gray-500 text-sm mt-1">
          Precio unitario: ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Control de cantidad */}
      <div className="flex items-center space-x-2 mx-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={decreaseQuantity}
          disabled={quantity === 1}
        >
          -
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-12 h-8 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={increaseQuantity}
        >
          +
        </Button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[80px]">
        <div className="font-semibold">${subtotal.toFixed(2)}</div>
      </div>

      {/* Eliminar */}
      <Button variant="ghost" size="icon" className="ml-2 text-gray-500">
        <Trash2 size={18} />
      </Button>
    </div>
  );
}
