// app/checkout/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import CheckoutForm from "@/components/checkout/checkout-form";
import CheckoutSummary from "@/components/checkout/checkout-summary";
import Breadcrumbs from "@/components/layout/breadcrumbs";

const CheckoutPage = () => {
  const { cart, isEmpty } = useCart();
  const router = useRouter();

  // Redirect to cart if checkout is accessed with an empty cart
  useEffect(() => {
    if (isEmpty) {
      router.push("/");
    }
  }, [isEmpty, router]);

  if (isEmpty) {
    return null; // Return null during redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Checkout", href: "/checkout" },
        ]}
      />

      <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form - Takes 2/3 of the space on desktop */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        {/* Order summary - Takes 1/3 of the space on desktop */}
        <div className="lg:col-span-1">
          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
