"use client";

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { subscribeToFocusMode } from '../engine/system/focusMode';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  const [focusModeActive, setFocusModeActive] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToFocusMode(setFocusModeActive);
    return unsubscribe;
  }, []);

  return (
    <div className={`min-h-screen bg-background text-foreground pixel-grid ${className} ${focusModeActive ? 'pointer-events-none' : ''}`}>
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto pt-24"
      >
        {children}
      </motion.div>
    </div>
  );
}