"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const targetDate = new Date("2026-10-24T08:00:00").getTime();

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <SectionWrapper className="py-32 px-6 text-center bg-primary text-gading relative overflow-hidden">
      {/* Decorative large numbers in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
        <span className="text-[40vw] font-serif font-bold text-emas select-none">24</span>
      </div>
      
      <div className="relative z-10">
        <p className="text-xs tracking-[0.4em] uppercase text-emas mb-4">Menuju</p>
        <h2 className="font-serif text-5xl md:text-6xl mb-16 text-gading font-light">Hari Bahagia</h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 max-w-3xl mx-auto">
          <TimeUnit label="Hari" value={timeLeft.days} />
          <TimeUnit label="Jam" value={timeLeft.hours} />
          <TimeUnit label="Menit" value={timeLeft.minutes} />
          <TimeUnit label="Detik" value={timeLeft.seconds} />
        </div>
      </div>
    </SectionWrapper>
  );
}

function TimeUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-20 h-28 md:w-28 md:h-36 flex items-center justify-center relative mb-4">
        <div className="absolute inset-0 border border-emas/20 rounded-t-full transition-colors duration-500 group-hover:border-emas/60" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif font-light text-emas absolute"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs uppercase tracking-[0.2em] text-gading/60 font-medium">{label}</span>
    </div>
  );
}
