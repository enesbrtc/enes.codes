"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import cv from "../../data/cv";

export default function ContactPanel() {
  const contactLinks = [
    {
      label: 'GitHub',
      href: cv.github,
      icon: Github,
      external: true,
    },
    {
      label: 'LinkedIn',
      href: cv.linkedin,
      icon: Linkedin,
      external: true,
    },
    {
      label: 'Email',
      href: `mailto:${cv.email}`,
      icon: Mail,
      external: false,
    },
  ] as const;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="surface-card w-full max-w-md -translate-y-10 p-6"
      >
        <div className="space-y-2.5">
          {contactLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-muted-foreground transition-all duration-200 hover:border-[rgba(110,168,255,0.18)] hover:bg-white/[0.04] hover:text-foreground"
              >
                <span className="panel-icon h-8 w-8 flex-none">
                  <Icon className="h-4 w-4 text-accent transition-colors duration-200 group-hover:text-foreground" />
                </span>
                <span className="font-medium">{item.label}</span>
                <span className="min-w-0 truncate text-xs text-white/45 transition-colors duration-200 group-hover:text-white/70">
                  {item.external ? item.href.replace(/^https?:\/\//, '') : cv.email}
                </span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}