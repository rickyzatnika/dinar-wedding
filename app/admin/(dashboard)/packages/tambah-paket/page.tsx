"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahPaket() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", price: "", description: "", features: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          description: form.description,
          features: form.features.split("\n").filter(Boolean),
        }),
      });
      if (res.ok) router.push("/admin/packages");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <Link href="/admin/packages" className="text-sm text-[#C97B7B] hover:underline">&larr; Kembali</Link>
      <h1 className="text-2xl font-bold text-[#3B2A24] mt-4 mb-6">Tambah Paket</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Paket</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nama paket" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
          <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fitur (satu per baris)</label>
          <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={4} placeholder="Makeup pengantin&#10;Henna&#10;Dekorasi kecil" />
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a] disabled:opacity-50">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
