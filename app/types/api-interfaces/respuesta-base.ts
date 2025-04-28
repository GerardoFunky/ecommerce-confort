// Respuesta base para hooks que usan API
export interface ApiHookState<T, E = ApiError> {
  data: T | null;
  loading: boolean;
  error: E | null;
  status: LoadingState;
}
