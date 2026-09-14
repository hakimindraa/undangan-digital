"use client";

import SectionWrapper from "./SectionWrapper";

export default function Gallery() {
  const images = [
    "/placeholder-1.jpg",
    "/placeholder-2.jpg",
    "/placeholder-3.jpg",
    "/placeholder-4.jpg",
  ];

  return (
    <SectionWrapper className="py-32 px-6 bg-primary text-gading relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-emas via-emas to-transparent opacity-30" />
      
      <div className="text-center mb-20 mt-10">
        <p className="text-xs tracking-[0.4em] uppercase text-emas mb-4">Momen Kami</p>
        <h2 className="font-serif text-5xl md:text-6xl text-gading font-light mb-8">Galeri</h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {images.map((src, index) => (
          <div
            key={index}
            className={`relative overflow-hidden group aspect-[3/4] ${index % 2 === 1 ? 'md:mt-24' : ''}`}
          >
            {/* Outline frame that shows on hover */}
            <div className="absolute inset-4 border border-emas/0 group-hover:border-emas/50 transition-colors duration-700 z-10 pointer-events-none" />
            
            <div className="absolute inset-0 bg-emas/10 animate-pulse z-0" />
            
            {/* 
              This is a placeholder for actual images.
              Replace with next/image in production.
            */}
            <div className="w-full h-full object-cover bg-primary border border-emas/20 flex items-center justify-center text-xs text-emas/50 transform transition duration-[2000ms] group-hover:scale-110 z-0">
              [Image {index + 1}]
            </div>
            
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
