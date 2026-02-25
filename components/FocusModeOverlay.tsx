"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { subscribeToFocusMode } from '../engine/system/focusMode';

export default function FocusModeOverlay() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToFocusMode(setIsActive);
    return unsubscribe;
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/35 pointer-events-none z-40"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </AnimatePresence>
  );
}