"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import { useEngineerMode } from "@/hooks/useEngineerMode";
import { useTerminalState } from "@/hooks/useTerminalState";
import FocusModeOverlay from "../components/FocusModeOverlay";

const HomePanel = dynamic(() => import('../components/panels/HomePanel'), { ssr: false });
const ProjectsPanel = dynamic(() => import('../components/panels/ProjectsPanel'), { ssr: false });
const SystemsPanel = dynamic(() => import('../components/panels/SystemsPanel'), { ssr: false });
const EngineeringLogPanel = dynamic(() => import('../components/panels/EngineeringLogPanel'), { ssr: false });
const WritingPanel = dynamic(() => import('../components/panels/WritingPanel'), { ssr: false });
const AboutPanel = dynamic(() => import('../components/panels/AboutPanel'), { ssr: false });
const ContactPanel = dynamic(() => import('../components/panels/ContactPanel'), { ssr: false });
const HiddenEngineeringLogPanel = dynamic(() => import('../components/panels/HiddenEngineeringLogPanel'), { ssr: false });

type ViewType = "home" | "projects" | "systems" | "engineering-log" | "writing" | "about" | "contact" | "hidden-engineering-log";

export default function HomePage() {
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shellOpen, setShellOpen] = useState(false);
  const isEngineerMode = useEngineerMode();
  const isTerminalOpen = useTerminalState();

  const handleViewChange = (view: ViewType) => {
    if (view === activeView || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveView(view);
      setIsTransitioning(false);
    }, 300);
  };

  const renderActivePanel = () => {
    const panels = {
      home: HomePanel,
      projects: ProjectsPanel,
      systems: SystemsPanel,
      "engineering-log": EngineeringLogPanel,
      writing: WritingPanel,
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
        <div className="relative min-h-[70vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              className="p-6 md:p-8"
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

      {/* Version Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center py-8"
      >
        <div className="flex flex-col items-center gap-2">
          {isEngineerMode && (
            <span className="text-xs text-green-500 lowercase tracking-wide">
              engineer mode active
            </span>
          )}
          <span className="text-muted-foreground text-sm">
            v3.0 - modern engineering
          </span>
        </div>
      </motion.div>
    </Layout>

    {/* Focus Mode Overlay */}
    <FocusModeOverlay />
    </>
  );
}