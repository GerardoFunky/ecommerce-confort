import Hero from "@/components/Home/Hero";
import FeaturedProducts from "@/components/Product/FeaturedProducts";
import CategoriesShowcase from "@/components/Home/CategoriesShowcase";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <FeaturedProducts />
      <CategoriesShowcase />
    </div>
  );
}
