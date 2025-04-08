import { Star, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

// Datos de ejemplo para reseñas
const reviews = [
  {
    id: "1",
    name: "Usuario Ejemplo",
    date: "15 de marzo de 2025",
    rating: 5,
    comment:
      "Excelente producto, superó mis expectativas. La calidad es increíble y el envío fue muy rápido.",
    helpful: 8,
  },
  {
    id: "2",
    name: "Cliente Satisfecho",
    date: "10 de marzo de 2025",
    rating: 4,
    comment:
      "Muy buen producto, relación calidad-precio inmejorable. Lo recomendaría sin duda.",
    helpful: 3,
  },
  {
    id: "3",
    name: "Comprador Frecuente",
    date: "5 de marzo de 2025",
    rating: 4,
    comment:
      "Cumple perfectamente con lo esperado. Estoy muy contento con la compra.",
    helpful: 1,
  },
];

// Distribución de valoraciones
const ratingDistribution = {
  5: 70,
  4: 20,
  3: 5,
  2: 3,
  1: 2,
};

export default function ProductReviews({
  productId,
  rating,
  reviewCount,
}: ProductReviewsProps) {
  return (
    <div className="space-y-8">
      {/* Resumen de valoraciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 mt-2">{reviewCount} reseñas</p>
          <Button className="mt-4">Escribir una reseña</Button>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <div className="flex items-center w-16">
                <span>{stars}</span>
                <Star
                  size={14}
                  className="ml-1 text-yellow-400 fill-yellow-400"
                />
              </div>
              <Progress
                value={
                  ratingDistribution[stars as keyof typeof ratingDistribution]
                }
                className="h-2 flex-1"
              />
              <span className="text-sm text-gray-500 w-8 text-right">
                {ratingDistribution[stars as keyof typeof ratingDistribution]}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de reseñas */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-4">Reseñas de clientes</h3>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{review.name}</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              <p className="my-4 text-gray-700">{review.comment}</p>

              <Button variant="ghost" size="sm" className="text-gray-600">
                <ThumbsUp size={14} className="mr-1" />
                Útil ({review.helpful})
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
