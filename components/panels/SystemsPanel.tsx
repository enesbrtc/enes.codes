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
      problem: "Manual user provisioning consumed significant IT support time and created delays in user access.",
      solution: "Built end-to-end identity automation system with event-driven workflows, approval processes, and comprehensive audit logging.",
      impact: "Reduced provisioning time from 30 minutes to 3 minutes per user, serving 1200+ enterprise users across 3 locations.",
      status: "Production",
      scale: "1200+ users, 3 locations",
      tech: ["PowerShell", "Python", "Microsoft Graph", "Active Directory"],
      architecture: "Event-driven automation with approval workflows and comprehensive audit logging"
    },
    {
      title: "Self-Service Support Automation Platform",
      problem: "High volume of repetitive support tickets overwhelmed the helpdesk and delayed user issue resolution.",
      solution: "Developed internal platform enabling users to resolve common IT issues independently through automated workflows.",
      impact: "60% reduction in support tickets, 10+ hours/week saved, serving 800+ active users with 50+ self-service workflows.",
      status: "Production",
      scale: "800+ active users, 50+ self-service workflows",
      tech: ["Node.js", "Express", "PowerShell", "ServiceNow API"],
      architecture: "Microservices architecture with secure API gateways and role-based access control"
    },
    {
      title: "Internal Tools Containerization",
      problem: "Internal utilities were difficult to deploy across environments, causing configuration drift and deployment failures.",
      solution: "Containerized operational utilities ecosystem with automated deployment pipelines and environment consistency.",
      impact: "Eliminated environment drift, reduced deployment time from 2 hours to 15 minutes, managing 8 services across multi-environments.",
      status: "Production",
      scale: "8 services, multi-environment deployment",
      tech: ["Docker", "Git", "CI/CD", "Kubernetes"],
      architecture: "Container orchestration with automated testing, deployment pipelines, and monitoring"
    },
    {
      title: "Enterprise Monitoring & Alerting System",
      problem: "Legacy monitoring generated excessive false positives, causing NOC team alert fatigue and missed critical incidents.",
      solution: "Implemented intelligent alert correlation, severity-based routing, and automated suppression for maintenance windows.",
      impact: "Reduced alert volume by 80%, increased incident response effectiveness by 50%, monitoring 200+ services 24/7.",
      status: "Production",
      scale: "200+ services, 24/7 monitoring",
      tech: ["Prometheus", "Grafana", "AlertManager", "Elasticsearch"],
      architecture: "Distributed monitoring with intelligent correlation and automated incident response workflows"
    },
    {
      title: "API Rate Limiting & Resilience Framework",
      problem: "External API throttling caused production failures during peak usage periods, affecting user experience.",
      solution: "Built intelligent backoff, request batching, and circuit breaker patterns for Microsoft Graph API integration.",
      impact: "Eliminated API throttling failures, achieved 99.9% success rate, handling 10,000+ daily API operations.",
      status: "Production",
      scale: "10,000+ daily operations, multi-tenant",
      tech: ["Python", "Redis", "Microsoft Graph", "Circuit Breaker"],
      architecture: "Resilient API client with intelligent retry logic, request queuing, and adaptive rate limiting"
    },
    {
      title: "Incident Response Automation Platform",
      problem: "Production incidents required extensive manual intervention and lacked standardized response procedures.",
      solution: "Developed automated incident response workflows with runbooks, automated diagnostics, and escalation procedures.",
      impact: "Reduced mean time to resolution by 60%, achieved 99.9% uptime, standardized response for 50+ incident types.",
      status: "Production",
      scale: "50+ incident types, 24/7 coverage",
      tech: ["Python", "Ansible", "PagerDuty", "ServiceNow"],
      architecture: "Event-driven incident response with automated diagnostics, remediation, and comprehensive documentation"
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