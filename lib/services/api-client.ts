// lib/services/api-client.ts

/**
 * Cliente API para la comunicación con el backend
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
    cache: "no-store",
  };

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `Error: ${response.status} ${response.statusText}`;
      throw new ApiError(errorMessage, response.status);
    }

    // Para las solicitudes DELETE o algunas POST/PUT, podría no haber cuerpo
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error: ${(error as Error).message}`, 500);
  }
}

// Métodos simplificados para las operaciones CRUD
export const apiClient = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    fetchApi<T>(endpoint, { headers }),

  post: <T>(endpoint: string, body: any, headers?: Record<string, string>) =>
    fetchApi<T>(endpoint, { method: "POST", body, headers }),

  put: <T>(endpoint: string, body: any, headers?: Record<string, string>) =>
    fetchApi<T>(endpoint, { method: "PUT", body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    fetchApi<T>(endpoint, { method: "DELETE", headers }),
};
