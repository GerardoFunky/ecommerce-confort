export interface CreateOrderDTO {
  userId?: string;
  email: string;
  items: Omit<OrderItem, "id">[];
  shipping: Omit<ShippingInfo, "estimatedDelivery">;
  payment: Omit<PaymentInfo, "status" | "transactionId" | "paidAt">;
  discount?: Omit<AppliedDiscount, "value" | "type">;
  notes?: string;
}
