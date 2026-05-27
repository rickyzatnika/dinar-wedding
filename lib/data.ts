import type { Package, Testimonial, GalleryImage } from "@/lib/types";

export const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: 2500000,
    description: "Paket rias pengantin dasar untuk acara intimate.",
    features: [
      "Rias wajah pengantin",
      "Sanggul classic",
      "Konsultasi 1x",
      "Trial makeup 1x",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 5000000,
    description: "Paket rias pengantin lengkap dengan busana.",
    isPopular: true,
    features: [
      "Rias wajah pengantin",
      "Sanggul custom",
      "Konsultasi 2x",
      "Trial makeup 1x",
      "Sewa baju pengantin",
      "Dekorasi minor",
    ],
  },
  {
    id: "exclusive",
    name: "Exclusive",
    price: 10000000,
    description: "Paket VIP dengan layanan eksklusif dan lengkap.",
    features: [
      "Rias wajah pengantin",
      "Sanggul premium",
      "Konsultasi 3x",
      "Trial makeup 2x",
      "Sewa baju pengantin",
      "Dekorasi full",
      "Makeup ibu & 2 bridesmaid",
      "Dokumentasi foto",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah & Andi",
    role: "Pengantin",
    avatar: "/images/testimonial-1.jpg",
    message:
      "Makepnya flawless banget! Dinar Wedding bikin aku pede di hari pernikahan. Hasilnya natural dan tahan seharian.",
    rating: 5,
  },
  {
    id: "2",
    name: "Rina",
    role: "Ibu Pengantin",
    avatar: "/images/testimonial-2.jpg",
    message:
      "Pelayanan ramah dan profesional. Hasil riasannya elegant banget, cocok banget sama tema pernikahan.",
    rating: 5,
  },
  {
    id: "3",
    name: "Dian & Budi",
    role: "Pengantin",
    avatar: "/images/testimonial-3.jpg",
    message:
      "Mulai dari trial sampe hari H, semua lancar. Timnya tepat waktu dan bikin riasan yang tahan lama.",
    rating: 5,
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/gallery/1.png",
    alt: "Rias pengantin elegan",
    category: "bridal",
  },
  {
    id: "2",
    src: "/gallery/2.png",
    alt: "Sanggul pengantin classic",
    category: "sanggul",
  },
  {
    id: "3",
    src: "/gallery/3.png",
    alt: "Makeup pengantin natural",
    category: "bridal",
  },
  {
    id: "4",
    src: "/gallery/4.png",
    alt: "Dekorasi pengantin",
    category: "dekorasi",
  },
  {
    id: "5",
    src: "/gallery/5.png",
    alt: "Pengantin adat",
    category: "bridal",
  },
  {
    id: "6",
    src: "/gallery/6.png",
    alt: "Rias pengantin premium",
    category: "bridal",
  },
  {
    id: "7",
    src: "/gallery/7.png",
    alt: "Makeup pengantin modern",
    category: "bridal",
  },
  {
    id: "8",
    src: "/gallery/8.png",
    alt: "Sanggul pengantin tradisional",
    category: "sanggul",
  },
];

export const faqItems = [
  {
    question: "Bagaimana cara booking?",
    answer:
      "Anda bisa booking langsung via WhatsApp dengan klik tombol Booking di website kami. Kami akan merespon dalam 1x24 jam.",
  },
  {
    question: "Apakah ada trial makeup?",
    answer:
      "Ya, setiap paket sudah termasuk trial makeup. Untuk paket Basic 1x trial, Premium 1x trial, dan Exclusive 2x trial.",
  },
  {
    question: "Berapa lama proses rias?",
    answer:
      "Proses rias pengantin biasanya memakan waktu 2-3 jam, tergantung kompleksitas riasan dan sanggul.",
  },
  {
    question: "Apakah melayani luar kota?",
    answer:
      "Ya, kami melayani rias luar kota dengan tambahan biaya transportasi dan akomodasi.",
  },
  {
    question: "Bisakah request model riasan tertentu?",
    answer:
      "Tentu! Kami akan diskusikan saat konsultasi dan trial untuk mendapatkan hasil yang sesuai dengan keinginan Anda.",
  },
];

export const services = [
  {
    title: "Rias Pengantin",
    description: "Rias wajah pengantin dengan teknik flawless dan tahan lama.",
    icon: "makeup",
  },
  {
    title: "Sanggul Custom",
    description: "Sanggul tradisional hingga modern sesuai keinginan.",
    icon: "sanggul",
  },
  {
    title: "Trial Makeup",
    description: "Sesi percobaan rias sebelum hari H.",
    icon: "trial",
  },
  {
    title: "Rias Ibu & Bridesmaid",
    description: "Layanan rias untuk ibu dan pendamping pengantin.",
    icon: "bridesmaid",
  },
];
