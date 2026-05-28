"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

const emptyForm = { question: "", answer: "", order: 0 };

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<FaqItem | null>(null);

  useEffect(() => { fetchFaqs(); }, []);

  async function fetchFaqs() {
    setLoading(true);
    try { setFaqs(await (await fetch("/api/faq")).json()); }
    catch { console.error("Failed"); }
    finally { setLoading(false); }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      if (res.ok) {
        setAddModal(false);
        setAddForm(emptyForm);
        fetchFaqs();
      }
    } catch { console.error("Failed"); }
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editData) return;
    try {
      const res = await fetch(`/api/faq/${editData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        setFaqs((prev) => prev.map((f) => (f._id === editData._id ? editData : f)));
        setEditModal(false);
      }
    } catch { console.error("Failed"); }
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
    } catch { console.error("Failed"); }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3B2A24]">FAQ</h1>
        <button onClick={() => setAddModal(true)} className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a]">
          + Tambah
        </button>
      </div>

      <div className="space-y-3">
        {loading && <p className="text-gray-400 text-center py-8">Memuat...</p>}
        {!loading && faqs.length === 0 && <p className="text-gray-400 text-center py-8">Belum ada FAQ</p>}
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[#3B2A24] text-sm">
                  {faq.order > 0 && <span className="text-gray-400 mr-2">#{faq.order}</span>}
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
              </div>
              <div className="flex gap-2 ml-4 flex-shrink-0">
                <button onClick={() => { setEditData(faq); setEditModal(true); }} className="text-xs text-gray-400 hover:text-gray-600">Edit</button>
                <button onClick={() => handleDelete(faq._id)} className="text-xs text-gray-400 hover:text-red-500">✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={addModal} onClose={() => { setAddModal(false); setAddForm(emptyForm); }} title="Tambah FAQ">
        <form onSubmit={handleCreate} className="space-y-3">
          <input type="text" value={addForm.question} onChange={(e) => setAddForm({ ...addForm, question: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Pertanyaan" />
          <textarea value={addForm.answer} onChange={(e) => setAddForm({ ...addForm, answer: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} required placeholder="Jawaban" />
          <input type="number" value={addForm.order} onChange={(e) => setAddForm({ ...addForm, order: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Urutan" />
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium">Simpan</button>
            <button type="button" onClick={() => { setAddModal(false); setAddForm(emptyForm); }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
          </div>
        </form>
      </Modal>

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit FAQ">
        {editData && (
          <form onSubmit={handleEdit} className="space-y-3">
            <input type="text" value={editData.question} onChange={(e) => setEditData({ ...editData, question: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Pertanyaan" />
            <textarea value={editData.answer} onChange={(e) => setEditData({ ...editData, answer: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} required placeholder="Jawaban" />
            <input type="number" value={editData.order} onChange={(e) => setEditData({ ...editData, order: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Urutan" />
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium">Simpan</button>
              <button type="button" onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
