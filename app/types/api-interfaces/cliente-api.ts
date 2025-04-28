// Opciones para el cliente de API
export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
}
