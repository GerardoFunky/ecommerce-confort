/**
 * Valida formato de correo electrónico
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida número de teléfono (formato internacional)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

/**
 * Valida código postal (adaptable por país)
 */
export const isValidZipCode = (
  zipCode: string,
  countryCode = "US"
): boolean => {
  const zipRegexes: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    // Añadir más países según necesidad
  };

  const regex = zipRegexes[countryCode] || zipRegexes.US;
  return regex.test(zipCode);
};

/**
 * Valida tarjeta de crédito (básico)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  // Elimina espacios y guiones
  const sanitized = cardNumber.replace(/[\s-]/g, "");
  // Verifica que solo contenga dígitos y tenga longitud adecuada (13-19 dígitos)
  return /^\d{13,19}$/.test(sanitized) && luhnCheck(sanitized);
};

/**
 * Implementación del algoritmo de Luhn para validación de tarjetas
 */
const luhnCheck = (cardNumber: string): boolean => {
  let sum = 0;
  let shouldDouble = false;

  // Itera de derecha a izquierda
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

/**
 * Valida contraseña con requisitos de seguridad
 */
export const isStrongPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un caracter especial
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Valida URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida que los campos requeridos no estén vacíos
 */
export const validateRequiredFields = (
  data: Record<string, any>,
  requiredFields: string[]
): string[] => {
  return requiredFields.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || value === "";
  });
};
