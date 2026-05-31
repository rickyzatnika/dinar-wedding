# Progress — 31 Mei 2026

## 1. Fix: AI Admin bilang "tidak ada data booking" padahal ada

**File:** `whatsapp-bot/src/admin-ai/prompt.js`

**Masalah:** Di prompt tertulis "Gunakan tool `get_bookings` dengan filter yang sesuai". AI membaca waktu skrg (31 Mei 2026) dan otomatis nambah filter `{"bulan":"5","tahun":"2026"}`. Tapi data booking di database semuanya tahun **2027**, jadi hasilnya kosong.

**Fix:** Ubah instruksi `/ask` — AI disuruh panggil `get_bookings` **TANPA filter** kecuali admin menyebutkan periode tertentu.

---

## 2. Fix: Package match salah — "ONLY MAKEUP & ATTIRE" malah nampilin "ONLY MAKEUP & ATTIRE AKAD"

**File:** `whatsapp-bot/src/engine/orchestrator.js`

**Masalah:** Ada 2 paket dengan nama mirip:
- "ONLY MAKEUP & ATTIRE AKAD" (Rp 3.500.000) — index 0
- "ONLY MAKEUP & ATTIRE" (Rp 7.000.000) — index 1

Logika `name.includes(pkgInput)` mencocokkan **keduanya**, tapi `find()` balikin yang pertama.

**Fix:** Prioritas **exact match** dulu (name === pkgInput), baru fallback ke partial match.

---

## 3. Fix: "tertarik dengan paket X" kedua jadi Unhandled

**File:** `whatsapp-bot/src/engine/intentDetector.js`

**Masalah:** Setelah reply pertama, `lastMenu` ke-set. Semua text-based intent di-skip karena gate `!lastMenu`, termasuk `tertarikMatch`.

**Fix:** Hapus `!lastMenu` dari gate `tertarikMatch` biar user bisa nanya paket lain kapan aja.

---

## 4. New Feature: Automatic Follow-Up Bot

### Dinnar-Wedding (API + Model)

**File baru:**
- `models/FollowUp.ts` — Mongoose schema: jid, pushName, eventType (package_interest|booking_started), status (pending|sent|completed|cancelled), scheduledAt, sentAt, respondedAt
- `app/api/followup/route.ts` — GET (filter by status/jid), POST (create)
- `app/api/followup/[id]/route.ts` — PATCH (update status)

### WhatsApp-Bot

**File baru:**
- `src/engine/followUpScheduler.js` — Scheduler ngecek tiap 30 detik, kirim follow-up via `sendToJid`, update status jadi `sent`

**File diubah:**
- `src/api/client.js` — +createFollowUp, +getFollowUps, +updateFollowUp
- `src/engine/orchestrator.js`:
  - Trigger `package_interest` (+24 jam) di `ask_packages` & `ask_package_detail`
  - Trigger `booking_started` (+6 jam) di `start_booking`
  - Cancel `booking_started` kalau booking berhasil (`submit_booking_data` / `provide_date`)
  - Handler balasan "1" → route ke admin contact (DISABLED)
  - Handler balasan "2" → mark completed
- `src/whatsapp/bot.js`:
  - Import & start scheduler pas connection open
  - Pass `pushName` ke `processMessage`

### Trigger events:
| Event | Trigger | Delay | Template |
|-------|---------|-------|----------|
| `package_interest` | User lihat paket (ask_packages / ask_package_detail) | 24 jam | "Kemarin Anda melihat paket wedding kami... Balas: 1️⃣ Ya 2️⃣ Tidak" |
| `booking_started` | User mulai booking (start_booking) | 6 jam | "Kami melihat Anda belum menyelesaikan proses booking..." |

### User response handling:
- **"1"** → langsung masuk mode admin contact (state DISABLED)
- **"2"** → follow-up selesai, ga ada follow-up lagi buat event itu
