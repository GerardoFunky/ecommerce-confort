/**
 * common.types.ts
 * Tipos comunes reutilizables en toda la aplicación
 */

// Identifiers
export type ID = string | number;

// Formatos de imagen aceptados
export type ImageFormat = "webp" | "jpeg" | "jpg" | "png" | "avif";

// Opciones de Tamaño
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

// Colores del tema
export type ThemeColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

// Variante de componente
export type Variant = "default" | "outline" | "ghost" | "link" | "solid";

// Definición responsive
export interface Responsive<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}

// Posición
export type Position =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "center";

// Estado de Componente
export type ComponentState =
  | "idle"
  | "hover"
  | "active"
  | "focus"
  | "disabled"
  | "loading";

// Imagen con diferentes tamaños
export interface ResponsiveImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: Responsive<string>;
  blurDataUrl?: string;
  format?: ImageFormat;
}

// Meta información para SEO
export interface SeoMeta {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  canonicalUrl?: string;
  noindex?: boolean;
  locale?: string;
}

// Breadcrumb
export interface Breadcrumb {
  label: string;
  href: string;
  isActive?: boolean;
}

// Enlace de navegación
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  children?: NavLink[];
  isExternal?: boolean;
  badge?: string | number;
  badgeColor?: ThemeColor;
}

// Notificación
export interface Notification {
  id: ID;
  title: string;
  message: string;
  type: ThemeColor;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
  isRead?: boolean;
}

// Error genérico
export interface ErrorInfo {
  message: string;
  code?: string;
  field?: string;
}

// Opciones para Select/Dropdown
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: string;
  description?: string;
}

// Período de tiempo
export type TimePeriod = "day" | "week" | "month" | "year" | "all";

// Coordenadas geográficas
export interface GeoCoordinates {
  lat: number;
  lng: number;
}

// Estado de carga de datos
export interface LoadingState<T, E = ErrorInfo> {
  data: T | null;
  isLoading: boolean;
  error: E | null;
}

// Utilidades para uniones de tipos
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Entrada de formulario genérica
export interface FormField<T = string> {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "tel"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date";
  placeholder?: string;
  value?: T;
  defaultValue?: T;
  options?: SelectOption<T>[];
  required?: boolean;
  disabled?: boolean;
  validation?: {
    required?: boolean | string;
    min?: number | string;
    max?: number | string;
    minLength?: number | string;
    maxLength?: number | string;
    pattern?: RegExp | string;
  };
  helperText?: string;
  errorMessage?: string;
}

// Manejador de eventos genérico
export type EventHandler<E = Event> = (event: E) => void;
