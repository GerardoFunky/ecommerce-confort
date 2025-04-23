/**
 * user.types.ts
 * Definiciones de tipos relacionados con usuarios y clientes
 */

// Dirección física
export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// Roles de usuario
export type UserRole = "customer" | "admin" | "manager";

// Usuario/Cliente
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  addresses: Address[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
}

// Preferencias de usuario
export interface UserPreferences {
  marketingEmails: boolean;
  orderUpdates: boolean;
  currency?: string;
  language?: string;
  theme?: "light" | "dark" | "system";
}

// Estado autenticación
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Datos para registro
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  marketingConsent?: boolean;
}

// Datos para login
export interface LoginData {
  email: string;
  password: string;
  remember?: boolean;
}

// Respuesta de autenticación
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresAt?: number;
}

// Perfil público básico
export type PublicUserProfile = Pick<
  User,
  "id" | "firstName" | "lastName" | "avatar"
>;

export const userTypes = new Set(["customer", "admin", "manager"]);
