interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="text-[#C97B7B] font-semibold text-sm tracking-widest uppercase">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#3B2A24] mt-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 mt-4 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
