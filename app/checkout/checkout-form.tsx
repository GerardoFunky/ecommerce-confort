// components/checkout/checkout-form.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressForm from "./address-form";
import PaymentMethods from "./payment-methods";
import ShippingOptions from "./shipping-options";

type CheckoutStep = "shipping" | "payment" | "review";

const CheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "ES", // Default to Spain
  });
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleAddressSubmit = (addressData: typeof shippingAddress) => {
    setShippingAddress(addressData);
    setCurrentStep("payment");
    window.scrollTo(0, 0); // Scroll to top when changing steps
  };

  const handlePaymentSubmit = () => {
    setCurrentStep("review");
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Here you would typically call your API to process the order
      // For this example, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to confirmation page
      router.push("/checkout/confirmation");
    } catch (error) {
      console.error("Error processing order:", error);
      setIsProcessing(false);
      // Show error message
    }
  };

  const steps = [
    { id: "shipping", label: "Envío", icon: Truck },
    { id: "payment", label: "Pago", icon: CreditCard },
    { id: "review", label: "Revisión", icon: Check },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Stepper */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted =
            (step.id === "shipping" && currentStep !== "shipping") ||
            (step.id === "payment" && currentStep === "review");

          return (
            <div key={step.id} className="flex flex-col items-center w-1/3">
              <div className="relative flex items-center justify-center w-full">
                {/* Line before */}
                {index > 0 && (
                  <div
                    className={`absolute left-0 right-1/2 h-0.5 ${
                      isCompleted || isActive ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}

                {/* Circle */}
                <div
                  className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                    isActive || isCompleted
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>

                {/* Line after */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-1/2 right-0 h-0.5 ${
                      isCompleted ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <span
                className={`mt-2 text-xs ${
                  isActive || isCompleted
                    ? "text-blue-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div>
        {currentStep === "shipping" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Información de envío</h2>
            <AddressForm
              initialData={shippingAddress}
              onSubmit={handleAddressSubmit}
            />
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Método de envío</h3>
              <ShippingOptions
                selectedMethod={selectedShippingMethod}
                onSelectMethod={setSelectedShippingMethod}
              />
            </div>
            <div className="mt-6">
              <Button
                onClick={() => handleAddressSubmit(shippingAddress)}
                disabled={!selectedShippingMethod}
                className="w-full sm:w-auto"
              >
                Continuar al pago
              </Button>
            </div>
          </div>
        )}

        {currentStep === "payment" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Método de pago</h2>
            <PaymentMethods
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={setSelectedPaymentMethod}
            />
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("shipping")}
              >
                Volver
              </Button>
              <Button
                onClick={handlePaymentSubmit}
                disabled={!selectedPaymentMethod}
              >
                Revisar pedido
              </Button>
            </div>
          </div>
        )}

        {currentStep === "review" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Revisar pedido</h2>

            {/* Shipping address review */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Dirección de envío
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{shippingAddress.fullName}</p>
                <p>{shippingAddress.address}</p>
                <p>
                  {shippingAddress.postalCode}, {shippingAddress.city}
                </p>
                <p>
                  {shippingAddress.state}, {shippingAddress.country}
                </p>
                <p className="mt-2">{shippingAddress.email}</p>
                <p>{shippingAddress.phone}</p>
              </div>
              <button
                onClick={() => setCurrentStep("shipping")}
                className="text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                Editar
              </button>
            </div>

            {/* Payment method review */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Método de pago
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{selectedPaymentMethod}</p>
              </div>
              <button
                onClick={() => setCurrentStep("payment")}
                className="text-sm text-blue-600 hover:text-blue-800 mt-2"
              >
                Editar
              </button>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("payment")}
                disabled={isProcessing}
              >
                Volver
              </Button>
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="min-w-32"
              >
                {isProcessing ? "Procesando..." : "Realizar pedido"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
