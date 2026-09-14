"use client";

import { useState, useEffect } from "react";
import { Copy, Send } from "lucide-react";

interface Guest {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.location.origin);
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await fetch("/api/guests");
      const data = await res.json();
      setGuests(data);
    } catch (error) {
      console.error("Failed to fetch guests", error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (slug: string) => {
    const link = `${domain}/?to=${slug}`;
    navigator.clipboard.writeText(link);
    alert("Link disalin!");
  };

  const sendToWA = (guest: Guest) => {
    const link = `${domain}/?to=${guest.slug}`;
    const message = `Halo ${guest.name},\n\nKami mengundang Anda untuk hadir di acara pernikahan kami.\n\nSilakan buka undangan digital berikut:\n${link}\n\nTerima kasih.`;
    const encodedMessage = encodeURIComponent(message);
    let url = `https://wa.me/?text=${encodedMessage}`;
    if (guest.phone) {
      // Format phone if necessary (e.g., removing leading 0 and adding country code)
      let phone = guest.phone.replace(/[^0-9]/g, "");
      if (phone.startsWith("0")) phone = "62" + phone.slice(1);
      url = `https://wa.me/${phone}?text=${encodedMessage}`;
    }
    window.open(url, "_blank");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Daftar Tamu & Link Undangan</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data tamu...</div>
        ) : guests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada tamu. Silakan import data tamu.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 font-semibold text-gray-600">Nama</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">No. WA</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Link Undangan</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{guest.name}</td>
                    <td className="py-3 px-4">{guest.phone || "-"}</td>
                    <td className="py-3 px-4 text-sm text-blue-600 truncate max-w-[200px]">
                      {`${domain}/?to=${guest.slug}`}
                    </td>
                    <td className="py-3 px-4 flex items-center justify-center gap-2">
                      <button
                        onClick={() => copyLink(guest.slug)}
                        className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition"
                        title="Copy Link"
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        onClick={() => sendToWA(guest)}
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition"
                        title="Kirim via WhatsApp"
                      >
                        <Send size={18} />
                      </button>
                    </td>
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
