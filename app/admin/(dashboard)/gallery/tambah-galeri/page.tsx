"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { cloudinaryConfig } from "@/lib/cloudinary";

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: { event: string; info: { secure_url: string } }) => void
      ) => { open: () => void };
    };
  }
}

export default function TambahGaleri() {
  const router = useRouter();
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("makeup");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const widgetRef = useRef<ReturnType<Window["cloudinary"]["createUploadWidget"]> | null>(null);

  function openUploader() {
    if (widgetRef.current) {
      widgetRef.current.open();
      return;
    }

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFileSize: 10 * 1024 * 1024,
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        theme: "minimal",
        styles: {
          palette: {
            window: "#ffffff",
            windowBorder: "#e5e7eb",
            tabIcon: "#C97B7B",
            menuIcons: "#C97B7B",
            textDark: "#1f2937",
            textLight: "#ffffff",
            link: "#C97B7B",
            action: "#C97B7B",
            inactiveTabIcon: "#9ca3af",
            error: "#ef4444",
            inProgress: "#C97B7B",
            complete: "#22c55e",
            sourceBg: "#f9fafb",
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setSrc(result.info.secure_url);
        }
      }
    );

    widgetRef.current.open();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!src) return;
    setLoading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src, alt, category }),
      });
      if (res.ok) router.push("/admin/gallery");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        strategy="afterInteractive"
      />
      <div className="p-6 lg:p-8 max-w-2xl">
      <Link href="/admin/gallery" className="text-sm text-rose-600 hover:text-rose-700 font-medium">&larr; Kembali</Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">Tambah Galeri</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Gambar</label>
          {src ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 mb-3">
              <Image src={src} alt="Preview" fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center mb-3">
              <span className="text-sm text-gray-400">Belum ada gambar</span>
            </div>
          )}
          <button type="button" onClick={openUploader} disabled={uploading}
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
            {uploading ? "Mengupload..." : "Upload ke Cloudinary"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Gambar (otomatis)</label>
          <input type="text" value={src} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500" placeholder="Upload dulu..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul / Alt Text</label>
          <input type="text" required value={alt} onChange={(e) => setAlt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none"
            placeholder="Deskripsi gambar" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none">
            <option value="makeup">Makeup</option>
            <option value="akad">Akad</option>
            <option value="dekorasi">Dekorasi</option>
            <option value="prewedding">Prewedding</option>
          </select>
        </div>

        <button type="submit" disabled={loading || !src}
          className="w-full py-3 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
    </>
  );
}
