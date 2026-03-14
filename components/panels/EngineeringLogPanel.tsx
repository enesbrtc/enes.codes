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
      id: "alert-fatigue-monitoring",
      title: "Reducing Alert Fatigue in Enterprise Monitoring",
      summary: "Transformed overwhelming alert noise into actionable intelligence through correlation and severity-based routing in a 24/7 NOC environment.",
      date: "2024-01-15",
      problem: "NOC team was ignoring monitoring alerts due to excessive false positives and alert volume, leading to missed critical incidents in production systems.",
      context: "Supporting enterprise-scale operations with hundreds of services generating thousands of daily alerts across multiple monitoring platforms.",
      approach: "Conducted comprehensive alert analysis, implemented intelligent correlation rules, severity-based routing, and automated alert suppression for maintenance windows.",
      outcome: "Reduced alert volume by 80%, increased incident response effectiveness by 50%, and improved NOC team satisfaction through actionable alert intelligence.",
      tags: ["monitoring", "alerting", "observability", "incident-response", "automation"]
    },
    {
      id: "user-lifecycle-automation",
      title: "Automating User Lifecycle Management in Enterprise Identity",
      summary: "Built comprehensive identity automation workflows that reduced manual provisioning time from 30 minutes to 3 minutes per user across 1200+ enterprise accounts.",
      date: "2024-02-20",
      problem: "Manual user onboarding and offboarding processes created significant delays and inconsistencies in enterprise identity management.",
      context: "Managing identity lifecycle for 1200+ users across multiple locations with complex Active Directory and Microsoft 365 integrations.",
      approach: "Designed event-driven automation workflows with approval processes, comprehensive audit logging, and integration with existing identity systems.",
      outcome: "Eliminated manual provisioning bottlenecks, improved user experience with instant access, and established comprehensive audit trails for compliance.",
      tags: ["identity-management", "automation", "active-directory", "microsoft-365", "compliance"]
    },
    {
      id: "production-support-lessons",
      title: "Lessons from Supporting Large-Scale Production Environments",
      summary: "Developed systematic approaches to incident response and system reliability through experience supporting enterprise-scale operations with 99.9% uptime requirements.",
      date: "2024-03-10",
      problem: "Production incidents were causing extended downtime and requiring extensive manual intervention to restore services.",
      context: "Supporting critical enterprise systems with 24/7 availability requirements and complex interdependencies between services.",
      approach: "Implemented structured incident response frameworks, proactive monitoring enhancements, and automated recovery procedures with comprehensive documentation.",
      outcome: "Achieved 99.9% uptime targets, reduced mean time to resolution by 60%, and established predictable incident response patterns.",
      tags: ["incident-response", "reliability", "production-support", "monitoring", "automation"]
    },
    {
      id: "internal-tools-efficiency",
      title: "Building Internal Tools for Operational Efficiency",
      summary: "Created self-service automation platforms that reduced support ticket volume by 60% and saved 10+ hours of manual work per week.",
      date: "2024-01-05",
      problem: "IT support teams were overwhelmed by repetitive manual tasks and user requests that could be automated through self-service interfaces.",
      context: "Supporting 800+ users with common IT operations like password resets, access requests, and system configurations across distributed locations.",
      approach: "Developed microservices-based self-service platform with secure API gateways, role-based access control, and comprehensive audit logging.",
      outcome: "Empowered users with self-service capabilities, reduced support burden by 60%, and improved operational efficiency through automation.",
      tags: ["internal-tools", "self-service", "automation", "microservices", "user-experience"]
    },
    {
      id: "container-adoption-strategy",
      title: "Container Adoption for Internal Tools Ecosystem",
      summary: "Eliminated environment drift and reduced deployment time from 2 hours to 15 minutes through comprehensive containerization strategy.",
      date: "2024-02-10",
      problem: "Internal tools deployment was inconsistent across environments, causing configuration drift and deployment failures.",
      context: "Managing multiple development, staging, and production environments with varying OS versions and dependency conflicts.",
      approach: "Implemented Docker containerization with multi-stage builds, established CI/CD pipelines with automated testing, and created orchestration patterns.",
      outcome: "Achieved consistent deployments across all environments, eliminated configuration drift, and improved developer productivity through reliable tooling.",
      tags: ["containers", "docker", "ci-cd", "infrastructure", "deployment"]
    },
    {
      id: "api-rate-limiting-production",
      title: "Handling API Rate Limits in Production Systems",
      summary: "Implemented intelligent backoff and batching strategies to handle Microsoft Graph API throttling during peak user onboarding periods.",
      date: "2024-01-28",
      problem: "Microsoft Graph API calls were failing during peak user onboarding, causing incomplete account provisioning and user experience issues.",
      context: "Enterprise-scale user lifecycle management with thousands of daily account operations across multiple integrated systems.",
      approach: "Monitored API usage patterns, implemented exponential backoff with jitter, request batching, and intelligent retry logic with circuit breaker patterns.",
      outcome: "Eliminated API throttling failures, improved onboarding success rate to 99.9%, and optimized system resource utilization.",
      tags: ["api", "rate-limiting", "microsoft-graph", "reliability", "performance"]
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