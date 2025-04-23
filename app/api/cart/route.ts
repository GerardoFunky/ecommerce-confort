// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Cart, CartItem } from "@/types/cart.types";
import { cookies } from "next/headers";

// En un proyecto real, esto estaría conectado a una base de datos
// Aquí usamos cookies para simplificar la demostración

// Función para generar un ID de carrito para usuarios no autenticados
function getCartId() {
  const cookieStore = cookies();
  let cartId = cookieStore.get("cart_id")?.value;

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    cookies().set("cart_id", cartId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
      sameSite: "strict",
    });
  }

  return cartId;
}

// Función para obtener el carrito actual desde las cookies
function getCartFromCookies(): Cart {
  const cookieStore = cookies();
  const cartDataStr = cookieStore.get("cart_data")?.value;

  if (!cartDataStr) {
    return {
      id: getCartId(),
      items: [],
      subtotal: 0,
      total: 0,
      itemCount: 0,
      discount: 0,
      couponCode: null,
    };
  }

  try {
    return JSON.parse(cartDataStr);
  } catch (e) {
    return {
      id: getCartId(),
      items: [],
      subtotal: 0,
      total: 0,
      itemCount: 0,
      discount: 0,
      couponCode: null,
    };
  }
}

// Función para guardar el carrito en las cookies
function saveCartToCookies(cart: Cart) {
  cookies().set("cart_data", JSON.stringify(cart), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    sameSite: "strict",
  });
}

// Mock de productos - En un proyecto real, estos vendrían de una base de datos
const mockProducts = [
  {
    id: "1",
    name: "Zapatillas Deportivas",
    price: 89.99,
    images: ["/images/products/shoes-1.jpg"],
  },
  {
    id: "2",
    name: "Camiseta Algodón Premium",
    price: 29.99,
    images: ["/images/products/tshirt-1.jpg"],
  },
  {
    id: "3",
    name: "Smartwatch Fitness Pro",
    price: 149.99,
    images: ["/images/products/watch-1.jpg"],
  },
];

// Función para recalcular totales del carrito
function recalculateCart(cart: Cart): Cart {
  let subtotal = 0;
  let itemCount = 0;

  cart.items.forEach((item) => {
    subtotal += item.price * item.quantity;
    itemCount += item.quantity;
  });

  const discount = cart.couponCode ? subtotal * 0.1 : 0; // 10% de descuento con cupón
  const total = subtotal - discount;

  return {
    ...cart,
    subtotal,
    total,
    itemCount,
    discount,
  };
}

// GET - Obtener carrito
export async function GET() {
  try {
    const cart = getCartFromCookies();
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    return NextResponse.json(
      { message: "Error al obtener el carrito" },
      { status: 500 }
    );
  }
}

// POST - Añadir item al carrito
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity = 1, variantId } = body;

    if (!productId) {
      return NextResponse.json(
        { message: "ID de producto requerido" },
        { status: 400 }
      );
    }

    // Buscar producto en el mock (en un proyecto real sería de la base de datos)
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const cart = getCartFromCookies();

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId === productId &&
        (!variantId || item.variantId === variantId)
    );

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Añadir nuevo item
      const newItem: CartItem = {
        id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0],
        variantId: variantId || null,
        variantName: variantId ? "Variante" : null,
      };

      cart.items.push(newItem);
    }

    // Recalcular totales
    const updatedCart = recalculateCart(cart);

    // Guardar en cookies
    saveCartToCookies(updatedCart);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error al añadir al carrito:", error);
    return NextResponse.json(
      { message: "Error al añadir al carrito" },
      { status: 500 }
    );
  }
}

// DELETE - Limpiar carrito
export async function DELETE() {
  try {
    const emptyCart: Cart = {
      id: getCartId(),
      items: [],
      subtotal: 0,
      total: 0,
      itemCount: 0,
      discount: 0,
      couponCode: null,
    };

    saveCartToCookies(emptyCart);

    return NextResponse.json(emptyCart);
  } catch (error) {
    console.error("Error al limpiar carrito:", error);
    return NextResponse.json(
      { message: "Error al limpiar el carrito" },
      { status: 500 }
    );
  }
}
