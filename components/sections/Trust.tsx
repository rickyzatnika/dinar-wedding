export function Trust() {
  const brands = [
    "Brand 1", "Brand 2", "Brand 3",
    "Brand 4", "Brand 5", "Brand 6",
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm font-medium tracking-widest uppercase mb-8">
          Dipercaya oleh
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-gray-600 font-bold text-lg tracking-wider"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
