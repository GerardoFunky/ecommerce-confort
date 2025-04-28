// Descuento aplicado
export interface AppliedDiscount {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  description?: string;
}
