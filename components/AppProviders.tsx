"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    let frameId: number | null = null;

    const updateGridOffset = (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth - 0.5) * 8;
      const y = (clientY / window.innerHeight - 0.5) * 8;

      root.style.setProperty('--grid-shift-x', `${x.toFixed(2)}px`);
      root.style.setProperty('--grid-shift-y', `${y.toFixed(2)}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        updateGridOffset(event.clientX, event.clientY);
      });
    };

    const resetGridOffset = () => {
      root.style.setProperty('--grid-shift-x', '0px');
      root.style.setProperty('--grid-shift-y', '0px');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', resetGridOffset);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', resetGridOffset);
      resetGridOffset();
    };
  }, []);

  return (
    <>
      <div className="system-grid-layer" aria-hidden="true" />
      <div className="ui-shell relative z-[1]">{children}</div>
    </>
  );
}