//  * Definiciones de tipos para interacción con API y respuestas
// Respuesta genérica de API
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}
