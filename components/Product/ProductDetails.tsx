"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  RotateCw,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    reviews: number;
    stock: number;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-500">{product.category}</p>
        <h1 className="text-3xl font-bold mt-1">{product.name}</h1>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.reviews} reseñas)
          </span>
        </div>
      </div>

      <div className="text-3xl font-bold text-primary">
        ${product.price.toFixed(2)}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-medium">Cantidad</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={decreaseQuantity}
              disabled={quantity === 1}
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-16 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={increaseQuantity}
              disabled={quantity === product.stock}
            >
              +
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {product.stock > 0
            ? `${product.stock} unidades disponibles`
            : "Fuera de stock"}
        </p>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1 gap-2">
          <ShoppingCart size={18} />
          Añadir al carrito
        </Button>
        <Button variant="outline" size="icon">
          <Heart size={18} />
        </Button>
      </div>

      <div className="pt-6 border-t border-gray-200 space-y-4">
        <div className="flex items-start space-x-3">
          <Truck size={20} className="text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium">Envío gratuito</h4>
            <p className="text-sm text-gray-600">En pedidos superiores a $50</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <RotateCw size={20} className="text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium">Devoluciones sencillas</h4>
            <p className="text-sm text-gray-600">30 días para devolver</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Shield size={20} className="text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium">Garantía</h4>
            <p className="text-sm text-gray-600">1 año de garantía</p>
          </div>
        </div>
      </div>
    </div>
  );
}
