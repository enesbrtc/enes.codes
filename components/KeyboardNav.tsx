"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardNav() {
  const router = useRouter();

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "g":
          router.push("/projects");
          break;
        case "h":
          router.push("/");
          break;
        case "l":
          router.push("/lab");
          break;
        case "n":
          router.push("/notes");
          break;
      }
    };

    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [router]);

  return null;
}