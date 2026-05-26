"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/admin/Modal";

interface GalleryItem {
  _id: string;
  src: string;
  alt: string;
  category: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<GalleryItem | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      setItems(await res.json());
    } catch {
      console.error("Failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editData) return;
    const res = await fetch(`/api/gallery/${editData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      setItems((prev) => prev.map((item) => (item._id === editData._id ? editData : item)));
      setEditModal(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget }),
    });
    if (res.ok) {
      setItems((prev) => prev.filter((item) => item._id !== deleteTarget));
      setDeleteModal(false);
      setDeleteTarget(null);
    }
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Hapus ${selected.size} gambar?`)) return;
    const res = await fetch("/api/gallery/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [...selected] }),
    });
    if (res.ok) {
      setItems((prev) => prev.filter((item) => !selected.has(item._id)));
      setSelected(new Set());
    }
  }

  function toggleSelect(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3B2A24]">Galeri</h1>
        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <button onClick={handleBulkDelete} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600">
              Hapus ({selected.size})
            </button>
          )}
          <Link href="/admin/gallery/tambah-galeri" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a]">
            + Tambah
          </Link>
        </div>
      </div>

      {loading && <p className="text-gray-400 text-center py-8">Memuat...</p>}
      {!loading && items.length === 0 && <p className="text-gray-400 text-center py-8">Belum ada gambar</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item._id} className="group relative bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="absolute top-2 left-2 z-10">
              <input type="checkbox" checked={selected.has(item._id)} onChange={() => toggleSelect(item._id)} className="rounded" />
            </div>
            <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-xs p-2 break-all">
              {item.src ? (
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.innerText = "Invalid URL"; }} />
              ) : "No Image"}
            </div>
            <div className="p-2">
              <p className="text-xs font-medium text-[#3B2A24] truncate">{item.alt}</p>
              <p className="text-[10px] text-gray-400">{item.category}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setEditData(item); setEditModal(true); }} className="bg-white/80 rounded-full w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-white">Edit</button>
              <button onClick={() => { setDeleteTarget(item._id); setDeleteModal(true); }} className="bg-white/80 rounded-full w-6 h-6 flex items-center justify-center text-xs text-red-500 hover:bg-white">✕</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Gambar">
        {editData && (
          <form onSubmit={handleEdit} className="space-y-3">
            <input type="text" value={editData.src} onChange={(e) => setEditData({ ...editData, src: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="URL Gambar" />
            <input type="text" value={editData.alt} onChange={(e) => setEditData({ ...editData, alt: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Alt Text" />
            <select value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="all">All</option>
              <option value="makeup">Makeup</option>
              <option value="bridal">Bridal</option>
              <option value="dekorasi">Dekorasi</option>
              <option value="prewedding">Prewedding</option>
            </select>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium">Simpan</button>
              <button type="button" onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Hapus Gambar">
        <p className="text-sm text-gray-600 mb-4">Yakin ingin menghapus gambar ini?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Ya, Hapus</button>
          <button onClick={() => setDeleteModal(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
        </div>
      </Modal>
    </div>
  );
}
