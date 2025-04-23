import { Providers } from "@/app/providers";
import { Header } from "../components/layout/header/header";
import { Footer } from "../components/layout/footer/footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | TiendaNext",
    default: "TiendaNext - Tu tienda online de confianza",
  },
  description: "Descubre productos de alta calidad con los mejores precios",
  keywords: ["ecommerce", "tienda online", "productos", "compras"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
