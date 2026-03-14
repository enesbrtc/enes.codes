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
    <div className={`flex min-h-full flex-col bg-background text-foreground ${className} ${focusModeActive ? 'pointer-events-none' : ''}`}>
      {/* Main content - professional layout with optimal spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex-1 w-full max-w-[1200px] px-6 pt-4"
      >
        {children}
      </motion.div>
    </div>
  );
}