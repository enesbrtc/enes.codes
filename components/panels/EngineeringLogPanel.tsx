"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function EngineeringLogPanel() {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogId(prev => prev === logId ? null : logId);
  };

  const engineeringLogs = [
    {
      id: "user-lifecycle-automation",
      title: "Automating User Lifecycle Management",
      summary: "Built automation scripts for user provisioning in Active Directory and Microsoft 365.",
      date: "2024-02-20",
      problem: "Manual onboarding and offboarding consumed large support time and caused delays.",
      context: "Managing identity lifecycle for 1200+ users across multiple locations.",
      approach: "Designed automation workflows with approval processes and audit logging.",
      outcome: "Eliminated manual onboarding tasks and reduced provisioning time from ~30m to ~3m per user.",
      tags: ["identity-management", "automation", "active-directory", "microsoft-365"]
    },
    {
      id: "internal-tools-efficiency",
      title: "Containerizing Internal Tools",
      summary: "Containerized internal utilities to improve deployment consistency.",
      date: "2024-01-05",
      problem: "Internal utilities were hard to deploy and maintain across environments.",
      context: "Managing multiple internal tools with varying dependencies.",
      approach: "Containerized services with Docker and added simple CI pipelines.",
      outcome: "Streamlined deployments and reduced environment drift for internal tools.",
      tags: ["containers", "docker", "ci", "deployment"]
    },
    {
      id: "self-service-support",
      title: "Building Self-Service Support Tools",
      summary: "Created self-service portal for common IT support tasks.",
      date: "2024-02-10",
      problem: "High volume of repetitive support requests wasting technician time.",
      context: "Supporting 800+ users with common IT operations.",
      approach: "Built self-service scripts and lightweight portal for password resets and access requests.",
      outcome: "Reduced repetitive tickets and freed ~10 hours/week for the support team.",
      tags: ["internal-tools", "self-service", "automation", "support"]
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-3"
      >
        <h2 className="text-lg font-semibold tracking-tight">Engineering Log</h2>
        <p className="text-sm text-neutral-400">Technical decision records and system architecture insights</p>
      </motion.div>

      {/* Engineering Logs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {engineeringLogs.map((log, index) => {
          const isExpanded = expandedLogId === log.id;
          return (
            <motion.div
              key={log.id}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="surface-card overflow-hidden cursor-pointer h-full flex flex-col"
              whileHover={{ y: -2 }}
              onClick={() => toggleLogExpansion(log.id)}
            >
              {/* Log Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-foreground mb-2 leading-tight">{log.title}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>{log.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{log.summary}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLogExpansion(log.id)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors ml-4"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </motion.button>
                </div>

                {/* Topic Tags */}
                <div className="flex flex-wrap gap-2">
                  {log.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Problem
                        </h4>
                        <p className="text-body-small text-muted-foreground leading-relaxed">{log.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Context
                        </h4>
                        <p className="text-body-small text-muted-foreground leading-relaxed">{log.context}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-yellow-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Approach
                        </h4>
                        <p className="text-body-small text-muted-foreground leading-relaxed">{log.approach}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Outcome
                        </h4>
                        <p className="text-body-small text-muted-foreground leading-relaxed">{log.outcome}</p>
                      </div>
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