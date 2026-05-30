<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Dinnar Wedding — Project Summary

## Deskripsi
Website landing page + admin panel untuk bisnis wedding organizer "Dinar Wedding".  
Stack: **Next.js 16.2.6**, **MongoDB/Mongoose**, **Tailwind CSS**, **NextAuth.js**.

## Struktur Folder
```
app/
├── admin/          — Admin panel (dashboard, packages, gallery, booking, faq)
│   ├── (auth)/     — Login page
│   └── (dashboard)/— Protected admin pages
├── api/            — REST API routes (booking, packages, gallery, faq, etc.)
├── booking/        — Public booking page
├── gallery/        — Public gallery page
└── paket/          — Public package listing
components/
├── admin/          — Modal, Sidebar, SessionProvider
├── animation/      — FadeUp, Parallax, RevealText
├── layout/         — Navbar, Footer, LayoutWrapper
├── sections/       — Hero, About, Services, Pricing, Gallery, etc.
└── ui/             — Button, Card, SectionTitle, FloatingWhatsApp
models/             — Mongoose schemas (Booking, Package, Gallery, etc.)
lib/                — DB connection, auth config, helpers
```

## Apa yang Pernah Dilakukan

### Sebelum Sesi Ini (dari git history)
- Setup awal project + landing page
- Migrasi gambar gallery dari local ke Cloudinary (`lib/data.ts`, `next.config.ts`)
- Refactor `Gallery.tsx` — fetch dari `/api/gallery` (MongoDB) via `useEffect`
- Perbaiki landing page: logo, 8 paket dari PRICELIST, ornamen, next/image
- Perbaiki admin navbar & dashboard UI
- Update package categories

### Sesi Ini (31 Mei 2026)
1. **Dashboard — subtitle text** (`app/admin/(dashboard)/dashboard/page.tsx`)
   - `text-gray-500` → `text-gray-600` biar lebih keliatan di background `bg-gray-50`

2. **Dashboard — stat cards** (`app/admin/(dashboard)/dashboard/page.tsx`)
   - Pindah `s.bg` gradient ke outer div (sebelumnya di absolute inner div dengan `opacity-90`)
   - Label: `text-white/80` → `text-white/90`
   - Icon: `text-white/60` → `text-white/70`
   - Text jadi lebih jelas

3. **Packages — edit modal** (`app/admin/(dashboard)/packages/page.tsx`)
   - **Fitur**: textarea (sebelumnya **tidak ada** di edit modal!)
   - **Kategori**: form dinamis — input nama + items textarea + tombol tambah/hapus (sebelumnya **tidak ada**, lalu diganti dari JSON textarea)
   - **Aktif**: checkbox (sebelumnya **tidak ada**)
   - **`overflow-y-auto max-h-[70vh]`** biar form panjang bisa di-scroll
   - Interface `Package` & `emptyForm` diselaraskan dengan schema database (`categories`, `isActive`)

4. **Packages — add modal** (`app/admin/(dashboard)/packages/page.tsx`)
   - Ditambahkan field **Kategori** (form dinamis)
   - Ditambahkan field **Aktif** (checkbox)

5. **Cleanup — hapus file tidak terpakai** (15 file)
   - Komponen: `RevealText.tsx`, `Parallax.tsx`
   - Hooks: `useParallax.ts`, `useMediaQuery.ts`
   - Lib: `motion.ts`
   - Constants: `colors.ts`
   - Styles: `theme.css`
   - Middleware: `proxy.ts` (bukan `middleware.ts`, ga auto-detect)
   - Public: `window.svg`, `vercel.svg`, `next.svg`, `globe.svg`, `file.svg`
   - Scripts: `migrate-gallery.ts`, `upload-to-cloudinary.ts`
   - Semua file di-backup ke `_backup/unused-files/` sebelum dihapus

---

# WhatsApp Bot — Project Summary

## Deskripsi
Bot WhatsApp untuk Dinar Wedding berbasis **Baileys** + **Groq AI**.  
Fungsi: menerima booking via form, membalas pesan otomatis (intent-based), dan admin AI untuk CRUD booking/chat lewat command `/`.

## Stack
- **Baileys** (WhatsApp Web JS)
- **Groq SDK** (AI model `qwen/qwen3-32b`)
- **MongoDB** (via REST API dinnar-wedding)
- **Node.js**

## Struktur Folder
```
whatsapp-bot/
├── src/
│   ├── admin-ai/       — Admin AI assistant module
│   │   ├── index.js    — Entry point: session management, routing `/`
│   │   ├── ai.js       — Groq AI engine, multi-round tool calling, think tag stripper
│   │   ├── prompt.js   — System prompt, booking schema, tone instructions
│   │   ├── tools.js    — 9 tools: CRUD booking, schedule/chat reminders
│   │   └── ...
│   ├── engine/         — Message processing pipeline
│   │   ├── orchestrator.js — Intent detection, form flow, `/` routing
│   │   ├── businessLogic.js — Parse booking data, phone conversion 08xx→628xx
│   │   └── intentDetector.js— Regex intent matching
│   ├── whatsapp/       — Baileys client connection
│   │   └── bot.js      — Message send/receive, fromMe filter, timeouts
│   ├── api/            — HTTP client to dinnar-wedding API
│   │   └── client.js   — Booking CRUD, request wrapper
│   └── config/         — Env-based config
│       └── index.js    — ADMIN_NUMBERS, MODEL, etc.
└── .env                — GROQ_API_KEY, MODEL, ADMIN_NUMBERS, etc.
```

## Fitur
- **Intent-based reply** — deteksi "tertarik dengan paket", "booking", "info", dll.
- **Booking form** — guided flow (nama, paket, tanggal, no WA)
- **Admin AI** (`/` commands) — `/chat`, `/booking`, `/reminder`, `/schedule`, dll.
- **Multi-round tool calling** — AI bisa panggil tools secara berantai (max 5 putaran)
- **Phone conversion** — `08xx` → `628xx` otomatis, fallback ke JID
- **Scheduled messages** — `setTimeout`-based reminder/chat scheduler
- **fromMe filter** — hanya skip self-messages non-`/`; `/` commands tetap diproses meskipun dari bot sendiri
