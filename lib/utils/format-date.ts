/**
 * Utilidades para formatear fechas en el e-commerce
 */

/**
 * Formatea una fecha en formato local (DD/MM/YYYY)
 */
export const formatDate = (
  date: Date | string | number,
  locale = "es-ES"
): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Formatea una fecha con hora (DD/MM/YYYY HH:MM)
 */
export const formatDateTime = (
  date: Date | string | number,
  locale = "es-ES"
): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formatea fecha en formato relativo (hace 5 minutos, hace 2 días, etc.)
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale = "es-ES"
): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dateObj.getTime());

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  // Textos para diferentes idiomas
  const timeTexts: Record<
    string,
    Record<string, { singular: string; plural: string } | string>
  > = {
    "es-ES": {
      minute: { singular: "minuto", plural: "minutos" },
      hour: { singular: "hora", plural: "horas" },
      day: { singular: "día", plural: "días" },
      month: { singular: "mes", plural: "meses" },
      prefixAgo: "hace",
      prefixIn: "en",
    },
    "en-US": {
      minute: { singular: "minute", plural: "minutes" },
      hour: { singular: "hour", plural: "hours" },
      day: { singular: "day", plural: "days" },
      month: { singular: "month", plural: "months" },
      prefixAgo: "",
      prefixIn: "in",
      suffixAgo: "ago",
    },
  };

  // Usar textos del idioma solicitado o inglés como fallback
  const texts = timeTexts[locale] || timeTexts["en-US"];
  const isPast = dateObj < now;

  // Determinar la unidad de tiempo apropiada
  let value: number;
  let unit: "minute" | "hour" | "day" | "month";

  if (diffMinutes < 60) {
    value = diffMinutes;
    unit = "minute";
  } else if (diffHours < 24) {
    value = diffHours;
    unit = "hour";
  } else if (diffDays < 30) {
    value = diffDays;
    unit = "day";
  } else {
    value = diffMonths;
    unit = "month";
  }

  // Si es menos de un minuto
  if (unit === "minute" && value < 1) {
    if (locale.startsWith("es")) {
      return "ahora mismo";
    }
    return "just now";
  }

  // Formatear texto según idioma
  const unitText =
    value === 1
      ? (texts[unit] as { singular: string }).singular
      : (texts[unit] as { plural: string }).plural;

  if (locale.startsWith("es")) {
    return `${isPast ? texts.prefixAgo : texts.prefixIn} ${value} ${unitText}`;
  }

  return isPast
    ? `${value} ${unitText} ${texts.suffixAgo}`
    : `${texts.prefixIn} ${value} ${unitText}`;
};

/**
 * Formatea una fecha para mostrar solo el día y mes
 */
export const formatDayMonth = (
  date: Date | string | number,
  locale = "es-ES"
): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
  });
};

/**
 * Formatea fecha para ordenes y transacciones (formato preciso con ID)
 */
export const formatOrderDate = (
  date: Date | string | number,
  orderId: string,
  locale = "es-ES"
): string => {
  const formattedDate = formatDateTime(date, locale);
  return `${formattedDate} (ID: ${orderId.slice(-6).toUpperCase()})`;
};

/**
 * Verifica si una fecha está dentro de un rango especificado
 */
export const isDateInRange = (
  date: Date | string | number,
  daysRange: number
): boolean => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dateObj.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= daysRange;
};

/**
 * Formatea un rango de fechas (ej: para promociones o ofertas)
 */
export const formatDateRange = (
  startDate: Date | string | number,
  endDate: Date | string | number,
  locale = "es-ES"
): string => {
  return `${formatDate(startDate, locale)} - ${formatDate(endDate, locale)}`;
};

/**
 * Obtiene fecha formateada para uso en URLs (YYYY-MM-DD)
 */
export const getUrlFriendlyDate = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  return dateObj.toISOString().split("T")[0];
};
