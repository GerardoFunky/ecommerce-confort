import {
  ShippingZone,
  ShippingMethod,
  DeliveryEstimate,
} from "@/types/order.types";

/**
 * Servicio para configuración y cálculo de envíos
 */
export class ShippingService {
  /**
   * Zonas de envío disponibles
   */
  private static readonly shippingZones: ShippingZone[] = [
    {
      id: "spain",
      name: "España Peninsular",
      countries: ["ES"],
      excludeRegions: ["ES-CN", "ES-CE", "ES-ML"], // Canarias, Ceuta, Melilla
    },
    {
      id: "eu",
      name: "Unión Europea",
      countries: ["FR", "IT", "DE", "PT", "BE", "NL", "LU", "AT", "IE"],
    },
    {
      id: "europe_non_eu",
      name: "Europa (No UE)",
      countries: ["GB", "CH", "NO"],
    },
    {
      id: "north_america",
      name: "Norteamérica",
      countries: ["US", "CA", "MX"],
    },
    {
      id: "latam",
      name: "Latinoamérica",
      countries: ["AR", "BR", "CL", "CO", "PE"],
    },
    {
      id: "asia_pacific",
      name: "Asia-Pacífico",
      countries: ["CN", "JP", "KR", "AU", "NZ"],
    },
    {
      id: "rest_world",
      name: "Resto del mundo",
      countries: [], // Cualquier país no especificado anteriormente
    },
  ];

  /**
   * Métodos de envío disponibles
   */
  private static readonly shippingMethods: Record<string, ShippingMethod[]> = {
    spain: [
      {
        id: "standard_es",
        name: "Envío Estándar",
        price: 4.95,
        estimatedDays: { min: 1, max: 3 },
        freeThreshold: 50, // Envío gratuito para pedidos superiores a 50€
      },
      {
        id: "express_es",
        name: "Envío Express 24h",
        price: 9.95,
        estimatedDays: { min: 1, max: 1 },
      },
      {
        id: "pickup_point",
        name: "Recogida en punto de conveniencia",
        price: 3.5,
        estimatedDays: { min: 2, max: 4 },
        needsLocationSelector: true,
      },
    ],
    eu: [
      {
        id: "standard_eu",
        name: "Envío Estándar UE",
        price: 9.95,
        estimatedDays: { min: 3, max: 5 },
        freeThreshold: 100,
      },
      {
        id: "express_eu",
        name: "Envío Express UE",
        price: 14.95,
        estimatedDays: { min: 1, max: 2 },
      },
    ],
    europe_non_eu: [
      {
        id: "standard_non_eu",
        name: "Envío Estándar Europa",
        price: 12.95,
        estimatedDays: { min: 4, max: 7 },
        customsFees: true,
      },
      {
        id: "express_non_eu",
        name: "Envío Express Europa",
        price: 19.95,
        estimatedDays: { min: 2, max: 3 },
        customsFees: true,
      },
    ],
    north_america: [
      {
        id: "standard_na",
        name: "Envío Internacional Estándar",
        price: 19.95,
        estimatedDays: { min: 7, max: 12 },
        customsFees: true,
      },
      {
        id: "express_na",
        name: "Envío Internacional Express",
        price: 29.95,
        estimatedDays: { min: 3, max: 5 },
        customsFees: true,
      },
    ],
    latam: [
      {
        id: "standard_latam",
        name: "Envío Internacional Estándar",
        price: 24.95,
        estimatedDays: { min: 10, max: 15 },
        customsFees: true,
      },
    ],
    asia_pacific: [
      {
        id: "standard_asia",
        name: "Envío Internacional Estándar",
        price: 29.95,
        estimatedDays: { min: 12, max: 18 },
        customsFees: true,
      },
    ],
    rest_world: [
      {
        id: "standard_world",
        name: "Envío Internacional Estándar",
        price: 34.95,
        estimatedDays: { min: 15, max: 21 },
        customsFees: true,
      },
    ],
  };

  /**
   * Obtiene la zona de envío para un país específico
   */
  public static getShippingZone(
    countryCode: string,
    regionCode?: string
  ): ShippingZone | null {
    // Buscar una zona que incluya este país
    let zone = this.shippingZones.find(
      (zone) =>
        zone.countries.includes(countryCode) &&
        (!zone.excludeRegions ||
          !regionCode ||
          !zone.excludeRegions.includes(`${countryCode}-${regionCode}`))
    );

    // Si no se encontró zona específica, usar "resto del mundo"
    if (!zone) {
      zone =
        this.shippingZones.find((zone) => zone.id === "rest_world") || null;
    }

    return zone;
  }

  /**
   * Obtiene métodos de envío disponibles para un país y región
   */
  public static getAvailableShippingMethods(
    countryCode: string,
    regionCode?: string,
    orderTotal: number = 0
  ): ShippingMethod[] {
    const zone = this.getShippingZone(countryCode, regionCode);

    if (!zone) {
      return [];
    }

    const methods = this.shippingMethods[zone.id] || [];

    // Calcular precio final considerando umbral de envío gratuito
    return methods.map((method) => ({
      ...method,
      price:
        method.freeThreshold && orderTotal >= method.freeThreshold
          ? 0
          : method.price,
    }));
  }

  /**
   * Calcula el costo de envío
   */
  public static calculateShippingCost(
    countryCode: string,
    methodId: string,
    orderTotal: number,
    regionCode?: string
  ): number {
    const methods = this.getAvailableShippingMethods(
      countryCode,
      regionCode,
      orderTotal
    );
    const selectedMethod = methods.find((method) => method.id === methodId);

    return selectedMethod ? selectedMethod.price : 0;
  }

  /**
   * Estima la fecha de entrega
   */
  public static estimateDeliveryDate(
    methodId: string,
    countryCode: string
  ): DeliveryEstimate {
    // Obtener todos los métodos para este país
    const zone = this.getShippingZone(countryCode);

    if (!zone) {
      return { minDays: 7, maxDays: 21, estimatedDate: null };
    }

    const methods = this.shippingMethods[zone.id] || [];
    const selectedMethod = methods.find((method) => method.id === methodId);

    if (!selectedMethod) {
      return { minDays: 7, maxDays: 21, estimatedDate: null };
    }

    const { min, max } = selectedMethod.estimatedDays;

    // Calcular fechas estimadas
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + min);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + max);

    return {
      minDays: min,
      maxDays: max,
      estimatedDate: {
        min: minDate,
        max: maxDate,
      },
    };
  }

  /**
   * Comprueba si un país es elegible para envío
   */
  public static isEligibleForShipping(countryCode: string): boolean {
    // Lista de países a los que no se envía
    const restrictedCountries = ["CU", "IR", "KP", "SY"];

    return !restrictedCountries.includes(countryCode);
  }
}

export default ShippingService;
