export interface ShippingInfo {
  method: string;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  price: number;
  address: UserAddress; // Usando el tipo importado con alias
}
