"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function SystemsPanel() {
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(new Set());

  const toggleSystemExpansion = (systemName: string) => {
    setExpandedSystems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(systemName)) {
        newSet.delete(systemName);
      } else {
        newSet.add(systemName);
      }
      return newSet;
    });
  };

  const featuredSystems = [
    {
      title: "Automated User Lifecycle Management",
      description: "End-to-end identity automation system serving 1200+ enterprise users",
      impact: "Reduced provisioning time from 30m to 3m per user",
      status: "Production",
      scale: "1200+ users, 3 locations",
      tech: ["PowerShell", "Python", "Microsoft Graph", "Active Directory"],
      architecture: "Event-driven automation with approval workflows and comprehensive audit logging"
    },
    {
      title: "Self-Service Support Automation",
      description: "Internal platform enabling users to resolve common IT issues independently",
      impact: "60% reduction in support tickets, 10+ hours/week saved",
      status: "Production",
      scale: "800+ active users, 50+ self-service workflows",
      tech: ["Node.js", "Express", "PowerShell", "ServiceNow API"],
      architecture: "Microservices architecture with secure API gateways and role-based access control"
    },
    {
      title: "Internal Tools Containerization",
      description: "Containerized ecosystem of operational utilities with automated deployment",
      impact: "Eliminated environment drift, 2h → 15m deployment time",
      status: "Production",
      scale: "8 services, multi-environment deployment",
      tech: ["Docker", "Git", "CI/CD", "Kubernetes"],
      architecture: "Container orchestration with automated testing, deployment pipelines, and monitoring"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-2"
      >
        <h2 className="text-heading-2 font-bold">Systems</h2>
        <p className="text-body-small text-muted-foreground">Featured engineering implementations</p>
      </motion.div>

      {/* Featured Systems */}
      <div className="space-y-4">
        {featuredSystems.map((system, index) => {
          const isExpanded = expandedSystems.has(system.title);
          return (
            <motion.div
              key={system.title}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="surface-card overflow-hidden pixel-hover"
              whileHover={{ y: -1, scale: 1.002 }}
            >
              {/* System Card Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-foreground">{system.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        system.status === 'Production'
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {system.status}
                      </span>
                    </div>
                    <p className="text-body text-muted-foreground mb-3">{system.description}</p>
                    <div className="text-body font-medium text-accent mb-2">{system.impact}</div>
                    <div className="text-sm text-muted-foreground">{system.scale}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSystemExpansion(system.title)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </motion.button>
                </div>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2">
                  {system.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted/50 rounded text-tech border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Technical Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-accent mb-2">Architecture</h4>
                      <p className="text-body-small text-muted-foreground">{system.architecture}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}