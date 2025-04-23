import { HeroSlider } from "../components/home/hero-slider";
import { FeaturedProducts } from "../components/home/featured-products";
import { CategoryShowcase } from "../components/home/category-showcase";
import { PromotionBanner } from "../components/home/promotions-banner";
import { Testimonials } from "../components/home/testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | TiendaNext - Tu tienda online de confianza",
  description:
    "Descubre los mejores productos con los mejores precios en TiendaNext",
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSlider />

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Categorías destacadas
        </h2>
        <CategoryShowcase />
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Productos destacados
        </h2>
        <FeaturedProducts />
      </section>

      <PromotionBanner />

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Lo que dicen nuestros clientes
        </h2>
        <Testimonials />
      </section>
    </div>
  );
}
