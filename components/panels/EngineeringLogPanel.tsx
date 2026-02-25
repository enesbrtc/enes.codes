"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function EngineeringLogPanel() {
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  };

  const engineeringLogs = [
    {
      id: "container-adoption",
      date: "2024-02-10",
      problem: "Internal tools deployment was inconsistent across environments",
      investigation: "Analyzed deployment failures and environment drift issues",
      decision: "Adopt Docker containerization with CI/CD pipelines",
      lesson: "Containerization eliminates environment differences but requires investment in orchestration"
    },
    {
      id: "api-rate-limits",
      date: "2024-01-28",
      problem: "Microsoft Graph API calls failing during peak user onboarding",
      investigation: "Monitored API usage patterns and identified throttling limits",
      decision: "Implement exponential backoff and request batching",
      lesson: "API rate limits are often undocumented until you hit them in production"
    },
    {
      id: "alert-fatigue",
      date: "2024-01-15",
      problem: "NOC team ignoring monitoring alerts due to noise",
      investigation: "Reviewed 30 days of alerts and categorized by false positive rate",
      decision: "Implement alert correlation and severity-based routing",
      lesson: "Alert quality matters more than alert quantity for effective monitoring"
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
        <h2 className="text-heading-2 font-bold">Engineering Log</h2>
        <p className="text-body-small text-muted-foreground">Problem-solving observations</p>
      </motion.div>

      {/* Engineering Logs */}
      <div className="space-y-4">
        {engineeringLogs.map((log, index) => {
          const isExpanded = expandedLogs.has(log.id);
          return (
            <motion.div
              key={log.id}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="surface-card overflow-hidden pixel-hover"
              whileHover={{ y: -1, scale: 1.002 }}
            >
              {/* Log Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-foreground mb-2">{log.problem}</div>
                    <div className="text-body-small text-muted-foreground">{log.date}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLogExpansion(log.id)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </motion.button>
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
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-red-500 mb-2">Investigation</h4>
                        <p className="text-body-small text-muted-foreground">{log.investigation}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-yellow-500 mb-2">Decision</h4>
                        <p className="text-body-small text-muted-foreground">{log.decision}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-500 mb-2">Lesson</h4>
                        <p className="text-body-small text-muted-foreground">{log.lesson}</p>
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