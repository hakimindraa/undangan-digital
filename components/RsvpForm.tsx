"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionWrapper from "./SectionWrapper";

export default function RsvpForm() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("to");

  const [formData, setFormData] = useState({
    name: slug ? slug.replace(/-/g, " ") : "",
    attending: "yes",
    totalGuest: 1,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          attending: formData.attending === "yes",
          slug,
        }),
      });

      if (!res.ok) throw new Error("Gagal mengirim konfirmasi");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper className="py-32 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-emas-gelap mb-4">Kehadiran</p>
        <h2 className="font-serif text-5xl md:text-6xl text-primary font-light mb-8">RSVP</h2>
        <div className="w-px h-16 bg-gradient-to-b from-emas via-emas to-transparent mx-auto" />
      </div>

      <div className="px-6 md:px-16 py-12 md:py-20 relative">
        <div className="absolute inset-0 border border-emas/20 pointer-events-none" />
        <div className="absolute inset-2 border border-emas/10 pointer-events-none" />

        {success ? (
          <div className="text-center py-10 animate-fade-in">
            <span className="text-4xl mb-4 block">✧</span>
            <h3 className="text-3xl font-serif text-primary mb-4 font-light">Terima Kasih</h3>
            <p className="text-primary/70 font-light leading-relaxed">
              Konfirmasi kehadiran Anda sangat berarti bagi kami.<br />
              Sampai jumpa di hari bahagia nanti.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-2">
              <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary/60">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-flushed text-primary font-serif text-xl"
                placeholder="Tuliskan nama Anda"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary/60">Kehadiran</label>
              <select
                value={formData.attending}
                onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                className="input-flushed text-primary font-serif text-xl appearance-none bg-transparent"
              >
                <option value="yes">Dengan senang hati, saya hadir</option>
                <option value="no">Maaf, saya berhalangan hadir</option>
              </select>
            </div>

            {formData.attending === "yes" && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary/60">Jumlah Tamu</label>
                <select
                  value={formData.totalGuest}
                  onChange={(e) => setFormData({ ...formData, totalGuest: parseInt(e.target.value) })}
                  className="input-flushed text-primary font-serif text-xl appearance-none bg-transparent"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-medium tracking-[0.2em] uppercase text-primary/60">Pesan Khusus (Opsional)</label>
              <textarea
                rows={1}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-flushed text-primary font-serif text-xl resize-none"
                placeholder="Tuliskan pesan..."
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              ></textarea>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="pt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 border border-primary text-primary hover:bg-primary hover:text-gading transition-colors duration-500 text-xs uppercase tracking-[0.3em] font-medium disabled:opacity-50"
              >
                {loading ? "Mengirim..." : "Kirim RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
