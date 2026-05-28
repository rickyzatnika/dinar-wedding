import type { Package, Testimonial, GalleryImage } from "@/lib/types";

export const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: 2500000,
    description: "Paket rias & dekorasi dasar untuk acara intimate.",
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
    description: "Paket rias & dekorasi lengkap dengan busana.",
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
    description: "Paket VIP rias & dekorasi dengan layanan eksklusif.",
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
      "Makep & dekorasinya flawless banget! Dinar Wedding bikin aku pede di hari pernikahan. Hasilnya natural dan tahan seharian.",
    rating: 5,
  },
  {
    id: "2",
    name: "Rina",
    role: "Ibu Pengantin",
    avatar: "/images/testimonial-2.jpg",
    message:
      "Pelayanan ramah dan profesional. Hasil riasan dan dekorasinya elegant banget, cocok banget sama tema pernikahan.",
    rating: 5,
  },
  {
    id: "3",
    name: "Dian & Budi",
    role: "Pengantin",
    avatar: "/images/testimonial-3.jpg",
    message:
      "Mulai dari trial sampe hari H, semua lancar. Timnya tepat waktu dan bikin riasan & dekorasi yang sempurna.",
    rating: 5,
  },
];

export const galleryImages: GalleryImage[] = [
  // MakeUp
  { id: "mu-1", src: "/gallery/MakeUp/1.png", alt: "Rias pengantin natural", category: "makeup" },
  { id: "mu-2", src: "/gallery/MakeUp/2.png", alt: "Makeup pengantin elegan", category: "makeup" },
  { id: "mu-3", src: "/gallery/MakeUp/3.png", alt: "Rias pengantin classic", category: "makeup" },
  { id: "mu-4", src: "/gallery/MakeUp/4.png", alt: "Makeup pengantin modern", category: "makeup" },
  { id: "mu-5", src: "/gallery/MakeUp/5.png", alt: "Rias pengantin glowing", category: "makeup" },
  { id: "mu-6", src: "/gallery/MakeUp/6.png", alt: "Makeup pengantin soft", category: "makeup" },
  { id: "mu-7", src: "/gallery/MakeUp/7.jpg", alt: "Rias pengantin premium", category: "makeup" },
  { id: "mu-8", src: "/gallery/MakeUp/8.png", alt: "Makeup pengantin tradisional", category: "makeup" },
  // Akad
  { id: "ak-1", src: "/gallery/Akad/001.jpg", alt: "Proses akad nikah", category: "akad" },
  { id: "ak-2", src: "/gallery/Akad/002.jpg", alt: "Momen akad sakral", category: "akad" },
  { id: "ak-3", src: "/gallery/Akad/003.jpg", alt: "Pengantin saat akad", category: "akad" },
  { id: "ak-4", src: "/gallery/Akad/004.jpg", alt: "Sesi akad penuh haru", category: "akad" },
  { id: "ak-5", src: "/gallery/Akad/005.jpg", alt: "Prosesi ijab kabul", category: "akad" },
  { id: "ak-7", src: "/gallery/Akad/007.jpg", alt: "Momen akad bahagia", category: "akad" },
  { id: "ak-8", src: "/gallery/Akad/008.jpg", alt: "Akad nikah khidmat", category: "akad" },
  { id: "ak-9", src: "/gallery/Akad/009.jpg", alt: "Pengantin saat akad", category: "akad" },
  // Dekorasi
  { id: "dek-1", src: "/gallery/Dekorasi/011.jpg", alt: "Dekorasi pelaminan", category: "dekorasi" },
  { id: "dek-2", src: "/gallery/Dekorasi/012.jpg", alt: "Hiasan dekorasi mewah", category: "dekorasi" },
  { id: "dek-3", src: "/gallery/Dekorasi/013.jpg", alt: "Dekorasi panggung", category: "dekorasi" },
  { id: "dek-4", src: "/gallery/Dekorasi/014.jpg", alt: "Dekorasi pengantin", category: "dekorasi" },
  { id: "dek-5", src: "/gallery/Dekorasi/015.jpg", alt: "Dekorasi pelaminan classic", category: "dekorasi" },
  { id: "dek-6", src: "/gallery/Dekorasi/016.jpg", alt: "Dekorasi bunga indah", category: "dekorasi" },
  { id: "dek-7", src: "/gallery/Dekorasi/017.jpg", alt: "Dekorasi resepsi", category: "dekorasi" },
  { id: "dek-8", src: "/gallery/Dekorasi/018.jpg", alt: "Dekorasi pernikahan", category: "dekorasi" },
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
    question: "Apakah menyediakan dekorasi sendiri?",
    answer:
      "Ya, kami memiliki tim dekorasi profesional yang siap mewujudkan dekorasi impian Anda, mulai dari pelaminan hingga venue resepsi.",
  },
  {
    question: "Apakah melayani luar kota?",
    answer:
      "Ya, kami melayani rias & dekorasi luar kota dengan tambahan biaya transportasi dan akomodasi.",
  },
  {
    question: "Bisakah request model riasan atau tema dekorasi tertentu?",
    answer:
      "Tentu! Kami akan diskusikan saat konsultasi untuk mendapatkan hasil riasan dan dekorasi yang sesuai dengan keinginan Anda.",
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
  {
    title: "Dekorasi Pelaminan",
    description: "Dekorasi pelaminan elegan sesuai tema pernikahan Anda.",
    icon: "dekorasi",
  },
  {
    title: "Dekorasi Resepsi",
    description: "Dekorasi venue resepsi yang mewah dan berkesan.",
    icon: "dekorasi",
  },
];
