"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/admin/Modal";

interface Booking {
  _id: string;
  nama: string;
  phone: string;
  alamat: string;
  tanggal: string;
  waktu: string;
  paket: string;
  pesan?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState<Booking | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch("/api/booking");
      setBookings(await res.json());
    } catch {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/booking/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: status as Booking["status"] } : b))
      );
    }
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editData) return;
    const res = await fetch(`/api/booking/${editData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      setBookings((prev) => prev.map((b) => (b._id === editData._id ? editData : b)));
      setEditModal(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch(`/api/booking/${deleteTarget}`, { method: "DELETE" });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b._id !== deleteTarget));
      setDeleteModal(false);
      setDeleteTarget(null);
    }
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Hapus ${selected.size} booking?`)) return;
    const res = await fetch("/api/booking/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [...selected] }),
    });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => !selected.has(b._id)));
      setSelected(new Set());
    }
  }

  function toggleSelect(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const badgeClass = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      case "completed": return "bg-blue-100 text-blue-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="p-6">
      <div className="sticky top-0 z-20 bg-gray-50 pb-4 flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#3B2A24]">Booking</h1>
        <div className="flex items-center gap-3 flex-wrap">
          {selected.size > 0 && (
            <button onClick={handleBulkDelete} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600">
              Hapus ({selected.size})
            </button>
          )}
          <div className="flex gap-2">
            {["all", "pending", "confirmed", "cancelled", "completed"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-[#C97B7B] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <Link href="/admin/booking/tambah-booking" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium hover:bg-[#b86a6a]">
            + Tambah
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-3 py-3 w-10">
                  <input type="checkbox" onChange={(e) => {
                    if (e.target.checked) setSelected(new Set(filtered.map((b) => b._id)));
                    else setSelected(new Set());
                  }} checked={selected.size === filtered.length && filtered.length > 0} className="rounded" />
                </th>
                <th className="px-5 py-3 font-medium">Nama</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Paket</th>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium">Alamat</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={8} className="px-5 py-8 text-center text-gray-400">Memuat data...</td></tr>}
              {!loading && filtered.length === 0 && <tr><td colSpan={8} className="px-5 py-8 text-center text-gray-400">Tidak ada booking</td></tr>}
              {filtered.map((b) => (
                <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-3 py-3"><input type="checkbox" checked={selected.has(b._id)} onChange={() => toggleSelect(b._id)} className="rounded" /></td>
                  <td className="px-5 py-3 font-medium text-[#3B2A24]">{b.nama}</td>
                  <td className="px-5 py-3 text-gray-600">{b.phone}</td>
                  <td className="px-5 py-3 text-gray-600">{b.paket}</td>
                  <td className="px-5 py-3 text-gray-600">{new Date(b.tanggal).toLocaleDateString("id-ID")}</td>
                  <td className="px-5 py-3 text-gray-600 max-w-[200px] truncate">{b.alamat || "-"}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass(b.status)}`}>{b.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      {b.status === "pending" && (
                        <>
                          <button onClick={() => updateStatus(b._id, "confirmed")} className="px-2.5 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Confirm</button>
                          <button onClick={() => updateStatus(b._id, "cancelled")} className="px-2.5 py-1 bg-red-400 text-white rounded text-xs hover:bg-red-500">Cancel</button>
                        </>
                      )}
                      {b.status === "confirmed" && (
                        <button onClick={() => updateStatus(b._id, "completed")} className="px-2.5 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Complete</button>
                      )}
                      <button onClick={() => { setEditData(b); setEditModal(true); }} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200">Edit</button>
                      <button onClick={() => { setDeleteTarget(b._id); setDeleteModal(true); }} className="px-2.5 py-1 bg-gray-200 text-gray-600 rounded text-xs hover:bg-gray-300">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Booking">
        {editData && (
          <form onSubmit={handleEdit} className="space-y-3">
            <input type="text" value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="Nama" />
            <input type="text" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <textarea value={editData.alamat} onChange={(e) => setEditData({ ...editData, alamat: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2} />
            <input type="date" value={editData.tanggal?.split("T")[0]} onChange={(e) => setEditData({ ...editData, tanggal: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            <input type="text" value={editData.paket} onChange={(e) => setEditData({ ...editData, paket: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value as Booking["status"] })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-[#C97B7B] text-white rounded-lg text-sm font-medium">Simpan</button>
              <button type="button" onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)} title="Hapus Booking">
        <p className="text-sm text-gray-600 mb-4">Yakin ingin menghapus booking ini?</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">Ya, Hapus</button>
          <button onClick={() => setDeleteModal(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Batal</button>
        </div>
      </Modal>
    </div>
  );
}
