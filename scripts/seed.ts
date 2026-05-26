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
      "Makepnya flawless banget! Dinnar Wedding bikin aku pede di hari pernikahan. Hasilnya natural dan tahan seharian.",
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
  { id: "1", src: "/gallery/gallery-1.jpg", alt: "Rias pengantin elegan", category: "bridal" },
  { id: "2", src: "/gallery/gallery-2.jpg", alt: "Sanggul pengantin classic", category: "sanggul" },
  { id: "3", src: "/gallery/gallery-3.jpg", alt: "Makeup pengantin natural", category: "bridal" },
  { id: "4", src: "/gallery/gallery-4.jpg", alt: "Dekorasi pengantin", category: "dekorasi" },
  { id: "5", src: "/gallery/gallery-5.jpg", alt: "Pengantin adat", category: "bridal" },
  { id: "6", src: "/gallery/gallery-6.jpg", alt: "Rias pengantin premium", category: "bridal" },
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
