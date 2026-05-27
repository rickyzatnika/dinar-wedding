export function Trust() {
  const brands = [
    "Grand Hyatt", "The Ritz-Carlton", "Four Seasons",
    "Sheraton", "InterContinental", "Pullman",
  ];

  return (
    <section className="py-16 bg-[#F3E7DD]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm font-medium tracking-[0.15em] uppercase mb-10">
          Dipercaya oleh
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-gray-300 font-serif text-xl italic tracking-wide"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
