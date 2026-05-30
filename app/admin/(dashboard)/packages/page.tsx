"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";

interface Package {
  _id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  categories?: { name: string; items: string[] }[];
  isPopular?: boolean;
  isActive?: boolean;
}

const emptyForm = { name: "", price: 0, description: "", features: "", categories: "", isPopular: false, isActive: true };

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<Package | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => { fetchPackages(); }, []);

  async function fetchPackages() {
    setLoading(true);
    try { setPackages(await (await fetch("/api/packages")).json()); }
    catch { console.error("Failed"); }
    finally { setLoading(false); }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addForm.name,
        price: addForm.price,
        description: addForm.description,
        features: addForm.features.split("\n").filter(Boolean),
        categories: addForm.categories ? parseCategories(addForm.categories) : undefined,
        isPopular: addForm.isPopular,
        isActive: addForm.isActive,
      }),
    });
    if (res.ok) {
      setAddModal(false);
      setAddForm(emptyForm);
      fetchPackages();
    }
  }

  function parseCategories(raw: string): { name: string; items: string[] }[] {
    try { return JSON.parse(raw); }
    catch { return []; }
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editData) return;
    const res = await fetch(`/api/packages/${editData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      setPackages((prev) => prev.map((p) => (p._id === editData._id ? editData : p)));
      setEditModal(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch("/api/packages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteTarget }),
    });
    if (res.ok) {
      setPackages((prev) => prev.filter((p) => p._id !== deleteTarget));
      setDeleteModal(false);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3B2A24]">Paket</h1>
        <button onClick={() => setAddModal(true)} className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a]">
          + Tambah
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <p className="text-gray-400 col-span-3 text-center py-8">Memuat...</p>}
        {!loading && packages.length === 0 && <p className="text-gray-400 col-span-3 text-center py-8">Belum ada paket</p>}
        {packages.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[#3B2A24]">{p.name}</h3>
                <p className="text-[#C97B7B] font-bold mt-1">Rp {p.price.toLocaleString("id-ID")}</p>
                {p.isPopular && <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">Populer</span>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditData(p); setEditModal(true); }} className="text-xs text-gray-400 hover:text-gray-600 px-1">Edit</button>
                <button onClick={() => { setDeleteTarget(p._id); setDeleteModal(true); }} className="text-xs text-gray-400 hover:text-red-500 px-1">Hapus</button>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">{p.description}</p>
            {p.features?.length > 0 && (
              <ul className="mt-2 space-y-1">{p.features.map((f, i) => <li key={i} className="text-xs text-gray-400">• {f}</li>)}</ul>
            )}
          </div>
        ))}
      </div>

      <Modal open={addModal} onClose={() => { setAddModal(false); setAddForm(emptyForm); }} title="Tambah Paket">
        <form onSubmit={handleAdd} className="space-y-3">
          <input type="text" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Nama Paket" />
          <input type="number" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Harga" />
          <textarea value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} placeholder="Deskripsi" />
          <textarea value={addForm.features} onChange={(e) => setAddForm({ ...addForm, features: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={4} placeholder="Fitur (pisahkan dengan baris baru)" />
          <textarea value={addForm.categories} onChange={(e) => setAddForm({ ...addForm, categories: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} placeholder='Kategori (JSON, contoh: [{"name":"Dekorasi","items":["item1","item2"]}])' />
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={addForm.isPopular} onChange={(e) => setAddForm({ ...addForm, isPopular: e.target.checked })} className="rounded" />
              <span className="text-sm text-gray-700">Populer</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={addForm.isActive} onChange={(e) => setAddForm({ ...addForm, isActive: e.target.checked })} className="rounded" />
              <span className="text-sm text-gray-700">Aktif</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium">Simpan</button>
            <button type="button" onClick={() => { setAddModal(false); setAddForm(emptyForm); }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
          </div>
        </form>
      </Modal>

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Paket">
        {editData && (
          <form onSubmit={handleEdit} className="space-y-3">
            <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Nama Paket" />
            <input type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Harga" />
            <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} placeholder="Deskripsi" />
            <textarea value={editData.features?.join("\n") || ""} onChange={(e) => setEditData({ ...editData, features: e.target.value.split("\n") })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={4} placeholder="Fitur (pisahkan dengan baris baru)" />
            <textarea value={editData.categories ? JSON.stringify(editData.categories, null, 2) : ""} onChange={(e) => { try { setEditData({ ...editData, categories: JSON.parse(e.target.value) }); } catch { /* invalid JSON */ } }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono" rows={3} placeholder='Kategori (JSON)' />
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editData.isPopular} onChange={(e) => setEditData({ ...editData, isPopular: e.target.checked })} className="rounded" />
                <span className="text-sm text-gray-700">Populer</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editData.isActive ?? true} onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })} className="rounded" />
                <span className="text-sm text-gray-700">Aktif</span>
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium">Simpan</button>
              <button type="button" onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Hapus Paket">
        <p className="text-sm text-gray-600 mb-4">Yakin ingin menghapus paket ini?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Ya, Hapus</button>
          <button onClick={() => setDeleteModal(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
        </div>
      </Modal>
    </div>
  );
}
