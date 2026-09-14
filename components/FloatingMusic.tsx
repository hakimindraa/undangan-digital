"use client";

import { useState, useRef, useEffect } from "react";
import { Disc3, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMusic({ isPlayingInitially = false }: { isPlayingInitially?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(isPlayingInitially);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to load music from public folder
    audioRef.current = new Audio("/bgm.mp3");
    audioRef.current.loop = true;

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlayingInitially && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.log("Auto-play prevented", e);
        setIsPlaying(false);
      });
    }
  }, [isPlayingInitially]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log(e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={togglePlay}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-md transition-all duration-500 border ${
        isPlaying ? "bg-emas/20 border-emas/50" : "bg-primary/80 border-primary"
      }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            className="animate-spin-slow text-emas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Disc3 size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            className="text-gading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Pause size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
