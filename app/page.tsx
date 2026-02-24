"use client";

import { useState, useEffect } from "react";
import Container from "../components/layout/Container2.tsx";
import OverviewPanel from "../components/panels/OverviewPanel";
import SystemsPanel from "../components/panels/SystemsPanel";
import WorkPanel from "../components/panels/WorkPanel";
import ThinkingPanel from "../components/panels/ThinkingPanel";
import EngineeringLogPanel from "../components/panels/EngineeringLogPanel";
import ContactPanel from "../components/panels/ContactPanel";

type ViewType = "overview" | "systems" | "work" | "thinking" | "log" | "contact";

const getNavItems = (language: 'en' | 'tr') => [
  { id: "overview" as ViewType, label: language === 'en' ? "Overview" : "Genel Bakış" },
  { id: "systems" as ViewType, label: language === 'en' ? "Systems" : "Sistemler" },
  { id: "work" as ViewType, label: language === 'en' ? "Work" : "İşler" },
  { id: "thinking" as ViewType, label: language === 'en' ? "Thinking" : "Düşünce" },
  { id: "log" as ViewType, label: language === 'en' ? "Engineering Log" : "Mühendislik Günlüğü" },
  { id: "contact" as ViewType, label: language === 'en' ? "Contact" : "İletişim" },
];

