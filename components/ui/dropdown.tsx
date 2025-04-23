// components/ui/dropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
  width?: "auto" | "sm" | "md" | "lg";
}

export function Dropdown({
  trigger,
  children,
  className,
  align = "left",
  width = "auto",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Efecto para cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Efecto para cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const widthClasses = {
    auto: "w-auto",
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
  };

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-40 mt-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            "dark:bg-gray-800 dark:ring-gray-700",
            alignmentClasses[align],
            widthClasses[width],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// Componentes adicionales para el dropdown
export const DropdownItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
      "dark:text-gray-200 dark:hover:bg-gray-700",
      className
    )}
  >
    {children}
  </div>
);

export const DropdownDivider = () => (
  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
);

export const DropdownHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "px-4 py-2 text-xs font-semibold text-gray-500 uppercase",
      "dark:text-gray-400",
      className
    )}
  >
    {children}
  </div>
);
