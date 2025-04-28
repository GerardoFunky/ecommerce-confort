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
