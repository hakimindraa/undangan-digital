"use client";

import { MapPin, Calendar, Clock } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function EventDetails() {
  return (
    <SectionWrapper className="py-32 px-6 max-w-5xl mx-auto relative">
      <div className="text-center mb-20">
        <p className="text-xs tracking-[0.4em] uppercase text-emas-gelap mb-4">Rangkaian Acara</p>
        <h2 className="font-serif text-5xl md:text-6xl text-primary font-light mb-8">Detail Acara</h2>
        <div className="w-px h-16 bg-gradient-to-b from-emas via-emas to-transparent mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Akad Nikah */}
        <div className="relative p-10 flex flex-col items-center text-center group">
          {/* Subtle frame */}
          <div className="absolute inset-0 border border-emas/10 rounded-t-full rounded-b-xl group-hover:border-emas/40 transition-colors duration-700 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-emas/10 flex items-center justify-center mb-8 text-emas">
            <span className="font-serif text-2xl italic">I</span>
          </div>

          <h3 className="font-serif text-4xl text-primary mb-2">Akad Nikah</h3>
          <p className="text-sm uppercase tracking-widest text-emas mb-8">Sacred Vow</p>
          
          <div className="space-y-6 mb-12 text-primary/70 font-light text-sm md:text-base">
            <div className="flex flex-col items-center gap-2">
              <Calendar strokeWidth={1} className="text-emas mb-1" size={24} />
              <span>Sabtu, 24 Oktober 2026</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock strokeWidth={1} className="text-emas mb-1" size={24} />
              <span>08:00 - 10:00 WIB</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin strokeWidth={1} className="text-emas mb-1" size={24} />
              <span className="max-w-[200px]">Masjid Raya Baiturrahman<br/>Bandung, Jawa Barat</span>
            </div>
          </div>
          
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto inline-block border-b border-emas pb-1 text-primary hover:text-emas transition-colors duration-300 text-xs uppercase tracking-widest"
          >
            Lihat Lokasi Maps
          </a>
        </div>

        {/* Resepsi */}
        <div className="relative p-10 flex flex-col items-center text-center group mt-10 md:mt-20">
          <div className="absolute inset-0 border border-emas/10 rounded-t-full rounded-b-xl group-hover:border-emas/40 transition-colors duration-700 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-emas/10 flex items-center justify-center mb-8 text-emas">
            <span className="font-serif text-2xl italic">II</span>
          </div>

          <h3 className="font-serif text-4xl text-primary mb-2">Resepsi</h3>
          <p className="text-sm uppercase tracking-widest text-emas mb-8">Wedding Celebration</p>
          
          <div className="space-y-6 mb-12 text-primary/70 font-light text-sm md:text-base">
            <div className="flex flex-col items-center gap-2">
              <Calendar strokeWidth={1} className="text-emas mb-1" size={24} />
              <span>Sabtu, 24 Oktober 2026</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock strokeWidth={1} className="text-emas mb-1" size={24} />
              <span>11:00 - 14:00 WIB</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin strokeWidth={1} className="text-emas mb-1" size={24} />
              <span className="max-w-[200px]">Gedung Pernikahan Harmoni<br/>Bandung, Jawa Barat</span>
            </div>
          </div>
          
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-auto inline-block border-b border-emas pb-1 text-primary hover:text-emas transition-colors duration-300 text-xs uppercase tracking-widest"
          >
            Lihat Lokasi Maps
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
