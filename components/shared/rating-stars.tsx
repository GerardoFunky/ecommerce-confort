import React from "react";

type StarSize = "sm" | "md" | "lg";

interface RatingStarsProps {
  rating: number;
  size?: StarSize;
  showEmpty?: boolean;
}

export function RatingStars({
  rating,
  size = "md",
  showEmpty = true,
}: RatingStarsProps) {
  // Tamaños de estrellas según el tamaño elegido
  const starSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  // Redondear el rating a 0.5 más cercano
  const roundedRating = Math.round(rating * 2) / 2;

  // Crear un array de 5 estrellas
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      // Estrella completa
      stars.push(<StarFull key={i} className={starSizeClasses[size]} />);
    } else if (i - 0.5 === roundedRating) {
      // Media estrella
      stars.push(<StarHalf key={i} className={starSizeClasses[size]} />);
    } else if (showEmpty) {
      // Estrella vacía
      stars.push(<StarEmpty key={i} className={starSizeClasses[size]} />);
    }
  }

  return <div className="flex items-center">{stars}</div>;
}

// Componentes de estrella
function StarFull({ className }: { className: string }) {
  return (
    <svg
      className={`text-yellow-400 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarHalf({ className }: { className: string }) {
  return (
    <svg
      className={`text-yellow-400 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <defs>
        <linearGradient id="halfStarGradient">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <path
        fill="url(#halfStarGradient)"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

function StarEmpty({ className }: { className: string }) {
  return (
    <svg
      className={`text-gray-300 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
