import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function ProductSort() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Ordenar por: <span className="font-medium">Relevancia</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuItem>Relevancia</DropdownMenuItem>
        <DropdownMenuItem>Precio: De menor a mayor</DropdownMenuItem>
        <DropdownMenuItem>Precio: De mayor a menor</DropdownMenuItem>
        <DropdownMenuItem>Más nuevos primero</DropdownMenuItem>
        <DropdownMenuItem>Más vendidos</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
