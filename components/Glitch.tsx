"use client";
import { useEffect, useState } from "react";

export default function Glitch({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setOn((s) => !s), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={`inline-block ${on ? "opacity-95" : "opacity-100"}`}>{children}</span>
  );
}
