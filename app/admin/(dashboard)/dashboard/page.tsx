import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Package from "@/models/Package";
import Link from "next/link";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    cancelled: "bg-red-50 text-red-700 ring-red-600/20",
    completed: "bg-blue-50 text-blue-700 ring-blue-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  };
  const labels: Record<string, string> = {
    confirmed: "Confirmed",
    cancelled: "Dibatalkan",
    completed: "Selesai",
    pending: "Pending",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || styles.pending}`}>
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${status === "confirmed" ? "bg-emerald-500" : status === "cancelled" ? "bg-red-500" : status === "completed" ? "bg-blue-500" : "bg-amber-500"}`} />
      {labels[status] || status}
    </span>
  );
}

export default async function AdminDashboardPage() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    todayBookings,
    totalPackages,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "pending" }),
    Booking.countDocuments({ status: "confirmed" }),
    Booking.countDocuments({ status: "completed" }),
    Booking.countDocuments({ status: "cancelled" }),
    Booking.countDocuments({ tanggal: { $gte: today, $lt: tomorrow } }),
    Package.countDocuments(),
  ]);

  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const stats = [
    {
      label: "Total Booking",
      value: totalBookings,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      bg: "from-rose-500 to-pink-600",
    },
    {
      label: "Pending",
      value: pendingBookings,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "from-amber-500 to-orange-600",
    },
    {
      label: "Confirmed",
      value: confirmedBookings,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "from-emerald-500 to-teal-600",
    },
    {
      label: "Hari Ini",
      value: todayBookings,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      bg: "from-violet-500 to-purple-600",
    },
  ];

  const quickActions = [
    { label: "Tambah Booking", href: "/admin/booking/tambah-booking", icon: "📅", desc: "Buat reservasi baru" },
    { label: "Kelola Paket", href: "/admin/packages", icon: "💎", desc: "Atur daftar paket" },
    { label: "Kelola Galeri", href: "/admin/gallery", icon: "🖼️", desc: "Update portofolio" },
    { label: "Kelola FAQ", href: "/admin/faq", icon: "❓", desc: "Atur pertanyaan umum" },
  ];

  const secondaryStats = [
    { label: "Selesai", value: completedBookings, color: "text-blue-600" },
    { label: "Dibatalkan", value: cancelledBookings, color: "text-red-600" },
    { label: "Paket Aktif", value: totalPackages, color: "text-emerald-600" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview bisnis Dinar Wedding</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="relative overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg transition-transform hover:-translate-y-0.5">
            <div className={`absolute inset-0 ${s.bg} opacity-90`} />
            <div className="relative p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/80 text-sm font-medium">{s.label}</span>
                <span className="text-white/60">{s.icon}</span>
              </div>
              <p className="text-3xl font-bold tracking-tight">{s.value}</p>
              <div className="mt-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-full bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Booking Terbaru</h2>
              <Link href="/admin/booking" className="text-sm text-rose-600 hover:text-rose-700 font-medium">
                Lihat Semua
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-50 text-left">
                    <th className="px-6 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Paket</th>
                    <th className="px-6 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                          </svg>
                          <span className="text-sm">Belum ada booking</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {recentBookings.map((b: Record<string, unknown>) => (
                    <tr key={String(b._id)} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{String(b.nama || "-")}</div>
                        {b.phone ? <div className="text-xs text-gray-400 mt-0.5">{String(b.phone)}</div> : null}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{String(b.paket || "-")}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {b.tanggal
                          ? new Date(b.tanggal as string).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={String(b.status || "pending")} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Ringkasan</h3>
            <div className="space-y-3">
              {secondaryStats.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">{s.label}</span>
                  <span className={`text-lg font-semibold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-gray-100 hover:border-rose-200 hover:bg-rose-50/50 transition-colors text-center"
                >
                  <span className="text-xl">{a.icon}</span>
                  <span className="text-xs font-medium text-gray-700">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
