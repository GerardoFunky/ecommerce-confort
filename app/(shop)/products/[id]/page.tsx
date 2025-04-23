// app/(shop)/products/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductVariants } from "@/components/product/product-variants";
import { ProductQuantity } from "@/components/product/product-quantity";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductSpecifications } from "@/components/product/product-specifications";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";
import { formatCurrency } from "@/lib/utils/format-currency";
import { RatingStars } from "@/components/shared/rating-stars";

// Esta función sería reemplazada por una llamada real a la API
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Camiseta Básica",
      description:
        "Camiseta 100% algodón de alta calidad. Perfecta para uso diario con un ajuste cómodo y material transpirable. Disponible en varios colores y tallas.",
      price: 19.99,
      images: [
        "/images/products/tshirt-1.jpg",
        "/images/products/tshirt-2.jpg",
        "/images/products/tshirt-3.jpg",
      ],
      rating: 4.5,
      reviews: 120,
      category: "ropa",
      slug: "camiseta-basica",
      stock: 50,
      variants: [
        { name: "Color", options: ["Blanco", "Negro", "Azul", "Rojo"] },
        { name: "Talla", options: ["XS", "S", "M", "L", "XL"] },
      ],
      specifications: [
        { name: "Material", value: "100% Algodón" },
        { name: "Peso", value: "180g/m²" },
        { name: "Origen", value: "Fabricado en España" },
        { name: "Cuidado", value: "Lavado a máquina a 30°C" },
      ],
    },
  ];

  return products.find((product) => product.id === id);
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/products" },
          { label: product.name, href: `/products/${product.id}` },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <ProductGallery images={product.images} />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <RatingStars rating={product.rating} />
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviews} reseñas)
            </span>
          </div>

          <div className="text-2xl font-bold text-primary mb-6">
            {formatCurrency(product.price)}
          </div>

          <p className="text-gray-700 mb-8">{product.description}</p>

          {product.variants && (
            <div className="mb-8">
              <ProductVariants variants={product.variants} />
            </div>
          )}

          <div className="flex items-center space-x-4 mb-8">
            <ProductQuantity maxQuantity={product.stock} />
            <AddToCartButton product={product} />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Disponibilidad:{" "}
              <span className="font-medium text-green-600">En stock</span>
              {product.stock > 0 ? (
                <span className="font-medium text-green-600">
                  {" "}
                  En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="font-medium text-red-600"> Agotado</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Especificaciones</h2>
        <ProductSpecifications specifications={product.specifications} />
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Valoraciones y Reseñas</h2>
        <ProductReviews
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviews}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        <RelatedProducts
          categoryId={product.category}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
