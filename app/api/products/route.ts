// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/product.types";

// Datos de demostración - En un proyecto real, esto vendría de una base de datos
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Zapatillas Deportivas",
    slug: "zapatillas-deportivas",
    description: "Zapatillas cómodas para actividades deportivas",
    price: 89.99,
    compareAtPrice: 119.99,
    images: ["/images/products/shoes-1.jpg", "/images/products/shoes-2.jpg"],
    category: "calzado",
    tags: ["deporte", "running", "comodidad"],
    rating: 4.5,
    reviewCount: 123,
    stock: 50,
    isFeatured: true,
    variants: [
      { id: "1-1", name: "Talla", value: "39" },
      { id: "1-2", name: "Talla", value: "40" },
      { id: "1-3", name: "Talla", value: "41" },
      { id: "1-4", name: "Talla", value: "42" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Camiseta Algodón Premium",
    slug: "camiseta-algodon-premium",
    description: "Camiseta de algodón 100% de alta calidad",
    price: 29.99,
    compareAtPrice: 39.99,
    images: ["/images/products/tshirt-1.jpg", "/images/products/tshirt-2.jpg"],
    category: "ropa",
    tags: ["camiseta", "algodón", "casual"],
    rating: 4.2,
    reviewCount: 89,
    stock: 150,
    isFeatured: true,
    variants: [
      { id: "2-1", name: "Talla", value: "S" },
      { id: "2-2", name: "Talla", value: "M" },
      { id: "2-3", name: "Talla", value: "L" },
      { id: "2-4", name: "Talla", value: "XL" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Smartwatch Fitness Pro",
    slug: "smartwatch-fitness-pro",
    description: "Reloj inteligente con múltiples funciones para deporte",
    price: 149.99,
    compareAtPrice: 199.99,
    images: ["/images/products/watch-1.jpg", "/images/products/watch-2.jpg"],
    category: "accesorios",
    tags: ["reloj", "tecnología", "fitness"],
    rating: 4.7,
    reviewCount: 215,
    stock: 30,
    isFeatured: true,
    variants: [
      { id: "3-1", name: "Color", value: "Negro" },
      { id: "3-2", name: "Color", value: "Plata" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    // Extraer parámetros de consulta
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "99999");

    // Filtrar productos
    let filteredProducts = [...mockProducts];

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (minPrice > 0 || maxPrice < 99999) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
    }

    // Ordenar productos
    if (sortBy) {
      switch (sortBy) {
        case "price_asc":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          filteredProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    // Paginación
    const total = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + limit
    );

    return NextResponse.json({
      products: paginatedProducts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { message: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

// En un proyecto real, implementaríamos POST para crear productos
export async function POST(request: NextRequest) {
  try {
    // Solo para administradores - En un proyecto real necesitaríamos autenticación
    return NextResponse.json(
      { message: "Método no implementado" },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear producto" },
      { status: 500 }
    );
  }
}
