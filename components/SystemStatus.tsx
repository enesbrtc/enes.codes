"use client";

import { useEngineerMode } from '@/hooks/useEngineerMode';

export default function SystemStatus() {
  const isEnabled = useEngineerMode();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-400 font-mono">
        {isEnabled ? (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span>ENGINEER MODE</span>
          </div>
        ) : (
          'v3.0'
        )}
      </div>
    </div>
  );
}