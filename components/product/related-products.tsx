// components/product/related-products.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Product } from "@/types/product.types";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RelatedProductsProps {
  currentProduct: Product;
  title?: string;
  maxItems?: number;
  className?: string;
}

export default function RelatedProducts({
  currentProduct,
  title = "Productos relacionados",
  maxItems = 8,
  className,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Ajustar el número de items por vista según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 768) {
        setItemsPerView(2);
      } else if (width < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Obtener productos relacionados
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!currentProduct) return;

      setLoading(true);
      setError(null);

      try {
        // En un entorno real, esto sería una llamada a tu API
        // const response = await fetch(`/api/products/related?productId=${currentProduct.id}&categoryId=${currentProduct.categoryId}`);
        // const data = await response.json();
        // if (!response.ok) throw new Error(data.message || 'Error al cargar productos relacionados');

        // Simulación de datos para desarrollo
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simular delay de red

        // Datos de ejemplo
        const demoProducts: Product[] = [
          {
            id: "prod_001",
            name: "Zapatillas Running Pro",
            description:
              "Zapatillas de alto rendimiento para corredores profesionales",
            price: 129.99,
            salePrice: 99.99,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_shoes",
            stock: 45,
            rating: 4.8,
            reviewCount: 124,
            tags: ["running", "deportes", "profesional"],
          },
          {
            id: "prod_002",
            name: "Camiseta Técnica",
            description: "Camiseta de tejido técnico transpirable",
            price: 34.99,
            salePrice: null,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_clothes",
            stock: 230,
            rating: 4.5,
            reviewCount: 87,
            tags: ["running", "deportes", "verano"],
          },
          {
            id: "prod_003",
            name: "Shorts Running Ligeros",
            description: "Shorts ultraligeros con bolsillo interno",
            price: 29.99,
            salePrice: 24.99,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_clothes",
            stock: 180,
            rating: 4.6,
            reviewCount: 56,
            tags: ["running", "deportes", "verano"],
          },
          {
            id: "prod_004",
            name: "Calcetines Anti-Ampollas",
            description: "Pack de 3 pares de calcetines técnicos",
            price: 19.99,
            salePrice: null,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_accessories",
            stock: 340,
            rating: 4.9,
            reviewCount: 211,
            tags: ["running", "deportes", "accesorios"],
          },
          {
            id: "prod_005",
            name: "Botella Hidratación 750ml",
            description: "Botella con medidor de consumo diario",
            price: 24.99,
            salePrice: 21.99,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_accessories",
            stock: 120,
            rating: 4.7,
            reviewCount: 63,
            tags: ["hidratación", "deportes", "accesorios"],
          },
          {
            id: "prod_006",
            name: "Banda de Sudor",
            description: "Banda elástica absorbente para la frente",
            price: 12.99,
            salePrice: null,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_accessories",
            stock: 95,
            rating: 4.3,
            reviewCount: 42,
            tags: ["running", "deportes", "accesorios"],
          },
          {
            id: "prod_007",
            name: "Reloj GPS Running",
            description: "Reloj con GPS y monitor cardíaco",
            price: 199.99,
            salePrice: 179.99,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_electronics",
            stock: 30,
            rating: 4.8,
            reviewCount: 156,
            tags: ["running", "electrónica", "gps"],
          },
          {
            id: "prod_008",
            name: "Auriculares Deportivos",
            description: "Auriculares resistentes al agua y sudor",
            price: 89.99,
            salePrice: null,
            images: ["/api/placeholder/500/500", "/api/placeholder/500/500"],
            categoryId: "cat_electronics",
            stock: 65,
            rating: 4.5,
            reviewCount: 94,
            tags: ["running", "electrónica", "audio"],
          },
        ];

        // Filtrar para no incluir el producto actual
        const filteredProducts = demoProducts.filter(
          (product) => product.id !== currentProduct.id
        );

        // Aplicar lógica de recomendación basada en categoría y tags
        // Aquí podrías implementar algoritmos más complejos de recomendación
        const categoryMatches = filteredProducts.filter(
          (p) => p.categoryId === currentProduct.categoryId
        );
        const tagMatches = filteredProducts.filter(
          (p) =>
            p.tags?.some((tag) => currentProduct.tags?.includes(tag)) &&
            p.categoryId !== currentProduct.categoryId
        );

        // Combinar y eliminar duplicados
        const combinedProducts = [...categoryMatches];
        tagMatches.forEach((product) => {
          if (!combinedProducts.some((p) => p.id === product.id)) {
            combinedProducts.push(product);
          }
        });

        // Si aún necesitamos más productos, agregar otros al azar
        const otherProducts = filteredProducts.filter(
          (p) => !combinedProducts.some((cp) => cp.id === p.id)
        );

        while (combinedProducts.length < maxItems && otherProducts.length > 0) {
          const randomIndex = Math.floor(Math.random() * otherProducts.length);
          combinedProducts.push(otherProducts[randomIndex]);
          otherProducts.splice(randomIndex, 1);
        }

        // Limitar al número máximo de productos
        setProducts(combinedProducts.slice(0, maxItems));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError("No se pudieron cargar los productos relacionados");
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct, maxItems]);

  // Manejar navegación de carrusel
  const totalSlides = Math.max(1, Math.ceil(products.length / itemsPerView));

  const goToSlide = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentSlide(newIndex);

    // Aplicar scroll suave si es necesario
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * newIndex;
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  // Renderizado condicional para estados de carga y error
  if (loading) {
    return (
      <section className={cn("py-8", className)}>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg aspect-square mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cn("py-8", className)}>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className={cn("py-8", className)}
      aria-labelledby="related-products-heading"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 id="related-products-heading" className="text-2xl font-bold">
          {title}
        </h2>

        {totalSlides > 1 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Productos anteriores"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              aria-label="Productos siguientes"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide -mx-4 px-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={cn(
                "px-2 flex-shrink-0 snap-start",
                itemsPerView === 1
                  ? "w-full"
                  : itemsPerView === 2
                  ? "w-1/2"
                  : itemsPerView === 3
                  ? "w-1/3"
                  : "w-1/4"
              )}
            >
              <ProductCard
                product={product}
                wishlistEnabled={true}
                showQuickAdd={true}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de posición para slides */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentSlide ? "bg-primary" : "bg-gray-300"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a productos ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
