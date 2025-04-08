import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "@radix-ui/react-slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function ProductFilter() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button variant="link" size="sm" className="text-gray-500">
          Limpiar todos
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price"]}>
        {/* Categorías */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">
            Categorías
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4"].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category}`} />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal"
                    >
                      {category}
                    </Label>
                  </div>
                )
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Precio */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">
            Precio
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 mt-2">
              <Slider
                defaultValue={[0, 500]}
                max={1000}
                step={10}
                className="pt-5"
              />
              <div className="flex justify-between">
                <span className="text-sm">$0</span>
                <span className="text-sm">$1000</span>
              </div>
              <div className="flex space-x-2">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="price-min" className="text-sm">
                    Mínimo
                  </Label>
                  <input
                    type="number"
                    id="price-min"
                    placeholder="0"
                    className="w-full h-9 rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="price-max" className="text-sm">
                    Máximo
                  </Label>
                  <input
                    type="number"
                    id="price-max"
                    placeholder="1000"
                    className="w-full h-9 rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>
              </div>
              <Button size="sm" className="w-full">
                Aplicar
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
