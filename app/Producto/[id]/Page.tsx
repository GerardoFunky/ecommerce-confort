import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Layout/Breadcrumbs";
import ProductGallery from "@/components/Product/ProductGallery";
import ProductDetails from "@/components/Product/ProductDetails";
import RelatedProducts from "@/components/Product/RelatedProducts";
import ProductReviews from "@/components/Product/ProductReviews";
import ProductSpecs from "@/components/Product/ProductSpecs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulación de obtención de producto desde alguna fuente de datos
const getProduct = (id: string) => {
  // Producto de ejemplo
  return {
    id,
    name: "Producto de ejemplo",
    price: 129.99,
    description:
      "Este es un producto de alta calidad con características excepcionales. Perfecto para cualquier ocasión y diseñado para durar.",
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
    ],
    category: "Categoría 2",
    rating: 4.7,
    reviews: 24,
    stock: 15,
    specs: {
      Material: "Premium",
      Dimensiones: "30 x 20 x 10 cm",
      Peso: "500g",
      Color: "Negro",
    },
  };
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos" },
          { label: product.name, href: `/producto/${product.id}` },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <ProductGallery images={product.images} />
        <ProductDetails product={product} />
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specs">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>BLABLABLA</p>
              <p>BLABLABLA</p>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="py-6">
            <ProductSpecs specs={product.specs} />
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <ProductReviews
              productId={product.id}
              rating={product.rating}
              reviewCount={product.reviews}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <RelatedProducts currentProductId={product.id} />
      </div>
    </div>
  );
}
