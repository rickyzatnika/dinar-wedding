"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahGaleri() {
  const router = useRouter();
  const [form, setForm] = useState({ src: "", alt: "", category: "all" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/admin/gallery");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <Link href="/admin/gallery" className="text-sm text-[#C97B7B] hover:underline">&larr; Kembali</Link>
      <h1 className="text-2xl font-bold text-[#3B2A24] mt-4 mb-6">Tambah Galeri</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
          <input type="text" required value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
          <input type="text" required value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Deskripsi gambar" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="all">All</option>
            <option value="makeup">Makeup</option>
            <option value="bridal">Bridal</option>
            <option value="dekorasi">Dekorasi</option>
            <option value="prewedding">Prewedding</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a] disabled:opacity-50">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
