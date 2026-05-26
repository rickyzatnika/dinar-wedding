"use client";

import { useEffect, useState } from "react";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "", order: 0 });

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    setLoading(true);
    try {
      const res = await fetch("/api/faq");
      setFaqs(await res.json());
    } catch {
      console.error("Failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ question: "", answer: "", order: 0 });
      fetchFaqs();
    } catch {
      console.error("Failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus FAQ ini?")) return;
    try {
      const res = await fetch("/api/faq", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchFaqs();
    } catch {
      console.error("Failed");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3B2A24]">FAQ</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a]"
        >
          {showForm ? "Batal" : "+ Tambah FAQ"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow-sm p-5 mb-6 space-y-4">
          <input
            type="text"
            placeholder="Pertanyaan"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            required
          />
          <textarea
            placeholder="Jawaban"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            rows={3}
            required
          />
          <input
            type="number"
            placeholder="Urutan"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
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
        {!loading && faqs.length === 0 && (
          <p className="text-gray-400 text-center py-8">Belum ada FAQ</p>
        )}
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[#3B2A24] text-sm">
                  {faq.order > 0 && (
                    <span className="text-gray-400 mr-2">#{faq.order}</span>
                  )}
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
              </div>
              <button
                onClick={() => handleDelete(faq._id)}
                className="text-gray-400 hover:text-red-500 text-sm ml-4 flex-shrink-0"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
