"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function SystemsPanel() {
  const [expandedSystemId, setExpandedSystemId] = useState<string | null>(null);

  const toggleSystemExpansion = (systemName: string) => {
    setExpandedSystemId(prev => prev === systemName ? null : systemName);
  };

  const featuredSystems = [
    {
      title: "Automated User Lifecycle Management",
      problem: "Manual onboarding and offboarding consumed large support time and caused delays.",
      solution: "Built AD + M365 automation scripts to provision and deprovision users; implemented approval workflow and logging.",
      impact: "Eliminated manual onboarding tasks and reduced provisioning time from ~30m to ~3m per user.",
      status: "Production",
      scale: "1200+ users",
      tech: ["PowerShell", "Python", "Microsoft Graph", "Active Directory"],
      architecture: "Automation scripts with approval workflows and logging"
    },
    {
      title: "Internal Tools Containerization",
      problem: "Internal utilities were hard to deploy and maintain across environments.",
      solution: "Containerized services with Docker, added simple CI pipelines and rollout scripts.",
      impact: "Streamlined deployments and reduced environment drift for internal tools.",
      status: "Production",
      scale: "Multiple services",
      tech: ["Docker", "Git", "CI"],
      architecture: "Containerized services with basic CI pipelines"
    },
    {
      title: "Self-service Support Automation",
      problem: "High volume of repetitive support requests wasting technician time.",
      solution: "Built self-service scripts and a lightweight internal portal for common tasks (password reset, access requests).",
      impact: "Reduced repetitive tickets and freed ~10 hours/week for the support team.",
      status: "Production",
      scale: "800+ users",
      tech: ["Node.js", "Express", "PowerShell", "ServiceNow"],
      architecture: "Self-service portal with automated workflows"
    }
  ];

  return (
    <section className="mx-auto mt-16 max-w-[1400px] px-10">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 space-y-1"
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Systems</h2>
        <p className="text-sm text-white/60">Featured engineering implementations</p>
      </motion.div>

      {/* Systems Grid */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {featuredSystems.map((system, index) => {
            const isExpanded = expandedSystemId === system.title;

            return (
              <motion.div
                key={system.title}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="surface-card group flex h-full cursor-pointer flex-col p-4"
                whileHover={{ y: -2 }}
                onClick={() => toggleSystemExpansion(system.title)}
              >
                <div className="flex items-start justify-between gap-2 mb-3 min-h-[2rem]">
                  <span className="text-body-small font-semibold text-foreground flex-1">{system.title}</span>
                  <div className="flex-shrink-0">
                    <span className={`badge-${system.status === 'Production' ? 'green' : 'blue'} text-xs px-2 py-1 rounded-md font-medium whitespace-nowrap`}>{system.status}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-tech-small font-semibold uppercase tracking-wide text-[#ff7a90]">Problem</span>
                  <p className="text-body-small text-muted-foreground mt-1 leading-relaxed">{system.problem}</p>
                </div>

                <div className="mb-3">
                  <span className="text-tech-small font-semibold uppercase tracking-wide text-accent">Solution</span>
                  <p className="text-body-small text-muted-foreground mt-1 leading-relaxed">{system.solution}</p>
                </div>

                <div className="mb-3">
                  <span className="text-tech-small font-semibold uppercase tracking-wide text-[#59d7c7]">Impact</span>
                  <p className="text-body-small font-medium text-foreground mt-1">{system.impact}</p>
                </div>

                <div className="mb-3">
                  <span className="text-tech-small font-semibold text-accent uppercase tracking-wide">Scale</span>
                  <p className="text-tech-small text-muted-foreground mt-1">{system.scale}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {system.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="panel-chip px-2.5 py-0.5 text-xs font-medium">{tech}</span>
                  ))}
                  {system.tech.length > 3 && (
                    <span className="panel-chip px-2.5 py-0.5 text-xs font-medium">+{system.tech.length - 3}</span>
                  )}
                </div>

                {/* Expanded Technical Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border pt-3 mt-3"
                    >
                      <div>
                        <span className="text-tech-small font-semibold text-accent uppercase tracking-wide">Architecture</span>
                        <p className="text-body-small text-muted-foreground mt-1 leading-relaxed">{system.architecture}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}