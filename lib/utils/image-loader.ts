type ImageLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * Cargador de imágenes personalizado para Next.js Image component
 * Compatible con servicios como Cloudinary, Imgix, etc.
 */
export const imageLoader = ({
  src,
  width,
  quality = 75,
}: ImageLoaderParams): string => {
  // Si la URL ya es de un CDN de imágenes, usa su API
  if (src.includes("cloudinary.com")) {
    return cloudinaryLoader({ src, width, quality });
  }

  // Si es una imagen local o de otro origen
  if (src.startsWith("/")) {
    // Para imágenes locales, usar la optimización de Next.js
    return `/_next/image?url=${encodeURIComponent(
      src
    )}&w=${width}&q=${quality}`;
  }

  // Para otras imágenes externas, retornar como están
  return src;
};

/**
 * Cargador específico para Cloudinary
 */
const cloudinaryLoader = ({
  src,
  width,
  quality,
}: ImageLoaderParams): string => {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality}`];

  // Extrae el ID de la imagen de la URL de Cloudinary
  const regex = /\/v\d+\/([^/]+)(?:\.\w+)?$/;
  const match = src.match(regex);

  if (!match) return src;

  const imageId = match[1];
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your-cloud-name";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(
    ","
  )}/${imageId}`;
};

/**
 * Obtiene dimensiones de placeholders para imágenes de diferentes tamaños
 */
export const getImagePlaceholder = (
  type: "thumbnail" | "product" | "banner"
): { width: number; height: number } => {
  const placeholders = {
    thumbnail: { width: 200, height: 200 },
    product: { width: 600, height: 600 },
    banner: { width: 1200, height: 400 },
  };

  return placeholders[type];
};

/**
 * Crea URL para imagen de placeholder en caso de error o carga
 */
export const getPlaceholderImage = (
  type: "product" | "category" | "user" = "product"
): string => {
  return `/images/placeholders/${type}-placeholder.jpg`;
};

/**
 * Extrae información del color dominante de una imagen (simula)
 */
export const getImageColor = (productId: string | number): string => {
  // En producción, esto podría conectarse a una API que analiza imágenes
  // Para este ejemplo, devolvemos colores predeterminados basados en el ID
  const colors = ["#F3F4F6", "#E5E7EB", "#D1D5DB", "#9CA3AF", "#6B7280"];
  const hash = String(productId)
    .split("")
    .reduce((a, b) => a + b.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

/**
 * Calcula relación de aspecto para manejar responsive images
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return (height / width) * 100;
};
