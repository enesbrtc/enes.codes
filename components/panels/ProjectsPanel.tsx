"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ChevronDown,
  Package,
  Cog,
  Lightbulb,
  Layers
} from 'lucide-react';

export default function ProjectsPanel() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleProjectExpansion = (projectName: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectName)) {
        newSet.delete(projectName);
      } else {
        newSet.add(projectName);
      }
      return newSet;
    });
  };

  const projects = [
    {
      title: "Paket7",
      status: "Live Production",
      statusColor: "green",
      icon: Package,
      problem: "Turkish e-commerce lacked a unified package tracking solution for multiple carriers",
      myRole: "Full-stack developer and product owner",
      solution: "Built a web application that aggregates tracking data from multiple Turkish carriers (Aras, Yurtiçi, MNG, PTT, Sürat) with real-time updates",
      impact: "Successfully shipped and deployed a production web application serving real users",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      links: { live: "https://paket7.com", repo: "https://github.com/aybarutcu/paketbul" },
      featured: true
    },
    {
      title: "TA Store Marketplace",
      status: "Development",
      statusColor: "purple",
      icon: Lightbulb,
      problem: "Needed modern e-commerce platform for TA products with advanced commerce workflows",
      myRole: "Full-stack developer using Medusa commerce framework",
      solution: "Built marketplace application with custom storefront, backend integration, and payment processing",
      impact: "Gained deep understanding of e-commerce architecture, headless commerce, and scalable platform development",
      tech: ["Medusa", "Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      links: { repo: "https://github.com/aybarutcu/ta-store" },
      featured: false
    },
    {
      title: "Legal CRM — Sprint 0 Architecture",
      status: "Architecture / Foundation Phase",
      statusColor: "blue",
      icon: Layers,
      problem: "Law firms needed unified client, matter, document, and calendar management platform",
      myRole: "System architect and foundation developer",
      solution: "Designed comprehensive CRM architecture with Next.js, Prisma, PostgreSQL, OpenAPI, Docker, CI/CD, and observability planning",
      impact: "Established solid engineering foundation for legal practice management with ADR records, database schema, and API definitions",
      tech: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "OpenAPI", "Docker", "NextAuth", "Redis"],
      links: { repo: "https://github.com/aybarutcu/legal-crm-sprint0" },
      featured: false
    },
    {
      title: "Automated User Lifecycle Management",
      status: "Concept",
      statusColor: "yellow",
      icon: Cog,
      problem: "Manual user provisioning consumed significant IT support time",
      myRole: "Designed automation concept and workflow architecture",
      solution: "Explored AD + M365 automation patterns with approval workflows and audit logging",
      impact: "Intended to reduce provisioning time from 30 minutes to 3 minutes per user",
      tech: ["PowerShell", "Python", "Microsoft Graph", "Active Directory"],
      featured: false
    },
    {
      title: "Self-Service Support Automation",
      status: "Prototype",
      statusColor: "blue",
      icon: Lightbulb,
      problem: "High volume of repetitive support tickets overwhelmed the helpdesk",
      myRole: "Prototyped self-service platform architecture and user flows",
      solution: "Built proof-of-concept portal for automated password resets and access requests",
      impact: "Demonstrated potential to reduce ticket volume and free support resources",
      tech: ["Node.js", "Express", "PowerShell", "ServiceNow"],
      featured: false
    },
    {
      title: "Internal Tools Containerization",
      status: "Exploration",
      statusColor: "purple",
      icon: Layers,
      problem: "Internal utilities were difficult to deploy across environments",
      myRole: "Researched containerization strategy and deployment patterns",
      solution: "Explored Docker containerization and basic CI/CD pipeline implementation",
      impact: "Identified path to eliminate environment drift and improve deployment reliability",
      tech: ["Docker", "Git", "CI/CD", "Kubernetes"],
      featured: false
    }
  ];

  const getStatusStyles = (statusColor: string) => {
    switch (statusColor) {
      case 'green':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'yellow':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'blue':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'purple':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-2"
      >
        <h2 className="text-heading-2 font-bold">Projects</h2>
        <p className="text-body-small text-muted-foreground">From concepts to shipped products</p>
      </motion.div>

      {/* Featured Project */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {projects.filter(p => p.featured).map((project) => {
          const Icon = project.icon;
          const isExpanded = expandedProjects.has(project.title);

          return (
            <motion.div
              key={project.title}
              className="surface-card overflow-hidden pixel-hover"
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-heading-3 font-bold">{project.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles(project.statusColor)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleProjectExpansion(project.title)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </motion.button>
                </div>

                <p className="text-body text-muted-foreground mb-4">{project.problem}</p>
                <p className="text-body font-medium text-accent mb-4">{project.impact}</p>

                {/* Links */}
                {project.links && (
                  <div className="flex space-x-4 mb-4">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm text-accent hover:text-accent-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Site</span>
                    </a>
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted/50 rounded text-tech border border-border/50"
                    >
                      {tech}
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
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-accent mb-2">My Role</h4>
                        <p className="text-body-small text-muted-foreground">{project.myRole}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-accent mb-2">Solution</h4>
                        <p className="text-body-small text-muted-foreground">{project.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-accent mb-2">Lessons Learned</h4>
                        <p className="text-body-small text-muted-foreground">
                          First experience shipping a production web application. Learned the full development lifecycle from concept to deployment, including user feedback integration and performance optimization.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Other Projects */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-caption text-muted-foreground">Explorations & Concepts</h3>
        <div className="grid gap-4">
          {projects.filter(p => !p.featured).map((project, index) => {
            const Icon = project.icon;
            const isExpanded = expandedProjects.has(project.title);

            return (
              <motion.div
                key={project.title}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="surface-card overflow-hidden pixel-hover"
                whileHover={{ y: -1, scale: 1.005 }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-muted/50 rounded-lg">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{project.title}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(project.statusColor)}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleProjectExpansion(project.title)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </motion.button>
                  </div>

                  <p className="text-body-small text-muted-foreground mb-3">{project.problem}</p>
                  <p className="text-body-small font-medium text-foreground mb-3">{project.impact}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-muted/30 rounded text-tech border border-border/50"
                      >
                        {tech}
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
                      <div className="p-4 space-y-3">
                        <div>
                          <h5 className="text-xs font-semibold text-accent mb-1">My Role</h5>
                          <p className="text-body-small text-muted-foreground">{project.myRole}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-accent mb-1">Approach</h5>
                          <p className="text-body-small text-muted-foreground">{project.solution}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}