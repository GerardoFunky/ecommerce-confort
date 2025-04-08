import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group">
      <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
        <Link href={`/producto/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white rounded-full"
          >
            <Heart size={18} className="text-gray-600" />
          </Button>
        </div>
      </div>

      <CardContent className="flex-grow p-4">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <Link href={`/producto/${product.id}`} className="block">
          <h3 className="font-medium text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm ml-1">{product.rating}</span>
        </div>
        <div className="text-lg font-bold text-primary">
          ${product.price.toFixed(2)}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2">
          <ShoppingCart size={18} />
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
