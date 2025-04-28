// Respuesta de webhook
export interface WebhookResponse {
  id: string;
  success: boolean;
  message?: string;
  processedAt: string;
}
