"use client";

import { useEffect, useState } from "react";

export default function InteractionLayer() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed w-64 h-64 rounded-full bg-white/5 blur-3xl transition-all duration-300 ease-out"
      style={{
        left: pos.x - 120,
        top: pos.y - 120,
      }}
    />
  );
}