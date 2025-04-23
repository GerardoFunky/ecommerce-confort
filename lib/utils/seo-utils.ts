import { Metadata } from "next";

/**
 * Interfaz para los metadatos SEO
 */
interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

/**
 * Genera metadatos para SEO compatibles con Next.js
 */
export const generateMetadata = ({
  title,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  noIndex = false,
}: SEOProps): Metadata => {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    alternates: {
      canonical: canonical,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
  };
};

/**
 * Genera URLs canónicas
 */
export const getCanonicalUrl = (path: string): string => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yourecommercesite.com";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

/**
 * Crea título para páginas con formato consistente
 */
export const formatPageTitle = (pageTitle: string): string => {
  const siteName = "Your E-commerce Store";
  return `${pageTitle} | ${siteName}`;
};

/**
 * Genera estructura de datos JSON-LD para producto
 */
export const generateProductJsonLd = (product: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0]?.url,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.average,
        reviewCount: product.rating.count,
      },
    }),
  };
};
