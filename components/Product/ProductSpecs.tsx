interface ProductSpecsProps {
  specs: Record<string, string>;
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  const specEntries = Object.entries(specs);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Especificaciones técnicas</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        {specEntries.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between border-b border-gray-200 pb-2"
          >
            <span className="text-gray-600">{key}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
