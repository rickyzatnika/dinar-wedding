import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Package from "@/models/Package";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await connectDB();

  const [totalBookings, pendingBookings, totalPackages] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "pending" }),
    Package.countDocuments(),
  ]);

  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const stats = [
    { label: "Total Booking", value: totalBookings, color: "bg-[#C97B7B]" },
    { label: "Pending", value: pendingBookings, color: "bg-amber-500" },
    { label: "Paket", value: totalPackages, color: "bg-emerald-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#3B2A24] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${s.color}`} />
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
            <p className="text-3xl font-bold text-[#3B2A24] mt-2">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-[#3B2A24]">Booking Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Nama</th>
                <th className="px-5 py-3 font-medium">Paket</th>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-400">
                    Belum ada booking
                  </td>
                </tr>
              )}
              {recentBookings.map((b: Record<string, unknown>) => (
                <tr key={String(b._id)} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-[#3B2A24]">
                    {String(b.nama || "-")}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {String(b.paket || "-")}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {b.tanggal
                      ? new Date(b.tanggal as string).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {String(b.status || "pending")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
