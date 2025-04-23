// components/checkout/shipping-options.tsx

import { Truck, Zap } from "lucide-react";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  icon: React.ElementType;
}

interface ShippingOptionsProps {
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
}

const ShippingOptions = ({
  selectedMethod,
  onSelectMethod,
}: ShippingOptionsProps) => {
  // Sample shipping options
  const options: ShippingOption[] = [
    {
      id: "standard",
      name: "Envío estándar",
      description: "Envío a domicilio",
      price: 4.99,
      estimatedDelivery: "3-5 días laborables",
      icon: Truck,
    },
    {
      id: "express",
      name: "Envío express",
      description: "Entrega rápida",
      price: 9.99,
      estimatedDelivery: "1-2 días laborables",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option.id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            selectedMethod === option.id
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          }`}
          onClick={() => onSelectMethod(option.id)}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                <option.icon className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{option.name}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                  <p className="text-sm text-gray-500">
                    Entrega estimada: {option.estimatedDelivery}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {option.price === 0
                      ? "Gratis"
                      : `${option.price.toFixed(2)} €`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-2">
              <div
                className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${
                  selectedMethod === option.id
                    ? "bg-blue-500 border-blue-500"
                    : ""
                }`}
              >
                {selectedMethod === option.id && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShippingOptions;
