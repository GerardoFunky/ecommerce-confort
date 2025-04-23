/**
 * order.types.ts
 * Definiciones de tipos relacionados con órdenes y proceso de compra
 */

import type {
  Address as UserAddress,
  User as CustomerUser,
} from "./user.types";

// Estado de la orden
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

// Método de pago
export type PaymentMethod =
  | "credit_card"
  | "paypal"
  | "bank_transfer"
  | "cash_on_delivery";

// Estado del pago
export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

// Item individual en la orden
export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image?: string;
  variant?: ProductVariant;
  metadata?: Record<string, any>;
}

// Variante de producto simplificada para OrderItem
export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  options?: Record<string, string>;
}

// Información de envío
export interface ShippingInfo {
  method: string;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  price: number;
  address: UserAddress; // Usando el tipo importado con alias
}

// Información de pago
export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  amountPaid: number;
  paidAt?: Date;
  metadata?: Record<string, any>;
}

// Resumen de totales
export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

// Descuento aplicado
export interface AppliedDiscount {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  description?: string;
}

// Orden completa
export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  user?: Partial<CustomerUser>; // Usando el tipo importado con alias
  email: string;
  items: OrderItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  status: OrderStatus;
  totals: OrderTotals;
  discount?: AppliedDiscount;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

// DTO para crear una nueva orden
export interface CreateOrderDTO {
  userId?: string;
  email: string;
  items: Omit<OrderItem, "id">[];
  shipping: Omit<ShippingInfo, "estimatedDelivery">;
  payment: Omit<PaymentInfo, "status" | "transactionId" | "paidAt">;
  discount?: Omit<AppliedDiscount, "value" | "type">;
  notes?: string;
}
