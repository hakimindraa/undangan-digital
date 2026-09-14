"use client";

import { useState, useEffect } from "react";
import CoverScreen from "@/components/CoverScreen";
import Hero from "@/components/Hero";
import CountdownTimer from "@/components/CountdownTimer";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import RsvpForm from "@/components/RsvpForm";
import WishesList from "@/components/WishesList";
import Sparkles from "@/components/Sparkles";
import FloatingMusic from "@/components/FloatingMusic";

export default function PublicPage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <main className="w-full relative">
      <CoverScreen onOpen={() => setIsOpen(true)} />
      
      {/* Background magical particles */}
      {isOpen && <Sparkles />}
      
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
