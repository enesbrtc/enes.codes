"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import cv from "../../data/cv";

interface OverviewPanelProps {
  onNavigateToWork?: () => void;
  language: 'en' | 'tr';
}

export default function OverviewPanel({ onNavigateToWork, language }: OverviewPanelProps) {
  const data = cv;
  const primaryRole = data.primaryRole || (data.suggestedRoles && data.suggestedRoles[0]);

  const content = {
    en: {
      title: "I build systems that work reliably.",
      exploreWork: "Explore Work",
      currentDirection: "Current Direction",
      direction1: "Exploring infrastructure automation patterns",
      direction2: "Improving identity governance workflows",
      direction3: "Learning platform reliability concepts"
    },
    tr: {
      title: "Güvenilir çalışan sistemler geliştiririm.",
      exploreWork: "İşlerimi Keşfet",
      currentDirection: "Mevcut Yönelim",
      direction1: "Altyapı otomasyon kalıplarını keşfediyorum",
      direction2: "Kimlik yönetimi iş akışlarını iyileştiriyorum",
      direction3: "Platform güvenilirliği kavramlarını öğreniyorum"
    }
  };

  return (
    <div className="relative p-4 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 25s linear infinite'
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />
      </div>

      {/* Above-the-fold: Identity + CTA */}
      <div className="relative text-center space-y-4 pb-8">
        <div className="flex justify-center">
          <div className="relative">
            <img src="https://api.dicebear.com/6.x/pixel-art/png?seed=Enes&scale=90" alt="EB" className="w-24 h-24 rounded-full" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold neon-text glitch-text leading-tight transition-all duration-500 hover:scale-105 hover:text-blue-300" data-text={data.name}>
            {data.name}
          </h2>
          <div className="text-sm text-neutral-300 font-semibold tracking-wider uppercase">{data.title}</div>
          <div className="text-sm text-neutral-200 mt-3 max-w-md mx-auto leading-relaxed">
            {content[language].title}
          </div>
        </div>
        {onNavigateToWork && (
          <button
            onClick={onNavigateToWork}
            className="px-5 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-md text-sm font-semibold text-neutral-100 hover:bg-blue-600/30 hover:border-blue-400/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            {content[language].exploreWork}
          </button>
        )}
      </div>

      {/* Current Direction Block */}
      <div className="relative max-w-sm mx-auto">
        <div className="p-3 bg-neutral-950/30 rounded-lg border border-neutral-700/40 backdrop-blur-sm shadow-lg">
          <h3 className="text-xs font-bold neon-text uppercase tracking-wider mb-2">{content[language].currentDirection}</h3>
          <div className="text-sm text-neutral-300 space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span>{content[language].direction1}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span>{content[language].direction2}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span>{content[language].direction3}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </div>
  );
}