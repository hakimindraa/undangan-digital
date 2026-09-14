"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gading">
      {/* Abstract elegant background instead of full image */}
      <div className="absolute inset-0 bg-primary/5">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-6 w-full flex flex-col items-center pt-20"
      >
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-8 text-emas-gelap font-medium">
          Pernikahan
        </p>
        
        <h1 className="font-serif text-6xl md:text-9xl mb-6 text-primary drop-shadow-sm font-light">
          Romeo <span className="text-emas">&</span> Juliet
        </h1>
        
        <p className="font-serif text-2xl md:text-3xl italic mb-16 text-primary/70">
          Sabtu, 24 Oktober 2026
        </p>
        
        <div className="w-full max-w-lg mx-auto relative px-10 py-12 glass-panel-luxury">
          {/* Decorative quote marks */}
          <span className="absolute top-4 left-6 text-6xl text-emas/20 font-serif">"</span>
          
          <p className="text-sm md:text-base leading-loose text-primary/80 font-light relative z-10 text-justify">
            Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.
          </p>
          <div className="mt-8 pt-4 border-t border-emas/20 flex flex-col items-center">
            <p className="text-xs font-bold text-emas tracking-widest uppercase">(QS. Ar-Rum: 21)</p>
          </div>
        </div>

        <div className="mt-24 w-full flex justify-center">
          <div className="h-24 w-px bg-gradient-to-b from-emas via-emas to-transparent opacity-50" />
        </div>
      </motion.div>
    </div>
  );
}
