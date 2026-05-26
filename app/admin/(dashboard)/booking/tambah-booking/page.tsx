"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahBooking() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: "", phone: "", alamat: "", tanggal: "", waktu: "", paket: "", pesan: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/admin/booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <Link href="/admin/booking" className="text-sm text-[#C97B7B] hover:underline">&larr; Kembali</Link>
      <h1 className="text-2xl font-bold text-[#3B2A24] mt-4 mb-6">Tambah Booking</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input type="text" required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nama lengkap" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
          <input type="text" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="08xxxxxxxxxx" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
          <textarea value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2} placeholder="Alamat lengkap" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
            <input type="date" required value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
            <input type="time" value={form.waktu} onChange={(e) => setForm({ ...form, waktu: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paket</label>
          <input type="text" required value={form.paket} onChange={(e) => setForm({ ...form, paket: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Nama paket" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pesan Tambahan</label>
          <textarea value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} />
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a] disabled:opacity-50">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
