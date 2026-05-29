import mongoose from "mongoose";
import Package from "../models/Package";
import Testimonial from "../models/Testimonial";
import Gallery from "../models/Gallery";
import FAQ from "../models/FAQ";

const MONGODB_URI = process.env.MONGODB_URI

const packages = [
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

const testimonials = [
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

const galleryImages = [
  { id: "mu-1", src: "/gallery/MakeUp/1.png", alt: "Rias pengantin natural", category: "makeup" },
  { id: "mu-2", src: "/gallery/MakeUp/2.png", alt: "Makeup pengantin elegan", category: "makeup" },
  { id: "mu-3", src: "/gallery/MakeUp/3.png", alt: "Rias pengantin classic", category: "makeup" },
  { id: "mu-4", src: "/gallery/MakeUp/4.png", alt: "Makeup pengantin modern", category: "makeup" },
  { id: "mu-5", src: "/gallery/MakeUp/5.png", alt: "Rias pengantin glowing", category: "makeup" },
  { id: "mu-6", src: "/gallery/MakeUp/6.png", alt: "Makeup pengantin soft", category: "makeup" },
  { id: "mu-7", src: "/gallery/MakeUp/7.jpg", alt: "Rias pengantin premium", category: "makeup" },
  { id: "mu-8", src: "/gallery/MakeUp/8.png", alt: "Makeup pengantin tradisional", category: "makeup" },
  { id: "ak-1", src: "/gallery/Akad/001.jpg", alt: "Proses akad nikah", category: "akad" },
  { id: "ak-2", src: "/gallery/Akad/002.jpg", alt: "Momen akad sakral", category: "akad" },
  { id: "ak-3", src: "/gallery/Akad/003.jpg", alt: "Pengantin saat akad", category: "akad" },
  { id: "ak-4", src: "/gallery/Akad/004.jpg", alt: "Sesi akad penuh haru", category: "akad" },
  { id: "ak-5", src: "/gallery/Akad/005.jpg", alt: "Prosesi ijab kabul", category: "akad" },
  { id: "ak-7", src: "/gallery/Akad/007.jpg", alt: "Momen akad bahagia", category: "akad" },
  { id: "ak-8", src: "/gallery/Akad/008.jpg", alt: "Akad nikah khidmat", category: "akad" },
  { id: "ak-9", src: "/gallery/Akad/009.jpg", alt: "Pengantin saat akad", category: "akad" },
  { id: "dek-1", src: "/gallery/Dekorasi/011.jpg", alt: "Dekorasi pelaminan", category: "dekorasi" },
  { id: "dek-2", src: "/gallery/Dekorasi/012.jpg", alt: "Hiasan dekorasi mewah", category: "dekorasi" },
  { id: "dek-3", src: "/gallery/Dekorasi/013.jpg", alt: "Dekorasi panggung", category: "dekorasi" },
  { id: "dek-4", src: "/gallery/Dekorasi/014.jpg", alt: "Dekorasi pengantin", category: "dekorasi" },
  { id: "dek-5", src: "/gallery/Dekorasi/015.jpg", alt: "Dekorasi pelaminan classic", category: "dekorasi" },
  { id: "dek-6", src: "/gallery/Dekorasi/016.jpg", alt: "Dekorasi bunga indah", category: "dekorasi" },
  { id: "dek-7", src: "/gallery/Dekorasi/017.jpg", alt: "Dekorasi resepsi", category: "dekorasi" },
  { id: "dek-8", src: "/gallery/Dekorasi/018.jpg", alt: "Dekorasi pernikahan", category: "dekorasi" },
];

const faqItems = [
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

async function seed() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI environment variable is required");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await Package.deleteMany({});
  await Package.insertMany(packages);
  console.log("Seeded packages");

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonials);
  console.log("Seeded testimonials");

  await Gallery.deleteMany({});
  await Gallery.insertMany(galleryImages);
  console.log("Seeded gallery");

  await FAQ.deleteMany({});
  await FAQ.insertMany(faqItems.map((item, i) => ({ ...item, order: i })));
  console.log("Seeded FAQ");

  console.log("All data seeded!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
