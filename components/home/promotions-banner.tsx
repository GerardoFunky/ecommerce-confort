// components/home/promotions-banner.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface PromotionBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  variant?: "left" | "right";
  className?: string;
  theme?: "light" | "dark";
}

export function PromotionBanner({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  variant = "left",
  className,
  theme = "light",
}: PromotionBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900",
        className
      )}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div
          className={cn(
            "flex flex-col md:flex-row items-center",
            variant === "right" ? "md:flex-row-reverse" : ""
          )}
        >
          {/* Contenido de texto */}
          <div className="md:w-1/2 mb-8 md:mb-0 space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-lg md:max-w-md">{description}</p>
            <Button asChild className="mt-4">
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          </div>

          {/* Imagen */}
          <div
            className={cn(
              "md:w-1/2",
              variant === "left" ? "md:pl-8" : "md:pr-8"
            )}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
