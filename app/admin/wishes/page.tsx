"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      setWishes(data);
    } catch (error) {
      console.error("Failed to fetch wishes", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWish = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ucapan ini?")) return;

    try {
      const res = await fetch(`/api/wishes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setWishes(wishes.filter((wish) => wish.id !== id));
      } else {
        alert("Gagal menghapus ucapan");
      }
    } catch (error) {
      console.error("Error deleting wish:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Moderasi Ucapan</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat ucapan...</div>
        ) : wishes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada ucapan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 font-semibold text-gray-600">Tanggal</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Nama</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Ucapan</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {wishes.map((wish) => (
                  <tr key={wish.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(wish.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="py-3 px-4 font-medium">{wish.name}</td>
                    <td className="py-3 px-4 max-w-md">
                      <p className="truncate" title={wish.message}>{wish.message}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => deleteWish(wish.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                        title="Hapus Ucapan"
                      >
                        <Trash2 size={18} />
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
