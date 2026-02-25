"use client";

import { motion } from "framer-motion";
import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { getMachineState, subscribeToMachineState, MachineState } from "../engine/system/systemState";

export interface AvatarRef {
  focus: () => void;
}

export default forwardRef<AvatarRef, { onClick?: () => void }>(function Avatar({ onClick }, ref) {
  const [machineState, setMachineState] = useState<MachineState>(getMachineState());
  const [showHint, setShowHint] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const avatarRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToMachineState(setMachineState);
    return unsubscribe;
  }, []);

  // Terminal hint flash - only on first visit
  useEffect(() => {
    const hintSeen = localStorage.getItem('avatar_hint_seen');
    if (!hintSeen) {
      const timer = setTimeout(() => {
        setShowHint(true);
        setTimeout(() => {
          setShowHint(false);
          localStorage.setItem('avatar_hint_seen', 'true');
        }, 1500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Expose focus method to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      avatarRef.current?.focus();
    }
  }), []);

  const getAnimationConfig = () => {
    switch (machineState) {
      case "idle":
        return {
          scale: [1, 1.015, 1, 1.03, 1], // Added stronger pulse
          duration: 9,
        };
      case "engineer":
        return {
          scale: [1, 1.02, 1, 1.035, 1], // Added stronger pulse
          duration: 6,
        };
      case "ssh-connected":
        return {
          scale: [1, 1.005, 1, 1.02, 1], // Added stronger pulse
          duration: 12,
        };
      default:
        return {
          scale: [1, 1.015, 1, 1.03, 1], // Added stronger pulse
          duration: 9,
        };
    }
  };

  const animation = getAnimationConfig();

  const handleClick = () => {
    if (onClick) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 120);
      onClick();
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.img
        ref={avatarRef}
        src="/avatar.png"
        alt="Enes Barutcu"
        aria-label="Open terminal"
        className="w-40 h-40 cursor-pointer select-none mx-auto rounded-full"
        onClick={handleClick}
        animate={{
          scale: isClicked ? [1, 0.98, 1] : animation.scale,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{
          duration: isClicked ? 0.12 : animation.duration,
          repeat: isClicked ? 0 : Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Terminal hint */}
      <motion.div
        className="absolute top-full mt-2 text-sm text-[var(--muted-foreground)] select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showHint ? 0.4 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        enter
      </motion.div>
    </div>
  );
});
