"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "../product/product-card";
import { Product } from "../../types/product.types";

// Productos de ejemplo
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Camisa de Algodón Premium",
    slug: "camisa-algodon-premium",
    description: "Camisa confeccionada en algodón 100% de calidad premium.",
    shortDescription: "Camisa de algodón premium con un corte moderno.",
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.5,
    reviewCount: 24,
    images: [
      {
        id: "1",
        url: "/images/products/camisa1.jpg",
        alt: "Camisa de Algodón Premium",
        isDefault: true,
      },
    ],
    categories: [
      { id: "1", name: "Ropa", slug: "ropa" },
      { id: "2", name: "Camisas", slug: "camisas" },
    ],
    tags: ["camisa", "algodón", "premium"],
    isNew: true,
    isFeatured: true,
    variants: [
      {
        id: "1-s",
        name: "S - Blanco",
        sku: "CAM-ALG-S-W",
        price: 59.99,
        inventory: 15,
        attributes: {
          size: "S",
          color: "Blanco",
        },
      },
      {
        id: "1-m",
        name: "M - Blanco",
        sku: "CAM-ALG-M-W",
        price: 59.99,
        inventory: 20,
        attributes: {
          size: "M",
          color: "Blanco",
        },
      },
    ],
    specifications: {
      material: "Algodón 100%",
      fit: "Regular",
      careInstructions: "Lavado a máquina en frío, no usar blanqueador",
    },
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Zapatillas Deportivas Air",
    slug: "zapatillas-deportivas-air",
    description:
      "Zapatillas deportivas con tecnología de amortiguación avanzada.",
    shortDescription: "Zapatillas ligeras para running con gran amortiguación.",
    price: 129.99,
    rating: 4.8,
    reviewCount: 56,
    images: [
      {
        id: "2",
        url: "/images/products/zapatillas1.jpg",
        alt: "Zapatillas Deportivas Air",
        isDefault: true,
      },
    ],
    categories: [
      { id: "3", name: "Calzado", slug: "calzado" },
      { id: "4", name: "Deportivo", slug: "deportivo" },
    ],
    tags: ["zapatillas", "running", "deportivo"],
    isNew: false,
    isFeatured: true,
    variants: [
      {
        id: "2-40",
        name: "40 - Negro",
        sku: "ZAP-AIR-40-B",
        price: 129.99,
        inventory: 8,
        attributes: {
          size: "40",
          color: "Negro",
        },
      },
      {
        id: "2-42",
        name: "42 - Negro",
        sku: "ZAP-AIR-42-B",
        price: 129.99,
        inventory: 12,
        attributes: {
          size: "42",
          color: "Negro",
        },
      },
    ],
    specifications: {
      material: "Malla sintética, suela de caucho",
      tipo: "Running",
      peso: "310g",
    },
    createdAt: "2023-02-10T08:15:00Z",
    updatedAt: "2023-02-15T14:20:00Z",
  },
  {
    id: "3",
    name: "Bolso de Cuero Elegante",
    slug: "bolso-cuero-elegante",
    description:
      "Bolso de cuero genuino con acabados premium y gran capacidad.",
    shortDescription: "Bolso elegante de cuero con múltiples compartimentos.",
    price: 89.99,
    compareAtPrice: 119.99,
    rating: 4.7,
    reviewCount: 18,
    images: [
      {
        id: "3",
        url: "/images/products/bolso1.jpg",
        alt: "Bolso de Cuero Elegante",
        isDefault: true,
      },
    ],
    categories: [
      { id: "5", name: "Accesorios", slug: "accesorios" },
      { id: "6", name: "Bolsos", slug: "bolsos" },
    ],
    tags: ["bolso", "cuero", "elegante"],
    isNew: true,
    isFeatured: true,
    variants: [
      {
        id: "3-neg",
        name: "Negro",
        sku: "BOL-CUE-NEG",
        price: 89.99,
        inventory: 5,
        attributes: {
          color: "Negro",
        },
      },
      {
        id: "3-mar",
        name: "Marrón",
        sku: "BOL-CUE-MAR",
        price: 89.99,
        inventory: 7,
        attributes: {
          color: "Marrón",
        },
      },
    ],
    specifications: {
      material: "Cuero genuino",
      dimensiones: "30cm x 25cm x 12cm",
      forro: "Poliéster resistente al agua",
    },
    createdAt: "2023-01-28T09:45:00Z",
    updatedAt: "2023-02-01T16:10:00Z",
  },
  {
    id: "4",
    name: "Reloj Inteligente ProFit",
    slug: "reloj-inteligente-profit",
    description:
      "Reloj inteligente con monitoreo de actividad física, sueño y notificaciones.",
    shortDescription: "Smartwatch con múltiples funciones para tu bienestar.",
    price: 149.99,
    rating: 4.6,
    reviewCount: 42,
    images: [
      {
        id: "4",
        url: "/images/products/reloj1.jpg",
        alt: "Reloj Inteligente ProFit",
        isDefault: true,
      },
    ],
    categories: [
      { id: "7", name: "Electrónica", slug: "electronica" },
      { id: "8", name: "Wearables", slug: "wearables" },
    ],
    tags: ["reloj", "smartwatch", "fitness"],
    isNew: true,
    isFeatured: true,
    variants: [
      {
        id: "4-neg",
        name: "Negro",
        sku: "REL-PRO-NEG",
        price: 149.99,
        inventory: 10,
        attributes: {
          color: "Negro",
        },
      },
      {
        id: "4-pla",
        name: "Plata",
        sku: "REL-PRO-PLA",
        price: 159.99,
        inventory: 8,
        attributes: {
          color: "Plata",
        },
      },
    ],
    specifications: {
      pantalla: 'AMOLED 1.3"',
      batería: "Hasta 7 días de autonomía",
      resistencia: "Impermeable 5ATM",
      conectividad: "Bluetooth 5.0, GPS",
    },
    createdAt: "2023-03-05T11:30:00Z",
    updatedAt: "2023-03-10T09:20:00Z",
  },
];

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga de productos desde API
  useEffect(() => {
    // En un caso real, aquí se haría una llamada API
    const fetchProducts = async () => {
      try {
        // Simulamos un retardo para mostrar el estado de carga
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProducts(dummyProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="aspect-square w-full bg-gray-200 rounded-md mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
