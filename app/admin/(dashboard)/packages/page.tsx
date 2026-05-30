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

const emptyForm = { name: "", price: 0, description: "", features: "", isPopular: false, isActive: true };

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [addCategories, setAddCategories] = useState<{ name: string; items: string[] }[]>([]);

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<Package | null>(null);
  const [editCategories, setEditCategories] = useState<{ name: string; items: string[] }[]>([]);

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
        categories: addCategories.length > 0 ? addCategories : undefined,
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

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editData) return;
    const res = await fetch(`/api/packages/${editData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editData,
        categories: editCategories.length > 0 ? editCategories : undefined,
      }),
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
                <button onClick={() => { setEditData(p); setEditCategories(p.categories ? p.categories.map((c) => ({ name: c.name, items: [...c.items] })) : []); setEditModal(true); }} className="text-xs text-gray-400 hover:text-gray-600 px-1">Edit</button>
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

      <Modal open={addModal} onClose={() => { setAddModal(false); setAddForm(emptyForm); setAddCategories([]); }} title="Tambah Paket">
        <form onSubmit={handleAdd} className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
          <input type="text" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Nama Paket" />
          <input type="number" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Harga" />
          <textarea value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} placeholder="Deskripsi" />
          <textarea value={addForm.features} onChange={(e) => setAddForm({ ...addForm, features: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={4} placeholder="Fitur (pisahkan dengan baris baru)" />

          <div className="border border-gray-200 rounded-lg p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Kategori</span>
              <button type="button" onClick={() => setAddCategories([...addCategories, { name: "", items: [] }])} className="text-xs text-[#C97B7B] hover:text-[#b86a6a] font-medium">+ Tambah Kategori</button>
            </div>
            {addCategories.map((cat, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input type="text" value={cat.name} onChange={(e) => { const c = [...addCategories]; c[i] = { ...c[i], name: e.target.value }; setAddCategories(c); }} className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm" placeholder="Nama kategori" />
                  <button type="button" onClick={() => setAddCategories(addCategories.filter((_, j) => j !== i))} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
                </div>
                <textarea value={cat.items.join("\n")} onChange={(e) => { const c = [...addCategories]; c[i] = { ...c[i], items: e.target.value.split("\n") }; setAddCategories(c); }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" rows={3} placeholder="Item (pisahkan dengan baris baru)" />
              </div>
            ))}
            {addCategories.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada kategori</p>}
          </div>

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
            <button type="button" onClick={() => { setAddModal(false); setAddForm(emptyForm); setAddCategories([]); }} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
          </div>
        </form>
      </Modal>

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Paket">
        {editData && (
          <form onSubmit={handleEdit} className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
            <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Nama Paket" />
            <input type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Harga" />
            <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={3} placeholder="Deskripsi" />
            <textarea value={editData.features?.join("\n") || ""} onChange={(e) => setEditData({ ...editData, features: e.target.value.split("\n") })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={4} placeholder="Fitur (pisahkan dengan baris baru)" />

            <div className="border border-gray-200 rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Kategori</span>
                <button type="button" onClick={() => setEditCategories([...editCategories, { name: "", items: [] }])} className="text-xs text-[#C97B7B] hover:text-[#b86a6a] font-medium">+ Tambah Kategori</button>
              </div>
              {editCategories.map((cat, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="text" value={cat.name} onChange={(e) => { const c = [...editCategories]; c[i] = { ...c[i], name: e.target.value }; setEditCategories(c); }} className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm" placeholder="Nama kategori" />
                    <button type="button" onClick={() => setEditCategories(editCategories.filter((_, j) => j !== i))} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
                  </div>
                  <textarea value={cat.items.join("\n")} onChange={(e) => { const c = [...editCategories]; c[i] = { ...c[i], items: e.target.value.split("\n") }; setEditCategories(c); }} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" rows={3} placeholder="Item (pisahkan dengan baris baru)" />
                </div>
              ))}
              {editCategories.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Belum ada kategori</p>}
            </div>

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
