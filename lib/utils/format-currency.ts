/**
 * Formatea un número como moneda en euros
 * @param amount - Cantidad a formatear
 * @param currency - Código de moneda (por defecto EUR)
 * @returns String formateado como moneda
 */
export function formatCurrency(
  amount: number,
  currency: string = "EUR",
  locale: string = "es-ES"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
