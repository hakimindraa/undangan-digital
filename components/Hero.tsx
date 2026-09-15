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

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center py-32 overflow-hidden bg-gading">
      {/* Abstract elegant background instead of full image */}
      <div className="absolute inset-0 bg-primary/5">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-6 w-full flex flex-col items-center"
      >
        {/* Bismillah Calligraphy */}
        <div className="mb-6 opacity-80">
          <span className="font-serif text-5xl md:text-6xl text-emas">﷽</span>
        </div>

        <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-8 text-emas-gelap font-medium">
          Pernikahan
        </p>

        <h1 className="font-serif text-6xl md:text-9xl mb-6 text-primary drop-shadow-sm font-light">
          Ike <span className="text-emas">&</span> Rendy
        </h1>

        <p className="font-serif text-2xl md:text-3xl italic mb-12 text-primary/70">
          Sabtu, 24 Oktober 2026
        </p>

        {/* Arch Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-56 h-80 md:w-72 md:h-[26rem] mb-20 group"
        >
          {/* Decorative Frames */}
          <div className="absolute inset-0 border border-emas/40 rounded-t-full rounded-b-3xl transform translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 border border-emas/20 rounded-t-full rounded-b-3xl transform -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out" />

          {/* Main Photo */}
          <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden border border-emas/30 shadow-2xl z-10 bg-gading">
            <img
              src="/foto-utama.jpg"
              alt="Pre-wedding"
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
            />
            {/* Soft inner shadow/glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(31,46,35,0.2)] pointer-events-none rounded-t-full rounded-b-3xl" />
          </div>
        </motion.div>

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

        {/* Couple Profile Section inside Hero */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 relative z-10 mt-32 w-full max-w-5xl mx-auto">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex-1 flex flex-col items-center text-center group"
          >
            <div className="relative w-56 h-72 md:w-64 md:h-80 mb-8">
              <div className="absolute inset-0 border border-emas/40 rounded-t-full rounded-b-xl transform translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 border border-emas/20 rounded-t-full rounded-b-xl transform -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden border border-emas/20 bg-primary/5 shadow-xl">
                <img
                  src="/foto-ikek.jpg"
                  alt="Ikek"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            <h3 className="font-serif text-4xl text-primary mb-3">Ikek</h3>
            <p className="text-sm font-light text-primary/70 leading-relaxed">
              Putri ke-2 dari pasangan <br />
              <span className="font-medium text-primary">Bapak [Nama Bapak Ikek]</span> <br />& <span className="font-medium text-primary">Ibu [Nama Ibu Ikek]</span>
            </p>
          </motion.div>

          {/* Divider / & */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center justify-center py-4 md:py-0"
          >
            <span className="font-serif text-7xl md:text-9xl text-emas/30 font-light">&</span>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 flex flex-col items-center text-center group"
          >
            <div className="relative w-56 h-72 md:w-64 md:h-80 mb-8">
              <div className="absolute inset-0 border border-emas/40 rounded-t-full rounded-b-xl transform translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 border border-emas/20 rounded-t-full rounded-b-xl transform -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <div className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden border border-emas/20 bg-primary/5 shadow-xl">
                <img
                  src="/foto-rendy.jpg"
                  alt="Rendy"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            <h3 className="font-serif text-4xl text-primary mb-3">Rendy</h3>
            <p className="text-sm font-light text-primary/70 leading-relaxed">
              Putra ke-2 dari pasangan <br />
              <span className="font-medium text-primary">Bapak [Nama Bapak Rendy]</span> <br />& <span className="font-medium text-primary">Ibu [Nama Ibu Rendy]</span>
            </p>
          </motion.div>
        </div>

        <div className="mt-24 w-full flex justify-center">
          <div className="h-24 w-px bg-gradient-to-b from-emas via-emas to-transparent opacity-50" />
        </div>
      </motion.div>
    </div>
  );
}
