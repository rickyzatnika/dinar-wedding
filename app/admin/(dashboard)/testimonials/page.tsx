"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  _id: string;
  nama: string;
  pesan: string;
  rating: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nama: "", pesan: "", rating: 5 });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      setTestimonials(await res.json());
    } catch {
      console.error("Failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ nama: "", pesan: "", rating: 5 });
      fetchTestimonials();
    } catch {
      console.error("Failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus testimoni ini?")) return;
    try {
      const res = await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchTestimonials();
    } catch {
      console.error("Failed");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3B2A24]">Testimoni</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a]"
        >
          {showForm ? "Batal" : "+ Tambah Testimoni"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-sm p-5 mb-6 space-y-4">
          <input
            type="text"
            placeholder="Nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            required
          />
          <textarea
            placeholder="Pesan testimoni"
            value={form.pesan}
            onChange={(e) => setForm({ ...form, pesan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            rows={3}
            required
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rating:</span>
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setForm({ ...form, rating: r })}
                className={`text-lg ${r <= form.rating ? "text-amber-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium"
          >
            Simpan
          </button>
        </form>
      )}

      <div className="space-y-3">
        {loading && <p className="text-gray-400 text-center py-8">Memuat...</p>}
        {!loading && testimonials.length === 0 && (
          <p className="text-gray-400 text-center py-8">Belum ada testimoni</p>
        )}
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white rounded-xl shadow-sm p-5 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#3B2A24]">{t.nama}</h3>
                <span className="text-amber-400 text-sm">
                  {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{t.pesan}</p>
            </div>
            <button
              onClick={() => handleDelete(t._id)}
              className="text-gray-400 hover:text-red-500 text-sm ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
