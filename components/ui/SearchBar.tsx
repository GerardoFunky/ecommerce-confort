import { Search } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Buscar productos..."
        className="pl-3 pr-10 py-2 w-full rounded-md border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 transform -translate-y-1/2"
      >
        <Search size={18} className="text-gray-500" />
      </Button>
    </div>
  );
}
