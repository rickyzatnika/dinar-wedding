"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/admin/Modal";

interface GalleryItem {
  _id: string;
  src: string;
  alt: string;
  category: string;
}

const PER_PAGE = 12;

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<GalleryItem | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(data);
      setHasMore(data.length > PER_PAGE);
    } catch {
      console.error("Failed");
    } finally {
      setLoading(false);
    }
  }

  const displayedItems = items.slice(0, page * PER_PAGE);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

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

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm">Memuat gambar...</span>
          </div>
        </div>
      )}
      {!loading && items.length === 0 && <p className="text-gray-400 text-center py-12 text-sm">Belum ada gambar</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayedItems.map((item) => (
          <div key={item._id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="absolute top-2 left-2 z-10">
              <input type="checkbox" checked={selected.has(item._id)} onChange={() => toggleSelect(item._id)} className="rounded accent-rose-500" />
            </div>
            <button className="relative aspect-square bg-gray-100 overflow-hidden w-full" onClick={() => setLightbox(item)}>
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt || "Gallery image"}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                  unoptimized
                  loading={displayedItems.indexOf(item) < 4 ? "eager" : "lazy"}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
              )}
            </button>
            <div className="p-2.5">
              <p className="text-xs font-medium text-gray-900 truncate">{item.alt || "Tanpa judul"}</p>
              <p className="text-[10px] text-gray-400 capitalize">{item.category}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setEditData(item); setEditModal(true); }} className="bg-white/90 backdrop-blur rounded-full w-7 h-7 flex items-center justify-center text-xs text-gray-600 hover:bg-white shadow-sm">Edit</button>
              <button onClick={() => { setDeleteTarget(item._id); setDeleteModal(true); }} className="bg-white/90 backdrop-blur rounded-full w-7 h-7 flex items-center justify-center text-xs text-red-500 hover:bg-white shadow-sm">✕</button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && displayedItems.length < items.length && (
        <div ref={loaderRef} className="flex justify-center py-6">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-xs">Memuat lainnya...</span>
          </div>
        </div>
      )}

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

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium">
              Tutup ✕
            </button>
            <div className="text-center">
              <Image
                src={lightbox.src.replace("/upload/", "/upload/w_800,q_auto/")}
                alt={lightbox.alt || "Gallery"}
                width={800}
                height={600}
                className="max-w-full max-h-[60vh] w-auto h-auto mx-auto rounded-lg shadow-2xl"
                unoptimized
              />
            </div>
            <div className="text-center mt-3 text-white/80 text-sm">
              {lightbox.alt} <span className="text-white/40">—</span> <span className="capitalize">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
