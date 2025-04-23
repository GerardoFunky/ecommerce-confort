import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina nombres de clase con soporte para Tailwind
 * @param inputs Clases a combinar
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
