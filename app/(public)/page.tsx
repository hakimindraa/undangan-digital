"use client";

import { useState, useEffect, Suspense } from "react";
import CoverScreen from "@/components/CoverScreen";
import Hero from "@/components/Hero";
import CountdownTimer from "@/components/CountdownTimer";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RsvpForm from "@/components/RsvpForm";
import WishesList from "@/components/WishesList";
import Sparkles from "@/components/Sparkles";
import FloatingMusic from "@/components/FloatingMusic";

function PublicPageContent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowY = "hidden";
      document.body.style.overflowX = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, [isOpen]);

  return (
    <main className="w-full relative">
      {/* Cover Screen - Anda bisa meng-uncomment CoverScreenArch jika ingin desain lengkungan */}
      <CoverScreen onOpen={() => setIsOpen(true)} />
      {/* <CoverScreenArch onOpen={() => setIsOpen(true)} /> */}

      {/* Background magical particles */}
      {isOpen && <Sparkles />}

      {/* Soft Ambient Glow (Cahaya Halus) */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-emas/10 rounded-full blur-[100px] md:blur-[150px]" />
          <div className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] md:blur-[180px]" />
          <div className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] bg-emas/10 rounded-full blur-[100px] md:blur-[150px]" />
        </div>
      )}

      {/* The main content that shows up after opening */}
      <div className={`transition-opacity duration-[1500ms] ease-out ${isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
        <Hero />
        <CountdownTimer />
        <EventDetails />
        <Gallery />
        <RsvpForm />
        <WishesList />

        <footer className="bg-primary pt-24 pb-12 text-center text-gading/40 flex flex-col items-center">
          <span className="font-serif text-4xl text-emas/50 mb-8 tracking-tighter">R&J</span>
          <p className="text-xs tracking-[0.3em] uppercase mb-2">Terima Kasih</p>
          <p className="text-xs tracking-widest opacity-60">&copy; {new Date().getFullYear()} Nikahikek. All rights reserved.</p>
        </footer>
      </div>

      {/* Floating Music starts playing only after opened */}
      {isOpen && <FloatingMusic isPlayingInitially={true} />}
    </main>
  );
}

export default function PublicPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary"></div>}>
      <PublicPageContent />
    </Suspense>
  );
}
