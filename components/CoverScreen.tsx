"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MailOpen } from "lucide-react";
import FloralOrnament from "./FloralOrnament";

interface CoverScreenProps {
  onOpen: () => void;
}

export default function CoverScreen({ onOpen }: CoverScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const searchParams = useSearchParams();
  const guestSlug = searchParams.get("to");

  const guestName = guestSlug
    ? guestSlug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "Tamu Undangan";

  const handleOpen = () => {
    setIsVisible(false);
    setTimeout(onOpen, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col md:flex-row bg-primary text-gading overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Kiri: Foto */}
          <div className="w-full md:w-1/2 min-h-[55vh] md:h-full relative flex items-center justify-center p-6 md:p-12 group bg-primary overflow-hidden">

            {/* Outer subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emas/5 to-transparent pointer-events-none" />

            {/* Giant SVG Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
              <FloralOrnament className="w-[150%] h-[150%] md:w-[200%] md:h-[200%] text-emas transform -rotate-12 translate-x-10" />
            </div>

            {/* Modern Elegant Arch Frame */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] h-[400px] sm:h-[480px] md:h-[600px] flex items-center justify-center mt-8 md:mt-0">

              {/* Offset Wireframes */}
              <div className="absolute inset-0 border border-emas/40 rounded-t-[1000px] rounded-b-2xl transform translate-x-4 -translate-y-4 md:translate-x-6 md:-translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" />
              <div className="absolute inset-0 border border-emas/20 rounded-t-[1000px] rounded-b-2xl transform -translate-x-4 translate-y-4 md:-translate-x-6 md:translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" />

              {/* Backlight / Glow */}
              <div className="absolute inset-4 bg-emas/20 blur-3xl rounded-t-[1000px]" />

              {/* Main Photo Card */}
              <div className="relative w-full h-full rounded-t-[1000px] rounded-b-2xl overflow-hidden border border-emas/30 shadow-2xl bg-primary/20 z-10">
                <img
                  src="/foto-cover.jpg"
                  alt="Cover Photo"
                  className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-[3000ms] ease-out opacity-90 md:opacity-100 grayscale-[20%] group-hover:grayscale-0"
                />

                {/* Gradient Overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/20 pointer-events-none mix-blend-multiply opacity-60" />
                <div className="absolute inset-0 bg-emas/10 mix-blend-overlay pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Kanan: Konten Teks & Tombol */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center relative p-6 md:p-12">

            {/* Luxury Floral Background di bagian Kanan */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
              <FloralOrnament className="w-[150%] h-[150%] md:w-[200%] md:h-[200%] text-emas transform -rotate-12 translate-y-10" />
            </div>

            {/* Golden Border Frame */}
            <div className="absolute inset-4 md:inset-8 border border-emas/20 rounded-sm pointer-events-none" />
            <div className="absolute inset-5 md:inset-9 border border-emas/10 rounded-sm pointer-events-none" />

            {/* Decorative Corner SVG (Kiri Atas & Kanan Bawah) */}
            <svg className="absolute top-8 left-8 w-16 md:w-24 h-16 md:h-24 opacity-60" viewBox="0 0 100 100">
              <motion.path
                d="M0,0 L100,0 L100,20 C50,20 20,50 20,100 L0,100 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </svg>
            <svg className="absolute bottom-8 right-8 w-16 md:w-24 h-16 md:h-24 opacity-60 transform rotate-180" viewBox="0 0 100 100">
              <motion.path
                d="M0,0 L100,0 L100,20 C50,20 20,50 20,100 L0,100 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>

            <div className="text-center z-10 w-full flex flex-col items-center relative mt-4 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mb-4 md:mb-8"
              >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-emas/80 font-light">The Wedding Of</p>
              </motion.div>

              <motion.h1
                className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 gold-gradient-text drop-shadow-lg"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              >
                Ike & Rendy
              </motion.h1>

              <motion.div
                className="w-px h-10 md:h-16 bg-gradient-to-b from-transparent via-emas to-transparent my-2 md:my-4"
                initial={{ height: 0 }}
                animate={{ height: 64 }}
                transition={{ delay: 2, duration: 1 }}
              />

              <motion.div
                className="mt-4 md:mt-8 bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-emas/10 w-full max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-emas/60 mb-1 md:mb-2">Kepada Yth.</p>
                <p className="text-xl md:text-2xl font-serif mb-6 md:mb-8 gold-gradient-text">{guestName}</p>

                <button
                  onClick={handleOpen}
                  className="group relative inline-flex items-center gap-3 px-6 md:px-8 py-2 md:py-3 bg-transparent border border-emas text-emas rounded-none overflow-hidden transition-all hover:text-primary mx-auto"
                >
                  <div className="absolute inset-0 bg-emas translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                  <span className="relative z-10 flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest font-medium">
                    <MailOpen size={16} />
                    Buka Undangan
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
