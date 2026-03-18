"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setTerminalOpen } from "../lib/terminalState";

export default function BezosAudioSystem() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = false; // Play once, don't loop
    audio.volume = 0.1; // Quiet background

    const handleEnded = () => setShowOverlay(false);
    audio.addEventListener('ended', handleEnded);

    // Attempt autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsAutoplayBlocked(true);
      });
    }

    const handleFirstInteraction = () => {
      if (!hasInteracted.current && isAutoplayBlocked) {
        audio.play();
        hasInteracted.current = true;
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("keydown", handleFirstInteraction);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "b") {
        if (audio.paused) {
          audio.volume = 0.5; // Louder for easter egg
          audio.play();
          setShowOverlay(true);
        } else {
          audio.pause();
          setShowOverlay(false);
        }
      } else if (e.key === '"') {
        e.preventDefault();
        setTerminalOpen(true);
      }
    };

    if (isAutoplayBlocked) {
      document.addEventListener("click", handleFirstInteraction);
      document.addEventListener("keydown", handleFirstInteraction);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("keydown", handleKeyDown);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isAutoplayBlocked]);

  return (
    <>
      <audio ref={audioRef} src="/audio/bezos.mp3" preload="auto" autoplay />
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 text-body-small text-foreground z-50"
          >
            JEFF MODE ACTIVATED
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}