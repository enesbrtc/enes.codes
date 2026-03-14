"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import FocusModeOverlay from "../components/FocusModeOverlay";
import Shell from "../components/Shell";
import { disableFocusMode } from "@/engine/system/focusMode";
import { useEngineerMode } from "../hooks/useEngineerMode";
import { useTerminalState } from "../hooks/useTerminalState";
import { setTerminalCloseCallback, closeTerminal, setTerminalOpen } from "../lib/terminalState";

const HomePanel = dynamic(() => import('../components/panels/HomePanel'), { ssr: false });
const ProjectsPanel = dynamic(() => import('../components/panels/ProjectsPanel'), { ssr: false });
const SystemsPanel = dynamic(() => import('../components/panels/SystemsPanel'), { ssr: false });
const AboutPanel = dynamic(() => import('../components/panels/AboutPanel'), { ssr: false });
const ContactPanel = dynamic(() => import('../components/panels/ContactPanel'), { ssr: false });
const HiddenEngineeringLogPanel = dynamic(() => import('../components/panels/HiddenEngineeringLogPanel'), { ssr: false });

type ViewType = "home" | "projects" | "systems" | "about" | "contact" | "hidden-engineering-log";

export default function HomePage() {
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isEngineerMode = useEngineerMode();
  const isTerminalOpen = useTerminalState();

  // Set terminal close callback
  useEffect(() => {
    setTerminalCloseCallback(() => {
      setTerminalOpen(false);
      disableFocusMode();
    });
  }, []);

  const handleViewChange = (view: ViewType) => {
    if (view === activeView || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveView(view);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeView]);

  useEffect(() => {
    const handleDashboardNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ view?: ViewType }>;
      if (!customEvent.detail?.view) return;
      handleViewChange(customEvent.detail.view);
    };

    window.addEventListener('dashboard:navigate', handleDashboardNavigate as EventListener);
    return () => window.removeEventListener('dashboard:navigate', handleDashboardNavigate as EventListener);
  }, [activeView, isTransitioning]);

  const renderActivePanel = () => {
    const panels = {
      home: HomePanel,
      projects: ProjectsPanel,
      systems: SystemsPanel,
      about: AboutPanel,
      contact: ContactPanel,
      "hidden-engineering-log": HiddenEngineeringLogPanel,
    };

    const PanelComponent = panels[activeView];
    return <PanelComponent />;
  };

  return (
    <>
      <AnimatePresence>
        {!isTerminalOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Navigation
              activeView={activeView}
              onViewChange={handleViewChange}
              isTransitioning={isTransitioning}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Layout>
        <div className="relative flex min-h-full flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="flex-1 px-1 py-1 sm:px-2"
            >
              {renderActivePanel()}
            </motion.div>
          </AnimatePresence>

          {/* Loading overlay */}
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
        </div>

      </Layout>

    {/* Focus Mode Overlay */}
    <FocusModeOverlay />
    
    {/* Terminal Shell */}
    <Shell 
      open={isTerminalOpen} 
      onClose={closeTerminal} 
    />
    </>
  );
}