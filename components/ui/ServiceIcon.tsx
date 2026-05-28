interface ServiceIconProps {
  name: string;
}

export function ServiceIcon({ name }: ServiceIconProps) {
  switch (name) {
    case "makeup":
      return (
        <svg className="w-10 h-10 text-[#C97B7B]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 10l-3-2M26 10l3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="12" r="1.5" fill="#D8B07A" />
        </svg>
      );
    case "sanggul":
      return (
        <svg className="w-10 h-10 text-[#C97B7B]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 26c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 22l4-3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="7" r="2" fill="#D8B07A" />
        </svg>
      );
    case "trial":
      return (
        <svg className="w-10 h-10 text-[#C97B7B]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 14v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 6l2 4 4-2" stroke="#D8B07A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6l-2 4-4-2" stroke="#D8B07A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "dekorasi":
      return (
        <svg className="w-10 h-10 text-[#C97B7B]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="18" width="28" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 18V12a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 22v6M17 28h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="28" r="2" fill="#D8B07A" />
        </svg>
      );
    case "bridesmaid":
      return (
        <svg className="w-10 h-10 text-[#C97B7B]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="26" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 24c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 24c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 16v16M26 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="14" cy="10" r="1.5" fill="#D8B07A" />
          <circle cx="26" cy="10" r="1.5" fill="#D8B07A" />
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10 text-[#C97B7B]" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 20h12M20 14v12" stroke="#D8B07A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}
