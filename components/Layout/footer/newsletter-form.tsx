// components/layout/footer/newsletter-form.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/app/providers/toast-provider";

interface NewsletterFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export function NewsletterForm({
  title = "Suscríbete a nuestro newsletter",
  description = "Recibe nuestras ofertas y novedades directamente en tu email.",
  buttonText = "Suscribirse",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Por favor, introduce un email válido", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // En un proyecto real, aquí se enviaría la solicitud a la API
      // Simulamos una respuesta exitosa después de un breve retraso
      await new Promise((resolve) => setTimeout(resolve, 800));

      showToast("¡Te has suscrito correctamente!", "success");
      setEmail("");
    } catch (error) {
      showToast("Ocurrió un error. Por favor intenta de nuevo.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && (
        <p className="text-sm text-gray-300 mb-4">{description}</p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : buttonText}
        </Button>
      </form>
    </div>
  );
}
