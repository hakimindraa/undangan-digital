import prisma from "@/lib/prisma";

export default async function AdminOverview() {
  const [totalGuests, rsvps, wishes] = await Promise.all([
    prisma.guest.count(),
    prisma.rsvp.findMany(),
    prisma.wish.count(),
  ]);

  const attendingCount = rsvps.filter(r => r.attending).reduce((sum, r) => sum + r.totalGuest, 0);
  const notAttendingCount = rsvps.filter(r => !r.attending).length;
  const totalRsvpResponded = rsvps.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tamu Diundang" value={totalGuests} color="bg-blue-50 text-blue-700" />
        <StatCard title="Total RSVP Masuk" value={totalRsvpResponded} color="bg-purple-50 text-purple-700" />
        <StatCard title="Estimasi Hadir" value={attendingCount} color="bg-green-50 text-green-700" />
        <StatCard title="Total Ucapan" value={wishes} color="bg-yellow-50 text-yellow-700" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">RSVP Terbaru</h2>
        {rsvps.length === 0 ? (
          <p className="text-gray-500">Belum ada data RSVP</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600">Nama</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Kehadiran</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Jumlah Tamu</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Pesan</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.slice(0, 5).map((rsvp) => (
                  <tr key={rsvp.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{rsvp.name}</td>
                    <td className="py-3 px-4">
                      {rsvp.attending ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Hadir</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Tidak Hadir</span>
                      )}
                    </td>
                    <td className="py-3 px-4">{rsvp.attending ? rsvp.totalGuest : '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 max-w-xs truncate">{rsvp.message || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string, value: number, color: string }) {
  return (
    <div className={`p-6 rounded-xl ${color}`}>
      <h3 className="text-sm font-medium opacity-80 mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
