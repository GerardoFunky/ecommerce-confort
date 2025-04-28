// Error de API estructurado
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  status: number;
  path?: string;
}