export default function HomePage() {
  const [activeView, setActiveView] = useState<ViewType>("overview");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tr'>('en');

  const navItems = getNavItems(language);

  const handleViewChange = (view: ViewType) => {
    if (view === activeView) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveView(view);
      setIsTransitioning(false);
    }, 150);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const currentIndex = navItems.findIndex(item => item.id === activeView);
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        handleViewChange(navItems[currentIndex - 1].id);
      } else if (e.key === "ArrowRight" && currentIndex < navItems.length - 1) {
        handleViewChange(navItems[currentIndex + 1].id);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeView]);

  const renderActivePanel = () => {
    switch (activeView) {
      case "overview":
        return <OverviewPanel onNavigateToWork={() => handleViewChange("work")} language={language} onLanguageChange={setLanguage} />;
      case "systems":
        return <SystemsPanel language={language} />;
      case "work":
        return <WorkPanel language={language} />;
      case "thinking":
        return <ThinkingPanel language={language} />;
      case "log":
        return <EngineeringLogPanel language={language} />;
      case "contact":
        return <ContactPanel language={language} />;
      default:
        return <OverviewPanel onNavigateToWork={() => handleViewChange("work")} language={language} onLanguageChange={setLanguage} />;
    }
  };

  return (
    <Container>
      <style>{`
        .character-sheet {
          background: linear-gradient(135deg, 
            rgba(0, 128, 255, 0.02), 
            rgba(255, 0, 128, 0.01),
            rgba(255, 215, 0, 0.005)
          );
          border: 1px solid rgba(0, 128, 255, 0.35);
          box-shadow:
            inset 0 0 0 2px rgba(0, 128, 255, 0.3),
            inset 0 0 0 4px rgba(255, 0, 128, 0.15),
            inset 0 0 20px rgba(0, 128, 255, 0.05),
            0 0 30px rgba(0, 128, 255, 0.1),
            0 0 60px rgba(255, 215, 0, 0.03);
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          outline: none;
          min-height: 60vh;
          animation: subtleGlow 8s ease-in-out infinite alternate;
        }

        @keyframes subtleGlow {
          0% {
            box-shadow:
              inset 0 0 0 2px rgba(0, 128, 255, 0.3),
              inset 0 0 0 4px rgba(255, 0, 128, 0.15),
              inset 0 0 20px rgba(0, 128, 255, 0.05),
              0 0 30px rgba(0, 128, 255, 0.1),
              0 0 60px rgba(255, 215, 0, 0.03);
          }
          100% {
            box-shadow:
              inset 0 0 0 2px rgba(0, 128, 255, 0.4),
              inset 0 0 0 4px rgba(255, 0, 128, 0.2),
              inset 0 0 25px rgba(0, 128, 255, 0.08),
              0 0 40px rgba(0, 128, 255, 0.15),
              0 0 80px rgba(255, 215, 0, 0.05);
          }
        }

        /* Corner decorations */
        .character-sheet::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          width: 16px;
          height: 16px;
          border: 1px solid rgba(0, 128, 255, 0.6);
          border-right: none;
          border-bottom: none;
          pointer-events: none;
          z-index: 2;
        }

        .character-sheet::after {
          content: '';
          position: absolute;
          top: 20px;
          right: 20px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 140, 0, 0.4));
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .character-sheet {
          background-image:
            linear-gradient(90deg, rgba(0, 128, 255, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(0, 128, 255, 0.03) 1px, transparent 1px),
            repeating-linear-gradient(0deg, rgba(0, 128, 255, 0.02) 0px, rgba(0, 128, 255, 0.02) 1px, transparent 1px, transparent 2px);
          background-size: 20px 20px, 20px 20px, 100% 2px;
        }

        .nav-bar {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-bottom: 2px solid rgba(0, 128, 255, 0.3);
          background: linear-gradient(180deg, rgba(0, 128, 255, 0.04), transparent);
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          justify-content: center;
        }

        .nav-item {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          font-family: 'Courier New', monospace;
          text-decoration: none;
          color: var(--foreground);
          border: 2px solid rgba(0, 128, 255, 0.25);
          background: linear-gradient(135deg, rgba(0, 128, 255, 0.06), rgba(0, 0, 0, 0.1));
          cursor: pointer;
          transition: all 0.15s ease-out;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .nav-item:hover::before {
          left: 100%;
        }

        .nav-item:hover {
          border-color: rgba(0, 128, 255, 0.5);
          background: linear-gradient(135deg, rgba(0, 128, 255, 0.12), rgba(0, 0, 0, 0.15));
          box-shadow: 0 0 8px rgba(0, 128, 255, 0.15);
          transform: translateY(-1px);
        }

        .nav-item.active {
          border-color: rgba(0, 128, 255, 0.7);
          border-right-color: rgba(255, 0, 128, 0.4);
          background: linear-gradient(135deg, rgba(0, 128, 255, 0.15), rgba(255, 0, 128, 0.03));
          box-shadow:
            0 0 12px rgba(0, 128, 255, 0.2),
            inset 0 0 8px rgba(0, 128, 255, 0.05),
            0 0 20px rgba(255, 215, 0, 0.1);
          color: var(--foreground);
          animation: activePulse 2s ease-in-out infinite;
        }

        @keyframes activePulse {
          0%, 100% {
            box-shadow:
              0 0 12px rgba(0, 128, 255, 0.2),
              inset 0 0 8px rgba(0, 128, 255, 0.05),
              0 0 20px rgba(255, 215, 0, 0.1);
          }
          50% {
            box-shadow:
              0 0 16px rgba(0, 128, 255, 0.3),
              inset 0 0 10px rgba(0, 128, 255, 0.08),
              0 0 25px rgba(255, 215, 0, 0.15);
          }
        }

        .language-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          min-width: 40px;
          padding: 6px 8px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1));
          border: 1px solid rgba(255, 215, 0, 0.4);
          box-shadow: 
            0 0 8px rgba(255, 215, 0, 0.2),
            inset 0 0 4px rgba(255, 215, 0, 0.1);
          color: #ffd700;
          font-size: 12px;
          transition: all 0.15s ease-out;
          border-radius: 6px;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
        }

        .language-toggle:hover {
          border-color: rgba(255, 215, 0, 0.7);
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(255, 140, 0, 0.15));
          box-shadow: 
            0 0 12px rgba(255, 215, 0, 0.3),
            inset 0 0 6px rgba(255, 215, 0, 0.15);
          transform: translateY(-50%) scale(1.05);
        }

        .language-toggle:active {
          transform: translateY(-50%) scale(0.95);
        }
      `}</style>

      <div className="character-sheet">
        {/* Navigation */}
        <nav className="nav-bar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleViewChange(item.id)}
              className={`nav-item ${activeView === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Language Toggle Button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
            className="nav-item language-toggle"
            title={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}
          >
            <span className="text-xs font-bold">{language === 'en' ? '🇹🇷' : '🇺🇸'}</span>
          </button>
        </nav>

        {/* Core Content Box */}
        <div className={`core-content ${isTransitioning ? "transitioning" : ""}`}>
          {renderActivePanel()}
        </div>
      </div>

      {/* Version Footer */}
      <div className="text-center py-6 text-xs text-neutral-500 border-t border-neutral-700/20 mt-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/10 to-transparent animate-pulse"></div>
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-neutral-800/50 rounded-full border border-neutral-600/30">
            Version 2.0 — evolving system
          </span>
          <div className="mt-2 text-neutral-600 text-[10px]">
            Built with Next.js • Styled with Tailwind • Powered by curiosity
          </div>
        </div>
      </div>
    </Container>
  );
}