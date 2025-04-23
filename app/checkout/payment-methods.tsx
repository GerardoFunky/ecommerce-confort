// components/checkout/payment-methods.tsx

import { CreditCard, DollarSign } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface PaymentMethodsProps {
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
}

const PaymentMethods = ({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodsProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Limit to 16 digits
    const trimmed = digits.slice(0, 16);

    // Add spaces after every 4 digits
    const formatted = trimmed.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Limit to 4 digits
    const trimmed = digits.slice(0, 4);

    // Add slash after first 2 digits
    if (trimmed.length > 2) {
      return `${trimmed.slice(0, 2)}/${trimmed.slice(2)}`;
    }

    return trimmed;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Tarjeta de crédito",
      icon: <CreditCard className="h-5 w-5" />,
      form: (
        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Número de tarjeta
            </label>
            <Input
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>

          <div>
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre en la tarjeta
            </label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de expiración
              </label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
              />
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CVV
              </label>
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                maxLength={4}
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "cash-on-delivery",
      name: "Pago contra reembolso",
      icon: <DollarSign className="h-5 w-5" />,
      form: (
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Pagarás en efectivo al recibir tu pedido. Un cargo adicional de 3,00
            € será añadido al total.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div key={method.id} className="border rounded-lg overflow-hidden">
          <div
            className={`p-4 cursor-pointer ${
              selectedMethod === method.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onSelectMethod(method.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  {method.icon}
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="font-medium">{method.name}</h3>
              </div>

              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${
                    selectedMethod === method.id
                      ? "bg-blue-500 border-blue-500"
                      : ""
                  }`}
                >
                  {selectedMethod === method.id && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {selectedMethod === method.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              {method.form}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;
