// app/api/cart/coupon/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Cart } from "@/types/cart.types";
import { cookies } from "next/headers";

// Función para obtener el carrito actual desde las cookies
function getCartFromCookies(): Cart {
  const cookieStore = cookies();
  const cartDataStr = cookieStore.get("cart_data")?.value;

  if (!cartDataStr) {
    return {
      id: "no_cart",
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
      id: "error_cart",
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

// Función para recalcular totales del carrito
function recalculateCart(cart: Cart): Cart {
  let subtotal = 0;
  let itemCount = 0;

  cart.items.forEach((item) => {
    subtotal += item.price * item.quantity;
    itemCount += item.quantity;
  });

  // En un proyecto real, aquí verificaríamos el tipo y valor del cupón
  let discount = 0;
  if (cart.couponCode) {
    // Simulamos un descuento del 10%
    discount = subtotal * 0.1;
  }

  const total = subtotal - discount;

  return {
    ...cart,
    subtotal,
    total,
    itemCount,
    discount,
  };
}

// Mock de cupones válidos
const validCoupons = ["DESCUENTO10", "BIENVENIDO", "PRIMAVERA"];

// POST - Aplicar cupón al carrito
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { couponCode } = body;

    if (!couponCode) {
      return NextResponse.json(
        { message: "Código de cupón requerido" },
        { status: 400 }
      );
    }

    // Verificar si el cupón es válido
    if (!validCoupons.includes(couponCode)) {
      return NextResponse.json(
        { message: "Cupón inválido o expirado" },
        { status: 400 }
      );
    }

    const cart = getCartFromCookies();

    // Aplicar cupón al carrito
    cart.couponCode = couponCode;

    // Recalcular totales con el descuento aplicado
    const updatedCart = recalculateCart(cart);

    // Guardar en cookies
    saveCartToCookies(updatedCart);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error al aplicar cupón:", error);
    return NextResponse.json(
      { message: "Error al aplicar el cupón" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar cupón del carrito
export async function DELETE() {
  try {
    const cart = getCartFromCookies();

    // Eliminar cupón
    cart.couponCode = null;

    // Recalcular totales sin descuento
    const updatedCart = recalculateCart(cart);

    // Guardar en cookies
    saveCartToCookies(updatedCart);

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error al eliminar cupón:", error);
    return NextResponse.json(
      { message: "Error al eliminar el cupón" },
      { status: 500 }
    );
  }
}
