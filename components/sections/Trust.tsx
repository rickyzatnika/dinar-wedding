export function Trust() {
  const brands = [
    "Grand Hyatt", "The Ritz-Carlton", "Four Seasons",
    "Sheraton", "InterContinental", "Pullman",
  ];

  return (
    <section className="py-16 bg-[#F3E7DD]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm font-medium tracking-[0.15em] uppercase mb-10">
          Dipercaya oleh
        </p>
      </div>
      <div className="relative w-full">
        <div className="flex marquee-track gap-16">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="text-gray-300 font-serif text-xl italic tracking-wide whitespace-nowrap shrink-0"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
