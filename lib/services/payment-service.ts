import {
  PaymentDetails,
  PaymentMethod,
  PaymentResponse,
} from "@/types/order.types";

export interface StripePaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "succeeded"
    | "canceled";
}

/**
 * Servicio para procesar pagos
 */
export class PaymentService {
  private static apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  private static stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_KEY || "";
  private static paypalClientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  /**
   * Inicializa un intento de pago con Stripe
   */
  public static async createStripePaymentIntent(
    amount: number,
    currency: string = "eur",
    metadata: Record<string, any> = {}
  ): Promise<StripePaymentIntent | null> {
    try {
      const response = await fetch(
        `${this.apiUrl}/api/payments/stripe/create-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, currency, metadata }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el intento de pago");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en createStripePaymentIntent:", error);
      return null;
    }
  }

  /**
   * Confirma un pago con Stripe
   */
  public static async confirmStripePayment(
    paymentIntentId: string,
    paymentMethod: string
  ): Promise<PaymentResponse> {
    try {
      const response = await fetch(
        `${this.apiUrl}/api/payments/stripe/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentIntentId, paymentMethod }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Error al confirmar el pago",
        };
      }

      const data = await response.json();
      return {
        success: true,
        transactionId: data.id,
        status: data.status,
      };
    } catch (error) {
      return {
        success: false,
        error: "Error en la comunicación con el servidor de pagos",
      };
    }
  }

  /**
   * Inicializa un pago con PayPal
   */
  public static async createPaypalOrder(
    amount: number,
    currency: string = "EUR"
  ): Promise<{ orderId: string } | null> {
    try {
      const response = await fetch(
        `${this.apiUrl}/api/payments/paypal/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, currency }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la orden de PayPal");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en createPaypalOrder:", error);
      return null;
    }
  }

  /**
   * Captura un pago de PayPal
   */
  public static async capturePaypalOrder(
    orderId: string
  ): Promise<PaymentResponse> {
    try {
      const response = await fetch(
        `${this.apiUrl}/api/payments/paypal/capture-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Error al capturar el pago de PayPal",
        };
      }

      const data = await response.json();
      return {
        success: true,
        transactionId: data.id,
        status: data.status,
      };
    } catch (error) {
      return {
        success: false,
        error: "Error en la comunicación con el servidor de pagos",
      };
    }
  }

  /**
   * Procesa un pago basado en el método seleccionado
   */
  public static async processPayment(
    amount: number,
    currency: string,
    paymentMethod: PaymentMethod,
    paymentDetails: PaymentDetails,
    orderId: string
  ): Promise<PaymentResponse> {
    try {
      switch (paymentMethod) {
        case "credit_card":
        case "debit_card":
          const paymentIntent = await this.createStripePaymentIntent(
            amount * 100, // Stripe trabaja en centavos
            currency,
            { orderId }
          );

          if (!paymentIntent) {
            return {
              success: false,
              error: "No se pudo iniciar el proceso de pago",
            };
          }

          return {
            success: true,
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
          };

        case "paypal":
          const paypalOrder = await this.createPaypalOrder(amount, currency);

          if (!paypalOrder) {
            return {
              success: false,
              error: "No se pudo crear la orden de PayPal",
            };
          }

          return {
            success: true,
            paypalOrderId: paypalOrder.orderId,
          };

        case "bizum":
        case "transferencia":
        case "oxxo":
        case "spei":
        case "boleto":
        case "pix":
          // Métodos locales - simulamos una respuesta de éxito
          // En producción, aquí iría la integración con el proveedor específico
          return {
            success: true,
            transactionId: `LOCAL-${orderId}-${Date.now()}`,
            additionalInfo: `Instrucciones para completar el pago con ${paymentMethod}`,
          };

        default:
          return { success: false, error: "Método de pago no soportado" };
      }
    } catch (error) {
      console.error("Error en processPayment:", error);
      return { success: false, error: "Error al procesar el pago" };
    }
  }

  /**
   * Verifica el estado de un pago
   */
  public static async checkPaymentStatus(
    transactionId: string,
    paymentMethod: PaymentMethod
  ): Promise<{ status: string; paid: boolean }> {
    try {
      const response = await fetch(`${this.apiUrl}/api/payments/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId, paymentMethod }),
      });

      if (!response.ok) {
        throw new Error("Error al verificar el estado del pago");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en checkPaymentStatus:", error);
      return { status: "error", paid: false };
    }
  }
}

export default PaymentService;
