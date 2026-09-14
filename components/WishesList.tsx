"use client";

import { useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { useSearchParams } from "next/navigation";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function WishesList() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("to");
  
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: slug ? slug.replace(/-/g, " ") : "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newWish = await res.json();
        setWishes([newWish, ...wishes]);
        setFormData({ ...formData, message: "" });
      }
    } catch (error) {
      console.error("Failed to post wish", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionWrapper className="py-32 px-6 bg-blush text-primary relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231F2E23\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-4">Pesan & Doa</p>
          <h2 className="font-serif text-5xl md:text-6xl text-primary font-light mb-8">Buku Tamu</h2>
          <div className="w-px h-16 bg-gradient-to-b from-primary/30 via-primary/30 to-transparent mx-auto" />
        </div>

        <div className="bg-gading/80 backdrop-blur-md p-8 md:p-14 mb-16 shadow-2xl shadow-primary/5">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-2">
              <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary/50">Dari</label>
              <input
                type="text"
                required
                placeholder="Nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-flushed border-primary/20 focus:border-primary text-primary font-serif text-xl"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary/50">Pesan</label>
              <textarea
                required
                rows={1}
                placeholder="Tuliskan ucapan dan doa restu..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-flushed border-primary/20 focus:border-primary text-primary font-serif text-xl resize-none"
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              ></textarea>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-primary text-emas hover:bg-primary/90 transition-colors duration-500 text-xs uppercase tracking-[0.2em] font-medium disabled:opacity-50"
              >
                {submitting ? "Mengirim..." : "Kirim Ucapan"}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          {loading ? (
            <p className="text-center py-10 opacity-60 font-serif italic text-lg">Memuat doa & ucapan...</p>
          ) : wishes.length === 0 ? (
            <p className="text-center py-10 opacity-60 font-serif italic text-lg">Jadilah yang pertama memberikan doa restu.</p>
          ) : (
            wishes.map((wish) => (
              <div key={wish.id} className="relative pl-8 py-4 border-l border-primary/10 hover:border-primary/40 transition-colors duration-500">
                {/* Decorative dot */}
                <div className="absolute left-0 top-6 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/20" />
                
                <h4 className="font-serif text-2xl text-primary mb-1">{wish.name}</h4>
                <p className="text-primary/70 font-light leading-relaxed mb-3 text-sm md:text-base">
                  "{wish.message}"
                </p>
                <span className="text-xs uppercase tracking-widest opacity-40">
                  {new Date(wish.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
