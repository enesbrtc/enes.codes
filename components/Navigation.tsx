"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Settings,
  FileText,
  User,
  Mail,
  Menu,
  X,
  Terminal
} from 'lucide-react';
import { setTerminalOpen } from '@/lib/terminalState';
import { enableFocusMode } from '@/engine/system/focusMode';

interface NavigationProps {
  activeView: "home" | "projects" | "systems" | "about" | "contact" | "hidden-engineering-log";
  onViewChange: (view: "home" | "projects" | "systems" | "about" | "contact" | "hidden-engineering-log") => void;
  isTransitioning: boolean;
}

  const navItems = [
    { id: 'projects', label: 'projects', icon: Briefcase },
    { id: 'systems', label: 'systems', icon: Settings },
    { id: 'hidden-engineering-log', label: 'eng. log', icon: FileText },
    { id: 'about', label: 'about', icon: User },
  ];

export default function Navigation({ activeView, onViewChange, isTransitioning }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Handle scroll effect (shrink and increase opacity after threshold)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const openTerminal = () => {
    setTerminalOpen(true);
    enableFocusMode();
  };

  return (
    <>
      {/* Premium Application Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed left-1/2 top-6 z-50 w-[92%] max-w-6xl -translate-x-1/2"
      >
        <motion.nav
          className={`w-full rounded-[20px] border border-white/[0.03] px-[14px] py-2 shadow-[0_18px_48px_rgba(0,0,0,0.58)] backdrop-blur-[18px] transition-all duration-150 ease-out md:px-[14px] ${
            isScrolled
              ? 'bg-[rgba(5,8,14,0.6)]'
              : 'bg-[rgba(5,8,14,0.55)]'
          }`}
        >
            <div className="flex items-center justify-between gap-4">
              {/* LEFT: Avatar & Brand */}
              <div className="flex items-center gap-3">
                {/* Compact Avatar */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewChange('home')}
                  className="group relative flex items-center gap-3 rounded-full px-2 py-1.5 transition-all duration-140 hover:bg-white/[0.03]"
                  aria-label="Home"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.025)_100%)] shadow-[0_10px_24px_rgba(0,0,0,0.25)] backdrop-blur-md">
                    <span className="text-accent-foreground text-sm font-bold">E</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="block text-[13px] font-semibold tracking-tight text-foreground">enes.codes</span>
                    <span className="block text-[10px] tracking-[0.12em] text-white/30">systems dashboard</span>
                  </div>
                  <span className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-max rounded-[10px] border border-white/8 bg-[rgba(12,16,26,0.95)] px-3 py-2 text-left text-[11px] leading-5 text-[#d7e0ff]/78 opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-120 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="block text-[#d7e0ff]">enes@portfolio:~$</span>
                    <span className="block text-[#d7e0ff]/62">system online</span>
                    <span className="block text-[#d7e0ff]/62">developer console ready</span>
                  </span>
                </motion.button>
              </div>
              {/* CENTER: Navigation Items */}
              <div className="hidden items-center gap-2 md:flex lg:gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onViewChange(item.id as any)}
                      disabled={isTransitioning}
                      className={`group relative inline-flex whitespace-nowrap rounded-full px-[14px] py-2 text-[13px] font-medium lowercase tracking-[0.03em] transition-all duration-140 ${
                        isActive
                          ? 'text-foreground'
                          : 'text-white/55 hover:text-white/90'
                      }`}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full border border-white/5 bg-white/[0.06]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative z-10 hidden sm:inline-flex items-center gap-[6px] whitespace-nowrap opacity-85 transition-opacity duration-140 group-hover:opacity-100">
                        <Icon className={`h-[17px] w-[17px] transition-colors duration-140 ${isActive ? 'text-white/82' : 'text-white/55 group-hover:text-white/90'}`} />
                        {item.label}
                      </span>
                      <span className="relative z-10 whitespace-nowrap sm:hidden">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              {/* Separator */}
              <div className="mx-1 hidden h-6 w-px bg-white/8 md:block"></div>
              {/* RIGHT: Utility Actions */}
              <div className="flex items-center gap-2.5">
                {/* Terminal Button - Premium */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openTerminal}
                  className="group hidden items-center gap-[6px] whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-[14px] py-2 text-[13px] font-medium lowercase tracking-[0.03em] text-white/60 transition-all duration-140 hover:bg-white/[0.07] hover:text-white/90 sm:flex"
                  title="Open Terminal (⌘K)"
                >
                  <Terminal className="h-[17px] w-[17px] text-white/55 transition-colors duration-140 group-hover:text-white/90" />
                  <span className="hidden sm:block">terminal</span>
                </motion.button>

                {/* Contact Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewChange('contact')}
                  className="flex items-center gap-[6px] whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-[14px] py-2 text-[13px] font-medium lowercase tracking-[0.03em] text-white/76 transition-all duration-140 hover:bg-white/[0.07] hover:text-white"
                >
                  <Mail className="h-[17px] w-[17px] text-white/55 transition-colors duration-140" />
                  <span className="hidden sm:block">contact</span>
                </motion.button>

                {/* Mobile Menu */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-white/56 transition-all duration-140 hover:border-white/10 hover:bg-white/[0.04] hover:text-foreground md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Navigation Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-20 z-50 mx-auto max-w-sm rounded-[24px] border border-white/8 bg-[rgba(10,14,24,0.68)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">navigation</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-xl text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => { onViewChange(item.id as any); setIsMobileMenuOpen(false); }}
                        disabled={isTransitioning}
                        className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-left text-sm lowercase tracking-[0.03em] transition-colors duration-140 ${isActive ? 'bg-white/[0.08] text-white' : 'text-neutral-300 hover:bg-white/[0.04] hover:text-white'}`}
                      >
                        <Icon className="h-[17px] w-[17px] text-white/60" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}

                  <div className="border-t border-white/10 my-3" />

                  {/* Terminal Button */}
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ x: 0 }}
                    onClick={() => { openTerminal(); setIsMobileMenuOpen(false); }}
                    className="flex w-full items-center space-x-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left text-sm lowercase tracking-[0.03em] text-neutral-300 transition-colors duration-140 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Terminal className="h-[17px] w-[17px] text-white/60" />
                    <span>terminal</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ x: 0 }}
                    onClick={() => { onViewChange('contact'); setIsMobileMenuOpen(false); }}
                    className="flex w-full items-center space-x-3 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-left text-sm lowercase tracking-[0.03em] text-white/78 transition-colors duration-140 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Mail className="h-[17px] w-[17px] text-white/60" />
                    <span>contact</span>
                  </motion.button>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}