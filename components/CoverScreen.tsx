"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MailOpen } from "lucide-react";

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
          <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
            {/* Fallback color and pulse */}
            <div className="absolute inset-0 bg-emas/10 animate-pulse z-0 pointer-events-none" />
            
            {/* Foto Cover */}
            <img 
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80" 
              alt="Cover Photo" 
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[5000ms] group-hover:scale-100 opacity-70 md:opacity-90"
            />
            
            {/* Gradient Overlay untuk transisi halus ke bagian teks */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-90 pointer-events-none" />
          </div>

          {/* Kanan: Konten Teks & Tombol */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center relative p-6 md:p-12">
            
            {/* Luxury Monogram Background di bagian Kanan */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="font-serif text-[30vh] md:text-[40vh] gold-gradient-text tracking-tighter">R&J</span>
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

            <div className="text-center z-10 w-full flex flex-col items-center relative -mt-10 md:mt-0">
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
                Romeo & Juliet
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
