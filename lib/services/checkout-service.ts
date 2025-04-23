import {
  OrderSummary,
  ShippingDetails,
  PaymentDetails,
} from "@/app/types/order.types

/**
 * Servicio para manejar el proceso de pago (checkout)
 */
export class CheckoutService {
  /**
   * Calcula los impuestos basados en el subtotal y la dirección de envío
   */
  public static calculateTax(
    subtotal: number,
    shippingCountry: string,
    shippingState?: string
  ): number {
    // Tasas básicas de impuestos por país (en producción, esto sería más complejo)
    const taxRates: Record<string, number> = {
      US: 0.0725, // Promedio de EE.UU.
      CA: 0.05, // GST de Canadá
      MX: 0.16, // IVA de México
      ES: 0.21, // IVA de España
      // Añadir más países según necesidad
    };

    // Tasa de impuesto predeterminada si no se encuentra el país
    const taxRate = taxRates[shippingCountry] || 0.1;

    // En producción, habría lógica específica para estados/provincias
    if (shippingCountry === "US" && shippingState) {
      // Lógica para tasas por estado de EE.UU.
    }

    return parseFloat((subtotal * taxRate).toFixed(2));
  }

  /**
   * Valida la dirección de envío
   */
  public static validateShippingDetails(
    shippingDetails: ShippingDetails
  ): string[] {
    const errors: string[] = [];

    if (
      !shippingDetails.fullName ||
      shippingDetails.fullName.trim().length < 3
    ) {
      errors.push("El nombre completo es requerido");
    }

    if (!shippingDetails.address || shippingDetails.address.trim().length < 5) {
      errors.push("La dirección es requerida");
    }

    if (!shippingDetails.city || shippingDetails.city.trim().length < 2) {
      errors.push("La ciudad es requerida");
    }

    if (
      !shippingDetails.postalCode ||
      shippingDetails.postalCode.trim().length < 3
    ) {
      errors.push("El código postal es requerido");
    }

    if (!shippingDetails.country || shippingDetails.country.trim().length < 2) {
      errors.push("El país es requerido");
    }

    return errors;
  }

  /**
   * Valida los datos de pago
   */
  public static validatePaymentDetails(
    paymentDetails: PaymentDetails
  ): string[] {
    const errors: string[] = [];

    if (
      !paymentDetails.cardNumber ||
      !/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ""))
    ) {
      errors.push("El número de tarjeta debe tener 16 dígitos");
    }

    if (
      !paymentDetails.cardHolder ||
      paymentDetails.cardHolder.trim().length < 3
    ) {
      errors.push("El nombre del titular es requerido");
    }

    const currentYear = new Date().getFullYear() % 100; // Últimos 2 dígitos del año
    const currentMonth = new Date().getMonth() + 1; // getMonth() es base 0

    const expMonth = parseInt(paymentDetails.expiryMonth);
    const expYear = parseInt(paymentDetails.expiryYear);

    if (isNaN(expMonth) || expMonth < 1 || expMonth > 12) {
      errors.push("El mes de expiración no es válido");
    }

    if (
      isNaN(expYear) ||
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      errors.push("La fecha de expiración no es válida o ya pasó");
    }

    if (!paymentDetails.cvv || !/^\d{3,4}$/.test(paymentDetails.cvv)) {
      errors.push("El código de seguridad debe tener 3 o 4 dígitos");
    }

    return errors;
  }

  /**
   * Genera un resumen del pedido
   */
  public static generateOrderSummary(
    items: any[],
    shippingCost: number,
    discountCode?: string
  ): OrderSummary {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Aplicar descuento si existe
    let discount = 0;
    if (discountCode) {
      // Aquí iría la lógica para validar y aplicar el código de descuento
      // Por simplicidad, aplicamos un 10% de descuento
      discount = parseFloat((subtotal * 0.1).toFixed(2));
    }

    const tax = parseFloat((subtotal * 0.21).toFixed(2)); // IVA estándar
    const total = parseFloat(
      (subtotal - discount + tax + shippingCost).toFixed(2)
    );

    return {
      items,
      subtotal,
      discount,
      tax,
      shippingCost,
      total,
      discountCode,
    };
  }

  /**
   * Formatea el número de pedido
   */
  public static formatOrderNumber(orderId: number | string): string {
    const id = typeof orderId === "number" ? orderId : parseInt(orderId);
    return `ORD-${String(id).padStart(6, "0")}`;
  }

  /**
   * Obtiene métodos de pago disponibles por país
   */
  public static getAvailablePaymentMethods(countryCode: string): string[] {
    const universalMethods = ["credit_card", "debit_card", "paypal"];

    // Métodos específicos por país
    const countrySpecificMethods: Record<string, string[]> = {
      ES: [...universalMethods, "bizum", "transferencia"],
      MX: [...universalMethods, "oxxo", "spei"],
      BR: [...universalMethods, "boleto", "pix"],
      // Añadir más según se necesite
    };

    return countrySpecificMethods[countryCode] || universalMethods;
  }
}

export default CheckoutService;
