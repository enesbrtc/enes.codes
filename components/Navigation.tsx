"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Settings,
  FileText,
  User,
  Github,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Code,
  FileDown
} from 'lucide-react';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: "home" | "projects" | "systems" | "engineering-log" | "writing" | "about" | "contact") => void;
  isTransitioning: boolean;
}

const navItems = [
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'systems', label: 'Systems', icon: Settings },
  { id: 'engineering-log', label: 'Engineering Log', icon: FileText },
  { id: 'about', label: 'About', icon: User },
];

export default function Navigation({ activeView, onViewChange, isTransitioning }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
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

  // Theme management
  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <>
      {/* Fixed container for centering */}
      <div className="fixed top-4 left-0 right-0 z-50">
        <div className="flex justify-center">
          {/* Main Navbar - Engineering Control Bar */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`h-12 px-4 bg-card/90 backdrop-blur-md border border-border/50 rounded-lg transition-all duration-300 ${
              isScrolled ? 'shadow-md' : 'shadow-sm'
            }`}
          >
            {/* Single toolbar container */}
            <div className="flex items-center h-full gap-6">
              {/* LEFT: System Status + Brand */}
              <div className="flex items-center gap-3">
                {/* System Status Indicator */}
                <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  <span>enes.codes</span>
                  <span className="text-muted-foreground/50">/</span>
                  <span>engineering</span>
                </div>

                {/* Brand */}
                <motion.button
                  whileHover={{ y: -1 }}
                  onClick={() => onViewChange('home')}
                  className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Home"
                >
                  <Code className="w-4 h-4" />
                </motion.button>
              </div>

              {/* CENTER: Navigation */}
              <div className="flex items-center gap-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <motion.button
                      ref={(el) => { navRefs.current[index] = el; }}
                      key={item.id}
                      whileHover={{ y: -1 }}
                      onClick={() => onViewChange(item.id as "home" | "projects" | "systems" | "engineering-log" | "writing" | "about" | "contact")}
                      disabled={isTransitioning}
                      className={`relative flex items-center gap-2 px-3 h-9 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-accent'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* RIGHT: System Actions */}
              <div className="flex items-center gap-1 border-l border-border pl-3">
                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ y: -1 }}
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.button>

                {/* GitHub Link */}
                <motion.a
                  whileHover={{ y: -1 }}
                  href="https://github.com/enesbrtc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </motion.a>

                {/* CV Download Button */}
                <motion.a
                  whileHover={{ y: -1 }}
                  href="/cv/enes-barutcu-cv.txt"
                  download="enes-barutcu-cv.txt"
                  className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Download CV"
                >
                  <FileDown className="w-4 h-4" />
                </motion.a>

                {/* Contact Button */}
                <motion.button
                  whileHover={{ y: -1 }}
                  onClick={() => onViewChange('contact')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-transparent text-sm font-medium border border-[var(--border)] rounded-full hover:bg-[var(--muted)] transition-all duration-200 hover:translate-y-[-1px]"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Contact</span>
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ y: -1 }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </div>
      </div>

      {/* Mobile Navigation Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-card border border-border rounded-lg shadow-2xl p-6 max-w-sm mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ x: 0 }}
                      onClick={() => {
                        onViewChange(item.id as "home" | "projects" | "systems" | "engineering-log" | "writing" | "about" | "contact");
                        setIsMobileMenuOpen(false);
                      }}
                      disabled={isTransitioning}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'text-accent'
                          : 'text-foreground hover:bg-accent/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}

                <div className="border-t border-border my-4" />

                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ x: 0 }}
                  onClick={() => {
                    onViewChange('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}