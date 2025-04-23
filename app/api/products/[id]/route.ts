// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/product.types";

// Datos de demostración - Igual que en route.ts pero mantenemos aquí para independencia del archivo
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error in product API:", error);
    return NextResponse.json(
      { message: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}

// En un proyecto real, implementaríamos PUT y DELETE para actualizar y eliminar productos
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Solo para administradores
  return NextResponse.json(
    { message: "Método no implementado" },
    { status: 501 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Solo para administradores
  return NextResponse.json(
    { message: "Método no implementado" },
    { status: 501 }
  );
}
